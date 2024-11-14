import Activities from "../Activities";
import LaserGame from "../LaserGame";
import Menu from "../Menu";
import Welcome from "../Welcome";

const Home = () => {
    return (
        <main className="relative w-full min-h-screen flex flex-col items-center justify-start md:pt-9">
            <Menu />
            <Activities />
            <Welcome/>
            <LaserGame />
        </main>
    )
};

export default Home;