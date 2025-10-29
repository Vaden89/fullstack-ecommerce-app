"use client";

import Image from "next/image";
import { createContext, useContext, useState } from "react";

interface PageContextType {
  setPageTitle: (title: string) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [pageTitle, setPageTitle] = useState("Dashboard");

  return (
    <PageContext value={{ setPageTitle }}>
      <main className="w-full">
        <PageHeader title={pageTitle} />
        <div className="w-full h-full p-5">{children}</div>
      </main>
    </PageContext>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);

  if (!context) {
    throw new Error(
      "usePage can only be used by a component wrapped within a pageProvider",
    );
  }

  return context;
};

const PageHeader = ({ title }: { title: string }) => {
  return (
    <div className="w-full bg-sidebar h-16 border-b flex items-center justify-between px-4">
      <h1 className="text-xl font-semibold">{title}</h1>

      <div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="font-medium text-sm">Isaac Shosanya</span>
            <div className="text-xs text-muted-foreground flex gap-2 items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Online</span>
            </div>
          </div>
          <Image
            src="/images/avater.jpeg"
            width={36}
            height={36}
            alt="avatar"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
