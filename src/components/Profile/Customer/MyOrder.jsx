import React from "react";

const MyOrder = () => {
  return (
    <div>
      <h3 className="fw-bold text-center">My Order</h3>
      <p className="text-center">Manage your orders</p>
      <div className="border border-danger my-3">
        <h6 className="fw-bold">Order ID</h6>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your order ID"
        />
      </div>
      <div className="border border-danger my-3">
        <h6 className="fw-bold">Order Date</h6>
        <input
          type="date"
          className="form-control"
          placeholder="Enter your order date"
        />
      </div>
    </div>
  );
};

export default MyOrder;
