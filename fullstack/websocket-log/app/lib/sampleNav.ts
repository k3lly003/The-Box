import type { LucideIcon } from "lucide-react";
import { BookOpen, Folder, FileText, Sparkles, Wrench } from "lucide-react";

export type NavNode =
  | {
      type: "folder";
      id: string;
      title: string;
      icon?: LucideIcon;
      children: NavNode[];
    }
  | {
      type: "article";
      id: string;
      title: string;
      to: "/docs/$slug";
      params: { slug: string };
      icon?: LucideIcon;
    };

// Mirrors the screenshots: “Getting started” + nested items.
export const SAMPLE_NAV: NavNode[] = [
  {
    type: "folder",
    id: "new",
    title: "New in IntelliJ IDEA 2025.3",
    icon: Sparkles,
    children: [
      {
        type: "article",
        id: "blog-posts",
        title: "Blog posts",
        to: "/docs/$slug",
        params: { slug: "blog-posts" },
        icon: FileText,
      },
    ],
  },
  {
    type: "folder",
    id: "getting-started",
    title: "Getting started",
    icon: BookOpen,
    children: [
      {
        type: "article",
        id: "unified-product",
        title: "IntelliJ IDEA as a unified product",
        to: "/docs/$slug",
        params: { slug: "intellij-idea-as-a-unified-product" },
        icon: FileText,
      },
      {
        type: "article",
        id: "accessibility",
        title: "Accessibility",
        to: "/docs/$slug",
        params: { slug: "accessibility" },
        icon: FileText,
      },
      {
        type: "folder",
        id: "overview",
        title: "IntelliJ IDEA overview",
        icon: Folder,
        children: [
          {
            type: "article",
            id: "overview-unified",
            title: "Unified IntelliJ IDEA Overview",
            to: "/docs/$slug",
            params: { slug: "unified-intellij-idea-overview" },
            icon: FileText,
          },
        ],
      },
      {
        type: "folder",
        id: "installation",
        title: "Installation guide",
        icon: Folder,
        children: [
          {
            type: "article",
            id: "first-run",
            title: "Run IntelliJ IDEA for the first time",
            to: "/docs/$slug",
            params: { slug: "run-intellij-idea-for-the-first-time" },
            icon: FileText,
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    id: "configuration",
    title: "IDE configuration",
    icon: Wrench,
    children: [],
  },
];










