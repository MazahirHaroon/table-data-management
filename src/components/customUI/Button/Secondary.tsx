import { type ReactNode } from 'react';

import type { ButtonSize } from '@typesData/customUI';
import { BUTTON_SIZES } from '@constants/customUI';

interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  size?: ButtonSize;
  className?: string;
}

const SecondaryButton = ({
  type = 'button',
  children,
  disabled,
  size = 'md',
  className,
  ...props
}: SecondaryButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    className={`${BUTTON_SIZES[size]} py-3 px-5 mt-2 bg-white text-primary-dark border border-primary-dark rounded-md
            transition duration-200 ease-in-out
            hover:bg-primary-light hover:text-white
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default SecondaryButton;
