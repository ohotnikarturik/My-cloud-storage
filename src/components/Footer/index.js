import React from "react";

const Footer = () => {
  const footer = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingTop: "0px",
  }

  return (
    <footer style={footer} className="page-footer">
      <div className="footer-copyright blue-grey darken-4">
        <div className="container">
          © 2020 Artur Okhotnichenko
          <a href="https://docs.amplify.aws/start/q/integration/react" rel="noreferrer" target="_blank" className="grey-text text-lighten-4 right">
            React + AWS Amplify
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
