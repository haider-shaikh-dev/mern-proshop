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
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      //load paypal script
      const loadPayPalScript = async () => {
        payPalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        payPalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, payPalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      //details are from paypal
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successful");
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    });
  }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment Successful");
  }

  function onError(error) {
    toast.error(error?.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

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
                <Message variant={"success"}>Paid On {order.paidAt}</Message>
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

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <>
                      <div>
                        <Button
                          onClick={onApproveTest}
                          style={{ marginBottom: "10px" }}
                        >
                          Test Pay Order
                        </Button>
                      </div>
                      <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                      </div>
                    </>
                  )}
                </ListGroup.Item>
              )}
              {/* MARK AS DELIVERED PLACEHOLDER */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );

};

export default OrderScreen;
