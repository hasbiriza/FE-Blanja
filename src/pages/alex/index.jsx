import React, { useState, useEffect } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import AuthenticatedNavbar from "@/components/Navbar/AuthenticatedNavbar";

const SIZE_OPTIONS = ["S", "M", "L", "XL", "XXL"];

const ProductDetail = () => {
  // Data dummy
  const product = {
    id: 1,
    name: "Corduroy Dual Chest Pockets",
    brand: "Nike",
    image: "/path/to/image.jpg", // Update with a valid image path
    colors: ["#FF0000", "#0000FF", "#000000", "#008000"],
    category_name: "clothing", // Category other than shoes or socks
  };

  const [value, setValue] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [size, setSize] = useState("M"); // Default size for non-shoes/socks

  const handleDecrement = () => {
    if (value > 1) setValue(value - 1);
  };

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleSizeDecrement = () => {
    if (
      product.category_name === "shoes" ||
      product.category_name === "socks"
    ) {
      if (size > 37) setSize(size - 1);
    } else {
      const currentIndex = SIZE_OPTIONS.indexOf(size);
      if (currentIndex > 0) setSize(SIZE_OPTIONS[currentIndex - 1]);
    }
  };

  const handleSizeIncrement = () => {
    if (
      product.category_name === "shoes" ||
      product.category_name === "socks"
    ) {
      if (size < 46) setSize(size + 1);
    } else {
      const currentIndex = SIZE_OPTIONS.indexOf(size);
      if (currentIndex < SIZE_OPTIONS.length - 1)
        setSize(SIZE_OPTIONS[currentIndex + 1]);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <>
      <AuthenticatedNavbar />
      <div>
        <Image src={product.image} width={300} height={300} alt="Product" />
        <h1>{product.name}</h1>
        <h6>{product.brand}</h6>
        {/* Render color selection buttons */}
        <div>
          {product.colors.map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: color,
                width: 30,
                height: 30,
                borderRadius: "50%",
                display: "inline-block",
                margin: 5,
                cursor: "pointer",
              }}
              onClick={() => handleColorSelect(color)}
            ></div>
          ))}
        </div>
        <div
          className="mx-4 d-flex justify-content-between align-items-center"
          style={{ width: "310px" }}
        >
          <div className="">
            <h6 className="mt-3 fw-bold mb-1">Amount</h6>
            <div className="input-group wrapInput" style={{ width: "130px" }}>
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

          <div className="ms-5">
            <h6 className="mt-3 ms-1 fw-bold mb-1">Size</h6>
            <div className="input-group wrapInput" style={{ width: "130px" }}>
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
        <div>
          <Button variant="outlined">Chat</Button>
          <Button variant="outlined">Add Bag</Button>
          <Button variant="contained">Buy Now</Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
