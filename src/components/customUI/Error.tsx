import { OctagonAlert } from 'lucide-react';

interface ErrorProps {
  message?: string;
}

export const Error = ({
  message = 'Sorry, something went wrong.',
}: ErrorProps) => {
  return (
    <div
      role='alert'
      aria-live='assertive'
      className='mx-auto w-full max-w-lg p-4 error-card flex flex-col items-center gap-3'
      style={{ fontFamily: 'var(--font-family-body)' }}
    >
      <div className='flex items-start gap-3 w-full'>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-3'>
            <OctagonAlert className='w-6 h-6 text-text-error' />
            <p className='font-semibold text-secondary-heading text-text-color-subheading'>
              {message}
            </p>
          </div>

          <p className='mt-1 text-body text-text-color-body'>
            You can refresh the page or try again. If the issue persists,
            contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
