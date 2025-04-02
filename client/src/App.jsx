import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
// import AddRecord from "./pages/AddRecord"
// import GetRecords from "./pages/GetRecords"
// import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-white to-sky-50">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/add-record" element={<AddRecord />} /> */}
          {/* <Route path="/get-records" element={<GetRecords />} /> */}
        </Routes>
        {/* <Toaster /> */}
      </div>
    </Router>
  )
}

export default App

