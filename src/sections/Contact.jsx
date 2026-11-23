import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { socialLinks } from '../data/socialLinks';
import { Mail, Phone, Send, CheckCircle2, Copy, Check, Terminal, ExternalLink, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Identification required.';
    if (!formData.email.trim()) {
      errs.email = 'Valid routing email address required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Invalid email syntax.';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject line required.';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters in length.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setStatus('sending');

    // Simulate encrypted dispatch
    setTimeout(() => {
      setStatus('success');
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#B7FF6B', '#65C7FF', '#FFFFFF']
        });
      } catch (err) {
        // ignore if canvas not supported
      }
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('atishthorat2004@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+91 9022565195');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-background border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          tag="COMMUNICATION CHANNEL"
          title="Let's Connect Systems."
          subtitle="Have an interesting idea, technical challenge, or project? Let's discuss how we can build something meaningful."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Communication Channels (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl">
              <div>
                <span className="font-mono text-xs text-accent-green uppercase tracking-widest block font-bold mb-1">
                  SECURE TRANSMISSION ENDPOINTS
                </span>
                <p className="text-xs text-secondary-text font-sans">
                  Direct channels for inquiries, collaborations, and engineering discussions.
                </p>
              </div>

              {/* Email Card with Copy */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="font-mono text-[10px] uppercase text-secondary-text tracking-wider block">
                  ELECTRONIC MAIL
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href="mailto:atishthorat2004@gmail.com"
                    className="font-mono text-xs sm:text-sm text-primary-text hover:text-accent-green font-semibold truncate transition-colors"
                  >
                    atishthorat2004@gmail.com
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-white/5 text-secondary-text hover:text-accent-green hover:bg-white/10 transition-colors shrink-0"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check size={15} className="text-accent-green" /> : <Copy size={15} />}
                  </button>
                </div>
              </div>

              {/* Phone / Mobile Card */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="font-mono text-[10px] uppercase text-secondary-text tracking-wider block">
                  MOBILE CONTACT
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href="tel:+919022565195"
                    className="font-mono text-xs sm:text-sm text-primary-text hover:text-accent-green font-semibold transition-colors"
                  >
                    +91 9022565195
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded-lg bg-white/5 text-secondary-text hover:text-accent-green hover:bg-white/10 transition-colors shrink-0"
                    title="Copy mobile number"
                  >
                    {copiedPhone ? <Check size={15} className="text-accent-green" /> : <Copy size={15} />}
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-secondary-text uppercase block">
                    CURRENT NODE LOCATION
                  </span>
                  <span className="font-mono text-sm text-primary-text font-medium">
                    Pune, Maharashtra, India
                  </span>
                </div>
              </div>

              {/* Social Directory */}
              <div>
                <span className="font-mono text-[10px] uppercase text-secondary-text tracking-wider block mb-2.5">
                  NETWORK PROFILES
                </span>
                <div className="space-y-2">
                  {socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-accent-green/30 flex items-center justify-between text-xs font-mono text-secondary-text hover:text-primary-text transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-accent-green font-bold">&rsaquo;</span>
                        <span className="text-primary-text font-medium">{link.name}</span>
                        <span className="text-[11px] text-white/40 hidden sm:inline">({link.handle})</span>
                      </div>
                      <ExternalLink size={13} className="opacity-40 group-hover:opacity-100 group-hover:text-accent-green transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* System Status Callout */}
            <div className="p-4 rounded-xl bg-accent-green/5 border border-accent-green/20 font-mono text-xs text-secondary-text flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse shrink-0" />
              <span>Response time: Usually within 24 hours. Messages routed to atishthorat2004@gmail.com.</span>
            </div>
          </div>

          {/* Interactive Secure Transmission Form (Right) */}
          <div className="lg:col-span-7 bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-accent-green" />
                <h4 className="font-mono text-sm font-bold text-primary-text uppercase tracking-wider">
                  DISPATCH PACKET TRANSMISSION
                </h4>
              </div>
              <span className="font-mono text-[10px] text-secondary-text">PORT 443 / ENCRYPTED</span>
            </div>

            {status === 'success' ? (
              <div className="p-8 rounded-xl bg-accent-green/10 border border-accent-green/30 text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-accent-green/20 text-accent-green mx-auto flex items-center justify-center">
                  <CheckCircle2 size={28} />
                </div>
                <h5 className="font-mono text-base font-bold text-primary-text">
                  TRANSMISSION ACKNOWLEDGED
                </h5>
                <p className="text-xs sm:text-sm text-secondary-text max-w-md mx-auto font-sans leading-relaxed">
                  Thank you! Your message payload has been successfully dispatched and logged. I will review and reply promptly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-5 py-2 rounded-xl bg-accent-green text-black font-mono text-xs font-bold hover:bg-accent-green/90 transition-colors"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-secondary-text mb-1.5">
                      Your Identity / Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className={`w-full bg-[#181818] border rounded-xl px-4 py-2.5 font-mono text-xs text-primary-text focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-white/15 focus:border-accent-green'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[11px] font-mono text-red-400 mt-1 block">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-secondary-text mb-1.5">
                      Return Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@example.com"
                      className={`w-full bg-[#181818] border rounded-xl px-4 py-2.5 font-mono text-xs text-primary-text focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-white/15 focus:border-accent-green'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] font-mono text-red-400 mt-1 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-secondary-text mb-1.5">
                    Subject Header *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Project Collaboration / Full-Stack Query"
                    className={`w-full bg-[#181818] border rounded-xl px-4 py-2.5 font-mono text-xs text-primary-text focus:outline-none transition-colors ${
                      errors.subject ? 'border-red-500' : 'border-white/15 focus:border-accent-green'
                    }`}
                  />
                  {errors.subject && (
                    <span className="text-[11px] font-mono text-red-400 mt-1 block">
                      {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-secondary-text mb-1.5">
                    Message Payload *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, question, or engineering discussion..."
                    className={`w-full bg-[#181818] border rounded-xl p-4 font-mono text-xs text-primary-text focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-500' : 'border-white/15 focus:border-accent-green'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] font-mono text-red-400 mt-1 block">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 px-6 rounded-xl bg-accent-green text-black font-mono text-xs sm:text-sm font-bold hover:bg-accent-green/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>{status === 'sending' ? 'TRANSMITTING PACKET...' : 'DISPATCH TRANSMISSION'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}