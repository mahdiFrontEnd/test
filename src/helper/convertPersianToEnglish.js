export const convertPersianToEnglish = (persianNumber) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  let englishNumber = '';

  // eslint-disable-next-line no-restricted-syntax
  for (const char of persianNumber) {
    const index = persianDigits.indexOf(char);
    if (index !== -1) {
      englishNumber += englishDigits[index];
    } else {
      englishNumber += char; // If it's not a Persian digit, keep the character as is
    }
  }

  return englishNumber;
}