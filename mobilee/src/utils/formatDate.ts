import onlyNumbers from './onlyNumbers';

export default function formatDate(str) {
  let number = str;
  number = onlyNumbers(number);
  const { length } = number;
  let output = '';

  if (length >= 1) {
    output = number.substr(0, 2);
  }

  if (length > 2) {
    output += `/${number.substr(2, 2)}`;
  }

  return output;
}
