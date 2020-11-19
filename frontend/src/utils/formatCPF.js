import onlyNumbers from './onlyNumbers';

export default function formatCPF(str) {
  let number = str;
  number = onlyNumbers(number);
  const { length } = number;
  let output = '';

  if (length === 0) return '';

  if (length >= 1) {
    output = number.substr(0, 3);
  }

  if (length >= 4) {
    output += `.${number.substr(3, 3)}`;
  }

  if (length >= 7) {
    output += `.${number.substr(6, 3)}`;
  }

  if (length >= 10) {
    output += `-${number.substr(9, 2)}`;
  }

  return output;
}
