"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import { setLogout } from "@/store/auth-slice";
import { Banknote, BookOpen, BookText, CircleUserRound, GraduationCap, Home, Layers, LogOut, Settings, ShieldCheck, User, Users, UserStar } from "lucide-react"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

  
  export function AppSidebar() {
    const dispatch =useDispatch()
    const router =useRouter()
    const pathname =usePathname();
    const menuItems = [
        { name: "Asosiy", icon: <Home size={22} />, path: "/" },
        { name: "Managerlar", icon: <Users size={22} />, path: "/managers" },
        { name: "Adminlar", icon: <ShieldCheck size={22} />, path: "/admins" },
        { name: "Ustozlar", icon: <GraduationCap size={22} />, path: "/teachers" },
        { name: "Studentlar", icon: <BookOpen size={22} />, path: "/students" },
        { name: "Guruhlar", icon: <Layers size={22} />, path: "/groups" },
        { name: "Kurslar", icon: <BookText size={22} />, path: "/courses" },
        { name: "Payment", icon: <Banknote size={22} />, path: "/payment" },
      ];

      const profielItems =[
        { name: "Sozlamar", icon: <Settings size={22} />, path: "/settings" },
        { name: "Profile", icon: <CircleUserRound size={22} />, path: "/profile" },
        { name: "Chiqish", icon: <LogOut size={22} />, path: "/logout" },
      
      ]


    return (
      <Sidebar>
        <SidebarHeader>
            <h1 className="text-[22px] font-bold">Admin CRM</h1>
        </SidebarHeader>
        <SidebarContent className="p-3">
        <SidebarGroup className="flex flex-col gap-2">

          <span className="text-primary font-bold">Menu</span>
         {menuItems.map((val, index) =>{
            const isActive =val.path === "/" ? pathname === "/" : pathname.startsWith(val.path);
             return <Link href={`${val.path}`} key={index} className={`
                flex items-center gap-3 p-2 rounded-md border
                ${isActive ? "bg-black dark:bg-transparent dark:border-gray-400  text-white border-black" : "border-transparent hover:border-gray-400"}
              `}>
                {val.icon}
                <span>{val.name}</span>
            </Link>
         })}
          <span className="text-primary font-semibold my-2">Boshqalar</span>
          {profielItems.map((val, index) => {
                        const isActive = val.path === "/" ? pathname === "/" : pathname.startsWith(val.path);

                        if (val.name === "Chiqish") {
                            return (
                                <button 
                                    key={index}
                                    onClick={() => {
                                      dispatch(setLogout())
                                      router.push("/login")
                                    }}
                                    className={`
                                        flex items-center gap-3 p-2 rounded-md border w-full text-left
                                        ${isActive ? "bg-black dark:bg-transparent dark:border-gray-400 text-white border-black" : "border-transparent hover:border-gray-400"}
                                    `}
                                >
                                    {val.icon}
                                    <span>{val.name}</span>
                                </button>
                            )
                        }

                        return (
                            <Link href={val.path} key={index} className={`
                                flex items-center gap-3 p-2 rounded-md border
                                ${isActive ? "bg-black dark:bg-transparent dark:border-gray-400 text-white border-black" : "border-transparent hover:border-gray-400"}
                            `}>
                                {val.icon}
                                <span>{val.name}</span>
                            </Link>
                        )
                    })}
         </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }