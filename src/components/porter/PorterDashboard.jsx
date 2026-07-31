import React, { useEffect, useState } from 'react'
import api from '../context/api/api'

const PorterDashboard = () => {
  const [dashboard, setDashboard] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const FetchDashboard = async () => {
    // console.log("object");
    try {
      const res = await api.get("collector/dashboard/")
      console.log(res.data);
      setDashboard(res.data)

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    FetchDashboard()
  }, [])

  if (loading) return <p className="p-6 text-gray-500">Loading ...</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>

  // destructuring
  const {
    assigned_farmers,
    date,
    employee_id,
    last_collections,
    porter_name,
    route_name,
    total_amount_today,
    total_collections_today,
    total_litres_month,
    total_litres_today,
    total_litres_week
  } = dashboard
  return (
    <div className="p-4 md:p-6 space-y-5 bg-gray-50 shadow min-h-screen">
      <div className="bg-white p-5 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-gray-800">Porter Dashboard</h1>
        <p className="text-gray-400 text-sm mt-2">Welcome back, <span className="font-semibold text-gray-600">{porter_name}</span></p>
      </div>
      {/* // kpi cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border-t-4 border-green-400 hover:shadow-md transition">
          <p>Assigned Farmers</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">{assigned_farmers}</h2>
          <i className="bi bi-people-fill text-green-400 text-2xl float-right -mt-8"></i>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border-t-4 border-green-400 hover:shadow-md transition">
          <p>Collections Today</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">{total_collections_today}</h2>
          <i className="bi bi-journal-check text-green-400 text-2xl float-right -mt-8"></i>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border-t-4 border-green-400 hover:shadow-md transition">
          <p>Litres Today</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">{total_litres_today}</h2>
          <i className="bi bi-droplet-fill text-green-400 text-2xl float-right -mt-8"></i>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border-t-4 border-green-400 hover:shadow-md transition">
          <p>Amount Today</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">{total_amount_today}</h2>
          <i className="bi bi-cash-stack text-green-400 text-2xl float-right -mt-8"></i>
        </div>

      </div>


      {/* weekly and monthly */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
          <p className="text-sm text-gray-400">Weekly Production</p>
          <h2 className="text-xl font-bold text-green-600 mt-2">{total_litres_week}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
          <p className="text-sm text-gray-400">Monthly Production</p>
          <h2 className="text-xl font-bold text-green-600 mt-2">{total_litres_month}</h2>
        </div>
      </div>
      {/* last collections */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-700">Last 5 collections</h3>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="p-3">Farmers</th>
                <th className="p-3">Litres</th>
                <th className="p-3">Session</th>
                <th className="p-3">Date</th>
                <th className="p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {last_collections.map((col) => {
                <tr key={col.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-3 capitalize">{col.farmer_name}</td>
                  <td className="p-3 ">{col.litres}</td>
                  <td className="p-3 ">{col.session}</td>
                  <td className="p-3 ">{col.collection_date}</td>
                  <td className="p-3 ">{col.total_amount}</td>
                </tr>
              })
              }
            </tbody>
          </table>
        </div>

        {/* mobile cards */}
        <div className="md:hidden space-y-2 p-3">
          {last_collections.map((col) => {
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-semibold text-gray capitalize">{col.farmer_name}</p>
              <p className="text-sm text-gray-500">{col.litres}L {col.session}</p>
              <p className="text-sm text-gray-500">{col.collection_date}</p>
              <p className="font-semibold text-green-500">Ksh:{col.total_amount}</p>
            </div>
          })}
        </div>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 p-5 rounded-xl shadow-sm text-center">
          <p className="text-sx text-gray-400 uppercase tracking-wide">Employee</p>
          <p className="font-semibold text-gray-700 mt-4porter_name}">{porter_name}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 p-5 rounded-xl shadow-sm text-center">
          <p className="text-sx text-gray-400 uppercase tracking-wide">Employee</p>
          <p className="font-semibold text-gray-700 mt-4">{employee_id}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 p-5 rounded-xl shadow-sm text-center">
          <p className="text-sx text-gray-400 uppercase tracking-wide">Employee</p>
          <p className="font-semibold text-gray-700 mt-4">{route_name}</p>
        </div>
      </div>
    </div>

  )
}

export default PorterDashboard