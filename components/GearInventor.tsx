"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRef, useState } from "react";

export function GearInventory() {
  const [selectedGear, setSelectedGear] = useState<string[]>([]);
  const inventoryRef = useRef<HTMLInputElement>(null);

  const handleSelect = (currentValue: string) => {
    setSelectedGear((prev) =>
      prev.includes(currentValue)
        ? prev.filter((value) => value !== currentValue)
        : [...prev, currentValue]
    );
  };
  return (
    <div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Inventory
        </Label>
        <div className="col-span-3 ">
          <div className="flex items-center gap-2">
            <Input
              ref={inventoryRef}
              type="text"
              id="inventory"
              className="col-span-3"
            />
            <Button
              onClick={() =>
                setSelectedGear((prev) => [
                  ...prev,
                  inventoryRef.current?.value || "",
                ])
              }
            >
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {selectedGear.map((value) => (
              <Badge
                key={value}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleSelect(value)}
              >
                {value}
                <span className="ml-1 text-xs">×</span>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
