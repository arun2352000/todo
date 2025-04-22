import React, { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve the stored token
  
    try {
      const response = await fetch("https://todo-backend-627a.onrender.com/api/Todo/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Attach the token
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Success:", result);
  
      setFormData({ title: "", description: "" }); // Clear form fields
      window.location.reload(); // Refresh to reflect changes
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <br />
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
