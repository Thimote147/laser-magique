import { DetailsProps } from "./types";

const Details = ({ name, description, details, image }: DetailsProps) => {
    return (
        <div style={{ backgroundImage: `url(${image})` }}>
            <h1>{name}</h1>
            <p>{description}</p>
            <p>{details}</p>
        </div>
    )
}

export default Details;