"use client";
import { useState } from "react";

export default function Home(){
 const [msg,setMsg]=useState("");
 const [list,setList]=useState<string[]>([]);
 return (
  <div style={{minHeight:"100vh",background:"#0a0a0f",color:"white",fontFamily:"sans-serif"}}>
   <header style={{padding:20,borderBottom:"1px solid #222",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
    <h1 style={{fontWeight:900,letterSpacing:2}}>NOVA AI</h1>
    <span style={{background:"#a78bfa",color:"black",padding:"5px 12px",borderRadius:20,fontSize:12}}>PRO</span>
   </header>
   <main style={{maxWidth:800,margin:"0 auto",padding:20}}>
    <div style={{background:"#1a1a2e",borderRadius:16,padding:20,minHeight:400,marginBottom:20}}>
     {list.length===0 ? <p style={{opacity:0.5,textAlign:"center",marginTop:100}}>🚀 مرحبا! أنا NOVA AI - شنو نقدر نعاونك؟</p> : list.map((m,i)=><div key={i} style={{padding:10,marginBottom:10,background:i%2===0?"#2a2a4a":"#1a1a3a",borderRadius:10}}>{m}</div>)}
    </div>
    <div style={{display:"flex",gap:10}}>
     <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="كتب هنا..." style={{flex:1,padding:15,borderRadius:12,border:"1px solid #333",background:"#111",color:"white"}}/>
     <button onClick={()=>{if(!msg)return; setList([...list,msg]); setMsg("")}} style={{padding:"15px 25px",borderRadius:12,background:"#a78bfa",color:"black",fontWeight:700,border:"none"}}>إرسال</button>
    </div>
   </main>
  </div>
 )
}
