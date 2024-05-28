import Button from "@mui/material/Button";
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
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { ShoppingCart, Notifications, Mail, FilterList } from "@mui/icons-material";

const IconButton = styled(Button)(({ theme }) => ({
  minWidth: 0,
  padding: theme.spacing(0.5),
  backgroundColor: "transparent",
  color: "gray",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const NavbarLogin = ({ id }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/customers/${id}`)
      .then((res) => {
        const user = res.data.data;
        setUser(user);
        console.log(user);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, [id]);

  return (
    <>
      {["sm"].map((expand) => (
        <Navbar
          collapseOnSelect
          key={expand}
          expand={expand}
          className="bg-body-tertiary mb-3 shadow-sm"
        >
          <Container className="d-flex justify-content-between align-items-center">
            <Navbar.Brand as={Link} href="/">
              <Image src={LogoBlanja} alt="logo" />
            </Navbar.Brand>
            <Form
              className="d-flex align-items-center border rounded"
              style={{ maxWidth: "500px", flexGrow: 1 }}
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="flex-grow-1 border-0"
                aria-label="Search"
              />
              <IconButton>
                <FilterList />
              </IconButton>
            </Form>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end align-items-center flex-grow-1">
                  <Nav.Link as={Link} href="/cart" className="d-flex align-items-center">
                    <IconButton>
                      <ShoppingCart />
                    </IconButton>
                  </Nav.Link>
                  <Nav.Link as={Link} href="#action2" className="d-flex align-items-center">
                    <IconButton>
                      <Notifications />
                    </IconButton>
                  </Nav.Link>
                  <Nav.Link as={Link} href="#action2" className="d-flex align-items-center">
                    <IconButton>
                      <Mail />
                    </IconButton>
                  </Nav.Link>
                  <NavDropdown
                    title={
                      <div style={{ display: "flex", alignItems: "center", width:"30px" }}>
                        <Image
                          src={LoginFace}
                          roundedCircle
                          alt="LogoLogin"
                          height={27}
                          width={27}
                        />
                      </div>
                    }
                    style={{ display: "flex", alignItems: "center" }}
                    drop="end"
                    className="no-caret"
                  >
                    <NavDropdown.Item as={Link} href="/profile">
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/profile">
                      Pengaturan Akun
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={(e) => {
                        e.preventDefault();
                        localStorage.clear();
                        window.location.href = "/auth/login";
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

      {/* Inline CSS to remove the dropdown arrow */}
      <style jsx global>{`
        .no-caret .dropdown-toggle::after {
          display: none !important;
        }
      `}</style>
    </>
  );
};

export default NavbarLogin;
