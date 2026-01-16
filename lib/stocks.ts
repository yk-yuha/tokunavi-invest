export type Stock = {
  code: string;
  name: string;
  months: number[]
  yield: number;
  benefit: string;
};

export const stocks = [
  {
    code: "7203",
    name: "トヨタ自動車",
    yield: 2.5,
    benefit: "QUOカード",
    months: [3, 9],
  },
  {
    code: "9432",
    name: "NTT",
    yield: 3.1,
    benefit: "dポイント",
    months: [3],
  },
];