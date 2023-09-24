import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const loggedIn = sessionStorage.getItem('username');

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [productId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Custom validation: Check if any required field is empty
    const requiredFields = ['title', 'price', 'description'];
    const hasEmptyFields = requiredFields.some((field) => !product[field]);

    if (hasEmptyFields) {
      toast.error('Please fill in all required fields.');
      return;
    }

    axios
      .put(`http://localhost:3000/products/${productId}`, product)
      .then((response) => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  if (product) {
    return (
      <div className='d-flex m-2 p-1 justify-content-center'>
        <Card className="shadow" key={product.id} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={product.image} alt={product.title} />
          <Card.Body>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={product.title}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  required
                />
              </>
            ) : (
              <>
                <Card.Title>{product.title}</Card.Title>
                <Card.Title>{product.price}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
              </>
            )}
            {loggedIn && isEditing ? (
              <Button variant="primary" onClick={handleSaveClick}>
                Save
              </Button>
            ) : (
              loggedIn && (
                <Button variant="primary" onClick={handleEditClick}>
                  Edit
                </Button>
              )
            )}
          </Card.Body>
        </Card>
        <div className='m-2 p-1'>
          <ul style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2>About This Product:</h2>
            <li>15.54 cm (6.1-inch) Super Retina XDR display featuring Always-On and ProMotion</li>
            <li>Dynamic Island, a magical new way to interact with iPhone</li>
            <li>48MP Main camera for up to 4x greater resolution</li>
            <li>Cinematic mode now in 4K Dolby Vision up to 30 fps</li>
            <li>Action mode for smooth, steady, handheld videos</li>
            <li>All-day battery life and up to 23 hours of video playback</li>
            <li>Vital safety technology — Crash Detection calls for help when you can’t</li>
            <li>A16 Bionic, the ultimate smartphone chip. Superfast 5G cellular</li>
            <li>Industry-leading durability features with Ceramic Shield and water resistance</li>
            <li>iOS 16 offers even more ways to personalize, communicate, and share</li>
          </ul>
        </div>
      </div>
    );
  }

  return <p>Loading...</p>;
};

export default ProductDetail;