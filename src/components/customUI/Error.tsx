interface ErrorProps {
  message?: string;
}
const Error = ({ message = 'Sorry, something went wrong!' }: ErrorProps) => {
  return (
    <div className='flex justify-center items-center py-8'>
      <p className='text-secondary-heading text-text-error font-family-body'>
        {message}
      </p>
    </div>
  );
};

export default Error;
