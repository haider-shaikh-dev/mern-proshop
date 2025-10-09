import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import Loader from "../../components/Loader";
import Message from "../../components/Message";


import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
const OrderListScreen = () => {
  const { data: orders, isLoading, isError } = useGetOrdersQuery();

  console.log('orders : ', orders)
  return (
    <>
      <h1>Orders</h1>
      {isLoading && <Loader />}
      {isError && <Message variant={'danger'}>Error loading orders</Message >}

      <Table striped border responsive className='table-sm'>
        <thead>
          <tr>
            <td>ID</td>
            <td>USER</td>
            <td>DATE</td>
            <td>TOTAL</td>
            <td>PAID</td>
            <td>DELIVERED</td>
            <th></th>
          </tr>
          <tbody>

          </tbody>
          {orders && (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>

                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : <FaTimes color='red' />}</td>
                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <FaTimes color='red' />}</td>
                <td>
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button variant='light' className='btn-sm'>Details</Button></LinkContainer>
                </td>
              </tr>
            ))
          )}
        </thead>
      </Table>

    </>
  );
};

export default OrderListScreen;
