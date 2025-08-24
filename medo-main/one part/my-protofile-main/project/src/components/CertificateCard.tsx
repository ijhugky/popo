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
          <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-blue-400/30 via-pink-400/30 to-green-500/30 group-hover:from-blue-400/50 group-hover:to-green-500/50 transition">
            <div className="w-full h-56 md:h-64 flex items-center justify-center rounded-[0.65rem] bg-black/30 group-hover:bg-black/20 transition">
              <img src={imageSrc} alt={title} className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
            </div>
            <span className="pointer-events-none absolute -inset-2 rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity bg-gradient-to-r from-blue-400/20 via-pink-400/20 to-green-500/20" />
          </div>
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

