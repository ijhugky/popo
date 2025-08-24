import React from 'react';

interface CertificateCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-black/30">
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-400/10 via-pink-400/10 to-green-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />

      <div className="relative grid md:grid-cols-2 gap-0">
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
          <img src={imageSrc} alt={title} className="w-full h-60 md:h-full object-cover" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
        </div>
        <div className="p-6 flex flex-col gap-4">
          <h4 className="text-xl font-bold text-white">{title}</h4>
          <p className="text-white/80 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;

