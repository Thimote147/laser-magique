import logo from "../../assets/img/logo-inv-sm.png";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Logo"/>
      <nav>
        <ul>
          <li><a href="#">Accueil</a></li>
          <li><a href="#laser">Laser Game</a></li>
          <li><a href="#vr">Réalité Virtuelle</a></li>
          <li><a href="#cyber">Cyber Games</a></li>
          <li><a href="#prices">Formules et Tarifs</a></li>
          <li><a href="#pictures">Photos</a></li>
          <li><a href="#bookings">Réservations</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;