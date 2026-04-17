// frontend/src/modules/common/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';

// IMPORTANT: Import your images directly from src/images/
import p1_img from '../../images/p1.jpg'; // Path from modules/common/ to src/images/
import p2_img from '../../images/p2.jpg';
import p3_img from '../../images/p3.jpg';
import p4_img from '../../images/p4.jpg';


function Home() {
    // Example image data for the carousel
    // NOW USING THE IMPORTED IMAGE VARIABLES
    const carouselImages = [
        {
            src: p1_img, // Use the imported variable here
            alt: 'Beautiful Modern House',
            captionTitle: 'Find Your Dream Home',
            captionText: 'Explore a wide range of properties.',
        },
        {
            src: p2_img, // Use the imported variable
            alt: 'Spacious Apartment Living',
            captionTitle: 'Comfort & Style',
            captionText: 'Apartments designed for modern living.',
        },
        {
            src: p3_img, // Use the imported variable
            alt: 'Cozy Family Villa',
            captionTitle: 'Your Family\'s Next Chapter',
            captionText: 'Perfect homes for every family size.',
        },
        {
            src: p4_img, // Use the imported variable
            alt: 'Prime Location Property',
            captionTitle: 'Location, Location, Location',
            captionText: 'Properties in highly sought-after areas.',
        },
    ];

    return (
        <div className="home-page-container">
            {/* Carousel Section */}
            <section className="carousel-section mb-5">
                {carouselImages.length > 0 ? (
                    <Carousel indicators={true} controls={true} interval={3000}>
                        {carouselImages.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100 rounded" // Bootstrap classes for responsive image
                                    src={image.src} // This will now correctly point to the Webpack-processed image URL
                                    alt={image.alt}
                                    style={{ maxHeight: '550px', objectFit: 'cover' }} // Custom style for image height
                                />
                                <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
                                    <h3>{image.captionTitle}</h3>
                                    <p>{image.captionText}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <Alert variant="info" className="text-center">No featured images available.</Alert>
                )}
            </section>

            {/* Original Hero Section Content */}
            <Container className="text-center my-5 py-5 bg-primary text-white rounded shadow-lg">
                <h1 className="display-4 mb-3">Welcome to HouseHunt</h1>
                <p className="lead mb-4">Your ultimate destination for finding and listing properties.</p>
                <div className="d-flex justify-content-center">
                    <Button as={Link} to="/renter/properties" variant="light" className="btn-lg me-3">Find a Property</Button>
                    <Button as={Link} to="/register" variant="outline-light" className="btn-lg">Become an Owner</Button>
                </div>
            </Container>

            {/* Features Section */}
            <Container className="my-5">
                <h2 className="text-center mb-5 text-dark">Why Choose HouseHunt?</h2>
                <Row className="g-4">
                    <Col md={4}>
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body className="text-center">
                                <Card.Title className="text-primary mb-3"><h3>Easy Search</h3></Card.Title>
                                <Card.Text className="text-muted">Find your dream home with our intuitive search filters and extensive listings.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body className="text-center">
                                <Card.Title className="text-primary mb-3"><h3>Seamless Listings</h3></Card.Title>
                                <Card.Text className="text-muted">Owners can list their properties quickly and manage bookings effortlessly.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body className="text-center">
                                <Card.Title className="text-primary mb-3"><h3>Secure & Reliable</h3></Card.Title>
                                <Card.Text className="text-muted">Our platform ensures secure transactions and reliable connections between users.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;