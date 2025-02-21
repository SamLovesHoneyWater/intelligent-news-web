// app/panel/layout.tsx
export default function PanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-gray-900">
      {children}
    </main>
  );
}
