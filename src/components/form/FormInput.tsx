import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react'

export type Ref = HTMLInputElement

export interface FormInputProps
  extends DetailedHTMLProps<InputHTMLAttributes<Ref>, Ref> {
  label: string
  name: string
}

export const FormInput = forwardRef<Ref, FormInputProps>(
  ({ label, name, ...props }, ref) => {
    return (
      <div className="mb-5">
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {label}
        </label>
        <input
          id={name}
          name={name}
          ref={ref}
          {...props}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'
