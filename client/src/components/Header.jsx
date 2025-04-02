import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-emerald-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800">Health Ledger</h1>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-600 hover:text-emerald-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/add-record" className="text-gray-600 hover:text-emerald-500 transition">
              Add Record
            </Link>
          </li>
          <li>
            <Link to="/get-records" className="text-gray-600 hover:text-emerald-500 transition">
              View Records
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

