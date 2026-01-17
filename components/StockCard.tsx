import { Stock } from "@/lib/stocks";

type Props = {
  stock: Stock;
};

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

export default function StockCard({ stock }: Props) {
  const monthsText =
    stock.months && stock.months.length > 0
      ? stock.months.slice().sort((a, b) => a - b).join("・") + "月"
      : "—";

  const hasBenefit = !!(stock.benefit && stock.benefit.trim());

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: 16,
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* 上段：コード + バッジ */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          alignItems: "flex-start",
        }}
      >
        <div style={{ fontSize: 12, color: "#666" }}>
          証券コード：{stock.code}
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {/* 権利確定月 */}
          <span
            style={{
              fontSize: 12,
              padding: "4px 8px",
              borderRadius: 999,
              background: "rgba(10,124,255,0.10)",
              color: "#0a7cff",
              border: "1px solid rgba(10,124,255,0.18)",
              whiteSpace: "nowrap",
            }}
            title="権利確定月"
          >
            📅 {monthsText}
          </span>

          {/* 優待あり */}
          {hasBenefit && (
            <span
              style={{
                fontSize: 12,
                padding: "4px 8px",
                borderRadius: 999,
                background: "rgba(34,197,94,0.12)",
                color: "#169c46",
                border: "1px solid rgba(34,197,94,0.2)",
                whiteSpace: "nowrap",
              }}
              title="優待あり"
            >
              🎁 優待あり
            </span>
          )}
        </div>
      </div>

      {/* 銘柄名 */}
      <h2 style={{ fontSize: 18, margin: "10px 0 6px", lineHeight: 1.25 }}>
        {stock.name}
      </h2>

      {/* 利回り：主役 */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <div
          style={{
            fontSize: 30,
            fontWeight: 900,
            color: "#0a7cff",
            letterSpacing: -0.3,
          }}
        >
          {stock.yield}%
        </div>
        <div style={{ fontSize: 12, opacity: 0.55 }}>配当利回り（目安）</div>
      </div>

      {/* 下段：優待内容 + 予算 */}
      <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
        <div style={{ fontSize: 14 }}>
          <span style={{ opacity: 0.75 }}>🎁 株主優待：</span>
          <span style={{ fontWeight: 600 }}>
            {hasBenefit ? stock.benefit : "—"}
          </span>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13, opacity: 0.85 }}>
          <span title="購入目安（仮の価格データ）">
            💰 予算目安：{typeof stock.price === "number" ? `¥${yen(stock.price)}` : "—"}
          </span>
          <span title="業種（仮データ）">
            🏷️ 業種：{stock.industry ?? "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
