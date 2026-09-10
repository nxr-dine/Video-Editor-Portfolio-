'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Clapperboard, FileText, Menu, Play, X } from 'lucide-react'

type Language = 'en' | 'fr' | 'ar'

type Project = { title: string; category: string; image: string; format: 'long' | 'short'; youtubeUrl: string; featured: boolean }

const projectImages = [
  '/videos cover/podcast1.png',
  'videos cover/podcast2.png',
  'videos cover/claude.png',
  'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1400&q=85',
  'videos cover/short1.png',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=85',
]

const translations = {
  en: {
    nav: ['Work', 'Services', 'About', 'Contact'], cta: "Let's Work Together", editor: 'Freelance video editor', hero: <>I turn raw footage into <em>content people want to watch.</em></>, heroText: 'Video editing for social media, podcasts, YouTube, and digital content.', viewWork: 'View My Work', showreel: 'View showreel', desk: 'The edit desk', selected: 'Selected Work', selectionNote: 'A small selection of cuts, stories, and visual systems.', all: 'All', toolkit: 'The toolkit', what: 'What I Do', aboutEyebrow: 'A little about me', aboutTitle: <>Good edits make the story feel <em>effortless.</em></>, about1: "I'm Noureddine Bouderbala, a video editor focused on creating engaging and visually polished content.", about2: 'I turn raw footage into clear, dynamic, and engaging videos with a focus on pacing, storytelling, and attention to detail.', start: 'Start a project', contactTitle: <>Have a project<br />in mind?</>, contactText: "Send me the details and let's talk.", name: 'Name', email: 'Email', projectType: 'Project Type', select: 'Select a project type', message: 'Message', messagePlaceholder: 'Tell me a little about your project...', send: 'Send Inquiry', photo: 'Photo placeholder', footer: 'Video Editor & Visual Storyteller', types: ['Short-form', 'Podcast', 'YouTube', 'Motion Graphics', 'Social Media', 'Other'], filters: ['All', 'Short Form', 'Podcast', 'YouTube', 'Motion Graphics', 'Social Media'], metrics: ['TOTAL VIEWS', 'FOLLOWERS GROWTH', 'VIDEOS / EDITS', 'YEARS CREATING'], projects: [['Podcast Editing 1', 'Podcast'], ['Podcast Editing 2', 'Short Form'], ['Claude AI UI Animation', 'Motion Graphics'], ['The Creator Playbook', 'YouTube'], ['Talking head', 'Short Form'], ['A Quiet Morning', 'Short Form']], services: [['Short-Form Editing', 'Reels, TikToks, and YouTube Shorts.'], ['Podcast Editing', 'Podcast clips with captions, B-roll, and sound design.'], ['YouTube Editing', 'Engaging long-form video editing.'], ['Motion Graphics', 'Animations, titles, transitions, and visual effects.']] },
  fr: {
    nav: ['Travail', 'Services', 'À propos', 'Contact'], cta: 'Travaillons ensemble', editor: 'Monteur vidéo freelance', hero: <>Je transforme vos rushes en <em>contenus que l’on veut regarder.</em></>, heroText: 'Montage vidéo pour les réseaux sociaux, podcasts, YouTube et contenus digitaux.', viewWork: 'Voir mon travail', showreel: 'Voir le showreel', desk: 'La table de montage', selected: 'Travaux sélectionnés', selectionNote: 'Une sélection de montages, récits et systèmes visuels.', all: 'Tout', toolkit: 'La boîte à outils', what: 'Ce que je fais', aboutEyebrow: 'À propos de moi', aboutTitle: <>Un bon montage rend l’histoire <em>naturelle.</em></>, about1: 'Je suis Noureddine Bouderbala, monteur vidéo spécialisé dans la création de contenus engageants et soignés.', about2: 'Je transforme vos rushes en vidéos claires et dynamiques, avec une attention particulière au rythme, au storytelling et aux détails.', start: 'Démarrer un projet', contactTitle: <>Un projet<br />en tête ?</>, contactText: 'Envoyez-moi les détails et parlons-en.', name: 'Nom', email: 'E-mail', projectType: 'Type de projet', select: 'Choisir un type de projet', message: 'Message', messagePlaceholder: 'Parlez-moi un peu de votre projet...', send: 'Envoyer la demande', photo: 'Photo à venir', footer: 'Monteur vidéo & storyteller visuel', types: ['Format court', 'Podcast', 'YouTube', 'Motion design', 'Réseaux sociaux', 'Autre'], filters: ['Tout', 'Format court', 'Podcast', 'YouTube', 'Motion design', 'Réseaux sociaux'], metrics: ['VUES TOTALES', 'CROISSANCE ABONNÉS', 'VIDÉOS / MONTAGES', 'ANNÉES DE CRÉATION'], projects: [['Montage podcast 1', 'Podcast'], ['Montage podcast 2', 'Format court'], ['Animation UI Claude AI', 'Motion design'], ['Le guide du créateur', 'YouTube'], ['Face caméra', 'Format court'], ['Un matin calme', 'Format court']], services: [['Montage format court', 'Reels, TikToks et YouTube Shorts.'], ['Montage podcast', 'Clips podcast avec sous-titres, B-roll et sound design.'], ['Montage YouTube', 'Montage vidéo long format et engageant.'], ['Motion design', 'Animations, titres, transitions et effets visuels.']] },
  ar: {
    nav: ['الأعمال', 'الخدمات', 'من أنا', 'تواصل'], cta: 'لنعمل معًا', editor: 'محرر فيديو مستقل', hero: <>أحوّل اللقطات الخام إلى <em>محتوى يستحق المشاهدة.</em></>, heroText: 'مونتاج فيديو لمنصات التواصل، البودكاست، يوتيوب والمحتوى الرقمي.', viewWork: 'شاهد أعمالي', showreel: 'شاهد العرض', desk: 'على طاولة المونتاج', selected: 'أعمال مختارة', selectionNote: 'مجموعة مختارة من المونتاج والقصص والأنظمة البصرية.', all: 'الكل', toolkit: 'الأدوات', what: 'ما أقدمه', aboutEyebrow: 'نبذة عني', aboutTitle: <>المونتاج الجيد يجعل القصة تبدو <em>سلسة.</em></>, about1: 'أنا نورالدين بودربالة، محرر فيديو أركز على صناعة محتوى جذاب ومتقن بصريًا.', about2: 'أحوّل اللقطات الخام إلى فيديوهات واضحة وحيوية، مع التركيز على الإيقاع والسرد والاهتمام بالتفاصيل.', start: 'ابدأ مشروعًا', contactTitle: <>هل لديك مشروع<br />في ذهنك؟</>, contactText: 'أرسل لي التفاصيل لنتحدث.', name: 'الاسم', email: 'البريد الإلكتروني', projectType: 'نوع المشروع', select: 'اختر نوع المشروع', message: 'الرسالة', messagePlaceholder: 'أخبرني قليلًا عن مشروعك...', send: 'إرسال الطلب', photo: 'الصورة قريبًا', footer: 'محرر فيديو وصانع قصص بصرية', types: ['فيديو قصير', 'بودكاست', 'يوتيوب', 'موشن جرافيك', 'تواصل اجتماعي', 'أخرى'], filters: ['الكل', 'فيديو قصير', 'بودكاست', 'يوتيوب', 'موشن جرافيك', 'تواصل اجتماعي'], metrics: ['إجمالي المشاهدات', 'نمو المتابعين', 'فيديو / مونتاج', 'سنوات من الإبداع'], projects: [['مونتاج بودكاست 1', 'بودكاست'], ['مونتاج بودكاست 2', 'فيديو قصير'], ['تحريك واجهة Claude AI', 'موشن جرافيك'], ['دليل صانع المحتوى', 'يوتيوب'], ['حديث أمام الكاميرا', 'فيديو قصير'], ['صباح هادئ', 'فيديو قصير']], services: [['مونتاج الفيديو القصير', 'ريلز وتيك توك ويوتيوب شورتس.'], ['مونتاج البودكاست', 'مقاطع بودكاست مع ترجمة ولقطات مساندة وتصميم صوتي.'], ['مونتاج يوتيوب', 'مونتاج فيديو طويل وممتع.'], ['موشن جرافيك', 'تحريك وعناوين وانتقالات وتأثيرات بصرية.']] },
} as const

