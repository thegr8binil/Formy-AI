import { Edit, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function FieldEdit({ defaultValue }) {
  const [label, setLabel] = useState();
  const [placeholder, setPlaceholder] = useState();
  return (
    <main className="flex items-center justify-center gap-2">
      <Popover>
        <PopoverTrigger>
          <Edit />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit Field</h2>
          <div>
            <label className="text-xs">Lable Name</label>
            <input
              type="text"
              defaultValue={defaultValue.label}
              onClick={(e) => setLabel(e.target.value)}
              className="w-full p-2 mt-2 border rounded-lg"
            ></input>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <Trash className="text-red-500" />
        </PopoverTrigger>
        <PopoverContent>Delete</PopoverContent>
      </Popover>
    </main>
  );
}
