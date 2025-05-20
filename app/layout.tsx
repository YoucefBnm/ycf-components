import { RootProvider } from "fumadocs-ui/provider";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s — Systaliko UI",
    default:
      "Systaliko UI — A collection of components for creating animated UIs with React and Tailwind CSS.",
  },
  description:
    "Fully customizable components for creating animated UIs with React and Tailwind CSS. Browse a list of components you can install, modify, and use in your projects.",
  keywords: [
    "Systaliko UI",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Motion",
    "Animations",
    "UI Library",
    "Open-source components",
    "Animated UI components",
  ],
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  ],
  authors: [
    {
      name: "Youcef Bnm",
      url: "https://github.com/youcefbnm",
    },
  ],
  publisher: "Systaliko UI",
  openGraph: {
    title: "Systaliko UI",
    description:
      "Fully customizable components for creating animated UIs with React and Tailwind CSS. Browse a list of components you can install, modify, and use in your projects.",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "Systaliko UI",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" style={{ fontFamily: "Arial, sans-serif" }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RootProvider>{children}</RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
