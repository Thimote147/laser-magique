import { Link } from "react-router-dom";
import { DetailsProps } from "./types";

const Details = ({ name, description, details, image }: DetailsProps) => {
    return (
        <div className="w-[400px] sm:w-[450px] md:w-[30%] h-[220px] xl:h-wo-menu text-center flex flex-col justify-end items-center" style={{ 
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px",
         }}>
            <h1>{name}</h1>
            <p>{description}</p>
            <hr className="border-[#64b357]"/>
            <p>{details}</p>
            <Link to="/" className="border w-[150px]">En savoir plus</Link>
        </div>
    )
}

export default Details;