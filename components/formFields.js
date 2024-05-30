import { validators } from "tailwind-merge";
import FieldEdit from "./fieldEdit";

export default function FormFields({ jsonData, onFeildUpdate}) {
  return (
    <div>
      <h1 className="text-2xl font-medium">{jsonData.formTitle}</h1>
      <p className="text-sm text-gray-600">{jsonData.formSubheading}</p>
      <div className="grid grid-cols-1 gap-2 mt-5">
        {jsonData.formFields &&
          jsonData.formFields.map((field, index) => (
            <div key={index} className="p-5 border rounded-lg shadow-md">
              <label htmlFor={field.fieldName} className="text-sm font-medium">
                {field.label}
              </label>
              {field.fieldType === "select" ? (
                <select
                  name={field.fieldName}
                  id={field.fieldName}
                  required={field.required}
                  className="w-full p-2 mt-2 border rounded-lg"
                >
                  <option value="">Select...</option>
                  {field.options &&
                    field.options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
              ) : field.fieldType === "radio" ? (
                <div>
                  {field.options &&
                    field.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center">
                        <input
                          type="radio"
                          id={`${field.fieldName}-${option.value}`}
                          name={field.fieldName}
                          value={option.value}
                          required={field.required}
                          className="mr-2"
                        />
                        <label htmlFor={`${field.fieldName}-${option.value}`}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                </div>
              ) : field.fieldType === "checkbox" ? (
                <div>
                  <input
                    type="checkbox"
                    id={field.fieldName}
                    name={field.fieldName}
                    required={field.required}
                    className="mr-2"
                  />
                  <label htmlFor={field.fieldName}>{field.label}</label>
                </div>
              ) : (
                <input
                  type={field.fieldType}
                  name={field.fieldName}
                  id={field.fieldName}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full p-2 mt-2 border rounded-lg"
                />
              )}
              <div className="flex items-end justify-end mt-2">
                <FieldEdit defaultValue={field} onUpdate={(value)=>onFeildUpdate(value,index)} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
