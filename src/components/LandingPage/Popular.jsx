import CardSuit from "@/assets/Images/cardsuit.png";
import Image from "next/image";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import fivestars from "@/assets/Images/5stars.png"

const Popular = () => {
  return (
    <>
      <div className="ms-3 mt-5">
        <h1 className="m-0">Popular</h1>{" "}
        <p className="text-muted ">Find Clothes that are trending recently </p>
      </div>
      <div className="d-flex flex-wrap ms-3">
        {[...Array(20)].map((_, i) => (
          <Card
            key={i}
            style={{ width: "14.97rem" }}
            className="w-20 me-3 mb-4 border border-danger"
          >
            <Card.Img as={Image} variant="top" src={CardSuit} />
            <Card.Body>
              <Card.Title>Men`s Formal Suit Black & White</Card.Title>
              <h5 className="text-danger mt-2">Rp.200.000</h5>
              <Card.Text className="text-muted mb-0 mt-3">Zalora Cloth</Card.Text>
              <Image src={fivestars} alt="bintanglima" className="border border-danger mt-0 p-0"/>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Popular;
