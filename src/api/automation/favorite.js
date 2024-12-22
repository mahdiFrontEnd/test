import Automation from "../http_request/Model/automation/Automation";

export const favoriteAdd = (dataId, is_favorited, callback, setIsAddLoading) => {
    Automation.request({
        beforeSend: () => {
            // eslint-disable-next-line no-unused-expressions
            setIsAddLoading && setIsAddLoading('isDataTable')
        },
        success: (response) => {
              // eslint-disable-next-line no-unused-expressions
            callback && callback(response);
        }, final: () => {
            // eslint-disable-next-line no-unused-expressions
            setIsAddLoading && setIsAddLoading('')
        }
    }).handleFavorite(dataId, is_favorited ? 'delete' : 'put')


};

