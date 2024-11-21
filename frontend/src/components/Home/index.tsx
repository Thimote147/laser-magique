import Activities from "../Activities";
import LaserGame from "../LaserGame";
import Menu from "../Menu";
import VirtualReality from "../VirtualReality";
import Welcome from "../Welcome";

const Home = () => {
    return (
        <main className="relative w-full min-h-screen flex flex-col items-center justify-start md:pt-9">
            <Menu />
            <Activities />
            <Welcome/>
            <LaserGame />
            <VirtualReality />
        </main>
    )
};

export default Home;