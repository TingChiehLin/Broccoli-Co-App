import "../styles/globals.css";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${roboto.className} h-full`}>
      <body className="h-full flex flex-col">
        <nav className="w-full h-20 bg-primaryGray flex items-center">
          <div className="w-full max-w-xl pl-6 md:pl-6 xl:pl-0 md:max-w-5xl xl:max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-4xl uppercase text-[#FFFFFF] cursor-pointer">
              Broccoli & co
            </h1>
          </div>
        </nav>
        <main className="flex justify-center items-center py-16 flex-1">
          {children}
        </main>
        <footer className="w-full h-20 flex justify-center items-center bg-primaryGray text-[#FFFFFF]">
          <div className="text-xs md:text-sm text-center font-light">
            Made with ❤ ️in Melbourne.
            <br />© 2022 Broccoli & Co. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
