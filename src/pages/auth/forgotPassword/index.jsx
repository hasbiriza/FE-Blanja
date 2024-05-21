import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "@/assets/Images/LogoBlanja.png";
import Link from "next/link";

function ForgotPassword() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 ForgotPasswordPage">
      <Container className="">
        <div className="my-4 d-flex flex-column align-items-center">
          <Image className="mb-4" src={logo} alt="logo blanja" />
          <h6 className="fw-bold">Reset Password</h6>
        </div>
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8} lg={4}>
            <Form>
              <Form.Group controlId="email">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <div className="d-flex flex-column justify-content-center mt-3">
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 rounded-5"
                  style={{ backgroundColor: "#DB3022", color: "white" }}
                >
                  Send Password
                </Button>
                <h6 className="text-center my-3 fw-bold">
                  <Link href="/auth/login" style={{ color: "#DB3022" }}>
                    Login
                  </Link>{" "}
                  /{" "}
                  <Link href="/auth/register" style={{ color: "#DB3022" }}>
                    Sign Up
                  </Link>
                </h6>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ForgotPassword;
