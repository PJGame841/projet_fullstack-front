import { useState } from "react";
import {Form, redirect, useActionData, useLoaderData} from "react-router-dom";

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

export default Login