import { Characters } from '@pages';

const App = () => {
  return (
    <>
      <header className='flex justify-center gap-2 p-4 m-4'>
        <h1 className='text-primary-heading text-primary-dark font-family-heading font-bold '>
          Anime
        </h1>
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
