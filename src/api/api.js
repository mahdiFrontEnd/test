import Axios from 'axios';
import Cookies from 'js-cookie';
import { apiBase } from './http_request/url';

export const instance = () => {
    return Axios.create({
        baseURL:apiBase,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer  ${Cookies.get('token')}`,
        },
    });
};