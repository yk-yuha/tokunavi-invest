export type Stock = {
  code: string;
  name: string;
  yield: number;
  benefit: string;
};

export const stocks: Stock[] = [
  { code: "7203", name: "トヨタ自動車", yield: 2.5, benefit: "QUOカード" },
  { code: "9432", name: "日本電信電話（NTT）", yield: 3.2, benefit: "dポイント" },
  { code: "8267", name: "イオン", yield: 1.6, benefit: "買物優待券" },
];
