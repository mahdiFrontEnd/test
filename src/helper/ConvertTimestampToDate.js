import moment from "jalali-moment";


const ConvertTimestampToDate = (date) => {
    return moment.unix(date).locale('fa').format("YYYY/MM/DD")

}





export default ConvertTimestampToDate;