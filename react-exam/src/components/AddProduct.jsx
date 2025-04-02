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
        description: "",
        date: "",
        image: "",
        category: ""
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let errors = {};
        if (!inputData.title.trim()) errors.title = "Title is required";
        if (!inputData.description.trim()) errors.description = "Description is required";
        if (!inputData.date) errors.date = "Date is required";
        if (!inputData.image) errors.image = "Image is required";
        if (!inputData.category) errors.category = "Category is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
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
        if(!file) return;
        let url = await uploadImage(file);
        setInputData({
            ...inputData,
            image: `${url}`
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        let id = Math.floor(Math.random() * 100000).toString();
        dispatch(AddProductAsync({ ...inputData, id }));
    };

    useEffect(() => {
        if (isCreated) {
            navigate("/");
        }
    }, [isCreated]);

    return (
        <Container className="mt-3">
            <Form onSubmit={handleSubmit}>
                {Object.values(errors).map((error, index) => (
                    <Alert key={index} variant="danger">{error}</Alert>
                ))}
                
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Title</Form.Label>
                    <Col sm="4">
                        <Form.Control type="text" name="title" value={inputData.title} onChange={handleChanged} placeholder="Enter Title" />
                        {errors.title && <small className="text-danger">{errors.title}</small>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Description</Form.Label>
                    <Col sm="4">
                        <Form.Control type="text" name="description" value={inputData.description} onChange={handleChanged} placeholder="Enter Description" />
                        {errors.description && <small className="text-danger">{errors.description}</small>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Date</Form.Label>
                    <Col sm="4">
                        <Form.Control type="date" name="date" value={inputData.date} onChange={handleChanged} placeholder="Enter Date" />
                        {errors.date && <small className="text-danger">{errors.date}</small>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Image</Form.Label>
                    <Col sm="4">
                        <Form.Control type="file" name="image" onChange={handleImage} />
                        {errors.image && <small className="text-danger">{errors.image}</small>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Category</Form.Label>
                    <Col sm="4">
                        <Form.Select name="category" value={inputData.category} onChange={handleChanged}>
                            <option value="">Select</option>
                            <option value="Travel blogs">Travel blogs</option>
                            <option value="Health and fitness blogs">Health and fitness blogs</option>
                            <option value="Lifestyle blogs">Lifestyle blogs</option>
                            <option value="Beauty blogs">Beauty blogs</option>
                            <option value="Personal blogs">Personal blogs</option>
                        </Form.Select>
                        {errors.category && <small className="text-danger">{errors.category}</small>}
                    </Col>
                </Form.Group>

                <Button type="submit">Add Post</Button>
            </Form>
        </Container>
    );
};

export default AddProduct;
