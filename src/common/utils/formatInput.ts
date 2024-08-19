export const formatToCart = (value: string) => {
  return value.replace(/(\d{4})/g, "$1-").slice(0, 19);
};

export const formatToMoney = (value: string) => {
  // Format input as 3 digits from right separated by ","
  const sanitizedInput = value.replace(/[^0-9]/g, "");
  const length = sanitizedInput.length;

  if (length <= 3) {
    return sanitizedInput;
  }

  const formattedValue =
    sanitizedInput.slice(0, length % 3 || 3) +
    sanitizedInput.slice(length % 3 || 3).replace(/(\d{3})/g, ",$1");

  return formattedValue;
};


const persianToEnglishDigits = (str: string) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  return str.replace(/[۰-۹]/g, (match) => englishDigits[persianDigits.indexOf(match)]);
};