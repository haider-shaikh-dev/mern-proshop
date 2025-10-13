
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Image, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from 'react-toastify'

import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice'

const UserListScreen = () => {

  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDeleteUser }] = useDeleteUserMutation();

  const handleUserDelete = async (productId) => {
    if (window.confirm("Are you sure to delete this user?")) {
      try {
        await deleteUser(productId);
        refetch();
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }
  }

  return (<>
    <Row className='align-items-center'>
      <Col>
        <h1>Users</h1>
      </Col>
      {/* <Col className='text-end'>
        <Button className='btn-sm m-3' onClick={handleCreateProduct}>
          <FaEdit /> Create User
        </Button>
      </Col> */}
    </Row>
    {loadingDeleteUser && <Loader />}
    {isLoading && <Loader />}
    {error && <Message variant={'danger'}>Error loading products</Message >}

    <Table striped border responsive className='table-sm'>
      <thead>
        <tr>
          <td>ID</td>
          <td>NAME</td>
          <td>EMAIL</td>
          <td>ADMIN</td>
          <th></th>
        </tr>
      </thead>
      <tbody>


        {users && (
          users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td><Link to={`/user/${user._id}`}>{user.name}</Link></td>
              <td>{String(user.email)}</td>
              <td>{Boolean(user.isAdmin) ? <FaCheck color='green' /> : <FaTimes color='red' />}</td>
              <td>
                <LinkContainer to={`/admin/userlist/${user._id}/edit`}>
                  <Button variant='light' className='btn-sm mx-2'><FaEdit /></Button></LinkContainer>
                <Button onClick={() => handleUserDelete(user._id)} variant='danger' className='btn-sm mx-2'><FaTrash style={{ color: 'white' }} /></Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>

  </>)

}

export default UserListScreen