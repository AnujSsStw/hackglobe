import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function Reroute() {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button variant="outline" className="w-full justify-center">
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Quick Reroute
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick Reroute</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="" className="text-right">
              Destination
            </Label>
            <Input id="destination" className="col-span-3" placeholder="" />
          </div>

          {/* reason, date, estimated cost */}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="" className="text-right">
              Reason
            </Label>
            <Input id="reason" className="col-span-3" placeholder="" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="" className="text-right">
              Date
            </Label>
            <Input
              type="date"
              id="date"
              className="col-span-3"
              placeholder=""
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="" className="text-right">
              Estimated Cost
            </Label>
            ${0.0}
          </div>
        </div>

        <DialogFooter className="justify-center">
          <Button type="submit">Confirm Reroute</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
