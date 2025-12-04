import { PrimaryHeading } from '@custom-ui';

import { TableSelection } from '@pages';

const App = () => {
  return (
    <div className='pt-6'>
      <header className='flex flex-col items-center gap-2 pt-4'>
        <PrimaryHeading text={'The Table Project'} />
      </header>
      <TableSelection />
    </div>
  );
};

export default App;
