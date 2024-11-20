import { Link } from "react-router-dom";
import { DetailsProps } from "./types";

const Details = ({ name, description, details, image, link }: DetailsProps) => {
    return (
        <div className="w-[400px] sm:w-[450px] md:w-[30%] h-56 md:min-h-96 xl:h-wo-menu text-center flex flex-col justify-end items-center mb-5" style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px",
        }}>
            <h3 className="text-3xl font-bold">{name}</h3>
            <p className="text-[#64b357] text-sm">{description}</p>
            <hr className="border-[#64b357] w-[150px]" />
            <p>{details}</p>
            <Link to={`/${link}`} className="border w-[150px] mb-5 hover:bg-white hover:text-black">En savoir plus</Link>
        </div>
    )
}

export default Details;