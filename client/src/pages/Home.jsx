import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Your Health Records,{" "}
              <span className="text-emerald-500">Securely Managed</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Health Ledger provides a secure and efficient way to store and
              manage patient health records digitally.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                to="/add-record"
                className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg shadow-md hover:bg-emerald-600 transition duration-300"
              >
                Add Record
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/get-records"
                className="inline-flex items-center px-6 py-3 bg-white text-emerald-500 border border-emerald-500 font-medium rounded-lg shadow-md hover:bg-emerald-50 transition duration-300"
              >
                View Records
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0 relative">
            <div className="absolute inset-0 rounded-lg blur-md opacity-75 bg-green-500 animate-pulse"></div>
            <img
              src="/images/medical.webp"
              alt="Health Records Management"
              className="relative rounded-lg shadow-xl border-4 border-green-500"
            />
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Why Choose Health Ledger?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-sky-50 p-6 rounded-lg shadow-md">
                <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
                <p className="text-gray-600">
                  Your health data is encrypted and securely stored with the
                  highest privacy standards.
                </p>
              </div>
              <div className="bg-sky-50 p-6 rounded-lg shadow-md">
                <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
                <p className="text-gray-600">
                  Add, update, and access patient records with our intuitive
                  interface.
                </p>
              </div>
              <div className="bg-sky-50 p-6 rounded-lg shadow-md">
                <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Access</h3>
                <p className="text-gray-600">
                  Retrieve patient information instantly when you need it most.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
