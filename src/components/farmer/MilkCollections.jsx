import React, { useEffect, useState } from 'react'
import api from '../context/api/api'

const MilkCollections = () => {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)

  const FetchCollections = async () => {
    try {
      const { data } = await api.get("farmer/farmercollection");
      console.log(data)
      setCollections(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    FetchCollections()
  }, [])

  const totalLitres = collections.reduce(
    (sum, col) => sum + Number(col.litres), 0
  )

  const totalAmount = collections.reduce(
    (sum, col) => sum + Number(col.total_amount), 0
  )

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>My Milk Collections</h1>
        <p className='text-sm text-gray-500'>View the milk produced that has been collected</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className="stat-card">
          <h1 className='stat-label'>Collections</h1>
          <h2 className='stat-value'>{collections?.length}</h2>
        </div>

        <div className="stat-card">
          <h1 className="stat-label">Total Litres</h1>
          <h2 className='stat-value'>{totalLitres}</h2>
        </div>

        <div className="stat-card">
          <h1 className='stat-label'>Total Amount</h1>
          <h2 className='stat-value'>{totalAmount}</h2>
        </div>
      </div>
      <div className='card'>
        <h1 className='font-bold'>Record of collections</h1>

        {loading ? (
          <p>Loading collections...</p>
        ) : collections.length === 0 ? (
          <p>No collections Found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className='px-3 py-4 text-left'>Date</th>
                  <th className='px-3 py-4 text-left'>Porter</th>
                  <th className='px-3 py-4 text-left'>Litres</th>
                  <th className='px-3 py-4 text-left'>Price Per Litre</th>
                  <th className='px-3 py-4 text-left'>Amount</th>
                  <th className='px-3 py-4 text-left'>Session</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {collections?.map((col) => (
                  <tr key={col.id} className="border-b hover:bg-green-50 pl-3">

                    <td className="py-3">
                      {col.collection_date}
                    </td>
                    <td className='py-3'>

                      {col.porter_name}
                    </td>

                    <td className="py-3">
                      {col.litres}
                    </td>

                    <td className="py-3">
                      {col.price_per_litre}
                    </td>

                    <td className="py-3 font-semibold text-green-600">
                      KSh {Number(col.total_amount).toLocaleString()}                   
                    </td>

                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${col.session === "MORNING"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                        }`}>
                        {col.session}
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
    </div>
  )
}

export default MilkCollections