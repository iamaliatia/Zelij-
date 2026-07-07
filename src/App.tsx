import { useState } from 'react';
import { 
  Wrench, 
  Calculator, 
  Briefcase, 
  Image, 
  Users, 
  MessageSquare, 
  Sparkles, 
  Compass, 
  PhoneCall, 
  ShieldCheck, 
  Plus, 
  MapPin, 
  ChevronLeft,
  Heart,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import Types
import { Artisan, JobRequest, ProjectShowcase } from './types';

// Import Data & Components
import { INITIAL_ARTISANS, INITIAL_JOBS, INITIAL_SHOWCASE, SPECIALTY_LABELS } from './data';
import MaterialCalculator from './components/MaterialCalculator';
import ArtisansList from './components/ArtisansList';
import JobsBoard from './components/JobsBoard';
import ProjectGallery from './components/ProjectGallery';
import { AddArtisanModal, AddJobModal } from './components/Modals';

export default function App() {
  // Application states
  const [artisans, setArtisans] = useState<Artisan[]>(INITIAL_ARTISANS);
  const [jobs, setJobs] = useState<JobRequest[]>(INITIAL_JOBS);
  const [showcase, setShowcase] = useState<ProjectShowcase[]>(INITIAL_SHOWCASE);
  
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'artisans' | 'jobs' | 'gallery' | 'calculator'>('artisans');
  
  // Modals state
  const [isArtisanModalOpen, setIsArtisanModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  // Success stats highlights
  const availableCount = artisans.filter(a => a.isAvailable).length;
  const openJobsCount = jobs.filter(j => j.status === 'open').length;

  // Add handlers
  const handleAddArtisan = (newArtisanData: Omit<Artisan, 'id' | 'rating' | 'completedProjectsCount' | 'avatar' | 'verified'>) => {
    const newArtisan: Artisan = {
      ...newArtisanData,
      id: `artisan-${Date.now()}`,
      rating: 5.0, // New artisan starts with a high clean rating
      completedProjectsCount: 0,
      avatar: `https://images.unsplash.com/photo-${['1540569014015-19a7be504e3a', '1566492031773-4f4e44671857', '1507003211169-0a1dd7228f2d', '1628157582853-a796fa650a6a'][Math.floor(Math.random() * 4)]}?w=150&auto=format&fit=crop&q=80`,
      verified: false
    };
    setArtisans([newArtisan, ...artisans]);
  };

  const handleAddJob = (newJobData: Omit<JobRequest, 'id' | 'date' | 'status'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newJob: JobRequest = {
      ...newJobData,
      id: `job-${Date.now()}`,
      date: today,
      status: 'open'
    };
    setJobs([newJob, ...jobs]);
  };

  const handleLikeProject = (id: string) => {
    setShowcase(showcase.map(proj => {
      if (proj.id === id) {
        return { ...proj, likes: proj.likes + 1 };
      }
      return proj;
    }));
  };

  const handleContactArtisanFromGallery = (artisanName: string) => {
    // Scroll to directory, filter by artisan name
    setActiveTab('artisans');
    // Set search query inside artisans or simply alert that directory is focused
    const element = document.getElementById('main-content-tabs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 antialiased selection:bg-indigo-600 selection:text-white">
      {/* Dynamic Upper Bar with general stats */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
              مجموعة حرفي عمال زليج و رخام
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="hidden sm:inline">مجتمع تفاعلي لدعم المقاولين وأصحاب الصنعة بالمغرب</span>
          </div>
          <div className="flex items-center gap-4">
            <span>المدن النشطة: <strong className="text-white font-bold">فاس، مراكش، الدار البيضاء، سلا</strong></span>
            <a 
              href="https://chat.whatsapp.com/H0zyWhl76PtJ2tIWa4cENt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-indigo-600/60 hover:bg-indigo-600 text-indigo-100 px-2.5 py-0.5 rounded-md font-bold transition-all text-[11px] inline-flex items-center gap-1 cursor-pointer"
            >
              انضم لمجموعة الواتساب
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Hero Section */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg shadow-indigo-600/10 flex items-center justify-center">
              <Wrench className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans flex items-center gap-1.5">
                حِـــرَفِــي <span className="text-indigo-600 text-xs font-semibold bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">شبكة الصنّاع</span>
              </h1>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">منصة مجتمع الزليج البلدي، الرخام، والخرسانة وتشييد المباني بالمغرب</p>
            </div>
          </div>

          {/* Quick Stats Header Cards */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-100 text-center">
              <p className="text-[10px] text-slate-400 font-semibold">المعلمين المتاحين</p>
              <p className="text-sm font-bold text-indigo-600 font-mono">{availableCount} حرفي</p>
            </div>
            <div className="bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-100 text-center">
              <p className="text-[10px] text-slate-400 font-semibold">طلبات الورش المفتوحة</p>
              <p className="text-sm font-bold text-orange-600 font-mono">{openJobsCount} ورش</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Intro Section (Visual Welcome) */}
      <section className="bg-slate-100 py-10 px-4 border-b border-slate-200 relative overflow-hidden">
        {/* Moroccan geometry tile background pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0l40 40-40 40L0 40z' fill='%234f46e5' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-950 text-xs font-extrabold px-3 py-1 rounded-full border border-indigo-200/60">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              تأسست انطلاقاً من مناقشات وطلبات الحرفيين الحية
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-sans leading-tight">
              المنصة الوطنية لربط <span className="text-indigo-600 underline decoration-orange-500 decoration-3 underline-offset-4">معلّمي الزليج</span> والرخام بأصحاب المشاريع
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl font-medium">
              موقع "حرفي" ولد من قلب مجموعة الواتساب الوطنية التاريخية لعمال الزليج والرخام والبناء. نهدف لترسيخ روح التضامن والاحترام المتبادل بين الصناع التقليديين وباقي المهن (من بناء الياجور، مقاولي الكوفراج، التشطيبات). هنا تجد اليد العاملة الأمينة والتقدير المالي الذكي لورشك.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a 
                href="#main-content-tabs"
                onClick={() => {
                  setActiveTab('calculator');
                  setTimeout(() => {
                    document.getElementById('material-calculator-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                حساب تكلفة ومواد الورش الآن
              </a>
              
              <button 
                onClick={() => setIsArtisanModalOpen(true)}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-indigo-600" />
                تسجيل كحرفي لتلقي المكالمات
              </button>
            </div>
          </div>

          {/* Quick Notice Card showing a mock discussion from the chat */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl shadow-md border border-slate-200 relative">
            <div className="absolute top-3 left-3 bg-slate-100 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">
              أرشيف النقاش
            </div>
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <h4 className="text-xs font-extrabold text-slate-800 font-sans">ميثاق الاحترام والزمالة الحرفية</h4>
            </div>
            
            <div className="space-y-3.5">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 block font-bold">زكرياء (معلم زليج ورخام)</span>
                <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl italic">
                  "يا إخوان هذا كروب تاع رخام وزليج ولا تاع تابنايت؟ اللي مسؤول يخرج علينا هاد الناس..."
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-indigo-600 block font-bold">المعلم عبد الجليل (زلايجي محترف)</span>
                <p className="text-xs text-indigo-950 bg-indigo-50/50 p-2.5 rounded-xl border-r-3 border-indigo-600 italic">
                  "كيبان لي الناس بالناس والناس بالله. مسح هاد الميساج راك حرايفي. معلم الياجور يقراه يتغير في قلبو من جهتك. الصنعة والاحترام خوت ما يتفارقوش!"
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>نلتزم في منصة حرفي بتقدير جميع مهن البناء من الأساس حتى الفينيسيون.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive App Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8" id="main-content-tabs">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 overflow-x-auto bg-white p-1 rounded-2xl shadow-sm border">
          <button
            onClick={() => setActiveTab('artisans')}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'artisans'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" />
            دليل المعلمين والحرفيين
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            بورصة الأوراش والبريكولات
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Image className="w-4 h-4" />
            معرض روائع الأعمال الحية
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Calculator className="w-4 h-4" />
            حاسبة المواد والتقديرات
          </button>
        </div>

        {/* Tab View Rendering */}
        <div className="min-h-[400px]">
          {activeTab === 'artisans' && (
            <ArtisansList 
              artisans={artisans} 
              onOpenRegisterModal={() => setIsArtisanModalOpen(true)} 
            />
          )}

          {activeTab === 'jobs' && (
            <JobsBoard 
              jobs={jobs} 
              onOpenPostJobModal={() => setIsJobModalOpen(true)} 
            />
          )}

          {activeTab === 'gallery' && (
            <ProjectGallery 
              showcase={showcase} 
              onLikeProject={handleLikeProject}
              onContactArtisan={handleContactArtisanFromGallery}
            />
          )}

          {activeTab === 'calculator' && (
            <MaterialCalculator />
          )}
        </div>

        {/* Informative Moroccan Craftsmanship Guide card */}
        <section className="bg-orange-50/40 rounded-2xl p-6 border border-orange-100 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-1.5">
              <BookOpen className="w-5 h-5 text-orange-600" />
              دليل أسعار المواد المتداولة باليومية والمتر بالمغرب (أبريل - يوليو 2026)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              تختلف أسعار اليد العاملة والمواد حسب المدن وتفاصيل الزخرفة. على سبيل المثال، يبلغ متوسط يومية مساعد المعلم (الحرايفي المساعد أو الخدام) حوالي <strong>130 إلى 170 درهم</strong> باليوم، بينما تتراوح يومية معلم الزليج الممتاز بين <strong>250 إلى 400 درهم</strong> حسب مهارته. أما بناء الياجور فغالباً ما يُقدر بالمتر المربع أو الإجمالي (مثال: تشييد جدران كاملة بـ 12,300 ياجورة من فئة 7 ثقوب يُكلف في حدود <strong>23,000 درهم</strong> تشمل المواد والنقل والمصنعية كما نوقش من معلّمي المجموعة).
            </p>
          </div>
          <div className="md:col-span-4 bg-white p-4 rounded-xl border border-orange-100 flex flex-col justify-center text-center space-y-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase">هل لديك استفسار عاجل؟</span>
            <span className="text-xs font-extrabold text-slate-800">يمكنك الاستشارة وطرح سؤالك بمجموعتنا الحية</span>
            <a 
              href="https://chat.whatsapp.com/H0zyWhl76PtJ2tIWa4cENt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-sm inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              مستشاري الواتساب متاحين
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-3">
            <h4 className="text-white text-lg font-bold font-sans">حرفي - دليل ومجتمع عمال الزليج والرخام بالمغرب</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              منصة غير ربحية تهدف لتيسير سبل العيش وتقريب المسافات بين المعلمين التقليديين وأصحاب الأوراش والمقاولين بالمغرب. تم تصميمها استلهاماً وتوثيقاً لنقاشات وحوارات مجموعة عمال الزليج والرخام الحية.
            </p>
            <p className="text-[10px] text-slate-500 font-semibold">
              الحقوق محفوظة © {new Date().getFullYear()} حرفي. صُنع بفخر للحفاظ على الهوية المعمارية المغربية ودعم اليد العاملة الوطنية.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">الحرف والمهن المعتمدة</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-indigo-400 transition-colors">تركيب الزليج البلدي والفسيفساء الفاسية</span></li>
              <li><span className="hover:text-indigo-400 transition-colors">تفصيل وجلي الرخام والجرانيت المستورد</span></li>
              <li><span className="hover:text-indigo-400 transition-colors">بناء الياجور الأحمر والأسمنتي (الطوب)</span></li>
              <li><span className="hover:text-indigo-400 transition-colors">أعمال الشدة الخشبية وصب الخرسانة (الكوفراج)</span></li>
              <li><span className="hover:text-indigo-400 transition-colors">ترميم الرياضات التاريخية والمنازل العتيقة</span></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">انضم إلينا على الهاتف</h4>
            <p className="text-xs text-slate-400">
              سواء كنت زبوناً يبحث عن الدقة أو معلماً يبحث عن لقمة العيش، يمكنك الانضمام لآلاف الحرفيين المؤهلين في جميع عمالات وأقاليم المغرب.
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsArtisanModalOpen(true)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer text-center"
              >
                تسجيل كمعلم
              </button>
              <button 
                onClick={() => setIsJobModalOpen(true)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer text-center"
              >
                انشر طلباً لعمل
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Register Artisan Modal Form */}
      <AddArtisanModal 
        isOpen={isArtisanModalOpen}
        onClose={() => setIsArtisanModalOpen(false)}
        onSubmit={handleAddArtisan}
      />

      {/* Post Job / Gig Modal Form */}
      <AddJobModal 
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        onSubmit={handleAddJob}
      />
    </div>
  );
}
