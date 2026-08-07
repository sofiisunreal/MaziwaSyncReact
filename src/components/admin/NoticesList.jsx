import React, { use, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../context/api/api'
import { useNavigate } from 'react-router-dom'

const targetStyles = {
  all: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  members: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  staff: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  board: 'bg-violet-50 text-violet-700 ring-violet-600/20',
}

const getTargetStyle = (target) =>
  targetStyles[target?.toLowerCase()] || 'bg-slate-100 text-slate-700 ring-slate-600/20'

const PlusIcon = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10 4a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H5a1 1 0 1 1 0-2h4V5a1 1 0 0 1 1-1Z" />
  </svg>
)

const PencilIcon = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M13.586 3.586a2 2 0 0 1 2.828 2.828l-8.5 8.5a2 2 0 0 1-.878.507l-3 .857a.5.5 0 0 1-.618-.618l.857-3a2 2 0 0 1 .507-.878l8.5-8.5a2 2 0 0 1 .304-.196Z" />
  </svg>
)

const TrashIcon = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8.75 1a.75.75 0 0 0-.75.75V3H4a.75.75 0 0 0 0 1.5h.276l.66 10.29A2.25 2.25 0 0 0 7.183 17h5.634a2.25 2.25 0 0 0 2.247-2.21l.66-10.29H16A.75.75 0 0 0 16 3h-4v-1.25a.75.75 0 0 0-.75-.75h-2.5ZM8.5 7.25a.75.75 0 0 1 1.5 0v6.5a.75.75 0 0 1-1.5 0v-6.5Zm3 0a.75.75 0 0 1 1.5 0v6.5a.75.75 0 0 1-1.5 0v-6.5Z" clipRule="evenodd" />
  </svg>
)

const BellIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
  </svg>
)

const NoticesList = () => {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [editingId, setEditingId] = useState(null)

  const handleDelete = async (id) => {
    try {
      await api.delete(`cooperative/notice/${id}`)
      toast.success("Notice deleted successfully")
      FetchNotices()
    } catch (error) {
      toast.error("Failed to delete notice")
    }
  }

  const FetchNotices = async () => {
    setLoading(true)
    try {
      const { data } = await api.get("cooperative/notice")
      setNotices(data)
      console.log(data)
    } catch (error) {
      toast.error("Failed to fetch notices")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    FetchNotices()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 mb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Notices</h2>
            <p className="mt-1 text-sm text-slate-500">View and add notices</p>
          </div>
          <button
            onClick={() => navigate("/admin-dashboard/admin/notices/add")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <PlusIcon className="h-4 w-4" />
            Add Notice
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-xl border border-slate-200 bg-white p-5">
                <div className="h-5 w-1/3 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-2/3 rounded bg-slate-100" />
                <div className="mt-4 h-5 w-20 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && notices.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <BellIcon className="h-10 w-10 text-slate-300" />
            <h3 className="mt-3 text-base font-semibold text-slate-800">No notices yet</h3>
            <p className="mt-1 text-sm text-slate-500">Notices you add will show up here.</p>
            <button
              onClick={() => navigate("/admin-dashboard/admin/notices/add")}
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <PlusIcon className="h-4 w-4" />
              Create your first notice
            </button>
          </div>
        )}

        {/* Notices list */}
        {!loading && notices.length > 0 && (
          <div className="space-y-3">
            {notices.map((n) => (
              <div
                key={n.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:shadow-md hover:border-slate-300"
              >
                <div className="min-w-0">
                  <h1 className="truncate text-lg font-bold text-slate-900">{n.title}</h1>
                  <p className="mt-1 text-sm text-slate-600 line-clamp-2">{n.message}</p>
                  <span className={`mt-3 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getTargetStyle(n.target)}`}>
                    {n.target}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => navigate(`/admin-dashboard/admin/notices/edit/${n.id}`)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    aria-label="Edit notice"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                    aria-label="Delete notice"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NoticesList
