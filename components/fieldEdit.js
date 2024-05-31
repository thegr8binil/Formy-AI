import { Edit, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function FieldEdit({ defaultValue, onUpdate,deleteFiled}) {
  const [label, setLabel] = useState(defaultValue?.label);
  const [placeholder, setPlaceholder] = useState(defaultValue.placeholder);
  return (
    <main className="flex items-center justify-center gap-2">
      <Popover>
        <PopoverTrigger>
          <Edit />
        </PopoverTrigger>
        <PopoverContent>
          <h2 className="pb-1 font-medium border-b">Edit Field</h2>
          <div>
            <label className="text-xs">Lable Name</label>
            <input
              type="text"
              defaultValue={defaultValue.label}
              onClick={(e) => setLabel(e.target.value)}
              className="w-full p-2 text-sm border rounded-lg"
            ></input>
          </div>
          <div>
            <label className="text-xs">Placeholder Name</label>
            <input
              type="text"
              defaultValue={defaultValue.placeholder}
              onClick={(e) => setPlaceholder(e.target.value)}
              className="w-full p-2 text-sm border rounded-lg"
            ></input>
          </div>
          <Button
            className="flex items-end justify-end mt-2"
            onClick={() =>
              onUpdate({
                label: label,
                placeholder: placeholder,
              })
            }
          >
            Update
          </Button>
        </PopoverContent>
      </Popover>
      <AlertDialog>
        <AlertDialogTrigger>
          <Trash className="text-red-500" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={()=>deleteFiled()}>Continue</AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
