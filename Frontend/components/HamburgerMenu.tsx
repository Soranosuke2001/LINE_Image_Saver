"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { FiLogIn, FiLogOut, FiMenu } from "react-icons/fi";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useToast } from "./ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { convertString } from "@/lib/checkUrlEncoding";

export function HamburgerMenu() {
  const router = useRouter();
  const cookieStore = useCookies();
  const { toast } = useToast()

  const username = convertString(cookieStore.get("username"));
  const profile_image = convertString(cookieStore.get("profile_image"));

  const logoutHandler = async () => {
    const response = await axios.get("/api/auth/logout");
    if (response.status === 200) {
      router.push("/");
    }

    toast({
      title: "Unable to logout",
      description: "Please try again later",
      variant: "destructive"
    })
  };

  return (
    <Menubar className="absolute top-1 left-1 bg-white z-50 rounded-full">
      <MenubarMenu>
        <MenubarTrigger>
          <FiMenu />
        </MenubarTrigger>
        {username && profile_image ? (
          <MenubarContent>
            <MenubarItem className="justify-between">
              <p className="w-[70%] font-bold text-lg truncate">{username}</p>
              <Avatar>
                <AvatarImage src={profile_image} alt="Profile Image" />
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
            </MenubarItem>
            <MenubarSeparator />

            <MenubarItem onClick={() => router.push('/')}>Home</MenubarItem>
            <MenubarItem onClick={() => router.push('/media')}>Media</MenubarItem>
            <MenubarSeparator />
            
            <MenubarItem
              onClick={() => logoutHandler()}
              className="flex justify-between"
            >
              Logout <FiLogOut />
            </MenubarItem>
          </MenubarContent>
        ) : (
          <MenubarContent>
            <MenubarItem
              onClick={() => router.push("/login")}
              className="flex justify-between"
            >
              Login <FiLogIn />
            </MenubarItem>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  );
}
