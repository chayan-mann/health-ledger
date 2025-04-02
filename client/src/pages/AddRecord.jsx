import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import { toast } from "../components/ui/use-toast";
import axios from "axios"; // Import axios

function AddRecord() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    sex: "male",
    medicalHistory: "",
    currentProblem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:8000/add-record", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast({
          title: "Record added successfully",
          description: `Patient record for ${formData.name} has been added.`,
        });

        // Reset form
        setFormData({
          id: "",
          name: "",
          age: "",
          sex: "male",
          medicalHistory: "",
          currentProblem: "",
        });

        navigate("/get-records");
      } else {
        throw new Error("Failed to add record");
      }
    } catch (error) {
      toast({
        title: "Error adding record",
        description: "There was a problem adding the patient record. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-emerald-500 hover:text-emerald-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Patient Record</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                    Patient ID
                  </label>
                  <input
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="Enter patient ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter patient name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter patient age"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Sex</label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        id="male"
                        name="sex"
                        type="radio"
                        value="male"
                        checked={formData.sex === "male"}
                        onChange={handleChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <label htmlFor="male" className="ml-2 block text-sm text-gray-700">
                        Male
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="female"
                        name="sex"
                        type="radio"
                        value="female"
                        checked={formData.sex === "female"}
                        onChange={handleChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <label htmlFor="female" className="ml-2 block text-sm text-gray-700">
                        Female
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="other"
                        name="sex"
                        type="radio"
                        value="other"
                        checked={formData.sex === "other"}
                        onChange={handleChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <label htmlFor="other" className="ml-2 block text-sm text-gray-700">
                        Other
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">
                  Medical History
                </label>
                <textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  placeholder="Enter patient's medical history"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="currentProblem" className="block text-sm font-medium text-gray-700">
                  Current Problem
                </label>
                <textarea
                  id="currentProblem"
                  name="currentProblem"
                  value={formData.currentProblem}
                  onChange={handleChange}
                  placeholder="Describe the current health issue"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Record"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AddRecord;
