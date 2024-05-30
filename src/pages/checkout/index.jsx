import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import AuthenticatedNavbar from "@/components/Navbar/AuthenticatedNavbar";
import { Col, Container, Row, Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import Image from "next/image";
import axios from "axios";
import { Radio, Box, Typography } from "@mui/material";
import ShippingAddress from "@/components/Profile/ShippingAddress";

const Checkout = () => {
  const { checkoutItems } = useCart();
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [addresses, setAddresses] = useState([]);
  const customerId = localStorage.getItem("id");

  useEffect(() => {
    const deliveryCosts = [8000, 9000, 10000, 11000, 12000];
    setDeliveryCost(
      deliveryCosts[Math.floor(Math.random() * deliveryCosts.length)]
    );

    setPaymentMethods([
      {
        id: 1,
        name: "Credit Card",
        logo: "https://via.placeholder.com/50",
      },
      {
        id: 2,
        name: "PayPal",
        logo: "https://via.placeholder.com/50",
      },
      {
        id: 3,
        name: "Bank Transfer",
        logo: "https://via.placeholder.com/50",
      },
    ]);
  }, []);

  const handleSelectPaymentMethod = (methodId) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleAddresShowModal = () => {
    setShowModal(true);
  };

  const handleAddresCloseModal = () => {
    setShowModal(false);
  };

  const totalProductPrice = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalPrice = totalProductPrice + deliveryCost;

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/addresses"
        );
        const filteredAddresses = response.data.data.filter(
          (address) => address.customer_id == customerId
        );
        setAddresses(filteredAddresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [customerId]);

  return (
    <>
      <AuthenticatedNavbar />
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h1 className="fw-bold text-4xl">Checkout</h1>
            <div className="border">
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#db3022",
                  "&:hover": {
                    backgroundColor: "#a4261d",
                  },
                }}
                onClick={handleAddresShowModal}
              >
                Select Payment
              </Button>
            </div>

            {checkoutItems.length > 0 ? (
              checkoutItems.map((item, index) => (
                <div
                  key={index}
                  className="d-flex shadow-sm mt-3 align-items-center rounded-3 p-3 flex-wrap"
                  style={{ border: "0.5px solid #ccc" }}
                >
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
                    className="input-group wrapInput"
                    style={{ width: "130px" }}
                  >
                    <input
                      className="input text-center"
                      type="text"
                      readOnly
                      value={item.quantity}
                      style={{ width: "40px" }}
                    />
                  </div>
                  <div
                    className="flex flex-column"
                    style={{ width: "120px", minWidth: "80px" }}
                  >
                    <h3 className="ms-auto fw-bold d-block">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(parseFloat(item.price))}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <h3>No items to checkout.</h3>
            )}
          </Col>
          <Col xs={12} md={4}>
            <div
              id="order-summary"
              className="shadow-sm mt-3 rounded-3 p-3"
              style={{ border: "0.5px solid #ccc" }}
            >
              <h6 className="d-inline-block fw-bold my-3 px-3">
                Order Summary
              </h6>
              <div className="d-flex justify-content-between">
                <h6 className="px-3 my-3 text-sm fw-bold text-muted">
                  Total Product Price
                </h6>
                <h6 className="px-3 my-3 text-sm fw-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(totalProductPrice)}
                </h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="px-3 my-3 text-sm fw-bold text-muted">
                  Delivery
                </h6>
                <h6 className="px-3 my-3 text-sm fw-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(deliveryCost)}
                </h6>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h6 className="px-3 my-3 text-sm fw-bold text-muted">
                  Total Price
                </h6>
                <h6 className="px-3 my-3 text-sm fw-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(totalPrice)}
                </h6>
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#db3022",
                  "&:hover": {
                    backgroundColor: "#a4261d",
                  },
                }}
                onClick={handleShowModal}
              >
                Select Payment
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal for Payment Method */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Payment Methods</h5>
          <div className="d-flex flex-column">
            {paymentMethods.map((method) => (
              <div key={method.id} className="d-flex align-items-center my-2">
                <Image
                  src={method.logo}
                  alt={method.name}
                  width={50}
                  height={50}
                />
                <span className="ms-3">{method.name}</span>
                <Radio
                  checked={selectedPaymentMethod === method.id}
                  onChange={() => handleSelectPaymentMethod(method.id)}
                  value={method.id}
                  name="payment-method"
                />
              </div>
            ))}
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseModal}
          >
            Confirm
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Checkout;
