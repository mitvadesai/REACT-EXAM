import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; 
import { loginUserAsync, loginWithGoogle } from "../services/actions/auth.action";
import { FcGoogle } from "react-icons/fc"; 
import { FaEnvelope, FaLock } from "react-icons/fa"; 

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.userReducer);

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
    dispatch(loginUserAsync(inputData));
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow p-4" style={{ width: "400px", borderRadius: "10px" }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <Form.Control
                type="email"
                name="email"
                value={inputData.email}
                onChange={handleChanged}
                placeholder="Enter Email"
                required
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <Form.Control
                type="password"
                name="password"
                value={inputData.password}
                onChange={handleChanged}
                placeholder="Enter Password"
                required
              />
            </div>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 h-100 mb-3">
            Sign In
          </Button>

          <Button onClick={handleGoogleLogin} variant="outline-danger" className="w-100 h-100">
            <FcGoogle size={20} className="me-2" />
            Sign in with Google
          </Button>
        </Form>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup">Register Now</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
