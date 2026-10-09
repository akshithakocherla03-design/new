import { useEffect, type CSSProperties } from "react"
import lumiereLogo from "@/imports/LUMIERE_light_bg_2x-2.png"

const asset = (name: string) => `/assets/${name}`

const stories = [
  {
    image: "bdc4d.png",
    eyebrow: "Congo Basin climate significance",
    title: "2nd largest rainforest",
    copy: "DRC hosts a globally significant carbon sink critical to international climate stability.",
  },
  {
    image: "2e0c6.png",
    eyebrow: "National registry coverage",
    title: "26 provinces",
    copy: "Climate projects and mitigation activities tracked under sovereign registry governance.",
  },
  {
    image: "abe8d.png",
    eyebrow: "Article 6 readiness",
    title: "UNFCCC-aligned",
    copy: "Registry infrastructure designed for internationally transferred mitigation outcomes (ITMOs).",
  },
  {
    image: "cadfa.png",
    eyebrow: "Registry integrity",
    title: "Transparent accounting",
    copy: "Immutable tracking of issuance, transfer, retirement, and cancellation events.",
  },
  {
    image: "c1e5b.png",
    eyebrow: "Authorized climate activities",
    title: "Government-led",
    copy: "Projects undergo sovereign review, verification, and authorization workflows.",
  },
  {
    image: "3de4c.png",
    eyebrow: "International cooperation",
    title: "Article 6.2",
    copy: "Supporting bilateral climate cooperation and high-integrity mitigation outcomes.",
  },
]

const portals = [
  {
    image: "bdc4d.png",
    icon: "5444c.svg",
    title: "Government Registry",
    copy: "Oversee the national registry, authorize projects, and manage market operations.",
  },
  {
    image: "f8321.png",
    icon: "79e3d.svg",
    title: "Developer Portal",
    copy: "Submit climate projects, issue ITMOs, and manage your verified portfolio.",
  },
  {
    image: "3de4c.png",
    icon: "fb69c.svg",
    title: "Buyer Portal",
    copy: "Discover verified projects, place competitive bids, and track investments.",
  },
]

const categories = [
  ["All categories", "60", "#72cf70"],
  ["Energy Efficiency - Domestic", "29", "#72cf70"],
  ["A/R", "4", "#75aee7"],
  ["Afforestation / Reforestation (A/R)", "1", "#e79255"],
  ["REDD+ / forest conservation", "1", "#72cf70"],
  ["Energy industries (renewable/non-renewable sources)", "3", "#75aee7"],
  ["ARR", "3", "#75aee7"],
  ["ARR, REDD, WRC", "1", "#72cf70"],
  ["IFM", "1", "#e79255"],
  ["REDD", "14", "#75aee7"],
  ["Energy demand", "3", "#e79255"],
]

const features = [
  {
    icon: "546dc.svg",
    title: "Article 6 Compliance",
    copy: "Fully compliant with Paris Agreement Article 6 frameworks and international standards",
  },
  {
    icon: "e5fd5.svg",
    title: "Blockchain Security",
    copy: "Every transaction recorded on blockchain for complete transparency and immutability",
  },
  {
    icon: "38fe7.svg",
    title: "Global Marketplace",
    copy: "Connect with governments, corporations, and foundations worldwide",
  },
  {
    icon: "9fd44.svg",
    title: "Instant Verification",
    copy: "Real-time project verification and ITMO issuance tracking",
  },
  {
    icon: "b8735.svg",
    title: "Competitive Bidding",
    copy: "Dynamic marketplace where buyers compete for premium carbon credits",
  },
  {
    icon: "b78f3.svg",
    title: "PPP Partnership",
    copy: "Public-Private Partnership between DRC Government and M&M Greentech",
  },
]

const stewardshipBenefits = [
  {
    icon: "b8735.svg",
    title: "Forest Protection",
    copy: "Safeguarding primary rainforest ecosystems through verified carbon activities.",
  },
  {
    icon: "38fe7.svg",
    title: "Global Climate Impact",
    copy: "Contributing to international mitigation goals via high-integrity outcomes.",
  },
  {
    icon: "b78f3.svg",
    title: "Community Development",
    copy: "Supporting local livelihoods alongside transparent registry participation.",
  },
  {
    icon: "546dc.svg",
    title: "Sustainable Economic Growth",
    copy: "Enabling long-term green investment aligned with sovereign climate policy.",
  },
]

