import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpcomingTab } from "./tab-upcoming";
import GearManager from "./tab-gear";

export default function Home() {
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
