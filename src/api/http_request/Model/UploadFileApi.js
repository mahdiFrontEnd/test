import Automation from "./automation/Automation";

export const uploadFileApi = (filedUploade, photo, success, error) => {


    Automation.request({
        success: (response) => {
            success(response);
        }, error: (e) => {
            error(e)

        }
    }).addParam('page', filedUploade).uploaderPhoto(photo)
}