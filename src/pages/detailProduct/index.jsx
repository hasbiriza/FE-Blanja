import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "@mui/material/Button";
import nike1 from "@/assets/Images/nike1.png";
import nike2 from "@/assets/Images/nike2.png";
import nike3 from "@/assets/Images/nike3.png";
import nike4 from "@/assets/Images/nike4.png";
import Image from "next/image";
import bintang from "@/assets/Images/bintang.png";
import Popular from "@/components/LandingPage/Popular";
import AuthenticatedNavbar from "@/components/Navbar/AuthenticatedNavbar";
import IconButton from "@mui/material/IconButton";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";

const ProductDetail = () => {
  const [value, setValue] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [size, setSize] = useState(1);

  const handleDecrement = () => {
    if (value > 1) setValue(value - 1);
  };

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleSizeDecrement = () => {
    if (size > 1) setSize(size - 1);
  };

  const handleSizeIncrement = () => {
    setSize(size + 1);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const buttonStyle = (color) => ({
    backgroundColor: color,
    color: "white",
    borderRadius: "50%",
    padding: "8px",
    minWidth: "30px",
    minHeight: "30px",
    margin: "5px",
    position: "relative",
    border: "none",
    cursor: "pointer",
  });

  const activeBorderStyle = {
    content: '""',
    position: "absolute",
    top: "-4px",
    left: "-4px",
    right: "-4px",
    bottom: "-4px",
    borderRadius: "50%",
    border: "2px solid red",
    boxSizing: "border-box",
  };

  return (
    <>
      <AuthenticatedNavbar />
      <Container className="border border-danger">
        <Row className="border border-success mt-5">
          <Col
            sm={12}
            md={4}
            className="border border-primary d-flex flex-row flex-wrap justify-between p-5"
          >
            <Image
              src={nike1}
              width="200%"
              height="200%"
              alt="Nike 1"
              className="my-2"
            />
          </Col>

          <Col md={8} className="border border-success">
            <div className="mx-4">
              <h1 className="text-2xl fw-bold mb-2">
                Corduroy Dual Chest Pockets
              </h1>
              <h6 className="text-muted">Nike</h6>
              <Image src={bintang} alt="bintang" className="my-1" />
              <h6 className="text-muted mt-3 mb-1">Price</h6>
              <h1 className="text-3xl fw-bold mb-2">$ 20.0</h1>
            </div>

            <div className="mx-4">
              <h6 className="mt-3">Color</h6>
              <div className="w-75 d-flex">
                <div
                  style={
                    selectedColor === "#FF0000"
                      ? { ...buttonStyle("#FF0000"), position: "relative" }
                      : buttonStyle("#FF0000")
                  }
                  onClick={() => handleColorSelect("#FF0000")}
                >
                  {selectedColor === "#FF0000" && (
                    <span style={activeBorderStyle}></span>
                  )}
                </div>
                <div
                  style={
                    selectedColor === "#0000FF"
                      ? { ...buttonStyle("#0000FF"), position: "relative" }
                      : buttonStyle("#0000FF")
                  }
                  onClick={() => handleColorSelect("#0000FF")}
                >
                  {selectedColor === "#0000FF" && (
                    <span style={activeBorderStyle}></span>
                  )}
                </div>
                <div
                  style={
                    selectedColor === "#000000"
                      ? { ...buttonStyle("#000000"), position: "relative" }
                      : buttonStyle("#000000")
                  }
                  onClick={() => handleColorSelect("#000000")}
                >
                  {selectedColor === "#000000" && (
                    <span style={activeBorderStyle}></span>
                  )}
                </div>
                <div
                  style={
                    selectedColor === "#008000"
                      ? { ...buttonStyle("#008000"), position: "relative" }
                      : buttonStyle("#008000")
                  }
                  onClick={() => handleColorSelect("#008000")}
                >
                  {selectedColor === "#008000" && (
                    <span style={activeBorderStyle}></span>
                  )}
                </div>
              </div>
            </div>

            <div
              className="mx-4 d-flex justify-content-between align-items-center "
              style={{ width: "310px" }}
            >
              <div className="">
                <h6 className="mt-3 fw-bold">Amount</h6>
                <div
                  className="input-group wrapInput"
                  style={{ width: "130px" }}
                >
                  <IconButton
                    aria-label="Decrement"
                    onClick={handleDecrement}
                    style={{
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      backgroundColor: "#d4d4d4",
                      color: "white",
                    }}
                  >
                    <Remove />
                  </IconButton>
                  <input
                    className="input text-center"
                    type="text"
                    readOnly
                    value={value}
                    style={{ width: "40px" }}
                  />
                  <IconButton
                    aria-label="Increment"
                    onClick={handleIncrement}
                    style={{
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      fontSize: "12px",
                    }}
                  >
                    <Add />
                  </IconButton>
                </div>
              </div>

              <div className="ms-5  ">
                <h6 className="mt-3 ms-1 fw-bold ">Size</h6>
                <div
                  className="input-group wrapInput "
                  style={{ width: "130px" }}
                >
                  <IconButton
                    aria-label="Decrement"
                    onClick={handleSizeDecrement}
                    style={{
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      backgroundColor: "#d4d4d4",
                      color: "white",
                    }}
                  >
                    <Remove />
                  </IconButton>
                  <input
                    className="input text-center"
                    type="text"
                    readOnly
                    value={size}
                    style={{ width: "40px" }}
                  />
                  <IconButton
                    aria-label="Increment"
                    onClick={handleSizeIncrement}
                    style={{
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      fontSize: "12px",
                    }}
                  >
                    <Add />
                  </IconButton>
                </div>
              </div>
            </div>

            <div className="d-flex my-4 align-items-center border ">
              <div
                className="mx-4   d-flex justify-content-between  "
                style={{ width: "310px" }}
              >
                <Button variant="outlined" className="rounded-5"  style={{ width: "130px" }}>
                  Chat
                </Button>
                <Button variant="outlined" className="rounded-5"  style={{ width: "130px" }}>
                  Add Bag
                </Button>
              </div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#DB3022",
                  color: "white",
                  width: "50%", // Set the width to 310px
                  "&:hover": {
                    backgroundColor: "#E94B32", // Change background color on hover
                  },
                }}
                className="text-center rounded-5  mx-4 "
              >
                Buy Now
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mt-1 border border-danger">
          <h1 className="fw-bold">Informasi Produk</h1>
          <h3 className="fw-bold mt-4">Condition</h3>
          <h3 className="text-red-600">New</h3>
          <h3 className="fw-bold mt-2">Description</h3>
          <p className="text-muted mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            fugit sapiente culpa perferendis explicabo laudantium at, suscipit
            similique necessitatibus error.
          </p>
        </Row>
        <Popular />
      </Container>
    </>
  );
};

export default ProductDetail;
