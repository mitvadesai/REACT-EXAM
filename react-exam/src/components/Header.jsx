
import { Button, Container, Navbar, Offcanvas, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import { HiUserCircle } from "react-icons/hi2";
import { IoCart } from "react-icons/io5";
import { IoCartSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logOutAsync } from "../services/actions/auth.action";

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userReducer);
const cart = useSelector(state => state.cart || {});  
    const cartItems = cart.cartItems || [];  
        console.log("Redux State:", { user, cartItems });

    const [showCart, setShowCart] = useState(false);

    const handleLogout = () => {
        dispatch(logOutAsync());
    };

    const toggleCart = () => setShowCart(!showCart);

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">
                        <img 
                            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" 
                            alt="Logo" 
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                          
                            <Link to="/cart"><IoCartSharp /> Cart ({cartItems.length})</Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to="/add"><IoIosAddCircle /> Add Product</Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {user ? (
                                <Button className="logout" onClick={handleLogout}>
                                    <BiLogOutCircle /> Logout
                                </Button>
                            ) : (
                                <Link to="/signin">
                                    <HiUserCircle /> Sign In
                                </Link>
                            )}
                            &nbsp;&nbsp;<PiDotsThreeVerticalBold />
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

           
            <Offcanvas show={showCart} onHide={toggleCart} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>My Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cartItems.length > 0 ? (
                        <ListGroup>
                            {cartItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    {item.title} - ₹{item.price}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Header;

