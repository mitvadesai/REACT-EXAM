import { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { getProductAsync, updateProductAsync } from "../services/actions/Product.action";
import { useNavigate, useParams } from "react-router";


const EditProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { Products, isUpdate } = useSelector(state => state.ProductReducer);
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        id: "",
        title: "",
        price: "",
        size: "",
        image: "",
        category: ""
    })

    const handleChanged = (e) => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateProductAsync(id, inputData))
    }

    useEffect(() => {
        if(isUpdate){
            navigate("/")
        }
    }, [isUpdate])

    useEffect(() => {
        if(id){
            dispatch(getProductAsync(id))
        }
    }, [id]);

    useEffect(() => {
        if(Products){
            setInputData(Products)
        }
    }, [Products])
    return (
        <>
            <Container className="mt-3">
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Title
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" name="title" value={inputData.title} onChange={handleChanged} placeholder="Enter Title" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                        price
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" name="price" value={inputData.price} onChange={handleChanged} placeholder="Enter price" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            size
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" name="size" value={inputData.size} onChange={handleChanged} placeholder="Enter size" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                             Image
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" name="image" value={inputData.image} onChange={handleChanged} placeholder="Enter Image URL" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Category
                        </Form.Label>
                        <Col sm="4">
                            <Form.Select aria-label="Default select example" name="category" onChange={handleChanged}>
                                <option>Select</option>
                                <option value="colths">colths</option>
                                <option value="footware">footware</option>
                                <option value="elctrinic">elctrinic</option>
                                <option value="furnicher">furnicher</option>
                                <option value="beauty">beauty</option>
                                <option value="beauty">food</option>
                                <option value="beauty">fashion</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Button type="submit">Edit Product</Button>
                </Form>
            </Container>
        </>
    )
};

export default EditProduct;