"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

const defaultActivities = [
  { value: "hiking", label: "Hiking" },
  { value: "swimming", label: "Swimming" },
  { value: "camping", label: "Camping" },
  { value: "photography", label: "Photography" },
];

export function ActivityCombobox() {
  const [open, setOpen] = React.useState(false);
  const [activities, setActivities] = React.useState(defaultActivities);
  const [selectedActivities, setSelectedActivities] = React.useState<string[]>(
    []
  );
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredActivities = activities.filter((activity) =>
    activity.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (currentValue: string) => {
    setSelectedActivities((prev) =>
      prev.includes(currentValue)
        ? prev.filter((value) => value !== currentValue)
        : [...prev, currentValue]
    );
  };

  const handleAddNewActivity = () => {
    if (
      searchQuery &&
      !activities.find(
        (activity) => activity.value === searchQuery.toLowerCase()
      )
    ) {
      const newActivityItem = {
        value: searchQuery.toLowerCase(),
        label: searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1),
      };
      setActivities((prev) => [...prev, newActivityItem]);
      setSelectedActivities((prev) => [...prev, newActivityItem.value]);
      setSearchQuery("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            Select activities...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0">
          <div className="flex flex-col p-2">
            <Input
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-2"
            />
            <ScrollArea className="h-[200px]">
              {filteredActivities.length === 0 ? (
                <div className="flex items-center justify-between p-2 flex-col">
                  <span className="text-sm text-muted-foreground">
                    No activities found.
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleAddNewActivity}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add "{searchQuery}"
                  </Button>
                </div>
              ) : (
                filteredActivities.map((activity) => (
                  <div
                    key={activity.value}
                    className={cn(
                      "flex items-center px-2 py-1 cursor-pointer hover:bg-accent",
                      selectedActivities.includes(activity.value) && "bg-accent"
                    )}
                    onClick={() => handleSelect(activity.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedActivities.includes(activity.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {activity.label}
                  </div>
                ))
              )}
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2">
        {selectedActivities.map((value) => (
          <Badge
            key={value}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => handleSelect(value)}
          >
            {activities.find((a) => a.value === value)?.label}
            <span className="ml-1 text-xs">×</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
