import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { useEffect, useState } from "react";

import products from "../products";
const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };

    fetchData();
  }, []);
  // console.log("products : ", products);
  return (
    <>
      <h1>Latets Products</h1>
      <Row>
        {products.map((product) => {
          {
            console.log("product : ", product.name);
          }

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
