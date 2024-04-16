import './Dashboard.css';
import {Link, Outlet, useLoaderData, useLocation} from "react-router-dom";
import {fetchProjects} from "../../services/projects.js";

function Dashboard() {
    const { projects } = useLoaderData();
    const location = useLocation();

    const containerStyle = {
        minHeight: '100%'
    }

    return (
        <div style={containerStyle} className="content">
            <div className="side-nav">
                <h2>Liste des projets</h2>
                <hr />
                {projects.map(project => (
                    <Link key={project._id} to={`/dashboard/${project._id}`} reloadDocument={location.pathname.includes("/new")}>
                        <h3>{project.title}</h3>
                    </Link>
                ))}
                <hr />
                <Link to="/dashboard/new" reloadDocument={true}>Créer un nouveau projet</Link>
            </div>
            <div className="container">
                <h1>Dashboard</h1>
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export async function dashboardLoader() {
    return { projects: await fetchProjects() };
}

export default Dashboard;