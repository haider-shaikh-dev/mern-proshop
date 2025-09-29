import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { useGetProductsQuery } from "../slices/productApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return isLoading ? (
    <Loader />
  ) : error ? (
    <>
      <h1>Error while loading products products</h1>
      <Message variant={"danger"}>
        {error?.data?.message || error?.error}
      </Message>
    </>
  ) : (
    <>
      <h1>Latets Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} ld={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
