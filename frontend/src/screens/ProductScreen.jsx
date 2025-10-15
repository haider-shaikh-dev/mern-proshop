import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductDetailsQuery, useCreateProductReviewMutation } from "../slices/productApiSlice";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../slices/cartSlice";

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createProductReview, { isLoading: loadingProductReview }] = useCreateProductReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  }

  const subbmitHandler = async (e) => {
    e.preventDefault();
    try {
      await createProductReview({
        productId,
        rating: Number(rating),
        comment
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment('');

    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }

  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <>
          <Message variant={"danger"}>
            {error?.data?.message || error?.error}
          </Message>
        </>
      ) : (
        <>
          <Meta
            title={product.name}
            description={product.description}
            keywords={product.name}
          />
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={`${product.rating}`}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>
                  <h3>Price: ${product.price}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <p>Description: {product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>

                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>

                      <Col>
                        <strong>
                          {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (item) => (
                                <option key={item + 1} value={item + 1}>
                                  {item + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h1>Reviews</h1>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}

              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h1>Write a Product Review </h1>
                  {loadingProductReview && <Loader />}

                  {userInfo ? (<Form onSubmit={subbmitHandler}>
                    <Form.Group controlId="rating" className="my-2">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control as="select" defaultValue="" value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value="" disabled>--Select--</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment" className="my-2">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control as="textarea" row="3" value={comment} onChange={(e) => setComment(e.target.value)} />
                    </Form.Group>
                    <Button disabled={loadingProductReview} type="submit" variant="primary" >Submit</Button>

                  </Form>) : (<h2>Please <Link to="/login">sign in</Link> to write a review</h2>)}
                </ListGroup.Item>

              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
