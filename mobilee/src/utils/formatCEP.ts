import onlyNumbers from './onlyNumbers';

export default function formatCEP(str) {
  let number = str;
  number = onlyNumbers(number);
  const { length } = number;
  let output = '';

  if (length >= 1) {
    output = number.substr(0, 5);
  }

  if (length > 5) {
    output += `-${number.substr(5, 3)}`;
  }

  return output;
}
