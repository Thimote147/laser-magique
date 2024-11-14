import aboutLg from '../../assets/about-lg.jpg';

const LaserGame = () => {
    return (
        <div className="flex justify-center bg-cover bg-fixed w-full min-h-screen" style={{ backgroundImage: `url(${aboutLg})` }}>
            <h2 className="text-4xl font-extrabold">LE LASER GAME</h2>
        </div>
    )
};

export default LaserGame;