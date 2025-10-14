import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Product from "../components/Product";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

import { useGetProductsQuery } from "../slices/productApiSlice";

const HomeScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });
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
        {data.products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} ld={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
      <Row><Paginate page={data.page} pages={data.pages} /></Row>
    </>
  );
};

export default HomeScreen;
