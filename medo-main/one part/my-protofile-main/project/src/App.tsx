import React from 'react';
import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground';
import GradientText from './components/GradientText';
import NeonButton from './components/NeonButton';
import ProfileImage from './components/ProfileImage';
import TypingText from './components/TypingText';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import WorkCard from './components/WorkCard';
import CertificateCard from './components/CertificateCard';
import useIsAdmin from './hooks/useIsAdmin';
import AdminPasswordModal from './components/AdminPasswordModal';

function Home() {
  const handleContactEmail = () => {
    window.location.href = 'mailto:eleanoretefo1@gmail.com';
  };
  const handleWhatsApp = () => {
    window.open('https://wa.me/201227866673', '_blank');
  };
  return (
    <div className="relative z-10 min-h-screen px-6 py-12 pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 text-left space-y-8">
          <div className="space-y-4">
            <GradientText className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <h1>Mohamed Atef</h1>
            </GradientText>
            <GradientText className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <h2>Abdelsattar</h2>
            </GradientText>
          </div>
          <GradientText className="text-lg md:text-2xl lg:text-3xl font-bold">
            <TypingText
              text="A Full Stack Developer and Web Solutions Expert with hands-on experience in building responsive websites, modern web applications, and delivering high-quality digital products tailored to client needs."
              speedMs={20}
            />
          </GradientText>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start items-center pt-2">
            <NeonButton icon={Mail} onClick={handleContactEmail} variant="primary">
              Contact Me
            </NeonButton>
            <NeonButton icon={MessageCircle} onClick={handleWhatsApp} variant="secondary">
              WhatsApp
            </NeonButton>
          </div>
        </div>
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <ProfileImage />
        </div>
      </div>
    </div>
  );
}

function Works() {
  const isAdmin = useIsAdmin();
  const [items, setItems] = React.useState<Array<{ id: string; imageSrc: string; title: string; description: string; link?: string }>>(() => {
    const saved = localStorage.getItem('works');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAdminModal, setShowAdminModal] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('works', JSON.stringify(items));
  }, [items]);

  const handleLongPress = React.useCallback(() => setShowAdminModal(true), []);

  return (
    <div className="relative z-10 min-h-screen px-6 py-28">
      <div className="mx-auto max-w-6xl" onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') return;
        const target = e.currentTarget as HTMLElement;
        (target as any)._pressTimer = setTimeout(handleLongPress, 800);
      }} onPointerUp={(e) => {
        const target = e.currentTarget as any;
        if (target._pressTimer) clearTimeout(target._pressTimer);
      }}>
        <h3 className="text-3xl font-bold text-white mb-6">Our Works</h3>
        <div className="grid gap-6">
          {items.length === 0 && (
            <p className="text-white/70">No works yet. {isAdmin ? 'Long-press anywhere to unlock admin and add items.' : ''}</p>
          )}
          {items.map((w) => (
            <WorkCard key={w.id} imageSrc={w.imageSrc} title={w.title} description={w.description} link={w.link} showViewButton />
          ))}
        </div>

        {isAdmin && (
          <WorksAdminEditor onAdd={(payload) => setItems((arr) => [{ id: crypto.randomUUID(), ...payload }, ...arr])} />
        )}
      </div>
      <AdminPasswordModal isOpen={showAdminModal} onClose={() => setShowAdminModal(false)} onSuccess={() => {}} />
    </div>
  );
}

