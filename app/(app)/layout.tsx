// App routes inherit AppShell from root layout (app/layout.tsx)
// This layout exists only to provide the route group boundary for (app)/ routes
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
