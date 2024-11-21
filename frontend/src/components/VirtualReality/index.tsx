import aboutVr from '../../assets/about-vr.jpg';

const VirtualReality = () => {
    return (
        <div id="about-vr" className="flex flex-col items-center bg-cover bg-fixed w-full min-h-screen pt-10" style={{ backgroundImage: `url(${aboutVr})` }}>
            <h2 className="text-4xl font-extrabold after:content-[''] after:block after:border-b-4 after:border-[#64b357] after:w-24 after:m-auto">LA RÉALITÉ VIRTUELLE</h2>
            <div className="grid grid-cols-12 mx-20 mt-10">
                <div className="flex flex-col items-center md:col-span-4 col-span-12 border border-zinc-600 border-t-0 border-l-0 border-r-0 md:border-r">
                    <h5 className="flex flex-col text-center text-2xl font-bold"><i className="fa fa-users p-5 text-[#64b357] text-5xl"></i>Convivial</h5>
                    <p className="text-center text-xs px-12 py-2">En pouvant accueillir jusque 8 joueurs simultanément sur un espace de 100m², votre équipe pourra jouer et interagir ensemble !</p>
                </div>
                <div className="flex flex-col items-center md:col-span-4 col-span-12 border border-zinc-600 md:border-t-0 border-t border-l-0 border-r-0 border-b md:border-b md:border-r md:border-l">
                    <h5 className="flex flex-col text-center text-2xl font-bold"><i className="fa fa-star p-5 text-[#64b357] text-5xl"></i>Qualité</h5>
                    <p className="text-center text-xs px-12 py-2">Découvrez notre installation et matériel de première qualité, développé par un des leaders européens spécialisé en VR qui vous permettra de vivre votre aventure encore plus intensément !</p>
                </div>
                <div className="flex flex-col items-center md:col-span-4 col-span-12 border border-zinc-600 border-t border-r-0 md:border-t-0 border-l-0 md:border-l">
                    <h5 className="flex flex-col text-center text-2xl font-bold"><i className="fa fa-bullseye p-5 text-[#64b357] text-5xl"></i>Varié</h5>
                    <p className="text-center text-xs px-12 py-2">Le Laser Game convient à tout les âges, enfants et adultes de 7 à 77 ans, et ne nécessite aucune pré-requis de condition physique.</p>
                </div>
                <div className="flex flex-col items-center md:col-span-4 col-span-12 border border-zinc-600 border-b-0 border-l-0 border-r-0 md:border-r">
                    <h5 className="flex flex-col text-center text-2xl font-bold"><i className="fa-regular fa-thumbs-up p-5 text-[#64b357] text-5xl"></i>Pour tout âge</h5>
                    <p className="text-center text-xs px-12 py-2">Nos jeux de réalité virtuelle conviennent aux enfants et adultes de 10 à 77 ans en pratiquant une activité idéale pour tout type de groupe.</p>
                </div>
                <div className="flex flex-col items-center md:col-span-4 col-span-12 border border-zinc-600 border-b-0 border-l-0 md:border-l border-r-0 md:border-r">
                    <h5 className="flex flex-col text-center text-2xl font-bold"><i className="fa-solid fa-paper-plane p-5 text-[#64b357] text-5xl"></i>Léger et ergonomique</h5>
                    <p className="text-center text-xs px-12 py-2">Chaque joueur est équipé d’un casque qui s’adapte parfaitement aux différentes morphologies. Léger et ergonomique, il se fait oublier afin de permettre une totale immersion dans le jeu.</p>
                </div>
                <div className="flex flex-col items-center md:col-span-4 col-span-12 border border-zinc-600 border-b-0 border-r-0 border-l-0 md:border-l">
                    <h5 className="flex flex-col text-center text-2xl font-bold"><i className="fa-regular fa-smile p-5 text-[#64b357] text-5xl"></i>Amusant</h5>
                    <p className="text-center text-xs px-12 py-2">Dès 10 ans, nos jeux permettent de jouer de façon individuelle ou en équipe. Amusement garanti pour un moment en famille ou entre collègues et amis.</p>
                </div>
            </div>
        </div>
    );
};

export default VirtualReality;