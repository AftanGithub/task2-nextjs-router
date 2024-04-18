import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";


export const metadata: Metadata = {
  title: "Flight App - Dashboard",
  description: "This is a flight app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="h-screen w-screen flex bg-slate-100 overflow-x-hidden overflow-y-hidden">
        <Sidebar />
        <div className="w-screen">
            <Header />
            <div className="bg-white w-100 h-screen overflow-y-auto">
                {children}
            </div>
        </div>
   </div>
  );
}
