import React, { useState } from "react";
import { useRouter } from "next/router";
import AuthenticatedNavbar from "@/components/Navbar/AuthenticatedNavbar";
import { Col, Container, Row } from "react-bootstrap";
import Button from "@mui/material/Button";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { cart, setCart, setItemsForCheckout } = useCart(); // Pastikan setItemsForCheckout tersedia
  const [selectedItems, setSelectedItems] = useState([]);
  const router = useRouter();

  const handleDecrement = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const handleIncrement = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleSelectItem = (index) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const handleDeleteSelected = () => {
    const updatedCart = cart.filter(
      (item, index) => !selectedItems.includes(index)
    );
    setCart(updatedCart);
    setSelectedItems([]);
  };

  const handleBuySelected = () => {
    const itemsToCheckout = cart.filter((_, index) => selectedItems.includes(index));
    setItemsForCheckout(itemsToCheckout);
    router.push("/checkout"); // Arahkan ke halaman checkout
  };

  return (
    <>
      <AuthenticatedNavbar />
      <Container>
        <Row>
          <h1 className="fw-bold text-4xl">My Bag</h1>
          <Col xs={12} md={8}>
            <div
              id="axios"
              className="d-flex align-items-center shadow-sm mt-3 rounded-3 p-3"
              style={{ border: "0.5px solid #ccc" }}
            >
              <Checkbox
                indeterminate={
                  selectedItems.length > 0 && selectedItems.length < cart.length
                }
                checked={
                  cart.length > 0 && selectedItems.length === cart.length
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedItems(cart.map((_, index) => index));
                  } else {
                    setSelectedItems([]);
                  }
                }}
                sx={{
                  color: "#db3022",
                  "&.Mui-checked": {
                    color: "#db3022",
                  },
                }}
              />
              <h6 className="text-sm d-inline-block fw-bold my-3">
                Select All Items{" "}
                <span className="text-muted">
                  ({selectedItems.length} item(s) selected)
                </span>
              </h6>
              <Button
                variant="text"
                sx={{ textTransform: "capitalize" }}
                className="text-red-600 d-inline-block fw-bold ms-auto me-3"
                onClick={handleDeleteSelected}
              >
                Delete
              </Button>
            </div>

            {cart.map((item, index) => (
              <div
                key={index}
                className="d-flex shadow-sm mt-3 align-items-center rounded-3 p-3 flex-wrap"
                style={{ border: "0.5px solid #ccc" }}
              >
                <Checkbox
                  checked={selectedItems.includes(index)}
                  onChange={() => handleSelectItem(index)}
                  sx={{
                    color: "#db3022",
                    "&.Mui-checked": {
                      color: "#db3022",
                    },
                  }}
                />
                <Image
                  style={{ height: "70px", width: "70px" }}
                  width={70}
                  height={70}
                  src={item.imageUrl}
                  alt={item.name}
                  className="my-3"
                />

                <div className="ms-3" style={{ flex: 1, minWidth: "200px" }}>
                  <h3 className="fw-bold d-block">{item.name}</h3>
                  <h3 className="text-muted d-block">{item.size}</h3>
                  <h3 className="text-muted d-block">{item.color}</h3>
                </div>

                <div
                  className="input-group wrapInput "
                  style={{ width: "130px" }}
                >
                  <IconButton
                    aria-label="Decrement"
                    onClick={() => handleDecrement(index)}
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
                    value={item.quantity}
                    style={{ width: "40px" }}
                  />
                  <IconButton
                    aria-label="Increment"
                    onClick={() => handleIncrement(index)}
                    style={{
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      fontSize: "12px",
                    }}
                  >
                    <Add />
                  </IconButton>
                </div>

                <div className="flex flex-column "
                style={{ width: "120px", minWidth: "80px" }}>
                  <h3 className="ms-auto  fw-bold d-block">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(parseFloat(item.price))}
                  </h3>

                  <p
                    className="text-red-600 text-xs fw-bold ms-auto "
                    style={{ position: "relative", bottom: "0", right: "0" }}
                  >
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(parseFloat(item.price * item.quantity))}
                  </p>
                </div>
              </div>
            ))}
          </Col>
          <Col xs={12} md={4}>
            <div
              id="alexa"
              className="shadow-sm mt-3 rounded-3 p-3"
              style={{ border: "0.5px solid #ccc" }}
            >
              <h6 className="d-inline-block fw-bold my-3 px-3">
                Shopping Summary{" "}
              </h6>
              <div className="d-flex justify-between">
                <h6 className="text-red-600 px-3 my-3 text-sm fw-bold text-muted">
                  Total Price
                </h6>
                <h6 className="text-red-600 px-3 my-3 text-sm fw-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(
                    cart.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                  )}
                </h6>
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleBuySelected} // Panggil handleBuySelected
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#db3022",
                  "&:hover": {
                    backgroundColor: "#a4261d",
                  },
                }}
              >
                Buy
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
