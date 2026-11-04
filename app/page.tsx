"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, Bot, BriefcaseBusiness, ChevronDown, CircleHelp, FileText, Globe2, Image as ImageIcon, Languages, Mail, Menu, MessageSquare, Paperclip, Plus, Settings, Sparkles, WandSparkles, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string; imageData?: string };
const tools = [
  {id:"chat",name:"AI Chat",desc:"Ask anything and explore ideas",icon:MessageSquare,color:"violet",prompt:"Help me plan a productive week."},
  {id:"writer",name:"AI Writer",desc:"Create posts, emails and content",icon:FileText,color:"blue",prompt:"Write a professional social media post introducing my business."},
  {id:"translate",name:"Translator",desc:"Translate naturally between languages",icon:Languages,color:"teal",prompt:"Translate this text into English, French and Arabic: "},
  {id:"business",name:"Business assistant",desc:"Plan, organize and grow your business",icon:BriefcaseBusiness,color:"orange",prompt:"Create a simple business growth plan for a small online shop."},
  {id:"ideas",name:"Idea generator",desc:"Find ideas and turn them into plans",icon:WandSparkles,color:"pink",prompt:"Give me 10 practical online business ideas and explain how to validate them."},
  {id:"image",name:"Image studio",desc:"Generate original images from text prompts",icon:ImageIcon,color:"indigo",prompt:"Create a detailed image-generation prompt for a modern product advertisement."}
];

