"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { geminiAi } from "./geminiAi";
import moment from "moment/moment";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { forms } from "@/configs/schema";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [userInput, setUserInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const route = useRouter();
  const promptForm =
    "On the basis of description give form in json format with form title, form subheading with form having Form field, form name, placeholder name, and form label, field Type, field required In proper JSON format. Just the JSON format is enough dont add anything extra like explantion or any text";

  const handleCreateForm = async () => {
    setLoading(true);
    const result = await geminiAi.sendMessage(
      "Description: " + userInput + promptForm
    );
    console.log(result.response.text());
    if (result.response.text()) {
      const resp = await db
        .insert(forms)
        .values({
          jsonForm: result.response.text(),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
        .returning({ id: forms.id });
      console.log("new id" + resp[0].id);
      if (resp[0].id) {
        route.push("/editForm/" + resp[0].id);
      }
      setLoading(false);
    }
    setLoading(false);

    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <main className="p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md shadow bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 h-9 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            onClick={() => setIsDialogOpen(true)}
          >
            + Create AI Form
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter prompt to create form</DialogTitle>
              <DialogDescription>
                <Textarea
                  placeholder="Enter prompt here"
                  className="mt-2"
                  onChange={(e) => setUserInput(e.target.value)}
                />
                <div className="flex items-center justify-end w-full mt-2">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-destructive text-destructive"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateForm} disabled={loading}>
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Create"
                      )}
                    </Button>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
