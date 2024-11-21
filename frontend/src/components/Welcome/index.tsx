import gun from '../../assets/gun.png';

const Welcome = () => {
    return (
        <div className="w-full flex flex-col">
            <h1 className="text-center text-2xl md:text-5xl font-extrabold after:content-[''] after:block after:border-b-4 after:border-[#64b357] after:w-24 after:m-auto">Bienvenue au Laser Magique</h1>
            <div className="flex flex-col md:flex-row justify-evenly">
                <section className="md:w-[45%]">
                    <p className="font-bold text-justify">A la recherche d'une ou plusieurs activités conviviales en famille, originales entre amis, ou d'un challenge entre collègues ? Laser Magique vous accueille à Waterloo, à deux pas de Bruxelles. Surprenez votre entourage ! Venez vous éclater au Laser Magique, vivre des expériences 100% Fun et inédites: le Cyber Games (en exclusivité mondiale), le Laser game et le VR Arena (réalité virtuelle)</p>
                    <p className="font-bold text-[#64b357]">Laser Game</p>
                    <p className="text-justify">Un Laser Game (ou Jeu de Laser, Laser Shooting, Laser Tag, Q-Zar, ...) hors du commun : un tout nouveau méga-labyrinthe, sur deux niveaux sans escaliers.</p>
                    <p className="text-justify">Au Laser Magique, pas de combinaison à enfiler (plus hygiénique et différentes compositions d'équipes sont possibles) ! Venez vous amuser dès deux joueurs et vous mesurer à nos robots droïdes qui jouent avec vous et sur lesquels vous pouvez tirer pour gagner des points. Pour remporter la partie il vous faudra être rusé, vous cacher, progresser et éviter de vous faire toucher par les droïdes et équipes adverses, qui tenteront de vous faire perdre la partie.</p>
                    <p className="text-justify">Soyez futés ! Ciblez robots et adversaires pour gagner des points et vous serez restez au top !</p>
                    <p className="font-bold text-[#64b357]">Réalité Virtuelle</p>
                    <p className="text-justify">Envie de prolonger votre moment chez nous, d’agrémenter la fête d’anniversaire de votre enfant par une expérience originale ou tout simplement de vous changer les idées ? Laser Magique vous propose également neuf jeux en Réalité Virtuelle (VR) disponibles de 2 à 8 joueurs sur un surface inédite de 100m² et libre de tout mouvement !</p>
                    <p className="font-bold text-[#64b357]">Cyber Trike</p>
                    <p className="text-justify">Vous ne jouez pas le jeu, vous jouez DANS le jeu !</p>
                    <p className="text-justify">Une innovation dans le monde du jeu vous permettant d’être le personnage principal de l’aventure.  Immergez-vous dans le jeu. Soyez le jeu ! On a tous rêvé de vivre les aventures de nos héros de jeux vidéo préférés à leurs places. Le rêve devient réalité !</p>
                </section>
                <section className="md:w-[45%] flex flex-col items-center">
                    <div className="w-full">
                        <iframe className="embed-responsive-item w-full aspect-[16/9]" src="https://www.youtube.com/embed/_OBY7Tq_xCg" data-src="https://www.youtube.com/embed/_OBY7Tq_xCg" allowFullScreen></iframe>
                    </div>
                    <p className="font-bold text-[#64b357]">MOMENT DETENTE & AMBIANCE GARANTIS!</p>
                    <img src={gun} alt="LaserMagique.be"></img>
                </section>
            </div>
        </div>
    );
};

export default Welcome;