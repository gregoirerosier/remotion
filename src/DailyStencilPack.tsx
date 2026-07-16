import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type DailyStencilPackProps = {
  title: string;
  collection: string;
  dropNumber: string;
  releaseDate: string;
  website: string;
  stencilFile: string;
  primary: string;
  accent: string;
};

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = Easing.bezier(0.16, 1, 0.3, 1);

const Starfield: React.FC<{primary: string}> = ({primary}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: 72}).map((_, i) => {
        const x = random(`sx-${i}`) * 1080;
        const y0 = random(`sy-${i}`) * 1920;
        const size = 1.5 + random(`ss-${i}`) * 5;
        const speed = 0.25 + random(`sv-${i}`) * 1.1;
        const y = (y0 - frame * speed + 1920) % 1920;
        const twinkle = 0.25 + 0.65 * Math.abs(Math.sin(frame / (11 + i % 9) + i));
        return (
          <div key={i} style={{
            position: 'absolute', left: x, top: y, width: size, height: size,
            borderRadius: 999, opacity: twinkle,
            background: i % 5 === 0 ? '#fff4ca' : '#d8b8ff',
            boxShadow: `0 0 ${8 + size * 3}px ${i % 5 === 0 ? '#e6c36a' : primary}`,
          }}/>
        );
      })}
    </AbsoluteFill>
  );
};

