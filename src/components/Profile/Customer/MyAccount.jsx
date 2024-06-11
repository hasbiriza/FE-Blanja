import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Image from "next/image";
import LoginFace from "@/assets/Images/LoginFace.png";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Button,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

const MyAccount = () => {
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("id");
        const response = await axios.get(
          `https://be-blanja-productionn.up.railway.app/api/v1/customers/${id}`
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching initial values:", error);
      }
    };
    fetchData();
  }, []);

  const validationSchema = yup.object({
    customer_name: yup
      .string()
      .required("Please enter your name")
      .min(3, "Name should be of minimum 3 characters length")
      .max(25, "Name should be of maximum 25 characters length"),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Enter a valid email"),
    customer_phone: yup
      .string()
      .required("Please enter your phone number")
      .matches(/^\d+$/, "Phone number should contain only digits")
      .min(10, "Phone number should be of minimum 10 digits length")
      .max(15, "Phone number should be of maximum 15 digits length"),
    gender: yup.string().required("Please select your gender"),
    birthday: yup.string().required("Please select your date of birth"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      customer_name: user.customer_name || "",
      email: user.email || "",
      customer_phone: user.customer_phone || "",
      gender: user.gender ? user.gender.toLowerCase() : "",
      birthday: user.birthday || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const id = localStorage.getItem("id");
      let data;
      let headers;

      if (selectedImage) {
        data = new FormData();
        data.append("customer_name", values.customer_name);
        data.append("email", values.email);
        data.append("customer_phone", values.customer_phone);
        data.append("gender", values.gender.toUpperCase());
        data.append("birthday", values.birthday);
        data.append("photo", selectedImage);
        headers = {
          "Content-Type": "multipart/form-data",
        };
      } else {
        data = {
          customer_name: values.customer_name,
          email: values.email,
          customer_phone: values.customer_phone,
          gender: values.gender.toUpperCase(),
          birthday: values.birthday,
        };
        headers = {
          "Content-Type": "application/json",
        };
      }

      console.log("Data being sent: ", data);

      try {
        const response = await axios.put(`https://be-blanja-productionn.up.railway.app/api/v1/customers/${id}`, data, {
          headers: headers,
        });
        console.log("Response: ", response);
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
              <h6 className="text-gray-500 block w-[30%]">Name</h6>
              <TextField
                name="customer_name"
                type="text"
                className="flex-grow"
                placeholder="Johanes Mikael"
                value={formik.values.customer_name}
                onChange={formik.handleChange}
                fullWidth
                error={formik.touched.customer_name && Boolean(formik.errors.customer_name)}
                helperText={formik.touched.customer_name && formik.errors.customer_name}
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
                name="customer_phone"
                type="text"
                className="flex-grow"
                placeholder="08901289012"
                value={formik.values.customer_phone}
                onChange={formik.handleChange}
                fullWidth
                error={formik.touched.customer_phone && Boolean(formik.errors.customer_phone)}
                helperText={formik.touched.customer_phone && formik.errors.customer_phone}
              />
            </div>
            <div className="flex items-center my-3 p-2">
              <h6 className="text-gray-500 inline-block w-[23%]">Gender</h6>
              <FormControl component="fieldset" sx={{ flexGrow: 1 }} className="border">
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  sx={{ display: "flex", justifyContent: "space-around" }}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="flex items-center my-3 p-2">
              <h6 className="text-gray-500 block w-[30%]">Date of Birth</h6>
              <TextField
                name="birthday"
                type="date"
                className="flex-grow"
                value={formik.values.birthday}
                onChange={formik.handleChange}
                fullWidth
                error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                helperText={formik.touched.birthday && formik.errors.birthday}
              />
            </div>
          </Col>
          <Col xs={12} sm={3} className="d-flex justify-content-center align-items-center flex-column border-l-2 border-gray-700">
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
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
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
