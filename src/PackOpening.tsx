import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type PackOpeningProps = {
  title: string;
  subtitle: string;
  website: string;
  primary: string;
  stencilFile: string;
};

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const Particles: React.FC<{burst?: boolean}> = ({burst = false}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: burst ? 42 : 28}).map((_, i) => {
        const x = random(`x-${i}`) * 1080;
        const y0 = burst ? 940 : random(`y-${i}`) * 1920;
        const speed = burst ? 7 + random(`s-${i}`) * 11 : 0.35 + random(`s-${i}`) * 1.1;
        const size = burst ? 5 + random(`z-${i}`) * 11 : 2 + random(`z-${i}`) * 5;
        const drift = Math.sin(frame / 22 + i) * (burst ? 18 : 8);
        const y = burst ? y0 - Math.max(0, frame - 270) * speed : (y0 - frame * speed + 1920) % 1920;
        const opacity = burst
          ? interpolate(frame, [270, 285, 350], [0, 1, 0], clamp)
          : 0.22 + random(`o-${i}`) * 0.55;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x + drift,
              top: y,
              width: size,
              height: size,
              borderRadius: '50%',
              opacity,
              background: i % 3 === 0 ? '#fff' : '#b56cff',
              boxShadow: '0 0 18px rgba(181,108,255,.95)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const FoilPack: React.FC<{primary: string}> = ({primary}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 16, stiffness: 105}});
  const open = interpolate(frame, [245, 320], [0, 1], {...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const shake = frame >= 188 && frame <= 252 ? Math.sin(frame * 2.9) * interpolate(frame, [188, 252], [2, 16], clamp) : 0;
  const exitOpacity = interpolate(frame, [300, 345], [1, 0], clamp);
  const shimmer = ((frame * 11) % 980) - 280;

  return (
    <div
      style={{
        position: 'absolute',
        width: 650,
        height: 950,
        left: 215,
        top: 505,
        scale: interpolate(enter, [0, 1], [0.68, 1]),
        translate: `${shake}px ${interpolate(enter, [0, 1], [300, 0]) + open * 150}px`,
        rotate: `${shake / 7}deg`,
        opacity: exitOpacity,
        filter: `drop-shadow(0 0 55px ${primary})`,
      }}
    >
      <svg width="650" height="950" viewBox="0 0 650 950">
        <defs>
          <linearGradient id="foil" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#14001d"/>
            <stop offset=".25" stopColor="#7b22da"/>
            <stop offset=".55" stopColor="#230032"/>
            <stop offset=".8" stopColor="#b355ff"/>
            <stop offset="1" stopColor="#110018"/>
          </linearGradient>
          <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,0)"/>
            <stop offset=".5" stopColor="rgba(255,255,255,.75)"/>
            <stop offset="1" stopColor="rgba(255,255,255,0)"/>
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="11" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <rect x="35" y="25" width="580" height="900" rx="48" fill="url(#foil)" stroke="#c98bff" strokeWidth="6"/>
        <path d="M40 120H610M40 835H610" stroke="#e1baff" strokeWidth="15" opacity=".75"/>
        <g opacity={1-open}>
          <circle cx="325" cy="400" r="165" fill="none" stroke="#b96cff" strokeWidth="8" filter="url(#glow)"/>
          <circle cx="325" cy="400" r="92" fill="none" stroke="#fff" strokeWidth="5" opacity=".8"/>
          <path d="M325 210L375 365L540 365L405 462L455 620L325 522L195 620L245 462L110 365L275 365Z" fill="none" stroke="#dcb8ff" strokeWidth="8" opacity=".55"/>
          <text x="325" y="710" textAnchor="middle" fill="#fff" fontSize="58" fontWeight="900" fontFamily="Arial">BEYOND</text>
          <text x="325" y="770" textAnchor="middle" fill="#d9b9ff" fontSize="34" fontWeight="700" fontFamily="Arial">TATTOO</text>
        </g>
        <g style={{transform: `translateY(${-open * 180}px) rotate(${-open * 8}deg)`, transformOrigin: '325px 120px'}}>
          <path d="M38 120L100 78L150 120L215 74L275 120L330 74L390 120L455 78L515 120L612 72L612 25L38 25Z" fill="#7b22da" stroke="#dcb8ff" strokeWidth="5"/>
        </g>
        <rect x={shimmer} y="40" width="170" height="850" fill="url(#shine)" opacity=".28" transform="skewX(-18)"/>
      </svg>
    </div>
  );
};

export const PackOpening: React.FC<PackOpeningProps> = ({title, subtitle, website, primary, stencilFile}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame: frame - 280, fps, config: {damping: 15, stiffness: 115, mass: 0.9}});
  const tapOpacity = interpolate(frame, [40, 70, 190, 225], [0, 1, 1, 0], clamp);
  const flash = interpolate(frame, [252, 270, 305], [0, 1, 0], clamp);
  const cardOpacity = interpolate(frame, [275, 315], [0, 1], clamp);
  const cta = interpolate(frame, [475, 525], [0, 1], clamp);

  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #3d0c68 0%, #160020 48%, #050007 100%)', overflow: 'hidden', fontFamily: 'Arial, Helvetica, sans-serif'}}>
      <Particles />
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(169,76,255,.22), transparent 48%)', scale: interpolate(frame, [0, 600], [0.85, 1.12])}} />

      <div style={{position: 'absolute', top: 135, width: '100%', textAlign: 'center', color: '#fff', opacity: tapOpacity}}>
        <div style={{fontSize: 70, fontWeight: 950, letterSpacing: 4, textShadow: `0 0 28px ${primary}`}}>{subtitle}</div>
        <div style={{fontSize: 32, fontWeight: 800, marginTop: 24, color: '#dec4ff'}}>DOUBLE TAP TO OPEN</div>
        <div style={{width: 420, height: 88, borderRadius: 999, border: '3px solid #b975ff', margin: '32px auto 0', background: 'rgba(116,31,190,.38)', boxShadow: `0 0 ${20 + Math.sin(frame/8)*10}px ${primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 900}}>OPEN PACK</div>
      </div>

      <FoilPack primary={primary} />

      {[205, 225, 245].map((f, i) => {
        const p = interpolate(frame, [f, f + 22], [0, 1], clamp);
        return <div key={f} style={{position: 'absolute', left: 540, top: 1020, width: 180, height: 180, borderRadius: '50%', border: '7px solid #d8b5ff', opacity: (1-p) * .8, scale: .25 + p * 1.7, translate: '-50% -50%', boxShadow: `0 0 30px ${primary}`}}/>;
      })}

      <div style={{position: 'absolute', left: 540, top: 900, width: 850, height: 850, borderRadius: '50%', translate: '-50% -50%', scale: .25 + flash*1.55, opacity: flash, background: 'radial-gradient(circle, #fff 0%, #d7a5ff 20%, rgba(145,42,255,.6) 42%, transparent 70%)', filter: 'blur(12px)'}} />
      <Particles burst />

      <div style={{position: 'absolute', width: 760, height: 1030, left: 160, top: 330, opacity: cardOpacity, translate: `0 ${interpolate(reveal, [0, 1], [900, 0])}px`, scale: interpolate(reveal, [0, 1], [.72, 1]), rotate: `${interpolate(reveal, [0, 1], [-10, 0])}deg`, filter: `drop-shadow(0 0 55px ${primary})`}}>
        <div style={{position: 'absolute', inset: -25, borderRadius: 42, background: 'linear-gradient(135deg,#c68bff,#6d15bd,#fff,#8a2eff)'}} />
        <div style={{position: 'absolute', inset: -13, borderRadius: 34, background: '#f9f6ff'}} />
        <Img src={staticFile(stencilFile)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24}} />
      </div>

      <div style={{position: 'absolute', top: 1400, width: '100%', textAlign: 'center', opacity: interpolate(frame, [350, 400], [0, 1], clamp), color: '#fff'}}>
        <div style={{fontSize: 78, fontWeight: 950, letterSpacing: 6, textShadow: `0 0 28px ${primary}`}}>{title}</div>
        <div style={{fontSize: 32, fontWeight: 800, marginTop: 12, color: '#ddc4ff'}}>PRINT READY • HIGH RESOLUTION</div>
      </div>

      <div style={{position: 'absolute', left: 110, right: 110, bottom: 90, opacity: cta, textAlign: 'center'}}>
        <div style={{background: 'linear-gradient(135deg,#7b22da,#b45fff)', borderRadius: 999, padding: '28px 34px', color: '#fff', fontSize: 32, fontWeight: 950, boxShadow: `0 0 36px ${primary}`}}>DOWNLOAD TODAY&apos;S PACK</div>
        <div style={{color: '#d9c7e8', fontSize: 23, marginTop: 20}}>{website}</div>
      </div>
    </AbsoluteFill>
  );
};
