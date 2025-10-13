import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import { useUpdateUserMutation, useGetUserByIdQuery } from '../../slices/usersApiSlice'


const UserEditScreen = () => {

    const navigate = useNavigate();
    const { id: userId } = useParams();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const { data: user, isLoading, error, refetch } = useGetUserByIdQuery(userId)
    const [updateUser, { isLoading: loadingUpdate, error: errorUpdate }] = useUpdateUserMutation();

    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user])

    const handleIsAdminChange = (e) => {
        setIsAdmin(e.target.checked);
    }
    const submithandler = async (e) => {

        e.preventDefault();

        console.log('updating user', name, email, isAdmin)
        const updatedUser = {
            userId,
            name,
            email,
            isAdmin
        }

        const result = await updateUser(updatedUser);

        if (result.error) {
            toast.error(result.error?.data?.message || result.error?.error)
        } else {
            refetch();
            toast.success('User Updated Successfully')
            navigate('/admin/userlist')
        }

    }
    return (
        <>
            <Link to={'/admin/userlist'} className='btn btn-light my-3'>Go Back</Link>
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
                    <Form.Group controlId='email' className='my-3'>
                        <Form.Label>EMAIL</Form.Label>
                        <Form.Control
                            type='text'
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email' className='my-3'>
                        <Form.Label>IS ADMIN</Form.Label>
                        <Form.Check
                            type="switch"
                            id="yes-no-switch"
                            label={isAdmin ? 'Yes' : 'No'}
                            checked={Boolean(isAdmin)}
                            onChange={handleIsAdminChange}
                        />
                    </Form.Group>
                    <Button type='submit' variant='primary' className='my-3'>Update User</Button>
                </Form>)}

            </FormContainer>
        </>
    )
}

export default UserEditScreen