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
        description: "",
        date: "",
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
                        description
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" name="description" value={inputData.description} onChange={handleChanged} placeholder="Enter description" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                        date
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" name="date" value={inputData.date} onChange={handleChanged} placeholder="Enter date" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                             Image
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="file" name="image" onChange={handleImage} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Category
                        </Form.Label>
                        <Col sm="4">
                            <Form.Select aria-label="Default select example" name="category" onChange={handleChanged}>
                            <option value="">Select</option>
                            <option value="Travel blogs">Travel blogs</option>
                            <option value="Health and fitness blogs ">Health and fitness blogs </option>
                            <option value="Lifestyle blogs">Lifestyle blogs</option>
                            <option value=" beauty blogs"> beauty blogs</option>
                            <option value="Personal blogs">Personal blogs</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Button type="submit">Edit Post</Button>
                </Form>
            </Container>
        </>
    )
};

export default EditProduct;