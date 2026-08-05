import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../context/api/api'

const FarmerAdd = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    national_id: "",
    farm_name: "",
    username: "",
    email: "",
    password: "",
    role: "farmer",
  })
    const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("core/auth/register/", form);
      toast.success("Farmer added successfully");
      setTimeout(() => navigate("/admin-dashboard/admin/farmer"), 1000);

    } catch (err) {
      const error = err.response?.data;
      toast.error(
        error ? Object.values(error).flat().join(" ") : "Failed to add porter"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => navigate("/admin-dashboard/admin/farmer")}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2"
            >
              ← Back to Farmers
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
              Add New Farmer
            </h1>
            <p className="text-gray-500 text-sm">
              Fill in the details below to register a farmer.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
        >

          {/* Personal Info */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  placeholder="0712345678"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  National ID
                </label>
                <input
                  name="national_id"
                  value={form.national_id}
                  onChange={handleChange}
                  placeholder="12345678"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>


              <div>
                <label className="block text-sm font-medium mb-2">
                  Farm Name
                </label>
                <input
                  name="farm_name"
                  value={form.farm_name}
                  onChange={handleChange}
                  placeholder="Farm A"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

            </div>
          </div>

          {/* Login */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Login Credentials
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="john.doe"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@gmail.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t px-6 py-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin-dashboard/admin/farmer")}
              className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Porter"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FarmerAdd