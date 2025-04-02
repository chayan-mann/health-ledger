function RecordCard({ record }) {
    return (
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Patient Record</h3>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Patient ID</p>
            <p className="font-medium">{record.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{record.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Age</p>
            <p className="font-medium">{record.age}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Sex</p>
            <p className="font-medium capitalize">{record.sex}</p>
          </div>
        </div>
  
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Medical History</p>
          <div className="bg-gray-50 p-3 rounded-md">
            <p>{record.medicalHistory || "No medical history provided."}</p>
          </div>
        </div>
  
        <div>
          <p className="text-sm text-gray-500 mb-1">Current Problem</p>
          <div className="bg-gray-50 p-3 rounded-md">
            <p>{record.currentProblem}</p>
          </div>
        </div>
      </div>
    )
  }
  
  export default RecordCard
  
  