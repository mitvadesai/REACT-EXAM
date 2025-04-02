import { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { AddProductAsync } from "../services/actions/Product.action";
import { useNavigate } from "react-router";
import uploadImage from "../services/imageupload";

const AddProduct = () => {
    const dispatch = useDispatch();
    const { isCreated } = useSelector(state => state.ProductReducer);
    const navigate = useNavigate();
    
    const [inputData, setInputData] = useState({
        title: "",
        price: "",
        size: "",
        image: "",
        category: ""
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        if (!inputData.title.trim()) {
            newErrors.title = "Title is required.";
        } else if (inputData.title.length < 3) {
            newErrors.title = "Title must be at least 3 characters.";
        }

        if (!inputData.price.trim()) {
            newErrors.price = "Price is required.";
        } else if (isNaN(inputData.price) || Number(inputData.price) <= 0) {
            newErrors.price = "Price must be a valid positive number.";
        }

        if (!inputData.size.trim()) {
            newErrors.size = "Size is required.";
        }

        if (!inputData.category) {
            newErrors.category = "Please select a category.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChanged = (e) => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };

    const handleImage = async(e) => {
        let file = e.target.files[0];

        if(!file)   
            return;
        let url = await uploadImage(file)
        setInputData({
            ...inputData,
            image: `${url}`
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            let id = Math.floor(Math.random() * 100000).toString();
            dispatch(AddProductAsync({ ...inputData, id }));
        }
    };

    useEffect(() => {
        if (isCreated) {
            navigate("/");
        }
    }, [isCreated]);

    return (
        <Container className="mt-3">
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Title</Form.Label>
                    <Col sm="4">
                        <Form.Control type="text" name="title" value={inputData.title} onChange={handleChanged} placeholder="Enter Title" />
                        {errors.title && <Alert variant="danger" className="mt-2">{errors.title}</Alert>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Price</Form.Label>
                    <Col sm="4">
                        <Form.Control type="text" name="price" value={inputData.price} onChange={handleChanged} placeholder="Enter Price" />
                        {errors.price && <Alert variant="danger" className="mt-2">{errors.price}</Alert>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Size</Form.Label>
                    <Col sm="4">
                        <Form.Control type="text" name="size" value={inputData.size} onChange={handleChanged} placeholder="Enter Size" />
                        {errors.size && <Alert variant="danger" className="mt-2">{errors.size}</Alert>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Image</Form.Label>
                    <Col sm="4">
                        <Form.Control type="file" name="image" onChange={handleImage}  />
                        {errors.image && <Alert variant="danger" className="mt-2">{errors.image}</Alert>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Category</Form.Label>
                    <Col sm="4">
                        <Form.Select name="category" value={inputData.category} onChange={handleChanged}>
                            <option value="">Select</option>
                            <option value="colths">Cloths</option>
                            <option value="footware">Footware</option>
                            <option value="elctrinic">Electronics</option>
                            <option value="furnicher">Furniture</option>
                            <option value="beauty">Beauty</option>
                            <option value="beauty">food</option>
                            <option value="beauty">fashion</option>
                        </Form.Select>
                        {errors.category && <Alert variant="danger" className="mt-2">{errors.category}</Alert>}
                    </Col>
                </Form.Group>

                <Button type="submit">Add Product</Button>
            </Form>
        </Container>
    );
};

export default AddProduct;
