/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`
const currentPath = () => {
  const path = window.location.pathname
  return basePath && path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path
}

const navigation = [
  ['/', 'Home'],
  ['/leistungen', 'Leistungen'],
  ['/ueber-mich', 'Über mich'],
  ['/kontakt', 'Kontakt'],
]

const services = [
  ['Errichtung von Natursteinmauern', 'langlebig, funktional und optisch ansprechend', 'steinmauer.webp'],
  ['Geogitter / Bewehrte Erde', 'zur nachhaltigen Böschungs- und Hangsicherung', 'geogitter.webp'],
  ['Außenanlagen', 'Geländeprofilierung, Wege, Einfahrten und Gartenvorbereitung', 'planierung.webp'],
  ['Aushubarbeiten', 'für Einfamilienhäuser, Fundamente, Pools und Baugruben', 'grabungsarbeiten.webp'],
  ['Oberflächenentwässerung und Quellfassungen', 'für eine sichere Ableitung von Wasser', 'entwaesserung.webp'],
  ['Kultivierung von Feldern', 'zur Flächenerschließung und landwirtschaftlichen Nutzung', 'kultivierung.webp'],
  ['Forstwegebau', 'inklusive Sanierung und Instandsetzung bestehender Wege', 'forstwegebau.webp'],
  ['Planierungsarbeiten', 'für Bauprojekte und Geländevorbereitung', 'planierung.webp'],
  ['Hangsicherungen', 'zum Schutz vor Erosion und Geländebewegungen', 'hangsicherung.webp'],
  ['Kanal- und Leitungsbau', 'für Ver- und Entsorgungsleitungen', 'leitungsbau.webp'],
  ['Schremmarbeiten', 'für Abbruch-, Sanierungs- und Vorbereitungsarbeiten', 'schremmarbeiten.webp'],
]

const gallery = [
  ['steinmauer.webp', 'Natursteinmauern'],
  ['grabungsarbeiten.webp', 'Diverse Grabungsarbeiten'],
  ['geogitter.webp', 'Geogitter / Bewehrte Erde'],
  ['kultivierung.webp', 'Kultivierungen'],
  ['steinmauer-detail.webp', 'Natursteinmauern'],
  ['planierung.webp', 'Außenanlagen'],
]

function Icon({ name, size = 22 }) {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    mountain: <><path d="m3 20 7-12 4 6 2-3 5 9"/><path d="m8.5 10.6 1.6 1.1 1.5-1.2"/></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function Link({ to, children, className = '', onNavigate }) {
  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    window.history.pushState({}, '', `${basePath}${to}` || '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
    onNavigate?.()
  }
  return <a href={to} className={className} onClick={handleClick}>{children}</a>
}

function Logo() {
  return <Link to="/" className="logo" aria-label="MBaggerarbeiten – Startseite">
    <span className="logo-mark"><span>M</span></span>
    <span className="logo-type"><strong>MBagger</strong><small>arbeiten</small></span>
  </Link>
}

function Header({ path }) {
  const [open, setOpen] = useState(false)
  const onLightBackground = path === '/impressum' || path === '/datenschutz'
  return <header className={`site-header ${onLightBackground ? 'on-light' : ''}`}>
    <div className="nav-wrap">
      <Logo />
      <button className={`menu-button ${open ? 'is-open' : ''}`} type="button" aria-label="Menü öffnen" aria-expanded={open} onClick={() => setOpen(!open)}><span/><span/></button>
      <nav className={open ? 'is-open' : ''} aria-label="Hauptnavigation">
        {navigation.map(([href, label]) => <Link key={href} to={href} onNavigate={() => setOpen(false)} className={path === href ? 'active' : ''}>{label}</Link>)}
      </nav>
      <a className="nav-phone" href="tel:+436643861313"><Icon name="phone" size={18}/><span>+43 664 386 13 13</span></a>
    </div>
  </header>
}

function Eyebrow({ children, light = false }) {
  return <p className={`eyebrow ${light ? 'light' : ''}`}><span/>{children}</p>
}

function Button({ to, children, secondary = false }) {
  return <Link to={to} className={`button ${secondary ? 'secondary' : ''}`}>{children}<Icon name="arrow" size={19}/></Link>
}

function Home() {
  const values = ['Saubere Arbeit', 'Persönliche Betreuung', 'Moderne Maschinentechnik', 'Handschlagqualität', 'Termintreue', 'Präzise Ausführung', 'Regional in Osttirol']
  return <>
    <section className="hero">
      <img src={asset('hero.webp')} alt="Baggerarbeiten im Osttiroler Bergland" />
      <div className="hero-shade"/>
      <div className="hero-content shell">
        <Eyebrow light>Erdbau aus Prägraten</Eyebrow>
        <h1>Baggerarbeiten mit<br/><em>Handschlag&shy;qualität.</em></h1>
        <p className="hero-tagline">Präzise. Zuverlässig. Regional.</p>
        <p className="hero-copy">Von Natursteinmauern über Hangsicherungen und Wegebau bis hin zu Aushubarbeiten – Ihr zuverlässiger Partner für Erdbauarbeiten in Osttirol und Umgebung.</p>
        <Button to="/kontakt">Jetzt anfragen</Button>
      </div>
      <div className="hero-location"><Icon name="pin" size={18}/><span><strong>Osttirol & Umgebung</strong></span></div>
    </section>

    <section className="intro section shell">
      <div className="intro-copy">
        <Eyebrow>Über MBaggerarbeiten</Eyebrow>
        <h2>Leidenschaft für<br/>den <em>Erdbau.</em></h2>
        <p>Wo Erfahrung auf echtes Gespür für das Gelände trifft, entstehen Lösungen, die Bestand haben. Als regionaler Einzelunternehmer begleite ich Ihr Projekt persönlich – von der ersten Besichtigung bis zum letzten Handgriff.</p>
        <Button to="/ueber-mich" secondary>Matthias kennenlernen</Button>
      </div>
      <div className="intro-media">
        <img src={asset('steinbauer.webp')} alt="Arbeiten an einer Natursteinmauer in Prägraten" loading="lazy"/>
        <div className="experience-card"><strong>Seit 2023</strong><span>selbstständig mit Leidenschaft</span></div>
      </div>
    </section>

    <section className="values section">
      <div className="shell">
        <div className="section-heading split"><div><Eyebrow light>Warum MBaggerarbeiten?</Eyebrow><h2>Qualität bei jedem<br/><em>Projekt.</em></h2></div><p>Direkte Kommunikation, fachgerechte Ausführung und ehrliche Qualität – bei jedem Projekt, unabhängig von seiner Größe.</p></div>
        <div className="value-grid">{values.map((value) => <div className="value" key={value}><Icon name="check"/><strong>{value}</strong></div>)}</div>
      </div>
    </section>

    <section className="projects section shell">
      <div className="section-heading split light-bg"><div><Eyebrow>Ausgewählte Projekte</Eyebrow><h2>Arbeit, die für<br/><em>sich spricht.</em></h2></div><Button to="/leistungen" secondary>Alle Leistungen</Button></div>
      <div className="gallery-grid">{gallery.slice(0, 4).map(([img, caption], i) => <figure className={`gallery-item item-${i + 1}`} key={img}><img src={asset(img)} alt={caption} loading="lazy"/><figcaption><strong>{caption}</strong></figcaption></figure>)}</div>
    </section>

    <ContactBand />
  </>
}

function PageHero({ eyebrow, title, italic, children, image, compact = false }) {
  return <section className={`page-hero ${compact ? 'compact' : ''}`}>
    <img src={asset(image)} alt=""/>
    <div className="page-hero-shade"/>
    <div className="shell page-hero-content"><Eyebrow light>{eyebrow}</Eyebrow><h1>{title}<br/><em>{italic}</em></h1>{children && <p>{children}</p>}</div>
  </section>
}

function Services() {
  return <>
    <PageHero eyebrow="Was ich für Sie bewege" title="Leistungen mit" italic="Substanz." image="steinmauer.webp"/>
    <section className="section shell services-intro"><div><Eyebrow>Erdbau aus einer Hand</Eyebrow><h2>Vielseitig im Einsatz.<br/><em>Präzise im Ergebnis.</em></h2></div><div><p>Meine Dienstleistungen im Bereich Erdbau umfassen eine breite Palette von Erd- und Baggerarbeiten.</p><p>Ob Neubau, Sanierung oder Geländegestaltung – ich biete Ihnen zuverlässige und fachgerechte Erdbau- und Baggerarbeiten für private, gewerbliche und landwirtschaftliche Projekte. Mit moderner Maschinentechnik, langjähriger Erfahrung und Handschlagqualität setze ich Ihre Vorhaben präzise, termingerecht und sauber um.</p></div></section>
    <section className="service-list section"><div className="shell service-showcase">
      <div className="service-visuals"><img src={asset('leistungen-mauer-neu.webp')} alt="Natursteinmauer bei einer Außenanlage" loading="lazy"/><img src={asset('leistungen-bagger-neu.webp')} alt="Bagger bei Arbeiten im Gelände" loading="lazy"/><img src={asset('leistungen-mauer-weit.webp')} alt="Natursteinmauer bei einem Gebäude" loading="lazy"/><img src={asset('leistungen-hang-neu.webp')} alt="Baggerarbeiten in steilem Gelände" loading="lazy"/></div>
      <div className="service-compact-list">{services.map(([title, copy], i) => <article key={title}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
    </div></section>
    <section className="project-note section"><div className="shell"><p>Jedes Projekt wird individuell geplant und mit größter Sorgfalt umgesetzt. Von der ersten Besichtigung bis zur Fertigstellung lege ich Wert auf eine persönliche Beratung, eine präzise Arbeitsweise und eine zuverlässige Ausführung. So entstehen langlebige Lösungen, die höchsten Qualitätsansprüchen gerecht werden.</p></div></section>
    <ContactBand />
  </>
}

function About() {
  return <>
    <PageHero eyebrow="Über mich" title="Matthias" italic="Bstieler." image="ueber-mich-hero.webp" compact/>
    <section className="about-story section shell">
      <div className="story-media"><img src={asset('maschine-tal.webp')} alt="Takeuchi-Bagger bei Erdarbeiten in Osttirol"/><p><strong>Takeuchi TB 290</strong><span>9 Tonnen Einsatzgewicht</span></p></div>
      <div className="story-copy"><Eyebrow>Matthias Bstieler</Eyebrow><h2>Mit Begeisterung.<br/><em>Mit Verantwortung.</em></h2><p>Als Einzelunternehmen mit Sitz in Prägraten am Großvenediger stehe ich für zuverlässige Baggerarbeiten mit Handschlagqualität. Meine Begeisterung für den Erdbau wurde schon früh geweckt.</p><p>Durch meine Tätigkeit bei renommierten Baggerunternehmen in Matrei in Osttirol und Hollersbach im Pinzgau konnte ich wertvolle Erfahrung sammeln und mein Fachwissen kontinuierlich erweitern.</p></div>
    </section>
    <section className="milestone"><div className="shell milestone-grid"><div><span>2023</span><small>Schritt in die Selbstständigkeit</small></div><div className="milestone-copy"><Eyebrow light>Gründung</Eyebrow><h2>Schritt in die<br/><em>Selbstständigkeit.</em></h2><p>Im Herbst 2023 wagte ich mit 27 Jahren den Schritt in die Selbstständigkeit und investierte in meinen ersten eigenen Bagger – einen Takeuchi TB 290 mit 9 Tonnen Einsatzgewicht.</p></div></div></section>
    <section className="section shell craft"><div><Eyebrow>Arbeitsweise</Eyebrow><h2>Erfahrung und<br/><em>Präzision.</em></h2><p>Die Arbeit mit modernen Baumaschinen fasziniert mich jeden Tag aufs Neue. Präzision, technisches Know-how und ein gutes Gespür für jedes Projekt sind dabei ebenso entscheidend wie Sorgfalt, Genauigkeit und Geduld.</p><p>Das Vertrauen meiner Kunden ist für mich die beste Bestätigung meiner Arbeit. So setze ich jedes Projekt gewissenhaft und termingerecht um – von der ersten Besichtigung bis zum erfolgreichen Abschluss.</p></div><img src={asset('steinmauer-detail.webp')} alt="Detail einer handwerklich errichteten Natursteinmauer" loading="lazy"/></section>
    <ContactBand />
  </>
}

function ContactForm() {
  const submit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Projektanfrage von ${data.get('name')}`)
    const body = encodeURIComponent(`Name: ${data.get('name')}\nPLZ / Ort: ${data.get('place')}\nE-Mail: ${data.get('email')}\nTelefon: ${data.get('phone')}\n\nNachricht:\n${data.get('message')}`)
    window.location.href = `mailto:bstielermatthias@gmail.com?subject=${subject}&body=${body}`
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>Name*<input name="name" required autoComplete="name" placeholder="Vor- und Nachname"/></label><label>PLZ / Ort*<input name="place" required autoComplete="postal-code" placeholder="9974 Prägraten"/></label></div>
    <div className="form-row"><label>E-Mail-Adresse*<input type="email" name="email" required autoComplete="email" placeholder="name@beispiel.at"/></label><label>Telefonnummer<input type="tel" name="phone" autoComplete="tel" placeholder="+43 ..."/></label></div>
    <label>Worum geht es bei Ihrem Projekt?*<textarea name="message" required rows="6" placeholder="Erzählen Sie mir kurz von Ihrem Vorhaben ..."/></label>
    <div className="form-bottom"><p className="privacy-note">Mit dem Absenden werden Ihre Angaben zur Bearbeitung Ihrer Anfrage verarbeitet. Weitere Informationen finden Sie in der <Link to="/datenschutz">Datenschutzerklärung</Link>.</p><button className="button" type="submit">Anfrage senden <Icon name="arrow" size={19}/></button></div>
  </form>
}

