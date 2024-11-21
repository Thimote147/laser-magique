import bg_laser from "../../assets/bg-laser.jpg";
import bg_vr from "../../assets/bg-vr.jpg";
import bg_ct from "../../assets/bg-ct.jpg";
import Details from "./Details";

const Activities = () => {
    return (
        <div className="h-full md:flex justify-around md:px-4">
            <Details name="Laser Game" description="Une petite partie entre amis ?" details="Réservez à l’avance en ligne ou le jour même par téléphone vos parties de Laser Game à Waterloo, près de Bruxelles." image={bg_laser} link="laser-magique-partie"/>
            <Details name="Réalité Virtuelle" description="Plongez dans la réalité virtuelle." details="Jouez à l’un de nos 9 jeux immersifs, min. 2 joueurs et max. 8 joueurs en même temps dans un espace de 100m² !" image={bg_vr} link="realite-virtuelle-partie"/>
            <Details name="Cyber Trike" description="En exclu mondiale !" details="Jouez à l’un de nos jeux immersifs, jusqu’8 joueurs dans un espace de 500m² !" image={bg_ct} link="cyber-trike-partie"/>
        </div>
    )
};

export default Activities;