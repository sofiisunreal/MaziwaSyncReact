import React, { use, useEffect, useState } from 'react'
import api from '../context/api/api'

const AdminDashboard = () => {
    const [dashboard, setDashboard] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const FetchDashboard = async () => {
        try {
            const { data } = await api.get("cooperative/dashboard/")
            console.log(data)
            setDashboard(data)
        } catch (error) {
            console.log(error)
            setError("Failed to load dashboard")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        FetchDashboard()
    }, [])
    if (loading) return <p className='p-6 text-gray-400'>Loading Dashboard...</p>;
    if (error) return <p className='p-6 text-red-500'>{error}</p>

    return (
        <div className='p-4 md:p-6 space-y-5 bg-gray-50 min-h-screen'>
            <div className="bg-white p-5 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm mt-1">Overview of your milk production</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className='bg-white p-5 rounded-xl shadow-sm border-t-4 border-green-400 hover:shadow-md transition'>
                    <p className='text-sm text-gray-400'>Total Farmers</p>
                    {/* <h2 className='text-2xl font-bold text-gray-800 mt-1'>{dashboard.farmers} </h2> */}
                </div>
            </div>
        </div>

    )
}

export default AdminDashboard