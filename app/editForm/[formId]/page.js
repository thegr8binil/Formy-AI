"use client";

import Controller from "@/components/controller";
import FormFields from "@/components/formFields";
import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { forms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, Share, Share2, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditForm({ params }) {
  const { user } = useUser();
  const [jsonData, setJsonData] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);
  const router = useRouter();
  useEffect(() => {
    user && getFormData();
  }, [user]);
  const getFormData = async () => {
    const data = await db
      .select()
      .from(forms)
      .where(
        and(
          eq(forms.id, params?.formId),
          eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    const jsonDataString = data[0].jsonForm.replace(/^```json\n|```$/g, "");
    setRecord(data[0]);
    const jsonData = JSON.parse(jsonDataString);
    setJsonData(jsonData);
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonData(jsonData);
      updateDB();
    }
  }, [updateTrigger]);

  const updateDB = async () => {
    const updatedData = await db
      .update(forms)
      .set({ jsonForm: jsonData })
      .where(
        and(
          eq(forms.id, record.id),
          eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    toast("Form Updated Successfully");
  };
  const onFeildUpdate = (value, index) => {
    jsonData.formFields[index].label = value.label;
    jsonData.formFields[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now());
  };

  const deleteFiled = (index) => {
    const newJsonData = jsonData.formFields.filter(
      (field, fieldIndex) => fieldIndex !== index
    );
    jsonData.formFields = newJsonData;
    setUpdateTrigger(Date.now());
    toast("Field Deleted Successfully");
  };
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h2
          className="flex items-center gap-2 my-5 transition-all cursor-pointer hover:font-semibold"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          Back
        </h2>
        <div className="flex gap-2">
          <Link href={`/liveView/${params.formId}`} passHref>
            {" "}
            <Button className="flex items-center justify-center gap-1">
              <SquareArrowOutUpRight className="w-5" />
              Live Preview
            </Button>
          </Link>
          <Button className="flex items-center justify-center gap-1 bg-green-600">
            <Share2 className="w-5" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div className="p-5 border rounded-lg shadow-md">
          <Controller />
        </div>
        <div className="h-full p-4 border rounded-lg md:col-span-2">
          <FormFields
            jsonData={jsonData}
            onFeildUpdate={onFeildUpdate}
            deleteFiled={(index) => deleteFiled(index)}
          />
        </div>
      </div>
    </div>
  );
}
