interface HeaderProps {
  headers: string[];
}

const Header = ({ headers }: HeaderProps) => {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th
            key={header}
            className='border border-gray-300 p-4 w-48 text-left capitalize'
          >
            {header as React.ReactNode}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
