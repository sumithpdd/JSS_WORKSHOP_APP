import Link from "next/link";

export function SitecoreLogo({
  className = "h-7 w-auto",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const tone = variant === "dark" ? "brightness-0" : "";
  return (
    // The wordmark is the official Sitecore logo SVG. next/image does not optimize SVG.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/sitecore-logo.svg"
      alt="Sitecore"
      className={`${className} ${tone}`}
    />
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-sitecore-navy text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-4">
          <SitecoreLogo />
          <span className="hidden h-5 w-px bg-white/30 sm:block" />
          <span className="hidden text-sm font-medium tracking-wide text-white/90 sm:block">
            JSS Workshop
          </span>
        </Link>
        <a
          href="https://www.sitecore.com/"
          className="text-xs font-medium uppercase tracking-[0.16em] text-white/70 hover:text-white"
          target="_blank"
          rel="noreferrer"
        >
          sitecore.com
        </a>
      </div>
    </header>
  );
}
