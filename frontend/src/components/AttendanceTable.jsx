import { CalendarCheck } from 'lucide-react'

function SkeletonRow() {
    return (
        <tr className="border-b border-slate-100">
            {[...Array(4)].map((_, i) => (
                <td key={i} className="px-4 py-3">
                    <div className="skeleton h-4 rounded w-3/4 bg-slate-200 animate-pulse" />
                </td>
            ))}
        </tr>
    )
}

function EmptyState() {
    return (
        <tr>
            <td colSpan={4}>
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                        <CalendarCheck size={22} className="text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-500">No attendance records</p>
                    <p className="text-xs text-slate-400 mt-1">Mark attendance using the form</p>
                </div>
            </td>
        </tr>
    )
}

export default function AttendanceTable({ records, loading }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Employee
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Department
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            [...Array(6)].map((_, i) => <SkeletonRow key={i} />)
                        ) : records.length === 0 ? (
                            <EmptyState />
                        ) : (
                            records.map(record => {
                                const emp = record.employee || {}
                                return (
                                    <tr
                                        key={record._id}
                                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                    >
                                        {/* Employee */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-[11px] font-semibold text-blue-600">
                                                        {(emp.full_name || '?').charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-800 leading-none">
                                                        {emp.full_name || '—'}
                                                    </p>
                                                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                                                        {record.employee_id || '—'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Department */}
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                                {emp.department || '—'}
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td className="px-4 py-3">
                                            <span className="font-mono text-sm text-slate-500">
                                                {record.date || '—'}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-3">
                                            <span
                                                className={`
                                                    inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium
                                                    ${record.status === 'PRESENT'
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        : 'bg-red-50 text-red-600 border border-red-200'
                                                    }
                                                `}
                                            >
                                                <span className={`
                                                    w-1.5 h-1.5 rounded-full flex-shrink-0
                                                    ${record.status === 'PRESENT' ? 'bg-emerald-500' : 'bg-red-500'}
                                                `} />
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
