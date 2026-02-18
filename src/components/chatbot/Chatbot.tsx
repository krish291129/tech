import { useEffect, useRef, useState, useCallback } from "react";
import ReactDOM from "react-dom";

/* ================================================================
   CHAT FLOW DATA  —  structured Q&A for all 7 business topics
   ================================================================ */
const FLOW = {
  // ── Stage 0: cold open ──────────────────────────────────────────
  init: {
    options: [{ id: "start", label: "👋  Start Chat" }],
  },

  // ── Stage 1: welcome + main menu ────────────────────────────────
  welcome: {
    message:
      "Hello! 👋 Welcome to *TechKohl*. I'm your virtual assistant.\n\nHow can I help you today? Please choose a topic below.",
    options: [
      { id: "services",    label: "🛠️  Our Services"      },
      { id: "webdev",      label: "💻  Web Development"    },
      { id: "appdev",      label: "📱  App Development"    },
      { id: "pricing",     label: "💰  Pricing"            },
      { id: "delivery",    label: "🚚  Delivery & Timeline" },
      { id: "contact",     label: "📞  Contact Us"         },
      { id: "website",     label: "🌐  Visit Website"      },
    ],
  },

  // ── Stage 2: individual topic replies ───────────────────────────
  replies: {
    services: {
      message:
        "We offer a full spectrum of digital services:\n\n• *Web Design & Development* — responsive, modern websites\n• *Mobile App Development* — iOS & Android\n• *SaaS & Custom Software* — scalable business platforms\n• *UI/UX Design* — user-centred interfaces\n• *SEO & Digital Marketing* — grow your online presence\n• *Maintenance & Support* — 24/7 assistance\n\nAll solutions are tailored to your business goals.",
      followUp: "Is there a specific service you'd like to explore?",
      options: [
        { id: "webdev",   label: "💻  Web Development"  },
        { id: "appdev",   label: "📱  App Development"  },
        { id: "pricing",  label: "💰  Pricing"          },
        { id: "contact",  label: "📞  Contact Us"       },
        { id: "menu",     label: "🏠  Main Menu"        },
      ],
    },

    webdev: {
      message:
        "Our *Web Development* team builds fast, secure, and scalable web solutions:\n\n• Corporate & portfolio websites\n• E-commerce stores (Shopify, WooCommerce)\n• Custom web applications & dashboards\n• CMS integration (WordPress, Strapi)\n• API development & third-party integrations\n\n*Technologies:* React, Next.js, Node.js, Laravel, and more.\n\nEvery project is mobile-first and SEO-optimised.",
      followUp: "Ready to start your web project?",
      options: [
        { id: "pricing",  label: "💰  See Pricing"      },
        { id: "delivery", label: "🚚  Timeline"         },
        { id: "contact",  label: "📞  Get a Quote"      },
        { id: "menu",     label: "🏠  Main Menu"        },
      ],
    },

    appdev: {
      message:
        "We build high-quality *Mobile Apps* for iOS and Android:\n\n• Native iOS (Swift) & Android (Kotlin) apps\n• Cross-platform apps (React Native, Flutter)\n• UI/UX prototyping & wireframing\n• API & backend integration\n• App Store & Play Store submission\n• Post-launch maintenance & updates\n\nFrom MVPs to enterprise-grade applications — we cover it all.",
      followUp: "Have an app idea in mind?",
      options: [
        { id: "pricing",  label: "💰  See Pricing"      },
        { id: "delivery", label: "🚚  Timeline"         },
        { id: "contact",  label: "📞  Get a Quote"      },
        { id: "menu",     label: "🏠  Main Menu"        },
      ],
    },

    pricing: {
      message:
        "Our pricing is project-based and fully transparent:\n\n*Web Development*\n• Basic Website — from ₹4,999\n• Business Website — from ₹12,999\n• E-commerce Store — from ₹24,999\n• Custom Web App — from ₹49,999\n\n*App Development*\n• MVP App — from ₹34,999\n• Full-Feature App — from ₹89,999\n\n*Monthly Maintenance* — from ₹1,499/month\n\nAll quotes are custom — final pricing depends on scope, features and timeline.",
      followUp: "Would you like a personalised quote?",
      options: [
        { id: "contact",  label: "📞  Request a Quote"  },
        { id: "delivery", label: "🚚  Timeline"         },
        { id: "webdev",   label: "💻  Web Dev Details"  },
        { id: "appdev",   label: "📱  App Dev Details"  },
        { id: "menu",     label: "🏠  Main Menu"        },
      ],
    },

    delivery: {
      message:
        "Our typical *project timelines*:\n\n• Basic Website — 5–7 business days\n• Business Website — 10–15 business days\n• E-commerce Store — 15–25 business days\n• Custom Web App — 4–12 weeks\n• Mobile App (MVP) — 6–10 weeks\n• Full-Feature App — 12–20 weeks\n\nTimelines begin after brief confirmation and initial payment.\n\n*We provide weekly progress updates* and use agile sprints for larger projects to keep you in the loop at every stage.",
      followUp: "Want to discuss your project timeline?",
      options: [
        { id: "contact",  label: "📞  Contact Us"       },
        { id: "pricing",  label: "💰  See Pricing"      },
        { id: "menu",     label: "🏠  Main Menu"        },
      ],
    },

    contact: {
      message:
        "We'd love to hear from you! Here are all the ways to reach us:\n\n📧 *Email:* support@techkohl.com\n📱 *WhatsApp:* +91 98765 43210\n📞 *Phone:* +91 98765 43210\n🌐 *Website:* www.techkohl.com\n📍 *Location:* Rajkot, Gujarat, India\n\n*Business Hours:*\nMon – Sat, 9:00 AM – 7:00 PM IST\n\nWe typically respond within *2 business hours*.",
      followUp: "Is there anything else I can help you with?",
      options: [
        { id: "services", label: "🛠️  Our Services"     },
        { id: "pricing",  label: "💰  Pricing"          },
        { id: "website",  label: "🌐  Visit Website"    },
        { id: "menu",     label: "🏠  Main Menu"        },
      ],
    },

    website: {
      message:
        "Explore everything TechKohl has to offer on our website:\n\n🔗 *www.techkohl.com*\n\nYou'll find:\n• Our full service portfolio\n• Case studies & live project demos\n• Client testimonials\n• Team & company profile\n• Blog & tech insights\n• Direct enquiry forms\n\nClick below to visit — it opens in a new tab.",
      followUp: "Anything else you'd like to know?",
      options: [
        { id: "services", label: "🛠️  Our Services"     },
        { id: "contact",  label: "📞  Contact Us"       },
        { id: "menu",     label: "🏠  Main Menu"        },
      ],
      externalLink: { label: "🌐  Open Website", url: "https://www.techkohl.com" },
    },
  },
};

