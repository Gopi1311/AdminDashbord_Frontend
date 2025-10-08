import { customerValidation } from "../utils/validationRules";
export const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  error,
  register,
  onChange,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} *
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      {...register}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);
export const SelectField = ({ id, label, options, error, register }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} *
    </label>
    <select
      id={id}
      {...register}
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);
export const RadioGroup = ({
  label,
  name,
  options,
  defaultValue,
  register,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-3">
      {label}
    </label>
    <div className="flex space-x-4">
      {options.map((opt) => (
        <label key={opt} className="flex items-center">
          <input
            type="radio"
            value={opt}
            {...register}
            defaultChecked={opt === defaultValue}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            name={name}
          />
          <span className="ml-2 text-sm text-gray-700">
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </span>
        </label>
      ))}
    </div>
  </div>
);
export const RoleRadio = ({ register, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-3">
      Role *
    </label>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {["buyer", "seller"].map((role) => (
        <label key={role} className="relative flex cursor-pointer">
          <input
            type="radio"
            value={role}
            {...register("role", customerValidation.role)}
            className="peer sr-only"
          />
          <div className="flex items-center justify-between w-full p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 border-2 border-gray-300 rounded-full peer-checked:border-indigo-500 peer-checked:bg-indigo-500 transition-colors"></div>
              <div>
                <div className="font-medium text-gray-900">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </div>
                <div className="text-sm text-gray-500">
                  {role === "buyer"
                    ? "Can purchase products"
                    : "Can sell products"}
                </div>
              </div>
            </div>
          </div>
        </label>
      ))}
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
  </div>
);
