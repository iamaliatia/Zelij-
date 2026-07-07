import { Artisan, JobRequest, ProjectShowcase } from './types';

export const CITIES = [
  'الدار البيضاء',
  'مراكش',
  'فاس',
  'سلا',
  'الرباط',
  'طنجة',
  'أكادير',
  'مكناس',
  'وجدة',
  'تطوان',
  'القنيطرة'
];

export const SPECIALTY_LABELS: Record<string, string> = {
  zellige: 'معلم زليج بلدي وعصري',
  marble: 'حرفي تركيب الرخام والجرانيت',
  bricklayer: 'بناء طوب (ياجور) وجدران',
  formwork: 'مقاول شدة خشبية (كوفراج)',
  general_construction: 'أعمال البناء والتشطيبات العامة'
};

export const INITIAL_ARTISANS: Artisan[] = [
  {
    id: 'artisan-1',
    name: 'محمد خيبو',
    phone: '+212 606-634999',
    city: 'الدار البيضاء',
    specialty: 'zellige',
    rating: 4.9,
    bio: 'متخصص في الزليج المغربي التقليدي والفسيفساء اليدوية، خبرة أكثر من 15 سنة في تزيين القصور والرياضات والحمامات البلدية في الدار البيضاء ومختلف المدن.',
    completedProjectsCount: 42,
    yearsOfExperience: 15,
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
    skills: ['زليج بلدي', 'فسيفساء مغربية', 'حمامات بلدية', 'بلاط عصري', 'تصاميم أندلسية'],
    isAvailable: true,
    verified: true
  },
  {
    id: 'artisan-2',
    name: 'علي الفاسي',
    phone: '+212 710-862341',
    city: 'فاس',
    specialty: 'general_construction',
    rating: 4.6,
    bio: 'حرايفي في أعمال البناء والترميم والتشطيبات العامة. أعمل مع فريق متكامل ومستعد للتنقل لجميع المدن للعمل في الأوراش الكبرى والمتوسطة.',
    completedProjectsCount: 18,
    yearsOfExperience: 6,
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
    skills: ['ترميم المنازل', 'أعمال المحارة (المرطوب)', 'بناء الأساسات', 'مساعد بناء محترف'],
    isAvailable: true,
    verified: false
  },
  {
    id: 'artisan-3',
    name: 'أمين المراكشي',
    phone: '+212 625-801913',
    city: 'مراكش',
    specialty: 'bricklayer',
    rating: 4.8,
    bio: 'أخصائي بناء الطوب والياجور الأحمر وبناء الأسوار والفيلات بدقة متناهية وسرعة في الإنجاز. نلتزم بمعايير الهندسة والأمان.',
    completedProjectsCount: 29,
    yearsOfExperience: 10,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    skills: ['بناء الياجور الأحمر', 'بناء طوب أسمنتي', 'عزل الجدران', 'حساب تكاليف المواد'],
    isAvailable: true,
    verified: true
  },
  {
    id: 'artisan-4',
    name: 'سفيان السلاوي',
    phone: '+212 777-193998',
    city: 'سلا',
    specialty: 'formwork',
    rating: 4.7,
    bio: 'مقاول ومعلم كوفراج (الشدة الخشبية والخرسانة المسلحة). نقوم بدراسة المخططات الهندسية وتنفيذ الخرسانة للأسقف والأعمدة والقواعد بجودة عالية.',
    completedProjectsCount: 31,
    yearsOfExperience: 12,
    avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80',
    skills: ['شدة خشبية فلات سلاب', 'كوفراج الأعمدة', 'صب الخرسانة المسلحة', 'قراءة المخططات الهندسية'],
    isAvailable: false,
    verified: true
  },
  {
    id: 'artisan-5',
    name: 'مصطفى الرخامي',
    phone: '+212 636-662697',
    city: 'الرباط',
    specialty: 'marble',
    rating: 4.9,
    bio: 'فني متخصص في تفصيل وتركيب الرخام والجرانيت للمطابخ، الأدراج، الأرضيات والواجهات الخارجية. دقة متناهية في التشطيب وقطع الليزر.',
    completedProjectsCount: 38,
    yearsOfExperience: 14,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    skills: ['تركيب الرخام المستورد', 'تفصيل مطابخ جرانيت', 'تركيب أدراج الرخام', 'جلي وتلميع الرخام'],
    isAvailable: true,
    verified: true
  }
];

