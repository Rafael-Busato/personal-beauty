import onlyNumbers from './onlyNumbers';

export default function formatPhone(str) {
  let number = str;
  number = onlyNumbers(number);
  const { length } = number;
  let output = '';

  if (length === 0) return '';

  if (length >= 1) {
    output = `(${number.substr(0, 2)}`;
  }

  if (length >= 3) {
    output += `${')' + ' '}${number.substr(2, 4)}`;
  }

  if (length >= 7) {
    output += `-${number.substr(6, 4)}`;
  }

  if (length >= 11) {
    output =
      `(${number.substr(0, 2)})` +
      ` ${number.substr(2, 5)}-${number.substr(7, 4)}`;
  }

  return output;
}
