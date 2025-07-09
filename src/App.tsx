import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  FolderOpen,
  Star,
  GitFork,
  ArrowUpRight,
  Instagram,
  Twitter,
  Codepen
} from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const sections = ['about', 'experience', 'work', 'writing', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const experiences = [
    {
      period: "2018 — PRESENT",
      title: "Senior Frontend Engineer",
      company: "Upstatement",
      description: "Build and maintain critical components used to construct Klaviyo's frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers.",
      technologies: ["JavaScript", "TypeScript", "React", "Storybook"]
    },
    {
      period: "2016 — 2018",
      title: "Software Engineer",
      company: "Apple",
      description: "Developed and shipped highly interactive web applications for Apple Music using Ember.js. Built and shipped the Apple Music Extension within Facebook Messenger leveraging third-party and internal APIs.",
      technologies: ["Ember", "JavaScript", "StencilJS", "Git"]
    },
    {
      period: "2014 — 2016",
      title: "Studio Developer",
      company: "Scout Studio",
      description: "Worked with a team of three designers to help create a wide variety of marketing websites and applications for companies of all sizes.",
      technologies: ["JavaScript", "jQuery", "CSS", "Wordpress"]
    }
  ];

  const projects = [
    {
      title: "Build a Spotify Connected App",
      description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
      technologies: ["React", "Styled Components", "Express", "Spotify API", "Heroku"],
      github: "#",
      external: "#",
      image: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Integrating Algolia Search with WordPress Multisite",
      description: "Building a custom multisite compatible WordPress plugin to build global search with Algolia",
      technologies: ["Algolia", "WordPress", "PHP"],
      github: "#",
      external: "#",
      image: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "OctoProfile",
      description: "A nicer look at your GitHub profile and repo stats. Includes data visualizations of your top languages, starred repositories, and sort through your top repos by number of stars, forks, and size.",
      technologies: ["Next.js", "Chart.js", "GitHub API"],
      github: "#",
      external: "#",
      image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const writings = [
    {
      date: "Dec 23, 2020",
      title: "Integrating Algolia Search with WordPress Multisite",
      description: "Building a custom multisite compatible WordPress plugin to build global search across a network of sites",
      readTime: "10 min read",
      external: "#",
      tags: ["Algolia", "WordPress", "PHP"]
    },
    {
      date: "May 27, 2019",
      title: "Building a Spotify Connected App",
      description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track.",
      readTime: "7 min read",
      external: "#",
      tags: ["Spotify API", "React", "Express"]
    },
    {
      date: "Dec 12, 2017",
      title: "Thoughts on Semantic Versioning",
      description: "Why I think semantic versioning is important and how it can help you manage your project dependencies",
      readTime: "5 min read",
      external: "#",
      tags: ["Development", "Best Practices"]
    }
  ];

  const otherProjects = [
    {
      title: "Halcyon Theme",
      description: "A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more.",
      technologies: ["VS Code", "Sublime Text", "Atom"],
      github: "#",
      external: "#"
    },
    {
      title: "Spotify Profile",
      description: "A web app for visualizing personalized Spotify data",
      technologies: ["React", "Express", "Spotify API"],
      github: "#",
      external: "#"
    },
    {
      title: "Weather App",
      description: "A simple weather app built with vanilla JavaScript",
      technologies: ["JavaScript", "CSS", "OpenWeather API"],
      github: "#",
      external: "#"
    },
    {
      title: "Google Keep Clone",
      description: "A Google Keep clone built with React and Firebase",
      technologies: ["React", "Firebase", "Styled Components"],
      github: "#",
      external: "#"
    },
    {
      title: "Forkify",
      description: "Recipe app with custom recipe uploads",
      technologies: ["JavaScript", "Sass", "Webpack"],
      github: "#",
      external: "#"
    },
    {
      title: "Breakout Game",
      description: "HTML5 Canvas game made with vanilla JavaScript",
      technologies: ["JavaScript", "HTML5 Canvas"],
      github: "#",
      external: "#"
    }
  ];

  return (
    <div className="bg-slate-900 text-slate-400 min-h-screen font-mono">
      {/* Cursor spotlight effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left side - Fixed header */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                Brittany Chiang
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                Senior Frontend Engineer at Upstatement
              </h2>
              <p className="mt-4 max-w-xs leading-normal">
                I build pixel-perfect, engaging, and accessible digital experiences.
              </p>
              
              {/* Navigation */}
              <nav className="nav hidden lg:block" aria-label="In-page jump links">
                <ul className="mt-16 w-max">
                  {['about', 'experience', 'work', 'writing', 'contact'].map((section) => (
                    <li key={section}>
                      <button
                        onClick={() => scrollToSection(section)}
                        className={`group flex items-center py-3 ${
                          activeSection === section ? 'active' : ''
                        }`}
                      >
                        <span className={`nav-indicator mr-4 h-px transition-all ${
                          activeSection === section 
                            ? 'w-16 bg-slate-200' 
                            : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200'
                        }`}></span>
                        <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-colors ${
                          activeSection === section 
                            ? 'text-slate-200' 
                            : 'text-slate-500 group-hover:text-slate-200'
                        }`}>
                          {section}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social links */}
            <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
              <li className="mr-5 text-xs">
                <a
                  className="block hover:text-slate-200 transition-colors"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={20} />
                </a>
              </li>
              <li className="mr-5 text-xs">
                <a
                  className="block hover:text-slate-200 transition-colors"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram size={20} />
                </a>
              </li>
              <li className="mr-5 text-xs">
                <a
                  className="block hover:text-slate-200 transition-colors"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Twitter size={20} />
                </a>
              </li>
              <li className="mr-5 text-xs">
                <a
                  className="block hover:text-slate-200 transition-colors"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={20} />
                </a>
              </li>
              <li className="mr-5 text-xs">
                <a
                  className="block hover:text-slate-200 transition-colors"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Codepen size={20} />
                </a>
              </li>
            </ul>
          </header>

          {/* Right side - Scrollable content */}
          <main className="pt-24 lg:w-1/2 lg:py-24">
            {/* About section */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  About
                </h2>
              </div>
              <div>
                <p className="mb-4">
                  Back in 2012, I decided to try my hand at creating custom Tumblr themes and tumbled head first into the rabbit hole of coding and web development. Fast-forward to today, and I've had the privilege of building software for an{" "}
                  <a className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300" href="#" target="_blank" rel="noreferrer">
                    advertising agency
                  </a>
                  , a{" "}
                  <a className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300" href="#" target="_blank" rel="noreferrer">
                    start-up
                  </a>
                  , a{" "}
                  <a className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300" href="#" target="_blank" rel="noreferrer">
                    huge corporation
                  </a>
                  , and a{" "}
                  <a className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300" href="#" target="_blank" rel="noreferrer">
                    digital product studio
                  </a>
                  .
                </p>
                <p className="mb-4">
                  My main focus these days is building accessible, inclusive products and digital experiences at{" "}
                  <a className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300" href="#" target="_blank" rel="noreferrer">
                    Upstatement
                  </a>{" "}
                  for a variety of clients. I most enjoy building software in the sweet spot where design and engineering meet — things that look good but are also built well under the hood.
                </p>
                <p>
                  When I'm not at the computer, I'm usually rock climbing, reading, hanging out with my wife and two cats, or running around Hyrule searching for{" "}
                  <span className="group/korok inline-flex lg:cursor-[url(https://brittanychiang.com/images/koroks/Elma_02.png),_pointer] lg:font-medium lg:text-slate-200">
                    <span className="sr-only">Korok seeds</span>
                    <span className="group-hover/korok:text-red-400 transition-colors duration-75" aria-hidden="true">K</span>
                    <span className="group-hover/korok:text-orange-400 transition-colors duration-75 delay-[25ms]" aria-hidden="true">o</span>
                    <span className="group-hover/korok:text-yellow-400 transition-colors duration-75 delay-[50ms]" aria-hidden="true">r</span>
                    <span className="group-hover/korok:text-green-400 transition-colors duration-75 delay-[75ms]" aria-hidden="true">o</span>
                    <span className="group-hover/korok:text-blue-400 transition-colors duration-75 delay-[100ms]" aria-hidden="true">k</span>
                    <span className="group-hover/korok:text-indigo-400 transition-colors duration-75 delay-[125ms]" aria-hidden="true"> </span>
                    <span className="group-hover/korok:text-purple-400 transition-colors duration-75 delay-[150ms]" aria-hidden="true">s</span>
                    <span className="group-hover/korok:text-pink-400 transition-colors duration-75 delay-[175ms]" aria-hidden="true">e</span>
                    <span className="group-hover/korok:text-red-400 transition-colors duration-75 delay-[200ms]" aria-hidden="true">e</span>
                    <span className="group-hover/korok:text-orange-400 transition-colors duration-75 delay-[225ms]" aria-hidden="true">d</span>
                    <span className="group-hover/korok:text-yellow-400 transition-colors duration-75 delay-[250ms]" aria-hidden="true">s</span>
                  </span>
                  .
                </p>
              </div>
            </section>

            {/* Experience section */}
            <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Experience
                </h2>
              </div>
              <div>
                <ol className="group/list">
                  {experiences.map((exp, index) => (
                    <li key={index} className="mb-12">
                      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                          {exp.period}
                        </header>
                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-200">
                            <div>
                              <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base" href="#" target="_blank" rel="noreferrer">
                                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                                <span>
                                  {exp.title} ·{" "}
                                  <span className="inline-block">
                                    {exp.company}
                                    <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                                  </span>
                                </span>
                              </a>
                            </div>
                          </h3>
                          <p className="mt-2 text-sm leading-normal">{exp.description}</p>
                          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                            {exp.technologies.map((tech, techIndex) => (
                              <li key={techIndex} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                  {tech}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-12">
                  <a className="inline-flex items-center font-medium leading-tight text-slate-200 font-semibold text-slate-200 group" href="/resume.pdf" target="_blank" rel="noreferrer">
                    <span>
                      <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                        View Full Résumé
                      </span>
                      <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </a>
                </div>
              </div>
            </section>

            {/* Work section */}
            <section id="work" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Selected Work
                </h2>
              </div>
              <div>
                <ul className="group/list">
                  {projects.map((project, index) => (
                    <li key={index} className="mb-12">
                      <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                        <div className="z-10 sm:order-2 sm:col-span-6">
                          <h3>
                            <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base" href="#" target="_blank" rel="noreferrer">
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>
                                {project.title}
                                <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                              </span>
                            </a>
                          </h3>
                          <p className="mt-2 text-sm leading-normal">{project.description}</p>
                          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                            {project.technologies.map((tech, techIndex) => (
                              <li key={techIndex} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                  {tech}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <img alt={project.title} loading="lazy" width="200" height="48" decoding="async" className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1" src={project.image} />
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-12">
                  <a className="inline-flex items-center font-medium leading-tight text-slate-200 font-semibold text-slate-200 group" href="/archive" target="_blank" rel="noreferrer">
                    <span>
                      <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                        View Full Project Archive
                      </span>
                      <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </a>
                </div>
              </div>
            </section>

            {/* Writing section */}
            <section id="writing" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Writing
                </h2>
              </div>
              <div>
                <ul className="group/list">
                  {writings.map((article, index) => (
                    <li key={index} className="mb-12">
                      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                          <time dateTime={article.date}>{article.date}</time>
                        </header>
                        <div className="z-10 sm:col-span-6">
                          <h3>
                            <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base" href={article.external} target="_blank" rel="noreferrer">
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>
                                {article.title}
                                <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                              </span>
                            </a>
                          </h3>
                          <p className="mt-2 text-sm leading-normal">{article.description}</p>
                          <p className="mt-2 text-xs text-slate-500">{article.readTime}</p>
                          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                            {article.tags.map((tag, tagIndex) => (
                              <li key={tagIndex} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                  {tag}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-12">
                  <a className="inline-flex items-center font-medium leading-tight text-slate-200 font-semibold text-slate-200 group" href="/writing" target="_blank" rel="noreferrer">
                    <span>
                      <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                        View All Posts
                      </span>
                      <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </a>
                </div>
              </div>
            </section>

            {/* Other projects */}
            <section className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Other Noteworthy Projects
                </h2>
              </div>
              <div>
                <ul className="group/list">
                  {otherProjects.map((project, index) => (
                    <li key={index} className="mb-12">
                      <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                        <div className="z-10 sm:col-span-6">
                          <h3>
                            <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base" href={project.external} target="_blank" rel="noreferrer">
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>
                                {project.title}
                                <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                              </span>
                            </a>
                          </h3>
                          <p className="mt-2 text-sm leading-normal">{project.description}</p>
                          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                            {project.technologies.map((tech, techIndex) => (
                              <li key={techIndex} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                  {tech}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="z-10 flex items-center sm:col-span-2">
                          <div className="flex space-x-2">
                            <a href={project.github} className="text-slate-400 hover:text-slate-200 transition-colors">
                              <Github size={20} />
                            </a>
                            <a href={project.external} className="text-slate-400 hover:text-slate-200 transition-colors">
                              <ExternalLink size={20} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Contact section */}
            <section id="contact" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Contact
                </h2>
              </div>
              <div>
                <form onSubmit={handleSubmit} className="max-w-md space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-md text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-md text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-200 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-md text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-teal-400/10 border border-teal-300/20 rounded-md text-teal-300 font-medium hover:bg-teal-400/20 hover:border-teal-300/40 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all"
                    >
                      Send Message
                    </button>
                    
                    <a className="inline-flex items-center font-medium leading-tight text-slate-200 font-semibold text-slate-200 group" href="mailto:brittany.chiang@gmail.com">
                      <span>
                        <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                          Say Hello
                        </span>
                        <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
                      </span>
                    </a>
                  </div>
                </form>
              </div>
            </section>

            <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
              <p>
                Loosely designed in{" "}
                <a href="#" className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300" target="_blank" rel="noreferrer">
                  Figma
                </a>{" "}
                and coded in{" "}
                <a href="#" className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300" target="_blank" rel="noreferrer">
                  Visual Studio Code
                </a>{" "}
                by yours truly. Built with{" "}
                <a href="#" className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300" target="_blank" rel="noreferrer">
                  Next.js
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300" target="_blank" rel="noreferrer">
                  Tailwind CSS
                </a>
                , deployed with{" "}
                <a href="#" className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300" target="_blank" rel="noreferrer">
                  Vercel
                </a>
                . All text is set in the{" "}
                <a href="#" className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300" target="_blank" rel="noreferrer">
                  Inter
                </a>{" "}
                typeface.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;