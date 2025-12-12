// src/data.js

export const services = [
  {
    id: "joki-jam",
    name: "Joki Per Jam (Grind)",
    description: "Full farming fish/money manual/macro aman.",
    price: 5000,
    originalPrice: 10000,
    flashSale: true,
    unit: "/ Jam",
    seller_name: "OFFICIAL ADMIN",
    seller_verified: true,
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "joki-hari",
    name: "Paket Harian (24 Jam)",
    description: "Push rank level & money nonstop.",
    price: 100000,
    flashSale: false,
    unit: "/ Hari",
    bestSeller: true,
    seller_name: "OFFICIAL ADMIN",
    seller_verified: true,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "joki-minggu",
    name: "Paket Sultan (1 Minggu)",
    description: "Jaminan akun dewa, full items & money.",
    price: 600000,
    flashSale: false,
    unit: "/ Minggu",
    seller_name: "OFFICIAL ADMIN",
    seller_verified: true,
    image: "https://images.unsplash.com/photo-1609873963531-5da89f701564?w=600&auto=format&fit=crop&q=60"
  },
];

export const marketItems = [
  {
    id: "item-secret",
    name: "Secret Fish / Item",
    description: "Stok terbatas, siapa cepat dia dapat.",
    price: 45000,
    flashSale: false,
    unit: "/ Item",
    rarity: "Secret",
    seller_name: "Rizky_G***",
    seller_verified: false,
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "item-aurora",
    name: "Aurora Totem",
    description: "Item wajib buat hunting malam.",
    price: 9000, 
    originalPrice: 15000,
    flashSale: true, 
    unit: "/ Pcs",
    rarity: "Rare",
    seller_name: "Dimas_P***",
    seller_verified: true,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "item-money",
    name: "1 Juta In-Game Money",
    description: "Suntik dana instan via Trade.",
    price: 20000,
    flashSale: false,
    unit: "/ 1M",
    rarity: "Common",
    seller_name: "OFFICIAL ADMIN",
    seller_verified: true,
    image: "https://images.unsplash.com/photo-1609944206655-21010a873f2d?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "item-rod",
    name: "Golden Rod Max",
    description: "Pancingan level max, enak buat farming.",
    price: 150000,
    flashSale: false,
    unit: "/ Item",
    rarity: "Legendary",
    seller_name: "Wahyu_S***",
    seller_verified: false,
    image: "https://images.unsplash.com/photo-1544256277-28d82729a28f?w=600&auto=format&fit=crop&q=60"
  }
];

export const bundles = [
    {
        id: "bundle-starter",
        name: "Starter Pack",
        description: "Joki 5 Jam + 1 Aurora Totem. Hemat banget!",
        price: 30000,
        originalPrice: 40000,
        unit: "/ Paket",
        image: "https://images.unsplash.com/photo-1513553404607-988bf2703777?w=600&auto=format&fit=crop&q=60"
    },
    {
        id: "bundle-pro",
        name: "Pro Fisher Pack",
        description: "1 Juta Money + 3 Aurora Totem + Joki 3 Jam.",
        price: 60000,
        originalPrice: 85000,
        unit: "/ Paket",
        image: "https://images.unsplash.com/photo-1544979590-37e9b47eb705?w=600&auto=format&fit=crop&q=60"
    }
];

// DATA REALISTIS & DISENSOR
export const topSultans = [
    { name: "Kevin_S***", spent: "Rp 5.2jt", rank: 1 },
    { name: "Muhammad_R***", spent: "Rp 3.8jt", rank: 2 },
    { name: "Bagus_T***", spent: "Rp 2.1jt", rank: 3 },
    { name: "Putri_A***", spent: "Rp 1.5jt", rank: 4 },
    { name: "Fajar_X***", spent: "Rp 950rb", rank: 5 },
];

export const paymentMethods = [
  { id: 'qris', name: 'QRIS (All Payment)' },
  { id: 'dana', name: 'DANA' },
  { id: 'gopay', name: 'GoPay' },
  { id: 'tf', name: 'Transfer Bank' },
];

export const testimonials = [
  { id: 1, name: "Aldi_P***", role: "Top Global", comment: "Gila sih joki disini, ditinggal tidur tau-tau udah max level.", rating: 5 },
  { id: 2, name: "Siska_K***", role: "Sultan Roblox", comment: "Murah banget, adminnya fast respon via WA.", rating: 5 },
  { id: 3, name: "Faiz_M***", role: "Regular", comment: "Proses cepat, akun aman. Langganan terus.", rating: 5 },
  { id: 4, name: "Rara_C***", role: "Newbie", comment: "Awalnya ragu tapi ternyata amanah banget. Makasih min!", rating: 4 },
  { id: 5, name: "Eko_W***", role: "Pro Player", comment: "Joki paling ngebut yang pernah gw coba. 10/10", rating: 5 },
  { id: 6, name: "Dinda_L***", role: "Collector", comment: "Dapet secret fish impian akhirnyaaa. Luv!", rating: 5 }
];

export const stats = [
  { label: "Total Order", value: "1.2K+" },
  { label: "Akun Selesai", value: "850+" },
  { label: "Rating", value: "4.9/5" },
];

export const faqs = [
  { q: "Apakah proses joki aman?", a: "100% Aman. Kami menggunakan metode manual tanpa cheat/script berbahaya." },
  { q: "Berapa lama pengerjaan?", a: "Langsung dikerjakan saat itu juga jika slot admin kosong." },
  { q: "Butuh data login?", a: "Ya, butuh Username/Pass. Disarankan matikan verif 2 langkah sementara." },
  { q: "Metode pembayaran?", a: "Semua E-Wallet, QRIS, dan Transfer Bank." }
];