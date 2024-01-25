import { useFormContext } from "react-hook-form"

type TypeValue = 'text' | 'email' | 'number' | 'phone' | 'date' | 'url'

interface TypeInput {
  label: string
  type?: TypeValue
  name: string
  required?: boolean
  placeholder?: string
  autoComplete?: string
}

const AppInput = ({
  label,
  type = "text",
  name,
  placeholder,
  required,
  autoComplete
}: TypeInput) => {
  const { register, formState: { errors } } = useFormContext()
  return (
    <label className="form-control">
      <div className="label">
        <span className="text-xs font-bold text-white">{label}{required && '*'}</span>
      </div>
      <input {...register(name)} type={type} placeholder={placeholder} className={`input input-bordered ${errors[name] && 'input-error'}`} aria-placeholder={placeholder} autoComplete={autoComplete} />
      <div className="label">
        {errors[name] && <span className="text-xs font-medium text-error">{errors[name]?.message}</span>}
      </div>
    </label>
  );
}

export default AppInput;
