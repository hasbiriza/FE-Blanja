import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import nike1 from "@/assets/Images/nike1.png";
import nike2 from "@/assets/Images/nike2.png";
import nike3 from "@/assets/Images/nike3.png";
import nike4 from "@/assets/Images/nike4.png";
import Image from "next/image";
import bintang from "@/assets/Images/bintang.png";
import Popular from "@/components/LandingPage/Popular";
import AuthenticatedNavbar from "@/components/Navbar/AuthenticatedNavbar";

const ProductDetail = () => {


const [amount,setAmount] = useState(0);
const handleTambah =() =>{
  setAmount(amount+1) 
}
const handleKurang =() =>{
  setAmount(amount-1)
}


  return (
    <>    <AuthenticatedNavbar/>
    <Container className="border border-danger">
      <Row className="border border-succes my-5">
        <Col
          sm={12}
          md={4}
          className="border border-danger d-flex flex-row flex-wrap justify-between p-5"
        >
          <Image
            src={nike1}
            width="200%"
            height="200%"
            alt="Nike 1"
            className="my-2"
          />
          {/* <Image src={nike2} width="100%" height="200px" alt="Nike 2" className='my-2 img-fluid ' />
                <Image src={nike3} width="100%" height="200px" alt="Nike 3" className=' img-fluid ' />
                <Image src={nike4} width="100%" height="200px" alt="Nike 4" className=' img-fluid '/> */}
        </Col>

        <Col md={8} className="border border-danger">
          <div className="mx-4">
            <h1 className=" text-2xl fw-bold mb-2">
              Corduroy Dual Chest Pockets
            </h1>
            <h6 className="text-muted">Nike</h6>
            <Image src={bintang} alt="bintang" className="my-1" />
            <h6 className="text-muted mt-3 mb-1">Price</h6>
            <h1 className=" text-3xl fw-bold mb-2">$ 20.0</h1>
          </div>

          <div className="mx-4">
            {" "}
            <h6 className=" mt-3 ">Color</h6>{" "}
            <div className=" w-75 border border-danger d-flex justify-content-between ">
              <Button>Merah</Button>
              <Button>Merah</Button>
              <Button>Merah</Button>
              <Button>Merah</Button>
            </div>
          </div>
          <div className="mx-4">
            {" "}
            <h6 className=" mt-3 ">Size</h6>{" "}
            <div className=" w-75 border border-danger d-flex justify-content-between ">
              <Button>Merah</Button>
              <Button>Merah</Button>
              <Button>Merah</Button>
              <Button>Merah</Button>
            </div>
          </div>

          <div className="mx-4 ">
            {" "}
            <h6 className=" mt-3 ">Amount</h6>{" "}
            <div className=" w-50 border border-danger d-flex justify-content-between mb-3">
              <Button onClick={handleKurang}>-</Button>
              <input
                type="text"
                readOnly
                className="text-center"
                placeholder="0"
                value={amount}
              />
              <Button onClick={handleTambah}>+</Button>
            </div>
            <div className=" w-50 border border-danger d-flex justify-content-between mb-3">
              <Button>Chat</Button>
              <Button>Add Bag</Button>
            </div>
            <Button>Buy Now</Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-1 border border-danger">
        <h1 className="fw-bold">Informasi Produk</h1>
        <h3 className="fw-bold mt-4">Condition</h3>
        <h3 className=" text-red-600">New</h3>
        <h3 className="fw-bold mt-2">Description</h3>
        <p className="text-muted mt-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          fugit sapiente culpa perferendis explicabo laudantium at, suscipit
          similique necessitatibus error.
        </p>
      </Row>
      <Popular/>
    </Container>
    </>

  );
};

export default ProductDetail;
