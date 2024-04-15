import {Form, redirect, useActionData} from "react-router-dom";
import {isLoggedIn, login} from "../../services/auth.js";

function Login() {
    const { loginError } = useActionData() || {};

    return (
        <>
            <h1>Login</h1>
            {loginError && <p>{loginError}</p>}

            <Form method="post">
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <br />
                <button type="submit">Login</button>
            </Form>
        </>
    )
}

export async function loginLoader() {
    return await isLoggedIn() ? redirect('/') : null;
}

export async function loginAction({ request }) {
    const formData = await request.formData();
    try {
        const loggedIn = await login(formData.get('username'), formData.get('password'));
        if (loggedIn) {
            return null;
        } else {
            return { loginError: "Bad username/password" };
        }
    } catch (e) {
        return { loginError: e.message };
    }
}

export default Login