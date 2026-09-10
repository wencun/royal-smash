"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const items = [
  { href: "/", icon: "⌂", label: "Home", hash: "" },
  { href: "/walkthrough", icon: "▣", label: "Guides", hash: "" },
  { href: "/#tips", icon: "★", label: "Tips", hash: "#tips" },
  { href: "/#about", icon: "ⓘ", label: "About", hash: "#about" },
];

export default function SiteNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  function searchLevel(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const level = Number(data.get("level"));
    if (Number.isInteger(level) && level >= 51 && level <= 80) {
      router.push(`/level/${level}`);
    }
  }

  return <>
    <nav aria-label="Main navigation">
      {items.map((item) => {
        const active = item.hash
          ? pathname === "/" && hash === item.hash
          : pathname === item.href && (item.href !== "/" || !hash);
        return <Link className={active ? "active" : undefined} href={item.href} key={item.label} scroll>
          <span aria-hidden="true">{item.icon}</span><span>{item.label}</span>
        </Link>;
      })}
    </nav>
    <form className="level-search" onSubmit={searchLevel}>
      <span aria-hidden="true">⌕</span>
      <input aria-label="Search level" name="level" type="number" min="51" max="80" placeholder="Search level" required />
    </form>
  </>;
}
