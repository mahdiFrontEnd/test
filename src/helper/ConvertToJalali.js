// eslint-disable-next-line import/no-extraneous-dependencies
import jalaali from 'jalaali-js';

export function ConvertToJalali(dateString) {
  const date = new Date(dateString);
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1; // getMonth() is zero-based
  const gregorianDay = date.getDate();

  const jalaliDate = jalaali.toJalaali(gregorianYear, gregorianMonth, gregorianDay);

  return `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`;
}