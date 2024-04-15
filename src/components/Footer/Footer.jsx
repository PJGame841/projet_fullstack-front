import './Footer.css';
import {Link} from "react-router-dom";

function Footer({ isLogged }) {
    return (
        <footer>
            <div className="links">
                <Link to="/">Projets</Link>
                {isLogged ? (<>
                        <Link to='/dashboard'>Dashboard</Link>
                        <Link to='/logout'>Déconnexion</Link>
                    </>
                ) : <Link to="/login">Connexion</Link>}
            </div>
        </footer>
    );
}

export default Footer;