import React from "react";

const Footer = () => {
  const footer = {
    position: "absolute",
    bottom: 0,
    width: "100%",
  }

  return (
    <footer style={footer} className="page-footer blue-grey darken-3">
      <div className="container">
        <div className="row">
          <div className="col s6 ">
            <h5 className="white-text">Footer Content</h5>
            <p className="grey-text text-lighten-4">
              You can use rows and columns here to organize your footer content.
            </p>
          </div>
          <div className="col s3 offset-s3">
            <h5 className="white-text">Links</h5>
            <ul>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 1
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 2
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 3
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright blue-grey darken-4">
        <div className="container">
          © 2020 Artur Okhotnichenko
          <a className="grey-text text-lighten-4 right" href="#!">
            More Links
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