const Fog: React.FC<{primary: string}> = ({primary}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 1050 + i * 160, height: 430 + i * 70,
          left: -180 + i * 100 + Math.sin(frame / (65 + i * 14)) * 60,
          top: 1130 + i * 120,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${primary}55 0%, ${primary}22 42%, transparent 72%)`,
          filter: `blur(${55 + i * 18}px)`,
          opacity: 0.55 - i * 0.1,
          rotate: `${-8 + i * 7}deg`,
        }}/>
      ))}
    </AbsoluteFill>
  );
};

const Brand: React.FC<{primary: string; accent: string}> = ({primary, accent}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 24, 150, 180], [0, 1, 1, 0], clamp);
  return (
    <div style={{position: 'absolute', top: 96, width: '100%', textAlign: 'center', opacity}}>
      <Img src={staticFile('bit-atom.svg')} style={{width: 120, height: 120, filter: `drop-shadow(0 0 24px ${primary})`}}/>
      <div style={{fontSize: 38, letterSpacing: 10, fontWeight: 800, color: '#fff', marginTop: 8}}>BEYOND TATTOO</div>
      <div style={{fontSize: 23, letterSpacing: 9, fontWeight: 800, color: accent, marginTop: 10}}>STENCIL DROP</div>
    </div>
  );
};

const PackShell: React.FC<DailyStencilPackProps> = ({collection, dropNumber, primary, accent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 110, mass: 0.95}});
  const tear = interpolate(frame, [225, 300], [0, 1], {...clamp, easing: ease});
  const exit = interpolate(frame, [300, 348], [1, 0], clamp);
  const anticipation = interpolate(frame, [180, 215, 228], [1, 0.95, 1.03], clamp);
  const shakeAmp = interpolate(frame, [188, 232], [2, 16], clamp);
  const shake = frame >= 188 && frame <= 232 ? Math.sin(frame * 3.5) * shakeAmp : 0;
  const shimmer = ((frame * 12) % 1050) - 250;
  const bob = Math.sin(frame / 18) * 8;
  return (
    <div style={{
      position: 'absolute', width: 690, height: 1040, left: 195, top: 460,
      opacity: exit,
      scale: interpolate(enter, [0, 1], [0.62, 1]) * anticipation,
      translate: `${shake}px ${interpolate(enter, [0, 1], [360, bob]) + tear * 135}px`,
      rotate: `${shake / 8 + Math.sin(frame / 34) * 1.3}deg`,
      filter: `drop-shadow(0 0 52px ${primary}) drop-shadow(0 18px 35px rgba(0,0,0,.55))`,
    }}>
      <svg width="690" height="1040" viewBox="0 0 690 1040">
        <defs>
          <linearGradient id="foilV2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#08010f"/>
            <stop offset=".18" stopColor="#451079"/>
            <stop offset=".38" stopColor="#12001d"/>
            <stop offset=".63" stopColor="#892ee7"/>
            <stop offset=".81" stopColor="#1b0427"/>
            <stop offset="1" stopColor="#050008"/>
          </linearGradient>
          <linearGradient id="shineV2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,0)"/>
            <stop offset=".5" stopColor="rgba(255,255,255,.85)"/>
            <stop offset="1" stopColor="rgba(255,255,255,0)"/>
          </linearGradient>
          <filter id="softGlow"><feGaussianBlur stdDeviation="13" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <rect x="30" y="20" width="630" height="990" rx="54" fill="url(#foilV2)" stroke="#c88cff" strokeWidth="5"/>
        <path d="M44 130H646M44 900H646" stroke="#e8d1ff" strokeWidth="18" opacity=".65"/>
        <path d="M58 82H632M58 98H632M58 114H632" stroke="#d4abff" strokeWidth="5" opacity=".55"/>
        <path d="M58 925H632M58 944H632M58 963H632" stroke="#d4abff" strokeWidth="5" opacity=".55"/>
        <g opacity={1-tear}>
          <circle cx="345" cy="402" r="178" fill="none" stroke="#a548ff" strokeWidth="8" filter="url(#softGlow)"/>
          <path d="M345 221L395 365L548 365L424 454L472 605L345 514L218 605L266 454L142 365L295 365Z" fill="none" stroke="#f5e6ff" strokeWidth="7" opacity=".6"/>
          <text x="345" y="690" textAnchor="middle" fill="#fff" fontSize="49" fontWeight="900" fontFamily="Arial">{collection}</text>
          <text x="345" y="745" textAnchor="middle" fill={accent} fontSize="27" fontWeight="800" letterSpacing="7" fontFamily="Arial">DAILY STENCIL</text>
          <text x="345" y="815" textAnchor="middle" fill="#fff" fontSize="74" fontWeight="950" fontFamily="Arial">#{dropNumber}</text>
        </g>
        <g style={{transform: `translateY(${-tear * 205}px) rotate(${-tear * 9}deg)`, transformOrigin: '345px 120px'}}>
          <path d="M32 132L94 86L150 132L214 80L276 132L340 79L405 132L470 86L530 132L658 76L658 20L32 20Z" fill="#53108b" stroke="#e0bcff" strokeWidth="5"/>
        </g>
        <rect x={shimmer} y="40" width="185" height="910" fill="url(#shineV2)" opacity=".22" transform="skewX(-18)"/>
      </svg>
    </div>
  );
};

const TapPrompt: React.FC<{primary: string}> = ({primary}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [50, 78, 170, 205], [0, 1, 1, 0], clamp);
  const pulse = 1 + Math.sin(frame / 8) * 0.035;
  return (
    <div style={{position: 'absolute', bottom: 195, width: '100%', textAlign: 'center', opacity}}>
      <div style={{fontSize: 28, letterSpacing: 6, color: '#d7b9ff', fontWeight: 800}}>FREE STENCIL DROP</div>
      <div style={{display: 'inline-flex', marginTop: 22, padding: '25px 58px', borderRadius: 999, border: '3px solid #c88cff', background: 'rgba(70,15,112,.72)', color: '#fff', fontSize: 30, fontWeight: 950, scale: pulse, boxShadow: `0 0 32px ${primary}`}}>DOUBLE TAP TO OPEN</div>
    </div>
  );
};

const TapRipples: React.FC<{primary: string}> = ({primary}) => {
  const frame = useCurrentFrame();
  return <>{[190, 212, 234].map((f) => {
    const p = interpolate(frame, [f, f + 24], [0, 1], clamp);
    return <div key={f} style={{position: 'absolute', left: 540, top: 1000, width: 180, height: 180, borderRadius: 999, border: '7px solid #efdfff', opacity: (1-p)*0.9, scale: 0.2+p*1.8, translate: '-50% -50%', boxShadow: `0 0 32px ${primary}`}}/>;
  })}</>;
};

const RevealBurst: React.FC<{primary: string; accent: string}> = ({primary, accent}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [248, 270, 326], [0, 1, 0], clamp);
  return (
    <>
      <div style={{position: 'absolute', left: 540, top: 870, width: 960, height: 960, borderRadius: 999, translate: '-50% -50%', scale: 0.2+p*1.7, opacity: p, background: `radial-gradient(circle, #fff 0%, ${accent} 18%, ${primary}bb 38%, transparent 70%)`, filter: 'blur(14px)'}}/>
      {Array.from({length: 38}).map((_, i) => {
        const a = random(`ba-${i}`) * Math.PI * 2;
        const dist = interpolate(frame, [260, 340], [0, 430 + random(`bd-${i}`)*320], clamp);
        const size = 5 + random(`bz-${i}`)*15;
        const opacity = interpolate(frame, [260, 278, 345], [0, 1, 0], clamp);
        return <div key={i} style={{position: 'absolute', left: 540+Math.cos(a)*dist, top: 880+Math.sin(a)*dist, width: size, height: size*0.35, background: i%4===0?accent:'#d9b8ff', opacity, rotate: `${a}rad`, boxShadow: `0 0 14px ${primary}`}}/>;
      })}
    </>
  );
};

