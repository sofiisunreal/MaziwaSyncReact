import React, { use, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../context/api/api'
import { toast } from 'react-toastify'
const PorterEdit = () => {
    const { id } = useParams() //extract id from the url
    // console.log(id)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        national_id: "",
        employee_id: "",
        route_name: "",
        is_active: true
    })
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const FetchPorter = async () => {
        try {
            const { data } = await api.get(`cooperative/porters/${id}/`)
            console.log(data)
            setForm({
                first_name: data.first_name,
                last_name: data.last_name,
                phone_number: data.phone_number,
                national_id: data.national_id,
                employee_id: data.employee_id,
                route_name: data.route_name,
                is_active: data.is_active

            })
        } catch (error) {
            toast.error("Failed to load Porter details")
        } finally {
            setFetching(false)
        }
    }
    useEffect(() => {
        FetchPorter()
    }, [])

    const HandleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm({ ...form, [name]: type === "checkbox" ? checked : value })
    }
    const HandleSubmit=async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await api.patch(`cooperative/porters/${id}/`,form)
            toast.success("Porter updated successfully")
            setTimeout(()=>navigate("/admin-dashboard/admin/porters"),1500)
        } catch (error) {
            toast.error("Failed to update")
        }finally{
            setLoading(false)
        }
        
    }
    if (fetching) return <p className="p-6 text-gray-500">Loading Porter...</p>
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <button className="text-gray-500 hover:text-gray-700 space-y-5" onClick={() => navigate("/admin-dashboard/admin/porters")}>
                    Back
                </button>
                <h2 className="text-3xl font-bold text-gray-600">
                    Edit Porter
                </h2>
            </div>
            <form action="" onSubmit={HandleSubmit}>
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

                    <label htmlFor="" className="form-label">Employee ID</label>
                    <input type="text" name='employee_id' className='milk-input' value={form.employee_id} onChange={HandleChange} required />

                    <label htmlFor="" className="form-label">Route Name</label>
                    <input type="text" name='route_name' className='milk-input' value={form.route_name} onChange={HandleChange} required />

                    <div className="flex items-center gap-3 pt-2">
                        <input type="checkbox" className="w-4 h-4 accent-teal-600" name='is_active' checked={form.is_active} onChange={HandleChange}/>
                    </div>

                    <button type='submit' className='milk-btn w-full' disabled={loading}>
                            {loading?"Saving":"Save Changes"}
                    </button>

                </div>
            </form>
        </div>
    )
}

export default PorterEdit