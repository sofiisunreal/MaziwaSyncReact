import React, { useEffect, useState } from "react";
import api from "../context/api/api";


const MyCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const FetchCollections = async () => {
    try {
      const { data } = await api.get("collector/collections/my/");
      console.log(data)
      setCollections(data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchCollections()
  }, []);

  const totalLitres=collections.reduce(
    (sum,col)=>sum+Number(col.litres),0
  )
  const totalAmount=collections.reduce(
    (sum,col)=>sum + Number(col.total_amount),0
  )
  return (
    <div className="space-y-6 p-6">

      <div>
        <h1 className="text-3xl font-bold">My Collections</h1>
        <p className="text-gray-500">View your milk collection history.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <p className="stat-label">Collections</p>
          <p className="stat-value">{collections?.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Liters</p>
          <p className="stat-value">{totalLitres} L</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Earnings</p>
          <p className="stat-value"> {totalAmount}</p>
        </div>
      </div>



      <div className="card">

        <h2 className="text-xl font-semibold mb-4">
          Collection Records
        </h2>

        {loading ? (
          <p>Loading collections...</p>
        ) : collections.length === 0 ? (
          <p className="text-gray-500">No collections found.</p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full p-5">

              <thead className="bg-gradient-to-r from-green-100 to-green-300 p-5">
                <tr className="border-b text-left p-5">
                  <th className="py-3 pl-3">Date</th>
                  <th className="py-3">Session</th>
                  <th className="py-3">Litres</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Amount</th>
                </tr>
              </thead>

              <tbody>

                {collections?.map((col) => (
                  <tr key={col.id} className="border-b hover:bg-green-50 pl-3">

                    <td className="py-3">
                      {col.collection_date}
                    </td>

                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${col.session === "MORNING"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                        }`}>
                        {col.session}
                      </span>
                    </td>

                    <td className="py-3">
                      {col.litres}
                    </td>

                    <td className="py-3">
                      {col.price_per_litre}
                    </td>

                    <td className="py-3 font-semibold text-green-600">
                      {col.total_amount}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>)
}

export default MyCollections