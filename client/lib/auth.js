export const fetchToken = async (url, data, successCb, errorCb) => {
    try {
        const response = await axios.post(url, data)
        setToken(response.data.token);
        successCb && successCb()
    } catch (e) {
        errorCb && errorCb(e);
    }
}

export const setToken = token => {
    axios.defaults.headers.common['Authorization'] = token;
    localStorage.setItem('token', token);
}

export const removeToken = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
}

