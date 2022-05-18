import "../style/Footer.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { IoRocketSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="row border-top" id="footer">
      {/* <Container> */}
      <div style={{ flex: "1" }}>
        <div style={{ flex: "1" }}>
          <span className="d-flex align-items-center mb-3 logo-text">
            GreenShop
          </span>
          <AiFillGithub size="2em" />
          <IoRocketSharp size="2em" />
        </div>
      </div>
      <div style={{ flex: "3", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ padding: "0 40px" }}>
          <h5>Shop</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/Plants/All_Plants">Plants</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/Accesories/All_Accesories">Accesories</Link>
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
