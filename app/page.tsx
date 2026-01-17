"use client";

import { useMemo, useState } from "react";
import StockCard from "@/components/StockCard";
import { stocks } from "@/lib/stocks";

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

const BUDGETS = [
  { label: "〜1万円", value: 10_000 },
  { label: "〜3万円", value: 30_000 },
  { label: "〜5万円", value: 50_000 },
  { label: "〜10万円", value: 100_000 },
  { label: "〜30万円", value: 300_000 },
  { label: "制限なし", value: Infinity },
] as const;

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [month, setMonth] = useState<number | "all">("all");
  const [budget, setBudget] = useState<number>(50_000);
  const [onlyBenefit, setOnlyBenefit] = useState(false);
  const [sort, setSort] = useState<"yield_desc" | "price_asc">("yield_desc");

  const filtered = useMemo(() => {
    const list = stocks
      .filter((s) => s.name.includes(keyword) || s.code.includes(keyword))
      .filter((s) =>
        month === "all" ? true : (s.months ?? []).includes(month)
      )
      .filter((s) => (s.price ?? Infinity) <= budget)
      .filter((s) =>
        onlyBenefit ? !!(s.benefit && s.benefit.trim()) : true
      );

    list.sort((a, b) => {
      if (sort === "yield_desc") return (b.yield ?? 0) - (a.yield ?? 0);
      return (a.price ?? Infinity) - (b.price ?? Infinity);
    });

    return list;
  }, [keyword, month, budget, onlyBenefit, sort]);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>トクナビ投資</h1>

      <p style={{ marginTop: 8, opacity: 0.7 }}>
        株主優待と利回りを、もっとわかりやすく。
      </p>

      {/* ✅ 今月の特集導線（p の下） */}
      <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[3, 6, 9, 12].map((m) => (
          <a
            key={m}
            href={`/month/${m}`}
            style={{
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "rgba(0,0,0,0.03)",
              fontSize: 13,
            }}
          >
            📅 {m}月特集 →
          </a>
        ))}
      </div>

      {/* フィルタバー */}
      <div
        style={{
          marginTop: 18,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
        }}
      >
        {/* 検索 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>検索</div>
          <input
            placeholder="銘柄名・コード"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* 権利確定月 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>権利確定月</div>
          <select
            value={month}
            onChange={(e) =>
              setMonth(e.target.value === "all" ? "all" : Number(e.target.value))
            }
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #ccc",
            }}
          >
            <option value="all">すべて</option>
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}月
              </option>
            ))}
          </select>
        </div>

        {/* 予算 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>予算（目安）</div>
          <select
            value={String(budget)}
            onChange={(e) =>
              setBudget(e.target.value === "Infinity" ? Infinity : Number(e.target.value))
            }
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #ccc",
            }}
          >
            {BUDGETS.map((b) => (
              <option key={b.label} value={String(b.value)}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* トグル＆並び替え */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={onlyBenefit}
            onChange={(e) => setOnlyBenefit(e.target.checked)}
          />
          <span>優待ありだけ</span>
        </label>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            border: "1px solid #ccc",
          }}
        >
          <option value="yield_desc">利回りが高い順</option>
          <option value="price_asc">予算が安い順</option>
        </select>

        <span style={{ opacity: 0.6, fontSize: 12 }}>
          表示件数：{filtered.length}
        </span>
      </div>

      {/* カード一覧 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginTop: 18,
        }}
      >
        {filtered.map((stock) => (
          <StockCard key={stock.code} stock={stock} />
        ))}
      </div>
    </main>
  );
}
