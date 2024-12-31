import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Edit, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ActivityCombobox } from "./ActivityCombobox";

export interface GearStack {
  id: string;
  name: string;
}

export interface Adventure {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string;
  gearStacks: GearStack[];
}

interface AdventureCardProps {
  adventure: Adventure;
}

export function AdventureCard({ adventure }: AdventureCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader className=" mb-2 flex flex-row items-center justify-between dark:bg-[#1A1A1D] bg-[#dbdee2] rounded-t-xl">
        <h3 className="text-lg font-semibold">{adventure.title}</h3>
        <Button variant="secondary" size="sm">
          Manage Gear
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{adventure.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{`${adventure.startDate} - ${adventure.endDate}`}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{adventure.duration}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{adventure.description}</p>
        <div>
          <h4 className="text-sm font-semibold mb-2">Gear Stacks:</h4>
          <div className="flex gap-2">
            {adventure.gearStacks.map((stack) => (
              <Badge key={stack.id} variant="secondary">
                {stack.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-between">
          <Dialog>
            <DialogTrigger>
              <Button
                variant="default"
                size="sm"
                className="flex items-center gap-1"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Adventure</DialogTitle>
                <DialogDescription>
                  Make changes to your Upcoming adventure.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    value={adventure.title}
                    id="name"
                    className="col-span-3"
                    placeholder="e.g. HackSummit New York"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    value={adventure.location}
                    id="location"
                    className="col-span-3"
                    placeholder="e.g. New York, USA"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start_date" className="text-right">
                    Start Date
                  </Label>
                  <Input id="start_date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="end_date" className="text-right">
                    End Date
                  </Label>
                  <Input
                    value={adventure.endDate}
                    id="end_date"
                    type="date"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    value={adventure.description}
                    id="description"
                    className="col-span-3"
                    placeholder="Describe your adventure..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="activities" className="text-right">
                    Activities
                  </Label>
                  <div className="col-span-3">
                    <ActivityCombobox />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="destructive"
            size="sm"
            className="flex items-center gap-1 "
          >
            <X className="h-4 w-4" />
            Cancel Trip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
