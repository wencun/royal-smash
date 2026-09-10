"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LevelSearch() {
  const router = useRouter();
  const [level, setLevel] = useState("");
  const [error, setError] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const selected = Number(level);
    if (!Number.isInteger(selected) || selected < 51 || selected > 80) {
      setError(true);
      return;
    }
    setError(false);
    router.push(`/level/${selected}`);
  }

  return (
    <form className={`level-search${error ? " is-invalid" : ""}`} onSubmit={submit}>
      <span aria-hidden="true">⌕</span>
      <input aria-label="Search levels 51 through 80" inputMode="numeric" value={level} onChange={(event) => setLevel(event.target.value)} placeholder={error ? "Enter 51–80" : "Search level"} />
      <button type="submit" aria-label="Open level guide">Go</button>
    </form>
  );
}
