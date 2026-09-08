import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { CENTAURUS } from '../content/centaurus';
import { Reveal } from './ui/motion';
import { fadeUp } from './ui/variants';
import { Marquee } from './ui/Marquee';

const EMERALD = 0x34d399;
const SKY = 0x38bdf8;

/* ────────────────────────── Holographic core ────────────────────────── */

const Core: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x09090b, 0.0025);

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 2000);
        camera.position.set(0, 0, 6);

        const sphereGroup = new THREE.Group();
        scene.add(sphereGroup);

        const geo = new THREE.SphereGeometry(1.4, 64, 64);
        const innerMat = new THREE.MeshBasicMaterial({ color: EMERALD, transparent: true, opacity: 0.1 });
        const inner = new THREE.Mesh(geo, innerMat);
        inner.scale.set(0.98, 0.98, 0.98);
        sphereGroup.add(inner);

        const wireMat = new THREE.MeshBasicMaterial({ color: EMERALD, wireframe: true, transparent: true, opacity: 0.28 });
        const wire = new THREE.Mesh(geo, wireMat);
        sphereGroup.add(wire);

        const ringGeo = new THREE.RingGeometry(1.6, 1.63, 128);
        const ringMat = new THREE.MeshBasicMaterial({ color: SKY, transparent: true, opacity: 0.25, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI * 0.5;
        sphereGroup.add(ring);
        const ring2 = new THREE.Mesh(ringGeo, ringMat);
        ring2.rotation.x = Math.PI * 0.3;
        ring2.rotation.y = Math.PI * 0.4;
        sphereGroup.add(ring2);

        const particleCount = 200;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const r = 1.9 + Math.random() * 1.6;
            const theta = Math.random() * Math.PI * 2;
            const phi = (Math.random() - 0.5) * Math.PI * 0.5;
            positions[i * 3] = r * Math.cos(theta) * Math.cos(phi);
            positions[i * 3 + 1] = r * Math.sin(phi) * 0.4;
            positions[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
        }
        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({ size: 0.025, transparent: true, opacity: 0.9, color: EMERALD });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dir = new THREE.DirectionalLight(EMERALD, 0.8);
        dir.position.set(5, 5, 5);
        scene.add(dir);

        const resize = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', resize);

        const mouse = { x: 0, y: 0 };
        const onMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener('mousemove', onMove);

        let t = 0;
        let rafId = 0;
        const animate = () => {
            t += 0.01;
            sphereGroup.rotation.y = t * 0.35 + mouse.x * 0.08;
            sphereGroup.rotation.x = mouse.y * 0.1;
            wire.rotation.y += 0.003 + mouse.x * 0.002;
            ring.rotation.z += 0.004;
            ring2.rotation.z -= 0.003;
            particles.rotation.y += 0.0008 + mouse.x * 0.0005;
            const pulse = 1 + Math.sin(t * 1.2) * 0.01 + Math.abs(mouse.y) * 0.015;
            sphereGroup.scale.set(pulse, pulse, pulse);
            renderer.render(scene, camera);
            rafId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            geo.dispose();
            ringGeo.dispose();
            particleGeo.dispose();
            innerMat.dispose();
            wireMat.dispose();
            ringMat.dispose();
            particleMat.dispose();
            renderer.dispose();
            scene.clear();
        };
    }, []);

    return (
        <div className="panel relative h-[380px] overflow-hidden lg:h-[460px]">
            <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
            <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(52,211,153,0.06) 0%, transparent 65%)' }} />
            <canvas ref={canvasRef} className="relative h-full w-full" />
            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-emerald-400/20 bg-ink-900/80 px-3 py-1 font-mono text-[10px] text-emerald-400 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> ONLINE · V2
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-xl border border-white/[0.08] bg-ink-900/80 p-4 backdrop-blur">
                <p className="font-display text-sm font-semibold text-white">Centaurus Core</p>
                <p className="mt-1 font-mono text-[11px] text-zinc-500">answers from data · refuses to invent · every query audited</p>
            </div>
        </div>
    );
};

/* ────────────────────────── Page ────────────────────────── */

