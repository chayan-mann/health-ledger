"use client"

import { useState } from "react"
import { fetchAIResponse } from "../utils/geminiAI"
import { FileText, Activity, Sparkles, X, Pill } from "lucide-react" // Import icons

function RecordCard({ record }) {
  const [aiResponse, setAIResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [responseType, setResponseType] = useState("")
  const [showResponse, setShowResponse] = useState(true)

  const handleAIRequest = async (type) => {
    // If clicking the same button again and response exists, just toggle visibility
    if (type === responseType && aiResponse) {
      setShowResponse(!showResponse)
      return
    }

    setIsLoading(true)
    setAIResponse("") 
    setResponseType(type)
    setShowResponse(true)

    let prompt = ""
    if (type === "summary") {
      prompt = `You are a professional doctor. Summarize the following patient's medical history in a structured manner using short and clear points,don't use any bold text or any type of formatting and keep the summary short and use only key phrases:\n\n${record.medical_history}`
    } else if (type === "remedies") {
      prompt = `You are a professional doctor. Provide recommended remedies and common medications for the following illness in a structured list format. Make the response sound natural and human-like without unnecessary disclaimers or robotic formatting, don't use any bold text or any type of formatting:\n\n${record.description}`
    }

    const response = await fetchAIResponse(prompt)
    setAIResponse(response)
    setIsLoading(false)
  }

  const closeAIResponse = () => {
    setAIResponse("")
    setResponseType("")
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b flex items-center">
        <FileText className="mr-2 h-5 w-5 text-gray-500" />
        Patient Record
      </h3>

      {/* Patient Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500 mb-1">Patient ID</p>
          <p className="font-semibold text-gray-800">{record.id}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500 mb-1">Name</p>
          <p className="font-semibold text-gray-800">{record.name}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500 mb-1">Age</p>
          <p className="font-semibold text-gray-800">{record.age}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500 mb-1">Sex</p>
          <p className="font-semibold text-gray-800 capitalize">{record.sex}</p>
        </div>
      </div>

      {/* Medical History */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Activity className="h-4 w-4 text-gray-500 mr-2" />
            <p className="text-sm font-medium text-gray-700">Medical History</p>
          </div>
          <button
            onClick={() => handleAIRequest("summary")}
            className={`flex items-center text-sm px-3 py-1.5 rounded-md transition-colors ${
              responseType === "summary" && aiResponse
                ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                : "text-gray-600 bg-gray-100 hover:bg-blue-400"
            }`}
            disabled={isLoading}
          >
            {isLoading && responseType === "summary" ? (
              <div className="animate-spin h-4 w-4 mr-2 border-2 border-emerald-500 border-t-transparent rounded-full"></div>
            ) : (
              <Sparkles className="h-4 w-4 mr-1.5" />
            )}
            {responseType === "summary" && aiResponse
              ? showResponse
                ? "Hide Summary"
                : "Show Summary"
              : "AI Summarize"}
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <p className="text-gray-700">{record.medical_history || "No medical history provided."}</p>
        </div>
      </div>

      {/* Current Problem */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Pill className="h-4 w-4 text-gray-500 mr-2" />
            <p className="text-sm font-medium text-gray-700">Current Problem</p>
          </div>
          <button
            onClick={() => handleAIRequest("remedies")}
            className={`flex items-center text-sm px-3 py-1.5 rounded-md transition-colors ${
              responseType === "remedies" && aiResponse
                ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                : "text-gray-600 bg-gray-100 hover:bg-green-400"
            }`}
            disabled={isLoading}
          >
            {isLoading && responseType === "remedies" ? (
              <div className="animate-spin h-4 w-4 mr-2 border-2 border-emerald-500 border-t-transparent rounded-full"></div>
            ) : (
              <Sparkles className="h-4 w-4 mr-1.5" />
            )}
            {responseType === "remedies" && aiResponse
              ? showResponse
                ? "Hide Remedies"
                : "Show Remedies"
              : "Suggest Remedies"}
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <p className="text-gray-700">{record.description}</p>
        </div>
      </div>

      {/* AI Response Section */}
      {aiResponse && showResponse && (
        <div className="mt-6 bg-white border border-emerald-100 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-emerald-50 px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 text-emerald-600 mr-2" />
              <h4 className="font-medium text-emerald-700">
                {responseType === "summary" ? "AI Medical Summary" : "AI Suggested Remedies"}
              </h4>
            </div>
            <button onClick={closeAIResponse} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4">
            <div className="prose prose-sm max-w-none text-gray-700">
              {aiResponse.split("\n").map((line, index) => (
                <p key={index} className={line.trim() === "" ? "my-2" : "my-1"}>
                  {line}
                </p>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 italic">
            AI-generated content. Please consult with a healthcare professional for medical advice.
          </div>
        </div>
      )}

      {/* Loading Indicator (when no specific type is set) */}
      {isLoading && !responseType && (
        <div className="mt-4 flex items-center justify-center p-4 bg-gray-50 rounded-lg">
          <div className="animate-spin h-5 w-5 mr-3 border-2 border-emerald-500 border-t-transparent rounded-full"></div>
          <p className="text-gray-600">Processing your request...</p>
        </div>
      )}
    </div>
  )
}

export default RecordCard

