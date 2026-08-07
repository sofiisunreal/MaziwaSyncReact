import React, { useState } from 'react'
import { toast } from 'react-toastify'
import api from '../context/api/api'
import { useNavigate } from 'react-router-dom'

const targetStyles = {
  ALL: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  PORTERS: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  FARMERS: 'bg-sky-50 text-sky-700 ring-sky-600/20',
}

const getTargetStyle = (target) =>
  targetStyles[target] || 'bg-slate-100 text-slate-700 ring-slate-600/20'

const targetLabels = {
  ALL: 'ALL',
  PORTERS: 'Porters',
  FARMERS: 'Farmers',
}

const ArrowLeftIcon = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
  </svg>
)

const ChevronDownIcon = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
)

const SpinnerIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
  </svg>
)

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"

const NoticesAdd = () => {
  const [form, setForm] = useState({
    title: "",
    message: "",
    target: "",
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post("cooperative/notice/", form)
      toast.success("Notice added successfully")
      setTimeout(() => {
        navigate("/admin-dashboard/admin/notices")
      }, 1000)
    } catch (err) {
      const error = err.response?.data
      toast.error(
        error
          ? Object.values(error).flat().join(" ")
          : "Failed to add notice"
      )
    } finally {
      setLoading(false)
    }
  }

  const hasPreview = form.title || form.message || form.target

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-xl">
        <button
          type="button"
          onClick={() => navigate("/admin-dashboard/admin/notices")}
          className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-700"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to notices
        </button>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Add Notice</h2>
          <p className="mt-1 text-sm text-slate-500">Share an update with your cooperative</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Title</label>
              <input
                className={inputClass}
                type="text"
                name="title"
                value={form.title}
                required
                placeholder="Notice Title"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Message</label>
              <textarea
                className={`${inputClass} min-h-[100px] resize-y`}
                name="message"
                value={form.message}
                required
                placeholder="Notice Message"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Target</label>
              <div className="relative">
                <select
                  name="target"
                  className={`${inputClass} appearance-none pr-9`}
                  onChange={handleChange}
                  value={form.target}
                  required
                >
                  <option value="">Select Target Group</option>
                  <option value="ALL">ALL</option>
                  <option value="PORTERS">Porters</option>
                  <option value="FARMERS">Farmers</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {loading && <SpinnerIcon className="h-4 w-4 animate-spin" />}
              {loading ? "Posting..." : "Post Notice"}
            </button>
          </form>
        </div>

        {/* Live preview */}
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">Preview</p>
          {hasPreview ? (
            <div>
              <h1 className="text-lg font-bold text-slate-900">{form.title || "Untitled notice"}</h1>
              <p className="mt-1 text-sm text-slate-600">{form.message || "No message yet"}</p>
              {form.target && (
                <span className={`mt-3 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getTargetStyle(form.target)}`}>
                  {targetLabels[form.target]}
                </span>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-400">Fill in the fields above to see how it'll look on the notice board.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoticesAdd
