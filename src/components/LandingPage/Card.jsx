import Image from "next/image";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import fivestars from "@/assets/Images/5stars.png";
import CardSuit from "@/assets/Images/cardsuit.png";

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
      <div className="ms-3 mt-5">
        <h1 className="m-0">New</h1>
        <p className="text-muted">You,ve Never Seen it before</p>
      </div>
      <div className="d-flex flex-wrap ms-3">
        {products.map((product, i) => (
          <Card
            key={i}
            style={{ width: "14.97rem" }}
            className="w-20 me-3 mb-4 border border-danger"
          >
            <Card.Img
              as={Image}
              variant="top"
              src={
                isValidImageUrl(product.product_photo)
                  ? product.product_photo
                  : CardSuit
              }
              alt={product.name}
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
                className="border border-danger mt-0 p-0"
              />
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Cards;
