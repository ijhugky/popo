import React from 'react';

interface WorkCardProps {
  imageSrc: string;
  title: string;
  description: string;
  link?: string;
  showViewButton?: boolean;
}

const WorkCard: React.FC<WorkCardProps> = ({ imageSrc, title, description, link, showViewButton = false }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-black/30">
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-green-400/10 via-pink-400/10 to-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />

      <div className="relative grid md:grid-cols-2 gap-0">
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
          <div className="w-full h-56 md:h-64 flex items-center justify-center bg-black/20">
            <img src={imageSrc} alt={title} className="max-h-full max-w-full object-contain" />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
        </div>
        <div className="p-6 flex flex-col gap-4">
          <h4 className="text-xl font-bold text-white">{title}</h4>
          <p className="text-white/80 leading-relaxed">{description}</p>
          {showViewButton && link && (
            <div className="pt-2">
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-gradient-to-r from-green-400/20 to-pink-500/20 border border-white/10 text-white font-semibold hover:from-green-400/30 hover:to-pink-500/30 transition"
              >
                View the web
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkCard;