interface WorksAdminEditorProps {
  onAdd: (payload: { imageSrc: string; title: string; description: string; link: string }) => void;
}
const WorksAdminEditor: React.FC<WorksAdminEditorProps> = ({ onAdd }) => {
  const [imageSrc, setImageSrc] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [link, setLink] = React.useState('');
  return (
    <div className="mt-8 p-4 rounded-2xl border border-white/10 bg-white/5">
      <h4 className="text-white font-semibold mb-3">Add Work (Admin)</h4>
      <div className="grid md:grid-cols-2 gap-3">
        <input value={imageSrc} onChange={(e) => setImageSrc(e.target.value)} placeholder="/1.jpg or https://..." className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
        <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Project URL" className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none md:col-span-2" />
      </div>
      <div className="mt-3">
        <button onClick={() => {
          if (!imageSrc || !title || !description || !link) return;
          onAdd({ imageSrc, title, description, link });
          setImageSrc(''); setTitle(''); setDescription(''); setLink('');
        }} className="px-4 py-2 rounded-full border border-white/10 text-white bg-white/10 hover:bg-white/15">Add</button>
      </div>
    </div>
  );
};
function Certificates() {
  const isAdmin = useIsAdmin();
  const [items, setItems] = React.useState<Array<{ id: string; imageSrc: string; title: string; description: string }>>(() => {
    const saved = localStorage.getItem('certificates');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAdminModal, setShowAdminModal] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('certificates', JSON.stringify(items));
  }, [items]);

  const handleLongPress = React.useCallback(() => setShowAdminModal(true), []);

  return (
    <div className="relative z-10 min-h-screen px-6 py-28">
      <div className="mx-auto max-w-6xl" onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') return;
        const t = e.currentTarget as any; t._pressTimer = setTimeout(handleLongPress, 800);
      }} onPointerUp={(e) => { const t = e.currentTarget as any; if (t._pressTimer) clearTimeout(t._pressTimer); }}>
        <h3 className="text-3xl font-bold text-white mb-6">Certificates</h3>
        <div className="grid gap-6">
          {items.length === 0 && (
            <p className="text-white/70">No certificates yet. {isAdmin ? 'Long-press anywhere to unlock admin and add items.' : ''}</p>
          )}
          {items.map((c) => (
            <CertificateCard key={c.id} imageSrc={c.imageSrc} title={c.title} description={c.description} />
          ))}
        </div>

        {isAdmin && (
          <CertificatesAdminEditor onAdd={(payload) => setItems((arr) => [{ id: crypto.randomUUID(), ...payload }, ...arr])} />
        )}
      </div>
      <AdminPasswordModal isOpen={showAdminModal} onClose={() => setShowAdminModal(false)} onSuccess={() => {}} />
    </div>
  );
}

interface CertificatesAdminEditorProps {
  onAdd: (payload: { imageSrc: string; title: string; description: string }) => void;
}
const CertificatesAdminEditor: React.FC<CertificatesAdminEditorProps> = ({ onAdd }) => {
  const [imageSrc, setImageSrc] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  return (
    <div className="mt-8 p-4 rounded-2xl border border-white/10 bg-white/5">
      <h4 className="text-white font-semibold mb-3">Add Certificate (Admin)</h4>
      <div className="grid md:grid-cols-2 gap-3">
        <input value={imageSrc} onChange={(e) => setImageSrc(e.target.value)} placeholder="/6.jpg or https://..." className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none md:col-span-2" />
      </div>
      <div className="mt-3">
        <button onClick={() => {
          if (!imageSrc || !title || !description) return;
          onAdd({ imageSrc, title, description });
          setImageSrc(''); setTitle(''); setDescription('');
        }} className="px-4 py-2 rounded-full border border-white/10 text-white bg-white/10 hover:bg-white/15">Add</button>
      </div>
    </div>
  );
};
function About() {
  return (
    <div className="relative z-10 min-h-screen px-6 py-28">
      <div className="mx-auto max-w-6xl space-y-8">
        <h3 className="text-3xl font-bold text-white">About</h3>
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <img src="/1.jpg" alt="About 1" className="w-full h-72 object-cover" />
          <div className="p-6">
            <p className="text-white/80 leading-relaxed">
              I am a highly skilled and experienced software engineer specialized in full-stack web development. I build modern, responsive, and performant applications, focusing on clean architecture, scalability, and user-centric design. I excel at transforming ideas into real products with high quality standards, delivering maintainable code and robust solutions for complex business needs.
            </p>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <img src="/6.jpg" alt="About 6" className="w-full h-72 object-cover" />
          <div className="p-6">
            <p className="text-white/80 leading-relaxed">Graduated from Nile University.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
function Contact() {
  return (
    <div className="relative z-10 min-h-screen px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <h3 className="text-3xl font-bold text-white mb-4">Contact</h3>
        <p className="text-white/70">Contact details coming soon.</p>
      </div>
    </div>
  );
}
function Login() {
  return (
    <div className="relative z-10 min-h-screen px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <h3 className="text-3xl font-bold text-white mb-4">Login</h3>
        <p className="text-white/70">Authentication coming soon.</p>
      </div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadingComplete = () => setIsLoading(false);
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <Navbar />
      <AnimatedBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/skills" element={<Certificates />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;