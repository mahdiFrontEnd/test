import Automation from "./http_request/Model/automation/Automation";

export const uploadPhotoApi = (filedUploade, photo, callback) => {

    Automation.request({
        beforeSend: () => {

        }, success: async (response) => {
            callback(true,response);
        }, failed: () => {
        }, error: ({response}) => {

            callback(false,response.data);
        }, final: () => {
        }
    }).addParam('page', filedUploade).uploaderPhoto(photo)


};
