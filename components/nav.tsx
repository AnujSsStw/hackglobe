"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Box, List, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSignOut } from "@/hooks/use-signout";
import { Input } from "./ui/input";
import { useState } from "react";

const dummyList = [
  {
    id: 1,
    location: "Bali, Indonesia",
    name: "Surf at Uluwatu",
    img: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    location: "Patagonia, Argentina",
    name: "Hike the Andes",
    img: "https://github.com/shadcn.png",
  },
  {
    id: 3,
    location: "Bali, Indonesia",
    name: "Surf at Uluwatu",
    img: "https://github.com/shadcn.png",
  },
];
interface BucketListItem {
  id: string;
  name: string;
  location: string;
}

export function Navigation({}: {}) {
  const pathname = usePathname();
  const user = useQuery(api.user.getCurrentUser, {});
  const signOut = useSignOut();
  const isAuthPath = pathname.includes("/login");
  const [isOpen, setIsOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [items, setItems] = useState<BucketListItem[]>([
    {
      id: "1",
      name: "Surf at Uluwatu",
      location: "Bali, Indonesia",
    },
    {
      id: "2",
      name: "Hike in Torres del Paine",
      location: "Patagonia, Chile",
    },
    {
      id: "3",
      name: "Experience the Robot Restaurant",
      location: "Tokyo, Japan",
    },
  ]);
  const [newItem, setNewItem] = useState({ name: "", location: "" });

  const handleAddItem = () => {
    if (newItem.name && newItem.location) {
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          name: newItem.name,
          location: newItem.location,
        },
      ]);
      setNewItem({ name: "", location: "" });
      setIsAddMode(false);
    }
  };

  if (isAuthPath) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 flex w-full flex-col border-b border-border bg-card px-6">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between py-3">
        <div className="flex h-10 items-center gap-2">
          <Link href={"/dashboard"} className="flex h-10 items-center gap-1">
            <h1 className="font-extrabold text-3xl">HACKGLOBE</h1>
          </Link>
        </div>

        <div className="flex h-10 items-center gap-7">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="">
                <List />
                View Bucket List
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 px-4 py-2">
              <DropdownMenuLabel>
                <h2 className="text-sm font-semibold">Your Bucket List</h2>
                <p className="text-xs text-primary/60">
                  Dream big, plan your next adventure!
                </p>
              </DropdownMenuLabel>

              {/* <DropdownMenuSeparator /> */}

              <Tabs defaultValue="view_list" className="mt-4">
                <TabsList className="w-full gap-3 justify-between">
                  <TabsTrigger value="view_list" className="w-full">
                    View List
                  </TabsTrigger>
                  <TabsTrigger className="w-full" value="add_items">
                    Add New Item
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="view_list" className="mt-4">
                  {
                    <ul>
                      {dummyList.map((item) => (
                        <li key={item.id} className="flex items-center gap-2">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-primary/60">{item.location}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  }
                </TabsContent>

                <TabsContent value="add_items" className="">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="name">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={newItem.name}
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="location">
                        Location
                      </label>
                      <Input
                        id="location"
                        value={newItem.location}
                        onChange={(e) =>
                          setNewItem({ ...newItem, location: e.target.value })
                        }
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleAddItem}
                      disabled={!newItem.name || !newItem.location}
                    >
                      Add New Item
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full">
                {/* <span className="min-h-8 min-w-8 rounded-full bg-gradient-to-br from-lime-400 from-10% via-cyan-300 to-blue-500" /> */}
                <Avatar className="rounded-none">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={8}
              className="fixed -right-4 min-w-56 bg-card p-2"
            >
              <DropdownMenuItem className="group flex-col items-start focus:bg-transparent">
                <p className="text-sm font-medium text-primary/80 group-hover:text-primary group-focus:text-primary">
                  {user?.username || ""}
                </p>
                <p className="text-sm text-primary/60">{user?.email}</p>
              </DropdownMenuItem>

              <DropdownMenuItem className="group h-9 w-full cursor-pointer justify-between rounded-md px-2">
                <Link href={"/settings"}>
                  <span className="text-sm text-primary/60 group-hover:text-primary group-focus:text-primary">
                    Settings
                  </span>
                </Link>
                <Settings className="h-[18px] w-[18px] stroke-[1.5px] text-primary/60 group-hover:text-primary group-focus:text-primary" />
              </DropdownMenuItem>

              <DropdownMenuItem className="group h-9 w-full cursor-pointer justify-between rounded-md px-2">
                <Link href={"/orders"}>
                  <span className="text-sm text-primary/60 group-hover:text-primary group-focus:text-primary">
                    My orders
                  </span>
                </Link>
                <Box className="h-[18px] w-[18px] stroke-[1.5px] text-primary/60 group-hover:text-primary group-focus:text-primary" />
              </DropdownMenuItem>

              <DropdownMenuItem
                className={cn(
                  "group flex h-9 justify-between rounded-md px-2 hover:bg-transparent"
                )}
              >
                <span className="w-full text-sm text-primary/60 group-hover:text-primary group-focus:text-primary">
                  Theme
                </span>
                <ThemeSwitcher />
              </DropdownMenuItem>

              <DropdownMenuSeparator className="mx-0 my-2" />

              <DropdownMenuItem
                className="group h-9 w-full cursor-pointer justify-between rounded-md px-2"
                onClick={() => signOut()}
              >
                <span className="text-sm text-primary/60 group-hover:text-primary group-focus:text-primary">
                  Log Out
                </span>
                <LogOut className="h-[18px] w-[18px] stroke-[1.5px] text-primary/60 group-hover:text-primary group-focus:text-primary" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  [key: string]: unknown | undefined;
}

export function Logo({ width, height, className, ...args }: LogoProps) {
  return (
    <svg
      {...args}
      width={width ?? 40}
      height={height ?? 40}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(`text-primary ${className}`)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5475 3.25H13.5475C15.3866 3.24999 16.8308 3.24998 17.9694 3.3786C19.1316 3.50988 20.074 3.78362 20.8574 4.40229C21.0919 4.58749 21.3093 4.79205 21.507 5.0138C22.1732 5.76101 22.4707 6.66669 22.6124 7.77785C22.75 8.85727 22.75 10.2232 22.75 11.9473V12.0528C22.75 13.7768 22.75 15.1427 22.6124 16.2222C22.4707 17.3333 22.1732 18.239 21.507 18.9862C21.3093 19.208 21.0919 19.4125 20.8574 19.5977C20.074 20.2164 19.1316 20.4901 17.9694 20.6214C16.8308 20.75 15.3866 20.75 13.5475 20.75H10.4525C8.61345 20.75 7.16917 20.75 6.03058 20.6214C4.86842 20.4901 3.926 20.2164 3.14263 19.5977C2.90811 19.4125 2.69068 19.2079 2.49298 18.9862C1.82681 18.239 1.52932 17.3333 1.38763 16.2222C1.24998 15.1427 1.24999 13.7767 1.25 12.0527V12.0527V11.9473V11.9472C1.24999 10.2232 1.24998 8.85727 1.38763 7.77785C1.52932 6.66669 1.82681 5.76101 2.49298 5.0138C2.69068 4.79205 2.90811 4.58749 3.14263 4.40229C3.926 3.78362 4.86842 3.50988 6.03058 3.3786C7.16917 3.24998 8.61345 3.24999 10.4525 3.25H10.4525H13.5475ZM10 8C7.79086 8 6 9.79086 6 12C6 14.2091 7.79086 16 10 16C10.7286 16 11.4117 15.8052 12.0001 15.4648C12.5884 15.8049 13.2719 16 13.9998 16C16.2089 16 17.9998 14.2091 17.9998 12C17.9998 9.79086 16.2089 8 13.9998 8C13.2719 8 12.5884 8.19505 12.0001 8.53517C11.4117 8.19481 10.7286 8 10 8ZM8 12C8 10.8954 8.89543 10 10 10C11.1046 10 12 10.8954 12 12C12 13.1046 11.1046 14 10 14C8.89543 14 8 13.1046 8 12ZM13.9998 14C13.8271 14 13.6599 13.9783 13.5004 13.9374C13.8187 13.3634 14 12.7029 14 12C14 11.2971 13.8187 10.6366 13.5004 10.0626C13.6599 10.0217 13.8271 10 13.9998 10C15.1043 10 15.9998 10.8954 15.9998 12C15.9998 13.1046 15.1043 14 13.9998 14Z"
        fill="currentColor"
      />
    </svg>
  );
}
