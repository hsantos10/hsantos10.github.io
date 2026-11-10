import { useEffect, useState, type ReactNode } from "react"
import { ArrowUpRight, Mail, Moon, Sun } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  EDUCATION, EXPERIENCE, HERO, PUBLICATIONS, RECENT, SKILLS, STATS, WORK, type Item,
} from "@/content"

const BASE = import.meta.env.BASE_URL
const EMAIL = "hsantos@tamu.edu"

/* ---------- brand icons (lucide no longer ships logos) ---------- */
const GithubIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
)
const ScholarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.84 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.16 4.44L24 9.5z" /></svg>
)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
)
const OrcidIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM7.4 5.6a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM6.6 9h1.6v9.4H6.6zm3.6 0h4.2c3.5 0 5.1 2.5 5.1 4.7 0 2.4-1.9 4.7-5.1 4.7h-4.2zm1.6 1.4v6.6h2.5c2.8 0 3.6-2 3.6-3.3 0-2-1.3-3.3-3.6-3.3z" /></svg>
)
const SOCIALS = [
  { name: "GitHub", href: "https://github.com/hsantos10", Icon: GithubIcon },
  { name: "Google Scholar", href: "https://scholar.google.com/citations?user=6mW6k2QAAAAJ", Icon: ScholarIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/davidsantosb", Icon: LinkedinIcon },
  { name: "ORCID", href: "https://orcid.org/0009-0005-0113-5067", Icon: OrcidIcon },
]

const NAV = [
  ["about", "About"], ["work", "Work"], ["publications", "Publications"],
  ["experience", "Experience"], ["skills", "Skills"],
] as const

const TABS = [
  ["all", "All"], ["ml", "Applied ML"], ["robotics", "Robotics & embedded"], ["systems", "Systems & viz"],
] as const

/* ---------- small helpers ---------- */
const ext = { target: "_blank", rel: "noopener noreferrer" } as const
const mainLink = (it: Item) => it.links?.find(([, u]) => u)?.[1]

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">{children}</p>
}

function Section({ id, eyebrow, title, lead, children }: {
  id: string; eyebrow: string; title?: string; lead?: ReactNode; children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 pt-20">
      <div className="mb-7">
        <Eyebrow>{eyebrow}</Eyebrow>
        {title && <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>}
        {lead && <p className="mt-2 max-w-prose text-muted-foreground">{lead}</p>}
      </div>
      {children}
    </section>
  )
}

function Links({ it, className }: { it: Item; className?: string }) {
  const links = (it.links ?? []).filter(([, u]) => u)
  if (!links.length && !it.status?.length) return null
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {links.map(([label, url]) => (
        <Badge key={url} variant="outline" asChild>
          <a href={url} {...ext}>{label}<ArrowUpRight data-icon="inline-end" /></a>
        </Badge>
      ))}
      {it.status?.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
    </div>
  )
}

function Title({ it }: { it: Item }) {
  const href = mainLink(it)
  return href
    ? <a href={href} {...ext} className="underline-offset-4 hover:underline">{it.title}</a>
    : <>{it.title}</>
}

function Authors({ text }: { text: string }) {
  const parts = text.split(/(H\. ?D\. Santos|H\. Santos|D\. Santos)/)
  return <>{parts.map((p, i) => i % 2
    ? <span key={i} className="font-medium text-foreground underline decoration-ring underline-offset-4">{p}</span>
    : p)}</>
}

/* ---------- theme ---------- */
function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"))
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])
  const toggle = () => setDark((d) => {
    try { localStorage.setItem("theme", d ? "light" : "dark") } catch { /* storage blocked */ }
    return !d
  })
  return { dark, toggle }
}

/* ---------- active section in nav ---------- */
function useActiveSection() {
  const [active, setActive] = useState("")
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    )
    document.querySelectorAll("main section[id]").forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
  return active
}

