import Activities from "../Activities";
import Menu from "../Menu";

const Home = () => {
    return (
        <main className="relative w-full h-screen flex items-start md:items-center justify-center px-4 py-10">
            <Activities />
            <Menu />
        </main>
    )
};

export default Home;