const CentaurusAI: React.FC = () => (
    <div className="relative">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 grid-bg pointer-events-none" />
            <div className="pointer-events-none absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.05] blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-sky-500/[0.04] blur-3xl" />

            <div className="container relative z-10 mx-auto px-4 pb-20 pt-16 lg:pt-24">
                <div className="grid items-center gap-14 lg:grid-cols-2">
                    <div className="space-y-7">
                        <motion.div {...fadeUp(0)}>
                            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1.5 font-mono text-xs text-emerald-300">
                                <Sparkles className="h-3.5 w-3.5" />
                                {CENTAURUS.badge}
                            </div>
                        </motion.div>
                        <motion.h1 {...fadeUp(0.1)} className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
                            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">Centaurus</span> AI
                        </motion.h1>
                        <motion.p {...fadeUp(0.2)} className="max-w-lg text-xl leading-relaxed text-zinc-300">{CENTAURUS.sub}</motion.p>
                        <motion.div {...fadeUp(0.25)} className="max-w-lg space-y-4 text-base leading-relaxed text-zinc-400">
                            {CENTAURUS.intro.map((p) => <p key={p}>{p}</p>)}
                        </motion.div>
                        <motion.div {...fadeUp(0.3)} className="flex flex-col gap-4 sm:flex-row">
                            <Link to="/contact"
                                className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-6 py-3.5 text-base font-semibold text-ink-950 shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:bg-emerald-300">
                                Talk about this
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <Link to="/fieldops"
                                className="inline-flex items-center justify-center rounded-xl border border-white/10 px-6 py-3.5 text-base font-semibold text-zinc-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]">
                                See the platform it lives in
                                <ArrowUpRight className="ml-2 h-4 w-4 text-emerald-400" />
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
                    >
                        <Core />
                    </motion.div>
                </div>
            </div>
        </section>

        <Marquee items={CENTAURUS.stack} />

        {/* ── Capabilities ── */}
        <section className="container mx-auto px-4 py-24">
            <Reveal className="mb-12 max-w-3xl">
                <span className="eyebrow">01 · What it does</span>
                <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">Six jobs inside the ERP</h2>
                <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                    Each one reads live data through the backend and leaves an audit trail. None of them send anything
                    to a customer or a crew without a human tapping approve.
                </p>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {CENTAURUS.capabilities.map((c, i) => {
                    const Icon = c.icon;
                    return (
                        <Reveal key={c.title} delay={(i % 3) * 0.08}>
                            <div className="panel panel-hover flex h-full flex-col p-6">
                                <div className="w-fit rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-2.5">
                                    <Icon className="h-5 w-5 text-emerald-400" />
                                </div>
                                <h3 className="mt-5 font-display text-base font-semibold text-white">{c.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{c.desc}</p>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </section>

        {/* ── Guardrails ── */}
        <section className="border-t border-white/[0.06] bg-white/[0.01]">
            <div className="container mx-auto px-4 py-24">
                <Reveal className="mb-12 max-w-3xl">
                    <span className="eyebrow">02 · Guardrails</span>
                    <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">Everything that stops it being confidently wrong</h2>
                    <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                        Each guard was added after a measured failure, and each is covered by a test that reproduces the failure first.
                    </p>
                </Reveal>
                <div className="space-y-4">
                    {CENTAURUS.guardrails.map((g, i) => (
                        <Reveal key={g.title} delay={i * 0.06}>
                            <div className="panel flex flex-col gap-4 p-6 transition-all duration-300 hover:border-amber-400/30 md:flex-row md:items-start">
                                <div className="flex shrink-0 items-center gap-3 md:w-56">
                                    <span className="font-mono text-xs text-amber-400/70">0{i + 1}</span>
                                    <h3 className="font-display text-base font-semibold text-white">{g.title}</h3>
                                </div>
                                <p className="flex-1 text-sm leading-relaxed text-zinc-400">{g.desc}</p>
                                {g.evidence && (
                                    <span className="shrink-0 rounded-md border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 font-mono text-[11px] text-emerald-400 md:ml-4">
                                        {g.evidence}
                                    </span>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>

        {/* ── Versions ── */}
        <section className="container mx-auto px-4 py-24">
            <Reveal className="mb-12 max-w-3xl">
                <span className="eyebrow">03 · Two deployments</span>
                <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">Same name, two very different jobs</h2>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-2">
                {CENTAURUS.versions.map((v, i) => (
                    <Reveal key={v.version} delay={i * 0.1}>
                        <div className="panel panel-hover h-full p-7">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">{v.version} · {v.year}</span>
                                {i === CENTAURUS.versions.length - 1 && (
                                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-400">current</span>
                                )}
                            </div>
                            <h3 className="mt-3 font-display text-xl font-semibold text-white">{v.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{v.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-white/[0.06]">
            <div className="container mx-auto px-4 py-24 text-center">
                <Reveal>
                    <p className="font-mono text-xs tracking-[0.25em] text-zinc-500">HUMAN + AI, BY DESIGN</p>
                    <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl">
                        Want an AI layer that <span className="text-emerald-400">earns</span> trust?
                    </h2>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link to="/contact"
                            className="inline-flex items-center rounded-xl bg-emerald-400 px-8 py-3.5 font-semibold text-ink-950 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-300">
                            Get in touch
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <Link to="/portfolio"
                            className="inline-flex items-center rounded-xl border border-white/10 px-8 py-3.5 font-semibold text-zinc-200 transition-all hover:border-white/20 hover:bg-white/[0.04]">
                            Read the case study
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    </div>
);

export default CentaurusAI;
