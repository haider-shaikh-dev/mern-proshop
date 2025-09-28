import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        animation:"border",
        width: "100px",
        height: "100px",
        display: "block",
        margin: "auto",
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loader;
