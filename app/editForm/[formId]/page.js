"use client";

import FormFields from "@/components/formFields";
import { db } from "@/configs";
import { forms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditForm({ params }) {
  const { user } = useUser();
  const [jsonData, setJsonData] = useState([]);
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
    const jsonData = JSON.parse(jsonDataString);
    setJsonData(jsonData);
    console.log(jsonData);
  };

  const onFeildUpdate = (value,index) => {
    
  }
  return (
    <div className="p-10">
      <h2
        className="flex items-center gap-2 my-5 transition-all cursor-pointer hover:font-semibold"
        onClick={() => router.back()}
      >
        <ArrowLeft />
        Back
      </h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div className="p-5 border rounded-lg shadow-md">Controller</div>
        <div className="h-full p-4 border rounded-lg md:col-span-2">
          <FormFields jsonData={jsonData} onFeildUpdate={onFeildUpdate}/>
        </div>
      </div>
    </div>
  );
}
