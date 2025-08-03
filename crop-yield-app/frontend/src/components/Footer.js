import React from 'react';

function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="animate-fade-in">
      <div className="container text-center">
        <p>
          &copy; {year} Crop Yield Predictor | Built with Machine Learning
        </p>
      </div>
    </footer>
  );
}

export default Footer;
