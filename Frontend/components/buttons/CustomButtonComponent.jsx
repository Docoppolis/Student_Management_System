import React from 'react';

const CustomButtonComponent = ({ data, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete instructor: ${data.firstName} ${data.lastName}?`)) {
      onDelete(data.instructorId);
    }
  };

  return (
    <button
      style={{
        backgroundColor: "#EA526F",
        color: "black",
        border: "2px solid black", // Stroke (border)
        boxShadow: "4px 4px 0px 0px black", // Drop shadow
        cursor: "pointer",
        padding: "5px 10px",
        textTransform: "uppercase", // Optional: Makes the text uppercase
        fontWeight: 600, // Ensures font weight matches the design
        fontFamily: "inter",
      }}
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default CustomButtonComponent;
