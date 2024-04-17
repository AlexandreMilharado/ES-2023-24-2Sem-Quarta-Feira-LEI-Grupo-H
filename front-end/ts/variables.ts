import { CsvRow } from "./uploadCsv";

let files: CsvRow[][] = [];

export function setFiles(array: CsvRow[][]) {
  files = array;
  console.log(2);
  files.forEach((file) => console.log(file));
}
