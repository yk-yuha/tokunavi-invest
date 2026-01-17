import data from "@/data/stocks.json";

export type Stock = {
  code: string;
  name: string;
  months: number[];
  yield: number;
  benefit: string;
  price: number;      // 予算フィルタ用（仮）
  industry: string;   // 業種フィルタ用（仮）
};

export const stocks: Stock[] = data as Stock[];
