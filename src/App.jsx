import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import html2canvas from 'html2canvas'; 
import { 
  Fish, Zap, ShoppingCart, X, User, Smartphone, 
  Minus, Plus, Menu, Instagram, Twitter, ArrowUp, Star, 
  Search, ChevronDown, Bell, HelpCircle, Flame, Clock, 
  TicketPercent, Store, CheckCircle, DollarSign, Send, 
  Crown, Sparkles, Gem, ChevronLeft, ChevronRight,
  Music, Pause, Trophy, Gift, RefreshCw, MessageCircle,
  TrendingUp, Ghost, Crosshair, Sword, Scroll, Upload, 
  CreditCard, AlertCircle, Package, Camera, Download, Wallet,
  Skull, Calculator, Moon, Gamepad2 // <-- ICON BARU DITAMBAHKAN
} from 'lucide-react';
import { services, marketItems, paymentMethods, testimonials, stats, faqs, bundles, topSultans } from './data';

// --- KONFIGURASI ---
const ADMIN_WA = "628123456789"; 
const STORE_NAME = "FISH-IT PRO";
const ADMIN_STATUS = "ONLINE"; 

// --- DATA BLACK MARKET ---
const blackMarketItems = [
    { id: "bm1", name: "AKUN ADMIN (DEV)", price: 9999999, originalPrice: 15000000, image: "https://images.unsplash.com/photo-1614726365723-49cfae968b56?w=600&auto=format&fit=crop&q=60", desc: "Akses full server. Ilegal." },
    { id: "bm2", name: "GLITCHED ROD", price: 500000, originalPrice: 1000000, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60", desc: "Pancingan bug, auto legendary." }
];

// ================= KOMPONEN FITUR LAMA & BARU =================

// --- FITUR BARU: AFK SCREENSAVER (MODE TIDUR) ---
const AfkScreensaver = () => {
    const [isAfk, setIsAfk] = useState(false);
    const timerRef = useRef(null);

    const resetTimer = () => {
        setIsAfk(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setIsAfk(true), 30000); // 30 Detik AFK
    };

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'scroll', 'click'];
        events.forEach(e => window.addEventListener(e, resetTimer));
        resetTimer();
        return () => {
            events.forEach(e => window.removeEventListener(e, resetTimer));
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <AnimatePresence>
            {isAfk && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center text-center cursor-none"
                >
                    <div className="relative">
                        <Moon size={80} className="text-yellow-100 animate-pulse mx-auto mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"/>
                        <motion.div 
                            animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }} 
                            transition={{ repeat: Infinity, duration: 5 }}
                            className="absolute -top-10 -right-10"
                        >
                            <Fish size={40} className="text-cyan-500 opacity-50"/>
                        </motion.div>
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-[0.5em] mb-2">AFK MODE</h2>
                    <p className="text-slate-500 font-mono text-sm animate-bounce">Gerakkan mouse untuk bangun...</p>
                    
                    {/* Background Sound Effect Hint */}
                    <div className="absolute bottom-10 text-xs text-slate-700">Playing: Ocean Sounds 🎵</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- FITUR BARU: BOUNTY BOARD (WANTED) ---
const BountyBoard = ({ onClaim }) => {
    const bounties = [
        { id: 1, item: "Great White Shark", reward: 50000, deadline: "2 Jam" },
        { id: 2, item: "Aurora Totem x5", reward: 75000, deadline: "5 Jam" },
        { id: 3, item: "Megalodon", reward: 150000, deadline: "24 Jam" },
    ];

    return (
        <div className="bg-[#1a0b0b] border-2 border-red-900/50 rounded-xl p-6 relative overflow-hidden my-12 mx-4 max-w-4xl md:mx-auto">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900"></div>
            <div className="flex items-center gap-3 mb-6">
                <Skull size={32} className="text-red-500 animate-pulse"/>
                <h3 className="text-2xl font-black text-red-500 tracking-widest uppercase">WANTED: BOUNTY BOARD</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bounties.map((b) => (
                    <motion.div 
                        key={b.id} 
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        className="bg-[#2a1010] border border-red-800 p-4 rounded-lg relative group cursor-pointer"
                        onClick={() => onClaim(b)}
                    >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-black font-bold text-[10px] px-2 py-0.5 rounded shadow-lg">WANTED DEAD OR ALIVE</div>
                        <div className="text-center mt-2">
                            <h4 className="font-bold text-white text-lg">{b.item}</h4>
                            <p className="text-red-400 font-mono text-sm mt-1">Reward: Rp {b.reward.toLocaleString()}</p>
                            <p className="text-xs text-slate-500 mt-2">Sisa Waktu: {b.deadline}</p>
                        </div>
                        <div className="mt-4 bg-red-900/50 text-red-300 text-center py-2 rounded text-xs font-bold group-hover:bg-red-600 group-hover:text-black transition-colors">KLAIM BOUNTY</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// --- FITUR BARU: PROFIT CALCULATOR ---
const ProfitCalculator = () => {
    const [level, setLevel] = useState(1);
    const [hours, setHours] = useState(1);
    const [result, setResult] = useState(0);

    const calculate = () => {
        // Rumus ngawur simulasi: Level * 15000 * Jam
        setResult(level * 15000 * hours);
    };

    return (
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl max-w-sm mx-auto my-8">
            <h4 className="font-bold text-white flex items-center gap-2 mb-4"><Calculator className="text-cyan-400"/> KALKULATOR CUAN</h4>
            <div className="space-y-3">
                <div>
                    <label className="text-xs text-slate-400">Level Pancingan</label>
                    <input type="range" min="1" max="100" value={level} onChange={(e) => setLevel(e.target.value)} className="w-full accent-cyan-500"/>
                    <div className="text-right text-cyan-400 font-bold text-sm">Lvl {level}</div>
                </div>
                <div>
                    <label className="text-xs text-slate-400">Durasi Farming (Jam)</label>
                    <input type="number" min="1" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white text-sm outline-none"/>
                </div>
                <button onClick={calculate} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded-lg text-sm">HITUNG ESTIMASI</button>
                {result > 0 && (
                    <div className="bg-slate-900 p-3 rounded-lg border border-green-500/30 text-center animate-bounce">
                        <p className="text-xs text-slate-400">Estimasi Pendapatan:</p>
                        <p className="text-xl font-black text-green-400">{result.toLocaleString()} Money</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- FITUR BARU: REDEEM CODE HUNT (EASTER EGG) ---
const CodeHunt = () => {
    const foundCode = () => alert("🎉 SELAMAT! Kamu menemukan Kode Rahasia: 'SECRET50' (Diskon 50%)");
    return (
        <div 
            onClick={foundCode} 
            className="fixed bottom-2 left-1/2 -translate-x-1/2 text-[8px] text-slate-800 cursor-pointer hover:text-red-500 transition-colors z-50 select-none"
        >
            π
        </div>
    );
}

// 1. LIVE QUEUE SIMULATOR (JALAN SENDIRI)
const LiveQueue = () => {
    const [slots, setSlots] = useState([
        { id: 1, user: "Budi***", status: "FARMING", progress: 45, task: "Joki 5 Jam" },
        { id: 2, user: "Sultan***", status: "QUEUED", progress: 0, task: "Aurora Totem" },
        { id: 3, user: "-", status: "EMPTY", progress: 0, task: "Slot Kosong" },
        { id: 4, user: "Rara***", status: "FINISHING", progress: 92, task: "1M Money" },
    ]);
    useEffect(() => {
        const interval = setInterval(() => {
            setSlots(prev => prev.map(slot => {
                if (slot.status === "EMPTY") return slot; 
                let newProgress = slot.progress + Math.floor(Math.random() * 5); 
                if (newProgress >= 100) return { id: slot.id, user: "-", status: "EMPTY", progress: 0, task: "Slot Kosong" };
                return { ...slot, progress: newProgress };
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setSlots(prev => prev.map(slot => {
                if (slot.status === "EMPTY" && Math.random() > 0.6) { 
                    const randomUsers = ["Kevin123", "ProGamer", "FishLover", "TopGlobal", "User99"];
                    const randomTasks = ["Joki 24 Jam", "Secret Fish", "Push Rank", "Farming"];
                    return { ...slot, user: randomUsers[Math.floor(Math.random() * randomUsers.length)] + "***", status: "QUEUED", progress: 0, task: randomTasks[Math.floor(Math.random() * randomTasks.length)] };
                }
                if (slot.status === "QUEUED") return { ...slot, status: "FARMING", progress: 5 };
                return slot;
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="bg-[#0f172a] border-y border-white/5 py-6"><div className="max-w-6xl mx-auto px-4"><h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-widest"><User className="text-cyan-400 animate-pulse"/> Live Server Queue</h3><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{slots.map((slot) => (<div key={slot.id} className="bg-slate-900 border border-slate-700 p-3 rounded-lg flex flex-col gap-2"><div className="flex justify-between items-center"><span className="text-xs font-bold text-slate-400">SLOT #{slot.id}</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${slot.status === 'EMPTY' ? 'bg-green-900 text-green-400' : slot.status === 'FARMING' ? 'bg-blue-900 text-blue-400' : 'bg-yellow-900 text-yellow-400'}`}>{slot.status}</span></div><div className="flex justify-between items-center"><span className="text-white font-mono text-sm">{slot.user}</span><span className="text-xs text-slate-500">{slot.task}</span></div>{slot.status !== 'EMPTY' && (<div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${slot.progress}%` }} className="h-full bg-cyan-500"/></div>)}</div>))}</div></div></div>
    );
};

// 2. FAKE GLOBAL CHAT
const GlobalChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ user: "Admin", text: "Selamat datang di Fish-It Pro! 👋" }, { user: "Budi01", text: "Min, joki 5 jam ready?" }]);
    const chatEndRef = useRef(null);
    useEffect(() => {
        const fakeChats = [{ user: "Sultan_X", text: "Gila cepet banget jokinya!" }, { user: "Newbie123", text: "Amanah min, makasih ya" }, { user: "ProPlayer", text: "Next order lagi ah" }, { user: "FishHunter", text: "Ada stok Aurora Totem?" }, { user: "Admin", text: "Stok Aurora Ready, langsung CO aja!" }];
        const interval = setInterval(() => { const randomChat = fakeChats[Math.floor(Math.random() * fakeChats.length)]; setMessages(prev => [...prev.slice(-4), randomChat]); }, 6000); return () => clearInterval(interval);
    }, []);
    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
    return (
        <div className="fixed bottom-24 right-4 z-40 hidden lg:block"><AnimatePresence>{isOpen && (<motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="mb-4 bg-slate-900/90 backdrop-blur border border-white/10 w-72 rounded-2xl shadow-2xl overflow-hidden"><div className="bg-slate-800 p-3 border-b border-white/5 flex justify-between items-center"><span className="text-xs font-bold text-white flex items-center gap-2"><MessageCircle size={14} className="text-green-400"/> GLOBAL CHAT</span><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span></div><div className="h-48 overflow-y-auto p-3 space-y-3 scrollbar-hide">{messages.map((msg, i) => (<div key={i} className="text-xs"><span className={`font-bold ${msg.user === 'Admin' ? 'text-yellow-400' : 'text-cyan-400'}`}>{msg.user}: </span><span className="text-slate-300">{msg.text}</span></div>))}<div ref={chatEndRef} /></div><div className="p-2 border-t border-white/5"><input type="text" disabled placeholder="Login untuk chat..." className="w-full bg-black/20 text-white text-xs p-2 rounded cursor-not-allowed" /></div></motion.div>)}</AnimatePresence><button onClick={() => setIsOpen(!isOpen)} className="bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-full shadow-lg border border-slate-600 float-right relative"><MessageCircle size={24}/>{!isOpen && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></span>}</button></div>
    );
};

// ... KOMPONEN LAMA ...
const Particles = () => (<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">{[...Array(30)].map((_, i) => (<motion.div key={i} initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0 }} animate={{ y: "-10vh", opacity: [0, 0.8, 0] }} transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, delay: Math.random() * 5 }} className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-[1px] shadow-[0_0_5px_cyan]" />))}</div>);
const PetCompanion = () => { const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); useEffect(() => { const handleMouseMove = (event) => { setMousePos({ x: event.clientX, y: event.clientY }); }; window.addEventListener('mousemove', handleMouseMove); return () => window.removeEventListener('mousemove', handleMouseMove); }, []); return (<motion.div animate={{ x: mousePos.x + 20, y: mousePos.y + 20 }} transition={{ type: "spring", damping: 12, stiffness: 80 }} className="fixed top-0 left-0 z-[100] pointer-events-none hidden md:block"><div className="relative"><Fish size={32} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,1)] filter brightness-125" /></div></motion.div>); };
const UnboxingAnimation = ({ image }) => { const [step, setStep] = useState(0); useEffect(() => { setTimeout(() => setStep(1), 500); setTimeout(() => setStep(2), 2000); setTimeout(() => setStep(3), 2500); }, []); return (<div className="h-48 w-full flex items-center justify-center relative overflow-hidden rounded-xl bg-slate-950/50 border border-slate-800"><AnimatePresence mode='wait'>{step < 2 && (<motion.div key="box" initial={{ scale: 0 }} animate={step === 1 ? { scale: 1, rotate: [0, -5, 5, -5, 5, 0], transition: { repeat: Infinity, duration: 0.3 } } : { scale: 1 }} exit={{ scale: 2, opacity: 0 }}><Package size={80} className="text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]" strokeWidth={1} /></motion.div>)}{step === 2 && <motion.div key="flash" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 bg-white z-20" />}{step === 3 && (<motion.div key="item" initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", bounce: 0.5 }}><img src={image} className="w-32 h-32 object-cover rounded-xl shadow-[0_0_30px_cyan] border-2 border-cyan-400" /><motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.2} className="absolute -bottom-8 left-0 right-0 text-center font-bold text-cyan-400 text-sm">ITEM UNLOCKED!</motion.div></motion.div>)}</AnimatePresence></div>); };
const BgmPlayer = () => { const [isPlaying, setIsPlaying] = useState(false); const audioRef = useRef(null); const togglePlay = () => { if (isPlaying) audioRef.current.pause(); else audioRef.current.play(); setIsPlaying(!isPlaying); }; return (<div className="fixed bottom-24 right-4 z-40 hidden md:block"><audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3" /><button onClick={togglePlay} className={`p-3 rounded-full shadow-lg border border-cyan-500/50 backdrop-blur-md transition-all ${isPlaying ? 'bg-cyan-500 text-black animate-spin-slow' : 'bg-slate-900 text-white'}`}>{isPlaying ? <Pause size={20}/> : <Music size={20}/>}</button></div>); };
const GachaMachine = ({ onSpin }) => { const [spinning, setSpinning] = useState(false); const [result, setResult] = useState(null); const [canSpin, setCanSpin] = useState(true); useEffect(() => { const lastSpinDate = localStorage.getItem('fishit_gacha_date'); const today = new Date().toDateString(); if (lastSpinDate === today) { setCanSpin(false); setResult("KESEMPATAN HABIS!"); } }, []); const spinGacha = () => { if(spinning || !canSpin) return; setSpinning(true); setResult(null); onSpin(); setTimeout(() => { const chance = Math.random() * 100; let prize = chance < 0.5 ? "JACKPOT! ITEM GRATIS" : chance < 5 ? "DISKON 10% (HOKI10)" : chance < 20 ? "DISKON 5% (LUMAYAN5)" : "ZONK! COBA LAGI"; setResult(prize); setSpinning(false); setCanSpin(false); localStorage.setItem('fishit_gacha_date', new Date().toDateString()); }, 3000); }; return (<div className="bg-gradient-to-b from-purple-900 to-slate-900 p-6 rounded-2xl border border-purple-500/50 text-center relative overflow-hidden shadow-2xl h-full flex flex-col justify-between"><div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent'></div><h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2"><Gift className="text-purple-400"/> GACHA HOKI</h3><div className="h-24 flex items-center justify-center mb-6">{spinning ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.5 }}><RefreshCw size={48} className="text-purple-500"/></motion.div> : result ? <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={`text-lg font-bold ${result.includes("ZONK") || result.includes("HABIS") ? 'text-red-400' : 'text-green-400'}`}>{result}</motion.div> : <div className="text-4xl">❓</div>}</div><button onClick={spinGacha} disabled={spinning || !canSpin} className={`w-full font-bold py-3 rounded-xl shadow-lg transition-all ${!canSpin ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}>{spinning ? "MEMUTAR..." : !canSpin ? "TUNGGU BESOK" : "PUTAR (GRATIS)"}</button></div>); };
const MiniGameFish = () => { const [fishPos, setFishPos] = useState({ top: '20%' }); const [score, setScore] = useState(0); const [showFish, setShowFish] = useState(false); useEffect(() => { const interval = setInterval(() => { setShowFish(true); setFishPos({ top: Math.random() * 80 + '%' }); setTimeout(() => setShowFish(false), 4000); }, 15000); return () => clearInterval(interval); }, []); return (<><AnimatePresence>{showFish && (<motion.div initial={{ left: '-10%' }} animate={{ left: '110%' }} exit={{ opacity: 0 }} transition={{ duration: 4, ease: "linear" }} onClick={() => { setScore(s => s + 1); setShowFish(false); alert("🎣 TERTANGKAP! +1 Poin"); }} className="fixed z-[60] cursor-crosshair pointer-events-auto" style={{ top: fishPos.top }}><Fish size={64} className="text-yellow-400 animate-bounce drop-shadow-lg" /></motion.div>)}</AnimatePresence>{score > 0 && <div className="fixed top-24 left-4 z-40 bg-yellow-500/20 border border-yellow-500 text-yellow-400 px-3 py-1 rounded-lg font-bold flex gap-2"><Crosshair/> Skor: {score}</div>}</>); };
const StockMarketGraph = () => { const [prices, setPrices] = useState([50, 60, 45, 70, 65, 80, 75]); const [trend, setTrend] = useState('up'); useEffect(() => { const interval = setInterval(() => { setPrices(prev => { const newPrice = Math.floor(Math.random() * 50) + 40; const newArr = [...prev.slice(1), newPrice]; setTrend(newArr[6] > newArr[5] ? 'up' : 'down'); return newArr; }); }, 2000); return () => clearInterval(interval); }, []); return (<div className="bg-slate-900/50 border border-slate-700 p-4 rounded-xl mb-6 backdrop-blur-sm"><div className="flex justify-between items-center mb-4"><h4 className="font-bold text-white flex items-center gap-2"><TrendingUp className="text-cyan-400"/> BURSA HARGA</h4><span className={`text-xs font-bold px-2 py-1 rounded ${trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{trend === 'up' ? '+2.4% NAIK' : '-1.2% TURUN'}</span></div><div className="flex items-end gap-1 h-20">{prices.map((p, i) => (<motion.div key={i} initial={{ height: 0 }} animate={{ height: `${p}%` }} className={`flex-1 rounded-t-sm ${trend === 'up' ? 'bg-green-500' : 'bg-red-500'} opacity-80`} />))}</div></div>); };
const ClanSystem = () => { const [clan, setClan] = useState(null); useEffect(() => { const savedClan = localStorage.getItem('fishit_clan'); if(savedClan) setClan(savedClan); }, []); const joinClan = (team) => { setClan(team); localStorage.setItem('fishit_clan', team); }; return (<section className="py-10 border-t border-white/5 relative z-10"><div className="max-w-4xl mx-auto px-4 text-center"><h2 className="text-2xl font-bold text-white mb-6 flex justify-center items-center gap-2"><Sword/> CLAN BATTLE</h2>{!clan ? (<div className="grid grid-cols-2 gap-4"><button onClick={() => joinClan('hiu')} className="bg-blue-900/50 border border-blue-500 p-6 rounded-xl hover:bg-blue-800 transition-all"><h3 className="text-2xl font-black text-blue-400">#TEAM HIU</h3></button><button onClick={() => joinClan('paus')} className="bg-purple-900/50 border border-purple-500 p-6 rounded-xl hover:bg-purple-800 transition-all"><h3 className="text-2xl font-black text-purple-400">#TEAM PAUS</h3></button></div>) : (<div className="bg-slate-800 p-6 rounded-xl border border-slate-700"><p className="text-slate-300 mb-4">Kamu anggota <span className={`font-bold ${clan === 'hiu' ? 'text-blue-400' : 'text-purple-400'}`}>#TEAM {clan.toUpperCase()}</span></p><div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden flex"><div style={{ width: '52%' }} className="bg-blue-500 h-full"></div><div style={{ width: '48%' }} className="bg-purple-500 h-full"></div></div></div>)}</div></section>); };
const DailyQuest = ({ quests }) => { const [isOpen, setIsOpen] = useState(false); const allDone = quests.every(q => q.done); return (<div className="fixed bottom-24 left-4 z-40"><AnimatePresence>{isOpen && (<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="mb-2 bg-slate-900 border border-cyan-500/50 p-4 rounded-xl shadow-2xl w-64"><h4 className="font-bold text-white mb-2 flex items-center gap-2"><Scroll size={16}/> MISI HARIAN</h4><ul className="space-y-2 text-xs text-slate-300">{quests.map(q => (<li key={q.id} className="flex items-center gap-2">{q.done ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3 h-3 rounded-full border border-slate-500"></div>}<span className={q.done ? "line-through text-slate-500" : ""}>{q.text}</span></li>))}</ul>{allDone && <div className="mt-3 bg-green-500/20 text-green-400 text-center py-1 rounded font-bold text-xs animate-pulse">KODE: QUESTDONE (5%)</div>}</motion.div>)}</AnimatePresence><button onClick={() => setIsOpen(!isOpen)} className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-full shadow-lg border border-cyan-400 relative"><Scroll size={24}/>{allDone && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>}</button></div>); };
const InfiniteTestimonials = () => (<div className="relative w-full overflow-hidden py-10 bg-slate-900/30"><div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0b1120] to-transparent z-10"></div><div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0b1120] to-transparent z-10"></div><div className="flex w-max"><motion.div className="flex gap-6 px-6" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 20 }}>{[...testimonials, ...testimonials].map((testi, i) => (<div key={i} className="w-[300px] shrink-0 bg-[#161f32] p-6 rounded-2xl border border-slate-700/50 shadow-xl relative"><div className="flex gap-0.5 text-yellow-400 mb-4">{[...Array(5)].map((_,s)=><Star key={s} size={12} fill={s<testi.rating?"currentColor":"none"}/>)}</div><p className="text-slate-300 italic text-sm mb-4 line-clamp-3">"{testi.comment}"</p><div className="flex items-center gap-3 border-t border-slate-700 pt-4"><div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white">{testi.name[0]}</div><div><h4 className="font-bold text-white text-sm">{testi.name}</h4><p className="text-xs text-cyan-400">{testi.role}</p></div></div></div>))}</motion.div></div></div>);
const HallOfFame = () => (<div className="bg-gradient-to-b from-yellow-900/40 to-slate-900 p-6 rounded-2xl border border-yellow-500/30 h-full"><h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2"><Trophy/> TOP SULTAN</h3><div className="space-y-3">{topSultans.map((sultan, i) => (<div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${i===0 ? 'bg-yellow-500/20 border-yellow-500' : 'bg-slate-800 border-slate-700'}`}><span className="font-bold text-white">{i+1}. {sultan.name}</span><span className="text-xs font-mono text-green-400">{sultan.spent}</span></div>))}</div></div>);
const VipMembership = () => { const handleJoinVip = () => window.open(`https://wa.me/${ADMIN_WA}?text=Info VIP`, '_blank'); return (<section className="py-12 px-4 max-w-4xl mx-auto"><motion.div whileHover={{ scale: 1.02 }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700 p-1 shadow-[0_0_40px_rgba(234,179,8,0.3)]"><div className="bg-[#0f0a00] rounded-[22px] p-8 md:p-12 relative overflow-hidden h-full flex flex-col md:flex-row items-center gap-8"><div className="flex-1 text-center md:text-left z-10"><div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 px-3 py-1 rounded-full text-yellow-400 text-xs font-bold mb-4"><Crown size={14} fill="currentColor"/> PREMIUM ACCESS</div><h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 mb-4">JOIN VIP MEMBER</h2><ul className="space-y-2 mb-8 text-sm text-yellow-200/80"><li className="flex items-center gap-2"><CheckCircle size={16} className="text-yellow-500"/> Prioritas Joki</li><li className="flex items-center gap-2"><CheckCircle size={16} className="text-yellow-500"/> Diskon 20% All Item</li></ul><button onClick={handleJoinVip} className="bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 text-black font-bold py-3 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 mx-auto md:mx-0"><Gem size={18} /> GABUNG SEKARANG</button></div></div></motion.div></section>) };
const FloatingChat = () => (<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => window.open(`https://wa.me/${ADMIN_WA}`, '_blank')} className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] flex items-center justify-center group"><MessageCircle size={28} /><span className="absolute -top-1 -right-1 flex h-4 w-4"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] items-center justify-center font-bold">1</span></span></motion.button>);
const LiveNotification = () => { const [visible, setVisible] = useState(false); const [data, setData] = useState({ name: '', item: '' }); const names = ["Budi", "Faiz", "Sultan01", "Rara", "KingFish"]; const items = ["Paket Harian", "Secret Fish", "1 Juta Money", "Aurora Totem"]; useEffect(() => { const interval = setInterval(() => { setData({ name: names[Math.floor(Math.random()*names.length)], item: items[Math.floor(Math.random()*items.length)] }); setVisible(true); setTimeout(() => setVisible(false), 4000); }, 15000); return () => clearInterval(interval); }, []); return (<AnimatePresence>{visible && (<motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className="fixed top-24 right-4 z-50 bg-slate-800/90 backdrop-blur border border-cyan-500/30 p-3 rounded-xl shadow-lg flex items-center gap-3 w-64"><div className="bg-green-500/20 p-2 rounded-full"><Bell size={16} className="text-green-400" /></div><div><p className="text-xs text-slate-400">Baru saja membeli</p><p className="text-sm font-bold text-white"><span className="text-cyan-400">{data.name}</span> - {data.item}</p></div></motion.div>)}</AnimatePresence>); };
const FlashSaleCountdown = () => { const [timeLeft, setTimeLeft] = useState({ h: 2, m: 59, s: 0 }); useEffect(() => { const timer = setInterval(() => { setTimeLeft(prev => { if (prev.s > 0) return { ...prev, s: prev.s - 1 }; if (prev.m > 0) return { h: prev.h, m: prev.m - 1, s: 59 }; if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 }; return { h: 2, m: 59, s: 59 }; }); }, 1000); return () => clearInterval(timer); }, []); return <div className="flex gap-2 items-center text-white font-mono font-bold bg-red-600/20 px-3 py-1 rounded-lg border border-red-500/50"><Clock size={16} className="text-red-500 animate-pulse"/><span>{String(timeLeft.h).padStart(2,'0')}:{String(timeLeft.m).padStart(2,'0')}:{String(timeLeft.s).padStart(2,'0')}</span></div>; };

// ================= APP UTAMA =================

export default function App() {
  const [activeTab, setActiveTab] = useState('joki');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false); 
  const [isCardModalOpen, setIsCardModalOpen] = useState(false); 
  const [hackerMode, setHackerMode] = useState(false);
  const [hackerClickCount, setHackerClickCount] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // STATE FLEXING CARD
  const cardRef = useRef(null);
  const [cardName, setCardName] = useState('');
  const [cardSpend, setCardSpend] = useState('');

  const [quests, setQuests] = useState([
    { id: 1, text: "Scroll sampai bawah", done: false },
    { id: 2, text: "Cek Fitur Market", done: false },
    { id: 3, text: "Coba Fitur Gacha", done: false }
  ]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
        if (latest > 0.9 && !quests[0].done) setQuests(prev => prev.map(q => q.id === 1 ? { ...q, done: true } : q));
    });
  }, [scrollYProgress]);

  const [formData, setFormData] = useState({ username: '', phone: '', qty: 1, payment: null, note: '' });
  const [sellFormData, setSellFormData] = useState({ itemName: '', price: '', username: '', note: '', rarity: 'Common', paymentMethod: '', accName: '', screenshot: null });
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const currentItems = activeTab === 'joki' ? services : marketItems;
  const displayItems = hackerMode && activeTab === 'market' ? [...currentItems, ...blackMarketItems] : currentItems;
  const filteredData = displayItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const flashSaleItems = [...services, ...marketItems].filter(item => item.flashSale);

  const basePrice = (selectedItem?.price || 0) * formData.qty;
  const finalPrice = basePrice - discount;

  const handleLogoClick = () => {
      setHackerClickCount(prev => prev + 1);
      if (hackerClickCount + 1 >= 5) {
          setHackerMode(!hackerMode); setHackerClickCount(0);
          alert(hackerMode ? "Exiting Black Market..." : "⚠️ WELCOME TO BLACK MARKET ⚠️");
      }
  };

  const handleDownloadCard = async () => {
      if(!cardName || !cardSpend) return alert("Isi nama & nominal dulu!");
      const canvas = await html2canvas(cardRef.current, { backgroundColor: null });
      const data = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = data;
      link.download = `Sultan_Card_${cardName}.jpg`;
      link.click();
  };

  useEffect(() => { if(selectedItem) { setFormData(prev => ({ ...prev, qty: 1 })); setDiscount(0); setPromoCode(''); } }, [selectedItem]);
  useEffect(() => { const handleScroll = () => setShowScrollTop(window.scrollY > 300); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);

  const handleApplyPromo = () => { if (['FISHIT10', 'QUESTDONE'].includes(promoCode.toUpperCase())) { setDiscount(basePrice * 0.1); alert("✅ Kode Berhasil!"); } else { alert("❌ Kode Salah"); } };
  const handleCheckout = () => { if (!formData.username || !formData.payment) return alert("Lengkapi data!"); const msg = `⚡ ORDER ${hackerMode ? 'BLACK MARKET' : ''} ⚡\n📦 ITEM: ${selectedItem.name}\n💰 TOTAL: Rp ${finalPrice.toLocaleString('id-ID')}`; window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(msg)}`, '_blank'); };
  const handleSellSubmit = () => { if (!sellFormData.itemName || !sellFormData.price || !sellFormData.paymentMethod) return alert("Lengkapi data formulir!"); const msg = `💰 JUAL ITEM 💰\n📦 ${sellFormData.itemName}\n💸 Rp ${sellFormData.price}\n👤 ${sellFormData.username}`; window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(msg)}`, '_blank'); };
  const handleClaimBounty = (item) => { const msg = `🏴‍☠️ KLAIM BOUNTY 🏴‍☠️\n🎯 Target: ${item.item}\n💰 Reward: Rp ${item.reward.toLocaleString()}\n👤 Username saya: `; window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(msg)}`, '_blank'); };
  const scrollToSection = (id) => { setIsMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <div className={`min-h-screen font-sans relative overflow-x-hidden ${hackerMode ? 'bg-black text-red-500 font-mono selection:bg-red-500 selection:text-black' : 'bg-[#0b1120] text-slate-200 selection:bg-cyan-500 selection:text-black'}`}>
      
      <motion.div className={`fixed top-0 left-0 right-0 h-1 origin-left z-[60] ${hackerMode ? 'bg-red-600' : 'bg-cyan-500'}`} style={{ scaleX }} />
      <Particles /> <PetCompanion /> <MiniGameFish /> 
      <AfkScreensaver /> <CodeHunt /> {/* FITUR BARU */}
      <DailyQuest quests={quests} />
      <BgmPlayer /> <FloatingChat /> <LiveNotification />
      <GlobalChat /> <LiveQueue />

      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${hackerMode ? 'bg-black/90 border-red-600' : 'bg-[#0b1120]/60 border-white/5 shadow-lg'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={handleLogoClick}>
            <div className={`p-2 rounded-lg border ${hackerMode ? 'bg-red-900 border-red-500' : 'bg-cyan-500/20 border-cyan-500/50'}`}>{hackerMode ? <Ghost size={24} className="text-red-500"/> : <Fish size={24} className="text-cyan-400" />}</div>
            <div className="flex flex-col"><span className={`font-black text-lg tracking-widest ${hackerMode ? 'text-red-500' : 'text-white'}`}>{STORE_NAME}</span>{!hackerMode && <span className="text-[10px] font-bold flex items-center gap-1 mt-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span className="text-green-400">ADMIN ONLINE</span></span>}</div>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-bold items-center">
            <button onClick={() => scrollToSection('home')}>HOME</button>
            <button onClick={() => {scrollToSection('services'); setQuests(p=>p.map(q=>q.id===2?{...q,done:true}:q))}}>MARKET</button>
            <button onClick={() => {scrollToSection('vip'); setQuests(p=>p.map(q=>q.id===3?{...q,done:true}:q))}} className="text-yellow-500 flex items-center gap-1"><Crown size={14}/> VIP</button>
            <button onClick={() => setIsCardModalOpen(true)} className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black px-3 py-1.5 rounded-lg flex items-center gap-1 hover:scale-105 transition-transform"><CreditCard size={14}/> SULTAN CARD</button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      <section id="home" className="pt-40 pb-20 px-4 text-center relative z-10">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, type: "spring" }}>
          <span className={`px-4 py-2 rounded-full text-xs font-bold mb-6 inline-block flex items-center justify-center gap-2 w-fit mx-auto backdrop-blur-md ${hackerMode ? 'bg-red-900/50 text-red-200 border-red-500' : 'bg-cyan-900/30 text-cyan-300 border-cyan-500/30 border'}`}>{hackerMode ? "⚠️ SYSTEM BREACH DETECTED" : <><Sparkles size={14}/> #1 JOKI ROBLOX TERPERCAYA</>}</span>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight text-white tracking-tight drop-shadow-2xl">DOMINATE <br/><span className={`text-transparent bg-clip-text bg-gradient-to-r ${hackerMode ? 'from-red-500 to-red-900' : 'from-cyan-400 via-blue-500 to-purple-600'}`}>THE OCEAN.</span></h1>
          <div className="flex justify-center gap-4"><button onClick={() => scrollToSection('services')} className={`font-bold py-4 px-10 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-1 ${hackerMode ? 'bg-red-600 text-black hover:bg-red-500' : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'}`}>BELANJA SEKARANG</button></div>
        </motion.div>
      </section>

      {/* BOUNTY BOARD & PROFIT CALC */}
      <section className="py-10 px-4 max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row gap-8">
          <div className="flex-1"><BountyBoard onClaim={handleClaimBounty} /></div>
          <div className="md:w-1/3"><ProfitCalculator /></div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto relative z-10">
        <div className="flex justify-center mb-10"><div className={`p-1.5 rounded-full flex shadow-2xl border ${hackerMode ? 'bg-red-900/20 border-red-600' : 'bg-slate-800/60 border-white/10 backdrop-blur-xl'}`}>{['joki', 'market'].map((tab) => (<button key={tab} onClick={() => { setActiveTab(tab); setSelectedItem(null); setSearchTerm(''); }} className={`px-8 py-3 rounded-full font-bold transition-all relative ${activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-white'}`}>{activeTab === tab && <motion.div layoutId="tabBg" className={`absolute inset-0 rounded-full z-[-1] ${hackerMode ? 'bg-red-600' : 'bg-gradient-to-r from-cyan-600 to-blue-600'}`} />}<span className="flex items-center justify-center gap-2 uppercase tracking-wider text-sm">{tab}</span></button>))}</div></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"><GachaMachine onSpin={() => setQuests(p=>p.map(q=>q.id===3?{...q,done:true}:q))} /><HallOfFame /></div>
        {!hackerMode && activeTab === 'market' && <StockMarketGraph />}

        {activeTab === 'market' && !hackerMode && (<div className="flex justify-center mb-12"><button onClick={() => setIsSellModalOpen(true)} className="bg-slate-800/80 hover:bg-slate-700 text-white border border-green-500/50 font-bold py-3 px-8 rounded-xl shadow-lg flex items-center gap-3 transition-all group"><div className="bg-green-500 p-2 rounded-lg text-black group-hover:rotate-12 transition-transform"><DollarSign size={20} strokeWidth={3}/></div><div className="text-left"><p className="text-[10px] text-slate-400 uppercase tracking-widest">Punya Item Nganggur?</p><p className="text-green-400">JUAL KE ADMIN</p></div></button></div>)}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredData.map((item) => (
                <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -10 }} onClick={() => { setSelectedItem(item); setFormData(prev => ({...prev, payment: null})); }} className={`relative rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 ${hackerMode ? 'bg-black border-2 border-red-600' : 'bg-[#161f32] border border-white/5 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]'}`}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent z-10 transition-opacity pointer-events-none mix-blend-overlay"></div>
                  <div className="h-56 overflow-hidden relative"><img src={item.image} alt={item.name} className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${hackerMode && 'grayscale contrast-125'}`} /><div className="absolute inset-0 bg-gradient-to-t from-[#161f32] via-transparent to-transparent"></div>{item.flashSale && <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-pulse shadow-lg flex gap-1 items-center"><Flame size={10}/> HOT</div>}</div>
                  <div className="p-6 relative z-20 -mt-12"><div className="bg-[#161f32]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl"><h3 className={`font-bold text-lg truncate mb-1 ${hackerMode ? 'text-red-500' : 'text-white'}`}>{item.name}</h3><p className="text-xs text-slate-400 mb-4 line-clamp-1">{item.description}</p><div className="flex justify-between items-end"><div>{item.flashSale && <span className="block text-xs text-slate-500 line-through">Rp {item.originalPrice || (item.price*1.2).toLocaleString('id-ID')}</span>}<span className={`font-black text-2xl ${hackerMode ? 'text-red-400' : 'text-cyan-400'}`}>Rp {item.price.toLocaleString('id-ID')}</span></div><button className={`p-3 rounded-xl text-white transition-all transform group-hover:rotate-12 ${hackerMode ? 'bg-red-800' : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30'}`}><ShoppingCart size={20}/></button></div></div></div>
                </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {!hackerMode && <section id="vip" className="relative z-10"><VipMembership /></section>}
      <section className="py-20 border-t border-white/5 relative z-10 bg-gradient-to-b from-[#0b1120] to-[#0f172a]"><div className="text-center mb-10"><h2 className="text-3xl font-bold text-white mb-2">TESTIMONI SULTAN</h2></div><InfiniteTestimonials /></section>
      <section id="faq" className="py-20 bg-slate-900/50 border-t border-white/5 relative z-10"><div className="max-w-3xl mx-auto px-4"><h2 className="text-3xl font-bold text-center text-white mb-8">FAQ</h2><div className="space-y-4">{faqs.map((item, idx) => (<div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden"><button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex justify-between items-center p-4 text-left font-bold text-slate-200 hover:bg-slate-700/50 transition-colors"><span className="flex gap-3"><HelpCircle size={20} className="text-cyan-500"/> {item.q}</span><ChevronDown className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} /></button><AnimatePresence>{openFaq === idx && (<motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden"><div className="p-4 pt-0 text-slate-400 text-sm border-t border-slate-700/50">{item.a}</div></motion.div>)}</AnimatePresence></div>))}</div></div></section>
      <footer className="bg-[#050911] pt-10 pb-8 border-t border-white/10 text-sm relative z-10 text-center text-slate-600">&copy; 2024 {STORE_NAME}. All rights reserved.</footer>
      <AnimatePresence>{showScrollTop && (<motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-40 bg-cyan-500 hover:bg-cyan-400 text-black p-3 rounded-xl shadow-lg"><ArrowUp size={24} /></motion.button>)}</AnimatePresence>

      {/* --- MODAL 1: CHECKOUT --- */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedItem(null)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className={`fixed bottom-0 left-0 right-0 z-[60] rounded-t-[2.5rem] border-t max-w-xl mx-auto max-h-[90vh] overflow-y-auto ${hackerMode ? 'bg-black border-red-600 text-red-500' : 'bg-[#0f172a] border-cyan-500/30 text-white'}`}>
              <div className={`sticky top-0 backdrop-blur-xl p-6 border-b z-10 flex justify-between items-center ${hackerMode ? 'bg-red-900/20 border-red-600' : 'bg-[#0f172a]/90 border-white/5'}`}>
                <h3 className="font-bold text-xl">Checkout</h3>
                <button onClick={() => setSelectedItem(null)} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><X size={20}/></button>
              </div>
              <div className="p-6 space-y-6">
                 <UnboxingAnimation image={selectedItem.image} />
                 <div className="flex justify-between items-center"><div><h2 className="text-2xl font-bold">{selectedItem.name}</h2><p className="text-sm text-slate-400">Seller: {selectedItem.seller_name || 'Admin'}</p></div><div className="text-right"><p className="text-xs text-slate-500">Harga</p><p className="font-bold text-cyan-400">Rp {selectedItem.price.toLocaleString()}</p></div></div>
                 <div className={`border rounded-xl p-1 flex gap-2 ${hackerMode ? 'border-red-600 bg-red-900/20' : 'bg-black/20 border-white/10'}`}><div className='flex items-center pl-3 text-slate-400'><TicketPercent size={20} /></div><input type="text" placeholder="KODE PROMO" className="bg-transparent flex-1 outline-none text-sm text-white placeholder:text-slate-500 uppercase py-3" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} /><button onClick={handleApplyPromo} className={`text-xs font-bold px-4 rounded-lg transition-colors m-1 ${hackerMode ? 'bg-red-700 text-white' : 'bg-slate-700 hover:bg-cyan-600 text-white'}`}>PAKAI</button></div>
                 <div className="space-y-4"><div className="grid grid-cols-2 gap-4"><div className="space-y-1"><label className="text-xs font-bold text-slate-500 ml-1">USERNAME</label><input type="text" className={`w-full bg-white/5 border rounded-xl py-3 px-4 outline-none ${hackerMode ? 'border-red-600 text-red-500' : 'border-white/10 focus:border-cyan-500'}`} value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} /></div><div className="space-y-1"><label className="text-xs font-bold text-slate-500 ml-1">WHATSAPP</label><input type="number" className={`w-full bg-white/5 border rounded-xl py-3 px-4 outline-none ${hackerMode ? 'border-red-600 text-red-500' : 'border-white/10 focus:border-cyan-500'}`} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div></div></div>
                 <div className="grid grid-cols-2 gap-3">{paymentMethods.map(pm => (<button key={pm.id} onClick={() => setFormData({...formData, payment: pm})} className={`p-4 rounded-xl border text-sm font-bold flex items-center gap-3 transition-all ${formData.payment?.id === pm.id ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}><div className={`w-3 h-3 rounded-full ${formData.payment?.id === pm.id ? 'bg-cyan-400' : 'bg-slate-600'}`}/> {pm.name}</button>))}</div>
                 <div className='border-t border-white/10 pt-4 space-y-2'>{discount > 0 && <div className='flex justify-between text-green-400 text-sm'><span>Diskon Voucher</span><span>-Rp {discount.toLocaleString()}</span></div>}<div className='flex justify-between text-2xl font-black'><span>Total</span><span>Rp {finalPrice.toLocaleString('id-ID')}</span></div></div>
                 <button onClick={handleCheckout} className={`w-full font-bold py-4 rounded-xl shadow-lg flex justify-center gap-2 ${hackerMode ? 'bg-red-600 text-black hover:bg-red-500' : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white'}`}>PROSES PEMBAYARAN</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    
      {/* --- MODAL 2: JUAL ITEM (PRO) --- */}
      <AnimatePresence>
        {isSellModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSellModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="fixed bottom-0 left-0 right-0 z-[60] bg-[#0f172a] rounded-t-[2rem] border-t border-green-500/30 max-w-xl mx-auto max-h-[90vh] overflow-y-auto text-white">
                <div className="sticky top-0 bg-[#0f172a]/95 backdrop-blur p-6 border-b border-white/5 z-10 flex justify-between items-center"><h3 className="font-bold text-xl text-green-400">Jual Item ke Admin</h3><button onClick={() => setIsSellModalOpen(false)} className="p-2 bg-white/5 rounded-full"><X size={20}/></button></div>
                <div className="p-6 space-y-6">
                    <div className="flex p-4 bg-green-900/20 border border-green-500/20 rounded-xl gap-3"><AlertCircle className="text-green-400 shrink-0"/><p className="text-xs text-green-100 leading-relaxed">Admin akan memverifikasi item in-game sebelum transfer dana. Pastikan stok ready!</p></div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4"><div><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Nama Item</label><input type="text" placeholder="Cth: Aurora Totem" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 mt-1 outline-none focus:border-green-500" value={sellFormData.itemName} onChange={e => setSellFormData({...sellFormData, itemName: e.target.value})} /></div><div><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Rarity</label><select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 mt-1 outline-none focus:border-green-500 text-slate-300" value={sellFormData.rarity} onChange={e => setSellFormData({...sellFormData, rarity: e.target.value})}><option>Common</option><option>Rare</option><option>Legendary</option><option>Secret</option></select></div></div>
                        <div><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Harga Tawaran (Rp)</label><input type="number" placeholder="50000" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 mt-1 outline-none focus:border-green-500 font-mono font-bold text-green-400" value={sellFormData.price} onChange={e => setSellFormData({...sellFormData, price: e.target.value})} /></div>
                        <div className="grid grid-cols-2 gap-4"><div><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Username Roblox</label><input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 mt-1 outline-none focus:border-green-500" value={sellFormData.username} onChange={e => setSellFormData({...sellFormData, username: e.target.value})} /></div><div><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Bank / E-Wallet</label><select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 mt-1 outline-none focus:border-green-500 text-slate-300"><option>DANA</option><option>GOPAY</option><option>BCA</option></select></div></div>
                        <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center cursor-pointer hover:bg-white/5 transition-colors group"><Upload className="mx-auto text-slate-500 mb-2 group-hover:text-green-400 transition-colors"/><p className="text-xs text-slate-400">Upload Screenshot Bukti Item (Opsional)</p></div>
                    </div>
                    <button onClick={handleSellSubmit} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/50 flex justify-center gap-2 mt-4"><Send size={20} /> KIRIM PENAWARAN (WA)</button>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- MODAL 3: SULTAN CARD GENERATOR (NEW FEATURE) --- */}
      <AnimatePresence>
        {isCardModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCardModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
                <div className="bg-[#0f172a] border border-yellow-500/30 p-6 rounded-3xl w-full max-w-sm pointer-events-auto relative">
                    <button onClick={() => setIsCardModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={20}/></button>
                    <h3 className="text-xl font-bold text-white mb-6 text-center">BUAT KARTU SULTAN</h3>
                    
                    <div ref={cardRef} className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden aspect-[1.6/1] flex flex-col justify-between mb-6">
                        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="flex justify-between items-start z-10">
                            <Fish size={32} className="text-white drop-shadow-md"/>
                            <span className="font-bold text-white tracking-widest italic opacity-80">OFFICIAL MEMBER</span>
                        </div>
                        <div className="z-10">
                            <p className="text-yellow-200 text-xs uppercase tracking-widest mb-1">Total Topup</p>
                            <h2 className="text-3xl font-black text-white drop-shadow-md">Rp {cardSpend || "0"}</h2>
                        </div>
                        <div className="flex justify-between items-end z-10">
                            <div>
                                <p className="text-yellow-200 text-[10px] uppercase">Username</p>
                                <p className="font-bold text-white text-lg tracking-wide uppercase">{cardName || "YOUR NAME"}</p>
                            </div>
                            <div className="text-right">
                                <Crown size={24} className="text-white mb-1 ml-auto"/>
                                <p className="text-[8px] text-white">FISH-IT PRO VERIFIED</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <input type="text" placeholder="Nama Kamu" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-yellow-500" value={cardName} onChange={e => setCardName(e.target.value)} />
                        <input type="text" placeholder="Total Topup (Rp)" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-yellow-500" value={cardSpend} onChange={e => setCardSpend(e.target.value)} />
                    </div>
                    <button onClick={handleDownloadCard} className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2"><Download size={18}/> SIMPAN GAMBAR (JPG)</button>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}