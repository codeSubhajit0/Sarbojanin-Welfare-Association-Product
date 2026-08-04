"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayoutClient({
                                              adminEmail,
                                              children,
                                          }: {
    adminEmail: string;
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#f7f4f1]">

            <div className="hidden lg:block">
                <AdminSidebar adminEmail={adminEmail} />
            </div>


            <AnimatePresence>
                {sidebarOpen && (
                    <>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                        />

                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 25,
                            }}
                            className="fixed left-0 top-0 h-screen z-50 lg:hidden"
                        >
                            <div className="relative h-full">
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="absolute right-5 top-7 z-50 w-9 h-9 rounded-lg bg-white shadow flex items-center justify-center"
                                >
                                    <FaTimes />
                                </button>
                                <AdminSidebar
                                    adminEmail={adminEmail}
                                    onNavigate={() => setSidebarOpen(false)}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>


            <div className="flex-1 min-w-0">

                <div className="lg:hidden flex items-center p-4 border-b bg-white sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center"
                    >
                        <FaBars />
                    </button>
                </div>
                <main className="px-4 py-4 lg:px-8 lg:py-8">{children}</main>
            </div>
        </div>
    );
}