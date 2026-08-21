import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Flower2,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MoveDown,
  Users,
  Youtube,
  X,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import logo from '@assets/LOGO_AM_1787311684631.png';
import heroBackground from '@assets/bg_1787312385282.png';

const queryClient = new QueryClient();

const photos = [
  {
    src: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Warga berkumpul dengan hangat',
    title: 'Ruang untuk semua',
  },
  {
    src: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Tangan menanam bibit bersama',
    title: 'Menjaga halaman rumah',
  },
  {
    src: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Lanskap hijau di pagi hari',
    title: 'Pagi yang kami rawat',
  },
  {
    src: 'https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Anak muda berdiskusi',
    title: 'Gagasan yang tumbuh',
  },
];

const values = [
  {
    number: '01',
    icon: Users,
    title: 'Guyub',
    copy: 'Kami percaya perubahan yang baik selalu dimulai dari duduk bersama, mendengar, lalu bergerak sebagai satu.',
  },
  {
    number: '02',
    icon: Flower2,
    title: 'Nguri-uri',
    copy: 'Tradisi bukan pajangan. Ia kami bawa hidup-hidup, dirawat dengan cara yang dekat dengan generasi hari ini.',
  },
  {
    number: '03',
    icon: Heart,
    title: 'Melayani',
    copy: 'Tenaga muda kami hadir untuk hal-hal yang nyata: lingkungan yang terjaga, tetangga yang terbantu.',
  },
];

