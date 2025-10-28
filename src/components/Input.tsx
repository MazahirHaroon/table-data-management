import { type ReactNode } from 'react';

interface InputProps {
  type?: string;
  name: string;
  label: string;
  hideLabel: boolean;
  placeholder?: string;
  children?: ReactNode;
}

const Input = ({
  label,
  hideLabel,
  children,
  type = 'text',
  ...props
}: InputProps) => (
  <div className='flex flex-col'>
    <label
      htmlFor={props.name}
      className={`text-primary-dark font-medium mb-1 ${
        hideLabel ? 'sr-only' : ''
      }`}
    >
      {label}
    </label>
    <input
      type={type}
      className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark'
      {...props}
    />
    {children}
  </div>
);

export default Input;
