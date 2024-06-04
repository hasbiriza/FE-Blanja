import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import LoginFace from "@/assets/Images/LoginFace.png";
import MyAccount from "@/components/Profile/Seller/MyAccount";
import ShippingAddress from "@/components/Profile/Seller/ShippingAddress";
import ShippingAddress2 from "@/components/Profile/Seller/ShippingAddress2";
import MyOrder from "@/components/Profile/Seller/MyOrder";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";

const ProfileCustomer = () => {
  const [activeNav, setActiveNav] = useState("myAccount");
  const [sellers, setSellers] = useState({});
  const id = localStorage.getItem("id");
  const [showShippingAddressDropdown, setShowShippingAddressDropdown] =
    useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/sellers/${id}`)
      .then((res) => {
        const customer = res.data.data;
        setSellers(customer);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  });

  const handleNavClick = (nav) => {
    setActiveNav(nav);
    if (nav === "shippingAddress") {
      setShowShippingAddressDropdown(!showShippingAddressDropdown);
    } else {
      setShowShippingAddressDropdown(false);
    }
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
                <Image
                  src={sellers.photo || LoginFace}
                  alt="LoginFace"
                  width={50}
                  height={50}
                  className="rounded-full border"
                />
                <div className="ms-2">
                  <h3 className="fw-bold text-sm">{sellers.seller_name}</h3>
                  <h3 className="text-xs">Ubah Profile</h3>
                </div>
              </div>
              <div className="d-flex align-items-center mt-3 profile-nav-link">
                <div className="flex items-center">
                  <PersonIcon
                    style={{
                      backgroundColor: "#456BF3",
                      borderRadius: "50%",
                      padding: "5px",
                      color: "white",
                    }}
                  />
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
              <div
                className="d-flex align-items-center mt-3 profile-nav-link"
                onClick={() => handleNavClick("shippingAddress")}
              >
                <div className="flex items-center">
                  <ProductionQuantityLimitsIcon
                    style={{
                      backgroundColor: "#F36F45",
                      borderRadius: "50%",
                      padding: "5px",
                      color: "white",
                    }}
                  />
                  <h6
                    className={`fw-bold text-sm ml-3 my-1 ${
                      activeNav.startsWith("shippingAddress") ? "active" : ""
                    }`}
                  >
                    Product
                  </h6>
                  <KeyboardArrowDownIcon /> {/* Add the dropdown icon here */}
                </div>
              </div>
              {showShippingAddressDropdown && (
                <div className="pl-4 mt-2">
                  <div
                    className={`d-flex align-items-center mt-2 profile-nav-link ${
                      activeNav === "shippingAddress1" ? "active" : ""
                    }`}
                    onClick={() => handleNavClick("shippingAddress1")}
                  >
                    <h6 className="fw-bold text-sm ml-3 my-1">
                      MyProduct
                    </h6>
                  </div>
                  <div
                    className={`d-flex align-items-center mt-2 profile-nav-link ${
                      activeNav === "shippingAddress2" ? "active" : ""
                    }`}
                    onClick={() => handleNavClick("shippingAddress2")}
                  >
                    <h6 className="fw-bold text-sm ml-3 my-1">
                      Selling Product
                    </h6>
                  </div>
                </div>
              )}

              <div className="d-flex align-items-center mt-3 profile-nav-link">
                <div className="flex items-center">
                  <AssignmentIcon
                    style={{
                      backgroundColor: "#F3456F",
                      borderRadius: "50%",
                      padding: "5px",
                      color: "white",
                    }}
                  />
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
            {activeNav === "shippingAddress1" && <ShippingAddress />}
            {activeNav === "shippingAddress2" && <ShippingAddress2 />}
            {activeNav === "myOrder" && <MyOrder />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileCustomer;
