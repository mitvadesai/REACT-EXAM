import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Card, Row, Col, ListGroup } from "react-bootstrap";
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../services/actions/cartaction";
// import { clearCart, removeFromCart, increaseQuantity, decreaseQuantity } from "../services/actions/cartAction";

const Cart = () => {
    const dispatch = useDispatch();
    
    // Redux से cart items लाएं
    const cartItems = useSelector(state => state.cart.cartItems);

    // Grand Total Calculate करें
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Container className="mt-4">
            <h2 className="mb-4">🛒 Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
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
                                            <h5>{item.title}</h5>
                                            <p><strong>Size:</strong> {item.size}</p>
                                            <p><strong>Price:</strong> ₹{item.price}</p>
                                            <h6>Total: ₹{item.price * item.quantity}</h6>
                                            <div className="d-flex align-items-center mb-2 mt-3">
                                                <Button variant="success" size="sm" onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <Button variant="secondary" size="sm" onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                                            </div>
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
                        <Card className="shadow-lg p-3">
                            <h4>🛍️ Grand Total:</h4>
                            <h2 className="text-success">₹{totalPrice}</h2>
                            <ListGroup variant="flush" className="mb-3">
                                {cartItems.map((item, index) => (
                                    <ListGroup.Item key={index} className="d-flex justify-content-between">
                                        <span>{item.title} x {item.quantity}</span>
                                        <span>₹{item.price * item.quantity}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Button variant="primary" className="w-100 h-100 mb-2">
                                Place Order
                            </Button>
                            <Button variant="warning" className="w-100 h-100" onClick={() => dispatch(clearCart())}>
                                Clear Cart
                            </Button>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Cart;
