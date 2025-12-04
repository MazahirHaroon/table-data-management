import { useState } from 'react';

import { House } from 'lucide-react';

import type { TableName } from '@typesData/table';
import { TABLE_LIST } from '@constants/table';

import { PrimaryButton, SecondaryButton } from '@custom-ui';

import { Characters, Cities } from '@pages';

const TableSelection = () => {
  const { CHARACTERS, CITIES } = TABLE_LIST;
  const [selectedTable, setSelectedTable] = useState<TableName | null>(null);

  return (
    <>
      {selectedTable === null ? (
        <>
          <header className='flex flex-col items-center gap-2 p-4 mb-6'>
            <p className='text-sm text-gray-600'>
              Click a card below to open that table. Use the back button to
              return.
            </p>
          </header>

          <main className='flex flex-col items-center gap-6'>
            <section className='flex gap-4'>
              <PrimaryButton
                onClick={() => setSelectedTable(CHARACTERS)}
                className='w-44'
              >
                Characters' Table
              </PrimaryButton>

              <PrimaryButton
                onClick={() => setSelectedTable(CITIES)}
                className='w-44'
              >
                Cities' Table
              </PrimaryButton>
            </section>
          </main>
        </>
      ) : (
        <main className='flex flex-col items-center gap-6'>
          {selectedTable === CHARACTERS && (
            <section className='w-full flex flex-col items-center gap-4'>
              <div className='flex gap-3 w-full max-w-4xl'>
                <div className='flex justify-center items-center gap-2'>
                  <SecondaryButton
                    size='sm'
                    onClick={() => setSelectedTable(null)}
                  >
                    <House />
                  </SecondaryButton>
                  <PrimaryButton
                    size='sm'
                    onClick={() => setSelectedTable(CITIES)}
                  >
                    View Cities' Table
                  </PrimaryButton>
                </div>
              </div>

              <div className='w-full max-w-4xl'>
                <Characters />
              </div>
            </section>
          )}

          {selectedTable === 'cities' && (
            <section className='w-full flex flex-col items-center gap-4'>
              <div className='flex gap-3 w-full max-w-4xl'>
                <div className='flex justify-center items-center gap-2'>
                  <SecondaryButton
                    size='sm'
                    onClick={() => setSelectedTable(null)}
                  >
                    <House />
                  </SecondaryButton>
                  <PrimaryButton
                    size='sm'
                    onClick={() => setSelectedTable(CHARACTERS)}
                  >
                    View Characters' Table
                  </PrimaryButton>
                </div>
              </div>

              <div className='w-full max-w-4xl'>
                <Cities />
              </div>
            </section>
          )}
        </main>
      )}
    </>
  );
};

export default TableSelection;
