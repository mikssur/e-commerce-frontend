export const generateDateId = () => {
  // returning id generated based on current date with miliseconds
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
