import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <h2>About Our E-Commerce Store</h2>
          <p>
            Welcome to our online store! We are dedicated to providing you with high-quality products and an excellent shopping experience. Our mission is to make your online shopping journey as convenient and enjoyable as possible.
          </p>
          <p>
            At our store, you'll find a wide range of products, from electronics to fashion, home decor to gadgets. We source our products from trusted suppliers to ensure their quality and authenticity.
          </p>
        </Col>
        <Col md={6}>
          <img
            src="https://st2.depositphotos.com/3591429/10566/i/450/depositphotos_105666254-stock-photo-business-people-at-meeting-and.jpg"
            alt="About Us"
            className="img-fluid"
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h3>Rules :</h3>
          <p>
            In this application if you want to add or delete any product make sure to login. 
          </p>
          <p>
            If you dont have account please register and try to login and enjoy the application.
          </p>
          <p>
            Dont Worry about profile after login also you can edit your profile under your username you can see edit profile page.
          </p>
          <p>
            You can search the product by brand name
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
