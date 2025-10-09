
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Image, Row, Col } from 'react-bootstrap'
import { FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {toast} from 'react-toastify'

import { useGetProductsQuery, useCreateProductMutation } from '../../slices/productApiSlice'

const ProductListScreen = () => {

  const { data: products, isLoading, error,refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCraeteProduct }] = useCreateProductMutation();
  console.log('products : ', products)
  const handleProductDelete = (productId) => {
    console.log('handleProductDelete')
  }

  const handleCreateProduct = async ()=>{
   if(window.confirm("Create new product?")){
    try {
       console.log('creating product')
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
    {isLoading && <Loader />}
    {error && <Message variant={'danger'}>Error loading products</Message >}

    <Table striped border responsive className='table-sm'>
      <thead>
        <tr>
          <td>ID</td>
          <td>NAME</td>
          <td>PRICE</td>
          <td>CATEGORY</td>
          <td>BRAND</td>
          <th></th>
        </tr>
      </thead>
      <tbody>


        {products && (
          products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>

              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.brand}</td>
              <td>{product.brand}</td>

              <td>
                <LinkContainer to={`/admin/product/${product._id}`}>
                  <Button variant='light' className='btn-sm mx-2'><FaEdit /></Button></LinkContainer>
                <Button onClick={() => handleProductDelete(product._id)} variant='danger' className='btn-sm mx-2'><FaTrash style={{ color: 'white' }} /></Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>

  </>)

}

export default ProductListScreen