import {Form, Link, Outlet, useLoaderData} from "react-router-dom";
import './LandingPage.css';
import {isLoggedIn} from "../../services/auth.js";

function LandingPage() {
    const { isLogged } = useLoaderData();

    return (
        <>
            <nav>
                <h3>Pierre-Jean Lefort</h3>

                <div className="links">
                    <Link to="/">Projets</Link>
                    <Link to="/about">A propos</Link>
                </div>
            </nav>
            <div className="root">
                <Outlet/>
            </div>
            <footer>
                <div className="links">
                    <Link to="/">Projets</Link>
                    {isLogged ? (<>
                            <Link to='/dashboard'>Dashboard</Link>
                            <Form method="post">
                                <button type="submit" name="action" value="logout">Déconnexion</button>
                            </Form>
                        </>
                    ) : <Link to="/login">Connexion</Link>}
                </div>
            </footer>
        </>
    );
}

export async function landingPageLoader() {
    return {isLogged: await isLoggedIn()};
}

export default LandingPage;