from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from web3 import Web3
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify frontend URL like "http://localhost:5173"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

# MongoDB Connection
MONGO_URI = "mongodb://localhost:27017"  # Change this for MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client["healthcare"]
collection = db["records"]

# Connect to Ethereum Blockchain (Sepolia Testnet)
ALCHEMY_URL = os.getenv("ALCHEMY_URL")
web3 = Web3(Web3.HTTPProvider(ALCHEMY_URL))

# Smart Contract Details
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
CONTRACT_ABI = [  
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "sex",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "medicalHistory",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "addRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "uint256",
				"name": "recordId",
				"type": "uint256"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "RecordAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getRecord",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recordCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}

]

contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)

# User Wallet (For Signing Transactions)
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
ACCOUNT = web3.eth.account.from_key(PRIVATE_KEY)

# Pydantic Models
class Record(BaseModel):
    id: int
    name: str
    age: int
    sex: str
    medical_history: str
    description: str

@app.get("/")
def read_root():
    return {"Hello" : "HealthLedger"}

# Endpoint to Post a Record to Blockchain & MongoDB
@app.post("/post_record")
def post_record(record: Record):
    try:
        # Step 1: Send Data to Blockchain
        nonce = web3.eth.get_transaction_count(ACCOUNT.address)
        txn = contract.functions.addRecord(
            record.id, record.name, record.age, record.sex, record.medical_history, record.description
        ).build_transaction({
            "gas": 300000,
            "gasPrice": web3.to_wei("10", "gwei"),
            "nonce": nonce,
            "from": ACCOUNT.address
        })

        # Step 2: Sign & Send Transaction
        signed_txn = web3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
        tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)

        # Step 3: Save Record to MongoDB
        collection.insert_one(record.dict())

        return {"message": "Record added successfully", "tx_hash": web3.to_hex(tx_hash)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Endpoint to Get a Single Record from Blockchain & MongoDB
@app.get("/get_record/{record_id}")
def get_record(record_id: int):
    try:
        # Fetch from Blockchain
        record_data = contract.functions.getRecord(record_id).call()

        if not record_data:
            raise HTTPException(status_code=404, detail="Record not found")

        # Fetch from MongoDB
        db_record = collection.find_one({"id": record_id}, {"_id": 0})

        return {
            "blockchain_data": {
                "name": record_data[0],
                "age": record_data[1],
                "sex": record_data[2],
                "medical_history": record_data[3],
                "description": record_data[4]
            },
            "database_data": db_record
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Endpoint to Get All Records from MongoDB
@app.get("/get_all_records")
def get_all_records():
    try:
        records = list(collection.find({}, {"_id": 0}))
        return {"records": records}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