export const INITIAL_JOBS: JobRequest[] = [
  {
    id: 'job-1',
    title: 'مطلوب فريق بناية طوب (ياجور) لفيلا بمراكش',
    description: 'نبحث عن معلم بناء ياجور أحمر محترف مع مساعدين لتنفيذ جدران وقواطع لفيلا سكنية في مدينة مراكش (تاركة). العمل يتطلب السرعة والالتزام بالخيط والوزن المائي.',
    city: 'مراكش',
    budget: '23,000 درهم (شامل المواد)',
    specialtyRequired: 'bricklayer',
    postedBy: 'أبو فهد العقاري',
    phone: '+212 625-801913',
    date: '2026-07-06',
    status: 'open'
  },
  {
    id: 'job-2',
    title: 'مطلوب معلم كوفراج (شدة خشبية) لورش بسلا',
    description: 'نبحث عن معلم كوفراج متمكن لقراءة مخطط فيلا سكنية وبناء قوالب الخرسانة للأسقف والأعمدة بمدينة سلا الجديدة. يفضل من لديه فريق جاهز ومعدات متكاملة.',
    city: 'سلا',
    budget: 'اتفاق مالي مغري',
    specialtyRequired: 'formwork',
    postedBy: 'المقاول رشيد',
    phone: '+212 777-193998',
    date: '2026-07-05',
    status: 'open'
  },
  {
    id: 'job-3',
    title: 'بريكول زليج بلدي وصالون مغربي بالدار البيضاء',
    description: 'صالون مغربي تقليدي يحتاج لإعادة تبليط بالزليج البلدي المنقوش يدوياً مقاس 10x10 بالإضافة لحمام بلدي صغير. الورش جاهز بالمواد ونحتاج يد عاملة محترفة.',
    city: 'الدار البيضاء',
    budget: 'حسب المتر (سعر منافس)',
    specialtyRequired: 'zellige',
    postedBy: 'عثمان الدار البيضاء',
    phone: '+212 606-634999',
    date: '2026-07-04',
    status: 'open'
  },
  {
    id: 'job-4',
    title: 'مساعد بناء من فاس مستعد للتنقل والعمل',
    description: 'أنا مساعد بناء حرايفي نشيط ومجتهد من مدينة فاس، أبحث عن عمل مرافق لمعلم بناء أو مقاول. مستعد للسفر والعمل بجدية وأمانة.',
    city: 'فاس',
    budget: '150 درهم / اليوم',
    specialtyRequired: 'general_construction',
    postedBy: 'علي (مساعد بناء)',
    phone: '+212 710-862341',
    date: '2026-07-03',
    status: 'open'
  }
];

export const INITIAL_SHOWCASE: ProjectShowcase[] = [
  {
    id: 'show-1',
    title: 'تكسية واجهة صالون بزليج الفسيفساء الأندلسي',
    artisanName: 'محمد خيبو',
    artisanId: 'artisan-1',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80',
    category: 'zellige',
    city: 'الدار البيضاء',
    description: 'عمل يدوي دقيق استغرق 3 أسابيع لتركيب الفسيفساء المغربية بألوانها التقليدية الزرقاء والبيضاء والخضراء لصالون فيلا فاخرة.',
    likes: 84
  },
  {
    id: 'show-2',
    title: 'تركيب أرضية من الرخام الإيطالي الفاخر وجليها',
    artisanName: 'مصطفى الرخامي',
    artisanId: 'artisan-5',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    category: 'marble',
    city: 'الرباط',
    description: 'أرضية صالة استقبال كبرى مصنوعة من رخام الكرارة الإيطالي اللامع مع حزام أسود نيرو ماركينا الفخم لربط المساحة بشكل متناسق.',
    likes: 67
  },
  {
    id: 'show-3',
    title: 'بناء جدران وأقواس بياجور الـ 7 ثقوب بدقة هندسية',
    artisanName: 'أمين المراكشي',
    artisanId: 'artisan-3',
    imageUrl: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&auto=format&fit=crop&q=80',
    category: 'construction',
    city: 'مراكش',
    description: 'إنجاز هيكل جداري خارجي مائل وأقواس تقليدية باستخدام الياجور الأحمر من فئة 7 ثقوب، مع مراعاة الوزن والفتحات الدقيقة للأبواب والنوافذ.',
    likes: 53
  },
  {
    id: 'show-4',
    title: 'تصميم جدارية نافورة حديقة زليج بلدي أخضر ملكي',
    artisanName: 'محمد خيبو',
    artisanId: 'artisan-1',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    category: 'zellige',
    city: 'الدار البيضاء',
    description: 'نافورة حديقة مغربية بتصميم النجمة الأندلسية الشهيرة مع تبليط باللون الأخضر الملكي اللامع المقاوم للمياه والرطوبة.',
    likes: 112
  }
];
