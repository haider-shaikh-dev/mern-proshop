import { useState, useEffect } from "react";
import { Table, Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from 'react-icons/fa';

import Message from "../components/Message";
import Loader from "../components/Loader";
import { useProfileMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [profile, { isLoading: loadingProfile, isError, error }] =
    useProfileMutation();

  const { data: myOrders, isLoading: loadingOrders, error: loadingError } = useGetMyOrdersQuery();


  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }

  }, [userInfo.name, userInfo.email]);


  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await profile({
          id: userInfo._id,
          name,
          email,
          password,
          confirmPassword,
        }).unwrap();

        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-3">
            Update
          </Button>
          {loadingProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>User Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) :  myOrders?.length === 0 ?   (
          <Message>You have no orders</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>

                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myOrders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      // <FaTimes style={{ color: "red" }} />
                      <Message variant="danger">Not Paid</Message>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <Message variant="danger">Not Delivered</Message>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
