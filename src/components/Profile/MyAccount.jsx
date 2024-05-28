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
import Swal from "sweetalert2"; // Import SweetAlert

const MyAccount = () => {
  const [initialValues, setInitialValues] = useState({
    customer_name: "",
    email: "",
    customer_phone: "",
    gender: "",
    birthday: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("id");
        const response = await axios.get(
          `http://localhost:8080/api/v1/customers/${id}`
        );
        const { customer_name, email, customer_phone, gender, birthday } =
          response.data.data;
        setInitialValues({
          customer_name,
          email,
          customer_phone,
          gender: gender.toLowerCase(), // Ensure gender is lowercase
          birthday,
        });
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
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const id = localStorage.getItem("id");
      try {
        await axios.put(`http://localhost:8080/api/v1/customers/${id}`, {
          ...values,
          gender: values.gender.toUpperCase(), // Ensure gender is uppercase
        });
        // Use SweetAlert for a successful submission
        Swal.fire({
          title: "Success!",
          text: "Account updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Reload the page after the alert is closed
          window.location.reload();
        });
      } catch (error) {
        console.error("Error updating data:", error);
        // Use SweetAlert for an error during submission
        Swal.fire({
          title: "Error!",
          text: "An error occurred during updating",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  return (
    <div className="border-1 border-gray-400 rounded-lg p-3">
      <h3 className="fw-bold text-2xl">My Account</h3>
      <p className="text-sm">Manage your account information</p>
      <br />
      <hr />
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col xs={12} sm={9}>
            <div className="flex items-center  my-3 p-2">
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
            <div className="flex items-center  my-3 p-2">
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
            <div className="flex items-center  my-3 p-2">
              <h6 className="text-gray-500 block w-[30%] ">
                Phone number
              </h6>
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
            <div className="flex items-center  my-3 p-2">
              <h6 className="text-gray-500 inline-block w-[23%] border">
                Gender
              </h6>
              <FormControl
                component="fieldset"
                sx={{ flexGrow: 1 }}
                className="border border-primary"
              >
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  sx={{ display: "flex", justifyContent: "space-around" }}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="flex items-center  my-3 p-2">
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
          <Col
            xs={12}
            sm={3}
            className="d-flex justify-content-center align-items-center flex-column border-l-2 border-gray-700"
          >
            <Image src={LoginFace} alt="LoginFace" width={100} height={100} />
            <Button
              className="mt-3"
              variant="outlined"
              sx={{
                borderRadius: "15px",
                border: "1px solid #262626",
              }}
            >
              Select Image
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
