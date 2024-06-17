import ChatSidebar from "@/components/chat/ChatSidebar";
import React from "react";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <main className="flex h-screen">
      {<ChatSidebar />}
      {children}
    </main>
  );
};

export default Layout;
