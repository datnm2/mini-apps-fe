import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo List - Simple Task Manager",
  description: "Free online todo list app. Manage your daily tasks efficiently. Simple, fast, and easy to use task manager.",
  keywords: ["todo list", "task manager", "online todo", "free todo app", "task list", "productivity"],
  openGraph: {
    title: "Todo List - Simple Task Manager",
    description: "Free online todo list app. Manage your daily tasks efficiently.",
    type: "website",
  }
};

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
