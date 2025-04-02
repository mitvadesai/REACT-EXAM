import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
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
      <Card className="shadow-lg p-5 rounded-4" style={{ width: "380px" }}>
        <h3 className="text-center fw-bold mb-4">Welcome Back</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <FaEnvelope className="text-primary" />
              </span>
              <Form.Control
                type="email"
                name="email"
                value={inputData.email}
                onChange={handleChanged}
                placeholder="Email Address"
                required
                className="shadow-sm"
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <FaLock className="text-primary" />
              </span>
              <Form.Control
                type="password"
                name="password"
                value={inputData.password}
                onChange={handleChanged}
                placeholder="Password"
                required
                className="shadow-sm"
              />
            </div>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 h-100 py-2 shadow-sm fw-semibold">
            Sign In
          </Button>

          <Button 
            onClick={handleGoogleLogin} 
            variant="outline-secondary" 
            className="w-100 h-100 py-2 mt-2 d-flex align-items-center justify-content-center gap-2 shadow-sm"
          >
            <FcGoogle size={20} /> Sign in with Google
          </Button>
        </Form>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup" className="fw-semibold">Register Now</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
