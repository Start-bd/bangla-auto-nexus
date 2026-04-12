import { useEffect, useState } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: 2847, suffix: "+", label: "গাড়ি" },
  { value: 156, suffix: "+", label: "যাচাইকৃত ডিলার" },
  { value: 42, suffix: "+", label: "জেলা" },
  { value: 34, suffix: "টি", label: "আজকেই নতুন গাড়ি" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="font-display text-3xl font-bold text-foreground md:text-4xl">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsCounter() {
  return (
    <section className="border-y border-border bg-card/50 py-8">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <AnimatedNumber target={stat.value} suffix={stat.suffix} />
            <p className="mt-1 text-sm text-muted-foreground font-bengali">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
