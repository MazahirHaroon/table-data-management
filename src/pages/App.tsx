import { Characters } from '@pages';

const App = () => {
  return (
    <>
      <header className='flex justify-center gap-2 p-4 m-4'>
        <h1 className='text-4xl font-bold text-blue-500'>Anime</h1>
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
