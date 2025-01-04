"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpcomingTab } from "./tab-upcoming";
import GearManager from "./tab-gear";
import { useConvexAuth, useQuery } from "convex/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  if (!isAuthenticated && !isLoading) {
    router.push("/login");
    return null;
  }
  return (
    <main className="flex justify-center mt-5">
      <Tabs defaultValue="upcoming" className="w-11/12">
        <TabsList className="w-full gap-3 justify-between">
          <TabsTrigger value="upcoming" className="w-full">
            Upcoming Adventures
          </TabsTrigger>
          <TabsTrigger value="gear" className="w-full">
            Gear Stacks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <UpcomingTab />
        </TabsContent>
        <TabsContent value="gear">
          <GearManager />
        </TabsContent>
      </Tabs>
    </main>
  );
}
