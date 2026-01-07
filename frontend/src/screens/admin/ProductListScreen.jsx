
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Image, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';

import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productApiSlice'

const ProductListScreen = () => {

  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });

  const [createProduct, { isLoading: loadingCraeteProduct }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDeleteProduct }] = useDeleteProductMutation();

  const handleProductDelete = async (productId) => {
    if (window.confirm("Are you sure to delete this product?")) {
      try {
        await deleteProduct(productId);
        refetch();
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }
  }
  const handleCreateProduct = async () => {
    if (window.confirm("Create new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }
  }

  return (<>
    <Row className='align-items-center'>
      <Col>
        <h1>Products</h1>
      </Col>
      <Col className='text-end'>
        <Button className='btn-sm m-3' onClick={handleCreateProduct}>
          <FaEdit /> Create Product
        </Button>
      </Col>
    </Row>
    {loadingCraeteProduct && <Loader />}
    {loadingDeleteProduct && <Loader />}
    {isLoading && <Loader />}
    {error && <Message variant={'danger'}>Error loading products</Message >}

    <Table striped border responsive className='table-sm'>
      <thead>
        <tr>
          <td>ID</td>
          <td>Image</td>
          <td>NAME</td>
          <td>PRICE</td>
          <td>CATEGORY</td>
          <td>BRAND</td>
          <th></th>
        </tr>
      </thead>
      <tbody>

        {data?.products && (
          data?.products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>

              <td><Link to={`/product/${product._id}`}><Image src={product.image} fluid roundedCircle style={{ height: '55px', border: '1px solid red' }} /></Link></td>
              <td><Link to={`/product/${product._id}`}>{product.name}</Link></td>
              <td>${product.price}</td>
              <td>{product.brand}</td>
              <td>{product.brand}</td>

              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant='light' className='btn-sm mx-2'><FaEdit /></Button></LinkContainer>
                <Button onClick={() => handleProductDelete(product._id)} variant='danger' className='btn-sm mx-2'><FaTrash style={{ color: 'white' }} /></Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
    <Paginate page={data?.page} pages={data?.pages} isAdmin={true} />

  </>)

}

export default ProductListScreen