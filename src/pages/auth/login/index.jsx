import React, { useState } from "react";
import { Nav, Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "@/assets/Images/LogoBlanja.png";

function Login() {
  const [activeTab, setActiveTab] = useState("Customer");

  const handleSelect = (selectedKey) => {
    setActiveTab(selectedKey);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center   vh-100 border border-danger">
      <Container className="  border border-danger">
        <div className="my-4 d-flex flex-column  align-items-center ">
          <Image className="mb-4" src={logo} alt="logo blanja" />
          <h6 className=" fw-bold ">Please Login With Your Account ?</h6>
        </div>
        <Row className="justify-content-center">
          <Col xs="auto ">
            <Nav
              variant="pills"
              activeKey={activeTab}
              onSelect={handleSelect}
              className="border border-danger"
            >
              <Nav.Item>
                <Nav.Link
                  style={{ width: "100px" }}
                  eventKey="Customer"
                  className="me-1 border rounded-3"
                >
                  Customer
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="">
                <Nav.Link
                  style={{ width: "100px" }}
                  eventKey="Seller"
                  className="border rounded-3 text-center "
                >
                  Seller
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>

        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8} lg={4} className="border">
            {activeTab === "Customer" && (
              <Form>
                <Form.Group controlId="customerEmail">
                  <Form.Control type="email" placeholder="Masukkan email" />
                </Form.Group>
                <Form.Group controlId="customerPassword">
                  <Form.Control
                    type="password"
                    placeholder="Masukkan password"
                  />
                </Form.Group>
                <div className="d-flex flex-column justify-content-center border border-danger">
                  <h6 className=" text-end">Forgot Password ?</h6>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-3 w-100 rounded-5"
                  >
                    Login
                  </Button>
                  <h6 className=" text-center my-3 fw-bold ">
                    Don`t have a blanja.id account? <span>Register</span>
                  </h6>
                </div>
              </Form>
            )}

            {activeTab === "Seller" && (
              <Form>
                <Form.Group controlId="sellerEmail">
                  <Form.Control type="email" placeholder="Masukkan email" />
                </Form.Group>
                <Form.Group controlId="sellerPassword">
                  <Form.Control
                    type="password"
                    placeholder="Masukkan password"
                  />
                </Form.Group>
                <div className="d-flex flex-column justify-content-center border border-danger">
                  <h6 className=" text-end">Forgot Password ?</h6>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-3 w-100 rounded-5"
                  >
                    Login
                  </Button>
                  <h6 className=" text-center my-3 fw-bold ">
                    Don`t have a blanja.id account? <span>Register</span>
                  </h6>
                </div>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
