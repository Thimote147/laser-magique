import { useEffect, useState } from 'react';
import DayRes from '../DayRes';
// import NewRes from './NewRes';

const Home = () => {
    const [firstname, setFirstname] = useState('');

    useEffect(() => {
        fetch('http://localhost:3010/users/0')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau lors de la récupération du prénom');
                }
                return response.json();
            })
            .then(data => setFirstname(data.firstname))
            .catch(error => console.error('Erreur:', error));
    }, []);

    return (
        <div>
            <h1>Bonjour {firstname}</h1>
            <DayRes />
            {/* <NewRes /> */}
        </div>
    );
}

export default Home;