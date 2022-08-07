export default function isEqual(objA, objB) {
  return JSON.stringify(objA) === JSON.stringify(objB);
}
