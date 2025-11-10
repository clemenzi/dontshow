import { ThemeProvider } from "./theme-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dontshow-theme">
      {children}
    </ThemeProvider>
  );
}