export default function Home() {
  const [active,setActive] = useState("chat");
  const [messages,setMessages] = useState<Msg[]>([]);
  const [input,setInput] = useState("");
  const [loading,setLoading] = useState(false);
  const [mobileOpen,setMobileOpen] = useState(false);
  const [language,setLanguage] = useState("English");
  const [history,setHistory] = useState<string[]>([]);
  const [image,setImage] = useState<{name:string;dataUrl:string}|null>(null);
  const [showHelp,setShowHelp] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const selected = useMemo(()=>tools.find(t=>t.id===active) || tools[0],[active]);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages,loading]);
  useEffect(()=>{ try { setHistory(JSON.parse(localStorage.getItem("nova-history")||"[]")); } catch {} },[]);
  function startTool(id:string) { setActive(id); setMessages([]); setMobileOpen(false); }
  function newChat(){setMessages([]);setInput("");setImage(null);setActive("chat");}
  function pickImage(file?:File) {
    if (!file) return;
    if (!["image/png","image/jpeg","image/webp","image/gif"].includes(file.type)) { alert("Choose a PNG, JPG, WEBP or GIF image."); return; }
    if (file.size > 5 * 1024 * 1024) { alert("Image must be 5 MB or smaller."); return; }
    const reader = new FileReader();
    reader.onload = () => setImage({name:file.name,dataUrl:String(reader.result)});
    reader.readAsDataURL(file);
  }
  async function send(text?:string) {
    const value=(text ?? input).trim(); if((!value && !image) || loading) return;
    const visibleText = value || "Please analyze this image.";
    const attachedImage = image?.dataUrl;
    const next=[...messages,{role:"user" as const,content:visibleText,imageData:attachedImage}];
    setMessages(next); setInput(""); setLoading(true);
    try {
      if (active === "image" && !attachedImage) {
        const imageRes = await fetch("/api/images", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:visibleText})});
        const imageResult = await imageRes.json();
        if (!imageRes.ok) throw new Error(imageResult.error || "Image generation failed");
        setMessages([...next,{role:"assistant",content:"Your image is ready. You can save it below.",imageData:imageResult.imageData}]);
        setImage(null);
        return;
      }
      const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:active==="chat"?visibleText:`${selected.name}: ${visibleText}`,history:messages.map(m=>({role:m.role,content:m.content})),imageData:attachedImage,language})});
      const data=await res.json();
      if(!res.ok) throw new Error(data.error||"Request failed");
      setMessages([...next,{role:"assistant",content:data.reply}]);
      setImage(null);
      const updated=[visibleText,...history].slice(0,12); setHistory(updated); localStorage.setItem("nova-history",JSON.stringify(updated));
    } catch(e:any) { setMessages([...next,{role:"assistant",content:`Sorry, something went wrong: ${e.message}`}]); }
    finally {setLoading(false);}
  }

  return <main className="shell">
    <aside className={`sidebar ${mobileOpen?"open":""}`}>
      <div className="brand"><div className="brand-mark">N</div><span>NOVA<span className="brand-ai">AI</span></span><button className="mobile-close" onClick={()=>setMobileOpen(false)}><X size={18}/></button></div>
      <button className="new-chat" onClick={newChat}><Plus size={17}/> New conversation</button>
      <div className="nav-label">WORKSPACE</div>
      <button className={`nav-item ${active==="chat"?"selected":""}`} onClick={()=>startTool("chat")}><MessageSquare size={17}/> AI Assistant</button>
      <div className="nav-label">AI TOOLS</div>
      {tools.filter(t=>t.id!=="chat").map(t=><button key={t.id} className={`nav-item ${active===t.id?"selected":""}`} onClick={()=>startTool(t.id)}><t.icon size={17}/>{t.name}</button>)}
      <div className="sidebar-bottom">
        <div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={17}/></div><b>Unlock your potential</b><p>Explore more ways to work smarter with NOVA.</p><button onClick={()=>alert("Subscription plans will be configured when billing is connected.")}>Explore plans <ArrowUp size={13}/></button></div>
        <button className="nav-item" onClick={()=>alert("Settings area: account, language and preferences can be connected in the next setup step.")}><Settings size={17}/> Settings</button>
        <div className="profile"><div className="avatar">N</div><div><b>NOVA User</b><small>Free workspace</small></div><ChevronDown size={16}/></div>
      </div>
    </aside>

    <section className="main-panel">
      <header className="topbar"><button className="menu-button" onClick={()=>setMobileOpen(true)}><Menu/></button><div className="crumb">Workspace <span>/</span> <b>{selected.name}</b></div><div className="top-actions"><div className="online"><i/> Workspace ready</div><select value={language} onChange={e=>setLanguage(e.target.value)} aria-label="Language"><option>English</option><option>العربية</option><option>Français</option><option>Español</option></select><button className="help" title="How to use NOVA AI" onClick={()=>setShowHelp(true)}><CircleHelp size={18}/></button></div></header>
      <div className="content">
        {messages.length===0 ? <div className="welcome">
          <div className="eyebrow"><span className="sparkle-dot"><Sparkles size={13}/></span> YOUR INTELLIGENT WORKSPACE</div>
          <h1>Ideas become <span>reality.</span></h1>
          <p className="welcome-sub">Meet your AI workspace. Think, create, write and grow — all in one place.</p>
          <div className="prompt-box"><textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask NOVA anything..." rows={3}/>
            {image&&<div className="attachment-preview"><img src={image.dataUrl} alt="Selected upload"/><span>{image.name}</span><button onClick={()=>setImage(null)} aria-label="Remove image"><X size={14}/></button></div>}
            <div className="prompt-footer"><span><Sparkles size={14}/> NOVA AI Assistant</span><div className="composer-actions"><button className="attach-button" onClick={()=>fileRef.current?.click()} title="Attach an image"><Paperclip size={17}/></button><button className="send-button" disabled={(!input.trim()&&!image)||loading} onClick={()=>send()}><ArrowUp size={18}/></button></div></div></div>
          <div className="section-heading"><div><b>Explore AI tools</b><small>Choose a tool to get started</small></div><span>06 TOOLS</span></div>
          <div className="tool-grid">{tools.map(t=><button key={t.id} className="tool-card" onClick={()=>{startTool(t.id); if(t.id!=="chat") setInput("");}}><div className={`tool-icon ${t.color}`}><t.icon size={20}/></div><b>{t.name}</b><p>{t.desc}</p><span className="tool-arrow">↗</span></button>)}</div>
          <div className="bottom-note"><Globe2 size={15}/> Built for curious minds and ambitious businesses around the world.</div><footer className="site-footer"><button onClick={()=>setShowHelp(true)}>How to use</button><a href="mailto:karim071984@gmail.com"><Mail size={13}/> Contact support</a><span>© {new Date().getFullYear()} NOVA AI</span></footer>
        </div> : <div className="chat-view">
          <div className="chat-title"><div className="tool-icon violet"><selected.icon size={20}/></div><div><h2>{selected.name}</h2><p>{selected.desc}</p></div><button className="clear-btn" onClick={newChat}>New chat</button></div>
          <div className="messages">{messages.map((m,i)=><div className={`message ${m.role}`} key={i}><div className="message-avatar">{m.role==="assistant"?<Bot size={17}/>: "Y"}</div><div className="message-body"><b>{m.role==="assistant"?"NOVA AI":"You"}</b><p>{m.content}</p>{m.imageData&&<><img className="message-image" src={m.imageData} alt={m.role==="assistant"?"AI-generated image":"Image attached to message"}/>{m.role==="assistant"&&<a className="image-download" href={m.imageData} download="nova-ai-image.png">Download image</a>}</>}</div></div>)}{loading&&<div className="message assistant"><div className="message-avatar"><Bot size={17}/></div><div className="message-body"><b>NOVA AI</b><p className="typing">Thinking<span>.</span><span>.</span><span>.</span></p></div></div>}<div ref={endRef}/></div>
          <div className="chat-composer"><textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder={`Message ${selected.name}...`} rows={2}/><div className="chat-send-actions">{image&&<div className="attachment-preview compact"><img src={image.dataUrl} alt="Selected upload"/><button onClick={()=>setImage(null)} aria-label="Remove image"><X size={14}/></button></div>}<button className="attach-button" onClick={()=>fileRef.current?.click()} title="Attach an image"><Paperclip size={17}/></button><button className="send-button" disabled={(!input.trim()&&!image)||loading} onClick={()=>send()}><ArrowUp size={18}/></button></div></div><small className="disclaimer">NOVA AI can make mistakes. Check important information.</small>
        </div>}
      </div>
      <input ref={fileRef} className="hidden-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={e=>{pickImage(e.target.files?.[0]);e.currentTarget.value="";}}/>
    </section>
    {showHelp&&<div className="modal-backdrop" role="presentation" onClick={()=>setShowHelp(false)}><section className="help-modal" role="dialog" aria-modal="true" aria-labelledby="help-title" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setShowHelp(false)} aria-label="Close"><X size={18}/></button><div className="eyebrow"><Sparkles size={14}/> NOVA AI GUIDE</div><h2 id="help-title">How to use NOVA AI</h2><ol><li><b>Choose a tool.</b> Start with AI Assistant, Writer, Translator, Business Assistant or Idea Generator.</li><li><b>Ask clearly.</b> Describe what you need and include useful context. Press Enter to send; use Shift + Enter for a new line.</li><li><b>Share or create images.</b> Tap the paperclip to analyze an image, or open Image Studio, describe what you want, and generate a picture.</li><li><b>Start fresh.</b> Use New conversation to clear the current chat.</li></ol><p className="help-tip">Tip: Never upload passwords, private documents or sensitive personal information.</p><a className="contact-link" href="mailto:karim071984@gmail.com"><Mail size={16}/> Contact: karim071984@gmail.com</a></section></div>}
  </main>;
}
