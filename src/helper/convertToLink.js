export const convertToLink = (text) => {
    const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
    const text1 = text.replace(exp, "<a target='_blank' href='$1'>$1</a>");
    const exp2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
    return text1.replace(exp2, '$1<a  href="http://$2">$2</a>');
}