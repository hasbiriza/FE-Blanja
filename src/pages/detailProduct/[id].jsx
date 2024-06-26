import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "@mui/material/Button";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import AuthenticatedNavbar from "@/components/Navbar/AuthenticatedNavbar";
import Popular from "@/components/LandingPage/Popular";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import bintang from "@/assets/Images/bintang.png";
import Swal from "sweetalert2"; 

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];
const COLOR_MAP = {
  Hitam: "#000000",
  Putih: "#FFFFFF",
  Cokelat: "#A52A2A",
  Kuning: "#FFFF00",
  Hijau: "#008000",
  Merah: "#FF0000",
  Biru: "#0000FF",
  "Abu-abu": "#808080",
  Ungu: "#800080",
  Oranye: "#FFA500",
};

const parseColors = (colorString) => {
  return colorString.split(",").map((color) => color.trim());
};

const ProductDetail = ({ id }) => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState({});
  const [value, setValue] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [size, setSize] = useState("S");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://be-blanja-productionn.up.railway.app/api/v1/products/${id}`
        );
        const productData = response.data.data;
        productData.colors = parseColors(productData.color);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (
      product.Category?.category_name === "Shoes" ||
      product.Category?.category_name === "Socks"
    ) {
      setSize(42);
    } else {
      setSize("M");
    }
  }, [product]);

  const handleDecrement = () => {
    if (value > 1) setValue(value - 1);
  };

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleSizeDecrement = () => {
    if (
      product.Category?.category_name === "Shoes" ||
      product.Category?.category_name === "socks"
    ) {
      if (size > 37) setSize(size - 1);
    } else {
      const currentIndex = SIZE_OPTIONS.indexOf(size);
      if (currentIndex > 0) {
        setSize(SIZE_OPTIONS[currentIndex - 1]);
      }
    }
  };

  const handleSizeIncrement = () => {
    if (
      product.Category?.category_name === "Shoes" ||
      product.Category?.category_name === "socks"
    ) {
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

  const handleAddToBag = () => {
    
    if (!selectedColor) {
      setError("Please select a color.");
      return;
    }
    if (!size) {
      setError("Please select a size.");
      return;
    }

    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: size,
      quantity: value,
      imageUrl: product.product_photo,
      description: product.product_description,
      storeName: product.Seller?.seller_storename,
    };

    addToCart(cartItem);
    Swal.fire({
      icon: "success",
      title: "Add to cart successful!",
      showConfirmButton: false,
      timer: 1500, // Durasi notifikasi (dalam milidetik)
    });
    setError("");
  };

  const buttonStyle = (color) => ({
    backgroundColor: COLOR_MAP[color] || color,
    color: "white",
    borderRadius: "50%",
    padding: "8px",
    minWidth: "30px",
    minHeight: "30px",
    margin: "5px",
    position: "relative",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
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
              src={product.product_photo}
              alt={product.name}
              className="my-2"
              layout="responsive"
              width={150}
              height={200}
            />
          </Col>

          <Col md={8} className="px-4">
            <div>
              <h1 className="text-2xl fw-bold mb-2">{product.name}</h1>
              <h6 className="text-muted">{product.Seller?.seller_storename}</h6>
              <Image src={bintang} alt="bintang" className="my-1" />
              <h6 className="text-muted mt-3 mb-1">Price</h6>
              <h1 className="text-3xl fw-bold mb-2">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(parseFloat(product.price))}
              </h1>
            </div>

            <div>
              <h6 className="mt-3">Color</h6>
              <div className="d-flex flex-wrap">
                {product.colors &&
                  product.colors.map((color) => (
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

              <div className="ms-5">
                <h6 className="fw-bold mb-1">Size</h6>
                <div className="input-group" style={{ width: "130px" }}>
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

            {error && <p className="text-danger">{error}</p>}

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
                onClick={handleAddToBag}
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
          <h3 className="text-red-600">{product.condition}</h3>
          <h3 className="fw-bold mt-2">Description</h3>
          <p className="text-muted mt-1">{product.product_description}</p>
        </Row>
        <Popular />
      </Container>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  return {
    props: { id },
  };
}

export default ProductDetail;
