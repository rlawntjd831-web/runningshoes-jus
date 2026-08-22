import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata = {
  title: "러닝화 추천",
  description: "나에게 맞는 러닝화 찾기",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${notoSansKr.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-950">
        {children}
      </body>
    </html>
  );
}
