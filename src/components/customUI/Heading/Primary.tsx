interface PrimaryHeadingProps {
  text: string;
}
const PrimaryHeading = ({ text }: PrimaryHeadingProps) => {
  return (
    <h1 className='text-primary-heading text-primary-dark font-family-heading font-bold '>
      {text}
    </h1>
  );
};

export default PrimaryHeading;
