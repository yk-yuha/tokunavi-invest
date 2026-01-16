import StockCard from "@/components/StockCard";
import { stocks } from "@/lib/stocks";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>
        トクナビ投資
      </h1>

      <p style={{ marginTop: 8, opacity: 0.7 }}>
        株主優待と利回りを、もっとわかりやすく。
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginTop: 24,
        }}
      >
        {stocks.map((stock) => (
          <StockCard key={stock.code} stock={stock} />
        ))}
      </div>
    </main>
  );
}