function Contact() {
  return <>
    <section className="contact-page section"><div className="shell contact-layout"><div className="contact-copy"><Eyebrow>Kontakt</Eyebrow><h1>Lassen Sie uns Ihr<br/><em>Projekt anpacken.</em></h1><p>Kontaktieren Sie mich unverbindlich für Ihr Bauvorhaben. Ich melde mich persönlich bei Ihnen und bespreche die nächsten Schritte.</p><div className="contact-details"><a href="tel:+436643861313"><Icon name="phone"/><span><small>Telefon</small><strong>+43 (0) 664 386 13 13</strong></span></a><a href="mailto:bstielermatthias@gmail.com"><Icon name="mail"/><span><small>E-Mail</small><strong>bstielermatthias@gmail.com</strong></span></a><div><Icon name="pin"/><span><small>Adresse</small><strong>Wallhorn 38<br/>9974 Prägraten am Großvenediger</strong></span></div></div></div><div className="contact-photo"><img src={asset('hero.webp')} alt="Takeuchi-Bagger bei der Arbeit in Osttirol"/></div></div></section>
    <section className="form-section section"><div className="shell"><div className="form-heading"><Eyebrow>Unverbindlich anfragen</Eyebrow><h2>Erzählen Sie mir von<br/><em>Ihrem Vorhaben.</em></h2></div><ContactForm /></div></section>
  </>
}

