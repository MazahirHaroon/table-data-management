import { type ReactNode } from 'react';

interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
}

const SecondaryButton = ({
  type = 'button',
  children,
  disabled,
  ...props
}: SecondaryButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    className={`py-3 px-5 mt-2 bg-white text-primary-dark border border-primary-dark rounded-md
            transition duration-200 ease-in-out
            hover:bg-primary-light hover:text-white
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
    {...props}
  >
    {children}
  </button>
);

export default SecondaryButton;
