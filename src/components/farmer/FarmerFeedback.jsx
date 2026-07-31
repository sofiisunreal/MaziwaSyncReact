import React, { useEffect, useState } from 'react'
import api from '../context/api/api'

const FarmerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)

  const [showForm,setShowForm]=useState(false)
  const[editingId,setEditingId]=useState(null)

  const[title,setTitle]=useState("")
  const[description,setDescription]=useState("")

  const FetchFeedback = async () => {
    try {
      const { data } = await api.get("farmer/feedback/")
      console.log(data)
      setFeedbacks(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    FetchFeedback()
  }, [])

  if (loading) return (<>
    <p className='p-6 text-gray-500'>Loading Feedback...</p>
  </>
  )
  // delete feedback
  const HandleDelete=async (id) => {
    const confirmDelete=window.confirm("Delete this feedback? ")
    if (!confirm) return
    try {
      await api.delete(`farmer/feedback/${id}`)
      FetchFeedback()
    } catch (error) {
      console.log(error)
    }
  }
  // edit feedback 
  const HandleEdit=(feedback)=>{
    setTitle(feedback.title)
    setDescription(feedback.description)
    setEditingId(feedback.id)
    setShowForm(true)
  
  }

  // cancel 
  const HandleCancel=()=>{
    setTitle("")
    setDescription("")
    setEditingId(null)
    setShowForm(false)
  
  }
  // on submit 
  const HandleSubmit=async (e) => {
    e.preventDefault()
    const data={title,description}
    try {
      if (editingId){
        const res=await api.patch(`farmer/feedback/${editingId}/`,data)
        console.log(res)
      }      else{
        const res= await api.post("farmer/feedback/",data)
        console.log(res)
      }
      setTitle("")
      setDescription("")
      setEditingId(null)
      setShowForm(false)
      FetchFeedback()

    } catch (error) {
      
    }
    
  }
  return (
    <div className='p-4 md:p-4 space-y-6'>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">FeedBacks</h1>
          <p>View and submit feedback</p>
        </div>
        <button onClick={()=>setShowForm(!showForm)} className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-lg py-1">
          {showForm? "Close Form":"Add Feedback"}
        </button>
      </div>

      {/* form here  */}
      {showForm &&(
        <div>
          <h2>{editingId?"Editing" : "Add Feedback"}</h2>
          <form onSubmit={HandleSubmit}action="" className='space-y-4'>
            <input type="text" placeholder='Feedback title' className='w-full border border-green-500 rounded-lg p-3' required value={title} onChange={(e)=>setTitle(e.target.value)} />

            <textarea rows={4} placeholder='Write your feedback' className='w-full border border-green-500 rounded-lg p-3' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>

            <div className="flex gap-4">
              <button className='bg-green-600 text-white hover:bg-green-700 px-5 py-2 rounded-lg' type='submit'>
                {editingId?"Update Feedback":"Submit Feedback"}
              </button>
              <button onClick={()=>HandleCancel()}type='button' className='bg-red-200 hover:bg-red-300 py-2 px-5 rounded-lg text-red-500'>
                  cancel
              </button>
            </div>
          </form>
        </div>
      )
      }

      {/* feedback list  */}
      {feedbacks?.length === 0 ? (
        <div className='bg-white rounded-xl text-center text-gray-500'>
          No feedback submitted
        </div>
      ) : (
        feedbacks?.map((feedback) => (
          <div key={feedback.id} className='bg-green-50 rounded-xl p-4 hover:bg-green-100 hover:shadow-sm transition'>
            <div className="flex justify-between items-start mb-3">
              <h3 className='font-semibold text-gray-800'>{feedback.title}</h3>

              <span className={`text-md px-3 py-1 rounded-full font-medium ${feedback.status === "RESOLVED"
                ? "bg-green-100 text-green-700"
                : feedback.status === "REJECTED"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
                }`}>
                {feedback.status}
              </span>
            </div>

            <p className="text-gray-600 mb-3">
              {feedback.description}
            </p>
            <div className="flex gap-2 mb-3">
              <button onClick={()=>HandleEdit(feedback)} className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm hover:bg-blue-200">
                <i className="bi bi-pencil-square me-2"></i>
                Edit
              </button>
              <button onClick={()=>HandleDelete(feedback.id)} className="px-3 py-1 rounded-lg bg-red-100 text-red-700 text-sm hover:bg-red-200">
                <i className="bi bi-trash me-2"></i>
                Delete
              </button>
            </div>
            <div>
              <span>
                <i className="bi bi-calendar3 me-2 text-blue-600"></i>
                {new Date(feedback.created_at).toLocaleDateString()}
              </span>

            </div>
          </div>
        ))
      )}

    </div>
  )
}

export default FarmerFeedback