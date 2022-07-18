import "./card.styles.scss";
import { withRouter } from "react-router-dom";

const CardItem = ({ product, history }) => {
  const {
    _id: id,
    brand,
    model,
    price,
    images,
    quality,
    ram,
    storage,
    units,
  } = product;
  const title = brand + " " + model;
  return (
    <div className="card" onClick={() => history.push(`/product/${id}`)}>
      <div className="image-container">
        <img alt={title} src={images[0]?.url} className="image" />
      </div>
      <div className="info-container">
        <h3 className="name">{title}</h3>
        <p className="memory">
          <span>{ram}Gb</span>
          <span> / {storage}Gb</span>
        </p>
        <p>{quality}</p>
        <p className="price">{`₹ ${price} only`}</p>
        {units === 0 && (
          <p
            className="units-left"
            style={{ color: "#ef233c", fontWeight: "600" }}
          >
            Out of stock
          </p>
        )}
      </div>
    </div>
  );
};

export default withRouter(CardItem);