/* ---------- page ---------- */
export default function App() {
  const { dark, toggle } = useTheme()
  const active = useActiveSection()
  const [tab, setTab] = useState("all")

  const shown = WORK.filter((w) => tab === "all" || w.tags.includes(tab))
  const withImg = shown.filter((w) => "img" in w && w.img)
  const textOnly = shown.filter((w) => !("img" in w && w.img))

  return (
    <div className="min-h-svh">
      {/* header */}
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4 sm:px-6">
          <a href="#" className="mr-auto font-mono text-sm font-semibold tracking-[0.12em] uppercase">David Santos</a>
          <nav className="hidden gap-0.5 md:flex">
            {NAV.map(([id, label]) => (
              <Button key={id} variant="ghost" size="sm" asChild
                className={cn("text-muted-foreground", active === id && "bg-muted text-foreground")}>
                <a href={`#${id}`}>{label}</a>
              </Button>
            ))}
          </nav>
          <Button variant="outline" size="sm" asChild><a href="#contact">Contact</a></Button>
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle dark mode">
            {dark ? <Sun /> : <Moon />}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* hero */}
        <div className="grid items-center gap-8 pt-10 pb-4 md:grid-cols-[1fr_240px] md:gap-14 md:pt-20">
          <div>
            <Avatar className="mb-6 size-24 rounded-2xl md:hidden">
              <AvatarImage src={`${BASE}img/me.jpg`} alt="David Santos" className="object-cover" />
              <AvatarFallback className="rounded-2xl">DS</AvatarFallback>
            </Avatar>
            <Badge variant="outline" className="h-6 gap-1.5 px-2.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />{HERO.open}
            </Badge>
            <h1 className="mt-5 mb-4 text-5xl leading-[1.02] font-bold tracking-tighter sm:text-6xl">David Santos</h1>
            <p className="mb-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs font-medium tracking-[0.12em] uppercase sm:text-sm">
              {HERO.roles.map((r, i) => (
                <span key={r} className="flex gap-3">{i > 0 && <span className="text-border">/</span>}{r}</span>
              ))}
            </p>
            <p className="max-w-[62ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              I'm a Ph.D. candidate in Electrical Engineering at <span className="font-medium text-foreground">Texas A&amp;M</span>,
              and I build the whole path from raw sensor data to a system running in production. My research asks why models
              that <span className="font-medium text-foreground">look accurate in validation fail after deployment</span>, and
              how much of a reported result depends on who was held out.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <Button size="lg" asChild><a href="#contact">Let's connect</a></Button>
              <Button size="lg" variant="outline" asChild><a href="#work">See my work</a></Button>
              <div className="ml-1 flex">
                {SOCIALS.map(({ name, href, Icon }) => (
                  <Tooltip key={name}>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon-lg" asChild className="text-muted-foreground">
                        <a href={href} {...ext} aria-label={name}><Icon /></a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{name}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
          <figure className="hidden md:block">
            <img src={`${BASE}img/me.jpg`} alt="David Santos"
              className="aspect-square w-full rounded-2xl object-cover shadow-sm ring-1 ring-foreground/10" />
            <figcaption className="mt-2.5 text-center text-xs text-muted-foreground">College Station, Texas</figcaption>
          </figure>
        </div>

        {/* recently */}
        <section id="recent" className="pt-14">
          <Eyebrow>Happening recently…</Eyebrow>
          <div className="grid gap-4 md:grid-cols-3">
            {RECENT.map((r) => (
              <Card key={r.title}>
                <CardHeader>
                  <p className="font-mono text-xs text-muted-foreground">{r.date}</p>
                  <CardTitle className="mt-1">{r.title}</CardTitle>
                  <CardDescription>{r.text}</CardDescription>
                </CardHeader>
                {r.href && (
                  <CardContent className="mt-auto">
                    <Badge variant="outline" asChild>
                      <a href={r.href} {...ext}>{r.cta}<ArrowUpRight data-icon="inline-end" /></a>
                    </Badge>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* story */}
        <section id="about" className="scroll-mt-20 pt-20">
          <div className="grid items-start gap-8 md:grid-cols-[1.3fr_1fr] md:gap-12">
            <div className="space-y-4 text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground">
              <div>
                <Eyebrow>It all started when…</Eyebrow>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">From radio towers to physical AI</h2>
              </div>
              <p>I started as an <strong>RF engineer at Huawei</strong> in Bogotá, planning radio networks for large telecom rollouts.
                At Universidad Javeriana I moved into embedded systems, working with <strong>IHP Microelectronics</strong> in Germany on
                self-healing sensor networks and wake-up radio firmware for a custom chip, and I taught analog and digital electronics there for five years.</p>
              <p>Then came industry IoT. I shipped connected devices at IoT Corporation, put edge monitoring on <strong>400+ buses</strong>,
                and ran Industry 4.0 pilots with the Centre for the Fourth Industrial Revolution in Medellín.</p>
              <p>At Texas A&amp;M my dissertation, <em>Closing the Credibility Gap in Physical AI</em>, covers human biomechanics, field
                motion capture and cross-embodiment robot policies. Along the way I build the systems that go with it: digital twins,
                streaming backends, LLM agents and browser tools for terabyte-scale climate data.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <Card key={s.l} size="sm">
                  <CardContent>
                    <p className="text-2xl font-semibold tracking-tight">{s.n}</p>
                    <p className="text-xs text-muted-foreground">{s.l}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* work */}
        <Section id="work" eyebrow="My work includes…" title="Selected work"
          lead="Research and systems, each with a real figure, a screenshot or code.">
          <Tabs value={tab} onValueChange={setTab} className="mb-6 max-w-full overflow-x-auto">
            <TabsList>
              {TABS.map(([k, label]) => (
                <TabsTrigger key={k} value={k}>
                  {label}
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {k === "all" ? WORK.length : WORK.filter((w) => w.tags.includes(k)).length}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {withImg.map((it) => (
              <Card key={it.title} className="pt-0 transition-shadow hover:shadow-md">
                <div className="aspect-[16/10] overflow-hidden border-b bg-white">
                  <img src={`${BASE}img/${it.img}`} alt="" loading="lazy" className="size-full object-cover" />
                </div>
                <CardHeader>
                  <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">{it.kicker}</p>
                  <CardTitle className="leading-snug"><Title it={it} /></CardTitle>
                  <CardDescription className="leading-relaxed">{it.blurb}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto border-0 bg-transparent pb-4"><Links it={it} /></CardFooter>
              </Card>
            ))}
          </div>

          {textOnly.length > 0 && (
            <>
              <div className="mt-10 mb-4"><Eyebrow>More projects</Eyebrow></div>
              <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {textOnly.map((it) => (
                  <Card key={it.title}>
                    <CardHeader>
                      <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">{it.kicker}</p>
                      <CardTitle className="leading-snug"><Title it={it} /></CardTitle>
                      <CardDescription className="leading-relaxed">{it.blurb}</CardDescription>
                    </CardHeader>
                    {(it.links?.length ?? 0) > 0 && <CardContent><Links it={it} /></CardContent>}
                  </Card>
                ))}
              </div>
            </>
          )}
        </Section>

        {/* publications */}
        <Section id="publications" eyebrow="Publications" title="Papers"
          lead={<>The full list, also on <a className="underline underline-offset-4" href={SOCIALS[3].href} {...ext}>ORCID</a> and{" "}
            <a className="underline underline-offset-4" href={SOCIALS[1].href} {...ext}>Google Scholar</a>.</>}>
          <Card className="gap-0 py-0">
            {PUBLICATIONS.map((p, i) => (
              <div key={p.title}>
                {i > 0 && <Separator />}
                <div className="grid gap-2 p-4 sm:grid-cols-[56px_1fr_auto] sm:gap-5 sm:p-5">
                  <span className="font-mono text-sm text-muted-foreground">{p.year}</span>
                  <div>
                    <h3 className="font-medium leading-snug"><Title it={p} /></h3>
                    <p className="mt-1 text-sm text-muted-foreground"><Authors text={p.authors} /></p>
                    <p className="text-sm text-muted-foreground">{p.venue}</p>
                  </div>
                  <Links it={p} className="sm:flex-nowrap sm:justify-end" />
                </div>
              </div>
            ))}
          </Card>
        </Section>

        {/* experience */}
        <Section id="experience" eyebrow="The story continues…" title="Experience"
          lead="Research, industry and teaching across the US, Colombia and Germany.">
          <ol className="relative space-y-7 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-border">
            {EXPERIENCE.map((x, i) => (
              <li key={x.title} className="relative pl-8">
                <span className={cn("absolute top-1.5 left-0 size-[11px] rounded-full border-2 bg-background",
                  i === 0 ? "border-foreground bg-foreground" : "border-ring")} />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-medium">{x.title}</h3>
                  <time className="font-mono text-xs text-muted-foreground">{x.date}</time>
                </div>
                <p className="text-sm">{x.org} <span className="text-muted-foreground">· {x.place}</span></p>
                <p className="mt-1.5 max-w-[78ch] text-sm leading-relaxed text-muted-foreground">{x.blurb}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* skills */}
        <Section id="skills" eyebrow="Toolbox" title="Skills">
          <div className="grid gap-3 sm:grid-cols-2">
            {SKILLS.map((s) => (
              <Card key={s.group} size="sm">
                <CardHeader><CardTitle className="text-sm">{s.group}</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-1.5">
                  {s.items.map((i) => <Badge key={i} variant="secondary">{i}</Badge>)}
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* education */}
        <Section id="education" eyebrow="Education" title="Degrees">
          <Card className="gap-0 py-0">
            {EDUCATION.map((e, i) => (
              <div key={e.title}>
                {i > 0 && <Separator />}
                <div className="grid gap-2 p-4 sm:grid-cols-[56px_1fr] sm:gap-5 sm:p-5">
                  <span className="font-mono text-sm text-muted-foreground">{e.date.match(/\d{4}/)?.[0]}</span>
                  <div>
                    <h3 className="font-medium">{e.title}</h3>
                    <p className="text-sm text-muted-foreground">{e.org} · {e.date}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{e.blurb}</p>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </Section>

        {/* contact */}
        <section id="contact" className="scroll-mt-20 pt-20">
          <Card className="items-center px-6 py-10 text-center">
            <Eyebrow>Let's keep in touch…</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Working on physical AI, robotics or ML systems?</h2>
            <p className="max-w-prose text-muted-foreground">
              I'm happy to talk about research, collaborations and roles. Email is the fastest way to reach me.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2.5">
              <Button size="lg" asChild><a href={`mailto:${EMAIL}`}><Mail data-icon="inline-start" />Email me</a></Button>
              <Button size="lg" variant="outline" asChild><a href={SOCIALS[2].href} {...ext}>LinkedIn</a></Button>
              <Button size="lg" variant="outline" asChild><a href={SOCIALS[0].href} {...ext}>GitHub</a></Button>
            </div>
          </Card>
        </section>
      </main>

      <footer className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2 px-4 pt-10 pb-12 text-sm text-muted-foreground sm:px-6">
        <span>© {new Date().getFullYear()} Hernan David Santos Barrera</span>
        <span>College Station, Texas</span>
      </footer>
    </div>
  )
}
