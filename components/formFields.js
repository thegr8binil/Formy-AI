export default function FormFields({ jsonData }) {
    return (
      <div>
        <h1 className="text-2xl font-medium">{jsonData.title}</h1>
        <p className="text-sm text-gray-600">{jsonData.subheading}</p>
        <div className="grid grid-cols-1 gap-2 mt-5">
          {jsonData.form.map((field, index) => (
            <div key={index} className="p-5 border rounded-lg shadow-md">
              <label htmlFor={field.name} className="text-sm font-medium">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  id={field.name}
                  required={field.required}
                  className="w-full p-2 mt-2 border rounded-lg"
                >
                  <option value="">Select...</option>
                  {field.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full p-2 mt-2 border rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  