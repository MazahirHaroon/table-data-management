import { PrimaryHeading } from '@custom-ui';

import { Characters } from '@pages';

const App = () => {
  return (
    <>
      <header className='flex justify-center gap-2 p-4 m-4'>
        <PrimaryHeading text={'Anime'} />
      </header>
      <main>
        <section className='flex flex-col justify-center items-center'>
          <Characters />
        </section>
      </main>
    </>
  );
};

export default App;
