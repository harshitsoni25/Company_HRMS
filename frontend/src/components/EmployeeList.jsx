import { Trash2, Mail, Building2, Pencil } from 'lucide-react'

function SkeletonRow() {
    return (
        <tr className="border-b border-slate-100">
            {[...Array(5)].map((_, i) => (
                <td key={i} className="px-4 py-3">
                    <div className="skeleton h-4 rounded w-3/4" />
                </td>
            ))}
        </tr>
    )
}

function EmptyState() {
    return (
        <tr>
            <td colSpan={5}>
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                        <Building2 size={22} className="text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-500">No employees yet</p>
                    <p className="text-xs text-slate-400 mt-1">Click "Add Employee" to get started</p>
                </div>
            </td>
        </tr>
    )
}

export default function EmployeeList({ employees, loading, onDelete, onEdit }) {
    return (
        <div className="card">
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                        ) : employees.length === 0 ? (
                            <EmptyState />
                        ) : (
                            employees.map(emp => (
                                <tr key={emp._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    {/* Employee ID */}
                                    <td>
                                        <span className="font-mono text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                            {emp.employee_id}
                                        </span>
                                    </td>

                                    {/* Name */}
                                    <td>
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                                                <span className="text-[11px] font-semibold text-blue-600">
                                                    {emp.full_name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="font-medium text-slate-800">{emp.full_name}</span>
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td>
                                        <div className="flex items-center gap-1.5 text-slate-500">
                                            <Mail size={12} className="text-slate-400 flex-shrink-0" />
                                            {emp.email}
                                        </div>
                                    </td>

                                    {/* Department */}
                                    <td>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                            {emp.department}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => onEdit(emp)}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                title="Edit employee"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(emp)}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                title="Delete employee"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}