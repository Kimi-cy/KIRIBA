import {useState,useMemo} from 'react'
import {motion,AnimatePresence} from 'framer-motion'

// ---- Cambia estos datos por los reales ----
const MARCA='KIRIBA'
const WHATSAPP='51952328707'
const PORTADA='/hero.jpg' // imagen de portada (carpeta public)

// Para agregar una categoria nueva (p. ej. Calzado o Pantalones),
// solo suma otro bloque {id, etiqueta, prendas:[...]} a esta lista.
const CATEGORIAS=[
  {
    id:'blusas',
    etiqueta:'Blusas',
    prendas:[
      {n:'Blusa leopardo',p:99,c:'#7A5C3A',t:['S','M','L']},
      {n:'Top corset',p:89,c:'#8C6D4A',t:['S','M','L']}
    ]
  },
  {
    id:'chompas',
    etiqueta:'Chompas',
    prendas:[
      {n:'Chompa oversize',p:139,c:'#5A4330',t:['S','M','L']},
      {n:'Chompa cuello alto',p:129,c:'#3A2C22',t:['S','M','L']}
    ]
  }
]
// -------------------------------------------

const slide={
  in:d=>({x:d*90,opacity:0}),
  show:{x:0,opacity:1},
  out:d=>({x:d*-90,opacity:0})
}

export default function App(){
  const [cat,setCat]=useState(CATEGORIAS[0].id)
  const [i,setI]=useState(0)
  const [dir,setDir]=useState(1)
  const [tallas,setTallas]=useState({})

  const categoria=useMemo(()=>CATEGORIAS.find(c=>c.id===cat),[cat])
  const PRODUCTOS=categoria.prendas
  const p=PRODUCTOS[i]
  const talla=tallas[p.n]||p.t[0]
  const go=(n,d)=>{setDir(d);setI((n+PRODUCTOS.length)%PRODUCTOS.length)}
  const cambiarCategoria=id=>{setCat(id);setI(0);setDir(1)}
  const href=`https://wa.me/${WHATSAPP}?text=`+encodeURIComponent(`Hola, quiero pedir: ${p.n}, talla ${talla} (S/ ${p.p})`)

  return(<>
    <header><span className="logo">{MARCA}</span><a href="#catalogo">Ver prendas</a></header>

    <section className="hero">
      <motion.img src={PORTADA} alt="KIRIBA: tu estilo, tu esencia, en un solo lugar." initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.2}}/>
      <motion.a className="ver" href="#catalogo" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:1.2,duration:.8}}>Ver coleccion</motion.a>
    </section>

    <section id="catalogo" className="cat">
      <h2 className="titulo">Nueva coleccion</h2>

      <div className="tabs" role="tablist" aria-label="Categorias">
        {CATEGORIAS.map(c=>(
          <button key={c.id} role="tab" aria-selected={c.id===cat} onClick={()=>cambiarCategoria(c.id)}>
            {c.etiqueta}
          </button>
        ))}
      </div>

      <div className="stage">
        <button className="flecha" aria-label="Prenda anterior" onClick={()=>go(i-1,-1)}>‹</button>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={cat+p.n} className="foto" style={{background:p.c}} custom={dir}
            variants={slide} initial="in" animate="show" exit="out" transition={{duration:.35}}>
            Foto de la prenda
          </motion.div>
        </AnimatePresence>
        <button className="flecha" aria-label="Prenda siguiente" onClick={()=>go(i+1,1)}>›</button>
      </div>

      <div className="info">
        <div className="fila"><h3>{p.n}</h3><span className="precio">S/ {p.p}</span></div>
        <div className="tallas">
          {p.t.map(t=><button key={t} aria-pressed={t===talla} onClick={()=>setTallas({...tallas,[p.n]:t})}>{t}</button>)}
        </div>
        <a className="pedir" href={href} target="_blank" rel="noopener noreferrer">Pedir por WhatsApp</a>
        <div className="puntos">
          {PRODUCTOS.map((x,k)=><button key={x.n} aria-label={x.n} aria-current={k===i} onClick={()=>go(k,k>i?1:-1)}/>)}
        </div>
      </div>
    </section>

    <footer><span>Pagos por Yape, Plin o transferencia</span><span>Instagram: @kiriba</span></footer>
  </>)
}
