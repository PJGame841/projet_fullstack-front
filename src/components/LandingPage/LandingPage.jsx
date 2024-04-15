import {Outlet, useLoaderData} from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import {isLoggedIn} from "../../services/auth.js";

function LandingPage() {
    const { isLogged } = useLoaderData();

    return (
        <>
            <Outlet />
            <Footer isLogged={isLogged} />
        </>
    );
}

export async function landingPageLoader() {
    return { isLogged: await isLoggedIn() };
}

export default LandingPage;