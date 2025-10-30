import { type ReactNode } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hideLabel: boolean;
  children?: ReactNode;
}

const Input = ({
  label,
  hideLabel,
  children,
  type = 'text',
  value,
  onChange,
  ...props
}: InputProps) => (
  <div className='flex flex-col'>
    <label
      htmlFor={props.name}
      className={`text-text-color-subheading font-medium mb-1 ${
        hideLabel ? 'sr-only' : ''
      }`}
    >
      {label}
    </label>
    <input
      id={props.name}
      type={type}
      className='placeholder-text-color-subheading w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark'
      value={value}
      onChange={onChange}
      {...props}
    />
    {children}
  </div>
);

export default Input;
