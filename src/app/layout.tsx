import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: "Christopher Lee",
  description: "Econometrician | Associate Lecturer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${lora.variable} antialiased`}>
        <Providers>
          <Navbar />
          <main>{children}</main>

          <footer className="fixed bottom-0 left-0 w-full text-center py-2 bg-gray-50 text-gray-500 text-[10px] border-t border-gray-200 dark:bg-gray-900 dark:text-gray-400">
            Market data shown are delayed or simulated and provided for educational purposes only.
            Not intended for trading or financial advice.
          </footer>
        </Providers>
      </body>
    </html>
  );
}
