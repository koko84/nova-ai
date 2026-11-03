"use client";
import { useState, useRef } from "react";

export default function NovaAI() {
  const [msgs, setMsgs] = useState<{role:string,text:string}[]>([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [page, setPage] = useState("chat");
  const fileRef = useRef<HTMLInputElement>(null);

  const send = () => {
    if(!input.trim()) return;
    setMsgs([...msgs,{role:"user",text:input},{role:"ai",text:"Hello! I'm Nova AI. Your app is now WHITE 100% and ready for Google Play! 🤖✨"}]);
    setInput("");
  };

  const startMic = () => {
    const Speech:any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if(!Speech){ alert("Mic not supported"); return; }
    const r = new Speech(); r.lang="en-US"; r.onstart=()=>setListening(true);
    r.onend=()=>setListening(false); r.onresult=(e:any)=>setInput(e.results[0][0].transcript); r.start();
  };

  if(page!=="chat"){
    const pages:any = {
      about: {t:"About Us",c:"NOVA AI is a professional Artificial Intelligence platform designed to help you with questions, writing, ideas and daily tasks. Simple, fast and secure."},
      how: {t:"How to Use",c:"1. Type your question\n2. Use Mic 🎤 to speak\n3. Use Camera 📷 to send image\n4. Get instant answer"},
      privacy: {t:"Privacy Policy",c:"We respect your privacy. We do not store personal data. Conversations are not shared."},
      terms: {t:"Terms of Service",c:"By using Nova AI you agree to use it responsibly. No illegal content."},
      contact: {t:"Contact Us",c:"Email: support@nova-ai.app\nWe reply in 24h"},
    };
    return(
      <div style={{padding:20,background:"#f8f9fb",minHeight:"100vh",fontFamily:"sans-serif"}}>
        <button onClick={()=>setPage("chat")} style={{marginBottom:20,background:"#6d28d9",color:"#fff",border:0,padding:"10px 16px",borderRadius:8}}>← Back</button>
        <div style={{background:"#fff",padding:24,borderRadius:16,maxWidth:700,margin:"0 auto",border:"1px solid #e5e7eb"}}>
          <h1>{pages[page].t}</h1><p style={{whiteSpace:"pre-line",marginTop:12,lineHeight:1.6}}>{pages[page].c}</p>
        </div>
      </div>
    )
  }

  return(
    <div style={{display:"flex",minHeight:"100vh",background:"#f8f9fb",fontFamily:"sans-serif"}}>
      <div style={{width:240,background:"#fff",borderRight:"1px solid #e5e7eb",padding:16,display:"flex",flexDirection:"column"}}>
        <div style={{fontWeight:800,fontSize:22,display:"flex",gap:8,alignItems:"center",marginBottom:16}}><span style={{background:"#6d28d9",color:"#fff",width:32,height:32,display:"grid",placeItems:"center",borderRadius:8}}>N</span> Nova AI</div>
        <button style={{background:"#6d28d9",color:"#fff",border:0,padding:12,borderRadius:10,fontWeight:700}}> + New Chat</button>
        <div style={{marginTop:20,fontSize:11,color:"#888"}}>PAGES</div>
        <button onClick={()=>setPage("about")} style={{textAlign:"left",padding:10,border:0,background:"#fff",borderRadius:8}}>About Us</button>
        <button onClick={()=>setPage("how")} style={{textAlign:"left",padding:10,border:0,background:"#fff",borderRadius:8}}>How to Use</button>
        <button onClick={()=>setPage("privacy")} style={{textAlign:"left",padding:10,border:0,background:"#fff",borderRadius:8}}>Privacy Policy</button>
        <button onClick={()=>setPage("terms")} style={{textAlign:"left",padding:10,border:0,background:"#fff",borderRadius:8}}>Terms of Service</button>
        <button onClick={()=>setPage("contact")} style={{textAlign:"left",padding:10,border:0,background:"#fff",borderRadius:8}}>Contact Us</button>
        <div style={{marginTop:"auto",background:"#f3f4f6",padding:10,borderRadius:8,fontSize:11,color:"#888",textAlign:"center",border:"1px dashed #ccc"}}>AdMob Banner</div>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{background:"#fff",borderBottom:"1px solid #e5e7eb",padding:"12px 16px",display:"flex",justifyContent:"space-between"}}><b>Nova AI Chat</b><span style={{fontSize:12,background:"#dcfce7",color:"#166534",padding:"4px 8px",borderRadius:12}}>● Online</span></div>
        <div style={{flex:1,padding:20,overflow:"auto"}}>
          {msgs.length===0 && <div style={{textAlign:"center",marginTop:80}}><h1 style={{fontSize:36}}>Hello, I'm <span style={{color:"#6d28d9"}}>Nova AI</span></h1><p style={{color:"#666",marginTop:8}}>White 100% - Ready for Google Play</p></div>}
          {msgs.map((m,i)=><div key={i} style={{display:"flex",gap:12,background:m.role==="user"?"#ede9fe":"#fff",border:"1px solid #e5e7eb",padding:12,borderRadius:12,marginBottom:8,maxWidth:700}}><b>{m.role==="user"?"You":"AI"}:</b> {m.text}</div>)}
        </div>
        <div style={{padding:16}}>
          <div style={{display:"flex",gap:8,background:"#fff",border:"1px solid #e5e7eb",padding:8,borderRadius:16,maxWidth:800,margin:"0 auto"}}>
            <button onClick={startMic} style={{border:0,padding:"10px 14px",borderRadius:10,background:listening?"#fee2e2":"#fff",border:"1px solid #e5e7eb"}}>{listening?"🔴":"🎤"}</button>
            <button onClick={()=>fileRef.current?.click()} style={{border:"1px solid #e5e7eb",background:"#fff",padding:"10px 14px",borderRadius:10}}>📷</button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={()=>alert("Image selected! Ready for AI.")}/>
            <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask Nova AI..." style={{flex:1,border:0,outline:"none",resize:"none",padding:8}} rows={1}/>
            <button onClick={send} style={{background:"#6d28d9",color:"#fff",border:0,padding:"10px 18px",borderRadius:10,fontWeight:700}}>Send</button>
          </div>
          <div style={{textAlign:"center",fontSize:10,color:"#999",marginTop:8}}>AdMob - com.google.android.gms.ads</div>
        </div>
      </div>
    </div>
  )
}
