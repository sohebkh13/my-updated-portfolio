import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';

const Archive: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
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
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="py-24">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <Link to="/" className={`inline-flex items-center transition-colors ${
                isDarkMode ? 'text-slate-200 hover:text-yellow-400' : 'text-amber-950 hover:text-red-800'
              }`}>
                <ArrowLeft size={18} className="mr-2" />
                <span className="text-sm font-medium">Soheb Khan</span>
              </Link>
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 text-yellow-400 hover:bg-slate-700/50' 
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight mt-4 ${
              isDarkMode ? 'text-slate-200' : 'text-amber-950'
            }`}>
              All Projects
            </h1>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className={`border-b ${
                  isDarkMode ? 'border-slate-700' : 'border-red-200'
                }`}>
                  <th className={`py-4 pr-8 text-left text-sm font-semibold uppercase tracking-wide ${
                    isDarkMode ? 'text-slate-500' : 'text-amber-700'
                  }`}>Year</th>
                  <th className={`py-4 px-8 text-left text-sm font-semibold uppercase tracking-wide ${
                    isDarkMode ? 'text-slate-500' : 'text-amber-700'
                  }`}>Project</th>
                  <th className={`hidden xl:table-cell py-4 px-8 text-left text-sm font-semibold uppercase tracking-wide ${
                    isDarkMode ? 'text-slate-500' : 'text-amber-700'
                  }`}>Made at</th>
                  <th className={`hidden xl:table-cell py-4 px-8 text-left text-sm font-semibold uppercase tracking-wide ${
                    isDarkMode ? 'text-slate-500' : 'text-amber-700'
                  }`}>Built with</th>
                  <th className={`hidden sm:table-cell py-4 pl-8 text-left text-sm font-semibold uppercase tracking-wide ${
                    isDarkMode ? 'text-slate-500' : 'text-amber-700'
                  }`}>Link</th>
                </tr>
              </thead>
              <tbody>
                {allProjects.map((project, index) => (
                  <tr 
                    key={index} 
                    className={`border-b transition-colors ${
                      isDarkMode 
                        ? 'border-slate-800 hover:bg-slate-800/50' 
                        : 'border-red-100 hover:bg-red-50/50'
                    }`}
                  >
                    <td className="py-4 pr-8 align-top text-sm">
                      <div className={isDarkMode ? 'text-slate-500' : 'text-amber-700'}>{project.year}</div>
                    </td>
                    <td className="py-4 px-8 align-top text-sm">
                      <div className={`font-medium ${
                        isDarkMode ? 'text-slate-200' : 'text-amber-950'
                      }`}>
                        {/* On mobile: project name becomes clickable */}
                        <a 
                          href={project.link} 
                          className={`sm:hidden inline-flex items-center transition-colors ${
                            isDarkMode ? 'text-slate-200 hover:text-yellow-400' : 'text-amber-950 hover:text-red-800'
                          }`}
                          target="_blank" 
                          rel="noreferrer"
                        >
                          {project.title}
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        </a>
                        {/* On tablet and desktop: project name is just text */}
                        <span className="hidden sm:block">{project.title}</span>
                      </div>
                    </td>
                    <td className="hidden xl:table-cell py-4 px-8 align-top text-sm">
                      <div className={isDarkMode ? 'text-slate-200' : 'text-amber-950'}>{project.madeAt}</div>
                    </td>
                    <td className="hidden xl:table-cell py-4 px-8 align-top text-sm">
                      <div className="flex flex-wrap gap-2">
                        {project.builtWith.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className={`rounded-full px-3 py-1 text-xs font-medium leading-5 ${
                              isDarkMode ? 'bg-yellow-400/10 text-yellow-400' : 'bg-red-800/10 text-red-800'
                            }`}
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
                          className={`inline-flex items-center font-medium transition-colors ${
                            isDarkMode ? 'text-slate-200 hover:text-yellow-400' : 'text-amber-950 hover:text-red-800'
                          }`}
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
