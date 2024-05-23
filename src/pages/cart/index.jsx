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

const Cart = () => {
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
          <h1 className="fw-bold text-4xl">My Bag</h1>
          <Col>
            <div
              id="axios"
              className="d-flex  align-items-center  shadow-sm mt-3 rounded-3"
              style={{ border: "0.5px solid #ccc" }}
            >
              <Checkbox
                defaultChecked
                sx={{
                  color: "#db3022", // Desired red color
                  "&.Mui-checked": {
                    color: "#db3022", // Color remains the same when checked
                  },
                }}
              />
              <h6 className="text-sm d-inline-block fw-bold my-3">
                Select All Items{" "}
                <span className="text-muted">(2 item Selected)</span>
              </h6>
              <Button
                variant="text"
                sx={{ textTransform: "capitalize" }}
                className="text-red-600 d-inline-block fw-bold  ms-auto me-3 "
              >
                Delete
              </Button>
            </div>

            <div
              className="d-flex shadow-sm mt-3  align-items-center rounded-3"
              style={{ border: "0.5px solid #ccc" }}
            >
              <Checkbox
                defaultChecked
                sx={{
                  color: "#db3022", // Desired red color
                  "&.Mui-checked": {
                    color: "#db3022", // Color remains the same when checked
                  },
                }}
              />
              <Image
                style={{ height: "70px", width: "70px" }}
                src={nike1}
                alt="nike1"
                className="my-3"
              />

              <div className="ms-3 " style={{ width: "300px" }}>
                <h3 className="fw-bold d-block">Corduroy Dual Chest Pocket</h3>
                <h3 className="text-muted d-block">M</h3>
                <h3 className="text-muted d-block">Putih</h3>
              </div>

              <div
                className="input-group wrapInput "
                style={{ width: "130px" }}
              >
                <IconButton
                  aria-label="Decrement"
                  onClick={handleDecrement}
                  style={{ borderRadius: "50%", border: "1px solid #ccc", backgroundColor:"#d4d4d4", color:"white" }}

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

              <h3 className="ms-auto me-3 fw-bold d-block">Rp. 150.0000</h3>
            </div>
          </Col>
          <Col>
            <div
              id="alexa"
              className="shadow-sm mt-3 rounded-3  w-50"
              style={{ border: "0.5px solid #ccc", marginLeft: "100px" }}
            >
              <h6 className="d-inline-block fw-bold my-3 px-3 ">
                Shopping Summary{" "}
                <span className="text-muted">(2 item Selected)</span>
              </h6>
              <div className="d-flex justify-between ">
                <h6 className="text-red-600 px-3 my-3 text-sm fw-bold text-muted">
                  Total Price
                </h6>
                <h6 className="text-red-600 px-3 my-3 text-sm fw-bold ">
                  Rp. 150.0000
                </h6>
              </div>
              <div className="d-flex justify-center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#DB3022",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#E94B32", // ubah warna latar belakang saat dihover
                    },
                  }}
                  className="text-center rounded-5 w-75 my-3 border-0"
                >
                  Buy
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
