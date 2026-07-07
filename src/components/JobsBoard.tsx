import { useState } from 'react';
import { JobRequest, SpecialtyType } from '../types';
import { SPECIALTY_LABELS, CITIES } from '../data';
import { Search, MapPin, Calendar, Briefcase, Phone, MessageSquare, Plus, BellRing, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface JobsBoardProps {
  jobs: JobRequest[];
  onOpenPostJobModal: () => void;
}

export default function JobsBoard({ jobs, onOpenPostJobModal }: JobsBoardProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyType | 'all' | 'all-specialties'>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    // Normalizing all types
    const matchesSpecialty = 
      selectedSpecialty === 'all' || 
      selectedSpecialty === 'all-specialties' || 
      job.specialtyRequired === selectedSpecialty;
    const matchesCity = selectedCity === 'all' || job.city === selectedCity;
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.postedBy.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesSpecialty && matchesCity && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search and Action Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white rounded-2xl p-6 shadow-sm border border-indigo-950/20 relative overflow-hidden">
        {/* Abstract pattern decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />

        <div className="relative flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
          <div className="space-y-1">
            <span className="bg-indigo-600/60 text-indigo-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">الأوراش الشاغرة</span>
            <h3 className="text-xl font-bold font-sans">بورصة طلبات وعروض الشغل الحالية</h3>
            <p className="text-indigo-100/80 text-xs max-w-xl">
              تصفح الفرص المتاحة حالياً المنشورة بواسطة المقاولين وأصحاب الأوراش، أو انشر ورشك الخاص لتلقي عروض الأسعار من أمهر المعلمين بالمغرب.
            </p>
          </div>
          
          <button
            onClick={onOpenPostJobModal}
            className="flex-shrink-0 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            انشر ورش عمل / بريكول
          </button>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search */}
        <div className="relative md:col-span-6">
          <Search className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث عن ورش، بريكول، نوع العمل المطلوب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-right"
          />
        </div>

        {/* Specialty required filter */}
        <div className="relative md:col-span-3">
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value as any)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 appearance-none"
            style={{ backgroundPosition: 'left 12px center', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\' stroke-width=\'2\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19.5 8.25l-7.5 7.5-7.5-7.5\' /%3E%3C/svg%3E")', backgroundSize: '12px', backgroundRepeat: 'no-repeat' }}
          >
            <option value="all">كل الطلبات</option>
            {Object.entries(SPECIALTY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* City filter */}
        <div className="relative md:col-span-3">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 appearance-none"
            style={{ backgroundPosition: 'left 12px center', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\' stroke-width=\'2\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19.5 8.25l-7.5 7.5-7.5-7.5\' /%3E%3C/svg%3E")', backgroundSize: '12px', backgroundRepeat: 'no-repeat' }}
          >
            <option value="all">كل المدن</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Jobs grid */}
      {filteredJobs.length > 0 ? (
        <div className="space-y-4">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(index * 0.05, 0.4) }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:border-orange-500/20 hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-5"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-orange-100 text-orange-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                    مطلوب: {SPECIALTY_LABELS[job.specialtyRequired] || 'كل الحرف الفنية'}
                  </span>
                  
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {job.city}
                  </span>

                  <span className="inline-flex items-center gap-1 text-slate-400 text-[10px] font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    {job.date}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900 font-sans hover:text-indigo-600 transition-colors">
                    {job.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {job.description}
                  </p>
                </div>

                {/* Additional metadata */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1.5 text-xs text-slate-500 font-semibold">
                  <span>صاحب الطلب: <strong className="text-slate-800 font-bold">{job.postedBy}</strong></span>
                  <span className="text-slate-300">|</span>
                  <span>الميزانية المقدرة: <strong className="text-indigo-600 font-extrabold">{job.budget}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row md:flex-col justify-end md:justify-center gap-2.5 md:border-r md:border-slate-100 md:pr-5 min-w-[170px] flex-shrink-0">
                <a
                  href={`tel:${job.phone}`}
                  className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-slate-500" />
                  اتصل فوراً
                </a>
                <a
                  href={`https://wa.me/${job.phone.replace(/[^0-9]/g, '')}?text=السلام%20عليكم%20بخصوص%20عرض%20العمل:%20${encodeURIComponent(job.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  راسل واتساب
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-sm space-y-3">
          <div className="bg-slate-50 p-4 rounded-full w-14 h-14 flex items-center justify-center mx-auto text-slate-400">
            <BellRing className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">لا توجد طلبات عمل حالية مطابقة للفلاتر</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">كن أول من ينشر طلباً أو فرصة عمل الآن واستقبل اتصالات الحرفيين المؤهلين!</p>
          <button
            onClick={onOpenPostJobModal}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl mt-2 cursor-pointer"
          >
            انشر ورشاً الآن
          </button>
        </div>
      )}
    </div>
  );
}
