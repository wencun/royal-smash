"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LevelSearch from "./components/LevelSearch";

const items = [
  { href: "/", icon: "⌂", label: "Home", section: "" },
  { href: "/#guides", icon: "▣", label: "Level Guides", section: "guides" },
  { href: "/#download", icon: "↓", label: "Download", section: "download" },
  { href: "/#about", icon: "ⓘ", label: "About", section: "about" },
  { href: "/#faq", icon: "?", label: "FAQ", section: "faq" },
];

export default function SiteNavigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (pathname !== "/") return;

    const updateActiveSection = () => {
      const marker = window.scrollY + 130;
      let current = "";
      for (const item of items) {
        if (!item.section) continue;
        const section = document.getElementById(item.section);
        if (section && section.offsetTop <= marker) current = item.section;
      }
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [pathname]);

  return <>
    <nav aria-label="Main navigation">
      {items.map((item) => {
        const active = pathname === "/"
          ? activeSection === item.section
          : item.section === "guides" && (pathname === "/walkthrough" || pathname.startsWith("/level/"));
        return <Link className={active ? "active" : undefined} href={item.href} key={item.label} aria-current={active ? "page" : undefined}>
          <span aria-hidden="true">{item.icon}</span><span>{item.label}</span>
        </Link>;
      })}
    </nav>
    <LevelSearch />
  </>;
}
