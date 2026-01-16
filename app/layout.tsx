import './globals.css';

export const metadata = {
  title: 'トクナビ投資',
  description: '株主優待と利回りを、もっとわかりやすく。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  );
}
