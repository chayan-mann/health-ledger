import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
        <Route path="/" element={<Home />} />

    </Router>
     
    
  )
}

export default App
