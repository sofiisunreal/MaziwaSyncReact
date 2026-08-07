import React, { useState } from 'react'
import api from '../context/api/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PayFarmer = () => {
  const navigate = useNavigate()
  // useLocation hook which is is used to extract the data from the previous component
  const { state } = useLocation()
  // the state contains the farmer object that was passed from the farmer balances component 
  const farmer = state?.farmer
  console.log(farmer)

  const [amount, setAmount] = useState(farmer?.balance || "")
  const [paying, setPaying] = useState(false)
  const HandleSubmit = async (e) => {
    e.preventDefault()
    setPaying(true)
    try {
      const payload = {
        farmer_id: farmer.farmer_id,
        amount: parseFloat(amount)
      }
      const { data } = await api.post("cooperative/payfarmer/", payload)
      toast.success(`Payment to ${data.balance} initiated - ${data.mpesa_response.ResponseDescription}`)
      
    } catch (error) {
      const errors = error.response?.data
      toast.error(
        errors? Object.values(error).flat().join(" ") : "Payment Failed"
      )
    } finally {
      setPaying(false)
    }
  }


  // protect one from navigating  directly to this component without the farmer object

  if (!farmer) {
    return (
      <div className='text-center p-6'>
        <p>No farmer selcted to be paid</p>
        <button onClick={() => navigate("/admin-dashboard/admin/farmer/balance")} className='milk-btn'>
          Back to Balnces
        </button>
      </div>
    )
  }

  return (
    <div className="p-5 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/admin-dashboard/admin/farmer/balance")} className='milk-btn'>
          Back to Balnces
        </button>
        <h2 className='text-2xl font-bold'>Pay Farmer</h2>
      </div>

      {/* stats  */}
      {/* form  */}
      <form action="" onSubmit={HandleSubmit}>
        <p className="text-xs text-teal-600 uppercase font-semibold mb-5 tacking-widest">
          Mpesa Payment
        </p>
        <div className="mb-5">
          <label htmlFor="">Amount (KES)</label>
          <input type="number" className='milk-input' required max={farmer.balance} min={4} value={amount} onChange={(e) => setAmount(e.target.value)} />
          <p className="text-xs text-gray-400 mt-2">Maximum payable: KES{farmer.balance}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-5">
          <p className="text-xs text-green-700">
            <span className="font-semibold">
              Note: </span>Payment will be sent via M-pesa B2C. The farmer will recieve an SMS notification.
          </p>
        </div>
        <button className="milk-btn w-full" type='submit' disabled={paying}>
          {paying ? "Processing..." : `Send KES ${amount} Via MPESA`}
        </button>
      </form>
    </div>
  )
}

export default PayFarmer