import React, { useState } from 'react';
import { X, CheckCircle2, UserPlus, FileEdit } from 'lucide-react';
import { SpecialtyType, Artisan, JobRequest } from '../types';
import { SPECIALTY_LABELS, CITIES } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface AddArtisanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newArtisan: Omit<Artisan, 'id' | 'rating' | 'completedProjectsCount' | 'avatar' | 'verified'>) => void;
}

export function AddArtisanModal({ isOpen, onClose, onSubmit }: AddArtisanModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(CITIES[0]);
  const [specialty, setSpecialty] = useState<SpecialtyType>('zellige');
  const [yearsOfExperience, setYearsOfExperience] = useState('5');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !bio) return;

    const skillsArray = skills ? skills.split(',').map(s => s.trim()) : ['تبليط', 'جودة عالية'];

    onSubmit({
      name,
      phone,
      city,
      specialty,
      yearsOfExperience: parseInt(yearsOfExperience) || 3,
      bio,
      skills: skillsArray,
      isAvailable
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName('');
      setPhone('');
      setBio('');
      setSkills('');
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-indigo-950/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full z-10 border border-slate-200"
          >
            <button
              onClick={onClose}
              className="absolute top-4 left-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6">
              {success ? (
                <div className="py-12 text-center space-y-4">
                  <div className="inline-flex bg-indigo-50 text-indigo-600 p-4 rounded-full border border-indigo-100">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-sans">تم تسجيلك بنجاح!</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">لقد تم إضافة ملفك الحرفي إلى شبكتنا بنجاح. سيتمكن المقاولون والزبناء من التواصل معك فوراً عبر واتساب والاتصال.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <UserPlus className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-base font-bold text-slate-900 font-sans">التسجيل كمعلم / حرايفي محترف</h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الكامل (أو كنية الشهرة)</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: المعلم محمد الفاسي"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">التخصص الرئيسي</label>
                      <select
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value as SpecialtyType)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600"
                      >
                        {Object.entries(SPECIALTY_LABELS).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">المدينة الحالية</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600"
                      >
                        {CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف (الواتساب)</label>
                      <input
                        type="tel"
                        required
                        placeholder="مثال: +212 600000000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-left"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">سنوات الخبرة بالصنعة</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        required
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-left"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">نبذة عن أعمالك ومهاراتك الحرفية</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="صف بإيجاز ما تتقنه (مثال: تركيب زليج بلدي دقيق، بناء فيلات، كوفراج أسقف، صالونات أندلسية...)"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-right resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">المهارات والكلمات المفتاحية (مفصولة بفاصلة)</label>
                    <input
                      type="text"
                      placeholder="حمام مغربي, تلميع الرخام, ياجور أحمر, فلات سلاب"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600"
                    />
                  </div>

                  <div className="flex items-center gap-2 py-1 select-none">
                    <input
                      type="checkbox"
                      id="avail"
                      checked={isAvailable}
                      onChange={(e) => setIsAvailable(e.target.checked)}
                      className="accent-indigo-600 h-4 w-4 rounded"
                    />
                    <label htmlFor="avail" className="text-xs font-bold text-slate-600 cursor-pointer">أنا متاح لتلقي العروض والعمل حالاً</label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    تسجيل الحساب الفني
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newJob: Omit<JobRequest, 'id' | 'date' | 'status'>) => void;
}

export function AddJobModal({ isOpen, onClose, onSubmit }: AddJobModalProps) {
  const [title, setTitle] = useState('');
  const [specialtyRequired, setSpecialtyRequired] = useState<SpecialtyType>('zellige');
  const [city, setCity] = useState(CITIES[0]);
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [postedBy, setPostedBy] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !postedBy || !phone) return;

    onSubmit({
      title,
      specialtyRequired,
      city,
      budget: budget || 'حسب الاتفاق',
      description,
      postedBy,
      phone
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setTitle('');
      setBudget('');
      setDescription('');
      setPostedBy('');
      setPhone('');
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-indigo-950/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full z-10 border border-slate-200"
          >
            <button
              onClick={onClose}
              className="absolute top-4 left-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6">
              {success ? (
                <div className="py-12 text-center space-y-4">
                  <div className="inline-flex bg-indigo-50 text-indigo-600 p-4 rounded-full border border-indigo-100">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-sans">تم نشر طلب العمل بنجاح!</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">سيظهر ورشك الحرفي فوراً في البورصة للمئات من عمال ومعلمي الزليج والرخام والبناء المتاحين للاتصال بك وعرض خدماتهم.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <FileEdit className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-base font-bold text-slate-900 font-sans">إضافة عرض شغل / طلب بريكول</h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الطلب (بشكل واضح)</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: مطلوب معلم رخام لتركيب أدراج فيلا بسلا"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">الحرفة المطلوبة للورش</label>
                      <select
                        value={specialtyRequired}
                        onChange={(e) => setSpecialtyRequired(e.target.value as SpecialtyType)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600"
                      >
                        {Object.entries(SPECIALTY_LABELS).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">المدينة التي بها الورش</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600"
                      >
                        {CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">الميزانية المقدرة / طريقة الدفع</label>
                      <input
                        type="text"
                        placeholder="مثال: 3000 درهم أو حسب المتر"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف للتواصل المباشر</label>
                      <input
                        type="tel"
                        required
                        placeholder="مثال: +212 600000000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-left"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">اسمك الشخصي أو اسم المقاولة</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: المقاول عبد اللطيف"
                      value={postedBy}
                      onChange={(e) => setPostedBy(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">تفاصيل العمل والشروط المطلوبة</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="صف الورش بوضوح (مثال: المساحة الإجمالية 40 متر، المواد متوفرة بالكامل، جودة الفينيسيون ضرورية...)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-right resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    نشر في بورصة الأعمال
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
