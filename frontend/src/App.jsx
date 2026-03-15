import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Menu, X } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (<BrowserRouter>
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3500,
                style: {
                    fontSize: "13px",
                    fontFamily: "DM Sans, sans-serif",
                    borderRadius: "10px",
                    background: "#ffffff",
                    color: "#1e293b",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                },
                success: { iconTheme: { primary: "#16a34a", secondary: "#fff" } },
                error: { iconTheme: { primary: "#dc2626", secondary: "#fff" } },
            }}
        />

        <div className="flex min-h-screen bg-slate-100 text-slate-800">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-30 md:static md:block transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden min-w-0">

                {/* Topbar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 md:px-8" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    {/* Hamburger — mobile only */}
                    <button
                        className="md:hidden mr-3 w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu size={20} />
                    </button>

                    <div className="ml-auto flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #4f8ef7, #6c63ff)' }}>
                            A
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-800 leading-none">Admin</p>
                            <p className="text-[11px] text-slate-500">Administrator</p>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-4 md:p-8 max-w-6xl w-full mx-auto">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/attendance" element={<Attendance />} />
                    </Routes>
                </div>

            </main>
        </div>
    </BrowserRouter>);
}
