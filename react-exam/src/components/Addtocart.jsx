import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Card, Row, Col, ListGroup } from "react-bootstrap";
import { clearCart, removeFromCart } from "../services/actions/cartaction";
import { MdListAlt } from "react-icons/md";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Container className="mt-4">
            <h2 className="mb-4"><MdListAlt /> List Item</h2>
            {cartItems.length === 0 ? (
                <p>Your list is empty.</p>
            ) : (
                <Row>
                    <Col md={8}>
                        {cartItems.map((item, index) => (
                            <Card key={index} className="mb-3 shadow-sm">
                                <Row className="g-0">
                                    <Col md={4} className="d-flex align-items-center justify-content-center p-3">
                                        <img src={item.image} alt={item.title} width="250" height="250" className="rounded"/>
                                    </Col>
                                    <Col md={8} className="mt-2">
                                        <Card.Body className="mt-3">
                                            <h5>TITLE :{item.title}</h5>
                                            <p><strong>Date:</strong> {item.date}</p>
                                            <p><strong>Description:</strong> ₹{item.description}</p>
                                            <h6>Total: ₹{item.price * item.quantity}</h6>
                                            <Button variant="danger" size="sm" onClick={() => dispatch(removeFromCart(item.id))}>
                                                Remove
                                            </Button>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    </Col>
                    <Col md={4}>
                        
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Cart;
