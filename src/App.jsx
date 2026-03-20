import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Eye, LayoutTemplate, LayoutPanelLeft, Zap, CheckCircle2, 
  ChevronDown, ArrowRight, Mail, Shield, Twitter, Linkedin, Github, MessageSquare, X
} from 'lucide-react';

const BACKEND_URL = 'https://flowmail-backend.onrender.com';

// ─── Email Modal ────────────────────────────────────────────────────────────
const EmailModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    onConfirm(email);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-borderLight w-full max-w-md p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-outfit font-semibold text-xl text-textPrimary">Upgrade to Pro</h3>
                <p className="text-sm text-textSecondary mt-1">Enter your email to continue to checkout.</p>
              </div>
              <button onClick={onClose} className="text-textSecondary hover:text-textPrimary transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-[14px] border border-borderLight bg-background text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-[15px]"
                  autoFocus
                />
                {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary-500 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-[14px] font-medium transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Processing...
                  </>
                ) : 'Proceed to Payment'}
              </button>
            </form>

            <p className="text-center text-xs text-textSecondary mt-4 flex items-center justify-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Secured by Razorpay
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Toast ───────────────────────────────────────────────────────────────────
const Toast = ({ message, type, visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3.5 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 ${
          type === 'success'
            ? 'bg-green-600 text-white'
            : 'bg-red-500 text-white'
        }`}
      >
        {type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Placeholder/Mockup Component for UI Showcase ---
const ExtensionMockup = () => (
  <div className="w-full max-w-[340px] mx-auto bg-surface rounded-[24px] border border-borderLight shadow-soft-md overflow-hidden font-jakarta">
    {/* Header */}
      <div className="flex items-center gap-3">
        <img src="/icons/icon32.png" alt="Logo" className="w-8 h-8 rounded-lg" />
        <h3 className="font-outfit font-semibold text-lg tracking-tight">FlowMail</h3>
      </div>
    
    {/* Content */}
    <div className="p-5 space-y-4 bg-background/50">
      {/* AI Setting Group */}
      <div className="bg-surface border border-borderLight rounded-[16px] p-4 shadow-soft-sm hover:-translate-y-[1px] hover:shadow-soft-md transition-all duration-300">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-[15px]">AI Writing Assistant</h4>
          <div className="w-10 h-6 bg-primary-500 rounded-full relative shadow-inner">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
          </div>
        </div>
        <p className="text-[13px] text-textSecondary leading-relaxed">Let our AI help you draft and reply to emails effortlessly.</p>
      </div>

      {/* Tracking Setting Group */}
      <div className="bg-surface border border-borderLight rounded-[16px] p-4 shadow-soft-sm hover:-translate-y-[1px] hover:shadow-soft-md transition-all duration-300">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-[15px]">Email Read Receipts</h4>
          <div className="w-10 h-6 bg-primary-500 rounded-full relative shadow-inner">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
          </div>
        </div>
        <p className="text-[13px] text-textSecondary leading-relaxed">Know exactly when your emails are opened and read.</p>
      </div>

      {/* Button */}
      <button className="w-full py-[10px] px-4 bg-primary-500 hover:bg-primary-700 text-white rounded-[16px] text-[13px] font-medium transition-colors shadow-sm flex justify-center items-center gap-2 mt-2">
        Sign in with Google
      </button>
    </div>
  </div>
);

// --- Sections ---

const Navbar = ({ handleUpgrade }) => (
  <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-borderLight/50">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src="/icons/icon32.png" alt="Logo" className="w-8 h-8 rounded-lg" />
        <span className="font-outfit font-semibold text-xl tracking-tight">FlowMail</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-textSecondary">
        <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
        <a href="#why" className="hover:text-primary-600 transition-colors">Why FlowMail</a>
        <a href="#pricing" className="hover:text-primary-600 transition-colors">Pricing</a>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={handleUpgrade} className="text-[15px] font-medium hover:text-primary-600 transition-colors hidden md:block">Log in</button>
        <button onClick={() => window.open('https://chrome.google.com/webstore', '_blank')} className="px-5 py-2.5 bg-primary-500 hover:bg-primary-700 text-white rounded-full text-[14px] font-medium transition-all shadow-[0_2px_10px_rgba(168,131,101,0.2)] hover:shadow-[0_4px_15px_rgba(168,131,101,0.3)] hover:-translate-y-0.5">
          Get Extension
        </button>
      </div>
    </div>
  </nav>
);

const Hero = ({ handleUpgrade }) => (
  <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex flex-col justify-center">
    {/* Soft Background Gradients */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/50 rounded-full blur-[100px] -z-10" />
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f2eefa]/80 rounded-full blur-[80px] -z-10" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#f5eaea]/60 rounded-full blur-[90px] -z-10" />

    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-borderLight text-sm font-medium text-textSecondary mb-6 shadow-soft-sm">
          <Sparkles className="w-4 h-4 text-primary-500" />
          <span>The smarter way to email</span>
        </div>
        <h1 className="text-5xl lg:text-[64px] font-outfit font-semibold leading-[1.1] tracking-tight mb-6 text-textPrimary">
          Write emails faster with <span className="text-primary-600">FlowMail</span>
        </h1>
        <p className="text-lg text-textSecondary mb-8 leading-relaxed font-jakarta">
          AI replies, email tracking, and smart templates magically integrated inside your Gmail. Say goodbye to email anxiety.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button onClick={() => window.open('https://chrome.google.com/webstore', '_blank')} className="w-full sm:w-auto px-8 py-3.5 bg-primary-500 hover:bg-primary-700 text-white rounded-full text-[15px] font-medium transition-all shadow-[0_4px_15px_rgba(168,131,101,0.25)] hover:shadow-[0_6px_20px_rgba(168,131,101,0.35)] hover:-translate-y-0.5 flex items-center justify-center gap-2">
            Install Extension
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleUpgrade}
            className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-50 text-textPrimary border border-borderLight rounded-full text-[15px] font-medium transition-all shadow-soft-sm hover:shadow-soft-md flex items-center justify-center"
          >
            Upgrade to Pro
          </button>
        </div>
        <div className="mt-6 flex items-center gap-4 text-sm text-textSecondary">
          <div className="flex -space-x-2">
            {[1,2,3,4].map(i => (
              <div key={i} className={`w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white
                ${i===1?'bg-blue-400':i===2?'bg-purple-400':i===3?'bg-emerald-400':'bg-amber-400'}
              `}>
                {String.fromCharCode(64+i)}
              </div>
            ))}
          </div>
          <p>Loved by 10,000+ professionals</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative lg:h-[600px] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-100/50 to-transparent rounded-[40px] border border-white/50 shadow-soft-lg transform rotate-3" />
        <div className="relative z-10 transform -rotate-2 hover:rotate-0 transition-transform duration-500 w-full max-w-[340px]">
          <ExtensionMockup />
        </div>
        
        {/* Floating UI Elements */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 -left-10 bg-white p-4 rounded-2xl shadow-soft-md border border-borderLight/50 flex items-center gap-3 backdrop-blur-xl"
        >
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-semibold">Email Read</p>
            <p className="text-xs text-textSecondary">Just now</p>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 -right-8 bg-white p-4 rounded-2xl shadow-soft-md border border-borderLight/50 flex items-center gap-3 backdrop-blur-xl max-w-[200px]"
        >
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-primary-600" />
          </div>
          <p className="text-xs text-textSecondary leading-tight">Drafted perfect reply in 2 seconds.</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white border border-borderLight p-8 rounded-[24px] shadow-soft-sm hover:shadow-soft-md hover:-translate-y-1 transition-all duration-300 group">
    <div className="w-12 h-12 bg-primary-50 rounded-[16px] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-100 transition-all duration-300">
      <Icon className="w-6 h-6 text-primary-600" />
    </div>
    <h3 className="text-xl font-semibold font-outfit mb-3">{title}</h3>
    <p className="text-textSecondary leading-relaxed text-[15px]">{desc}</p>
  </div>
);

const Features = () => {
  const features = [
    { icon: Sparkles, title: "AI Reply Generator", desc: "Instantly draft context-aware, professional replies with a single click. Save hours every week." },
    { icon: Eye, title: "Email Open Tracking", desc: "Get notified the moment your email is read. Perfect for sales follow-ups and important communications." },
    { icon: LayoutTemplate, title: "Smart Templates", desc: "Create, save, and insert your most-used responses instantly via keyboard shortcuts." },
    { icon: LayoutPanelLeft, title: "Beautiful Gmail Sidebar", desc: "A sleek, minimally intrusive sidebar that brings all your tools exactly where you need them." },
    { icon: Zap, title: "One-click Responses", desc: "Accept, decline, or suggest times for meetings with AI-generated responses tailored to your tone." },
    { icon: MessageSquare, title: "Tone Adjustment", desc: "Make your drafts sound more professional, friendly, or concise with our built-in AI tone editor." },
  ];

  return (
    <section id="features" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold font-outfit mb-4">Supercharge your inbox</h2>
          <p className="text-lg text-textSecondary">Everything you need to master your emails, beautifully integrated into a seamless experience.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </div>
    </section>
  );
};

const Showcase = () => (
  <section className="py-24 bg-background relative overflow-hidden">
    {/* Decorative blur */}
    <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-[100px] -z-10" />
    
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold font-outfit mb-4">Designed for focus</h2>
        <p className="text-lg text-textSecondary max-w-2xl mx-auto">
          We believe powerful tools should also be beautiful. FlowMail blends perfectly into your workflow without the clutter.
        </p>
      </div>

      <div className="bg-white rounded-[32px] border border-borderLight shadow-soft-lg overflow-hidden p-2">
        <div className="bg-background rounded-[24px] border border-borderLight/50 h-[500px] flex items-center justify-center relative overflow-hidden">
          {/* Faux Browser/Gmail Frame */}
          <div className="absolute top-0 w-full h-12 border-b border-borderLight/50 bg-white flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="ml-4 w-64 h-7 bg-background rounded-md border border-borderLight/50 flex items-center px-3">
              <span className="text-xs text-textSecondary">mail.google.com</span>
            </div>
          </div>
          
          <div className="w-full h-full pt-12 flex">
            {/* Fake Gmail Content */}
            <div className="flex-1 p-8">
              <div className="w-3/4 h-8 bg-white rounded-lg border border-borderLight mb-6 shadow-soft-sm" />
              <div className="space-y-4">
                <div className="w-full h-24 bg-white rounded-lg border border-borderLight shadow-soft-sm" />
                <div className="w-5/6 h-24 bg-white rounded-lg border border-borderLight shadow-soft-sm" />
                <div className="w-full h-[200px] bg-white rounded-[16px] border border-primary-200 shadow-soft-md relative">
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <div className="px-3 py-1.5 bg-primary-50 rounded-full border border-primary-100 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-primary-600" />
                      <span className="text-[11px] font-medium text-primary-700">Write with FlowMail</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Sidebar Mockup */}
            <div className="w-[300px] border-l border-borderLight bg-white p-4 flex flex-col pt-6">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-6 h-6 bg-primary-500 rounded flex items-center justify-center"><Sparkles className="w-3 h-3 text-white" /></div>
                 <span className="font-outfit font-medium text-sm">FlowMail Sidebar</span>
               </div>
               <div className="space-y-3">
                 <div className="h-10 bg-background rounded-[12px] border border-borderLight" />
                 <div className="h-20 bg-background rounded-[12px] border border-borderLight" />
                 <div className="h-10 bg-background rounded-[12px] border border-borderLight" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const WhyFlowMail = () => {
  const points = [
    { title: "Simple", desc: "No complex setup or clunky interfaces. It just works." },
    { title: "Elegant", desc: "Earth-toned, minimal UI crafted to look stunning inside your inbox." },
    { title: "Fast", desc: "Lightning-quick AI responses generated in milliseconds." },
    { title: "Distraction-free", desc: "Sits quietly in your sidebar until you need it. Never in your face." },
  ];

  return (
    <section id="why" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold font-outfit mb-6">The professional's choice</h2>
          <p className="text-lg text-textSecondary mb-8 leading-relaxed">
            We built FlowMail because we were tired of generic, bloated email tools that looked like they belonged in a corporate CRM from 2010. 
            <br/><br/>
            FlowMail is soft, welcoming, and strictly essential. It's the extension you'll actually want to keep pinned.
          </p>
          <div className="space-y-6">
            {points.map((p, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-textPrimary">{p.title}</h4>
                  <p className="text-[15px] text-textSecondary">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-primary-100/50 rounded-[40px] transform rotate-3" />
          <img 
            src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80" 
            alt="Workspace" 
            className="rounded-[40px] shadow-soft-lg relative z-10 w-full object-cover h-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ handleUpgrade }) => (
  <section id="pricing" className="py-24 bg-background">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold font-outfit mb-4">Simple, transparent pricing</h2>
        <p className="text-lg text-textSecondary">Start for free, upgrade when you need more power.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free Tier */}
        <div className="bg-white border border-borderLight rounded-[32px] p-8 shadow-soft-sm relative flex flex-col">
          <h3 className="font-outfit text-xl font-medium mb-2">Free</h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-semibold">₹0</span>
            <span className="text-textSecondary">/mo</span>
          </div>
          <p className="text-sm text-textSecondary mb-8">Perfect to get a taste of AI email generation.</p>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-[15px]"><CheckCircle2 className="w-4 h-4 text-green-500" /> 10 AI Replies/mo</li>
            <li className="flex items-center gap-3 text-[15px]"><CheckCircle2 className="w-4 h-4 text-green-500" /> Basic Email Tracking</li>
            <li className="flex items-center gap-3 text-[15px]"><CheckCircle2 className="w-4 h-4 text-green-500" /> 3 Smart Templates</li>
          </ul>
          <button onClick={() => window.open('https://chrome.google.com/webstore', '_blank')} className="w-full py-3 bg-white border border-borderLight text-textPrimary hover:bg-gray-50 rounded-[16px] font-medium transition-colors">
            Install Extension
          </button>
        </div>

        {/* Pro Tier (Highlighted) */}
        <div className="bg-surface border-2 border-primary-400 rounded-[32px] p-8 shadow-soft-lg transform md:-translate-y-4 relative flex flex-col">
          <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            MOST POPULAR
          </div>
          <h3 className="font-outfit text-xl font-medium mb-2">Pro</h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-semibold">₹199</span>
            <span className="text-textSecondary">/mo</span>
          </div>
          <p className="text-sm text-textSecondary mb-8">For working professionals who want to reclaim their time.</p>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-[15px]"><CheckCircle2 className="w-4 h-4 text-primary-500" /> Unlimited AI Replies</li>
            <li className="flex items-center gap-3 text-[15px]"><CheckCircle2 className="w-4 h-4 text-primary-500" /> Unlimited Email Tracking</li>
            <li className="flex items-center gap-3 text-[15px]"><CheckCircle2 className="w-4 h-4 text-primary-500" /> Tone Settings</li>
            <li className="flex items-center gap-3 text-[15px]"><CheckCircle2 className="w-4 h-4 text-primary-500" /> Unlimited Templates</li>
          </ul>
          <button
            onClick={handleUpgrade}
            className="w-full py-3 bg-primary-500 hover:bg-primary-700 text-white rounded-[16px] font-medium transition-colors shadow-sm"
          >
            Upgrade to Pro
          </button>
        </div>

        {/* Pro+ Tier */}
        <div className="bg-white border border-borderLight rounded-[32px] p-8 shadow-soft-sm relative flex flex-col">
          <h3 className="font-outfit text-xl font-medium mb-2">Pro+</h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-semibold">₹399</span>
            <span className="text-textSecondary">/mo</span>
          </div>
          <p className="text-sm text-textSecondary mb-8">For power users and small teams.</p>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-[15px]"><CheckCircle2 className="w-4 h-4 text-green-500" /> Everything in Pro</li>
            <li className="flex items-center gap-3 text-[15px]"><CheckCircle2 className="w-4 h-4 text-green-500" /> Priority Support</li>
            <li className="flex items-center gap-3 text-[15px]"><CheckCircle2 className="w-4 h-4 text-green-500" /> Team Analytics</li>
            <li className="flex items-center gap-3 text-[15px]"><CheckCircle2 className="w-4 h-4 text-green-500" /> Custom API access</li>
          </ul>
          <button onClick={() => window.location.href = "mailto:sales@flowmail.com"} className="w-full py-3 bg-white border border-borderLight text-textPrimary hover:bg-gray-50 rounded-[16px] font-medium transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialCard = ({ content, author, role, initial }) => (
  <div className="bg-white border border-borderLight p-6 rounded-[24px] shadow-soft-sm">
    <div className="flex gap-1 text-amber-400 mb-4">
      {[...Array(5)].map((_, i) => <Sparkles key={i} className="w-4 h-4 fill-current" />)}
    </div>
    <p className="text-[15px] text-textSecondary mb-6 leading-relaxed">"{content}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold font-outfit">
        {initial}
      </div>
      <div>
        <p className="font-medium text-sm text-textPrimary">{author}</p>
        <p className="text-xs text-textSecondary">{role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => (
  <section className="py-24 bg-surface">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-semibold font-outfit mb-12 text-center">Loved by professionals</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <TestimonialCard 
          content="FlowMail feels like it was designed by Apple. It perfectly matches the aesthetic of my workspace and saves me at least an hour daily on mundane replies." 
          author="Sarah Jenkins" 
          role="Product Designer" 
          initial="SJ" 
        />
        <TestimonialCard 
          content="Finally an email tracker that isn't a bloated CRM. The read receipts are instant, and the UI is absolutely gorgeous. Highly recommended." 
          author="Michael Chen" 
          role="Freelance Consultant" 
          initial="MC" 
        />
        <TestimonialCard 
          content="The smart templates combined with AI are magical. I used to dread the morning email catch-up, now it's my favorite part of the day." 
          author="Elena Rodriguez" 
          role="Marketing Manager" 
          initial="ER" 
        />
      </div>
    </div>
  </section>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-borderLight rounded-[16px] mb-4 bg-white overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left p-5 flex justify-between items-center bg-white"
      >
        <span className="font-medium text-[15px]">{question}</span>
        <ChevronDown className={`w-5 h-5 text-textSecondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-textSecondary text-[15px] leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => (
  <section className="py-24 bg-background">
    <div className="max-w-3xl mx-auto px-6">
      <h2 className="text-3xl font-semibold font-outfit mb-10 text-center">Frequently asked questions</h2>
      <div>
        <FAQItem 
          question="Does it work on browsers other than Chrome?" 
          answer="Currently, FlowMail is optimized exclusively for Google Chrome and Chromium-based browsers (like Edge and Brave) to ensure the best performance and integration with Gmail." 
        />
        <FAQItem 
          question="Is my email data secure?" 
          answer="Absolutely. We take privacy seriously. We don't read or store your emails. The content is only passed securely to the AI for generation when you explicitly click the button, and read receipts use industry-standard pixel tracking." 
        />
        <FAQItem 
          question="Can I cancel my Pro subscription anytime?" 
          answer="Yes, you can upgrade, downgrade, or cancel your plan at any time right from the extension settings. There are no long-term contracts." 
        />
        <FAQItem 
          question="Do I need my own OpenAI / Gemini key?" 
          answer="No! The Pro version handles all AI costs for you. The Free version provides a generous monthly quota to get you started." 
        />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-borderLight pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src="/icons/icon32.png" alt="Logo" className="w-8 h-8 rounded-lg" />
            <span className="font-outfit font-semibold text-xl tracking-tight">FlowMail</span>
          </div>
          <p className="text-textSecondary text-[15px] max-w-sm mb-6">
            Beautifully crafted email tools for professionals who value both performance and aesthetics.
          </p>
          <div className="flex gap-4 text-textSecondary">
            <a href="#" className="hover:text-primary-600 transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary-600 transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-[15px]">Product</h4>
          <ul className="space-y-3 text-[14px] text-textSecondary">
            <li><a href="#features" className="hover:text-primary-600 transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-primary-600 transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-primary-600 transition-colors">Changelog</a></li>
            <li><a href="#" className="hover:text-primary-600 transition-colors">Download</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-[15px]">Legal &amp; Support</h4>
          <ul className="space-y-3 text-[14px] text-textSecondary">
            <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary-600 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary-600 transition-colors">Help Center</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-borderLight flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-textSecondary">
        <p>&copy; {new Date().getFullYear()} FlowMail. All rights reserved.</p>
        <p className="flex items-center gap-1">Designed with <span className="text-primary-500">♥</span> for professionals.</p>
      </div>
    </div>
  </footer>
);

// ─── Main App ────────────────────────────────────────────────────────────────
function App() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  // On mount: read email from URL param (sent by the extension) and save to localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromUrl = params.get('email');
    if (emailFromUrl) {
      localStorage.setItem('userEmail', emailFromUrl);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Attempt to sync email to extension if we have it locally
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      window.postMessage({ type: 'FLOWMAIL_SYNC', email: savedEmail }, '*');
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 4000);
  };

  // ── Core payment trigger ───────────────────────────────────────────────────
  const triggerPayment = useCallback(async (email) => {
    setIsPaymentLoading(true);
    setShowEmailModal(false);

    try {
      // Register user in Supabase before payment (safe even if already exists)
      await fetch(`${BACKEND_URL}/create-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const res = await fetch(`${BACKEND_URL}/create-subscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_id: 'plan_SSGZ7Jw3zsLohb' }),
      });

      const data = await res.json();

      const options = {
        key: 'rzp_test_SSGAU6rYyrzWpR',
        subscription_id: data.id,
        name: 'FlowMail',
        description: 'Pro Plan',
        prefill: {
          email: email,   // ← pre-fill so Razorpay doesn't ask again
        },
        handler: async function (response) {
          console.log('PAYMENT SUCCESS', response);

          await fetch(`${BACKEND_URL}/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: email,
              payment_id: response.razorpay_payment_id,
              plan: 'pro',
            }),
          });

          // Sync pro status to extension
          window.postMessage({ type: 'FLOWMAIL_SYNC', email: email, isPaid: true }, '*');

          showToast('🎉 Payment successful! You are now on Pro.', 'success');
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsPaymentLoading(false);
    }
  }, []);

  // ── handleUpgrade: called by every "Upgrade to Pro" button ────────────────
  const handleUpgrade = useCallback(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      // Email already known — go straight to payment, no modal
      triggerPayment(savedEmail);
    } else {
      // No email known — show the modal once
      setShowEmailModal(true);
    }
  }, [triggerPayment]);

  const handleModalConfirm = (email) => {
    localStorage.setItem('userEmail', email);
    triggerPayment(email);
  };

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <Navbar handleUpgrade={handleUpgrade} />
      <Hero handleUpgrade={handleUpgrade} />
      <Features />
      <Showcase />
      <WhyFlowMail />
      <Pricing handleUpgrade={handleUpgrade} />
      <Testimonials />
      <FAQ />
      <Footer />

      {/* Email Modal — only shown if no email is known */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onConfirm={handleModalConfirm}
        isLoading={isPaymentLoading}
      />

      <Toast {...toast} />
    </div>
  );
}

export default App;
