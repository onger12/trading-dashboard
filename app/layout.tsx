import './ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.0.0/d3.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/d3plus/1.9.2/d3plus.full.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.28.1/dist/apexcharts.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.28.1/dist/apexcharts.min.js.map"></script>
      <body>{children}</body>
    </html>
  );
}
