import Link from "next/link";
import StockCard from "@/components/StockCard";
import { stocks } from "@/lib/stocks";
import type { Metadata } from "next";

export function generateMetadata({ params }: { params: { m: string } }): Metadata {
  const m = Number(params.m);

  return {
    title: `${m}月 権利確定の株主優待・高配当銘柄一覧｜トクナビ投資`,
    description: `${m}月に権利確定する株主優待銘柄・高配当銘柄を、利回り順で一覧化。予算目安や業種もあわせて比較できます。`,
    alternates: {
      canonical: `/month/${m}`,
    },
  };
}

type Props = {
  params: { m: string };
};

export default function MonthPage({ params }: Props) {
  const m = Number(params.m);

  const list = stocks
    .filter((s) => (s.months ?? []).includes(m))
    .sort((a, b) => (b.yield ?? 0) - (a.yield ?? 0));

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <Link href="/" style={{ textDecoration: "none", opacity: 0.75 }}>
          ← トップへ
        </Link>
        <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>
          {m}月 権利確定の優待・高利回り銘柄
        </h1>
      </div>

      <p style={{ marginTop: 10, opacity: 0.75 }}>
        {m}月に権利確定する銘柄を一覧表示しています（利回りが高い順）。
      </p>

      <div style={{ marginTop: 12, opacity: 0.65, fontSize: 12 }}>
        表示件数：{list.length}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginTop: 18,
        }}
      >
        {list.map((stock) => (
          <StockCard key={stock.code} stock={stock} />
        ))}
      </div>
    </main>
  );
}
