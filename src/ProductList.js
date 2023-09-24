import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setSortBy, setSearchTerm } from './productReducer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductList = () => {
  const dispatch = useDispatch();
  const { list, sortBy, searchTerm } = useSelector((state) => state.products);
  const loggedIn = sessionStorage.getItem('username');

  useEffect(() => {
    axios
      .get('http://localhost:3000/products')
      .then((response) => {
        dispatch(setProducts(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [dispatch]);

  const [selectedItems, setSelectedItems] = useState([]);

  const filteredProducts = list.filter((product) => {
    const brandMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const priceMatch = product.price.toString().includes(searchTerm);

    return brandMatch || priceMatch;
  });

  if (sortBy === 'price-high-to-low') {
    filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sortBy === 'price-low-to-high') {
    filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm(''));
  };

  const handleDelete = () => {
    if (loggedIn && selectedItems.length > 0) {
      const confirmDelete = window.confirm('Are you sure you want to delete the selected item(s)?');
      if (confirmDelete) {
        const promises = selectedItems.map((productId) =>
          axios.delete(`http://localhost:3000/products/${productId}`)
        );

        Promise.all(promises)
          .then(() => {
            toast.success('Selected products deleted successfully');
            setSelectedItems([]);
          })
          .catch((error) => {
            console.error('Error deleting products:', error);
            toast.error('Error deleting products');
          });
      }
    } else {
      toast.error('Please login and select items to delete');
    }
  };

  const handleCheckboxChange = (productId) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((item) => item !== productId)
      );
    } else {
      setSelectedItems((prevSelected) => [...prevSelected, productId]);
    }
  };

  return (
    <div className="text-center">
      <h1>Products</h1>
      <div className="d-flex justify-content-start align-items-center m-3">
        <div className="filter-dropdown me-3">
          <label>Filter By Price:</label>
          <select onChange={handleSortChange} value={sortBy} className="form-select">
            <option value="price-low-to-high">Low to High</option>
            <option value="price-high-to-low">High to Low</option>
          </select>
        </div>
        <div className="search-bar"> 
          <InputGroup>
            <FormControl
              style={{ width: "500px"}}
              type="text"
              placeholder="Search products by brand or price..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button variant="outline-secondary" onClick={handleClearSearch}>
              X
            </Button>
          </InputGroup>
        </div>
        {loggedIn && ( // Conditionally render these elements if logged in
          <>
            <div className="ml-3">
              <Button variant="danger" onClick={handleDelete}>
                Delete Selected
              </Button>
            </div>
          </>
        )}
      </div>
      <ul className="list-unstyled d-flex justify-between flex-wrap m-2 p-1">
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <Card className='m-1 shadow' style={{ width: '18rem' }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  {loggedIn && ( // Conditionally render checkbox if logged in
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(product.id)}
                      onChange={() => handleCheckboxChange(product.id)}
                    />
                  )}
                  <Link to={`/product/${product.id}`} className="product-link">
                    <Button variant="primary">View</Button>
                  </Link>
                </div>
                <Card.Img
                  style={{ height: '200px', width: '100px' }}
                  variant="top"
                  src={product.image}
                  alt={product.title}
                />
                <Card.Title className='m-2'>{product.title}</Card.Title>
                <Card.Title className='m-2'>{product.price}</Card.Title>
                <Card.Text className='m-2'>{product.description}</Card.Text>
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
