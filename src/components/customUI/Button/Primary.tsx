import { type ReactNode } from 'react';

import type { ButtonSize } from '@typesData/customUI';
import { BUTTON_SIZES } from '@constants/customUI';

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  size?: ButtonSize;
  className?: string;
}

const PrimaryButton = ({
  type = 'button',
  children,
  disabled,
  size = 'md',
  className,
  ...props
}: PrimaryButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    className={`${BUTTON_SIZES[size]} py-3 px-5 mt-2 bg-primary-dark text-white rounded-md transition duration-200 ease-in-out
            hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default PrimaryButton;
