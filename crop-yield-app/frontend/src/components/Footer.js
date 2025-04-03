import React from 'react';

function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {year} Crop Yield Predictor | Built with Machine Learning
        </p>
      </div>
    </footer>
  );
}

export default Footer;
