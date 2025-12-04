import { PrimaryHeading } from '@custom-ui';
import { TableSelection, About } from '@pages';

const App = () => {
  return (
    <div className='pt-6'>
      <header className='flex flex-col items-center gap-2 pt-4'>
        <PrimaryHeading text='The Table Project' />
      </header>

      <TableSelection />

      <hr className='w-full max-w-4xl mx-auto my-8 border-t border-gray-300' />

      <About />
    </div>
  );
};

export default App;
