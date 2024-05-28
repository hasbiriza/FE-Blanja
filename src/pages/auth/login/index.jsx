import React, { useState } from "react";
import { Nav, Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "@/assets/Images/LogoBlanja.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [activeTab, setActiveTab] = useState("Customer");
  const router = useRouter();

  const handleSelect = (selectedKey) => {
    setActiveTab(selectedKey);
  };

  const handleSubmit = async (values) => {
    const endpoint =
      activeTab === "Customer"
        ? "http://localhost:8080/api/v1/customers/login"
        : "http://localhost:8080/api/v1/sellers/login";
  
    try {
      console.log(values);
      const response = await axios.post(endpoint, values);
  
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have logged in successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("id", response.data.data.ID);
  
        // Set role based on the endpoint
        if (endpoint.includes("/customers/login")) {
          localStorage.setItem("role", "customer");
        } else if (endpoint.includes("/sellers/login")) {
          localStorage.setItem("role", "seller");
        }
  
        router.push("/");
      } else {
        alert(`Login failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during login");
    }
  };
  

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: yup.object().shape({
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

  const handleCustomerForm = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  const handleSellerForm = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 LoginPage">
      <Container className="">
        <div className="my-4 d-flex flex-column align-items-center">
          <Image className="mb-4" src={logo} alt="logo blanja" />
          <h6 className="fw-bold">Please Login With Your Account</h6>
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
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formik.values.email}
                  onChange={
                    activeTab === "Customer"
                      ? handleCustomerForm
                      : handleSellerForm
                  }
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={
                    activeTab === "Customer"
                      ? handleCustomerForm
                      : handleSellerForm
                  }
                  isInvalid={formik.touched.password && formik.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex flex-column justify-content-center">
                <h6 className="text-end fw-bold" style={{ color: "#DB3022" }}>
                  <Link href="/auth/forgotPassword">Forgot Password ?</Link>
                </h6>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3 w-100 rounded-5"
                  style={{ backgroundColor: "#DB3022", color: "white" }}
                >
                  Login
                </Button>
                <h6 className="text-center my-3 fw-bold">
                  Don`t have an account?{" "}
                  <span style={{ color: "#DB3022" }}>
                    <Link href="/auth/register">Register</Link>
                  </span>
                </h6>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
