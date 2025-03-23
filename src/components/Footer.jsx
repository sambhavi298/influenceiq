// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-black py-6 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} ImpactIndex. All rights reserved.
    </footer>
  );
};

export default Footer;
