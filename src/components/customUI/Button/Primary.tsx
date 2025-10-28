import { type ReactNode } from 'react';

interface PrimaryButtonProps {
  content: string | ReactNode;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}

const PrimaryButton = ({
  type = 'button',
  content,
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
    {content}
  </button>
);

export default PrimaryButton;
