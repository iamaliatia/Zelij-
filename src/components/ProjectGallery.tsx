import React, { useState } from 'react';
import { ProjectShowcase } from '../types';
import { Heart, Search, MapPin, Eye, ExternalLink, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectGalleryProps {
  showcase: ProjectShowcase[];
  onLikeProject: (id: string) => void;
  onContactArtisan: (artisanName: string) => void;
}

export default function ProjectGallery({ showcase, onLikeProject, onContactArtisan }: ProjectGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'zellige' | 'marble' | 'construction'>('all');
  const [activeProject, setActiveProject] = useState<ProjectShowcase | null>(null);
  const [likedProjects, setLikedProjects] = useState<string[]>([]);

  // Filter project gallery
  const filteredProjects = showcase.filter((proj) => {
    return selectedCategory === 'all' || proj.category === selectedCategory;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedProjects.includes(id)) {
      setLikedProjects(likedProjects.filter((pId) => pId !== id));
    } else {
      setLikedProjects([...likedProjects, id]);
      onLikeProject(id);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'zellige': return 'زليج بلدي';
      case 'marble': return 'رخام وجرانيت';
      case 'construction': return 'أعمال بناء';
      default: return category;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-sans">معرض روائع الزليج والرخام</h3>
          <p className="text-xs text-slate-400 mt-1">شاهد صوراً حقيقية ملتقطة من أوراش عمل متميزة أنجزها معلّمو المجموعة</p>
        </div>

        <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setSelectedCategory('zellige')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'zellige'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            زليج بلدي وفاسي
          </button>
          <button
            onClick={() => setSelectedCategory('marble')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'marble'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            رخام وجرانيت
          </button>
          <button
            onClick={() => setSelectedCategory('construction')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'construction'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            أعمال بناء وطوب
          </button>
        </div>
      </div>

      {/* Grid gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredProjects.map((project, index) => {
          const isLiked = likedProjects.includes(project.id);
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
              onClick={() => setActiveProject(project)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 group cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-video sm:aspect-square overflow-hidden bg-slate-100">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-indigo-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow">
                    <Eye className="w-3.5 h-3.5 text-indigo-600" />
                    عرض التفاصيل
                  </span>
                </div>

                {/* Category tag */}
                <span className="absolute right-3 top-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  {getCategoryLabel(project.category)}
                </span>
              </div>

              {/* Card Footer info */}
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1 font-sans">
                    {project.title}
                  </h4>
                  <button
                    onClick={(e) => handleLike(project.id, e)}
                    className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                      isLiked 
                        ? 'bg-rose-50 border-rose-200 text-rose-600' 
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    {project.likes + (isLiked ? 1 : 0)}
                  </button>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-bold">
                  <span>بواسطة المعلم: <strong className="text-slate-800">{project.artisanName}</strong></span>
                  <span className="flex items-center gap-0.5 text-slate-400">
                    <MapPin className="w-3 h-3" />
                    {project.city}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal detail drawer */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-indigo-950/80 backdrop-blur-sm"
            />

            {/* Content box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full z-10 border border-slate-200"
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-video w-full bg-slate-900 relative">
                <img
                  src={activeProject.imageUrl}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute right-4 bottom-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg">
                  {getCategoryLabel(activeProject.category)}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-sans">{activeProject.title}</h3>
                    <div className="flex items-center gap-2.5 text-xs text-slate-500 font-bold mt-1">
                      <span className="flex items-center gap-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {activeProject.city}
                      </span>
                      <span>•</span>
                      <span>بإشراف المعلم: <strong className="text-slate-800">{activeProject.artisanName}</strong></span>
                    </div>
                  </div>
                  
                  <span className="bg-rose-50 text-rose-600 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    {activeProject.likes} إعجاب
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {activeProject.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-400 font-semibold">
                    هل أعجبك هذا العمل وتبحث عن جودة مماثلة لبيتك؟
                  </div>
                  <button
                    onClick={() => {
                      onContactArtisan(activeProject.artisanName);
                      setActiveProject(null);
                    }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    تواصل مع {activeProject.artisanName}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
