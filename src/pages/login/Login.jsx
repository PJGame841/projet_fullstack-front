import {Form, redirect, useActionData} from "react-router-dom";
import {isLoggedIn, login} from "../../services/auth.js";
import {Button, TextField} from "@mui/material";
import "./Login.css"

function Login() {
    const { loginError } = useActionData() || {};

    return (
        <>
            <h1>Login</h1>
            {loginError && <p>{loginError}</p>}

            <Form method="post" className="loginForm">
                <TextField label="Username" name="username" />
                <br />
                <TextField label="Mot de passe" type="password" name="password" />
                <br />
                <Button type="submit">Login</Button>
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