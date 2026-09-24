import {useState} from 'react'
import {motion,AnimatePresence} from 'framer-motion'

// ---- Cambia estos datos por los reales ----
const MARCA='TU MARCA'
const WHATSAPP='51900000000'
const VIDEO='' // ejemplo: '/hero.mp4' (guarda el video en la carpeta public)
const PRODUCTOS=[
  {n:'Casaca bomber',p:189,c:'#C9C3D6',t:['S','M','L','XL']},
  {n:'Polera oversize',p:129,c:'#D9D4CC',t:['S','M','L','XL']},
  {n:'Polo básico',p:59,c:'#B9BFCB',t:['S','M','L']},
  {n:'Pantalón cargo',p:159,c:'#A9AFA6',t:['28','30','32','34']}
]
// -------------------------------------------

const slide={
  in:d=>({x:d*90,opacity:0}),
  show:{x:0,opacity:1},
  out:d=>({x:d*-90,opacity:0})
}

export default function App(){
  const [i,setI]=useState(0)
  const [dir,setDir]=useState(1)
  const [tallas,setTallas]=useState({})
  const p=PRODUCTOS[i]
  const talla=tallas[p.n]||p.t[0]
  const go=(n,d)=>{setDir(d);setI((n+PRODUCTOS.length)%PRODUCTOS.length)}
  const href=`https://wa.me/${WHATSAPP}?text=`+encodeURIComponent(`Hola, quiero pedir: ${p.n}, talla ${talla} (S/ ${p.p})`)

  return(<>
    <header><span className="logo">{MARCA}</span><a href="#catalogo">Ver prendas</a></header>

    <section className="hero">
      {VIDEO?<video src={VIDEO} autoPlay muted loop playsInline/>:<div className="fondo"/>}
      <div className="velo"/>
      <div className="hero-txt">
        <div className="mask"><motion.h1 initial={{y:'105%'}} animate={{y:0}} transition={{duration:.9,ease:[.2,.7,.2,1]}}>Primera colección</motion.h1></div>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7,duration:.8}}>Prendas hechas en Lima. Pide por WhatsApp.</motion.p>
      </div>
    </section>

    <section id="catalogo" className="cat">
      <div className="stage">
        <button className="flecha" aria-label="Prenda anterior" onClick={()=>go(i-1,-1)}>‹</button>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={p.n} className="foto" style={{background:p.c}} custom={dir}
            variants={slide} initial="in" animate="show" exit="out" transition={{duration:.35}}>
            Foto de la prenda
          </motion.div>
        </AnimatePresence>
        <button className="flecha" aria-label="Prenda siguiente" onClick={()=>go(i+1,1)}>›</button>
      </div>

      <div className="info">
        <div className="fila"><h2>{p.n}</h2><span className="precio">S/ {p.p}</span></div>
        <div className="tallas">
          {p.t.map(t=><button key={t} aria-pressed={t===talla} onClick={()=>setTallas({...tallas,[p.n]:t})}>{t}</button>)}
        </div>
        <a className="pedir" href={href} target="_blank" rel="noopener noreferrer">Pedir por WhatsApp</a>
        <div className="puntos">
          {PRODUCTOS.map((x,k)=><button key={x.n} aria-label={x.n} aria-current={k===i} onClick={()=>go(k,k>i?1:-1)}/>)}
        </div>
      </div>
    </section>

    <footer><span>Pagos por Yape, Plin o transferencia</span><span>Instagram: @tumarca</span></footer>
  </>)
}
