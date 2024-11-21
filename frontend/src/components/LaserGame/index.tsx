import aboutLg from '../../assets/about-lg.jpg';

const LaserGame = () => {
    return (
        <div id="about-lg" className="flex flex-col items-center bg-cover bg-fixed w-full min-h-screen pt-10" style={{ backgroundImage: `url(${aboutLg})` }}>
            <h2 className="text-4xl font-extrabold after:content-[''] after:block after:border-b-4 after:border-[#64b357] after:w-24 after:m-auto">LE LASER GAME</h2>
            <div className="grid grid-cols-12 mx-20 mt-10">
                <div className="flex flex-col items-center md:col-span-4 col-span-12 border border-zinc-600 border-t-0 border-l-0 border-r-0 md:border-r">
                    <h5 className="flex flex-col text-center text-2xl font-bold"><i className="fa-regular fa-face-smile p-5 text-[#64b357] text-5xl"></i>Amusant</h5>
                    <p className="text-center text-xs px-12 py-2">Soyez rusés, évitez les tirs de l'équipe adverse et planifiez des stratégies audacieuses pour remporter la partie avec vos coéquipiers !</p>
                </div>
                <div className="flex flex-col items-center md:col-span-4 col-span-12 border border-zinc-600 md:border-t-0 border-t border-l-0 border-r-0 border-b md:border-b md:border-r md:border-l">
                    <h5 className="flex flex-col text-center text-2xl font-bold"><i className="fa fa-medkit p-5 text-[#64b357] text-5xl"></i>Indolore</h5>
                    <p className="text-center text-xs px-12 py-2">Les lasers sont sans danger aussi bien pour le corps que pour les yeux. La seule douleur que vous ressentirez est celle de la frustration d'avoir été éliminé...</p>
                </div>
                <div className="flex flex-col items-center md:col-span-4 col-span-12 border border-zinc-600 border-t border-r-0 md:border-t-0 border-l-0 md:border-l">
                    <h5 className="flex flex-col text-center text-2xl font-bold"><i className="fa-regular fa-thumbs-up p-5 text-[#64b357] text-5xl"></i>Pour tout age</h5>
                    <p className="text-center text-xs px-12 py-2">Le Laser Game convient à tout les âges, enfants et adultes de 7 à 77 ans, et ne nécessite aucune pré-requis de condition physique.</p>
                </div>
                <div className="flex flex-col items-center md:col-span-4 col-span-12 border border-zinc-600 border-b-0 border-l-0 border-r-0 md:border-r">
                    <h5 className="flex flex-col text-center text-2xl font-bold"><i className="fa-solid fa-shield-halved p-5 text-[#64b357] text-5xl"></i>Sans danger</h5>
                    <p className="text-center text-xs px-12 py-2">Notre matériel est régulièrement contrôlé et entretenu, et notre labyrinthe répond à toutes les normes de sécurité requises.</p>
                </div>
                <div className="flex flex-col items-center md:col-span-4 col-span-12 border border-zinc-600 border-b-0 border-l-0 md:border-l border-r-0 md:border-r">
                    <h5 className="flex flex-col text-center text-2xl font-bold"><i className="fa-regular fa-check-square p-5 text-[#64b357] text-5xl"></i>Hygiénique</h5>
                    <p className="text-center text-xs px-12 py-2">Il n'y a pas de combinaison à enfiler, donc à entretenir ou à désinfecter. Un pistolet P90 en main, et vous êtes paré pour une partie!</p>
                </div>
                <div className="flex flex-col items-center md:col-span-4 col-span-12 border border-zinc-600 border-b-0 border-r-0 border-l-0 md:border-l">
                    <h5 className="flex flex-col text-center text-2xl font-bold"><i className="fa fa-users p-5 text-[#64b357] text-5xl"></i>Convivial</h5>
                    <p className="text-center text-xs px-12 py-2">En groupe ou seulement à deux, avec ou sans nos droïdes interactifs, en plusieurs équipes,... Toutes les sortes de configuration sont possibles.</p>
                </div>
            </div>
        </div>
    );
};

export default LaserGame;