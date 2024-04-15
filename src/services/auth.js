
export function login(username, password) {
    return fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    })
        .then(response => response.json())
        .then(data => {
            if (!data.valid) {
                throw new Error(data.message)
            }
            localStorage.setItem('accessToken', data.data.accessToken)
            return true
        })
}

export function getAccessToken() {
    return localStorage.getItem('accessToken')
}

export function isLoggedIn() {
    const accessToken = getAccessToken()
    if (!accessToken) {
        return new Promise((resolve) => resolve(false));
    }

    return fetch('/api/users/me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => response.json())
        .then(data => {
            return data.valid;
        })
}

export function logout() {
    localStorage.removeItem('accessToken');
}