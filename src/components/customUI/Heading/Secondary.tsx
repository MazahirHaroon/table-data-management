interface SecondaryHeadingProps {
  text: string;
}
const SecondaryHeading = ({ text }: SecondaryHeadingProps) => {
  return (
    <h2 className='text-center text-secondary-heading text-text-color-subheading font-family-heading font-bold mb-4'>
      {text}
    </h2>
  );
};

export default SecondaryHeading;
