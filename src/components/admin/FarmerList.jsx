import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../context/api/api'

const FarmerList = () => {
    const [farmers, setFarmers] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const FetchFarmers = async () => {
        setLoading(true)
        try {
            const { data } = await api.get("cooperative/farmers")
            console.log(data)
            setFarmers(data)
        } catch (error) {
            toast.error("Failed to load farmers")
        } finally {
            setLoading(false)
        }
    }
    const HandleDelete = async (id, name) => {
        if (!window.confirm(`Delete ${name}`)) return

        try {
            await api.delete(`cooperative/farmers/${id}/`)
            toast.success("Farmer deleted succesfully")
            FetchFarmers()
        } catch (error) {
            toast.error("Failed to delete farmer")
        }
    }
    useEffect(() => {
        FetchFarmers()
    }, [])

    return (
        <div className="p-5">
            <div className="flex flex-col md:flex-row justify-between gap-3 mb-5">
                <h2 className="text-2xl font-bold text-gray-800">Farmers</h2>
                <button className="milk-btn" onClick={() => navigate("add")}>Register Farmer</button>
            </div>
            {loading && <><p>Loading..</p></>}
            {!loading && !farmers?.length && <><p>No farmers found</p></>}
            {farmers?.length > 0 && (
                <div>
                    {/* desktop  */}
                    <div className="hidden md:block card overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b text-gray-500">
                                <tr>
                                    <th className="p-3"> Employee</th>
                                    <th className="p-3">Contact</th>
                                    <th className="p-3">Farm Name</th>
                                    <th className="p-3">Perfomance</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {farmers.map((f) => (
                                    <tr className="border-b" key={f.id}>
                                        <td className="p-3">
                                            <b>{f.first_name} {f.last_name}</b>
                                        </td>
                                        <td className="p-3">
                                            {f.phone_number} <br /> {f.national_id}
                                        </td>
                                        <td className="p-3">
                                            {f.farm_name}
                                        </td>
                                        <td className="p-3">
                                            collections:{f.total_collections ?? 0}
                                            <br /> {f.total_litres_collected ?? 0} L
                                        </td>
                                        <td className="p-3">
                                            <span className={f.is_active
                                                ? "bg-green-100 text-green-700 px-3 py-1 rounded"
                                                : "bg-red-100 text-red-700 px-2 py-1 rounded"
                                            }>
                                                {f.is_active ? "Active" : "InActive"}
                                            </span>
                                        </td>
                                        <td className="p-3 flex gap-3">
                                            <button
                                                onClick={() => navigate(`/admin-dashboard/admin/farmer/edit/${f.id}`)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => HandleDelete(f.id, f.name)}
                                                className="bg-red-500 text-white px-3 py-1 rounded ml-2">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* mobile  */}
                    <div className="md:hidden space-y-3">
                        {farmers.map((f) => (
                            <div key={f.id} className="card p-4">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-bold">{f.first_name} {f.last_name}</h3>
                                    </div>
                                    <i className={f.is_active ?
                                        "bi bi-check-circle-fill text-green-600" :
                                        "bi bi-x-circle-fill text-red-600"}></i>
                                </div>
                                <div className="mt-3 text-sm space-y-1">
                                    <p><i className="bi bi-telephone-fill text-blue-500"></i> {f.phone_number}</p>
                                    <p><i className="bi bi-person-vcard-fill text-blue-500"></i> {f.national_id}</p>
                                    <p><i className="bi bi-truck text-blue-500"></i> {f.farm_name}</p>
                                    <p><i className="bi bi-droplet-fill text-blue-500"></i> {f.total_litres_collected} L</p>
                                    <p><i className="bi bi-calendar-event-fill text-blue-500"></i> {f.hire_date}</p>
                                </div>
                                <div className="mt-3">
                                    <button
                                        onClick={() => navigate(`/admin-dashboard/admin/farmer/edit/${f.id}`)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => HandleDelete(f.id, f.name)}
                                        className="bg-red-500 text-white px-3 py-1 rounded ml-2">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}

        </div>

    )
}

export default FarmerList