function useScrollReveal() {
  useEffect(() => {
    const elements = [
      ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
    ]
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function useStewardshipScroll() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".stewardship")
    const grid = document.querySelector<HTMLElement>(".stewardship__grid")
    const desktop = window.matchMedia("(min-width: 901px)")
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    if (!section || !grid) return

    let frame = 0
    const update = () => {
      frame = 0

      if (!desktop.matches || reduceMotion.matches) {
        grid.style.removeProperty("--stewardship-shift")
        return
      }

      const rect = section.getBoundingClientRect()
      const distance = Math.max(rect.height, 1)
      const progress = Math.min(Math.max(-rect.top / distance, 0), 1)
      grid.style.setProperty(
        "--stewardship-shift",
        `${Math.round(progress * -64)}px`,
      )
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)
    desktop.addEventListener("change", requestUpdate)
    reduceMotion.addEventListener("change", requestUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      desktop.removeEventListener("change", requestUpdate)
      reduceMotion.removeEventListener("change", requestUpdate)
    }
  }, [])
}

function delay(index: number, step = 90): CSSProperties {
  return { "--reveal-delay": `${index * step}ms` } as CSSProperties
}

function ArrowButton({
  children,
  href = "#",
  icon = "936a3.svg",
}: {
  children: React.ReactNode
  href?: string
  icon?: string
}) {
  return (
    <a className="button" href={href}>
      <span>{children}</span>
      <img src={asset(icon)} alt="" />
    </a>
  )
}

