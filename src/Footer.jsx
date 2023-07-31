const Footer = () => {
  let year = new Date();

  return (
    <footer className="mt-4">
      <h4>Team Member Allocation App - {year.getFullYear()}</h4>
    </footer>
  );
};

export default Footer;