/* ================================================================
   HELPERS
   ================================================================ */
const ts = () =>
  new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

const dateLabel = () =>
  new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/** Converts *starred* text → <strong> and \n → <br> */
function RichText({ text }) {
  const lines = text.split("\n");
  return (
    <span>
      {lines.map((line, li) => (
        <span key={li}>
          {li > 0 && <br />}
          {line.split(/(\*[^*]+\*)/g).map((seg, si) =>
            seg.startsWith("*") && seg.endsWith("*")
              ? <strong key={si}>{seg.slice(1, -1)}</strong>
              : <span key={si}>{seg}</span>
          )}
        </span>
      ))}
    </span>
  );
}

/* ================================================================
   SCOPED CSS  —  all selectors under [data-cb] namespace
   ================================================================ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

[data-cb]{font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased;}
[data-cb]*,[data-cb]*::before,[data-cb]*::after{box-sizing:border-box;margin:0;padding:0;}

/* FAB */
[data-cb=fab]{
  position:fixed;bottom:88px;right:24px;z-index:9999;
  width:58px;height:58px;border-radius:50%;border:none;cursor:pointer;
  background:linear-gradient(145deg,#25D366,#0f9b51);
  color:#fff;display:flex;align-items:center;justify-content:center;
  box-shadow:0 8px 28px rgba(37,211,102,.5);
  transition:transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .2s;
  outline:none;
}
[data-cb=fab][data-visible=true]{
  animation:cb-fabIn .5s cubic-bezier(.34,1.56,.64,1) forwards;
}
[data-cb=fab][data-visible=false]{
  opacity:0;pointer-events:none;
}
[data-cb=fab]:hover{transform:scale(1.12);box-shadow:0 10px 36px rgba(37,211,102,.6);}
[data-cb=fab]:active{transform:scale(.94);}
[data-cb=fab] svg{transition:transform .25s cubic-bezier(.34,1.56,.64,1);}
[data-cb=fab][data-state=open] svg{transform:rotate(180deg);}
[data-cb=badge]{
  position:absolute;top:-3px;right:-3px;
  width:16px;height:16px;border-radius:50%;
  background:#ef4444;border:2.5px solid #fff;
  animation:cb-badgePulse 2s infinite;
}

/* Popup */
[data-cb=popup]{
  position:fixed;bottom:96px;right:26px;z-index:9998;
  width:370px;max-width:calc(100vw - 20px);
  height:580px;max-height:calc(100svh - 110px);
  border-radius:22px;overflow:hidden;
  display:flex;flex-direction:column;
  background:#111b21;
  box-shadow:0 28px 80px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.06);
  transform-origin:bottom right;
}
[data-cb=popup][data-anim=cb-in] {animation:cb-open .32s cubic-bezier(.34,1.4,.64,1) forwards;}
[data-cb=popup][data-anim=cb-out]{animation:cb-close .2s ease-in forwards;}

