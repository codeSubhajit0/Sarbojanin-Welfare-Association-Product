import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import AdminLayoutClient from "@/components/AdminLayoutClient";

export default async function AdminLayout({
                                              children,
                                          }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getAdminSession();

    if (!session) {
        redirect("/login?callbackUrl=/admin");
    }

    return (
        <AdminLayoutClient adminEmail={session.email ?? "admin"}>
            {children}
        </AdminLayoutClient>
    );
}