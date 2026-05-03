import Link from "next/link";
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/*  Section primitives — thin wrappers over the recipe class names defined in
 *  src/app/recipes.css. They exist to keep page composition readable; the
 *  recipes do the styling. */
/* -------------------------------------------------------------------------- */

type BandVariant = "midnight" | "section" | "default";

interface BandProps
  extends Omit<HTMLAttributes<HTMLElement>, "id">,
    PropsWithChildren {
  variant?: BandVariant;
  /** Optional id used as the section's anchor target for in-page nav. */
  id?: string;
  /** Extra recipe modifier class (e.g. "hero hero--fold", "people-fold"). */
  modifier?: string;
  /** Extra Tailwind/utility classes for structural plumbing only. */
  className?: string;
  /** When set, wraps children in a `.container`. Default true. */
  containerized?: boolean;
  /** Aria-labelledby pointing at the section's heading id. */
  ariaLabelledBy?: string;
}

export function Band({
  variant = "default",
  id,
  modifier,
  className,
  containerized = true,
  ariaLabelledBy,
  children,
  ...rest
}: BandProps) {
  const cls = [`band-${variant}`, modifier, className].filter(Boolean).join(" ");
  return (
    <section
      id={id}
      className={cls}
      aria-labelledby={ariaLabelledBy}
      {...rest}
    >
      {containerized ? <div className="container">{children}</div> : children}
    </section>
  );
}

/* -------------------------------------------------------------------------- */

interface SectionHeadProps {
  eyebrow?: ReactNode;
  /** Renders inside <h2> by default; pass `as="h1"` for hero contexts. */
  display: ReactNode;
  /** When set, the display element gets this id (links the band's
   *  aria-labelledby to the heading). */
  displayId?: string;
  as?: "h1" | "h2" | "h3";
  lede?: ReactNode;
  /** Wide variant for high-content section heads (e.g. /faq). */
  wide?: boolean;
}

export function SectionHead({
  eyebrow,
  display,
  displayId,
  as = "h2",
  lede,
  wide,
}: SectionHeadProps) {
  const Heading = as;
  return (
    <header className={`section-head${wide ? " section-head--wide" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading className="display" id={displayId}>
        {display}
      </Heading>
      {lede ? <p className="lede">{lede}</p> : null}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  BtnPill — recipe class .btn-pill {.btn-pill--primary | .btn-pill--ghost}.
 *  Polymorphic: href → <Link>, otherwise <button>. */
/* -------------------------------------------------------------------------- */

type BtnPillVariant = "primary" | "ghost";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  variant?: BtnPillVariant;
  className?: string;
  children: ReactNode;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  variant?: BtnPillVariant;
  children: ReactNode;
};

export function BtnPill(props: LinkProps | ButtonProps) {
  const { variant = "primary", className, children } = props;
  const cls = ["btn-pill", `btn-pill--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, className: _c, children: _ch, ...rest } = props;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    variant: _vb,
    className: _cb,
    children: _chb,
    href: _hb,
    ...rest
  } = props as ButtonProps;
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
