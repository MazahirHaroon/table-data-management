interface HeaderProps {
  headers: string[];
}

const Header = ({ headers }: HeaderProps) => {
  return (
    <thead className='sticky top-0'>
      <tr>
        {headers.map((header) => (
          <th
            key={header}
            className='border-2 border-table-border font-family-body text-text-color-subheading bg-primary-light p-4 w-48 text-left capitalize'
          >
            {header as React.ReactNode}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
