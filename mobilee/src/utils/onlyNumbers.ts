export default function onlyNumbers(n) {
  if (!n) return '';
  return String(n).replace(/[^0-9]/g, '');
}
