import React, { useState } from 'react'
import api from '../context/api/api'
import ReactMarkdown from "react-markdown"


const CattleAI = () => {
    const [form, setForm] = useState({
        Animal: "cow",
        Temperature: "",
        Age: "",
        Description: ""
    })
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // function to handle changes in the form 
    const HandleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const HandleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setResult(null)

        const payload = {
            ...form,
            Temperature: Number(form.Temperature),
            Age: Number(form.Age)
        }
        try {
            const { data } = await api.post("farmer/predict/", payload)
            console.log(data)
            setResult(data)
        } catch (error) {
            setError("Prediction Failed")
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className="grid grid-cols-5 gap-6 p-6 items-start">
            <div className="  col-span-2 card">
                <h2 className="text-2xl font-bold mb-4">Cattle AI</h2>
                {error && <div className='bg-red-100 text-red-600 p-2 rounded mb-3'>{error}</div>}
                <form onSubmit={HandleSubmit} action="" className="space-y-4">
                    <select className="milk-input" name="Animal"
                        value={form.Animal}
                        onChange={HandleChange} id="">
                        <option value="">Select Animal</option>
                        <option value="cow">Cow</option>
                        <option value="goat">Goat</option>
                        <option value="sheep">Sheep</option>
                    </select>
                    <input type='number' name='Temperature' placeholder='Temperature F' required value={form.Temperature} onChange={HandleChange} className="milk-input" />
                    <input type="number" value={form.Age} required placeholder='Age' name='Age' onChange={HandleChange} className="milk-input" />
                    <textarea className='milk-input' name="Description" rows={4} placeholder='Describe the symptoms of your cattle...' value={form.Description} onChange={HandleChange} id=""></textarea>
                    <button type='submit' className='milk-btn w-full' disabled={loading}>
                        {loading ? "Analysing..." : "Predict"}
                    </button>
                </form>
            </div>
            <div className="col-span-3 space-y-4">
                {result && (
                    <>
                        <div className="card">
                            <h3 className="font-semibold">Disease</h3>
                            <p className=" text-2xl text-green-500 capitalize font-bold">                      
                                  {result.predicted_disease}
                            </p>
                        </div>
                        <div className="card">
                            <h3 className="font-semibold mb-2">Symptoms</h3>
                            <div className="flex flex-wrap gap-2">
                                {result.extracted_symptoms_by_ai?.map((item, i) => (
                                    <span
                                        key={i}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="card">
                            <h3 className="font-semibold mb-2">Treatment</h3>
                            <ReactMarkdown>
                                {result.treatment_recommendation}
                            </ReactMarkdown>
                        </div>
                    </>)}
            </div>
        </div>
    )
}

export default CattleAI