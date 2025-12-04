import { type ReactNode } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name: string;
  label: string;
  hideLabel?: boolean;
  children?: ReactNode;
}

const Input = ({
  id,
  name,
  label,
  hideLabel = false,
  type = 'text',
  children,
  value,
  onChange,
  ...props
}: InputProps) => {
  const inputId = id ?? name;
  const ariaLabelProps = hideLabel ? { 'aria-label': label } : {};

  return (
    <div className='flex flex-col'>
      <label
        htmlFor={inputId}
        className={`text-text-color-subheading font-medium mb-1 ${
          hideLabel ? 'sr-only' : ''
        }`}
      >
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        name={name}
        className='placeholder-text-color-subheading w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark'
        value={value}
        onChange={onChange}
        {...ariaLabelProps}
        {...props}
      />
      {children}
    </div>
  );
};

export default Input;
