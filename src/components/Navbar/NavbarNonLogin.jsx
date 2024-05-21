import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";
import LogoBlanja from "@/assets/Images/LogoBlanja.png";
import LoginFace from "@/assets/Images/LoginFace.png";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";

const NavbarNonLogin = () => {
  return (
    <>
      {["sm"].map((expand) => (
        <Navbar
          collapseOnSelect
          key={expand}
          expand="md"
          className="bg-body-tertiary mb-3 shadow-sm "
        >
          <Container className="">
            <Navbar.Brand as={Link} href="/">
              <Image src={LogoBlanja} alt="logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton className="border border-success ">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="">
                <Form className="d-flex  container-fluid p-0 border border-danger" style={{ maxWidth: '600px' }}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2 w-75  "
                    aria-label="Search"
                  />
                  
                  
                </Form>
                <Nav className="justify-content-end  pe-3  border  ">
                  <Nav.Link as={Link} href="#action2" className=" mx-1 ">
                    <FiShoppingCart size={24} color="gray" />
                  </Nav.Link>
                  <Nav.Link as={Link} href="#action2" className=" mx-1 ">
                  <button>Masuk</button>
                  </Nav.Link>
                  <Nav.Link as={Link} href="#action2" className=" mx-1  ">
                  <button>SignUp</button>
                  </Nav.Link>
                 
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default NavbarNonLogin;
