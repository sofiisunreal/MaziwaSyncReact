import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import api from '../context/api/api'

const FarmerEdit = () => {
  const {id}=useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    national_id: "",
    farm_name: "",
    username: "",
    email: "",
    is_active: true
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  const FetchFarmers = async () => {
    try {
      const { data } = await api.get(`cooperative/farmers/${id}/`)
      console.log(data)
      setForm({
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        national_id: data.national_id,
        farm_name: data.farm_name,
        username: data.username,
        email: data.email,
        is_active: data.is_active
      })
    } catch (error) {
      toast.error("Failed to load Farmer details")
    } finally {
      setFetching(false)
    }
  }
  useEffect(() => {
    FetchFarmers()
  }, [])

  const HandleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === "checkbox" ? checked : value })
  }
  const HandleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.patch(`cooperative/farmers/${id}/`, form)
      toast.success("Farmer updated successfully")
      setTimeout(() => navigate("/admin-dashboard/admin/farmer"), 1500)
    } catch (error) {
      toast.error("Failed to update")
    } finally {
      setLoading(false)
    }

  }
  if (fetching) return <p className="p-6 text-gray-500">Loading Farmer...</p>

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button className="text-gray-500 hover:text-gray-700 space-y-5" onClick={() => navigate("/admin-dashboard/admin/farmer")}>
          Back
        </button>
        <h2 className="text-3xl font-bold text-gray-600">
          Edit Farmer
        </h2>
      </div>
      <form onSubmit={HandleSubmit} action="">
        <p>Personal Information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label htmlFor="" className="form-label">First Name</label>
          <input type="text" name='first_name' className='milk-input' value={form.first_name} onChange={HandleChange} required />

          <label htmlFor="" className="form-label">Last Name</label>
          <input type="text" name='last_name' className='milk-input' value={form.last_name} onChange={HandleChange} required />

          <label htmlFor="" className="form-label">Phone Number</label>
          <input type="number" name='phone_number' className='milk-input' value={form.phone_number} onChange={HandleChange} required />

          <label htmlFor="" className="form-label">National Id</label>
          <input type="number" name='national_id' className='milk-input' value={form.national_id} onChange={HandleChange} required />

          <label htmlFor="" className="form-label">username</label>
          <input type="text" name='username' className='milk-input' value={form.username} onChange={HandleChange} required />

          <label htmlFor="" className="form-label">Farm Name</label>
          <input type="text" name='farm_name' className='milk-input' value={form.farm_name} onChange={HandleChange} required />

          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" className="w-4 h-4 accent-teal-600" name='is_active' checked={form.is_active} onChange={HandleChange} />
          </div>

          <button type='submit' className='milk-btn w-full' disabled={loading}>
            {loading ? "Saving" : "Save Changes"}
          </button>

        </div>

      </form>
    </div>
  )
}

export default FarmerEdit