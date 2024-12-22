import { instance } from '../api';

export const statusApi = (routeData, dataId, value, callback) => {

    instance()
        .put(`${routeData}/status/${dataId} `, value)
        .then((response) => {
            callback(true, response.data);
        })
        .catch((error) => {

            if (
                Object.prototype.hasOwnProperty.call(error, 'response') &&
                error.response.data !== undefined
            ) {
                if (error.response) {
                    callback(false, error.response);
                } else if (error.request) {
                    callback(false, error.request);
                } else {
                    callback(false, error.message);
                }
            } else {
                callback(
                    false,
                    'درحال حاضر سرور در دسترس نیست و از خاموش بودن VPN خود اطمینان حاصل نمایید .',
                );
            }
        });
};