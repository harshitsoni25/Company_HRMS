export default function StatCard({ label, value, icon: Icon, color = 'brand', loading = false }) {
    const colorMap = {
        brand: {
            bg: 'linear-gradient(135deg, #4f8ef7 0%, #6c63ff 100%)',
            shadow: 'rgba(79,142,247,0.35)',
            icon: '#fff',
            value: '#fff',
            label: 'rgba(255,255,255,0.8)',
        },
        emerald: {
            bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            shadow: 'rgba(17,153,142,0.35)',
            icon: '#fff',
            value: '#fff',
            label: 'rgba(255,255,255,0.8)',
        },
        red: {
            bg: 'linear-gradient(135deg, #f7797d 0%, #eb3349 100%)',
            shadow: 'rgba(235,51,73,0.35)',
            icon: '#fff',
            value: '#fff',
            label: 'rgba(255,255,255,0.8)',
        },
        amber: {
            bg: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
            shadow: 'rgba(247,151,30,0.35)',
            icon: '#fff',
            value: '#fff',
            label: 'rgba(255,255,255,0.8)',
        },
    }

    const c = colorMap[color] || colorMap.brand

    if (loading) {
        return (
            <div className="rounded-2xl p-5 animate-pulse" style={{ background: '#e2e8f0', height: 100 }} />
        )
    }

    return (
        <div className="rounded-2xl p-5" style={{ background: c.bg, boxShadow: `0 8px 24px ${c.shadow}` }}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: c.label }}>{label}</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: c.value }}>{value ?? '—'}</p>
                </div>
                {Icon && (
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                        <Icon size={20} color={c.icon} />
                    </div>
                )}
            </div>
        </div>
    )
}
