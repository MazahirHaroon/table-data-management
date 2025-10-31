import { type ReactNode } from 'react';

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
}

const PrimaryButton = ({
  type = 'button',
  children,
  disabled,
  ...props
}: PrimaryButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    className={`py-3 px-5 mt-2 bg-primary-dark text-white rounded-md transition duration-200 ease-in-out
            hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
    {...props}
  >
    {children}
  </button>
);

export default PrimaryButton;