function ContactBand() {
  return <section className="contact-band"><div className="shell"><div><Eyebrow light>Ihr Projekt beginnt hier</Eyebrow><h2>Sie haben etwas vor?<br/><em>Reden wir darüber.</em></h2></div><div><p>Unverbindlich anfragen und persönlich beraten lassen.</p><Button to="/kontakt">Projekt anfragen</Button></div></div></section>
}

function Legal({ privacy = false }) {
  return <main className="legal section shell"><Eyebrow>Rechtliches</Eyebrow><h1>{privacy ? 'Datenschutzerklärung' : 'Impressum'}</h1>{privacy ? <>
    <h2>1. Verantwortlicher</h2><p>Verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten auf dieser Website ist:<br/><strong>Matthias Bstieler · MBaggerarbeiten</strong><br/>Wallhorn 38, 9974 Prägraten am Großvenediger, Österreich<br/>Telefon: +43 (0) 664 386 13 13<br/>E-Mail: bstielermatthias@gmail.com</p>
    <h2>2. Allgemeines</h2><p>Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Personenbezogene Daten werden ausschließlich auf Grundlage der Datenschutz-Grundverordnung (DSGVO) und des österreichischen Datenschutzgesetzes verarbeitet.</p>
    <h2>3. Kontaktaufnahme</h2><p>Wenn Sie per E-Mail oder über das Anfrageformular Kontakt aufnehmen, werden Ihre angegebenen Daten ausschließlich zur Bearbeitung Ihrer Anfrage und für mögliche Anschlussfragen verarbeitet. Dazu können Name, E-Mail-Adresse, Telefonnummer, Anschrift und der Inhalt Ihrer Nachricht gehören. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen auf Ihre Anfrage). Eine Weitergabe erfolgt nicht, sofern keine gesetzliche Verpflichtung besteht.</p>
    <h2>4. Server-Logfiles</h2><p>Der Hosting-Anbieter kann beim Besuch dieser Website technisch notwendige Informationen wie IP-Adresse, Zugriffszeit, Browser, Betriebssystem, aufgerufene Seite und Referrer-URL speichern. Diese Daten dienen der technischen Sicherheit und Fehleranalyse.</p>
    <h2>5. Ihre Rechte</h2><p>Sie haben insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Beschwerden können an die österreichische Datenschutzbehörde gerichtet werden.</p>
    <h2>6. Kontakt</h2><p>Bei Fragen zum Datenschutz wenden Sie sich bitte an Matthias Bstieler unter bstielermatthias@gmail.com.</p><p><small>Stand: August 2026</small></p>
  </> : <>
    <h2>Angaben gemäß § 5 ECG</h2><p><strong>Geschäftsführer:<br/>Matthias Bstieler</strong><br/>Wallhorn 38<br/>9974 Prägraten am Großvenediger<br/>Österreich</p>
    <h2>Kontakt</h2><p>Telefon: +43 (0) 664 3861313<br/>E-Mail: bstielermatthias@gmail.com<br/>Website: https://www.mbaggerarbeiten.at</p>
    <h2>Unternehmensangaben</h2><p>Rechtsform: Einzelunternehmen<br/>UID-Nummer: ATU79798202<br/>Gerichtsstand: Bezirksgericht Lienz<br/>Unternehmensgegenstand: Erdbau- und Baggerarbeiten<br/>Mitglied bei: Wirtschaftskammer Österreich<br/>Aufsichtsbehörde: Bezirkshauptmannschaft (BH) Lienz</p>
    <h2>Anwendbare Rechtsvorschriften</h2><p>Gewerbeordnung (GewO) in der jeweils geltenden Fassung.</p>
    <h2>Haftung für Inhalte</h2><p>Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen.</p>
    <h2>Haftung für Links</h2><p>Diese Website kann Links zu externen Websites enthalten, auf deren Inhalte kein Einfluss besteht. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
    <h2>Urheberrecht</h2><p>Alle Inhalte dieser Website (Texte, Bilder, Grafiken und sonstige Dateien) unterliegen dem Urheberrecht. Jede Verwendung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers.</p>
  </>}</main>
}

