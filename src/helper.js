export function handleError(error) {
    console.log(error);
    if (error.response.data) {
        if (error.response.data.errors) {
            return error.response.data.errors;
        }
        if (error.response.data.message) {
            return { message: error.response.data.message };
        }
    }
    return { message: error.message };
}

export function numberFormat(number) {
    if (number) {
        return Number(number).toLocaleString("en-US", {
            style: 'currency',
            currency: 'USD',
        });
    }
    return number;
}

export function formatPrice(number) {
    if (number) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return formatter.format(number); 
    }
    return number;
}


export function setToken(token) {
    window.localStorage.setItem('token', token);
    return token;
}

export function getToken() {
    return window.localStorage.getItem('token');
}

export function clearToken() {
    window.localStorage.removeItem('token');
}