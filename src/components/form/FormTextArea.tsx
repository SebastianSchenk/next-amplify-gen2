import { DetailedHTMLProps, TextareaHTMLAttributes, forwardRef } from 'react'

export type Ref = HTMLTextAreaElement

export interface FormTextAreaProps
  extends DetailedHTMLProps<TextareaHTMLAttributes<Ref>, Ref> {
  label: string
  name: string
}

export const FormTextArea = forwardRef<Ref, FormTextAreaProps>(
  ({ label, name, ...props }, ref) => {
    return (
      <div className="mb-5">
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          ref={ref}
          {...props}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    )
  }
)

FormTextArea.displayName = 'FormTextArea'
