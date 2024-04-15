import {Form, Link, Outlet, useLoaderData} from "react-router-dom";
import './LandingPage.css';
import {isLoggedIn} from "../../services/auth.js";

function LandingPage() {
    const { isLogged } = useLoaderData();

    return (
        <>
            <Outlet/>
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