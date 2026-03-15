import { useState } from 'react'
import { X, Pencil, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/api'

const DEPARTMENTS = [
    'Engineering', 'Design', 'Product', 'HR',
    'Finance', 'Marketing', 'Operations', 'Sales',
]

export default function EditEmployeeModal({ employee, onClose, onUpdated }) {
    const [form, setForm] = useState({
        full_name: employee.full_name,
        email: employee.email,
        department: employee.department,
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const validate = () => {
        const e = {}
        if (!form.full_name.trim()) e.full_name = 'Full name is required'
        if (!form.email.trim()) e.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address'
        if (!form.department) e.department = 'Department is required'
        return e
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(f => ({ ...f, [name]: value }))
        if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }

        setLoading(true)
        try {
            const res = await api.put(`/api/employees/${employee._id}`, form)
            toast.success(`${res.data.full_name} updated successfully!`)
            onUpdated(res.data)
            onClose()
        } catch (err) {
            toast.error(err.message || 'Failed to update employee')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                            <Pencil size={15} className="text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-slate-800">Edit Employee</h2>
                            <p className="text-xs text-slate-500">{employee.employee_id}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                        <X size={15} className="text-slate-400" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
                    <div>
                        <label className="label">Full Name</label>
                        <input
                            name="full_name"
                            value={form.full_name}
                            onChange={handleChange}
                            className={`input ${errors.full_name ? 'border-red-400' : ''}`}
                        />
                        {errors.full_name && <p className="mt-1.5 text-xs text-red-500">{errors.full_name}</p>}
                    </div>

                    <div>
                        <label className="label">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className={`input ${errors.email ? 'border-red-400' : ''}`}
                        />
                        {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="label">Department</label>
                        <select
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            className={`input ${errors.department ? 'border-red-400' : ''}`}
                        >
                            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        {errors.department && <p className="mt-1.5 text-xs text-red-500">{errors.department}</p>}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3">
                        <button type="button" onClick={onClose} className="btn-secondary px-4 py-2 text-sm">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="btn-primary px-5 py-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                            {loading ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Pencil size={14} /> Save Changes</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
