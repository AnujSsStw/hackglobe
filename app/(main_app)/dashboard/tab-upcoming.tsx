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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/updated-select";
import { AdventureCard } from "@/components/AdventureCard";

const SAMPLE_ADVENTURES = [
  {
    id: "1",
    title: "HackSummit New York",
    location: "New York, USA",
    startDate: "September 15, 2023",
    endDate: "September 18, 2023",
    duration: "3 days",
    description: "Annual tech conference",
    gearStacks: [{ id: "1", name: "Business Trip Kit" }],
  },
  {
    id: "2",
    title: "Scuba at Great Barrier Reef",
    location: "Cairns, Australia",
    startDate: "October 1, 2023",
    endDate: "October 7, 2023",
    duration: "6 days",
    description: "Diving with marine life",
    gearStacks: [{ id: "2", name: "Scuba Gear" }],
  },
];

export function UpcomingTab() {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Upcoming Adventures</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle />
              Add New Adventure
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a New Adventure</DialogTitle>
              <DialogDescription>
                {/* Make changes to your profile here. Click save when you're done. */}
                {/* Add Emoji */}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Bucket List
                </Label>
                <div>
                  <Select>
                    <SelectTrigger className="col-span-3 w-[276px]">
                      <SelectValue placeholder="Select from your bucket list" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Adventure Name
                </Label>
                <Input
                  id="adventure_name"
                  className="col-span-3"
                  placeholder="e.g. HackSubmit New York"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Destination
                </Label>
                <Input id="adventure_name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Start Date
                </Label>
                <Input type="date" id="adventure_name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  End Date
                </Label>
                <Input type="date" id="adventure_name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Gear Needed
                </Label>
                <Input id="adventure_name" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4 mt-6">
        {SAMPLE_ADVENTURES.map((adventure) => (
          <AdventureCard key={adventure.id} adventure={adventure} />
        ))}
      </div>
    </div>
  );
}
