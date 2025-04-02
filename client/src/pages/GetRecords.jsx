import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { ArrowLeft, Search, X } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import RecordCard from "../components/RecordCard"

function GetRecords() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRecord, setSelectedRecord] = useState(null)

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/get_all_records")
        setRecords(response.data.records)
      } catch (error) {
        console.error("Error fetching records:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecords()
  }, [])

  const filteredRecords = records.filter(
    (record) =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toString().includes(searchTerm.toLowerCase()),
  )

  const handleRowClick = (record) => {
    setSelectedRecord(record)
  }

  const closeRecordCard = () => {
    setSelectedRecord(null)
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/" className="inline-flex items-center text-emerald-500 hover:text-emerald-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <Link
            to="/add-record"
            className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white font-medium rounded-md shadow-sm hover:bg-emerald-600 transition duration-300"
          >
            Add New Record
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Records</h2>

          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading records...</p>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600">No records found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sex
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Problem
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      onClick={() => handleRowClick(record)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.sex}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                        {record.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button onClick={closeRecordCard} className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
              <RecordCard record={selectedRecord} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

export default GetRecords
