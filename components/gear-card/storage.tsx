import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRightLeft, Package } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function Storage() {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button variant="outline" className="w-full justify-center">
          <Package className="mr-2 h-4 w-4" />
          Extend Storage
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Extend Storage</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="" className="text-right">
              New End Date
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
              Additional Cost
            </Label>
            ${0.0}
          </div>
        </div>

        <DialogFooter className="justify-center">
          <Button type="submit">Extend and Pay</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
