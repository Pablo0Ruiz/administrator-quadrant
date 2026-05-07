import type { ReactNode } from "react";

interface EditorLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export const EditorLayout = ({ sidebar, children }: EditorLayoutProps) => {
  return (
    <div className="flex w-full h-screen min-h-0 bg-background overflow-hidden">
      <aside className="w-[320px] shrink-0 border-r border-border bg-sidebar backdrop-blur-sidebar flex flex-col z-20 shadow-glass">
        <div className="flex-1 overflow-y-auto px-8 py-10">
          {sidebar}
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-background relative overflow-hidden">
        {children}
      </main>
    </div>
  );
};