const activities = [
  {
    date: '12',
    month: 'OKT 2024',
    category: 'LINGKUNGAN',
    title: 'Satu halaman, seribu kehidupan',
    copy: 'Gerakan menanam dan merawat ruang hijau di sudut-sudut kampung.',
    color: 'terracotta',
  },
  {
    date: '24',
    month: 'AGT 2024',
    category: 'BUDAYA',
    title: 'Malam di bawah lampion',
    copy: 'Pertemuan warga yang diisi cerita, musik, dan panganan dari dapur sendiri.',
    color: 'indigo',
  },
  {
    date: '07',
    month: 'JUL 2024',
    category: 'PEMUDA',
    title: 'Rembuk gagasan',
    copy: 'Menyediakan meja untuk ide-ide baru dan keberanian untuk memulainya.',
    color: 'saffron',
  },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono text-[10px] font-bold tracking-[0.2em] ${light ? 'text-[#f5d688]' : 'text-[#c95c46]'}`}>
      <span className="h-px w-8 bg-current" />
      <span>{children}</span>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="absolute left-0 right-0 top-0 z-30 text-[#f8f2e7]">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-6 lg:px-12">
        <a href="#beranda" onClick={close} className="flex items-center gap-3" data-testid="link-logo">
          <img src={logo} alt="Logo Karang Taruna Abdi Manunggal" className="h-11 w-11 object-cover mix-blend-darken" />
          <span className="hidden text-[11px] font-bold leading-[1.15] tracking-[0.12em] sm:block">KARANG TARUNA<br /><span className="font-normal tracking-[0.18em] text-[#f5d688]">ABDI MANUNGGAL</span></span>
        </a>
        <nav className="hidden items-center gap-9 md:flex" aria-label="Navigasi utama">
          {[
            ['Tentang kami', '#tentang'],
            ['Nilai', '#nilai'],
            ['Kegiatan', '#kegiatan'],
            ['Galeri', '#galeri'],
          ].map(([label, href]) => (
            <a key={href} href={href} className="nav-link text-[11px] font-semibold tracking-[0.08em] text-[#f8f2e7]/85 hover:text-[#f5d688]" data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`}>{label}</a>
          ))}
          <a href="#kontak" className="flex items-center gap-2 border border-[#f5d688] px-4 py-2.5 text-[11px] font-bold tracking-[0.08em] text-[#f5d688] transition-colors hover:bg-[#f5d688] hover:text-[#252943]" data-testid="link-nav-contact">
            Sapa kami <ArrowUpRight size={14} strokeWidth={1.8} />
          </a>
        </nav>
        <button className="flex h-11 w-11 items-center justify-center border border-[#f8f2e7]/50 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Tutup navigasi' : 'Buka navigasi'} data-testid="button-mobile-menu">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-[#f8f2e7]/15 bg-[#252943] px-6 py-5 md:hidden" aria-label="Navigasi mobile">
          {[
            ['Tentang kami', '#tentang'],
            ['Nilai', '#nilai'],
            ['Kegiatan', '#kegiatan'],
            ['Galeri', '#galeri'],
            ['Sapa kami', '#kontak'],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={close} className="flex items-center justify-between border-b border-[#f8f2e7]/10 py-4 text-sm text-[#f8f2e7]" data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}>
              {label}<ArrowUpRight size={15} className="text-[#f5d688]" />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="beranda" className="relative flex min-h-[720px] items-end overflow-hidden bg-[#252943] pb-14 pt-32 text-[#f8f2e7] sm:min-h-[800px] lg:min-h-[880px] lg:pb-20">
      <div className="absolute inset-0">
        <img src={heroBackground} alt="Kebersamaan Karang Taruna Abdi Manunggal" className="h-full w-full object-cover object-center opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#252943] via-[#252943]/55 to-[#252943]/15" />
        <div className="absolute inset-0 bg-[#4f4850]/15 mix-blend-multiply" />
      </div>
      <div className="absolute right-0 top-0 hidden h-full w-[35%] border-l border-[#f8f2e7]/10 lg:block" />
      <div className="relative mx-auto w-full max-w-[1320px] px-6 lg:px-12">
        <div className="mb-12 flex items-center justify-between lg:mb-20">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] text-[#f5d688]"><span className="h-2 w-2 rounded-full bg-[#ed7455]" /> DI SINI, KAMI TUMBUH</div>
          <div className="hidden font-mono text-[10px] tracking-[0.18em] text-[#f8f2e7]/55 lg:block">07° 47′ LS &nbsp;·&nbsp; 110° 22′ BT</div>
        </div>
        <div className="max-w-[930px]">
          <p className="reveal mb-5 font-mono text-[10px] font-bold tracking-[0.22em] text-[#f5d688]">KARANG TARUNA ABDI MANUNGGAL &nbsp; / &nbsp; SEJAK 1987</p>
          <h1 className="reveal reveal-delay-1 font-display text-[clamp(4.8rem,13vw,11.8rem)] font-semibold leading-[.78] tracking-[-0.07em]">
             Kunciombo<br /><em className="ml-[16%] text-[#f5d688]">Sejuta Pesona</em>
          </h1>
          <div className="mt-10 flex flex-col gap-8 sm:ml-[42%] sm:flex-row sm:items-end sm:justify-between lg:mt-14">
            <p className="reveal reveal-delay-2 max-w-[290px] text-[15px] leading-7 text-[#f8f2e7]/78">Satu kampung, banyak cerita. Kami adalah ruang bertemunya anak muda untuk merawat yang dekat dan bermimpi lebih jauh.</p>
            <a href="#tentang" className="reveal reveal-delay-3 group flex w-fit items-center gap-4 text-[11px] font-bold tracking-[0.12em] text-[#f8f2e7]" data-testid="link-hero-explore">
              KENALI CERITA KAMI <span className="circle-arrow flex h-11 w-11 items-center justify-center rounded-full bg-[#ed7455]"><ArrowRight size={17} /></span>
            </a>
          </div>
        </div>
        <a href="#tentang" className="absolute bottom-0 right-6 hidden items-center gap-3 font-mono text-[9px] tracking-[0.18em] text-[#f8f2e7]/55 lg:flex" data-testid="link-scroll-down">
          GESER UNTUK MENEMUKAN <MoveDown size={14} />
        </a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="tentang" className="overflow-hidden bg-[#f8f2e7] py-24 text-[#252943] lg:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-6 lg:grid-cols-[.82fr_1.18fr] lg:gap-28 lg:px-12">
        <div className="reveal">
          <SectionLabel>01 / TENTANG KAMI</SectionLabel>
          <h2 className="mt-8 max-w-[390px] font-display text-5xl leading-[.98] tracking-[-0.045em] sm:text-6xl">Yang dekat, <em className="text-[#c95c46]">kami</em> rawat.</h2>
          <div className="mt-12 hidden border-l border-[#c95c46] pl-5 font-mono text-[10px] leading-5 tracking-[0.12em] text-[#6b6870] sm:block">DUSUN KARANGREJO<br />KABUPATEN SLEMAN<br />YOGYAKARTA</div>
        </div>
        <div className="reveal reveal-delay-1">
          <p className="max-w-[680px] font-display text-2xl leading-[1.3] text-[#252943] sm:text-3xl">Abdi Manunggal lahir dari keinginan sederhana: agar anak muda tidak hanya menjadi penonton di kampungnya sendiri.</p>
          <p className="mt-8 max-w-[550px] text-[15px] leading-7 text-[#6b6870]">Sejak 1987, kami menghidupkan kegiatan yang membuat warga saling mengenal. Dari kerja bakti di pagi hari, panggung kecil di malam minggu, sampai ruang diskusi untuk membicarakan masa depan desa.</p>
          <a href="#nilai" className="mt-9 inline-flex items-center gap-3 border-b border-[#252943] pb-2 text-[11px] font-bold tracking-[0.12em] transition-colors hover:border-[#c95c46] hover:text-[#c95c46]" data-testid="link-about-values">LIHAT YANG KAMI PERCAYAI <ArrowRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section id="nilai" className="bg-[#e8dfcf] py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        <div className="reveal flex flex-col justify-between gap-7 border-b border-[#252943]/20 pb-10 lg:flex-row lg:items-end">
          <div><SectionLabel>02 / NILAI YANG MENYATUKAN</SectionLabel><h2 className="mt-6 font-display text-5xl tracking-[-0.05em] text-[#252943] sm:text-6xl">Bukan sekadar <em className="text-[#c95c46]">ramai.</em></h2></div>
          <p className="max-w-[270px] text-[13px] leading-6 text-[#6b6870]">Karena kebersamaan kami punya arah, tiga kata ini menjadi kompas setiap langkah.</p>
        </div>
        <div className="grid divide-y divide-[#252943]/20 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {values.map(({ number, icon: Icon, title, copy }, index) => (
            <article key={number} className={`reveal reveal-delay-${index + 1} py-10 lg:px-10 lg:py-12 ${index === 0 ? 'lg:pl-0' : ''} ${index === 2 ? 'lg:pr-0' : ''}`} data-testid={`card-value-${number}`}>
              <div className="flex items-start justify-between"><span className="font-mono text-[10px] tracking-[0.12em] text-[#c95c46]">{number}</span><Icon size={24} strokeWidth={1.4} className="text-[#c95c46]" /></div>
              <h3 className="mt-14 font-display text-4xl text-[#252943]">{title}</h3>
              <p className="mt-4 max-w-[290px] text-[14px] leading-6 text-[#6b6870]">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery({ onSelect }: { onSelect: (photo: (typeof photos)[number]) => void }) {
  return (
    <section id="galeri" className="bg-[#252943] py-24 text-[#f8f2e7] lg:py-32">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        <div className="reveal mb-12 flex items-end justify-between lg:mb-16">
          <div><SectionLabel light>03 / POTONGAN CERITA</SectionLabel><h2 className="mt-6 max-w-[550px] font-display text-5xl leading-[.98] tracking-[-0.05em] sm:text-7xl">Ada pesona di <em className="text-[#f5d688]">setiap sudut.</em></h2></div>
          <span className="hidden font-mono text-[10px] tracking-[0.17em] text-[#f8f2e7]/45 sm:block">KLIK FOTO UNTUK MEMPERBESAR</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-12">
          <button onClick={() => onSelect(photos[0])} className="image-zoom group relative col-span-2 h-[290px] overflow-hidden text-left sm:h-[420px] lg:col-span-7 lg:h-[530px]" data-testid="button-gallery-ruang">
            <img src={photos[0].src} alt={photos[0].alt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#252943]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between"><span className="font-display text-2xl">{photos[0].title}</span><span className="circle-arrow flex h-10 w-10 items-center justify-center rounded-full bg-[#ed7455]"><ArrowUpRight size={17} /></span></div>
          </button>
          <div className="col-span-2 grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-5 lg:grid-cols-1">
            {photos.slice(1, 3).map((photo, index) => (
              <button key={photo.title} onClick={() => onSelect(photo)} className={`image-zoom group relative h-[190px] overflow-hidden text-left sm:h-[260px] lg:h-auto ${index === 0 ? 'lg:min-h-[255px]' : 'lg:min-h-[255px]'}`} data-testid={`button-gallery-${index + 2}`}>
                <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252943]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2"><span className="font-display text-lg leading-tight">{photo.title}</span><span className="circle-arrow flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5d688] text-[#252943]"><ArrowUpRight size={14} /></span></div>
              </button>
            ))}
          </div>
          <button onClick={() => onSelect(photos[3])} className="image-zoom group relative col-span-2 h-[230px] overflow-hidden text-left lg:col-span-5 lg:h-[250px]" data-testid="button-gallery-gagasan">
            <img src={photos[3].src} alt={photos[3].alt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#252943]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between"><span className="font-display text-xl">{photos[3].title}</span><span className="circle-arrow flex h-9 w-9 items-center justify-center rounded-full bg-[#ed7455]"><ArrowUpRight size={15} /></span></div>
          </button>
          <div className="col-span-2 flex items-center justify-center border border-[#f8f2e7]/15 p-7 lg:col-span-7 lg:h-[250px]">
            <p className="max-w-[460px] text-center font-display text-2xl leading-tight text-[#f8f2e7]/90 sm:text-3xl">“Yang membuat kampung berarti adalah orang-orang yang memilih untuk tinggal dan peduli.”</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Activities() {
  return (
    <section id="kegiatan" className="bg-[#f8f2e7] py-24 lg:py-36">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        <div className="reveal grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
          <div><SectionLabel>04 / YANG KAMI LAKUKAN</SectionLabel><h2 className="mt-7 max-w-[330px] font-display text-5xl leading-[.98] tracking-[-0.05em] sm:text-6xl">Kecil di awal, <em className="text-[#c95c46]">besar artinya.</em></h2></div>
          <div className="flex items-end justify-between gap-5 lg:pb-1"><p className="max-w-[390px] text-[14px] leading-6 text-[#6b6870]">Catatan dari kegiatan yang pernah kami jalankan bersama. Setiap tanggal punya wajah dan cerita.</p><a href="#kontak" className="hidden items-center gap-2 text-[11px] font-bold tracking-[0.12em] text-[#c95c46] sm:flex" data-testid="link-activity-collaborate">AJAK KOLABORASI <ArrowUpRight size={15} /></a></div>
        </div>
        <div className="mt-14 border-t border-[#252943]/20">
          {activities.map((activity, index) => (
            <article key={activity.title} className="reveal group grid gap-5 border-b border-[#252943]/20 py-8 transition-colors hover:bg-[#e8dfcf]/45 sm:grid-cols-[100px_1fr_auto] sm:items-center sm:gap-8 lg:grid-cols-[125px_1fr_230px_24px]" data-testid={`row-activity-${index + 1}`}>
              <div className="flex items-center gap-3 sm:block"><span className="font-display text-5xl leading-none text-[#c95c46]">{activity.date}</span><span className="font-mono text-[9px] tracking-[0.12em] text-[#6b6870] sm:ml-2 lg:ml-0 lg:block">{activity.month}</span></div>
              <div><p className={`font-mono text-[9px] font-bold tracking-[0.18em] ${activity.color === 'saffron' ? 'text-[#b28529]' : 'text-[#c95c46]'}`}>{activity.category}</p><h3 className="mt-2 font-display text-2xl text-[#252943]">{activity.title}</h3></div>
              <p className="max-w-[230px] text-[13px] leading-5 text-[#6b6870]">{activity.copy}</p>
              <ArrowRight size={18} className="hidden text-[#c95c46] transition-transform group-hover:translate-x-1 lg:block" />
            </article>
          ))}
        </div>
        <a href="#kontak" className="mt-8 flex w-fit items-center gap-2 text-[11px] font-bold tracking-[0.12em] text-[#c95c46] sm:hidden" data-testid="link-mobile-activity-collaborate">AJAK KOLABORASI <ArrowUpRight size={15} /></a>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="kontak" className="relative overflow-hidden bg-[#ed7455] px-6 py-24 text-[#252943] lg:px-12 lg:py-32">
      <div className="absolute -right-10 -top-16 font-display text-[280px] leading-none text-[#f5d688]/30 select-none">A</div>
      <div className="relative mx-auto max-w-[1320px]">
        <div className="reveal grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div><SectionLabel>05 / MARI BERTEMU</SectionLabel><h2 className="mt-7 max-w-[700px] font-display text-6xl leading-[.88] tracking-[-0.06em] sm:text-8xl">Punya cerita?<br /><em className="text-[#f5d688]">Bawa kemari.</em></h2></div>
          <div className="lg:pb-1"><p className="max-w-[390px] text-[15px] leading-7 text-[#252943]/75">Kami selalu punya tempat untuk ide baru, tangan yang mau membantu, dan suara yang ingin didengar.</p><a href="mailto:halo@abdimanunggal.id" className="mt-8 inline-flex items-center gap-4 border-b border-[#252943] pb-3 text-[11px] font-bold tracking-[0.14em] transition-colors hover:border-[#f5d688] hover:text-[#f5d688]" data-testid="link-email-contact">KIRIM PESAN <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#252943] text-[#f8f2e7]"><Mail size={15} /></span></a></div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#252943] px-6 pb-8 pt-14 text-[#f8f2e7] lg:px-12 lg:pt-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 border-b border-[#f8f2e7]/15 pb-14 lg:grid-cols-[1.3fr_.7fr_.7fr]">
          <div><div className="flex items-center gap-3"><img src={logo} alt="Logo Karang Taruna Abdi Manunggal" className="h-12 w-12 object-cover mix-blend-lighten" /><span className="text-[11px] font-bold leading-[1.15] tracking-[0.12em]">KARANG TARUNA<br /><span className="font-normal tracking-[0.18em] text-[#f5d688]">ABDI MANUNGGAL</span></span></div><p className="mt-7 max-w-[290px] font-display text-2xl leading-tight text-[#f8f2e7]/85">Sejuta pesona,<br /><em className="text-[#f5d688]">satu kebersamaan.</em></p></div>
          <div><p className="font-mono text-[9px] tracking-[0.18em] text-[#f5d688]">JELAJAH</p><div className="mt-5 flex flex-col items-start gap-3 text-sm text-[#f8f2e7]/70"><a href="#tentang" className="hover:text-[#f5d688]" data-testid="link-footer-tentang">Tentang kami</a><a href="#nilai" className="hover:text-[#f5d688]" data-testid="link-footer-nilai">Nilai kami</a><a href="#kegiatan" className="hover:text-[#f5d688]" data-testid="link-footer-kegiatan">Kegiatan</a><a href="#galeri" className="hover:text-[#f5d688]" data-testid="link-footer-galeri">Galeri</a></div></div>
          <div><p className="font-mono text-[9px] tracking-[0.18em] text-[#f5d688]">TEMUKAN KAMI</p><div className="mt-5 space-y-3 text-sm text-[#f8f2e7]/70"><p className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-[#ed7455]" /><span>Ds. Kunciombo, Wonosamudro<br />Boyolali, Jawa Tengah</span></p><a href="mailto:halo@abdimanunggal.id" className="flex items-center gap-3 hover:text-[#f5d688]" data-testid="link-footer-email"><Mail size={16} className="text-[#ed7455]" />halo@abdimanunggal.id</a><div className="grid grid-cols-3 gap-2 pt-2"><a href="https://www.instagram.com/abdimanunggal" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#f5d688]" data-testid="link-footer-instagram"><Instagram size={15} className="text-[#ed7455]" />Instagram</a><a href="https://www.tiktok.com/@abdimanunggal" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#f5d688]" data-testid="link-footer-tiktok"><span className="text-[15px] font-bold leading-none text-[#ed7455]">♪</span>TikTok</a><a href="https://www.youtube.com/@AbdiManunggal" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#f5d688]" data-testid="link-footer-youtube"><Youtube size={15} className="text-[#ed7455]" />YouTube</a></div></div></div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-7 font-mono text-[9px] tracking-[0.12em] text-[#f8f2e7]/40 sm:flex-row"><span>© 2024 KARANG TARUNA ABDI MANUNGGAL</span><span>DIBUAT DENGAN RASA MEMILIKI</span></div>
      </div>
    </footer>
  );
}

function Lightbox({ photo, onClose }: { photo: (typeof photos)[number]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#252943]/95 p-5" role="dialog" aria-modal="true" aria-label={photo.title} onClick={onClose} data-testid="dialog-gallery">
      <button onClick={onClose} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-[#f8f2e7]/35 text-[#f8f2e7] hover:bg-[#ed7455]" aria-label="Tutup foto" data-testid="button-close-gallery"><X size={20} /></button>
      <div className="max-h-[90vh] max-w-5xl" onClick={(event) => event.stopPropagation()}><img src={photo.src} alt={photo.alt} className="max-h-[78vh] w-auto object-contain" /><p className="mt-4 font-display text-2xl text-[#f8f2e7]">{photo.title}</p></div>
    </div>
  );
}

function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[number] | null>(null);
  const [showTop, setShowTop] = useState(false);
  useReveal();
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="noise min-h-[100dvh] overflow-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Values />
        <Gallery onSelect={setSelectedPhoto} />
        <Activities />
        <Contact />
      </main>
      <Footer />
      {selectedPhoto && <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
      {showTop && <a href="#beranda" className="fixed bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5d688] text-[#252943] shadow-lg transition-transform hover:-translate-y-1" aria-label="Kembali ke atas" data-testid="link-back-to-top"><ChevronDown size={18} className="rotate-180" /></a>}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;