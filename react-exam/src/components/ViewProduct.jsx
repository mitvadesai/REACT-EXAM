import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductAsync } from "../services/actions/Product.action";
import { Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.ProductReducer);

  useEffect(() => {
    if (id) {
      console.log("Fetching product for ID:", id);
      dispatch(getProductAsync(id));
    }
  }, [id]);

  console.log("Product from state:", product);

  return (
    <div className="d-flex justify-content-center align-items-center vh-75 bg-light">
      {product && (
        <Card className="w-60 shadow-lg mt-5">
          <Row className="g-0">
            <Col md={6} className="d-flex align-items-center">
              <Card.Img 
                src={product.image} 
                alt="Product" 
                style={{ width: "80%", height: "500px", objectFit: "cover", border: "2px solid  #000", borderRadius: "10px", margin: "10px" }}
              />
            </Col>
            <Col md={6} className="p-4">
              <Card.Body>
                <Card.Title className="mb-3 font-weight-bold"><strong>TITLE :</strong> {product.title}</Card.Title>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>PRICE :</strong> ₹{product.price}</li>
                  <li className="list-group-item"><strong>SIZE :</strong> {product.size}</li>
                  <li className="list-group-item"><strong>CATEGORY:</strong> {product.category}</li>
                </ul>
                <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis<br />  lorem ut liberomalesuada feugiat. A "text description" or "alt text"<br /> provides a textual representation of an image.<br /> or visual element, making it accessible to users who cannot see the image,<br /> such as those using screen readers. </p>
              </Card.Body>
              <Button>BUY NOW</Button>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default ViewProduct;
