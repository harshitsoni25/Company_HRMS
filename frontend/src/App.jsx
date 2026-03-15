import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

export default function App() {
    return (<BrowserRouter>
        {/* Toast Notifications */}
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
                success: {
                    iconTheme: {
                        primary: "#16a34a",
                        secondary: "#fff",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#dc2626",
                        secondary: "#fff",
                    },
                },
            }}
        />

        <div className="flex min-h-screen bg-slate-100 text-slate-800">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">

                {/* Topbar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div className="ml-auto flex items-center gap-3">

                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #4f8ef7, #6c63ff)' }}>
                            A
                        </div>

                        {/* User Info */}
                        <div>
                            <p className="text-sm font-medium text-slate-800 leading-none">
                                Admin
                            </p>
                            <p className="text-[11px] text-slate-500">
                                Administrator
                            </p>
                        </div>

                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-8 max-w-6xl w-full mx-auto">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/attendance" element={<Attendance />} />
                    </Routes>
                </div>

            </main>
        </div>
    </BrowserRouter>


    );
}
