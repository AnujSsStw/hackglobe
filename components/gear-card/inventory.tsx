"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, Eye, PencilIcon, X } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
}

export default function Inventory() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState<InventoryItem[]>([
    { id: "1", name: "Boots" },
    { id: "2", name: "Backpack" },
    { id: "3", name: "Tent" },
  ]);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: Date.now().toString(), name: newItem.trim() }]);
      setNewItem("");
    }
  };

  const handleDuplicateItem = (item: InventoryItem) => {
    setItems([...items, { id: Date.now().toString(), name: item.name }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="outline"
        className="w-full justify-center"
        onClick={() => setIsOpen(true)}
      >
        <Eye className="mr-2 h-4 w-4" />
        View Inventory
      </Button>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hiking Gear Inventory</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {isEditing
              ? "Edit the items in this gear stack."
              : "List of items in this gear stack."}
          </p>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          {!isEditing ? (
            // View mode
            <div className="space-y-4">
              <ul className="space-y-3 list-inside">
                {items.map((item) => (
                  <li className="list-disc" key={item.id}>
                    {item.name}
                  </li>
                ))}
              </ul>
              <Button className="w-full" onClick={() => setIsEditing(true)}>
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit Inventory
              </Button>
            </div>
          ) : (
            // Edit mode
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Input
                    value={item.name}
                    onChange={(e) => {
                      setItems(
                        items.map((i) =>
                          i.id === item.id ? { ...i, name: e.target.value } : i
                        )
                      );
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDuplicateItem(item)}
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Add new item"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddItem();
                    }
                  }}
                />
                <Button variant="secondary" onClick={handleAddItem}>
                  Add
                </Button>
              </div>
              <div className="flex justify-between pt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
