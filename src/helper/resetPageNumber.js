import Cookies from 'js-cookie';


export const resetPageNumber = (setSkip) => {

    if(setSkip){
        setSkip(0);
    }
    const firstUrl = window.location.pathname;
    if (firstUrl === '/messages') {
        Cookies.set('messagesSkip', 0, { expires: 700 , secure: true, sameSite: 'strict'});
    } else if (firstUrl === '/message') {
        Cookies.set('messageSkip', 0, { expires: 700 , secure: true, sameSite: 'strict'});
    } else if (firstUrl === '/correspondence') {
        Cookies.set('corresSkip', 0, { expires: 700 , secure: true, sameSite: 'strict'});
    } else if (firstUrl === '/sent_letter') {
        Cookies.set('sentSkip', 0, { expires: 700 , secure: true, sameSite: 'strict'});
    } else if (firstUrl === '/received_letter') {
        Cookies.set('receivedSkip', 0, { expires: 700 , secure: true, sameSite: 'strict'});
    } else if (firstUrl === '/payment') {
        Cookies.set('paymentSkip', 0, { expires: 700 , secure: true, sameSite: 'strict'});
    } else if (firstUrl === '/request') {
        Cookies.set('requestSkip', 0, { expires: 700 , secure: true, sameSite: 'strict'});
    } else if (firstUrl === '/report') {
        Cookies.set('reportSkip', 0, { expires: 700 , secure: true, sameSite: 'strict'});
    } else if (firstUrl === '/commerce') {
        Cookies.set('purchaseSkip', 0, { expires: 700 , secure: true, sameSite: 'strict'});
    }
}