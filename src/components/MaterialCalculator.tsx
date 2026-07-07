import { useState } from 'react';
import { Calculator, HelpCircle, Info, RefreshCw } from 'lucide-react';

export default function MaterialCalculator() {
  const [calcType, setCalcType] = useState<'brick' | 'zellige' | 'marble'>('brick');
  
  // Dimensions state
  const [length, setLength] = useState<string>('5');
  const [width, setWidth] = useState<string>('3');
  const [height, setHeight] = useState<string>('3'); // For brick walls (length * height)
  
  // Specific states
  const [brickType, setBrickType] = useState<'type7' | 'type12'>('type7');
  const [wastagePercent, setWastagePercent] = useState<number>(10);
  const [zelligeQuality, setZelligeQuality] = useState<'standard' | 'premium' | 'royal'>('premium');
  const [marbleType, setMarbleType] = useState<'carrara' | 'marquina' | 'local'>('local');

  // Calculations
  const calculateResults = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;

    if (calcType === 'brick') {
      // Brick walls: usually we calculate by surface area
      // Wall Area = length * height
      const area = l * h;
      // standard bricks per square meter:
      // class 7 (ياجور 7 ثقوب): approx 28-30 bricks per square meter (single layer 10cm wall)
      // class 12 (ياجور 12 ثقب): approx 45 bricks per square meter
      const bricksPerSqm = brickType === 'type7' ? 30 : 45;
      const baseBricksCount = area * bricksPerSqm;
      const totalBricks = Math.ceil(baseBricksCount * (1 + wastagePercent / 100));
      
      // Cost calculation based on chat: 12300 bricks of class 7 cost 23000 DH (approx 1.87 DH per brick)
      // Standard cost: class 7 = 1.9 DH per brick, class 12 = 3.5 DH per brick
      const pricePerBrick = brickType === 'type7' ? 1.87 : 3.40;
      const estimatedCost = totalBricks * pricePerBrick;

      // Mortar requirements (cement and sand)
      const cementBags = Math.ceil(area * 0.15); // bags per sqm
      const sandCubicMeters = (area * 0.02).toFixed(2);

      return {
        area: area.toFixed(1),
        mainCount: totalBricks,
        mainUnit: 'ياجورة',
        estimatedCost: Math.round(estimatedCost),
        materials: [
          { name: 'إسمنت (خنشة 50كغ)', quantity: cementBags, unit: 'خنشة' },
          { name: 'رمل بناء', quantity: sandCubicMeters, unit: 'متر مكعب' }
        ]
      };
    } else if (calcType === 'zellige') {
      // Zellige floors / walls: length * width
      const area = l * w;
      // Standard Zellige tiles (10x10 cm) is 100 tiles per square meter
      const tilesPerSqm = 100;
      const baseTilesCount = area * tilesPerSqm;
      const totalTiles = Math.ceil(baseTilesCount * (1 + wastagePercent / 100));

      // Zellige price per square meter in Morocco (traditional hand-cut zellige is premium)
      const priceMap = {
        standard: 150, // simple mosaic tiles (mural)
        premium: 280,  // custom hand-made zellige
        royal: 450     // intricate multi-color and special shapes
      };
      const pricePerSqm = priceMap[zelligeQuality];
      const estimatedCost = area * pricePerSqm;

      // Glue / cement needed
      const tileGlueBags = Math.ceil(area / 4); // 1 bag of glue covers approx 4 sqm

      return {
        area: area.toFixed(1),
        mainCount: totalTiles,
        mainUnit: 'قطعة زليج (10x10سم)',
        estimatedCost: Math.round(estimatedCost),
        materials: [
          { name: 'لاصق الزليج (Colle)', quantity: tileGlueBags, unit: 'خنشة 25كغ' },
          { name: 'إسمنت أبيض للمفاصل (Grout)', quantity: Math.ceil(area * 0.5), unit: 'كيلوغرام' }
        ]
      };
    } else {
      // Marble (رخام) floors: length * width
      const area = l * w;
      
      // Cost per square meter based on type:
      const marblePriceMap = {
        local: 220,     // Local Moroccan marble (e.g., Ibiza, Griotte, Crema Marfil)
        carrara: 650,   // Imported Carrara white marble
        marquina: 450   // Nero Marquina black marble
      };
      
      const pricePerSqm = marblePriceMap[marbleType];
      const estimatedCost = area * pricePerSqm;
      
      // Approximate weight: 1 square meter of 2cm marble is approx 54kg (density 2700 kg/m3)
      const totalWeightKg = Math.round(area * 54);

      return {
        area: area.toFixed(1),
        mainCount: area.toFixed(1),
        mainUnit: 'متر مربع رخام',
        estimatedCost: Math.round(estimatedCost),
        materials: [
          { name: 'الوزن التقريبي للرخام', quantity: totalWeightKg, unit: 'كيلوغرام (قريب لـ ' + (totalWeightKg/1000).toFixed(1) + ' طن)' },
          { name: 'إسمنت رمادي للتركيب', quantity: Math.ceil(area * 0.4), unit: 'خنشة' },
          { name: 'رمل مغسول للفرش', quantity: (area * 0.04).toFixed(2), unit: 'متر مكعب' }
        ]
      };
    }
  };

  const results = calculateResults();

  const resetValues = () => {
    setLength('5');
    setWidth('3');
    setHeight('3');
    setWastagePercent(10);
  };

  return (
    <div id="material-calculator-section" className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
      <div className="bg-indigo-600 text-white p-6 relative overflow-hidden">
        {/* Abstract Moroccan geometric background decor */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />
        
        <div className="relative flex items-center justify-between">
          <div>
            <span className="bg-indigo-500/60 text-indigo-200 text-xs px-2.5 py-1 rounded-full font-medium inline-block mb-2">حرفي ذكي</span>
            <h3 className="text-xl font-bold font-sans flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-300" />
              حاسبة المواد والتقدير المالي للأوراش
            </h3>
            <p className="text-indigo-100 text-xs mt-1 max-w-lg">
              تقدير دقيق وذكي لكميات الياجور، الزليج والرخام مع حساب التكاليف التقريبية وفقاً للأسعار الجارية المتداولة في السوق المغربي.
            </p>
          </div>
          <button 
            onClick={resetValues}
            className="p-2 text-indigo-200 hover:text-white hover:bg-indigo-500/40 rounded-lg transition-colors"
            title="إعادة تعيين"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-x divide-slate-100">
        {/* Left Form: Inputs */}
        <div className="p-6 lg:col-span-5 space-y-6">
          {/* Select Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2.5">نوع العمل / الورش</label>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setCalcType('brick')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  calcType === 'brick'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                بناء الياجور (الآجر)
              </button>
              <button
                type="button"
                onClick={() => setCalcType('zellige')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  calcType === 'zellige'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                الزليج البلدي
              </button>
              <button
                type="button"
                onClick={() => setCalcType('marble')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  calcType === 'marble'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                الرخام والجرانيت
              </button>
            </div>
          </div>

          {/* Form Dimensions */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">المقاسات بالمتر (m)</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">الطول (Meters)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-left"
                  />
                  <span className="absolute left-3 top-2 text-xs text-slate-400 font-mono">متر</span>
                </div>
              </div>

              {calcType !== 'brick' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">العرض (Meters)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-left"
                    />
                    <span className="absolute left-3 top-2 text-xs text-slate-400 font-mono">متر</span>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">الارتفاع (Meters)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-left"
                    />
                    <span className="absolute left-3 top-2 text-xs text-slate-400 font-mono">متر</span>
                  </div>
                </div>
              )}
            </div>

            {/* Wastage slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                <span>نسبة الهدر الاحتياطية (الكسر والقطع)</span>
                <span className="text-indigo-600 font-mono font-bold">{wastagePercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="5"
                value={wastagePercent}
                onChange={(e) => setWastagePercent(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block mt-0.5">يُوصى بإضافة 10% لتعويض القطع عند الزوايا والنهايات.</span>
            </div>
          </div>

          {/* Conditional Options */}
          {calcType === 'brick' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">مواصفات الياجور</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100/50 rounded-xl border border-slate-200 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="brickType"
                    checked={brickType === 'type7'}
                    onChange={() => setBrickType('type7')}
                    className="accent-indigo-600 h-4 w-4"
                  />
                  <div className="flex-1 text-right">
                    <p className="text-xs font-bold text-slate-800">ياجور من فئة 7 ثقوب (Brique 7 Trous)</p>
                    <p className="text-[10px] text-slate-500">الأكثر استعمالاً لبناء الجدران الداخلية والخارجية الفاصلة.</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100/50 rounded-xl border border-slate-200 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="brickType"
                    checked={brickType === 'type12'}
                    onChange={() => setBrickType('type12')}
                    className="accent-indigo-600 h-4 w-4"
                  />
                  <div className="flex-1 text-right">
                    <p className="text-xs font-bold text-slate-800">ياجور من فئة 12 ثقوب (Brique 12 Trous)</p>
                    <p className="text-[10px] text-slate-500">أكثر سماكة وعزل للحرارة والصوت، ممتاز للجدران الخارجية للفيلات.</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {calcType === 'zellige' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">جودة وتصميم الزليج</h4>
              <div className="grid grid-cols-1 gap-2">
                <select
                  value={zelligeQuality}
                  onChange={(e: any) => setZelligeQuality(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                >
                  <option value="standard">زليج عادي (قص وتلوين مصنعي مبسط) - 150 درهم/م²</option>
                  <option value="premium">زليج بلدي ممتاز (نحت يدوي وفسيفساء فاسية) - 280 درهم/م²</option>
                  <option value="royal">زليج ملكي دقيق (نقوش أندلسية معقدة وتلوين خاص) - 450 درهم/م²</option>
                </select>
                <span className="text-[10px] text-slate-400 block">يشمل السعر تقدير اليد العاملة والمواد الأساسية.</span>
              </div>
            </div>
          )}

          {calcType === 'marble' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">نوع الرخام أو الجرانيت</h4>
              <div className="grid grid-cols-1 gap-2">
                <select
                  value={marbleType}
                  onChange={(e: any) => setMarbleType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                >
                  <option value="local">رخام محلي (إيبيزا / خنيفرة / رمادي تافراوت) - 220 درهم/م²</option>
                  <option value="marquina">رخام أسود نيرو ماركينا (Nero Marquina) - 450 درهم/م²</option>
                  <option value="carrara">رخام إيطالي كرارة أبيض فاخر (Carrara) - 650 درهم/م²</option>
                </select>
                <span className="text-[10px] text-slate-400 block">السعر يختلف بناء على سماكة اللوح (ستاندرد 2 سم) والفرز ونقاوة التعريق.</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Output: Results */}
        <div className="p-6 lg:col-span-7 bg-slate-50/50 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-200">النتائج التقديرية للورش</h4>
            
            {/* Main result badge */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100 flex flex-col justify-center">
                <span className="text-slate-500 text-xs font-semibold">المساحة الإجمالية المقدرة</span>
                <span className="text-2xl font-bold text-indigo-950 font-mono mt-1">
                  {results.area} <span className="text-xs font-semibold">متر مربع (m²)</span>
                </span>
              </div>

              <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 flex flex-col justify-center">
                <span className="text-slate-500 text-xs font-semibold">الكمية الرئيسية المطلوبة</span>
                <span className="text-2xl font-bold text-orange-900 font-mono mt-1">
                  {results.mainCount.toLocaleString()} <span className="text-xs font-semibold">{results.mainUnit}</span>
                </span>
              </div>
            </div>

            {/* Total Cost card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-slate-600 text-xs font-semibold">التكلفة التقريبية المقدرة للمواد واليد العاملة</h5>
                  <p className="text-3xl font-extrabold text-slate-900 font-mono mt-1.5">
                    {results.estimatedCost.toLocaleString()} <span className="text-sm font-bold text-indigo-600">درهم (MAD)</span>
                  </p>
                </div>
                <div className="bg-indigo-100 p-2 rounded-xl text-indigo-800">
                  <Calculator className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-slate-400">
                <Info className="w-3.5 h-3.5 text-indigo-600" />
                <span>الأسعار مبنية على تقديرات الورش الجارية في مجموعات الحرفيين، قد تختلف حسب المعلم وتفاصيل الموقع.</span>
              </div>
            </div>

            {/* Material breakdowns */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">المواد الإضافية واللوازم الموصى بها:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.materials.map((mat, i) => (
                  <div key={i} className="bg-white px-3 py-2.5 rounded-xl border border-slate-200/60 flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">{mat.name}</span>
                    <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                      {mat.quantity} {mat.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
            <div className="bg-orange-100 text-orange-800 p-2 rounded-full hidden sm:block">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700">تريد تواصل مباشر وتفاوض مع الحرفيين?</p>
              <p className="text-[10px] text-slate-400 mt-0.5">يمكنك نشر هذا الطلب مجاناً في قسم "طلبات العمل" ليتصل بك المعلمون المتاحون حالاً.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
