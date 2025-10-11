import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import { useUpdateProductMutation, useGetProductDetailsQuery } from '../../slices/productApiSlice'


const ProductEditScreen = () => {

    const navigate = useNavigate();
    const { id: productId } = useParams();

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')

    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId)
    const [updateProduct, { isLoading: loadingUpdate, error: errorUpdate }] = useUpdateProductMutation();

    useEffect(() => {

        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product])

    const submithandler = async (e) => {

        e.preventDefault();
        const updatedProduct = {
            productId,
            name,
            price,
            category,
            countInStock,
            description,
            brand,
        }
        const result = await updateProduct(updatedProduct);
        
        if (result.error) {
            toast.error(result.error?.data?.message || result.error?.error)
        } else {
            toast.success('Product Updated Successfully')
            navigate('/admin/productlist')
        }

    }
    return (
        <>
            <Link to={'/admin/productlist'} className='btn btn-light my-3'>Go Back</Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {isLoading && <Loader />}
                {loadingUpdate ? <Loader /> : error ? <Message variant={"danger"}>
                    {error?.data?.message || error?.error}
                </Message> : (<Form onSubmit={submithandler}>
                    <Form.Group controlId="name" className="my-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control></Form.Group>
                    <Form.Group controlId='price' className='my-3'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='countInStock' className='my-3'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                            type='number'
                            name="countInStock"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {/* Image Input Placeholder */}
                    <Form.Group controlId='brand' className='my-3'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            name="brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='category' className='my-3'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description' className='my-3'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3'>Update</Button>
                </Form>)}

            </FormContainer>
        </>
    )
}

export default ProductEditScreen