function App() {
  useScrollReveal()
  useStewardshipScroll()

  const scrollToRegistry = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    document.querySelector("#registry")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    })
  }

  return (
    <main>
      <section className="hero" id="home">
        <img className="hero__image" src={asset("9687c.png")} alt="" />
        <div className="hero__shade" />
        <header className="nav">
          <a className="nav__logo" href="#home" aria-label="Lumière DRC home">
            <img
              src={lumiereLogo}
              alt="Lumière"
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </a>
          <nav aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#marketplace">Marketplace</a>
            <a href="#registry">Registry</a>
          </nav>
          <a className="nav__contact" href="#footer">
            <i /> Contact us
          </a>
        </header>

        <div className="hero__content">
          <a className="hero__badge" href="#registry">
            Explore registry <img src={asset("47161.svg")} alt="" />
          </a>
          <h1 aria-label="Sovereign carbon infrastructure for a more transparent climate future.">
            {"Sovereign carbon infrastructure for a more transparent climate future."
              .split(" ")
              .map((word, index) => (
                <span
                  className="hero-word"
                  style={
                    {
                      "--word-delay": `${500 + index * 55}ms`,
                    } as CSSProperties
                  }
                  aria-hidden="true"
                  key={`${word}-${index}`}
                >
                  {word}
                  {index < 8 ? " " : ""}
                </span>
              ))}
          </h1>
          <a
            className="scroll-cue"
            href="#registry"
            aria-label="Explore climate projects"
            onClick={scrollToRegistry}
          >
            <img src={asset("668b7.svg")} alt="" />
          </a>
        </div>
        <div className="hero__meta">
          <span>Democratic Republic of the Congo</span>
          <span>Article 6 ready</span>
        </div>
      </section>

      <section className="stories section-light" id="registry">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">From the registry</p>
              <h2>Insights &amp; field notes</h2>
            </div>
            <a className="text-link" href="#stories">
              View all stories <img src={asset("f229e.svg")} alt="" />
            </a>
          </div>
          <div className="story-grid" id="stories">
            {stories.map((story, index) => (
              <article
                className="story-card"
                data-reveal
                style={delay(index)}
                key={story.title}
              >
                <div className="story-card__media">
                  <img src={asset(story.image)} alt="" />
                </div>
                <div className="story-card__body">
                  <p className="eyebrow">{story.eyebrow}</p>
                  <h3>{story.title}</h3>
                  <p className="story-card__copy">{story.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="platform section-dark" id="marketplace">
        <div className="container">
          <div className="signup">
            <div className="signup__orbit" data-reveal style={delay(0, 160)}>
              <img className="orbit" src={asset("a47a7.svg")} alt="" />
            </div>
            <p className="eyebrow" data-reveal style={delay(1, 160)}>
              Stay informed
            </p>
            <h2 data-reveal style={delay(2, 160)}>
              Follow climate action from commitment to verified impact.
            </h2>
            <p className="signup__copy" data-reveal style={delay(3, 160)}>
              Receive registry announcements, project highlights, and Article 6
              marketplace news from the DRC carbon platform.
            </p>
            <div className="signup__cta" data-reveal style={delay(4, 160)}>
              <ArrowButton href="#footer">Sign up for updates</ArrowButton>
            </div>
          </div>

          <div className="portal-wrap">
            <div className="section-head section-head--dark" data-reveal>
              <div>
                <p className="eyebrow">Secure platform access</p>
                <h2>Access your portal</h2>
                <p>Choose your role to enter the Lumiere platform.</p>
              </div>
              <p className="verify-note">
                <img src={asset("c54b2.svg")} alt="" />
                All portals require verification by the DRC Government
              </p>
            </div>
            <div className="portal-grid">
              {portals.map((portal, index) => (
                <a
                  className="portal-card"
                  data-reveal
                  style={delay(index)}
                  href="#footer"
                  key={portal.title}
                >
                  <div className="portal-card__image">
                    <img src={asset(portal.image)} alt="" />
                    <span className="portal-card__icon">
                      <img src={asset(portal.icon)} alt="" />
                    </span>
                    <span className="portal-card__explore">Explore portal</span>
                  </div>
                  <h3>{portal.title}</h3>
                  <p>{portal.copy}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="stewardship">
        <div className="stewardship__panel">
          <div className="container stewardship__content">
            <div className="stewardship__intro" data-reveal>
              <p className="eyebrow">Environmental stewardship</p>
              <h2>Protecting the Congo Basin</h2>
              <p>
                Supporting climate action through sovereign carbon market
                infrastructure that protects one of the world&apos;s most
                important ecosystems.
              </p>
            </div>
            <div className="stewardship__grid">
              {stewardshipBenefits.map((benefit, index) => (
                <article
                  className="stewardship-card"
                  data-reveal
                  style={delay(index, 110)}
                  key={benefit.title}
                >
                  <span className="stewardship-card__icon">
                    <img src={asset(benefit.icon)} alt="" />
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="film">
        <img className="film__image" src={asset("c73ee.png")} alt="" />
        <div className="film__shade" />
        <div className="container film__content" data-reveal>
          <p className="eyebrow">Lumiere film</p>
          <h2>The Forest That Holds the Climate Together</h2>
          <p>
            Journey into the Congo Basin and discover why trusted climate
            infrastructure begins with protecting one of Earth&apos;s greatest
            carbon sinks.
          </p>
          <a
            className="button film__button"
            href="https://youtu.be/A8SdkuL9a0k"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={asset("e1353.svg")} alt="" /> Watch film
          </a>
        </div>
        <div className="film__meta">
          <span>Democratic Republic of the Congo</span>
          <span>Featured story · Full film</span>
        </div>
      </section>

      <section className="map-section section-dark" id="projects">
        <div className="container map-layout">
          <div className="map-copy" data-reveal>
            <p className="eyebrow">Live project map</p>
            <h2>Climate action, mapped.</h2>
            <p>
              Explore 29 verified carbon projects across the Democratic Republic
              of Congo
            </p>
            <div className="category-list">
              {categories.map(([name, count, color], index) => (
                <span
                  className={index === 0 ? "category is-active" : "category"}
                  key={name}
                >
                  <i style={{ backgroundColor: color }} />
                  {name} <b>{count}</b>
                </span>
              ))}
            </div>
          </div>
          <div className="map-visuals" data-reveal>
            <div className="map-frame">
              <img
                src={asset("982d6.png")}
                alt="Map of verified carbon projects"
              />
            </div>
            <div className="map-frame map-frame--chart">
              <img src={asset("e6892.png")} alt="Project distribution chart" />
            </div>
          </div>
        </div>
      </section>

      <section className="features section-light">
        <div className="container">
          <div className="feature-head" data-reveal>
            <h2>How Lumière works</h2>
            <p>
              The most advanced carbon registry platform combining government
              authority with technological innovation
            </p>
          </div>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <article
                className="feature-card"
                data-reveal
                style={delay(index)}
                key={feature.title}
              >
                <span className="feature-card__icon">
                  <img src={asset(feature.icon)} alt="" />
                </span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer id="footer">
        <div className="container footer-grid" data-reveal>
          <div className="footer-brand">
            <img
              className="footer-brand__logo"
              src={lumiereLogo}
              alt="Lumière"
            />
            <p>
              A Public-Private Partnership between the DRC Government and
              Lumiere DRC, enabling transparent carbon credit trading
              through blockchain technology.
            </p>
          </div>
          <div className="footer-links">
            <p className="eyebrow">Platform</p>
            <a href="#marketplace">Article 6 Compliant Platform</a>
            <a href="#registry">ITMO Registry</a>
            <a href="#marketplace">Blockchain Verified</a>
            <a href="#projects">International Standards</a>
          </div>
          <div className="footer-links">
            <p className="eyebrow">Partners</p>
            <a href="#footer">DRC Government</a>
            <a href="#footer">Lumiere DRC</a>
            <a href="#footer">International Buyers</a>
            <a href="#footer">Verification Bodies</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>Cookie Policy · Manage cookies</span>
          <span>
            © 2025 Lumière DRC. Built on blockchain for transparency and
            traceability.
          </span>
        </div>
      </footer>
    </main>
  )
}

export default App
