const baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : window.location.origin === 'https://front.haselnovin.com' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;

const apiBase = `${baseURL}/api/admin/v1/`;


export { baseURL, apiBase };