const StencilCard: React.FC<DailyStencilPackProps> = ({title, collection, releaseDate, stencilFile, primary, accent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame: frame-275, fps, config: {damping: 16, stiffness: 108, mass: 0.9}});
  const opacity = interpolate(frame, [270, 315], [0, 1], clamp);
  const halo = 0.9 + Math.sin(frame/13)*0.05;
  const cardOut = interpolate(frame, [500, 550], [1, 0.88], clamp);
  return (
    <div style={{position: 'absolute', width: 790, height: 1110, left: 145, top: 280, opacity, translate: `0 ${interpolate(reveal,[0,1],[960,0])}px`, rotate: `${interpolate(reveal,[0,1],[-8,0])}deg`, scale: interpolate(reveal,[0,1],[0.7,1])*cardOut}}>
      <div style={{position:'absolute', inset:-50, borderRadius:64, background:`radial-gradient(circle, ${accent}88 0%, ${primary}66 38%, transparent 70%)`, filter:'blur(26px)', scale:halo}}/>
      <div style={{position:'absolute', inset:-24, borderRadius:44, background:`linear-gradient(135deg, ${accent}, #fff4d0, ${primary}, #2b073b)`, boxShadow:`0 0 52px ${primary}`}}/>
      <div style={{position:'absolute', inset:-12, borderRadius:36, background:'#f7f4ef'}}/>
      <Img src={staticFile(stencilFile)} style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'contain', background:'#fff', borderRadius:28}}/>
      <div style={{position:'absolute', top:22, left:26, right:26, display:'flex', justifyContent:'space-between', color:'#2a1738', fontWeight:900, letterSpacing:3, fontSize:18}}>
        <span>{collection}</span><span>{releaseDate}</span>
      </div>
      <div style={{position:'absolute', left:28, right:28, bottom:25, textAlign:'center', background:'rgba(255,255,255,.9)', borderRadius:18, padding:'13px 20px', color:'#201329', fontSize:24, fontWeight:950, letterSpacing:3}}>{title}</div>
    </div>
  );
};

const FeatureStrip: React.FC<{primary: string; accent: string}> = ({primary, accent}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame,[400,435,505,535],[0,1,1,0],clamp);
  return (
    <div style={{position:'absolute', left:84, right:84, bottom:130, opacity, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16}}>
      {[['ARTIST','APPROVED'],['PRINT','READY'],['HIGH','DETAIL']].map(([a,b],i)=><div key={a} style={{padding:'20px 12px', borderRadius:20, border:`2px solid ${i===1?accent:'#bf89ff'}`, background:'rgba(10,4,17,.82)', textAlign:'center', color:'#fff', boxShadow:`0 0 20px ${primary}55`}}><div style={{fontSize:18,fontWeight:900,letterSpacing:3}}>{a}</div><div style={{fontSize:16,fontWeight:700,letterSpacing:2,color:i===1?accent:'#cfb3ee',marginTop:5}}>{b}</div></div>)}
    </div>
  );
};

const EndCard: React.FC<DailyStencilPackProps> = ({title, collection, dropNumber, website, primary, accent}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame,[520,555,590],[0,1,1],clamp);
  const rise = interpolate(frame,[520,580],[50,0],{...clamp,easing:ease});
  return (
    <AbsoluteFill style={{opacity, alignItems:'center', justifyContent:'center', background:'radial-gradient(circle at 50% 38%, #35105a 0%, #12001d 48%, #050007 100%)'}}>
      <Starfield primary={primary}/>
      <div style={{textAlign:'center', translate:`0 ${rise}px`}}>
        <Img src={staticFile('bit-atom.svg')} style={{width:150,height:150,filter:`drop-shadow(0 0 26px ${primary})`}}/>
        <div style={{fontSize:27,letterSpacing:10,fontWeight:800,color:accent,marginTop:22}}>DAILY STENCIL #{dropNumber}</div>
        <div style={{fontSize:68,lineHeight:1.05,fontWeight:950,color:'#fff',letterSpacing:3,marginTop:24,textShadow:`0 0 28px ${primary}`}}>{title}</div>
        <div style={{fontSize:31,fontWeight:800,color:'#d7b9ff',letterSpacing:7,marginTop:18}}>{collection}</div>
        <div style={{display:'inline-block',marginTop:52,padding:'26px 60px',borderRadius:999,background:`linear-gradient(135deg,${primary},#b55fff)`,color:'#fff',fontSize:30,fontWeight:950,boxShadow:`0 0 36px ${primary}`}}>DOWNLOAD TODAY&apos;S PACK</div>
        <div style={{fontSize:22,color:'#ddd0ea',marginTop:25,letterSpacing:2}}>{website}</div>
      </div>
    </AbsoluteFill>
  );
};

export const DailyStencilPack: React.FC<DailyStencilPackProps> = (props) => {
  const {primary, accent} = props;
  return (
    <AbsoluteFill style={{background:'radial-gradient(circle at 50% 42%, #35105a 0%, #12001d 50%, #050007 100%)', overflow:'hidden', fontFamily:'Arial, Helvetica, sans-serif'}}>
      <Starfield primary={primary}/>
      <Fog primary={primary}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(255,255,255,.025),transparent 35%,rgba(0,0,0,.45))'}}/>
      <Brand primary={primary} accent={accent}/>
      <PackShell {...props}/>
      <TapPrompt primary={primary}/>
      <TapRipples primary={primary}/>
      <RevealBurst primary={primary} accent={accent}/>
      <StencilCard {...props}/>
      <FeatureStrip primary={primary} accent={accent}/>
      <Sequence from={515}><EndCard {...props}/></Sequence>
    </AbsoluteFill>
  );
};
