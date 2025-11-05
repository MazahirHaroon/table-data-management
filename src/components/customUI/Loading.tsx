interface LoadingProps {
  message?: string;
}
const Loading = ({ message = 'Loading...' }: LoadingProps) => {
  return (
    <div className='flex justify-center items-center py-8'>
      <p className='text-minor text-text-alerts font-family-body'>{message}</p>
    </div>
  );
};

export default Loading;
