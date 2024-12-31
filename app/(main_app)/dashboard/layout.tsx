export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div suppressHydrationWarning>{children}</div>;
}
