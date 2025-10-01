import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import { useEffect } from "react";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);
  console.log("order : ", order);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant={"danger"}>
      {" "}
      {error?.data?.message || error?.error}
    </Message>
  ) : (
    <>
      <h2>Order {order._id}</h2>
      <Row>
        <Col md="8">
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant={"success"}>{order.deliveredAt}</Message>
              ) : (
                <Message variant={"danger"}>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant={"success"}>{order.paidAt}</Message>
              ) : (
                <Message variant={"danger"}>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Item</h2>
              {order.orderItems.map((item) => (
                <ListGroup.Item>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>

                    <Col md={4}>
                      {item.qty} X {item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md="4">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                {" "}
                <h2>Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item</Col>
                  <Col>${order.itemPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* PAY ORDER PLACEHOLDER */}
              {/* MARK AS DELIVERED PLACEHOLDER */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );

  //   return (
  //     <div>OrderScreen</div>
  //   )
};

export default OrderScreen;
