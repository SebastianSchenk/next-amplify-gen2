import {
  DetailedHTMLProps,
  SelectHTMLAttributes,
  ReactNode,
  forwardRef,
} from 'react'

export type Ref = HTMLSelectElement

export type FormSelectOption = {
  label: ReactNode
  value: string | number | string[]
}

export interface FormSelectProps
  extends DetailedHTMLProps<SelectHTMLAttributes<Ref>, Ref> {
  label: string
  name: string
  options: FormSelectOption[]
}

export const FormSelect = forwardRef<Ref, FormSelectProps>(
  ({ label, name, options, ...props }, ref) => {
    return (
      <div className="mb-5">
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <select
          id={name}
          name={name}
          ref={ref}
          {...props}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          {options.map(({ label, value }, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

FormSelect.displayName = 'FormSelect'
