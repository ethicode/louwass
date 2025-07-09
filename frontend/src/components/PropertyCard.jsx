import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  return (
    <div>
      <h2>{property.title}</h2>
      <p>{property.type}</p>
      <p>{property.price} €</p>
      <Link to={`/properties/${property.id}`}>Voir détails</Link>
    </div>
  );
}

export default PropertyCard;
