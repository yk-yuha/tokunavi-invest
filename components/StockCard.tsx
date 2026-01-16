import { Stock } from "@/lib/stocks";

type Props = {
  stock: Stock;
};

export default function StockCard({ stock }: Props) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontSize: 12, color: "#666" }}>
        証券コード：{stock.code}
      </div>

      <h2 style={{ fontSize: 18, margin: "6px 0" }}>
        {stock.name}
      </h2>

      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "#0a7cff",
        }}
      >
        {stock.yield}%
      </div>

      <div style={{ marginTop: 8, fontSize: 14 }}>
        🎁 株主優待：{stock.benefit}
      </div>
    </div>
  );
}
