import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "@mui/material/Button";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import AuthenticatedNavbar from "@/components/Navbar/AuthenticatedNavbar";
import Popular from "@/components/LandingPage/Popular";
import nike1 from "@/assets/Images/nike1.png";
import bintang from "@/assets/Images/bintang.png";

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];
const PRODUCT = {
  name: "Corduroy Dual Chest Pockets",
  brand: "Nike",
  price: "$ 20.0",
  colors: ["#FF0000", "#0000FF", "#000000", "#008000"],
  category: "clothing",
  imageUrl: nike1,
  condition: "New",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias fugit sapiente culpa perferendis explicabo laudantium at, suscipit similique necessitatibus error.",
};

const ProductDetail = ({ products }) => {
  const [value, setValue] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [size, setSize] = useState(
    PRODUCT.category === "Shoes" || PRODUCT.category === "Socks" ? 37 : "S"
  );

  const handleDecrement = () => {
    if (value > 1) setValue(value - 1);
  };

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleSizeDecrement = () => {
    if (PRODUCT.category === "shoes" || PRODUCT.category === "socks") {
      if (size > 37) setSize(size - 1);
    } else {
      const currentIndex = SIZE_OPTIONS.indexOf(size);
      if (currentIndex > 0) {
        setSize(SIZE_OPTIONS[currentIndex - 1]);
      }
    }
  };

  const handleSizeIncrement = () => {
    if (PRODUCT.category === "shoes" || PRODUCT.category === "socks") {
      if (size < 46) setSize(size + 1);
    } else {
      const currentIndex = SIZE_OPTIONS.indexOf(size);
      if (currentIndex < SIZE_OPTIONS.length - 1) {
        setSize(SIZE_OPTIONS[currentIndex + 1]);
      }
    }
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
      <Container className="border mt-5">
        <Row className="border">
          <Col
            sm={12}
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Image
              src={PRODUCT.imageUrl}
              width="100%"
              height="auto"
              alt={PRODUCT.name}
              className="my-2"
            />
          </Col>

          <Col md={8} className="px-4">
            <div>
              <h1 className="text-2xl fw-bold mb-2">{products.name}</h1>
              <h6 className="text-muted">{PRODUCT.brand}</h6>
              <Image src={bintang} alt="bintang" className="my-1" />
              <h6 className="text-muted mt-3 mb-1">Price</h6>
              <h1 className="text-3xl fw-bold mb-2">{PRODUCT.price}</h1>
            </div>

            <div>
              <h6 className="mt-3">Color</h6>
              <div className="d-flex flex-wrap">
                {PRODUCT.colors.map((color) => (
                  <div
                    key={color}
                    style={
                      selectedColor === color
                        ? { ...buttonStyle(color), position: "relative" }
                        : buttonStyle(color)
                    }
                    onClick={() => handleColorSelect(color)}
                  >
                    {selectedColor === color && (
                      <span style={activeBorderStyle}></span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex  align-items-center my-4">
              <div>
                <h6 className="fw-bold mb-1">Amount</h6>
                <div className="input-group" style={{ width: "130px" }}>
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

              <div className="ms-4 ">
                <h6 className="fw-bold mb-1">Size</h6>
                <div className="input-group  " style={{ width: "130px" }}>
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

            <div className="d-flex flex-wrap justify-content-between align-items-center my-4">
              <Button
                variant="outlined"
                className="rounded-5"
                style={{
                  flex: "1 1 130px",
                  minWidth: "130px",
                  margin: "5px",
                }}
              >
                Chat
              </Button>
              <Button
                variant="outlined"
                className="rounded-5"
                style={{
                  flex: "1 1 130px",
                  minWidth: "130px",
                  margin: "5px",
                }}
              >
                Add Bag
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#DB3022",
                  color: "white",
                  flex: "2 1 calc(100% - 270px)",
                  minWidth: "calc(100% - 270px)",
                  margin: "5px",
                  "&:hover": {
                    backgroundColor: "#E94B32",
                  },
                }}
                className="rounded-5"
              >
                Buy Now
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mt-3">
          <h1 className="fw-bold">Informasi Produk</h1>
          <h3 className="fw-bold mt-4">Condition</h3>
          <h3 className="text-red-600">{PRODUCT.condition}</h3>
          <h3 className="fw-bold mt-2">Description</h3>
          <p className="text-muted mt-1">{PRODUCT.description}</p>
        </Row>
        <Popular />
      </Container>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  let products = {};

  try {
    const productResponse = await axios.get(
      `http://localhost:8080/api/v1/products/2`
    );
    products = productResponse.data.data;
    console.log(products)
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: { products },
  };
};

export default ProductDetail;
