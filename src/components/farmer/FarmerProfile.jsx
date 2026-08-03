import React, { useContext, useEffect, useState } from 'react'
import api from '../context/api/api'

const FarmerProfile = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const FetchProfile = async () => {
            try {
                const res = await api.get("core/auth/me")
                setData(res.data)
            }
            catch (error) {
                console.log(error);
                setError("Failed to load profile");
            } finally {
                setLoading(false)
            }
        }
        FetchProfile();

    }, []);
    if (loading) return <div className='p-6 text-gray-500'>Loading Profile..</div>
    if (error) return <div className="p-6 text-gray-500">{error}</div>

    const {
        username,
        role,
        profile = {},
    } = data || {};
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6">

            {/* HERO CARD */}
            <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold">
                            {username?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold">{username}</h1>
                            <p className="capitalize opacity-90">{role}</p>
                        </div>
                    </div>

                    <div className="bg-white/15 backdrop-blur rounded-xl px-6 py-4">
                        <p className="text-sm opacity-80">Account Status</p>
                        <p className="text-2xl font-bold">Active</p>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-gray-400 uppercase text-xs mb-2">
                        First Name
                    </h3>
                    <p className="text-lg font-semibold text-gray-800">
                        {profile?.first_name || "-"}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-gray-400 uppercase text-xs mb-2">
                        Last Name
                    </h3>
                    <p className="text-lg font-semibold text-gray-800">
                        {profile?.last_name || "-"}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-gray-400 uppercase text-xs mb-2">
                        Phone Number
                    </h3>
                    <p className="text-lg font-semibold text-gray-800">
                        {profile?.phone_number || "-"}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-gray-400 uppercase text-xs mb-2">
                        Farm Name
                    </h3>
                    <p className="text-lg font-semibold text-gray-800">
                        {profile?.farm_name || "-"}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-gray-400 uppercase text-xs mb-2">
                        Username
                    </h3>
                    <p className="text-lg font-semibold text-gray-800">
                        {username}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-gray-400 uppercase text-xs mb-2">
                        System ID
                    </h3>
                    <p className="text-lg font-semibold text-gray-800">
                        #{data?.id}
                    </p>
                </div>

            </div>

        </div>
    )
}

export default FarmerProfile