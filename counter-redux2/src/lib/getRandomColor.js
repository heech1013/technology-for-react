export default function getRandomColor() {
  const colors = ['red', 'blue', 'green', 'yellow'];
  const random = Math.floor(Math.random() * 4);
  return colors[random];
}