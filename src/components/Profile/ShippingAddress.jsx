// components/ShippingAddress.js
import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Box,
  Modal,
  Typography,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ShippingAddress = () => {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formData, setFormData] = useState({
    label: "",
    name: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    primary: false,
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setEditingIndex(-1);
    setFormData({
      label: "",
      name: "",
      phone: "",
      address: "",
      postalCode: "",
      city: "",
      primary: false,
    });
  };

  const handleSave = () => {
    if (editingIndex > -1) {
      const updatedAddresses = addresses.map((address, index) =>
        index === editingIndex ? formData : address
      );
      setAddresses(updatedAddresses);
    } else {
      setAddresses([...addresses, formData]);
    }
    handleClose();
  };

  const handleDelete = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setFormData(addresses[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <Container>
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
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Recipient Name: {address.name}
          </Typography>
          <Typography variant="body2">
            Address: {address.address}, {address.city}, {address.postalCode}
          </Typography>
          <Typography variant="body2">
            Phone: {address.phone}
          </Typography>
          {address.primary && (
            <Typography variant="body2" color="primary">
              Primary Address
            </Typography>
          )}
          <Box sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => handleEdit(index)}
            >
              Edit
            </Button>
          </Box>
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
            {editingIndex > -1 ? "Edit address" : "Add new address"}
          </Typography>
          <Box component="form">
            <TextField
              fullWidth
              margin="normal"
              id="label"
              label="Save address as (ex: home address, office address)"
              variant="outlined"
              value={formData.label}
              onChange={handleChange}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                id="name"
                label="Recipient's name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                id="phone"
                label="Recipient's telephone number"
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                id="address"
                label="Address"
                variant="outlined"
                value={formData.address}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                id="postalCode"
                label="Postal code"
                variant="outlined"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </Box>
            <TextField
              fullWidth
              margin="normal"
              id="city"
              label="City or Subdistrict"
              variant="outlined"
              value={formData.city}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="primary"
                  checked={formData.primary}
                  onChange={handleChange}
                />
              }
              label="Make it the primary address"
            />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}
          >
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default ShippingAddress;
