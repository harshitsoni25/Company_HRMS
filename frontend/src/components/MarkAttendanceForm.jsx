import { useState, useEffect } from 'react'
import { CalendarCheck, Loader2, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/api'

export default function MarkAttendanceForm({ onMarked }) {
    const [employees, setEmployees] = useState([])
    const [form, setForm] = useState({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'PRESENT',
    })
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        api.get('/api/employees')
            .then(res => setEmployees(res.data))
            .catch(() => toast.error('Failed to load employees'))
            .finally(() => setFetching(false))
    }, [])

    const validate = () => {
        const e = {}
        if (!form.employeeId) e.employeeId = 'Please select an employee'
        if (!form.date) e.date = 'Date is required'
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
            const res = await api.post('/api/attendance', form)
            const emp = employees.find(e => e._id === form.employeeId)
            toast.success(`Marked ${emp?.full_name} as ${form.status} on ${form.date}`)
            onMarked(res.data)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="card p-5">
            <style>{`
    /* ── Date input: force calendar icon visible & styled ── */
    .date-wrapper {
        position: relative;
    }
    .date-wrapper .cal-icon {
        position: absolute;
        left: 11px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: #6b7280;
        z-index: 1;
    }
    .date-input-styled {
        padding-left: 2.25rem !important;
        color-scheme: light;
    }

    /* ── Always show the native calendar picker icon ── */
    .date-input-styled::-webkit-calendar-picker-indicator {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto;           /* ← allows clicking the icon directly */
        width: 15px;
        height: 15px;
        margin: 0 8px 0 0;
        cursor: pointer;
    }

    /* Optional: make it even more obvious / styled */
    .date-input-styled::-webkit-calendar-picker-indicator:hover {
        opacity: 1;
        filter: brightness(1.15);
    }

    /* Firefox usually shows it always — but this helps consistency */
    .date-input-styled {
        -moz-appearance: textfield;     /* removes default spinner in some cases */
    }

    /* Present / Absent toggle buttons */
    .status-btn {
        flex: 1;
        padding: 0.5rem 0;
        font-size: 0.875rem;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
        letter-spacing: 0.02em;
    }
    .status-btn.present-active {
        background: linear-gradient(135deg, #059669 0%, #10b981 60%, #34d399 100%);
        color: #fff;
        box-shadow: 0 0 16px 0 rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255,255,255,0.12);
    }
    .status-btn.absent-active {
        background: linear-gradient(135deg, #b91c1c 0%, #ef4444 60%, #f87171 100%);
        color: #fff;
        box-shadow: 0 0 16px 0 rgba(239, 68, 68, 0.35), inset 0 1px 0 rgba(255,255,255,0.12);
    }
    .status-btn.inactive {
        background: #f8fafc;
        color: #94a3b8;
        border: 1px solid #e2e8f0;
    }
    .status-btn.inactive:hover {
        background: #f1f5f9;
        color: #64748b;
    }

    /* ── Submit button ── */
    .submit-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        width: 100%;
        padding: 0.6rem 1rem;
        font-size: 0.875rem;
        font-weight: 600;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        letter-spacing: 0.03em;
        transition: opacity 0.2s, box-shadow 0.2s, transform 0.12s;
        background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%);
        color: #fff;
        box-shadow: 0 2px 12px 0 rgba(37, 99, 235, 0.28);
    }
    .submit-btn:hover:not(:disabled) {
        box-shadow: 0 4px 20px 0 rgba(37, 99, 235, 0.4);
        transform: translateY(-1px);
    }
    .submit-btn:active:not(:disabled) {
        transform: translateY(0);
    }
    .submit-btn:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`}</style>

            <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <CalendarCheck size={15} className="text-blue-600" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-slate-800">Mark Attendance</h2>
                    <p className="text-xs text-slate-500">Record today's attendance</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Employee */}
                <div>
                    <label className="label">Employee</label>
                    <select
                        name="employeeId"
                        value={form.employeeId}
                        onChange={handleChange}
                        disabled={fetching}
                        className={`input ${errors.employeeId ? 'border-red-400 focus:ring-red-400' : ''}`}
                    >
                        <option value="">{fetching ? 'Loading employees...' : 'Select employee...'}</option>
                        {employees.map(emp => (
                            <option key={emp._id} value={emp._id}>
                                {emp.employee_id} — {emp.full_name}
                            </option>
                        ))}
                    </select>
                    {errors.employeeId && (
                        <p className="mt-1 text-xs text-red-500">{errors.employeeId}</p>
                    )}
                </div>


                <div>
                    <label className="label">Date</label>
                    <div className="date-wrapper">
                        <Calendar size={14} className="cal-icon" />
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            max={new Date().toISOString().split('T')[0]}
                            className={`input date-input-styled ${errors.date ? 'border-red-400 focus:ring-red-400' : ''}`}
                        />
                    </div>
                    {errors.date && (
                        <p className="mt-1 text-xs text-red-500">{errors.date}</p>
                    )}
                </div>

                {/* Status toggle */}
                <div>
                    <label className="label">Status</label>
                    <div className="flex rounded-lg border border-slate-200 overflow-hidden"
                        style={{ background: '#f8fafc' }}>
                        {['PRESENT', 'ABSENT'].map(s => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => setForm(f => ({ ...f, status: s }))}
                                className={`status-btn ${form.status === s
                                    ? s === 'PRESENT' ? 'present-active' : 'absent-active'
                                    : 'inactive'
                                    }`}
                            >
                                {s === 'PRESENT' ? '✓ Present' : '✗ Absent'}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading || fetching}
                >
                    {loading ? (
                        <><Loader2 size={14} className="animate-spin" /> Saving...</>
                    ) : (
                        <><CalendarCheck size={14} /> Mark Attendance</>
                    )}
                </button>
            </form>
        </div>
    )
}