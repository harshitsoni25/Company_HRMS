import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    Building2,
} from "lucide-react";

const navItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/employees", label: "Employees", icon: Users },
    { to: "/attendance", label: "Attendance", icon: CalendarCheck },
];

export default function Sidebar({ onClose }) {
    return (
        <aside style={{ width: 240, minHeight: '100vh', background: 'linear-gradient(180deg, #1e2a4a 0%, #162040 100%)', borderRight: 'none', display: 'flex', flexDirection: 'column', fontFamily: 'inherit', boxShadow: '4px 0 15px rgba(0,0,0,0.15)' }}>
            <style>{`
                .sidebar-logo-ring {
                    width: 38px;
                    height: 38px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #4f8ef7 0%, #6c63ff 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(79,142,247,0.4);
                    flex-shrink: 0;
                }
                .sidebar-nav-link {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    padding: 10px 14px;
                    border-radius: 10px;
                    font-size: 0.8125rem;
                    font-weight: 500;
                    color: #8a9bc4;
                    text-decoration: none;
                    transition: background 0.15s, color 0.15s;
                    position: relative;
                    letter-spacing: 0.01em;
                }
                .sidebar-nav-link:hover {
                    background: rgba(255,255,255,0.07);
                    color: #ffffff;
                }
                .sidebar-nav-link.active {
                    background: linear-gradient(135deg, rgba(79,142,247,0.25) 0%, rgba(108,99,255,0.2) 100%);
                    color: #ffffff;
                    box-shadow: inset 0 0 0 1px rgba(79,142,247,0.3);
                }
                .sidebar-nav-link.active::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 20%;
                    height: 60%;
                    width: 3px;
                    border-radius: 0 3px 3px 0;
                    background: linear-gradient(180deg, #4f8ef7, #6c63ff);
                }
                .nav-icon {
                    color: #8a9bc4;
                    transition: color 0.15s;
                    flex-shrink: 0;
                }
                .sidebar-nav-link:hover .nav-icon { color: #ffffff; }
                .sidebar-nav-link.active .nav-icon { color: #4f8ef7; }
                .sidebar-divider {
                    height: 1px;
                    background: rgba(255,255,255,0.08);
                    margin: 0 16px;
                }
                .sidebar-section-label {
                    font-size: 9.5px;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #4a5a7a;
                    padding: 0 14px;
                    margin-bottom: 6px;
                }
            `}</style>

            {/* Logo */}
            <div style={{ height: 64, display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="sidebar-logo-ring">
                    <Building2 size={17} color="#fff" />
                </div>
                <div>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#ffffff', lineHeight: 1, letterSpacing: '0.02em' }}>
                        HRMS Lite
                    </p>
                    <p style={{ fontSize: '10.5px', color: '#4a5a7a', marginTop: 3, letterSpacing: '0.03em' }}>
                        Admin Panel
                    </p>
                </div>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: '20px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div className="sidebar-section-label">Menu</div>
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === "/"}
                        onClick={onClose}
                        className={({ isActive }) => `sidebar-nav-link${isActive ? ' active' : ''}`}
                    >
                        {({ isActive }) => (
                            <>
                                <Icon size={16} className="nav-icon" style={{ color: isActive ? '#4f8ef7' : undefined }} />
                                {label}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="sidebar-divider" />
            <div style={{ padding: '14px 20px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #4f8ef7, #6c63ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>A</span>
                </div>
                <div>
                    <p style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: 600, lineHeight: 1 }}>Admin</p>
                    <p style={{ fontSize: '10px', color: '#4a5a7a', marginTop: 3 }}>admin@hrms.com</p>
                </div>
            </div>
        </aside>
    );
}
