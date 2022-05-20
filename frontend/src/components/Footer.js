import "../style/Footer.css";
import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { IoRocketSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="row border-top" id="footer">
      {/* <Container> */}
      <div className="icons-container">
        {/* <div style={{ flex: "1" }}> */}
        <span className="logo-text">GreenShop</span>
        <a
          href="https://github.com/leonardo-bravop/GreenShop-E-Commerce"
          className="icon-link"
        >
          <AiFillGithub size="2em" />
        </a>
        <a href="https://leonardo-bravop.netlify.app/" className="icon-link">
          <IoRocketSharp size="2em" />
        </a>
        {/* </div> */}
      </div>
      <div className="links-container">
        <div className="footer-column">
          <h5>Shop</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/Plants/All_Plants" className="footer-link">
                Plants
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/Accesories/All_Accesories" className="footer-link">
                Accesories
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5>About us</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">Our story</li>
            <li className="nav-item mb-2">Contact</li>
          </ul>
        </div>
      </div>
      {/* </Container> */}
    </footer>
  );
};

export default Footer;
