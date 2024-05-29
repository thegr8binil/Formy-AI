'use client'
import { Library, MessageSquare, LineChart, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";



export default function SideBar() {
  const menuItems = [
    {
      id: "1",
      name: "Dashboard",
      icon: Library,
      href: "/dashboard",
    },
    {
      id: "2",
      name: "Responses",
      icon: MessageSquare,
      href: "/dashboard/responses",
    },
    {
      id: "3",
      name: "Analytics",
      icon: LineChart,
      href: "/dashboard/analytics",
    },
    {
      id: "4",
      name: "Upgrade",
      icon: Shield,
      href: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  return (
    <aside className="h-screen border shadow-md">
      <div>
        {menuItems.map((menu) => (
          <div
            key={menu.id}
            className={`flex items-center p-2 m-2 border-b rounded-md cursor-pointer hover:text-white hover:bg-primary ${
              path === menu.href ? "text-white bg-primary" : "text-black"
            }`}
          >
            <menu.icon className="mr-2" />
            <Link href={menu.href}>{menu.name}</Link>
          </div>
        ))}
      </div>
      <div className="fixed flex flex-col w-64 gap-2 p-6 bottom-1">
        <Button className="w-full ">+ Create Form</Button>
       <Progress value={50} />  
       <h2 className="text-sm text-gray-600"> <strong>2 </strong>out of <strong>3 </strong>forms created</h2>
       <h2 className="text-xs text-gray-600">Upgrade your plan for unlimted AI form building</h2>
      </div>
    </aside>
  );
}
