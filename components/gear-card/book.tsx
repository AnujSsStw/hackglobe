"use client";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/updated-select";
import { format } from "date-fns";
import { CalendarIcon, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export function Book() {
  const [date, setDate] = useState<Date>();
  const [hasInsurance, setHasInsurance] = useState(false);
  const [destination, setDestination] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [specialHandling, setSpecialHandling] = useState("");

  const calculateCost = () => {
    let cost = 0;
    if (hasInsurance) cost += 20;
    // Add other cost calculations based on selections
    return cost.toFixed(2);
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button variant="outline" className="w-full justify-center" size="sm">
          <Send className="mr-2 h-4 w-4" />
          Book Forwarding
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Forwarding</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <label className="text-lg font-medium">Destination</label>
          <Select onValueChange={setDestination} value={destination}>
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="eu">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-medium">Shipping Method</label>
          <Select onValueChange={setShippingMethod} value={shippingMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="express">Express</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-medium">Special Handling</label>
          <Select onValueChange={setSpecialHandling} value={specialHandling}>
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fragile">Fragile</SelectItem>
              <SelectItem value="perishable">Perishable</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-medium">Desired Arrival</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : "Select date..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="insurance"
            checked={hasInsurance}
            onCheckedChange={(checked) => setHasInsurance(checked as boolean)}
          />
          <label
            htmlFor="insurance"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Add shipping insurance (+$20)
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-medium">Estimated Cost</label>
          <div className="text-2xl font-bold">${calculateCost()}</div>
        </div>

        <DialogFooter className="justify-center">
          <Button className="w-full" size="lg">
            Book Forwarding
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
