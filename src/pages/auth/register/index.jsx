import React, { useState } from "react";
import { Nav, Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "@/assets/Images/LogoBlanja.png";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const RegisterForm = () => {
  const [activeTab, setActiveTab] = useState("Customer");

  const handleSelect = (selectedKey) => {
    setActiveTab(selectedKey);
  };

  const handleSubmit = async (values) => {
    const endpoint =
      activeTab === "Customer"
        ? "http://localhost:8080/api/v1/customers"
        : "http://localhost:8080/api/v1/sellers";

    try {
      console.log(values)
      const response = await axios.post(endpoint, values);

      if (response.status === 201) {
        alert(`${activeTab} registration successful!`);
      } else {
        alert(`Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration");
    }
  };

  const customerFormik = useFormik({
    initialValues: {
      customer_name: "",
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: yup.object().shape({
      customer_name: yup
        .string()
        .required("Please Enter your Name")
        .min(3)
        .max(25),
      email: yup.string().required("Please Enter your Email").email(),
      password: yup
        .string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, and One Number"
        ),
    }),
  });

  const sellerFormik = useFormik({
    initialValues: {
      seller_name: "",
      email: "",
      phone: "",
      seller_storename: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: yup.object().shape({
      seller_name: yup
        .string()
        .required("Please Enter your Name")
        .min(3)
        .max(25),
      email: yup.string().required("Please Enter your Email").email(),
      phone: yup.number().required("Please Enter your phone number"),
      seller_storename: yup
        .string()
        .required("Please Enter your store name")
        .min(3)
        .max(25),
      password: yup
        .string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, and One Number"
        ),
    }),
  });

  const handleCustomerForm = (event) => {
    const { target } = event;
    customerFormik.setFieldValue(target.name, target.value);
  };
  
  const handleSellerForm = (event) => {
    const { target } = event;
    sellerFormik.setFieldValue(target.name, target.value);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 RegisterPage">
      <Container className="">
        <div className="my-4 d-flex flex-column align-items-center">
          <Image className="mb-4" src={logo} alt="logo blanja" />
          <h6 className="fw-bold">Register With Your Account</h6>
        </div>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect}>
              <Nav.Item>
                <Nav.Link
                  style={{
                    width: "100px",
                    backgroundColor:
                      activeTab === "Customer" ? "#DB3022" : "transparent",
                    color: activeTab === "Customer" ? "white" : "gray",
                  }}
                  eventKey="Customer"
                  className="me-1 rounded-3"
                >
                  Customer
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  style={{
                    width: "100px",
                    backgroundColor:
                      activeTab === "Seller" ? "#DB3022" : "transparent",
                    color: activeTab === "Seller" ? "white" : "gray",
                  }}
                  eventKey="Seller"
                  className="rounded-3 text-center"
                >
                  Seller
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>

        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8} lg={4}>
            {activeTab === "Customer" && (
              <Form onSubmit={customerFormik.handleSubmit}>
                <Form.Group controlId="customerName">
                  <Form.Control
                     isInvalid={customerFormik.errors.customer_name}
                     name="customer_name"
                     onChange={handleCustomerForm}
                     type="text"
                     placeholder="Enter your name"
                     value={customerFormik.values.customer_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {customerFormik.errors.customer_name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="customerEmail" className="my-3">
                  <Form.Control
                    isInvalid={customerFormik.errors.email}
                    name="email"
                    onChange={handleCustomerForm}
                    type="email"
                    placeholder="Enter your email"
                    value={customerFormik.values.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {customerFormik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="customerPassword" className="my-3">
                  <Form.Control
                    isInvalid={customerFormik.errors.password}
                    name="password"
                    onChange={handleCustomerForm}
                    type="password"
                    placeholder="Enter your password"
                    value={customerFormik.values.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {customerFormik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3 w-100 rounded-5"
                  style={{ backgroundColor: "#DB3022", color: "white" }}
                >
                  Register
                </Button>
                <h6 className="text-center my-3 fw-bold">
                  Already have an account?{" "}
                  <Link href="/auth/login" style ={{ color: "#DB3022" }}>
                    Login here
                  </Link>
                </h6>
              </Form>
            )}

            {activeTab === "Seller" && (
              <Form onSubmit={sellerFormik.handleSubmit}>
                <Form.Group controlId="sellerName">
                  <Form.Control
                    isInvalid={sellerFormik.errors.seller_name}
                    name="seller_name"
                    onChange={handleSellerForm}
                    type="text"
                    placeholder="Enter your name"
                    value={sellerFormik.values.seller_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {sellerFormik.errors.seller_name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="sellerEmail" className="my-3">
                  <Form.Control
                    isInvalid={sellerFormik.errors.email}
                    name="email"
                    onChange={handleSellerForm}
                    type="email"
                    placeholder="Enter your email"
                    value={sellerFormik.values.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {sellerFormik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="sellerPhoneNumber" className="my-3">
                  <Form.Control
                    isInvalid={sellerFormik.errors.phone}
                    name="phone"
                    onChange={handleSellerForm}
                    type="text"
                    placeholder="Enter your phone number"
                    value={sellerFormik.values.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {sellerFormik.errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="sellerStoreName" className="my-3">
                  <Form.Control
                    isInvalid={sellerFormik.errors.seller_storename}
                    name="seller_storename"
                    onChange={handleSellerForm}
                    type="text"
                    placeholder="Enter your store name"
                    value={sellerFormik.values.seller_storename}
                  />
                  <Form.Control.Feedback type="invalid">
                    {sellerFormik.errors.seller_storename}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="sellerPassword" className="my-3">
                  <Form.Control
                    isInvalid={sellerFormik.errors.password}
                    name="password"
                    onChange={handleSellerForm}
                    type="password"
                    placeholder="Enter your password"
                    value={sellerFormik.values.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {sellerFormik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3 w-100 rounded-5"
                  style={{ backgroundColor: "#DB3022", color: "white" }}
                >
                  Register
                </Button>
                <h6 className="text-center my-3 fw-bold">
                  Already have an account?{" "}
                  <Link href="/auth/login" style={{ color: "#DB3022" }}>
                    Login here
                  </Link>
                </h6>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterForm;

