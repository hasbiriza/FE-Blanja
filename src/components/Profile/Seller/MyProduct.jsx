import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  TextField,
  Box,
  Modal,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

const MyProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const customerId = localStorage.getItem("id");

  const initialValues = {
    address_as: "",
    recipient_name: "",
    recipient_phone: "",
    postal_code: "",
    address: "",
    city: "",
  };

  const validationSchema = yup.object({
    address_as: yup.string().required("Please enter an address label"),
    recipient_name: yup.string().required("Please enter the recipient's name"),
    recipient_phone: yup
      .string()
      .required("Please enter the recipient's phone number")
      .matches(/^\d+$/, "Phone number should contain only digits"),
    postal_code: yup
      .string()
      .required("Please enter the postal code")
      .matches(/^\d+$/, "Postal code should contain only digits"),
    address: yup.string().required("Please enter the address"),
    city: yup.string().required("Please enter the city or subdistrict"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const url = `https://be-blanja-productionn.up.railway.app/api/v1/addresses`;
      const dataToSend = {
        ...values,
        customer_id: parseInt(customerId), // Mengonversi customerId menjadi integer
      };
  
      try {
        console.log("Data being sent:", dataToSend);
        const response = await axios.post(url, dataToSend);
        console.log("Response from server:", response.data);
        setAddresses([...addresses, { ...dataToSend, id: response.data.id }]);
        handleClose();
        Swal.fire({
          title: "Success!",
          text: "Address saved successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error saving address:", error);
        handleClose();
        Swal.fire({
          title: "Error!",
          text: "An error occurred while saving the address",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("https://be-blanja-productionn.up.railway.app/api/v1/addresses");
        const filteredAddresses = response.data.data.filter(address => address.customer_id == customerId);
        setAddresses(filteredAddresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [customerId]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    formik.resetForm();
  };

  const handleDelete = async (index) => {
    const addressId = addresses[index].ID; // Mengambil ID dari alamat yang akan dihapus
    try {
      await axios.delete(`https://be-blanja-productionn.up.railway.app/api/v1/addresses/${addressId}`);
      setAddresses(addresses.filter((address) => address.ID !== addressId)); // Memfilter alamat berdasarkan ID yang tidak sama dengan addressId yang dihapus
      Swal.fire({
        title: "Success!",
        text: "Address deleted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error deleting address:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the address",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  
  
  

  return (
    <Container className="border">
      <Typography variant="h5" component="h3" align="center" gutterBottom>
        Choose another address
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Manage your shipping address
      </Typography>
      <Box
        sx={{
          border: "2px dashed #ddd",
          padding: 2,
          textAlign: "center",
          cursor: "pointer",
          marginY: 3,
        }}
        onClick={handleShow}
      >
        <Typography variant="h6" color="textSecondary">
          Add new address
        </Typography>
      </Box>

      {addresses.map((address, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid red",
            padding: 2,
            marginY: 2,
            position: "relative",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => handleDelete(index)}
          >
            <Delete color="error" />
          </IconButton>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Recipient Name: {address.recipient_name}
          </Typography>
          <Typography variant="body2">
            Address: {address.address}, {address.city}, {address.postal_code}
          </Typography>
          <Typography variant="body2">Phone: {address.recipient_phone}</Typography>
        </Box>
      ))}

      <Modal open={showModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Add new address
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              id="address_as"
              name="address_as"
              label="Save address as (ex: home address, office address)"
              variant="outlined"
              value={formik.values.address_as}
              onChange={formik.handleChange}
              error={formik.touched.address_as && Boolean(formik.errors.address_as)}
              helperText={formik.touched.address_as && formik.errors.address_as}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                id="recipient_name"
                name="recipient_name"
                label="Recipient's name"
                variant="outlined"
                value={formik.values.recipient_name}
                onChange={formik.handleChange}
                error={formik.touched.recipient_name && Boolean(formik.errors.recipient_name)}
                helperText={formik.touched.recipient_name && formik.errors.recipient_name}
              />
              <TextField
                fullWidth
                margin="normal"
                id="recipient_phone"
                name="recipient_phone"
                label="Recipient's telephone number"
                variant="outlined"
                value={formik.values.recipient_phone}
                onChange={formik.handleChange}
                error={formik.touched.recipient_phone && Boolean(formik.errors.recipient_phone)}
                helperText={formik.touched.recipient_phone && formik.errors.recipient_phone}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                id="address"
                name="address"
                label="Address"
                variant="outlined"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
              <TextField
                fullWidth
                margin="normal"
                id="postal_code"
                name="postal_code"
                label="Postal code"
                variant="outlined"
                value={formik.values.postal_code}
                onChange={formik.handleChange}
                error={formik.touched.postal_code && Boolean(formik.errors.postal_code)}
                helperText={formik.touched.postal_code && formik.errors.postal_code}
              />
            </Box>
            <TextField
              fullWidth
              margin="normal"
              id="city"
              name="city"
              label="City or Subdistrict"
              variant="outlined"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}
            >
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default MyProduct;
