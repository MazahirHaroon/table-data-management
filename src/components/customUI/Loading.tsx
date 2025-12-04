import { Loader } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = 'Loading...' }: LoadingProps) => {
  return (
    <div className='flex justify-center items-center py-8'>
      <p className='flex items-center gap-2 text-minor text-text-alerts'>
        <Loader className='animate-spin w-4 h-4' />
        {message}
      </p>
    </div>
  );
};

export default Loading;
