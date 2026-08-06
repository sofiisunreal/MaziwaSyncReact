import React, { useEffect, useState } from 'react'
import api from '../context/api/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const FarmersBal = () => {
    const [balance, setBalance] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate=useNavigate()
    const FetchBalance = async () => {
        setLoading(true)
        try {
            const { data } = await api.get("cooperative/farmers/balance/")
            setBalance(data)
            console.log(data)
        } catch (error) {
            toast.error("Failed to fetch farmers with balances")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        FetchBalance()
    }, [])

    return (
        <div className="p-5">
            <div className="flex flex-col md:flex-row justify-between gap-3 mb-5">
                <h2 className="text-2xl font-bold text-gray-800">Farmers with Balance</h2>
            </div>
            {loading && <><p>Loading..</p></>}
            {!loading && !balance?.length && <><p>No farmers with balances found</p></>}
            {balance?.length > 0 && (
                <div className="hidden md:block card overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b text-gray-500">
                            <tr>
                                <th className="p-3">Farmer</th>
                                <th className="p-3">Total Earned</th>
                                <th className="p-3">Paid</th>
                                <th className="p-3">Balance</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {balance.map((b) => (
                                <tr className="border-b" key={b.id}>
                                    <td className="p-3">
                                        <b>{b.farmer}</b>
                                    </td>
                                    <td className="p-3">
                                        <b>{b.earned}</b>
                                    </td>
                                    <td className="p-3">
                                        <b>{b.paid}</b>
                                    </td>
                                    <td className="p-3">
                                        <b>{b.balance}</b>
                                    </td>
                                    <td className="p-3">
                                        <span>
                                            {b.balance > 0 ?
                                                <button onClick={ ()=>navigate("/admin-dashboard/admin/farmer/payfarmer")}className='milk-btn'>Pay Farmer</button>
                                                :"Farmer Balance Cleared"
                                            }
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
            }
        </div>
    )
}

export default FarmersBal