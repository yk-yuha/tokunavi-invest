import './globals.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "トクナビ投資｜株主優待と利回りを、もっとわかりやすく",
    template: "%s｜トクナビ投資",
  },
  description:
    "株主優待・高配当銘柄を、権利確定月・予算・業種でわかりやすく比較できる投資情報サイト。",
  keywords: [
    "株主優待",
    "高配当",
    "配当利回り",
    "日本株",
    "投資初心者",
    "権利確定日",
  ],
  openGraph: {
    title: "トクナビ投資",
    description:
      "株主優待と利回りを、もっとわかりやすく。",
    siteName: "トクナビ投資",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
