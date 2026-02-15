"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import { Banknote, BookOpen, BookText, GraduationCap, Home, Layers, ShieldCheck, User, Users, UserStar } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";

  
  export function AppSidebar() {
    const pathname =usePathname();
    const menuItems = [
        { name: "Asosiy", icon: <Home size={22} />, path: "/" },
        { name: "Managerlar", icon: <Users size={22} />, path: "/managers" },
        { name: "Adminlar", icon: <ShieldCheck size={22} />, path: "/teachers" },
        { name: "Ustozlar", icon: <GraduationCap size={22} />, path: "/teachers" },
        { name: "Studentlar", icon: <BookOpen size={22} />, path: "/students" },
        { name: "Guruhlar", icon: <Layers size={22} />, path: "/groups" },
        { name: "Kurslar", icon: <BookText size={22} />, path: "/courses" },
        { name: "Payment", icon: <Banknote size={22} />, path: "/payment" },
      ];


    return (
      <Sidebar>
        <SidebarHeader>
            <h1 className="text-[22px] font-bold">Admin CRM</h1>
        </SidebarHeader>
        <SidebarContent className="p-3">
        <SidebarGroup className="flex flex-col gap-2">

          <span className="uppercase">Menu</span>
         {menuItems.map((val, index) =>{
            const isActive =val.path === "/" ? pathname === "/" : pathname.startsWith(val.path);
             return <Link href={`${val.path}`} key={index} className={`
                flex items-center gap-3 p-2 rounded-md border
                ${isActive ? "bg-black text-white border-black" : "border-transparent hover:border-gray-400"}
              `}>
                {val.icon}
                <span>{val.name}</span>
            </Link>
         })}
         </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }