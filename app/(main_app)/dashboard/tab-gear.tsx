import { GearCard } from "@/components/gear-card/gear-card";
import { GearInventory } from "@/components/GearInventor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
const gearStacks = [
  {
    id: "1",
    name: "Hiking Gear",
    icon: "🥾",
    status: "With You",
    location: {
      current: "New York, USA",
      next: "Cusco, Peru",
      moveBy: "2023-07-15",
    },
  },
  {
    id: "2",
    name: "Scuba Gear",
    icon: "🤿",
    status: "In Storage",
    location: {
      current: "Miami, USA",
      next: "Cairns, Australia",
      moveBy: "2023-08-01",
    },
  },
  {
    id: "3",
    name: "Ski Equipment",
    icon: "🎿",
    status: "In Storage",
    location: {
      current: "Zurich, Switzerland",
      next: "Hokkaido, Japan",
      moveBy: "2023-12-01",
    },
  },
  {
    id: "4",
    name: "Business Trip Kit",
    icon: "💼",
    status: "In Transit",
    location: {
      current: "London, UK",
      next: "Singapore",
      moveBy: "2023-08-15",
    },
  },
] as const;

export default function GearManager() {
  return (
    <div className="mt-6">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Gear Stacks</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle />
                Add New Gear Stack
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Gear Stack</DialogTitle>
                <DialogDescription>
                  Create a new gear set for your adventures.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" placeholder="" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Emoji
                  </Label>
                  <Input id="adventure_name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Current Location
                  </Label>
                  <Input
                    type="text"
                    id="adventure_name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Next Required Location
                  </Label>
                  <Input
                    type="text"
                    id="adventure_name"
                    className="col-span-3"
                  />
                </div>
                <GearInventory />
              </div>

              <DialogFooter>
                <Button type="submit">Add Gear Stack</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {gearStacks.map((gear) => (
            <GearCard key={gear.id} gear={gear} />
          ))}
        </div>
      </div>
    </div>
  );
}
