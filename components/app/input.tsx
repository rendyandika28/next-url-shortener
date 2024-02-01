import { useFormContext } from "react-hook-form"

type TypeValue = 'text' | 'email' | 'number' | 'phone' | 'date' | 'url'

interface TypeInput {
  label: string
  type?: TypeValue
  name: string
  required?: boolean
  placeholder?: string
  autoComplete?: string
  disabled?: boolean
  value?: string
  tooltip?: string
}

const AppInput = ({
  label,
  type = "text",
  name,
  placeholder,
  required,
  autoComplete = "off",
  disabled,
  value,
  tooltip
}: TypeInput) => {
  const { register, formState: { errors } } = useFormContext()
  return (
    <label className="form-control">
      <div className="label">
        <span className="text-xs font-bold text-white relative">{label}{required && '*'}{tooltip && (
          <div className="lg:tooltip" data-tip={tooltip}>
            <svg className="lg:tooltip hidden ml-1 w-3 h-3 text-gray-200 dark:text-white absolute -top-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.6-8.5h0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        )}</span>
      </div>
      <input {...register(name)} type={type} disabled={disabled} value={value} placeholder={placeholder} className={`input input-bordered ${errors[name] && 'input-error'}`} aria-placeholder={placeholder} autoComplete={autoComplete} />
      <div className="label">
        {errors[name] && <span className="text-xs text-left font-medium text-error">{errors[name]?.message as any}</span>}
      </div>
    </label>
  );
}

export default AppInput;
