var seed = 0;
export default function guid() {
  return Date.now() + "_" + seed++;
}