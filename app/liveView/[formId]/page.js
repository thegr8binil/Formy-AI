"use client";

import { db } from "@/configs";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { forms } from "@/configs/schema";
import FormFields from "@/components/formFields";

export default function LiveView({ params }) {
  const [record, setRecord] = useState();
  const [jsonData, setJsonData] = useState([]);
  useEffect(() => {
    params && getFormData();
  }, [params]);

  const getFormData = async () => {
    const data = await db
      .select()
      .from(forms)
      .where(eq(forms.id, Number(params?.formId)));
    setRecord(data[0]);
    const jsonDataString = data[0].jsonForm.replace(/^```json\n|```$/g, "");
    const jsonData = JSON.parse(jsonDataString);
    setJsonData(jsonData);
  };

  return (
    <div className="flex items-center justify-center">
      <FormFields
        jsonData={jsonData}
        editable = {false}
      />
    </div>
  );
}
