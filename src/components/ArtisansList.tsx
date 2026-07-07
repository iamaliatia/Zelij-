import { useState } from 'react';
import { Artisan, SpecialtyType } from '../types';
import { SPECIALTY_LABELS, CITIES } from '../data';
import { Search, MapPin, Briefcase, Star, Phone, CheckCircle2, UserCheck, MessageSquare, Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface ArtisansListProps {
  artisans: Artisan[];
  onOpenRegisterModal: () => void;
}

export default function ArtisansList({ artisans, onOpenRegisterModal }: ArtisansListProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyType | 'all'>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);

  // Filter artisans
  const filteredArtisans = artisans.filter((artisan) => {
    const matchesSpecialty = selectedSpecialty === 'all' || artisan.specialty === selectedSpecialty;
    const matchesCity = selectedCity === 'all' || artisan.city === selectedCity;
    const matchesAvailability = !onlyAvailable || artisan.isAvailable;
    const matchesSearch = 
      artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (SPECIALTY_LABELS[artisan.specialty] || '').toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesSpecialty && matchesCity && matchesAvailability && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-sans">دليل الحرفيين والمعلمين</h3>
            <p className="text-xs text-slate-400 mt-1">تواصل مباشرة مع معلمين الزليج، الرخام، وبنائين محترفين في منطقتك دون وسيط</p>
          </div>
          
          <button
            onClick={onOpenRegisterModal}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            سجل كحرفي معنا
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-2">
          {/* Search bar */}
          <div className="relative lg:col-span-5">
            <Search className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث باسم الحرفي، المهارة (مثال: حمام بلدي، گرانيت)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-right"
            />
          </div>

          {/* Specialty Filter */}
          <div className="relative lg:col-span-3">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 appearance-none"
              style={{ backgroundPosition: 'left 12px center', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\' stroke-width=\'2\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19.5 8.25l-7.5 7.5-7.5-7.5\' /%3E%3C/svg%3E")', backgroundSize: '12px', backgroundRepeat: 'no-repeat' }}
            >
              <option value="all">كل التخصصات الحرفية</option>
              {Object.entries(SPECIALTY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div className="relative lg:col-span-2">
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

          {/* Availability Checkbox toggle */}
          <div className="flex items-center justify-end sm:justify-start lg:col-span-2 px-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="accent-indigo-600 h-4 w-4 rounded"
              />
              <span className="text-xs font-bold text-slate-600">متاح للعمل حالاً</span>
            </label>
          </div>
        </div>
      </div>

      {/* Artisans Grid Cards */}
      {filteredArtisans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArtisans.map((artisan, index) => (
            <motion.div
              key={artisan.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-indigo-500/20 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Status Badges */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    {artisan.isAvailable ? (
                      <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-indigo-200/50">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        متاح للعمل
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-orange-200/40">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        مشغول حالياً
                      </span>
                    )}

                    {artisan.verified && (
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-blue-200/50">
                        <CheckCircle2 className="w-3 h-3 text-blue-600" />
                        موثق
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-400">#حرفي-{artisan.id.split('-')[1]}</span>
                </div>

                {/* Profile Header */}
                <div className="flex items-start gap-4">
                  <img
                    src={artisan.avatar}
                    alt={artisan.name}
                    className="w-14 h-14 rounded-xl object-cover border-2 border-slate-100 flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${artisan.name}`;
                    }}
                  />
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                      {artisan.name}
                    </h4>
                    <p className="text-xs text-indigo-600 font-bold flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      {SPECIALTY_LABELS[artisan.specialty]}
                    </p>
                    <div className="flex items-center gap-2.5 text-xs text-slate-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {artisan.city}
                      </span>
                      <span>•</span>
                      <span>خبرة {artisan.yearsOfExperience} سنة</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-orange-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                        {artisan.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-500 mt-4 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {artisan.bio}
                </p>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {artisan.skills.map((skill, i) => (
                    <span key={i} className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-1 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Contact buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${artisan.phone}`}
                  className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-slate-500" />
                  اتصال مباشر
                </a>
                <a
                  href={`https://wa.me/${artisan.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  واتساب الحرفي
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-sm space-y-3">
          <div className="bg-slate-50 p-4 rounded-full w-14 h-14 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">لم نعثر على أي حرفيين بالمواصفات المحددة</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">جرب تغيير الفلاتر، أو ابحث في مدن أخرى، أو تفقد كل التخصصات لعثور أفضل.</p>
        </div>
      )}
    </div>
  );
}
