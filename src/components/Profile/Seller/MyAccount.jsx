import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Image from "next/image";
import LoginFace from "@/assets/Images/LoginFace.png";
import {
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2"; // Import SweetAlert

const MyAccount = () => {
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("id");
        const response = await axios.get(
          `http://localhost:8080/api/v1/sellers/${id}`
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching initial values:", error);
      }
    };
    fetchData();
  }, []);

  const validationSchema = yup.object({
    seller_storename: yup
      .string()
      .required("Please enter your name")
      .min(3, "Name should be of minimum 3 characters length")
      .max(25, "Name should be of maximum 25 characters length"),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Enter a valid email"),
    phone: yup
      .string()
      .required("Please enter your phone number")
      .matches(/^\d+$/, "Phone number should contain only digits")
      .min(10, "Phone number should be of minimum 10 digits length")
      .max(15, "Phone number should be of maximum 15 digits length"),
    seller_description: yup
      .string()
      .required("Please enter your store description")
      .min(10, "Description should be of minimum 10 characters length")
      .max(200, "Description should be of maximum 200 characters length"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      seller_storename: user.seller_storename || "",
      email: user.email || "",
      phone: user.phone || "",
      seller_description: user.seller_description || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const id = localStorage.getItem("id");
      let data;
      let headers;
  
      if (selectedImage) {
        // Use FormData if an image is selected
        data = new FormData();
        data.append("seller_storename", values.seller_storename);
        data.append("email", values.email);
        data.append("phone", values.phone);
        data.append("seller_description", values.seller_description);
        data.append("photo", selectedImage);
        headers = {
          "Content-Type": "multipart/form-data",
        };
      } else {
        // Use JSON if no image is selected
        data = {
          seller_storename: values.seller_storename,
          email: values.email,
          phone: values.phone,
          seller_description: values.seller_description,
        };
        headers = {
          "Content-Type": "application/json",
        };
      }
  
      console.log("Data being sent: ", data); // Log data
  
      try {
        const response = await axios.put(`http://localhost:8080/api/v1/sellers/${id}`, data, {
          headers: headers,
        });
        console.log("Response: ", response); // Log response
        Swal.fire({
          title: "Success!",
          text: "Account updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error updating data:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred during updating",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  

  return (
    <div className="border-1 border-gray-400 rounded-lg p-3">
      <h3 className="fw-bold text-2xl">My Account</h3>
      <p className="text-sm">Manage your account information</p>
      <br />
      <hr />
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col xs={12} sm={9}>
            <div className="flex items-center my-3 p-2">
              <h6 className="text-gray-500 block w-[30%]">Store Name</h6>
              <TextField
                name="seller_storename"
                type="text"
                className="flex-grow"
                placeholder="Johanes Mikael"
                value={formik.values.seller_storename}
                onChange={formik.handleChange}
                fullWidth
                error={
                  formik.touched.seller_storename &&
                  Boolean(formik.errors.seller_storename)
                }
                helperText={
                  formik.touched.seller_storename && formik.errors.seller_storename
                }
              />
            </div>
            <div className="flex items-center my-3 p-2">
              <h6 className="text-gray-500 block w-[30%]">Email</h6>
              <TextField
                name="email"
                type="email"
                className="flex-grow"
                placeholder="johanes@gmail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                fullWidth
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="flex items-center my-3 p-2">
              <h6 className="text-gray-500 block w-[30%]">Phone number</h6>
              <TextField
                name="phone"
                type="text"
                className="flex-grow"
                placeholder="08901289012"
                value={formik.values.phone}
                onChange={formik.handleChange}
                fullWidth
                error={
                  formik.touched.phone &&
                  Boolean(formik.errors.phone)
                }
                helperText={
                  formik.touched.phone && formik.errors.phone
                }
              />
            </div>
            <div className="flex items-center my-3 p-2">
              <h6 className="text-gray-500 block w-[30%]">Store Description</h6>
              <TextField
                name="seller_description"
                type="text"
                className="flex-grow"
                placeholder="Describe your store"
                value={formik.values.seller_description}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
                error={
                  formik.touched.seller_description &&
                  Boolean(formik.errors.seller_description)
                }
                helperText={
                  formik.touched.seller_description && formik.errors.seller_description
                }
              />
            </div>
          </Col>
          <Col
            xs={12}
            sm={3}
            className="d-flex justify-content-center align-items-center flex-column border-l-2 border-gray-700"
          >
            <Image
              src={previewImage || user.photo || LoginFace}
              alt="LoginFace"
              width={80}
              height={80}
              className="rounded-full border"
            />
            <Button
              className="mt-3"
              variant="outlined"
              component="label"
              sx={{
                borderRadius: "15px",
                border: "1px solid #262626",
              }}
            >
              Select Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Col>
        </Row>
        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: "15px",
            border: "1px solid #262626",
            marginTop: "20px",
          }}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default MyAccount;
