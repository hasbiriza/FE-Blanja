import AuthenticatedNavbar from "@/components/Navbar/AuthenticatedNavbar";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "@mui/material/Button";
import selected from "@/assets/Images/selected.png";
import nike1 from "@/assets/Images/nike1.png";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";

const Checkout = () => {
  const [value, setValue] = React.useState(1);

  const handleDecrement = () => {
    if (value > 1) setValue(value - 1);
  };

  const handleIncrement = () => {
    setValue(value + 1);
  };

  return (
    <>
      <AuthenticatedNavbar />
      <Container>
        <Row>
          <h1 className="fw-bold text-4xl">Checkout</h1>
          <h1 className=" fw-medium  text-xl mt-5">Shipping Address</h1>
          <Col xs={12} md={8}>
            <div
              id="axios"
              className="d-flex flex-column shadow-sm mt-3 rounded-3 p-3"
              style={{ border: "0.5px solid #ccc" }}
            >
              <h1 className=" fw-medium  ">Andreas Jane</h1>
              <h3 className=" fw-medium text-sm mt-2 text-gray-600 text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Impedit porro quam eum, cupiditate nisi voluptate pariatur harum
                temporibus labore cum eius perspiciatis eos minima, culpa
                assumenda laudantium. Architecto fugit deleniti soluta vitae
                mollitia nisi animi, dolor sit labore quas est a, dolorum
                laboriosam nihil rem? Ipsam minus quidem optio architecto.
              </h3>
            </div>

            <div
              className="d-flex shadow-sm mt-3 align-items-center rounded-3 p-3 flex-wrap"
              style={{ border: "0.5px solid #ccc" }}
            >
              <Image
                style={{ height: "70px", width: "70px" }}
                src={nike1}
                alt="nike1"
                className="my-3"
              />

              <div className="ms-3" style={{ flex: 1, minWidth: "200px" }}>
                <h3 className="fw-bold d-block">Corduroy Dual Chest Pocket</h3>
                <h3 className="text-muted d-block mt-2">Zalora Cloth</h3>
               
              </div>

              

              <h3 className="ms-auto me-3 fw-bold d-block">Rp. 150.0000</h3>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div
              id="alexa"
              className="shadow-sm mt-3 rounded-3 p-3"
              style={{ border: "0.5px solid #ccc" }}
            >
              <h6 className="d-inline-block fw-bold my-3 px-3">
                Shopping Summary
              </h6>
              <div className="d-flex justify-between">
                <h6 className="text-red-600 px-3 my-3 text-sm fw-bold text-muted">
                  Order
                </h6>
                <h6 className="text-red-600 px-3 my-3 text-sm fw-bold">
                  Rp. 150.0000
                </h6>
              </div>
              <div className="d-flex justify-between">
                <h6 className="text-red-600 px-3 my-3 text-sm fw-bold text-muted">
                  Delivery
                </h6>
                <h6 className="text-red-600 px-3 my-3 text-sm fw-bold">
                  Rp. 100.000
                </h6>
              </div>
              <hr/>
              <div className="d-flex justify-center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#DB3022",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#E94B32", // Change background color on hover
                    },
                  }}
                  className="text-center rounded-5 w-100 my-3 border-0"
                >
                  Select Payment
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Checkout;
