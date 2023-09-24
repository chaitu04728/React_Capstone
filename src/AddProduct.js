import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AddProduct() {
  const [productData, setProductData] = useState({
    image: '',
    title: '',
    price: '',
    description: '',
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [unsavedChanges]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUnsavedChanges(true); // Set unsavedChanges to true on input change
  };

  const isFormValid = () => {
    return (
      productData.image.trim() !== '' &&
      productData.title.trim() !== '' &&
      productData.price.trim() !== '' &&
      productData.description.trim() !== ''
    );
  };

  const handleAddProduct = async () => {
    if (!isFormValid()) {
      toast.error('Please fill out all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      toast.success('Product added successfully');
      setProductData({
        image: '',
        title: '',
        price: '',
        description: '',
      });
      setUnsavedChanges(false); // Reset unsavedChanges after successful submission
    } catch (err) {
      toast.error('Failed to add product: ' + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          name="image"
          value={productData.image}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={productData.title}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddProduct}>
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;
