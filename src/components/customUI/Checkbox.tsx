interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  hideLabel?: boolean;
  className?: string;
}

const CheckBox = ({
  name,
  label,
  hideLabel = false,
  className,
  ...props
}: CheckboxProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type='checkbox'
        id={name}
        name={name}
        {...props}
        className='w-5 h-5 bg-white border-table-border rounded focus:ring-2 focus:ring-primary-dark'
      />
      <label
        htmlFor={name}
        className={`text-primary-dark ${hideLabel ? 'sr-only' : ''}`}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
