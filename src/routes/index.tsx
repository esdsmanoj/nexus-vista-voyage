import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Hexagon } from "lucide-react";
import { useEcosystem } from "@/lib/ecosystem-store";
import { countProducts } from "@/data/ecosystem";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FutureTech Group — Interactive Corporate Ecosystem" },
      {
        name: "description",
        content:
          "Explore the FutureTech Group ecosystem: four specialist technology companies, their product categories and interactive 3D product showcases.",
      },
      { property: "og:title", content: "FutureTech Group — Interactive Corporate Ecosystem" },
      {
        property: "og:description",
        content:
          "A cinematic portal through AI, sovereign cloud, cybersecurity and quantum systems, with interactive 3D product exploration.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { data } = useEcosystem();
  const products = data.companies.reduce((n, c) => n + countProducts(c), 0);

  return (
    <div className="flex min-h-[78vh] flex-col items-center justify-center text-center">
      <div className="relative mb-10">
        <Hexagon className="h-24 w-24 text-primary" strokeWidth={0.8} />
        <span className="ft-pulse-ring absolute inset-0 rounded-full border border-primary/40" />
      </div>
      <p className="eyebrow text-primary">Corporate Technology Ecosystem</p>
      <h1 className="mt-6 max-w-5xl font-display text-5xl font-semibold leading-[1.05] text-glow md:text-7xl 2xl:text-8xl">
        {data.name}
      </h1>
      <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">{data.tagline}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground/80">
        {data.description}
      </p>

      <Link
        to="/ecosystem"
        className="group mt-12 inline-flex h-16 items-center gap-4 rounded-sm border border-primary bg-primary/10 px-10 text-sm uppercase tracking-[0.3em] text-primary transition-colors hover:bg-primary/20"
      >
        Enter Ecosystem
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>

      <dl className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-4">
        {[
          ["Companies", data.companies.length],
          ["Categories", data.companies.reduce((n, c) => n + c.categories.length, 0)],
          ["Products", products],
        ].map(([label, value]) => (
          <div key={label as string} className="glass clip-corner px-4 py-6">
            <dt className="eyebrow text-muted-foreground">{label}</dt>
            <dd className="mt-2 font-display text-4xl text-primary">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
