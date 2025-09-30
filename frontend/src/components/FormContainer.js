import { Container, Row, Col } from "react-bootstrap";
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xl={6} md={3}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
