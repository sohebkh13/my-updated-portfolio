import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Archive: React.FC = () => {
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
    <div className="bg-black text-slate-400 min-h-screen">
      {/* Cursor spotlight effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 215, 0, 0.15), transparent 80%)`
        }}
      />
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="py-24">
          <div className="mb-12">
            <Link to="/" className="inline-flex items-center text-slate-200 hover:text-yellow-400 transition-colors">
              <ArrowLeft size={18} className="mr-2" />
              <span className="text-sm font-medium">Soheb Khan</span>
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-200 mt-4">
              All Projects
            </h1>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="py-4 pr-8 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">Year</th>
                  <th className="py-4 px-8 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">Project</th>
                  <th className="py-4 px-8 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">Made at</th>
                  <th className="py-4 px-8 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">Built with</th>
                  <th className="py-4 pl-8 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">Link</th>
                </tr>
              </thead>
              <tbody>
                {allProjects.map((project, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-4 pr-8 align-top text-sm">
                      <div className="text-slate-500">{project.year}</div>
                    </td>
                    <td className="py-4 px-8 align-top text-sm">
                      <div className="font-medium text-slate-200">{project.title}</div>
                    </td>
                    <td className="py-4 px-8 align-top text-sm">
                      <div className="text-slate-200">{project.madeAt}</div>
                    </td>
                    <td className="py-4 px-8 align-top text-sm">
                      <div className="flex flex-wrap gap-2">
                        {project.builtWith.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-medium leading-5 text-yellow-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 pl-8 align-top text-sm">
                      {project.linkText && (
                        <a 
                          href={project.link} 
                          className="inline-flex items-center font-medium text-slate-200 hover:text-yellow-400 transition-colors"
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
