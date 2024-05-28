import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import LoginFace from "@/assets/Images/LoginFace.png";
import MyAccount from "@/components/Profile/MyAccount";
import ShippingAddress from "@/components/Profile/ShippingAddress";
import MyOrder from "@/components/Profile/MyOrder";
import PlaceIcon from '@mui/icons-material/Place';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';

const ProfileCustomer = () => {
  const [activeNav, setActiveNav] = useState("myAccount");

  const handleNavClick = (nav) => {
    setActiveNav(nav);
  };

  return (
    <>
      <Container fluid className="border border-danger profile-container">
        <Row>
          <Col
            xs={12}
            sm={3}
            className="border border-success profile-nav-container"
          >
            <div
              className="border border-primary mt-2 profile-nav-item"
              style={{ marginLeft: "20%" }}
            >
              <div className="d-flex ">
                <Image src={LoginFace} alt="LoginFace" width={50} height={50} />
                <div className="ms-2">
                  <h3 className="fw-bold text-sm">Johanes Mikael</h3>
                  <h3 className="text-xs">Ubah Profile</h3>
                </div>
              </div>
              <div className="d-flex align-items-center mt-3 profile-nav-link">
                <div className="flex items-center">
                  <PersonIcon style={{ backgroundColor: "#456BF3", borderRadius: "50%", padding: "5px", color: "white" }} />
                  <h6
                    className={`fw-bold text-sm ml-3 my-1 ${
                      activeNav === "myAccount" ? "active" : ""
                    }`}
                    onClick={() => handleNavClick("myAccount")}
                  >
                    My Account
                  </h6>
                </div>
              </div>
              <div className="d-flex align-items-center mt-3 profile-nav-link">
                <div className="flex items-center" >
                  <PlaceIcon style={{ backgroundColor: "#F36F45", borderRadius: "50%", padding: "5px", color: "white" }} />
                  <h6
                    className={`fw-bold text-sm ml-3 my-1 ${
                      activeNav === "shippingAddress" ? "active" : ""
                    }`}
                    onClick={() => handleNavClick("shippingAddress")}
                  >
                    Shipping Address
                  </h6>
                </div>
              </div>
              <div className="d-flex align-items-center mt-3 profile-nav-link">
                <div className="flex items-center">
                  <AssignmentIcon style={{ backgroundColor: "#F3456F", borderRadius: "50%", padding: "5px", color: "white" }} />
                  <h6
                    className={`fw-bold text-sm ml-3 my-1 ${
                      activeNav === "myOrder" ? "active" : ""
                    }`}
                    onClick={() => handleNavClick("myOrder")}
                  >
                    My Order
                  </h6>
                </div>
              </div>
            </div>
          </Col>
          <Col
            xs={12}
            sm={9}
            className="border border-danger vh-100 profile-content-container"
          >
            {activeNav === "myAccount" && <MyAccount />}
            {activeNav === "shippingAddress" && <ShippingAddress />}
            {activeNav === "myOrder" && <MyOrder />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileCustomer;
