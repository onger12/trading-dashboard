
export default function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-trading-blue bg-repeat">
      {children}
    </section>
  )
}
