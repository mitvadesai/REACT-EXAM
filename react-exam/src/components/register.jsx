import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { registerUserAsync } from "../services/actions/auth.action";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isCreated, error} = useSelector(state => state.userReducer)
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleChanged = (e) => {
    const { name, value } = e.target;

    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUserAsync(inputData))
  }

  useEffect(()=> {
    if(isCreated){
        navigate("/")
    }
  }, [isCreated])
  return (
    <>
      <Container>
        <h2>Register User</h2>
        {error ? <p>{error}</p> : ""}
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="email"
                name="email"
                value={inputData.email}
                onChange={handleChanged}
                placeholder="Enter Email"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="password"
                name="password"
                value={inputData.password}
                onChange={handleChanged}
                placeholder="Enter Password"
              />
            </Col>
          </Form.Group>
          <Button type="submit">SignUp</Button>
        </Form>
        <p>Already Account? <Link to={"/signin"}>Login</Link></p>
      </Container>
    </>
  );
};


export default Register;