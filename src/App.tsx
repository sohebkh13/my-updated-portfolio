import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  ArrowUpRight,
  Sun,
  Moon
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTheme } from './contexts/ThemeContext';

// TypeScript interfaces for data types
interface Experience {
  period: string;
  title: string;
  company: string;
  link: string;
  description: string;
  technologies: string[];
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  external: string;
  image: string;
}

// TypeWriter Animation Component
const TypeWriter = ({ phrases, isDarkMode }: { phrases: string[]; isDarkMode: boolean }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100;
  
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        
        // If we've typed the full phrase, pause and then start deleting
        if (currentText === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 1000); // Wait 2 seconds before deleting
          return;
        }
      } else {
        // Deleting
        setCurrentText(currentPhrase.substring(0, currentText.length - 1));
        
        // If we've deleted the phrase, move to the next one
        if (currentText === '') {
          setIsDeleting(false);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
          return;
        }
      }
    }, isDeleting ? 50 : typingSpeed); // Delete faster than typing
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, phrases, typingSpeed]);
  
  // Blink cursor effect
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); // Blink every 500ms
    
    return () => clearInterval(cursorTimer);
  }, []);
  
  return (
    <span className="inline-block">
      <span className={isDarkMode ? 'text-slate-200' : 'text-red-800'}>{currentText}</span>
      <span className={`ml-0.5 font-medium ${
        isDarkMode ? 'text-yellow-400' : 'text-red-800'
      } ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </span>
  );
};

// Add Noto Sans Arabic font to head
const addArabicFont = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600&display=swap';
  document.head.appendChild(link);
};

// Arabic text hover component
const ArabicHover = ({ children, arabicText, isDarkMode }: { children: React.ReactNode, arabicText: string, isDarkMode: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <span 
      className="relative transition-all duration-300 inline-block"
      style={{ cursor: isHovered ? 'none' : 'pointer' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <span className={`font-medium animate-fadeIn ${
          isDarkMode ? 'text-yellow-400' : 'text-red-800'
        }`} style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
          {arabicText}
        </span>
      ) : (
        <span className={`font-medium border-b border-dotted ${
          isDarkMode ? 'text-slate-200 border-yellow-400/40' : 'text-amber-950 border-red-800/40'
        }`}>{children}</span>
      )}
    </span>
  );
};

// Text hover component for résumé links with Arabic translation
const ResumeHover = ({ children, hoverText, link, isDarkMode }: { children: React.ReactNode, hoverText: string, link: string, isDarkMode: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noreferrer"
      className="relative group inline-block mr-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {isHovered ? (
        <span className={`animate-fadeIn font-medium ${
          isDarkMode ? 'text-yellow-400' : 'text-red-800'
        }`} style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
          {hoverText}
          <ArrowUpRight className="mr-1 inline-block h-4 w-4 shrink-0 transition-transform -translate-y-1 translate-x-1" />
        </span>
      ) : (
        <span className={`font-medium border-b border-dotted ${
          isDarkMode ? 'text-slate-200 border-yellow-400/40' : 'text-amber-950 border-red-800/40'
        }`}>
          {children}
          <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform" />
        </span>
      )}
    </a>
  );
};

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('about');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    message: ''
  });
  
  // Initialize EmailJS when the component mounts
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  // Load Arabic font when component mounts
  useEffect(() => {
    addArabicFont();
  }, []);

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

  const handleRefresh = () => {
    setFormData({ name: '', email: '', title: '', message: '' });
    setSubmissionStatus('idle');
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmissionStatus('error');
      console.error('Invalid email format');
      return;
    }

    // Show loading state
    setIsSubmitting(true);
    setSubmissionStatus('submitting');
    
    // EmailJS parameters (no attachment support in free version)
    const templateParams = {
      name: formData.name,          // This should match {{name}} in your template
      from_name: formData.name,     // This should match {{from_name}} in your template
      from_email: formData.email,   // This should match {{from_email}} in your template
      email: formData.email,        // This should match {{email}} in your template
      title: formData.title,        // This should match {{title}} in your template
      message: formData.message,    // This should match {{message}} in your template
      to_name: 'Soheb',            // This should match {{to_name}} in your template
    };
    
    // Send email using EmailJS
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((response) => {
      console.log('Email sent successfully:', response);
      setSubmissionStatus('success');
      // Reset form
      setFormData({ name: '', email: '', title: '', message: '' });
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      setSubmissionStatus('error');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const experiences: Experience[] = [
    {
      period: "2024 — PRESENT",
      title: "Senior Automation Engineer",
      company: "6D Technologies",
      link: "https://www.6dtechnologies.com/",
      description: "Built test automation frameworks using Robot Framework, Pytest, and Python for UI, API, and database validation. Automated scenarios across web and backend systems with Excel-driven data and MySQL integration. Performed API testing, security assessments with OWASP tools, and integrated test suites into CI/CD pipelines using Docker. Designed JMeter-based performance tests to evaluate system stability under load.",
      technologies: ["Python", "Selenium", "Robot Framework", "Docker", "Git",
        "Postman"," SQL","Unix", "Burp Suite", "ZAP","Azure DevOps", "CI/CD"]
    },
    {
      period: "DEC 2024 — MAR 2025",
      title: "Data Science Intern",
      company: "AiVariant",
      link: "https://aivariant.com/",
      description: "Built and evaluated a hybrid book recommendation system using collaborative and content-based filtering techniques. Engineered a data preprocessing pipeline using pandas and NumPy to clean and transform user interaction data. Assessed model performance using RMSE, precision, and recall metrics to select the optimal algorithm for deployment.",
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Collaborative Filtering", "Content-based Filtering", "Machine Learning"]
    },
    {
      period: "JUL 2024 — SEP 2024",
      title: "Data Science Intern",
      company: "Technocolabs Softwares Inc.",
      link: "https://www.technocolabs.com/",
      description: "Developed regression models to forecast mortgage prepayment risk, building interactive dashboards with matplotlib/seaborn to visualize results and support financial decision-making. Executed a full data science project lifecycle to predict employee attrition; conducted exploratory data analysis (EDA), engineered features from HR data, and built classification models to identify key attrition drivers.",
      technologies: ["Python", "Pandas", "Matplotlib", "Seaborn", "Regression Modeling", "Classification", "EDA", "Feature Engineering"]
    },
    {
      period: "2021 — 2024",
      title: "Senior Executive",
      company: "VOIS",
      link: "https://www.vodafone.co.uk/",
      description: "Automated database validations and financial report testing using SQL during system migration. Performed API testing with Postman, Swagger, and SoapUI. Refactored test scripts for integration into CI/CD pipelines. Led exploratory testing to identify edge cases beyond automated coverage.",
      technologies: ["UFT", "Python", "Postman", "SQL","Unix","Swagger","SoapUI","Mainframe Testing"]
    },
    
  ];

  const projects: Project[] = [
    {
      title: "Book Recommendation System",
      description: "A hybrid recommendation engine that combines collaborative filtering with content-based approaches. Built preprocessing pipelines to handle user interaction data and optimized model performance using RMSE, precision, and recall metrics.",
      technologies: ["Python", "pandas", "NumPy", "scikit-learn", "collaborative filtering", "content-based filtering", "streamlit"],
      github: "#",
      external: "https://book-recommend-project.streamlit.app/",
      image: "/images/book-recommendations.jpeg"
    },
    {
      title: "Mushroom Classification",
      description: "A complete machine learning pipeline that classifies mushrooms as edible or poisonous with 95%+ accuracy. Built using Random Forest and SVM algorithms, deployed as an interactive Streamlit application for real-time predictions.",
      technologies: ["Python", "pandas", "NumPy", "scikit-learn", "Random Forest", "SVM", "Streamlit", "machine learning deployment"],
      github: "#",
      external: "https://mushroom-health.streamlit.app/",
      image: "/images/streamlit-dashboard.jpeg"
    },
    {
      title: "Titanic Survival Predictor",
      description: "Classic machine learning project with a modern twist. Engineered a logistic regression model with custom feature engineering, then built a user-friendly web interface that predicts passenger survival probability.",
      technologies: ["Python", "pandas", "NumPy", "scikit-learn", "logistic regression", "Streamlit", "feature engineering"],
      github: "#",
      external: "https://titanic-survival-predict.streamlit.app/",
      image: "/images/streamlit.jpeg"
    }
  ];



  // Other projects section removed

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-black text-slate-400' 
        : 'bg-amber-50 text-amber-900'
    }`}>
      {/* Cursor spotlight effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: isDarkMode 
            ? `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 215, 0, 0.15), transparent 80%)`
            : `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(127, 29, 29, 0.1), transparent 80%)`
        }}
      />

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left side - Fixed header */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className={`text-4xl font-bold tracking-tight sm:text-5xl ${
                  isDarkMode ? 'text-slate-200' : 'text-amber-950'
                }`}>
                  Soheb Khan
                </h1>
                
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 mr-5 ${
                    isDarkMode 
                      ? 'bg-slate-800/50 text-yellow-400 hover:bg-slate-700/50' 
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
              
              <h2 className={`mt-3 text-lg font-medium tracking-tight sm:text-xl ${
                isDarkMode ? 'text-slate-200' : 'text-amber-950'
              }`}>
                <TypeWriter phrases={["Senior Automation Engineer", "Aspiring Data Scientist"]} isDarkMode={isDarkMode} />
              </h2>
              <p className="mt-4 max-w-xs leading-normal">
                I bridge quality engineering and predictive analytics for robust solutions.
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
                            ? isDarkMode ? 'w-16 bg-slate-200' : 'w-16 bg-amber-950'
                            : isDarkMode ? 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200' : 'w-8 bg-amber-300 group-hover:w-16 group-hover:bg-amber-950'
                        }`}></span>
                        <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-colors ${
                          activeSection === section 
                            ? isDarkMode ? 'text-slate-200' : 'text-amber-950'
                            : isDarkMode ? 'text-slate-500 group-hover:text-slate-200' : 'text-amber-600 group-hover:text-amber-950'
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
                  className={`block transition-colors ${
                    isDarkMode ? 'hover:text-slate-200' : 'hover:text-amber-950'
                  }`}
                  href="https://github.com/sohebkh13"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={20} />
                </a>
              </li>
              
              {/* <li className="mr-5 text-xs">
                <a
                  className="block hover:text-slate-200 transition-colors"
                  href="https://x.com/SohebKhan10"
                  target="_blank"
                  rel="noreferrer"
                >
                  <X size={20} />
                </a>
              </li> */}
              <li className="mr-5 text-xs">
                <a
                  className={`block transition-colors ${
                    isDarkMode ? 'hover:text-slate-200' : 'hover:text-amber-950'
                  }`}
                  href="https://www.linkedin.com/in/soheb-khan/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={20} />
                </a>
              </li>
              
            </ul>
          </header>

          {/* Right side - Scrollable content */}
          <main className="pt-24 lg:w-1/2 lg:py-24">
            {/* About section */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className={`sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 ${
                isDarkMode ? 'bg-black/75' : 'bg-amber-50/75'
              }`}>
                <h2 className={`text-sm font-bold uppercase tracking-widest lg:sr-only ${
                  isDarkMode ? 'text-slate-200' : 'text-amber-950'
                }`}>
                  About
                </h2>
              </div>
              <div>
                <p className="mb-4">
                  I'm a developer passionate about building robust, data-driven solutions that transform complex information into actionable insights. My favorite work lies at the intersection of quality engineering and data science, creating systems that not only perform flawlessly but also unlock hidden patterns for smarter decision-making.
                </p>
                <p className="mb-4">
                  Currently, I'm a Senior Automation Engineer at {" "}
                  <a className={`font-medium transition-colors ${
                    isDarkMode ? 'text-slate-200 hover:text-yellow-400 focus-visible:text-yellow-400' : 'text-amber-950 hover:text-red-800 focus-visible:text-red-800'
                  }`} href="https://www.6dtechnologies.com/" target="_blank" rel="noreferrer">
                    6D Technologies
                  </a>
                  , specializing in data integrity and system validation. I contribute to ensuring bulletproof data pipelines and automated testing frameworks while actively building my expertise in machine learning and predictive analytics to transition into data science.
                  </p>
                  <p>
                   In the past, I've had the opportunity to work across diverse industries — from {" "}
                  <a className={`font-medium transition-colors ${
                    isDarkMode ? 'text-slate-200 hover:text-yellow-400 focus-visible:text-yellow-400' : 'text-amber-950 hover:text-red-800 focus-visible:text-red-800'
                  }`} href="https://www.vodafone.co.uk/" target="_blank" rel="noreferrer">
                    telecom giants 
                  </a>
                  {" "}to{" "}
                  <a className={`font-medium transition-colors ${
                    isDarkMode ? 'text-slate-200 hover:text-yellow-400 focus-visible:text-yellow-400' : 'text-amber-950 hover:text-red-800 focus-visible:text-red-800'
                  }`} href="https://aivariant.com/" target="_blank" rel="noreferrer">
                    analytics firms
                  </a>
                  , and {" "}
                  <a className={`font-medium transition-colors ${
                    isDarkMode ? 'text-slate-200 hover:text-yellow-400 focus-visible:text-yellow-400' : 'text-amber-950 hover:text-red-800 focus-visible:text-red-800'
                  }`} href="https://www.technocolabs.com/" target="_blank" rel="noreferrer">
                    consulting companies
                  </a>
                  . I've also developed multiple machine learning projects, including recommendation systems, classification models, and interactive web applications that demonstrate real-world ML implementations.
                </p>
                <br />
                <p>
                  In my spare time, I'm usually gaming, binge-watching treasure hunt series—there's something about the thrill of discovery that resonates with my data exploration mindset—or <ArabicHover arabicText="تعلم اللغة العربية" isDarkMode={isDarkMode}>learning Arabic</ArabicHover>, because apparently I enjoy deciphering complex patterns whether they're in code or ancient scripts.
                </p>
              </div>
            </section>

            {/* Experience section */}
            <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className={`sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 ${
                isDarkMode ? 'bg-black/75' : 'bg-amber-50/75'
              }`}>
                <h2 className={`text-sm font-bold uppercase tracking-widest lg:sr-only ${
                  isDarkMode ? 'text-slate-200' : 'text-amber-950'
                }`}>
                  Experience
                </h2>
              </div>
              <div>
                <ol className="group/list">
                  {experiences.map((exp, index) => (
                    <li key={index} className="mb-12">
                      <div className={`group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50`}>
                        <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                          isDarkMode ? 'lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]' : 'lg:group-hover:bg-red-50/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(127,29,29,0.1)]'
                        } lg:group-hover:drop-shadow-lg`}></div>
                        <header className={`z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide sm:col-span-2 ${
                          isDarkMode ? 'text-slate-500' : 'text-amber-700'
                        }`}>
                          {exp.period}
                        </header>
                        <div className="z-10 sm:col-span-6">
                          <h3 className={`font-medium leading-snug ${
                            isDarkMode ? 'text-slate-200' : 'text-amber-950'
                          }`}>
                            <div>
                              <a className={`inline-flex items-baseline font-medium leading-tight group/link text-base ${
                                isDarkMode ? 'text-slate-200 hover:text-yellow-400 focus-visible:text-yellow-400' : 'text-amber-950 hover:text-red-800 focus-visible:text-red-800'
                              }`} href={exp.link} target="_blank" rel="noreferrer">
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
                                <div className={`flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 ${
                                  isDarkMode ? 'bg-yellow-400/10 text-yellow-400' : 'bg-red-800/10 text-red-800'
                                }`}>
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
                <div className="mt-12 flex flex-col space-y-4">
                  <ResumeHover
                    hoverText="عرض السيرة الذاتية لضمان الجودة"
                    link="https://drive.google.com/file/d/10mvznbnSkRxvUfLEC0KLHP_mTtBJKq5p/view?usp=sharing"
                    isDarkMode={isDarkMode}
                  >
                    View QA Résumé
                  </ResumeHover>
                  
                  <ResumeHover
                    hoverText="عرض السيرة الذاتية لعلوم البيانات"
                    link="https://drive.google.com/file/d/1trRn7XQ7mDGJf3uU18NrYmjTBOEIKMo5/view?usp=sharing"
                    isDarkMode={isDarkMode}
                  >
                    View Data Science Résumé
                  </ResumeHover>
                </div>
              </div>
            </section>

            {/* Work section */}
            <section id="work" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className={`sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 ${
                isDarkMode ? 'bg-black/75' : 'bg-amber-50/75'
              }`}>
                <h2 className={`text-sm font-bold uppercase tracking-widest lg:sr-only ${
                  isDarkMode ? 'text-slate-200' : 'text-amber-950'
                }`}>
                  Selected Work
                </h2>
              </div>
              <div>
                <ul className="group/list">
                  {projects.map((project, index) => (
                    <li key={index} className="mb-12">
                      <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                          isDarkMode ? 'lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]' : 'lg:group-hover:bg-red-50/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(127,29,29,0.1)]'
                        } lg:group-hover:drop-shadow-lg`}></div>
                        <div className="z-10 sm:order-2 sm:col-span-6">
                          <h3>
                            <a className={`inline-flex items-baseline font-medium leading-tight group/link text-base ${
                              isDarkMode ? 'text-slate-200 hover:text-yellow-400 focus-visible:text-yellow-400' : 'text-amber-950 hover:text-red-800 focus-visible:text-red-800'
                            }`} href={project.external} target="_blank" rel="noreferrer">
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
                                <div className={`flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 ${
                                  isDarkMode ? 'bg-yellow-400/10 text-yellow-400' : 'bg-red-800/10 text-red-800'
                                }`}>
                                  {tech}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <img alt={project.title} loading="lazy" width="200" height="48" decoding="async" className={`rounded border-2 transition sm:order-1 sm:col-span-2 sm:translate-y-1 ${
                          isDarkMode ? 'border-slate-200/10 group-hover:border-slate-200/30' : 'border-red-800/10 group-hover:border-red-800/30'
                        }`} src={project.image} />
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-12">
                  <a className={`inline-flex items-center font-medium leading-tight font-semibold group ${
                    isDarkMode ? 'text-slate-200' : 'text-amber-950'
                  }`} href="/archive">
                    <span>
                      <span className={`border-b border-transparent pb-px transition motion-reduce:transition-none ${
                        isDarkMode ? 'group-hover:border-yellow-400' : 'group-hover:border-red-800'
                      }`}>
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
              <div className={`sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 ${
                isDarkMode ? 'bg-black/75' : 'bg-amber-50/75'
              }`}>
                <h2 className={`text-sm font-bold uppercase tracking-widest lg:sr-only ${
                  isDarkMode ? 'text-slate-200' : 'text-amber-950'
                }`}>
                  Writing
                </h2>
              </div>
              <div>
                <div className={`group relative rounded-md transition-all p-6 ${
                  isDarkMode ? 'lg:hover:bg-slate-800/50 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]' : 'lg:hover:bg-red-50/50 lg:hover:shadow-[inset_0_1px_0_0_rgba(127,29,29,0.1)]'
                } lg:hover:drop-shadow-lg`}>
                  <h3 className={`text-xl font-medium mb-4 ${
                    isDarkMode ? 'text-slate-200' : 'text-amber-950'
                  }`}>
                    Blog Posts Coming Soon
                  </h3>
                  <p className={`mb-6 ${
                    isDarkMode ? 'text-slate-400' : 'text-amber-700'
                  }`}>
                    I'm currently working on some exciting articles about machine learning, data science, and test automation. 
                    Stay tuned for in-depth technical tutorials, project analyses, and industry insights.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className={`flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 ${
                      isDarkMode ? 'bg-yellow-400/10 text-yellow-400' : 'bg-red-800/10 text-red-800'
                    }`}>
                      Machine Learning
                    </span>
                    <span className={`flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 ${
                      isDarkMode ? 'bg-yellow-400/10 text-yellow-400' : 'bg-red-800/10 text-red-800'
                    }`}>
                      Data Science
                    </span>
                    <span className={`flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 ${
                      isDarkMode ? 'bg-yellow-400/10 text-yellow-400' : 'bg-red-800/10 text-red-800'
                    }`}>
                      Test Automation
                    </span>
                    <span className={`flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 ${
                      isDarkMode ? 'bg-yellow-400/10 text-yellow-400' : 'bg-red-800/10 text-red-800'
                    }`}>
                      Python
                    </span>
                  </div>
                </div>
              </div>
            </section>



            {/* Contact section */}
            <section id="contact" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className={`sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 ${
                isDarkMode ? 'bg-black/75' : 'bg-amber-50/75'
              }`}>
                <h2 className={`text-sm font-bold uppercase tracking-widest lg:sr-only ${
                  isDarkMode ? 'text-slate-200' : 'text-amber-950'
                }`}>
                  Contact
                </h2>
              </div>
              <div>
                <form onSubmit={handleSubmit} className="max-w-md space-y-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-200' : 'text-amber-950'
                    }`}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      autoComplete="off"
                      required
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-800/50 border-slate-600 text-slate-200 placeholder-slate-400 focus:ring-yellow-400' 
                          : 'bg-amber-50/50 border-red-200 text-amber-950 placeholder-amber-600 focus:ring-red-800'
                      }`}
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-200' : 'text-amber-950'
                    }`}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="off"
                      required
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-800/50 border-slate-600 text-slate-200 placeholder-slate-400 focus:ring-yellow-400' 
                          : 'bg-amber-50/50 border-red-200 text-amber-950 placeholder-amber-600 focus:ring-red-800'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="title" className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-200' : 'text-amber-950'
                    }`}>
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      autoComplete="off"
                      required
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-800/50 border-slate-600 text-slate-200 placeholder-slate-400 focus:ring-yellow-400' 
                          : 'bg-amber-50/50 border-red-200 text-amber-950 placeholder-amber-600 focus:ring-red-800'
                      }`}
                      placeholder="Subject/Title of your message"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-200' : 'text-amber-950'
                    }`}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      autoComplete="off"
                      required
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-colors resize-none ${
                        isDarkMode 
                          ? 'bg-slate-800/50 border-slate-600 text-slate-200 placeholder-slate-400 focus:ring-yellow-400' 
                          : 'bg-amber-50/50 border-red-200 text-amber-950 placeholder-amber-600 focus:ring-red-800'
                      }`}
                      placeholder="Your message..."
                    />
                  </div>
                  
                  {/* Show success/error messages */}
                  {submissionStatus === 'success' && (
                    <div className="px-4 py-3 bg-green-400/10 border border-green-400/20 rounded-md text-green-400">
                      Your message has been sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  
                  {submissionStatus === 'error' && (
                    <div className="px-4 py-3 bg-red-400/10 border border-red-400/20 rounded-md text-red-400">
                      There was an error sending your message. Please check your email format and try again, or contact me directly via LinkedIn.
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`relative px-6 py-3 border rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                        isDarkMode 
                          ? 'bg-yellow-400/10 border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/20 hover:border-yellow-400/40 focus:ring-yellow-400 focus:ring-offset-black' 
                          : 'bg-red-800/10 border-red-800/20 text-red-800 hover:bg-red-800/20 hover:border-red-800/40 focus:ring-red-800 focus:ring-offset-amber-50'
                      } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="opacity-0">Send Message</span>
                          <span className="absolute inset-0 flex items-center justify-center">
                            <svg className={`animate-spin h-5 w-5 ${
                              isDarkMode ? 'text-yellow-400' : 'text-red-800'
                            }`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </span>
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleRefresh}
                      className={`px-6 py-3 border rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-600/20 border-slate-600/40 text-slate-300 hover:bg-slate-600/30 hover:border-slate-600/60 focus:ring-slate-400 focus:ring-offset-black' 
                          : 'bg-amber-200/50 border-amber-400/40 text-amber-800 hover:bg-amber-200/70 hover:border-amber-400/60 focus:ring-amber-600 focus:ring-offset-amber-50'
                      }`}
                    >
                      Clear Form
                    </button>
                    
                    <a className={`inline-flex items-center font-medium leading-tight font-semibold group ${
                      isDarkMode ? 'text-slate-200' : 'text-amber-950'
                    }`} href="https://www.linkedin.com/in/soheb-khan/">
                      <span>
                        <span className={`border-b border-transparent pb-px transition motion-reduce:transition-none ${
                          isDarkMode ? 'group-hover:border-yellow-400' : 'group-hover:border-red-800'
                        }`}>
                          Say Hello
                        </span>
                        <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
                      </span>
                    </a>
                  </div>
                </form>
              </div>
            </section>

            <footer className={`max-w-md pb-16 text-sm sm:pb-0 ${
              isDarkMode ? 'text-slate-500' : 'text-amber-700'
            }`}>
              <p>
                Design inspired by{" "}
                <a href="https://brittanychiang.com/" className={`font-medium transition-colors ${
                  isDarkMode ? 'text-slate-400 hover:text-yellow-400 focus-visible:text-yellow-400' : 'text-black hover:text-red-800 focus-visible:text-red-800'
                }`} target="_blank" rel="noreferrer">
                  Brittany Chiang
                </a>{" "}
                — brilliant & elegant.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;