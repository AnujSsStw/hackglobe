"use client";
import { Eye, ArrowRightLeft, Package, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Inventory from "./inventory";
import { Reroute } from "./reroute";
import { Storage } from "./storage";
import { Book } from "./book";
export type GearLocation = {
  current: string;
  next: string;
  moveBy: string;
};

export type GearStatus = "With You" | "In Storage" | "In Transit";

export type GearStack = {
  id: string;
  name: string;
  icon: string;
  location: GearLocation;
  status: GearStatus;
};

interface GearCardProps {
  gear: GearStack;
}

export function GearCard({ gear }: GearCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "With You":
        return "bg-green-500";
      case "In Storage":
        return "bg-blue-500";
      case "In Transit":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{gear.icon}</span>
            <h3 className="text-lg font-semibold">{gear.name}</h3>
          </div>
          <Badge className={`${getStatusColor(gear.status)} text-white`}>
            {gear.status}
          </Badge>
        </div>

        <div className="space-y-2 mb-6 text-sm text-muted-foreground">
          <p>Current: {gear.location.current}</p>
          <p>Next: {gear.location.next}</p>
          <p>Move by: {gear.location.moveBy}</p>
        </div>

        <div className="space-y-2">
          <Inventory />

          <Reroute />

          <Storage />

          <Book />
        </div>
      </CardContent>
    </Card>
  );
}
