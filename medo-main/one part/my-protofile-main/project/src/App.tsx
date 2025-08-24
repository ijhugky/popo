import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground';
import GradientText from './components/GradientText';
import NeonButton from './components/NeonButton';
import ProfileImage from './components/ProfileImage';
import TypingText from './components/TypingText';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import AdminExitButton from './components/AdminExitButton';
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
  const [items, setItems] = React.useState<Array<{ id: string; imageSrc: string; title: string; description: string; link?: string }>>([]);
  const [showAdminModal, setShowAdminModal] = React.useState(false);
  const [ghToken, setGhToken] = React.useState<string>(localStorage.getItem('gh_token') || '');
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingDraft, setEditingDraft] = React.useState<{ imageSrc: string; title: string; description: string; link?: string } | null>(null);

  React.useEffect(() => {
    // Load published content for everyone
    fetch('/content.json', { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : { works: [] })
      .then((data) => {
        if (Array.isArray(data?.works)) setItems(data.works);
      })
      .catch(() => {
        const saved = localStorage.getItem('works');
        if (saved) setItems(JSON.parse(saved));
      });
  }, []);

  React.useEffect(() => {
    localStorage.setItem('works', JSON.stringify(items));
  }, [items]);

  const handleLongPress = React.useCallback(() => setShowAdminModal(true), []);

  const publishWorksToGitHub = async (arr?: Array<{ id: string; imageSrc: string; title: string; description: string; link?: string }>) => {
    if (!ghToken) {
      alert('Please set a GitHub token first.');
      return;
    }
    try {
      const owner = 'ijhugky';
      const repo = 'popo';
      const path = 'medo-main/one part/my-protofile-main/project/public/content.json';
      const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/` + encodeURIComponent(path).replace(/%2F/g, '/');
      const getRes = await fetch(apiBase, { headers: { Authorization: `token ${ghToken}` } });
      const getJson = await getRes.json();
      let existing = { works: [], certificates: [] } as { works: any[]; certificates: any[] };
      if (getRes.ok && getJson.content) {
        const decoded = atob(getJson.content);
        existing = JSON.parse(decoded);
      }
      const updated = { ...existing, works: arr || items };
      const contentB64 = btoa(JSON.stringify(updated, null, 2));
      const putRes = await fetch(apiBase, {
        method: 'PUT',
        headers: { Authorization: `token ${ghToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'chore(content): update works', content: contentB64, sha: getJson.sha })
      });
      if (!putRes.ok) {
        const err = await putRes.text();
        throw new Error(err);
      }
      alert('Published works. Netlify will rebuild automatically.');
    } catch (e: any) {
      alert('Failed to publish: ' + (e?.message || 'Unknown error'));
    }
  };

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
            <p className="text-white/70">No works yet.</p>
          )}
          {items.map((w) => (
            <div key={w.id} className="space-y-2">
              <WorkCard imageSrc={w.imageSrc} title={w.title} description={w.description} link={w.link} showViewButton />
              {isAdmin && (
                <div className="flex gap-2">
                  <button onClick={() => { setEditingId(w.id); setEditingDraft({ imageSrc: w.imageSrc, title: w.title, description: w.description, link: w.link }); }} className="px-3 py-1 rounded-full border border-white/10 text-white bg-white/10 hover:bg-white/15">Edit</button>
                  <button onClick={() => {
                    if (!confirm('Delete this item?')) return;
                    const next = items.filter((it) => it.id !== w.id);
                    setItems(next);
                    publishWorksToGitHub(next);
                  }} className="px-3 py-1 rounded-full border border-white/10 text-white bg-red-500/20 hover:bg-red-500/30">Delete</button>
                </div>
              )}
              {isAdmin && editingId === w.id && editingDraft && (
                <div className="p-3 rounded-xl border border-white/10 bg-white/5 grid md:grid-cols-2 gap-2">
                  <input value={editingDraft.imageSrc} onChange={(e) => setEditingDraft({ ...editingDraft, imageSrc: e.target.value })} placeholder="Image URL or Data URL" className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
                  <input value={editingDraft.title} onChange={(e) => setEditingDraft({ ...editingDraft, title: e.target.value })} placeholder="Title" className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
                  <input value={editingDraft.link || ''} onChange={(e) => setEditingDraft({ ...editingDraft, link: e.target.value })} placeholder="Project URL" className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
                  <textarea value={editingDraft.description} onChange={(e) => setEditingDraft({ ...editingDraft, description: e.target.value })} placeholder="Description" className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none md:col-span-2" />
                  <div className="md:col-span-2 flex gap-2">
                    <button onClick={() => { setEditingId(null); setEditingDraft(null); }} className="px-3 py-1 rounded-full border border-white/10 text-white bg-white/10">Cancel</button>
                    <button onClick={() => {
                      if (!editingDraft) return;
                      const next = items.map((it) => it.id === w.id ? { ...it, ...editingDraft } : it);
                      setItems(next);
                      setEditingId(null); setEditingDraft(null);
                      publishWorksToGitHub(next);
                    }} className="px-3 py-1 rounded-full border border-white/10 text-white bg-green-500/30">Save</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {isAdmin && (
          <>
            <WorksAdminEditor onAdd={(payload) => {
              const newItem = { id: crypto.randomUUID(), ...payload };
              const next = [newItem, ...items];
              setItems(next);
              publishWorksToGitHub(next);
            }} />
            <div className="mt-4 p-4 rounded-2xl border border-white/10 bg-white/5 flex flex-col md:flex-row gap-3 items-start md:items-end">
              <div className="flex-1 w-full">
                <label className="block text-white/80 text-sm mb-1">GitHub Token (repo scope)</label>
                <input type="password" value={ghToken} onChange={(e) => { setGhToken(e.target.value); localStorage.setItem('gh_token', e.target.value); }} className="w-full px-3 py-2 rounded-lg bg-white/10 text-white outline-none" placeholder="ghp_..." />
              </div>
              <button onClick={() => publishWorksToGitHub()} className="px-4 py-2 rounded-full border border-white/10 text-white bg-gradient-to-r from-green-500/30 to-blue-500/30">Publish Works</button>
            </div>
          </>
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(String(reader.result || ''));
    reader.readAsDataURL(file);
  };
  return (
    <div className="mt-8 p-4 rounded-2xl border border-white/10 bg-white/5">
      <h4 className="text-white font-semibold mb-3">Add Work (Admin)</h4>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <input value={imageSrc} onChange={(e) => setImageSrc(e.target.value)} placeholder="/1.jpg or https://..." className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
          <input type="file" accept="image/*" onChange={handleFileChange} className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
          {imageSrc && (
            <div className="rounded-lg border border-white/10 bg-black/20 p-2">
              <img src={imageSrc} alt="preview" className="max-h-32 object-contain mx-auto" />
            </div>
          )}
        </div>
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
  const [items, setItems] = React.useState<Array<{ id: string; imageSrc: string; title: string; description: string }>>([]);
  const [showAdminModal, setShowAdminModal] = React.useState(false);
  const [ghToken, setGhToken] = React.useState<string>(localStorage.getItem('gh_token') || '');
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingDraft, setEditingDraft] = React.useState<{ imageSrc: string; title: string; description: string } | null>(null);

  React.useEffect(() => {
    fetch('/content.json', { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : { certificates: [] })
      .then((data) => {
        if (Array.isArray(data?.certificates)) setItems(data.certificates);
      })
      .catch(() => {
        const saved = localStorage.getItem('certificates');
        if (saved) setItems(JSON.parse(saved));
      });
  }, []);

  React.useEffect(() => {
    localStorage.setItem('certificates', JSON.stringify(items));
  }, [items]);

  const handleLongPress = React.useCallback(() => setShowAdminModal(true), []);

  const publishCertificatesToGitHub = async (arr?: Array<{ id: string; imageSrc: string; title: string; description: string }>) => {
    if (!ghToken) { alert('Please set a GitHub token first.'); return; }
    try {
      const owner = 'ijhugky';
      const repo = 'popo';
      const path = 'medo-main/one part/my-protofile-main/project/public/content.json';
      const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/` + encodeURIComponent(path).replace(/%2F/g, '/');
      const getRes = await fetch(apiBase, { headers: { Authorization: `token ${ghToken}` } });
      const getJson = await getRes.json();
      let existing = { works: [], certificates: [] } as { works: any[]; certificates: any[] };
      if (getRes.ok && getJson.content) {
        const decoded = atob(getJson.content);
        existing = JSON.parse(decoded);
      }
      const updated = { ...existing, certificates: arr || items };
      const contentB64 = btoa(JSON.stringify(updated, null, 2));
      const putRes = await fetch(apiBase, {
        method: 'PUT',
        headers: { Authorization: `token ${ghToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'chore(content): update certificates', content: contentB64, sha: getJson.sha })
      });
      if (!putRes.ok) throw new Error(await putRes.text());
      alert('Published certificates. Netlify will rebuild automatically.');
    } catch (e: any) {
      alert('Failed to publish: ' + (e?.message || 'Unknown error'));
    }
  };

  return (
    <div className="relative z-10 min-h-screen px-6 py-28">
      <div className="mx-auto max-w-6xl" onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') return;
        const t = e.currentTarget as any; t._pressTimer = setTimeout(handleLongPress, 800);
      }} onPointerUp={(e) => { const t = e.currentTarget as any; if (t._pressTimer) clearTimeout(t._pressTimer); }}>
        <h3 className="text-3xl font-bold text-white mb-6">Certificates</h3>
        <div className="grid gap-6">
          {items.length === 0 && (
            <p className="text-white/70">No certificates yet.</p>
          )}
          {items.map((c) => (
            <div key={c.id} className="space-y-2">
              <CertificateCard imageSrc={c.imageSrc} title={c.title} description={c.description} />
              {isAdmin && (
                <div className="flex gap-2">
                  <button onClick={() => { setEditingId(c.id); setEditingDraft({ imageSrc: c.imageSrc, title: c.title, description: c.description }); }} className="px-3 py-1 rounded-full border border-white/10 text-white bg-white/10 hover:bg-white/15">Edit</button>
                  <button onClick={() => {
                    if (!confirm('Delete this item?')) return;
                    const next = items.filter((it) => it.id !== c.id);
                    setItems(next);
                    publishCertificatesToGitHub(next);
                  }} className="px-3 py-1 rounded-full border border-white/10 text-white bg-red-500/20 hover:bg-red-500/30">Delete</button>
                </div>
              )}
              {isAdmin && editingId === c.id && editingDraft && (
                <div className="p-3 rounded-xl border border-white/10 bg-white/5 grid md:grid-cols-2 gap-2">
                  <input value={editingDraft.imageSrc} onChange={(e) => setEditingDraft({ ...editingDraft, imageSrc: e.target.value })} placeholder="Image URL or Data URL" className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
                  <input value={editingDraft.title} onChange={(e) => setEditingDraft({ ...editingDraft, title: e.target.value })} placeholder="Title" className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
                  <textarea value={editingDraft.description} onChange={(e) => setEditingDraft({ ...editingDraft, description: e.target.value })} placeholder="Description" className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none md:col-span-2" />
                  <div className="md:col-span-2 flex gap-2">
                    <button onClick={() => { setEditingId(null); setEditingDraft(null); }} className="px-3 py-1 rounded-full border border-white/10 text-white bg-white/10">Cancel</button>
                    <button onClick={() => {
                      if (!editingDraft) return;
                      const next = items.map((it) => it.id === c.id ? { ...it, ...editingDraft } : it);
                      setItems(next);
                      setEditingId(null); setEditingDraft(null);
                      publishCertificatesToGitHub(next);
                    }} className="px-3 py-1 rounded-full border border-white/10 text-white bg-green-500/30">Save</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {isAdmin && (
          <>
            <CertificatesAdminEditor onAdd={(payload) => {
              const newItem = { id: crypto.randomUUID(), ...payload };
              const next = [newItem, ...items];
              setItems(next);
              publishCertificatesToGitHub(next);
            }} />
            <div className="mt-4 p-4 rounded-2xl border border-white/10 bg-white/5 flex flex-col md:flex-row gap-3 items-start md:items-end">
              <div className="flex-1 w-full">
                <label className="block text-white/80 text-sm mb-1">GitHub Token (repo scope)</label>
                <input type="password" value={ghToken} onChange={(e) => { setGhToken(e.target.value); localStorage.setItem('gh_token', e.target.value); }} className="w-full px-3 py-2 rounded-lg bg-white/10 text-white outline-none" placeholder="ghp_..." />
              </div>
              <button onClick={() => publishCertificatesToGitHub()} className="px-4 py-2 rounded-full border border-white/10 text-white bg-gradient-to-r from-green-500/30 to-blue-500/30">Publish Certificates</button>
            </div>
          </>
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(String(reader.result || ''));
    reader.readAsDataURL(file);
  };
  return (
    <div className="mt-8 p-4 rounded-2xl border border-white/10 bg-white/5">
      <h4 className="text-white font-semibold mb-3">Add Certificate (Admin)</h4>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <input value={imageSrc} onChange={(e) => setImageSrc(e.target.value)} placeholder="/6.jpg or https://..." className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
          <input type="file" accept="image/*" onChange={handleFileChange} className="px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
          {imageSrc && (
            <div className="rounded-lg border border-white/10 bg-black/20 p-2">
              <img src={imageSrc} alt="preview" className="max-h-32 object-contain mx-auto" />
            </div>
          )}
        </div>
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
        <GradientText className="text-3xl md:text-4xl font-extrabold tracking-tight">About</GradientText>
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-green-400/30 via-pink-400/30 to-blue-500/30">
            <div className="w-full h-64 md:h-72 flex items-center justify-center rounded-[0.65rem] bg-black/30">
              <img src="/1.jpg" alt="About 1" className="max-h-full max-w-full object-contain" />
            </div>
            <span className="pointer-events-none absolute -inset-2 rounded-2xl blur-2xl opacity-40 bg-gradient-to-r from-green-400/20 via-pink-400/20 to-blue-500/20" />
          </div>
          <div className="p-6">
            <h4 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 bg-clip-text text-transparent">Expert Full-Stack Developer</h4>
            <p className="text-white/90 leading-relaxed text-base md:text-lg">
              I deliver modern, responsive, and high-performance web applications with a strong focus on clean architecture and scalability. I transform ideas into real products with premium quality, writing maintainable code and building robust solutions for complex business needs.
            </p>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-blue-400/30 via-pink-400/30 to-green-500/30">
            <div className="w-full h-64 md:h-72 flex items-center justify-center rounded-[0.65rem] bg-black/30">
              <img src="/6.jpg" alt="About 6" className="max-h-full max-w-full object-contain" />
            </div>
            <span className="pointer-events-none absolute -inset-2 rounded-2xl blur-2xl opacity-40 bg-gradient-to-r from-blue-400/20 via-pink-400/20 to-green-500/20" />
          </div>
          <div className="p-6">
            <h4 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-pink-500 to-green-500 bg-clip-text text-transparent">Education</h4>
            <p className="text-white/90 leading-relaxed text-base md:text-lg">Graduated from Nile University.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const [form, setForm] = React.useState({ first: '', middle: '', last: '', phone: '', desc: '' });
  const [sent, setSent] = React.useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder submit: يمكنك ربطه بخدمة بريد لاحقًا
    console.log('Contact form:', form);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ first: '', middle: '', last: '', phone: '', desc: '' });
  };
  return (
    <div className="relative z-10 min-h-screen px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <GradientText className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">Let's Talk</GradientText>
        <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-green-400/30 via-blue-500/30 to-pink-500/30">
          <div className="rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 p-6 md:p-8">
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid md:grid-cols-3 gap-3">
                <div className="group">
                  <label className="block text-xs text-white/70 mb-1">First name</label>
                  <input name="first" value={form.first} onChange={onChange} required placeholder="Mohamed" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-green-500/60" />
                </div>
                <div className="group">
                  <label className="block text-xs text-white/70 mb-1">Middle name</label>
                  <input name="middle" value={form.middle} onChange={onChange} placeholder="A." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/60" />
                </div>
                <div className="group">
                  <label className="block text-xs text-white/70 mb-1">Last name</label>
                  <input name="last" value={form.last} onChange={onChange} required placeholder="Abdelsattar" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-pink-500/60" />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs text-white/70 mb-1">Phone</label>
                <input name="phone" type="tel" value={form.phone} onChange={onChange} required placeholder="+20 1XX XXX XXXX" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/60" />
              </div>

              <div className="group">
                <label className="block text-xs text-white/70 mb-1">Description</label>
                <textarea name="desc" value={form.desc} onChange={onChange} required placeholder="Describe what you need..." rows={5} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-green-500/60" />
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-sm ${sent ? 'text-green-400' : 'text-white/60'}`}>{sent ? 'Message sent! I will contact you soon.' : 'I usually respond within 24 hours.'}</span>
                <button type="submit" className="relative px-6 py-3 rounded-full font-semibold text-white border border-white/10 bg-gradient-to-r from-green-500/30 to-blue-500/30 hover:from-green-500/40 hover:to-blue-500/40">
                  <span className="absolute -inset-1 rounded-full blur-2xl opacity-30 bg-gradient-to-r from-green-400/50 via-blue-500/50 to-pink-500/50" aria-hidden="true" />
                  <span className="relative">Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
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
      <AdminExitButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/skills" element={<Certificates />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/talk" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;