const metricValues = ['1M+', '50K+', '100+', '3+']
const projectFormats: Project['format'][] = ['short', 'short', 'long', 'long', 'short', 'short']
const projectYoutubeUrls = ['https://www.youtube.com/shorts/UxSDjpyY6hA', 'https://www.youtube.com/shorts/7TAgE9KdoL4', 'https://www.youtube.com/watch?v=ODl9gOkgNbA', '', 'https://www.youtube.com/shorts/MzOO8N2bzhk', '']
const projectFeatured = [true, true, true, true, true, false]

const getYoutubeEmbedUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url)
    const videoId = parsedUrl.pathname.match(/\/(?:shorts|embed)\/([^/?]+)/)?.[1] ?? parsedUrl.searchParams.get('v') ?? parsedUrl.pathname.split('/').pop()
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  } catch {
    return url
  }
}

const contactLinks = {
  cv: '/cv.pdf',
  whatsapp: 'https://api.whatsapp.com/message/BVJWFRW65QHNG1?autoload=1&app_absent=0',
  youtube: 'https://www.youtube.com/@nxr.studioo',
  instagram: 'https://www.instagram.com/nxr.studio/',
  tiktok: 'https://www.tiktok.com/@nxr.studio',
}

export default function Page() {
  const [language, setLanguage] = useState<Language>('en')
  const [activeFilter, setActiveFilter] = useState(0)
  const [playingProject, setPlayingProject] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const t = translations[language]
  const visibleFilters = t.filters.filter((_, index) => index !== 2 && index !== 5)
  const projects = useMemo(() => t.projects.map((p, index) => ({ title: p[0], category: index === 0 || index === 5 ? t.filters[1] : p[1], image: projectImages[index], format: projectFormats[index], youtubeUrl: projectYoutubeUrls[index], featured: projectFeatured[index] })), [t])

  useEffect(() => {
    const saved = window.localStorage.getItem('nxr-language') as Language | null
    const detected = navigator.language.toLowerCase().startsWith('fr') ? 'fr' : navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en'
    setLanguage(saved === 'en' || saved === 'fr' || saved === 'ar' ? saved : detected)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  const chooseLanguage = (next: Language) => { setLanguage(next); window.localStorage.setItem('nxr-language', next) }
  const filteredProjects = activeFilter === 0 ? projects.filter((project) => project.featured) : projects.filter((project) => project.category === visibleFilters[activeFilter])
  const closeMenu = () => setMenuOpen(false)

  return <main className="site-shell">
    <nav className="nav" aria-label="Main navigation"><a href="#top" className="brand" onClick={closeMenu}>NXR<span>Studio</span></a><div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>{t.nav.slice(0, 3).map((item, index) => <a href={['#work', '#services', '#about'][index]} key={item} onClick={closeMenu}>{item}</a>)}</div><div className="language-switcher" aria-label="Language selector">{(['en', 'fr', 'ar'] as Language[]).map((item) => <button key={item} className={language === item ? 'active' : ''} onClick={() => chooseLanguage(item)}>{item.toUpperCase()}</button>)}</div><button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></nav>
    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> {t.editor}</p><h1>{t.hero}</h1><p className="hero-text">{t.heroText}</p><div className="hero-actions"><a className="button button-primary" href="#work">{t.viewWork} <ArrowUpRight size={17} /></a><a className="button button-ghost" href={contactLinks.cv} download><FileText size={16} /> CV</a><a className="button button-ghost" href={contactLinks.youtube} target="_blank" rel="noreferrer">YouTube</a><a className="button button-ghost" href={contactLinks.instagram} target="_blank" rel="noreferrer">Instagram</a></div></div><a href="#work" className="showreel" aria-label={t.showreel}><img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=85" alt="Film camera in a dark studio" /><span className="showreel-overlay"><span className="play-button"><Play fill="currentColor" size={18} /></span><span>{t.showreel}</span></span><span className="reel-index">01 / 06</span></a></section>
    <section className="metrics" aria-label="Studio metrics">{metricValues.map((value, index) => <div key={value}><strong>{value}</strong><span>{t.metrics[index]}</span></div>)}</section>
    <section className="work-section section" id="work"><div className="section-heading"><div><p className="eyebrow">{t.desk}</p><h2>{t.selected}</h2></div><p className="section-note">{t.selectionNote}</p></div><div className="filters" role="tablist" aria-label="Filter projects">{visibleFilters.map((filter, index) => <button key={filter} className={activeFilter === index ? 'active' : ''} onClick={() => setActiveFilter(index)}>{filter}</button>)}</div><div className="work-grid">{filteredProjects.map((project) => { const isPlaying = playingProject === project.title && project.youtubeUrl; return <div className={`project-card project-${project.format}`} key={project.title} role="button" tabIndex={0} onClick={() => project.youtubeUrl && setPlayingProject(project.title)} onKeyDown={(event) => { if ((event.key === 'Enter' || event.key === ' ') && project.youtubeUrl) { event.preventDefault(); setPlayingProject(project.title) } }}><span className="project-image">{isPlaying ? <iframe src={`${getYoutubeEmbedUrl(project.youtubeUrl)}?autoplay=1&rel=0&controls=1&modestbranding=1&iv_load_policy=1&disablekb=0&fs=1`} title={project.title} allow="autoplay; encrypted-media; fullscreen" allowFullScreen /> : <><img src={project.image} alt="" /><span className="project-play"><Play fill="currentColor" size={15} /></span></>}</span><span className="project-meta"><span><strong>{project.title}</strong></span><ArrowUpRight size={18} /></span></div> })}</div></section>
    <section className="services-section section" id="services"><div className="section-heading"><div><p className="eyebrow">{t.toolkit}</p><h2>{t.what}</h2></div></div><div className="service-list">{t.services.map(([title, description], index) => <div className="service-row" key={title}><span className="service-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight size={19} /></div>)}</div></section>
    <section className="about-section section" id="about"><div className="about-image"><img src="/me.png" alt="Noureddine Bouderbala" /></div><div className="about-copy"><p className="eyebrow">{t.aboutEyebrow}</p><h2>{t.aboutTitle}</h2><p>{t.about1}</p><p>{t.about2}</p></div></section>
    <footer className="footer"><div><a href="#top" className="brand">NXR<span>Studio</span></a><p>{t.footer}</p></div><div className="footer-right"><div className="footer-socials"><a href={contactLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href={contactLinks.youtube} target="_blank" rel="noreferrer">YouTube</a><a href={contactLinks.tiktok} target="_blank" rel="noreferrer">TikTok</a><a href={contactLinks.cv} download>CV</a><a href="mailto:hello@nxrstudio.com">Email</a></div><p>© 2026 NXR Studio</p></div></footer>
  </main>
}
