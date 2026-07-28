import React, { useEffect, useState } from 'react'
import api from '../context/api/api'

const CollectMilk = () => {
    const [national_id, setNationalId] = useState("")
    const [litres, setLitres] = useState("")
    const [session, setSession] = useState("MORNING")

    const [dashboard, setDashboard] = useState(null)

    // ui hooks
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const FetchDashboard = async () => {
        try {
            const { data } = await api.get("collector/dashboard/")
            setDashboard(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        FetchDashboard()
    }, [])

    // function to handle submit
    const HandleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setMessage("")

        // preparing our data
        const data = {
            national_id: national_id,
            litres: Number( litres),
            session: session
        }
        // console.log(data)
        try {
            const res = await api.post("collector/milk_collections/add/", data)
            console.log(data)
            console.log(res)
            if (res?.data.error) {
                setLoading(false)
                setMessage("")
                setError(res?.data?.error)
                return
            }
            setMessage(`${res?.data.message} for ${res?.data?.farmer}`)
            setNationalId("")
            setLitres("")
            setLoading(false)
            FetchDashboard()
        } catch (error) {
            setError(error.response?.data?.message)
            setLoading(false)
        }
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 p-6">
            <div className="xl:col-span-3 card">
                <h2 className="text-3xl font-bold mb-6">Milk Collection</h2>
                {message && <div className="mt-5 p-3 rounded-lg bg-green-100 text-green-700">{message}</div>}
                {error && <div className="mt-5 p-3 rounded-lg bg-red-100 text-red-700">{error}</div>
                }

                <form onSubmit={HandleSubmit}>
                    <div>
                        <label htmlFor="" className='form-label'>Farmer ID</label>
                        <input type="text" className='milk-input' placeholder="National ID.." required value={national_id} onChange={(e) => setNationalId(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="" className='form-label'>Litres Collected</label>
                        <input type="number" className='milk-input' placeholder='55' required value={litres} onChange={(e) => setLitres(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="" className='form-label' >Select Session</label>
                        <select className="milk-input" name="" id="" value={session} onChange={(e) => setSession(e.target.value)}>
                            <option value="MORNING">Morning</option>
                            <option value="EVENING">Evening</option>
                        </select>
                    </div>
                    <button type='submit' disabled={loading} className='milk-btn mt-4'>
                        {loading ? "Saving...." : "Record Collection"}
                    </button>
                </form>
            </div>
            <div className="space-y-6 xl:col-span-2">
                <div className="card">
                    <h3 className="text-lg font-semibold mb-4">Today's Summary</h3>
                    <div className="grid grid:cols-1 gap-3">
                        <div className="stat-card">
                            <p className="stat-label">Farmers</p>
                            <p className='stat-value'>{dashboard?.assigned_farmers}</p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-label">Collections</p>
                            <p class="stat-value">{dashboard?.collections_today}</p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-label">Litres</p>
                            <p className="stat-value">{dashboard?.total_litres_today}</p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-label">Amount</p>
                            <p className='stat-value'>{dashboard?.total_amount_today}</p>
                        </div>
                    </div>
                    <div className="card">
                        <h3 className="text-lg font-semibold mb-3">Date</h3>
                        <p>{dashboard?.date || "--"}</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CollectMilk