function Footer() {
  return <footer>
    <div className="shell footer-main">
      <div className="footer-brand"><Logo/><p>Erdbau & Baggerarbeiten<br/>in Osttirol.</p></div>
      <div className="footer-contact"><span>Direkter Kontakt</span><a href="tel:+436643861313">+43 (0) 664 386 13 13</a><a href="mailto:bstielermatthias@gmail.com">bstielermatthias@gmail.com</a></div>
    </div>
    <div className="shell footer-bottom"><span>© {new Date().getFullYear()} MBaggerarbeiten</span><span>Prägraten am Großvenediger</span><div><Link to="/impressum">Impressum</Link><Link to="/datenschutz">Datenschutz</Link></div></div>
  </footer>
}

function App() {
  const [path, setPath] = useState(currentPath())
  useEffect(() => {
    const changePage = () => setPath(currentPath())
    window.addEventListener('popstate', changePage)
    return () => window.removeEventListener('popstate', changePage)
  }, [])
  useEffect(() => {
    const labels = {'/': 'Baggerarbeiten in Osttirol', '/leistungen': 'Leistungen', '/ueber-mich': 'Über mich', '/kontakt': 'Kontakt', '/impressum': 'Impressum', '/datenschutz': 'Datenschutz'}
    document.title = `${labels[path] || 'MBaggerarbeiten'} | MBaggerarbeiten`
  }, [path])
  const pages = {'/': <Home/>, '/leistungen': <Services/>, '/ueber-mich': <About/>, '/kontakt': <Contact/>, '/impressum': <Legal/>, '/datenschutz': <Legal privacy/>}
  return <><Header path={path}/><main>{pages[path] || <Home/>}</main><Footer/></>
}

export default App
