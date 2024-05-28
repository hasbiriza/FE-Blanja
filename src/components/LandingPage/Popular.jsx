import Image from "next/image";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import fivestars from "@/assets/Images/5stars.png";
import CardSuit from "@/assets/Images/cardsuit.png";
import { Col } from "react-bootstrap";
import Link from "next/link";

const Cards = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/products")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("There Was An Error When Getting API", error);
      });
  }, []);

  // Helper function to check if URL is valid and not example.com
  const isValidImageUrl = (url) => {
    try {
      const { hostname } = new URL(url);
      return hostname !== "example.com";
    } catch (e) {
      return false;
    }
  };

  return (
    <>
      <div className="mt-5">
        <h1 className="m-0 text-2xl font-bold">Popular</h1>
        <p className="text-muted">Find Clothes that are trending recently</p>
      </div>
      <div className="d-flex flex-wrap ">
        {products.map((product, i) => (
          <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4 ">
            <Link href={`/detailProduct/${product.ID}`}>
              <Card style={{border:'1px solid '}} className="mx-2">
                <Card.Img
                  as={Image}
                  variant="top"
                  src={
                    isValidImageUrl(product.product_photo)
                      ? product.product_photo
                      : CardSuit
                  }
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
                  width={236}
                  height={136}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <h5 className="text-danger mt-2">
                    Rp {parseInt(product.price).toLocaleString("id-ID")}
                  </h5>
                  <Card.Text className="text-muted mb-0 mt-3">
                    Zalora Cloth
                  </Card.Text>
                  <Image
                    src={fivestars}
                    alt="bintang lima"
                    className=" mt-0 p-0"
                  />
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </div>
    </>
  );
};

export default Cards;


