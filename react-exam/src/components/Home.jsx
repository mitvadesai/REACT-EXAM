import { useEffect, useState } from "react";
import { Button, Container, Spinner, Card, Row, Col, Form, ListGroup, Pagination, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAsync, getAllProductAsync } from "../services/actions/Product.action";
import { useNavigate } from "react-router";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { addToCart } from "../services/actions/cartaction";


const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.userReducer);
    const { Products, isLoading } = useSelector(state => state.ProductReducer);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTitles, setSelectedTitles] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const productsPerPage = 9;

    useEffect(() => {
        dispatch(getAllProductAsync());
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
      };

     const handleView = (id) => {
        navigate(`/view/${id}`);
    };
    const handleAdd = (id) => {
        navigate((`/add/${id}`));
    };

    const handleDelete = (id) => {
        dispatch(deleteProductAsync(id));
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategories(prev => 
            prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]
        );
    };

    const handleTitleChange = (event) => {
        const title = event.target.value;
        setSelectedTitles(prev => 
            prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
        );
    };

   
const handleAddToCart = (product) => {
    dispatch(addToCart(product)); 
    alert(`${product.title} added to cart!`); 
};

    const handleSizeChange = (event) => {
        const size = event.target.value;
        setSelectedSizes(prev => 
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };
    let filteredProducts = 
    Products && Products.length > 0 
        ? Products.filter(product => 
            product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.price?.toString().includes(searchTerm) ||
            product.size?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];


    if (sortBy === "lowToHigh") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => selectedCategories.includes(product.category));
    }

    if (selectedTitles.length > 0) {
        filteredProducts = filteredProducts.filter(product => selectedTitles.includes(product.title));
    }

    if (selectedSizes.length > 0) {
        filteredProducts = filteredProducts.filter(product => selectedSizes.includes(product.size));
    }

    const uniqueCategories = [...new Set(Products?.map(product => product.category) || [])];
    const uniqueTitles = [...new Set(Products?.map(product => product.title) || [])];
    const uniqueSizes = [...new Set(Products?.map(product => product.size) || [])];

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

     useEffect(()=> {
        if(!user){
            navigate("/signin")
        }
    }, [user])

    return (
        <Container className="mt-3">
             <Carousel className="mb-4">
                <Carousel.Item>
                    <img className="d-block w-100" src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/173cacfaf069fe7d.png?q=20" alt="First Offer" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/10e15f15b32bcddc.jpg?q=20" alt="First Offer" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/8921fc73c192a29f.jpg?q=20" alt="Second Offer" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/373914b13f0b4dfb.jpg?q=20" alt="Third Offer" />
                </Carousel.Item>
            </Carousel>
            <Row>
                {/* Sidebar */}
                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <Form.Control
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Form.Label>Sort by Price</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Low to High"
                                name="sortPrice"
                                value="lowToHigh"
                                onChange={handleSortChange}
                                checked={sortBy === "lowToHigh"}
                            />
                            <Form.Check
                                type="radio"
                                label="High to Low"
                                name="sortPrice"
                                value="highToLow"
                                onChange={handleSortChange}
                                checked={sortBy === "highToLow"}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Form.Label>Filter by Category</Form.Label>
                            {uniqueCategories.map(category => (
                                <Form.Check
                                    key={category}
                                    type="checkbox"
                                    label={category}
                                    value={category}
                                    onChange={handleCategoryChange}
                                    checked={selectedCategories.includes(category)}
                                />
                            ))}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Form.Label>Filter by Title</Form.Label>
                            {uniqueTitles.map(title => (
                                <Form.Check
                                    key={title}
                                    type="checkbox"
                                    label={title}
                                    value={title}
                                    onChange={handleTitleChange}
                                    checked={selectedTitles.includes(title)}
                                />
                            ))}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Form.Label>Filter by Size</Form.Label>
                            {uniqueSizes.map(size => (
                                <Form.Check
                                    key={size}
                                    type="checkbox"
                                    label={size}
                                    value={size}
                                    onChange={handleSizeChange}
                                    checked={selectedSizes.includes(size)}
                                />
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                
                
                <Col md={9} className="mx-auto">
                    {isLoading ? (
                        <Spinner className="spinner-border text-danger" />
                    ) : (
                        <>
                            <Row>
                                {currentProducts.length > 0 ? (
                                    currentProducts.map((Product) => (
                                        <Col md={4} key={Product.id} className="mb-4">
                                            <Card>
                                                <Card.Img variant="top" src={Product.image} className="crd_img" />
                                                <Card.Body>
                                                    <Card.Text>
                                                        <strong>Title :</strong> {Product.title} <Button className="view" variant="primary" onClick={() => handleView(Product.id)}><i><FaEye /></i></Button> <br />
                                                        <strong>Price :</strong> ₹{Product.price} <br />
                                                        <strong>Size :</strong> {Product.size} <br />
                                                        <strong>Category :</strong> {Product.category}
                                                    </Card.Text>
                                                    <Button variant="primary" onClick={() => handleEdit(Product.id)}><TbEdit /> Edit</Button>
                                                    <Button variant="danger" className="ms-2" onClick={() => handleDelete(Product.id)}><MdDeleteOutline /> Delete</Button>
                                                    {/* <Button variant="primary" className="ms-2" onClick={() => handleView(Product.id)}><FaEye /> view</Button> */}
                                                    <Button variant="primary" className="ms-2" onClick={() => handleAddToCart(Product)}> <MdOutlineShoppingCart /> Cart</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                ) : (
                                    <Col>
                                        <p className="text-center">No products available.</p>
                                    </Col>
                                )}
                            </Row>
                            <Pagination className="justify-content-center">
                                {[...Array(totalPages).keys()].map(num => (
                                    <Pagination.Item key={num + 1} active={num + 1 === currentPage} onClick={() => setCurrentPage(num + 1)}>
                                        {num + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Home;    

