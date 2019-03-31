export default function getRandomColor() {
  const colors = [
    '#495054',
    '#f030e3',
    '#d6336c',
    '#ae3dc9',
    '#429ec9',
    '#1443aa',
    '#4910ed',
    '#aadd343'
  ];
  const random = Math.floor(Math.random() * 8);
  return colors[random];
}