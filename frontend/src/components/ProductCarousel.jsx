import { Carousel, Image } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productApiSlice";
import { Link } from "react-router-dom";

const ProductCarousel = () => {

    const { data: topProducts, isLoading: loadingTopProducts, error: topProductError } = useGetTopProductsQuery();

    return (
        <Carousel pause='hover' className='bg-primary mb-3'>
            {loadingTopProducts ? <div>Loading...</div> : topProductError ? <div>{topProductError?.data?.message || topProductError.error}</div> : (
                topProducts.map(product => (
                    <Carousel.Item key={product._id} style={{ height: '300px' }}>
                        <Link to={`/product/${product._id}`}>

                            <Carousel.Caption className='carousel-caption'>
                                <h2>
                                    {product.name} (${product.price})
                                </h2>
                            </Carousel.Caption>
                            <Image src={product.image} alt={product.name} className='d-block w-100' style={{ height: '300px', objectFit: 'cover' }} fluid />
                        </Link>
                    </Carousel.Item>
                ))
            )}

        </Carousel>
    )
}

export default ProductCarousel