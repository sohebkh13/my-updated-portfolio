import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';

// Accent color for spotlight effect
const getSpotlightColor = (isDarkMode: boolean) =>
  isDarkMode
    ? 'rgba(255, 215, 0, 0.15)'
    : 'rgba(127, 29, 29, 0.1)';

const Archive: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      // Set CSS variable for spotlight color
      document.documentElement.style.setProperty(
        '--spotlight-color',
        getSpotlightColor(isDarkMode)
      );
    };
    window.addEventListener('mousemove', handleMouseMove);
    // Set initial color
    document.documentElement.style.setProperty(
      '--spotlight-color',
      getSpotlightColor(isDarkMode)
    );
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);
  
  const allProjects = [
    {
      year: "2024",
      title: "Mortgage Prepayment Risk Analysis",
      madeAt: "Technocolabs Softwares Inc.",
      builtWith: ["Python", "pandas", "NumPy", "scikit-learn", "matplotlib", "seaborn", "EDA", "feature engineering", "classification"],
      link: "https://github.com/sohebkh13/Prepayment-Mortgage-Trading-Analysis-and-Prediction",
      linkText: "Mortgage Prepayment Risk Analysis"
    },
    {
      year: "2024",
      title: "Employee Attrition Prediction",
      madeAt: "Technocolabs Softwares Inc.",
      builtWith: ["React", "TypeScript", "Next.js", "Contentful"],
      link: "https://github.com/sohebkh13/Acme-AttritionForecast-Analysis-and-Prediction/blob/main/Acme_AttritionForecast_Analysis%20and%20Prediction.ipynb",
      linkText: "Employee Attrition Prediction"
    },
    
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 bg-amber-50 text-amber-900 dark:bg-black dark:text-slate-400">
      {/* Cursor spotlight effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, var(--spotlight-color), transparent 80%)`
        }}
      />
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="py-24">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <Link to="/" className="inline-flex items-center transition-colors text-amber-950 hover:text-red-800 dark:text-slate-200 dark:hover:text-yellow-400">
                <ArrowLeft size={18} className="mr-2" />
                <span className="text-sm font-medium">Soheb Khan</span>
              </Link>
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-3 rounded-full transition-all duration-300 hover:scale-110 bg-red-100 text-red-800 hover:bg-red-200 dark:bg-slate-800/50 dark:text-yellow-400 dark:hover:bg-slate-700/50"
                aria-label="Toggle theme"
              >
                <span className="block dark:hidden"><Moon size={20} /></span>
                <span className="hidden dark:block"><Sun size={20} /></span>
              </button>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-4 text-amber-950 dark:text-slate-200">
              All Projects
            </h1>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-red-200 dark:border-slate-700">
                  <th className="py-4 pr-8 text-left text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-slate-500">Year</th>
                  <th className="py-4 px-8 text-left text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-slate-500">Project</th>
                  <th className="hidden xl:table-cell py-4 px-8 text-left text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-slate-500">Made at</th>
                  <th className="hidden xl:table-cell py-4 px-8 text-left text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-slate-500">Built with</th>
                  <th className="hidden sm:table-cell py-4 pl-8 text-left text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-slate-500">Link</th>
                </tr>
              </thead>
              <tbody>
                {allProjects.map((project, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-red-100 dark:border-slate-800"
                  >
                    <td className="py-4 pr-8 align-top text-sm">
                      <div className="text-amber-700 dark:text-slate-500">{project.year}</div>
                    </td>
                    <td className="py-4 px-8 align-top text-sm">
                      <div className="font-medium text-amber-950 dark:text-slate-200">
                        {/* On mobile: project name becomes clickable */}
                        <a 
                          href={project.link} 
                          className="sm:hidden inline-flex items-center transition-colors text-amber-950 hover:text-red-800 dark:text-slate-200 dark:hover:text-yellow-400"
                          target="_blank" 
                          rel="noreferrer"
                          style={{ cursor: 'pointer' }}
                        >
                          {project.title}
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        </a>
                        {/* On tablet and desktop: project name is just text with accent hover */}
                        <span
                          className="hidden sm:inline font-medium transition-colors border-b border-dotted border-transparent hover:border-red-800 dark:hover:border-yellow-400 cursor-pointer"
                          tabIndex={0}
                          style={{ outline: 'none' }}
                          onMouseEnter={e => {
                            (e.target as HTMLElement).classList.add('hovered-accent');
                          }}
                          onMouseLeave={e => {
                            (e.target as HTMLElement).classList.remove('hovered-accent');
                          }}
                        >
                          {project.title}
                        </span>
                      </div>
                    </td>
                    <td className="hidden xl:table-cell py-4 px-8 align-top text-sm">
                      <div className="text-amber-950 dark:text-slate-200">{project.madeAt}</div>
                    </td>
                    <td className="hidden xl:table-cell py-4 px-8 align-top text-sm">
                      <div className="flex flex-wrap gap-2">
                        {project.builtWith.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="rounded-full px-3 py-1 text-xs font-medium leading-5 bg-red-800/10 text-red-800 dark:bg-yellow-400/10 dark:text-yellow-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="hidden sm:table-cell py-4 pl-8 align-top text-sm">
                      {project.linkText && (
                        <a 
                          href={project.link} 
                          className="inline-flex items-center font-medium transition-colors text-amber-950 hover:text-red-800 dark:text-slate-200 dark:hover:text-yellow-400"
                          target="_blank" 
                          rel="noreferrer"
                        >
                          {project.linkText}
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Archive;
