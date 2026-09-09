import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guideBySlug, guides } from "../content";

export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = guideBySlug((await params).slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.description, alternates: { canonical: `/${guide.slug}` } };
}

export default async function GuideRoute({ params }: { params: Promise<{ slug: string }> }) {
  const guide = guideBySlug((await params).slug);
  if (!guide) notFound();
  const nextGuides = guide.next.map(guideBySlug).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, dateModified: guide.checked, author: { "@type": "Organization", name: "College Football Mobile 27 Guide" } };
  return <main><nav className="nav" aria-label="Main navigation"><Link href="/" className="brand">CFB <span>MOBILE 27</span></Link><Link href="/">All guides</Link><a href="#sources">Sources</a></nav><article className="article"><p className="kicker">{guide.eyebrow}</p><h1>{guide.title}</h1><div className="article-meta"><span className={`status ${guide.status.toLowerCase().replace(" ", "-")}`}>{guide.status}</span><span>Last checked {guide.checked}</span></div><aside className="quick-answer">{guide.quickAnswer}</aside>{guide.sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.body}</section>)}<section id="sources"><h2>Sources</h2><ul className="sources">{guide.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label} <span>↗</span></a></li>)}</ul></section><aside className="next-guides"><p className="kicker">NEXT GUIDE</p>{nextGuides.map((item) => <Link key={item.slug} href={`/${item.slug}`}><b>{item.label}</b><span>{item.description}</span></Link>)}</aside></article><footer><p>Independent fan guide. Not affiliated with Electronic Arts.</p><p><Link href="/">College Football Mobile 27 Guide</Link></p></footer><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /></main>;
}
