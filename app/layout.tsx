export const metadata = { title: "Nova AI", description: "Professional AI" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body style={{margin:0,background:"#f8f9fb"}}>{children}</body></html>);
}