/* Header */
[data-cb=header]{
  background:linear-gradient(135deg,#1f2c34,#0d1f26);
  padding:13px 15px;
  display:flex;align-items:center;gap:11px;flex-shrink:0;
  border-bottom:1px solid rgba(255,255,255,.05);
}
[data-cb=hd-avatar]{
  width:42px;height:42px;border-radius:50%;
  background:linear-gradient(135deg,#25D366,#128C7E);
  display:flex;align-items:center;justify-content:center;
  font-size:19px;flex-shrink:0;
  box-shadow:0 0 0 2px rgba(37,211,102,.3);
}
[data-cb=hd-name]{color:#e9edef;font-weight:700;font-size:15px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
[data-cb=hd-status]{
  color:rgba(255,255,255,.45);font-size:11.5px;
  display:flex;align-items:center;gap:5px;margin-top:2px;
}
[data-cb=hd-dot]{width:7px;height:7px;border-radius:50%;background:#25D366;flex-shrink:0;animation:cb-pulse 2.5s infinite;}
[data-cb=hd-btn]{
  border:none;cursor:pointer;outline:none;
  background:rgba(255,255,255,.07);
  width:30px;height:30px;border-radius:50%;
  color:rgba(255,255,255,.7);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  transition:background .15s,color .15s;
}
[data-cb=hd-btn]:hover{background:rgba(255,255,255,.14);color:#fff;}

/* Feed */
[data-cb=feed]{
  flex:1;overflow-y:auto;overflow-x:hidden;
  padding:14px 13px 10px;
  display:flex;flex-direction:column;gap:7px;min-height:0;
  background:#0b141a;
  background-image:url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02' fill-rule='evenodd'%3E%3Cpath d='M28 28v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-26V0h-2v2h-4v2h4v4h2V4h4V2h-4zM4 28v-4H2v4H0v2h2v4h2v-4h4v-2H4zM4 2V0H2v2H0v2h2v4h2V4h4V2H4z'/%3E%3C/g%3E%3C/svg%3E");
}
[data-cb=feed]::-webkit-scrollbar{width:3px;}
[data-cb=feed]::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:6px;}

/* Date chip */
[data-cb=date]{
  align-self:center;
  background:rgba(255,255,255,.07);
  padding:3px 12px;border-radius:8px;
  font-size:11px;font-weight:500;color:rgba(255,255,255,.45);
  margin-bottom:2px;flex-shrink:0;
}

/* Message rows */
[data-cb=row]{display:flex;align-items:flex-end;gap:7px;animation:cb-fadeIn .22s ease;}
[data-cb=row][data-sender=user]{flex-direction:row-reverse;}

[data-cb=bot-icon]{
  width:28px;height:28px;border-radius:50%;flex-shrink:0;
  background:linear-gradient(135deg,#25D366,#128C7E);
  display:flex;align-items:center;justify-content:center;font-size:12px;
}
[data-cb=bwrap]{max-width:73%;display:flex;flex-direction:column;}
[data-cb=row][data-sender=user] [data-cb=bwrap]{align-items:flex-end;}
[data-cb=row][data-sender=bot]  [data-cb=bwrap]{align-items:flex-start;}

[data-cb=bubble]{
  padding:9px 13px;font-size:13.5px;line-height:1.6;
  word-break:break-word;
  box-shadow:0 1px 4px rgba(0,0,0,.35);
}
[data-cb=bubble][data-sender=bot]{
  background:#202c33;color:#e9edef;
  border-radius:0 14px 14px 14px;
}
[data-cb=bubble][data-sender=user]{
  background:linear-gradient(135deg,#005c4b,#00432e);color:#e9edef;
  border-radius:14px 14px 0 14px;
}
[data-cb=bubble] strong{color:#25D366;font-weight:600;}

[data-cb=meta]{
  font-size:10.5px;color:rgba(255,255,255,.3);
  margin-top:3px;display:flex;align-items:center;gap:3px;
}
[data-cb=row][data-sender=user] [data-cb=meta]{padding-right:4px;}
[data-cb=row][data-sender=bot]  [data-cb=meta]{padding-left:4px;}
[data-cb=ticks]{color:#53bdeb;font-size:12px;}

/* Typing */
[data-cb=typing]{display:flex;align-items:flex-end;gap:7px;}
[data-cb=typing-bbl]{
  background:#202c33;border-radius:0 14px 14px 14px;
  padding:11px 16px;display:flex;gap:5px;align-items:center;
  box-shadow:0 1px 4px rgba(0,0,0,.35);
}
[data-cb=dot]{
  width:7px;height:7px;border-radius:50%;background:#4a5568;
  animation:cb-bounce 1.2s infinite;
}

/* Options */
[data-cb=opts]{
  display:flex;flex-direction:column;align-items:flex-end;gap:7px;margin-top:2px;
}
[data-cb=opt]{
  border:none;cursor:pointer;outline:none;
  font-family:'Outfit',sans-serif;
  color:#e9edef;
  padding:9px 16px;
  border-radius:14px 14px 0 14px;
  font-size:13px;font-weight:500;
  min-width:155px;max-width:255px;
  text-align:right;line-height:1.4;
  transition:transform .15s ease,box-shadow .15s ease,background .15s;
  animation:cb-popIn .26s cubic-bezier(.34,1.56,.64,1) both;
}
[data-cb=opt]:hover{
  background:linear-gradient(135deg,#007a64,#00c99e);
  transform:translateY(-2px);
  box-shadow:0 6px 18px rgba(0,168,132,.38);
}
[data-cb=opt]:active{transform:scale(.96);}

/* Footer */
[data-cb=footer]{
  background:#202c33;border-top:1px solid rgba(255,255,255,.05);
  padding:9px 13px;display:flex;align-items:center;gap:8px;flex-shrink:0;
}
[data-cb=footer-emoji]{font-size:20px;opacity:.35;flex-shrink:0;user-select:none;}
[data-cb=fake-input]{
  flex:1;background:#2a3942;border-radius:20px;
  padding:9px 15px;font-size:13px;font-family:'Outfit',sans-serif;
  color:rgba(255,255,255,.28);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  user-select:none;
}
[data-cb=mic]{
  width:38px;height:38px;border-radius:50%;flex-shrink:0;
  background:linear-gradient(135deg,#25D366,#128C7E);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 2px 10px rgba(37,211,102,.3);
  font-size:16px;
}

/* Keyframes */
@keyframes cb-fabIn{
  0%  {opacity:0;transform:scale(.4) translateY(20px);}
  60% {          transform:scale(1.12)translateY(-4px);}
  100%{opacity:1;transform:scale(1)  translateY(0);   }
}
@keyframes cb-open{
  from{opacity:0;transform:scale(.82) translateY(18px);}
  to  {opacity:1;transform:scale(1)   translateY(0);   }
}
@keyframes cb-close{
  from{opacity:1;transform:scale(1)   translateY(0);   }
  to  {opacity:0;transform:scale(.88) translateY(14px);}
}
@keyframes cb-fadeIn{
  from{opacity:0;transform:translateY(7px) scale(.97);}
  to  {opacity:1;transform:translateY(0)   scale(1);  }
}
@keyframes cb-popIn{
  0%  {opacity:0;transform:scale(.8)  translateY(10px);}
  70% {          transform:scale(1.03)translateY(-1px);}
  100%{opacity:1;transform:scale(1)   translateY(0);  }
}
@keyframes cb-bounce{
  0%,60%,100%{transform:translateY(0);  }
  30%         {transform:translateY(-5px);}
}
@keyframes cb-pulse{
  0%,100%{box-shadow:0 0 0 0   rgba(37,211,102,.5);}
  50%    {box-shadow:0 0 0 7px rgba(37,211,102,0);  }
}
@keyframes cb-badgePulse{
  0%,100%{box-shadow:0 0 0 0   rgba(239,68,68,.5);}
  50%    {box-shadow:0 0 0 7px rgba(239,68,68,0);  }
}
`;

/* ================================================================
   TYPING INDICATOR
   ================================================================ */
function TypingIndicator() {
  return (
    <div data-cb="typing">
      <div data-cb="bot-icon">🤖</div>
      <div data-cb="typing-bbl">
        {[0,1,2].map(i => (
          <div key={i} data-cb="dot" style={{ animationDelay: `${i*0.2}s` }} />
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   BUBBLE
   ================================================================ */
function Bubble({ msg }) {
  return (
    <div data-cb="row" data-sender={msg.sender}>
      {msg.sender === "bot" && <div data-cb="bot-icon">🤖</div>}
      <div data-cb="bwrap">
        <div data-cb="bubble" data-sender={msg.sender}>
          <RichText text={msg.text} />
        </div>
        <div data-cb="meta">
          {msg.time}
          {msg.sender === "user" && <span data-cb="ticks">✓✓</span>}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN CHATBOT COMPONENT
   ================================================================ */
export default function Chatbot() {
  const [open, setOpen]         = useState(false);
  const [anim, setAnim]         = useState("cb-in");
  const [msgs, setMsgs]         = useState([]);
  const [typing, setTyping]     = useState(false);
  const [opts, setOpts]         = useState(FLOW.init.options);
  const [showOpts, setShowOpts] = useState(true);
  const [hasUnread, setHasUnread] = useState(false);
  const [stage, setStage]       = useState("init");
  const [fabVisible, setFabVisible] = useState(false);
  const bottomRef = useRef(null);

  /* ── Show FAB after 3-second delay on mount ── */
  useEffect(() => {
    const timer = setTimeout(() => setFabVisible(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing, showOpts]);

  useEffect(() => {
    if (!open && msgs.length > 0) setHasUnread(true);
    if (open) setHasUnread(false);
  }, [open, msgs.length]);

  /* ── helpers ── */
  const pushUser = (text) =>
    setMsgs(p => [...p, { id: `u${Date.now()}`, text, sender: "user", time: ts() }]);

  const pushBot = (text, delay = 1150) =>
    new Promise((resolve) => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMsgs(p => [...p, { id: `b${Date.now()}`, text, sender: "bot", time: ts() }]);
        resolve(undefined);
      }, delay);
    });

  const showOptions = (list, delay = 320) =>
    setTimeout(() => { setOpts(list); setShowOpts(true); }, delay);

  /* ── option click handler ── */
  const handleOpt = useCallback(async (opt) => {
    setShowOpts(false);

    /* ── INIT: Start Chat ── */
    if (stage === "init") {
      pushUser(opt.label);
      await pushBot(FLOW.welcome.message);
      setStage("menu");
      showOptions(FLOW.welcome.options);
      return;
    }

    /* ── MENU: back to main menu ── */
    if (opt.id === "menu") {
      pushUser(opt.label);
      await pushBot("Sure! Here are the topics you can explore. What would you like to know more about?");
      setStage("menu");
      showOptions(FLOW.welcome.options);
      return;
    }

    /* ── External link ── */
    if (opt.id === "ext_link") {
      window.open("https://www.techkohl.com", "_blank", "noopener,noreferrer");
      showOptions(opts, 0);
      setShowOpts(true);
      return;
    }

    /* ── Topic reply ── */
    const reply = FLOW.replies[opt.id];
    if (!reply) return;

    pushUser(opt.label);
    await pushBot(reply.message);

    if (reply.followUp) {
      await pushBot(reply.followUp, 700);
    }

    const nextOpts = reply.externalLink
      ? [...reply.options, { id: "ext_link", label: reply.externalLink.label }]
      : reply.options;

    setStage(opt.id);
    showOptions(nextOpts);
  }, [stage, opts]);

  /* ── open / close ── */
  const openChat  = () => { setAnim("cb-in");  setOpen(true); };
  const closeChat = () => {
    setAnim("cb-out");
    setTimeout(() => setOpen(false), 195);
  };
  const toggleChat = () => open ? closeChat() : openChat();

  const resetChat = async () => {
    setMsgs([]);
    setTyping(false);
    setStage("init");
    setOpts(FLOW.init.options);
    setShowOpts(true);
  };

  /* ── SVG icons (no external dep needed) ── */
  const IconMsg = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
  const IconX = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
  const IconReset = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
    </svg>
  );
  const IconMic = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  );

  const portal = (
    <>
      <style>{CSS}</style>

      {/* FAB — hidden for 3s on mount, then springs in */}
      {fabVisible && (
        <button
          data-cb="fab"
          data-visible="true"
          data-state={open ? "open" : "closed"}
          onClick={toggleChat}
          aria-label="Toggle chat"
        >
          {open ? (
  <IconX />
) : (
  <span style={{
    fontSize: "24px",
    lineHeight: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>
    🤖
  </span>
)}

          {hasUnread && !open && <span data-cb="badge" />}
        </button>
      )}

      {/* Popup */}
      {open && (
        <div data-cb="popup" data-anim={anim}>

          {/* Header */}
          <div data-cb="header">
            <div data-cb="hd-avatar">🤖</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div data-cb="hd-name">TechKohl Support</div>
              <div data-cb="hd-status">
                <span data-cb="hd-dot" />
                Online · Replies instantly
              </div>
            </div>
            <button data-cb="hd-btn" onClick={resetChat} title="New chat" aria-label="New chat">
              <IconReset />
            </button>
            <button data-cb="hd-btn" onClick={closeChat} aria-label="Close">
              <IconX />
            </button>
          </div>

          {/* Feed */}
          <div data-cb="feed">
            <div data-cb="date">{dateLabel()}</div>

            {msgs.map(m => <Bubble key={m.id} msg={m} />)}
            {typing && <TypingIndicator />}

            {showOpts && !typing && opts.length > 0 && (
              <div data-cb="opts">
                {opts.map((o, i) => (
                  <button
                    key={o.id}
                    data-cb="opt"
                    style={{
                      animationDelay: `${i * 0.06}s`,
                      background: o.id === "ext_link"
                        ? "linear-gradient(135deg,#1a3a4a,#1e5068)"
                        : "linear-gradient(135deg,#005c4b,#00a884)",
                      boxShadow: o.id === "ext_link"
                        ? "0 2px 10px rgba(30,80,104,.3)"
                        : "0 2px 10px rgba(0,168,132,.22)",
                    }}
                    onClick={() => handleOpt(o)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} style={{ height: 1 }} />
          </div>

          {/* Footer */}
          <div data-cb="footer">
            <span data-cb="footer-emoji">😊</span>
            <div data-cb="fake-input">Choose an option above ↑</div>
            <div data-cb="mic"><IconMic /></div>
          </div>

        </div>
      )}
    </>
  );

  return typeof document !== "undefined"
    ? ReactDOM.createPortal(portal, document.body)
    : null;
}