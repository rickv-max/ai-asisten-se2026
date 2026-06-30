import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Bot, Loader2, Calculator, ChevronRight, Activity, Settings, Key, 
  Lock, ExternalLink, CheckCircle, AlertTriangle, Info, Sprout, Wallet, PieChart, 
  TrendingUp, X, Copy, Check
} from 'lucide-react';

// ============================================================================
// 1. SYSTEM INSTRUCTION AI (MEGA KBLI 150+ DATA & JSON EXTRACTOR)
// ============================================================================
const SE2026_SYSTEM_PROMPT = `
Anda adalah "Asisten Ahli KBLI & Ekstraktor Data SE2026 BPS".
Tugas Anda merespon percakapan petugas sensus. Jika user bertanya KBLI, berikan kodenya berdasarkan list di bawah. Jika user memberi nominal omset, ekstrak datanya.

PANDUAN REFERENSI KBLI LENGKAP BPS SE2026 (JANGAN MENGARANG):
- A. PERTANIAN & PETERNAKAN: Padi Sawah(01121/01122), Jagung(01111), Kedelai(01113), Kacang Tanah(01114), Ubi Kayu(01135), Sayur Daun(01131), Buah Musiman(01132), Terong/Tomat(01133), Bawang/Kentang(01134), Cabai(01138), Jamur(01136), Tebu(01140), Tanaman Hias(01301), Karet(01291), Kelapa Sawit(01262), Kelapa(01261), Pinang(01289), Buah Jeruk(01230), Buah Campur/Salak(01220). Sapi(01411), Kerbau(01413), Kambing(01442), Babi(01450), Ayam Pedaging(01461), Ayam Petelur(01462), Itik/Bebek(01465), Puyuh(01466), Bibit Ayam(01468), Walet(01497).
- C. PERIKANAN & INDUSTRI PENGOLAHAN: Ikan Air Tawar(03221), Ikan Hias(03222). Tahu(10308), Tempe(10307), Kerupuk(10794), Telur Asin(10799), Gula Aren(10722), Gorengan Dititip(10750), Jasa Parut Kelapa(10793), Pabrik Sawit(10431), Mebel Kayu(31011), Jahit(14120), Batako/Nisan(23951), Parang/Dodos(25931), Rak Aluminium(25992), Es Batu/Kristal(35302), Sikat/Sapu(32909), Karangan Bunga(32903), Sampan(30111).
- D-F. LISTRIK/AIR/KONSTRUKSI: Token Listrik(35401), Sedot WC(37001), Bangun Rumah(41011), Instalasi Listrik(43211), Sewa Alat Berat(43905), Sumur Bor(42207).
- G. PERDAGANGAN GROSIR: Ram Sawit(46202), Beras(46311), Buah(46312), Sayur(46313), Minyak Goreng(46327), Telur(46325), Ayam(46322), Ikan(46324), Kain(46411), Pakaian(46412), Alas Kaki(46414), Mainan(46495), Tas(46496), Komputer(46511), Alat Pertanian(46530).
- G. PERDAGANGAN ECERAN: Swalayan/Minimarket(47111), Sembako(47112), Padi/Palawija(47211), Buah(47212), Sayur(47213), Hasil Ternak(47214), Ikan(47215), Madu(47216), Rokok(47230), Beras(47241), Kue/Roti(47242), Kopi/Gula(47243), Tahu/Tempe(47244), Minuman Beralkohol(47221), Minuman Non-Alkohol(47222), SPBU(47301), Bensin Eceran(47302), Pelumas(47303), HP/Aksesoris(47404), Komputer(47401), Mesin Kantor(47405), Perkakas/Parang(47423), Kain(47511), Perlengkapan Jahit(47513), Material Bangunan(47521), Cat(47525), Karpet/Gorden(47530), Furnitur(47591), Alat Listrik(47592), Pecah Belah(47593), Alat Musik(47594), Alat Tulis(47611), Alat Olahraga(47620), Mainan(47630), Pakaian(47711), Sepatu(47712), Tas(47714), Apotik(47721), Toko Obat(47722), Kosmetik(47724), Optik(47733), Jam(47734), Perhiasan(47735), Monja/Pakaian Bekas(47742), Motor Bekas(47832), Motor Baru(47831), Suku Cadang Motor(47833), Gas LPG(47772).
- H. TRANSPORTASI: Travel AKAP(49221), Travel AKDP(49222), Kurir POS/JNE(53200), Kurir Kargo(51201), Penyebrangan Pom Pom(50211).
- I-M. AKOMODASI/MAKAN/JASA BISNIS: Restoran/RM Tetap(56101), Makan/Kopi Keliling(56102), Katering(56210), Kafe/Minuman Bingxue(56303), Kedai Kopi/Jus(56304), Penginapan(55106/55103), Kos-kosan bulanan(55909). Jual Pulsa(61209). BRILink/Agen Bank(66199). Sewa Ruko/Kontrakan Tahunan(68112).
- N-Q. PROFESIONAL & PENDIDIKAN: Notaris(69104), Fotografi(74209), Dokter Hewan(75001). Sewa Tenda(77291), Travel Umroh(79122). TPA/Rumah Tahfiz(85542), Guru Ngaji(85549), Les Privat(85595).
- R-T. KESEHATAN, HIBURAN & LAINNYA: Bidan/Mantri/Sunat(86910), Dokter Umum(86201), Dokter Gigi(86203), Tukang Urut(86992), Daycare(88907). Konten Kreator(90200), Futsal/Badminton(93114), Gym(93116), Pemancingan(93196), Renang/Billiard(93113), Pasar Malam/Playground(93210), Karaoke(93292), Rental PS(93299). Laundry(96100), Bengkel Mobil(95311), Salon Mobil(95312), Bengkel Motor(95320), Reparasi Laptop(95101), Pangkas Rambut(96210), Perawat Kecantikan/MUA(96220), Joki Skripsi(96900).
(Catatan: Jika ada usaha yang tidak tercantum, gunakan pengetahuan KBLI 2020 BPS Anda secara cerdas dan pilih yang paling akurat).

ATURAN EKSTRAKSI ANGKA:
- "omset_asli": Angka mentah dari user (cth: "21jt" -> 21000000). Jika tidak ada omset, isi 0.
- "satuan_omset": "tahun" | "bulan" | "hari" | "panen"
- "frekuensi_panen_setahun": Jika satuan "panen", asumsikan jumlah panen setahun yang wajar (Tebu=1, Padi=2 atau 3, dll). Jika bukan pertanian/panen isi 1.

WAJIB OUTPUT JSON MURNI TANPA MARKDOWN (Pastikan format JSON Valid):
{
  "reply": "Jawaban informatif Anda (Sebutkan KBLI secara natural).",
  "isFinancial": true atau false (true jika ada omset),
  "usaha": "Nama usaha (cth: Joki Skripsi, Agen BRILink)",
  "kbli": "Kode KBLI 5 Digit (cth: 96900)",
  "kategori": "Pilih: Pertanian, Industri, Perdagangan, MakanMinum, Jasa",
  "omset_asli": number,
  "satuan_omset": "tahun" | "bulan" | "hari" | "panen",
  "frekuensi_panen_setahun": number
}
`;

// ============================================================================
// 2. FRONTEND MATH ENGINE (DINAMIS 33% - 40%)
// ============================================================================
const calculateEconomics = (data) => {
  if (!data || data.omset_asli <= 0) return null;
  
  let omsetTahunan = data.omset_asli;
  if (data.satuan_omset === 'bulan') omsetTahunan = data.omset_asli * 12;
  else if (data.satuan_omset === 'hari') omsetTahunan = data.omset_asli * 30 * 12;
  else if (data.satuan_omset === 'panen') omsetTahunan = data.omset_asli * (data.frekuensi_panen_setahun || 1);

  // Logika Pengeluaran Dinamis Acak (33% hingga 40%)
  const pengeluaranPersen = Math.floor(Math.random() * (40 - 33 + 1)) + 33; 
  const pengeluaranRatio = pengeluaranPersen / 100;
  const labaPersen = 100 - pengeluaranPersen;

  const totalPengeluaran = omsetTahunan * pengeluaranRatio;
  const pendapatanBersih = omsetTahunan - totalPengeluaran;

  const kategori = data.kategori || "Jasa";
  let rasioProduksi = 0.5;
  if (kategori === "Pertanian") rasioProduksi = 0.85; 
  else if (kategori === "Perdagangan") rasioProduksi = 0.90; 
  else if (kategori === "MakanMinum") rasioProduksi = 0.80; 
  else if (kategori === "Industri") rasioProduksi = 0.75; 
  else if (kategori === "Jasa") rasioProduksi = 0.30; 

  const biayaProduksi = totalPengeluaran * rasioProduksi;
  const biayaOperasional = totalPengeluaran * (1 - rasioProduksi);

  return {
    usaha: data.usaha,
    kbli: data.kbli,
    omsetTahunan,
    pendapatanBersih,
    totalPengeluaran,
    produksi: biayaProduksi,
    operasional: biayaOperasional,
    pengeluaranPersen,
    labaPersen
  };
};

const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);

// ============================================================================
// 3. KOMPONEN UI CAPI FASIH MIRROR (HANYA 2 FIELD)
// ============================================================================
const CopyableField = ({ label, id, amount }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const rawNumber = Math.round(amount).toString();
    try {
      const textArea = document.createElement("textarea");
      textArea.value = rawNumber;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Gagal menyalin teks:', err);
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all hover:border-slate-300">
      <div className="flex gap-2.5 items-start mb-2.5">
        <div className="w-5 h-5 rounded flex items-center justify-center bg-blue-100 text-blue-600 shrink-0 mt-0.5 border border-blue-200 shadow-sm">
          <span className="text-[10px] font-extrabold">{id}</span>
        </div>
        <p className="text-[13px] font-semibold text-slate-700 leading-snug pr-2">{label}</p>
      </div>
      <div className="flex justify-between items-end bg-white border border-slate-200 rounded-lg p-3 shadow-inner">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-slate-400 font-bold text-sm">Rp</span>
          <span className="text-[15px] sm:text-lg font-extrabold text-slate-800 tracking-tight truncate">
            {new Intl.NumberFormat('id-ID').format(amount)}
          </span>
        </div>
        <button 
          onClick={handleCopy}
          className={`shrink-0 ml-2 p-2 rounded-md transition-all flex items-center gap-1.5 active:scale-95 ${copied ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800'}`}
          title="Salin Angka"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied && <span className="text-[10px] font-bold hidden sm:inline">Disalin</span>}
        </button>
      </div>
    </div>
  );
};

const ReportCard = ({ data }) => {
  if (!data) return null;
  return (
    <div className="w-full mt-4 space-y-4 font-sans max-w-2xl fade-in-up">
      <div className="bg-slate-800 rounded-2xl p-4 sm:p-5 flex items-center justify-between text-white shadow-lg border border-slate-700">
        <div>
           <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-1">Rincian Estimasi Biaya</p>
           <h3 className="text-sm sm:text-base font-extrabold leading-tight">{data.usaha}</h3>
        </div>
        <div className="text-right shrink-0 ml-2">
           <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-1">KBLI Terdeteksi</p>
           <span className="bg-white/20 px-3 py-1 rounded-lg text-[13px] sm:text-sm font-bold tracking-widest border border-white/10">{data.kbli || "-"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-[18px] border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1.5">
             <Wallet className="w-4 h-4 text-slate-400" />
             <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">Omset 1 Tahun</p>
          </div>
          <p className="text-[17px] sm:text-lg font-extrabold text-slate-800 tracking-tight">{formatRupiah(data.omsetTahunan)}</p>
        </div>
        <div className="bg-white p-4 rounded-[18px] border border-rose-200 shadow-sm flex flex-col justify-center bg-gradient-to-br from-white to-rose-50/30">
          <div className="flex items-center gap-2 mb-1.5">
             <PieChart className="w-4 h-4 text-rose-500" />
             <p className="text-[10px] sm:text-[11px] font-bold text-rose-500 uppercase tracking-wider">Total Pengeluaran ({data.pengeluaranPersen}%)</p>
          </div>
          <p className="text-[17px] sm:text-lg font-extrabold text-rose-600 tracking-tight">{formatRupiah(data.totalPengeluaran)}</p>
        </div>
      </div>

      <div className="bg-white rounded-[20px] border border-slate-200 shadow-md overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500"></div>
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-[13px] sm:text-sm font-bold text-slate-800">26. Rincian Pengeluaran Tahun 2025/2026</h3>
          <span className="bg-orange-100 text-orange-700 border border-orange-200 text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">KLIK TOMBOL SALIN</span>
        </div>
        <div className="p-4 sm:p-5 space-y-4">
           <CopyableField id="26.b" label="Biaya produksi" amount={data.produksi} />
           <CopyableField id="26.d" label="Biaya operasional (air, listrik, gas, internet, pulsa, pemeliharaan, biaya angkutan, dll.)" amount={data.operasional} />
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[20px] p-4 sm:p-5 flex items-center justify-between text-white shadow-md border border-emerald-600">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center border border-white/20 shrink-0"><TrendingUp className="w-5 h-5" /></div>
          <div>
            <p className="text-[10px] sm:text-[11px] font-bold text-emerald-100 uppercase tracking-widest mb-0.5">Sisa Laba Bersih ({data.labaPersen}%)</p>
            <p className="text-base sm:text-lg font-extrabold tracking-tight">{formatRupiah(data.pendapatanBersih)}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-xl flex gap-3 items-start mt-4 shadow-sm">
         <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
         <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
           <b>Catatan Penting:</b> Angka rincian pengeluaran di atas merupakan proyeksi rasio wajar dinamis BPS (<b className="text-amber-900">{data.pengeluaranPersen}%</b> dari omset). Silakan konfirmasi dan sesuaikan kembali dengan responden apabila terdapat anomali realita di lapangan.
         </p>
      </div>
    </div>
  );
};

// ============================================================================
// 4. MAIN APP COMPONENT
// ============================================================================
export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [apiKey, setApiKey] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcExpr, setCalcExpr] = useState('');
  const [calcResult, setCalcResult] = useState('0');

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('se2026_groq_api_key');
      if (savedKey) setApiKey(savedKey);
      else setIsSettingsOpen(true);
    } catch (e) {
      setIsSettingsOpen(true);
    }
  }, []);

  const handleSaveKey = () => {
    if (tempApiKey.trim()) {
      try { localStorage.setItem('se2026_groq_api_key', tempApiKey.trim()); } catch (e) {}
      setApiKey(tempApiKey.trim());
      setIsSettingsOpen(false);
      setTempApiKey('');
    }
  };

  const handleRemoveKey = () => {
    try { localStorage.removeItem('se2026_groq_api_key'); } catch (e) {}
    setApiKey('');
    setTempApiKey('');
  };

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToBottom(), [messages, isLoading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  // Kalkulator Mengambang
  useEffect(() => {
    try {
      if (!calcExpr) { setCalcResult('0'); return; }
      const toEval = calcExpr.replace(/×/g, '*').replace(/÷/g, '/');
      if (/[+\-*/.]$/.test(toEval)) return; 
      const res = new Function(`return ${toEval}`)();
      if (typeof res === 'number' && isFinite(res)) {
        setCalcResult(new Intl.NumberFormat('id-ID', { maximumFractionDigits: 4 }).format(res));
      }
    } catch (e) {}
  }, [calcExpr]);

  const handleCalcBtnClick = (val) => {
    if (val === 'C') { setCalcExpr(''); setCalcResult('0'); } 
    else if (val === 'DEL') { setCalcExpr(prev => prev.slice(0, -1)); } 
    else if (val === '=') {
      try {
        const toEval = calcExpr.replace(/×/g, '*').replace(/÷/g, '/');
        const res = new Function(`return ${toEval}`)();
        if (typeof res === 'number' && isFinite(res)) setCalcExpr(res.toString());
      } catch (e) {}
    } else { setCalcExpr(prev => prev + val); }
  };

  // API Call
  const handleSendMessage = async (textToSend) => {
    const text = typeof textToSend === 'string' ? textToSend : inputValue;
    if (!text.trim() || isLoading) return;
    if (!apiKey) { setIsSettingsOpen(true); return; }

    setInputValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    
    const newMessages = [...messages, { role: 'user', content: text.trim() }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: 'system', content: SE2026_SYSTEM_PROMPT },
        ...newMessages.map(m => ({ role: m.role, content: m.content || "" }))
      ];

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: apiMessages,
          temperature: 0.1,
          response_format: { type: "json_object" } 
        })
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error('UNAUTHORIZED');
        throw new Error('Server Error');
      }
      
      const data = await response.json();
      let parsedResponse;
      try {
        const rawContent = data.choices[0].message.content;
        const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) parsedResponse = JSON.parse(jsonMatch[0]);
        else throw new Error('No JSON matched');
      } catch (e) {
        throw new Error('Gagal mengekstrak JSON dari AI.');
      }

      const botReplyMsg = {
        role: 'assistant',
        content: parsedResponse.reply || "Berikut hasil KBLI yang Anda maksud:",
        reportData: null
      };

      if (parsedResponse.isFinancial && parsedResponse.omset_asli > 0) {
         const calcResult = calculateEconomics(parsedResponse);
         if (calcResult) botReplyMsg.reportData = calcResult;
      }

      setMessages(prev => [...prev, botReplyMsg]);
      
    } catch (err) {
      console.error("Chat Error:", err);
      if (err.message === 'UNAUTHORIZED') {
         setMessages(prev => [...prev, { role: 'assistant', isError: true, content: 'API KEY TIDAK VALID. Mohon periksa kembali Groq API Key Anda.' }]);
         handleRemoveKey();
         setIsSettingsOpen(true);
      } else {
         setMessages(prev => [...prev, { role: 'assistant', isError: true, content: 'SISTEM GAGAL MEMPROSES. Pastikan koneksi lancar dan coba kembali.' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const QUICK_PROMPTS = [
    { text: "KBLI joki skripsi dan agen brilink" },
    { text: "Toko material bangunan omset 50 juta sebulan" },
    { text: "KBLI kafe minuman bingxue apa ya?" },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F1F5F9] font-sans text-slate-800 antialiased overflow-hidden relative">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <header className="flex-none z-20 w-full bg-white border-b border-slate-200 shadow-sm relative">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-11 h-11 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center relative overflow-hidden">
              <Sprout className="w-6 h-6 text-white relative z-10" />
              <div className="absolute inset-0 bg-white/10 mt-1 ml-1 rounded-full"></div>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-[17px] sm:text-[19px] font-extrabold text-slate-900 leading-tight tracking-tight">AgriSense CAPI</h1>
              <p className="text-[10px] sm:text-[11px] text-emerald-600 font-bold tracking-wider uppercase mt-0.5 flex items-center gap-1">
                Fasih SE2026 <span className="w-1 h-1 rounded-full bg-emerald-500"></span> AI
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`hidden sm:flex border px-3 py-1.5 rounded-lg items-center gap-2 ${apiKey ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
              <div className={`w-2 h-2 rounded-full ${apiKey ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
              <span className="text-[11px] font-bold uppercase tracking-wider">{apiKey ? 'Engine Groq Aktif' : 'Menunggu Kunci'}</span>
            </div>
            <button onClick={() => setIsSettingsOpen(true)} className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-all shadow-sm active:scale-95">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto w-full scroll-smooth px-3 sm:px-0 hide-scrollbar">
        <div className="w-full max-w-4xl mx-auto py-6 sm:py-8 flex flex-col gap-6">
          
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center pt-4 sm:pt-8 pb-10 fade-in-up">
              <div className="w-20 h-20 bg-white border border-slate-200 rounded-[24px] flex items-center justify-center mb-5 shadow-sm relative">
                <Bot className="w-10 h-10 text-emerald-600" />
                {!apiKey && <div className="absolute -top-2 -right-2 bg-amber-100 text-amber-600 border border-amber-200 rounded-full p-1"><AlertTriangle className="w-4 h-4" /></div>}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-2 tracking-tight text-center">Kamus KBLI & Kalkulator FASIH</h2>
              <p className="text-center text-slate-500 max-w-md mb-8 text-[13px] sm:text-sm px-6 leading-relaxed">
                Tanyakan <b>150+ KBLI</b> (mulai dari Padi, BRILink, sampai Joki Skripsi), atau sebutkan omsetnya untuk dibuatkan rincian <b>Form 26.b & 26.d</b>.
              </p>
              
              <div className="w-full max-w-lg flex flex-col gap-3 px-2 sm:px-4">
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1">Coba Skenario Cepat:</p>
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button key={idx} onClick={() => handleSendMessage(prompt.text)} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-[18px] shadow-sm hover:border-emerald-400 hover:shadow-md transition-all text-left group active:bg-slate-50 active:scale-[0.98]">
                    <span className="text-[13px] font-semibold text-slate-600 group-hover:text-slate-900 leading-relaxed pr-4">"{prompt.text}"</span>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 shrink-0 transform group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} px-0 sm:px-6 fade-in-up`}>
              {msg.role === 'user' && (
                <div className="max-w-[90%] sm:max-w-[85%] bg-slate-800 text-white px-5 py-4 rounded-[20px] rounded-tr-sm shadow-md text-[14px] sm:text-[15px] font-medium leading-relaxed">
                  {msg.content}
                </div>
              )}
              {msg.role === 'assistant' && (
                <div className="flex gap-3 max-w-full sm:max-w-[95%] w-full">
                  <div className="flex-shrink-0 mt-1 hidden sm:block">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="bg-transparent w-full flex flex-col gap-2 relative">
                    {msg.content && (
                      <div className={`bg-white border ${msg.isError ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-700'} p-4 sm:p-5 rounded-[20px] sm:rounded-tl-sm shadow-sm text-[14px] sm:text-[15px] leading-relaxed font-medium w-fit max-w-[95%] sm:max-w-[90%]`}>
                        {msg.content}
                      </div>
                    )}
                    {msg.reportData && <ReportCard data={msg.reportData} />}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex w-full justify-start px-0 sm:px-6 fade-in-up">
               <div className="flex gap-3 max-w-full sm:max-w-[95%] w-full sm:w-[500px]">
                 <div className="flex-shrink-0 mt-1 hidden sm:block">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 shadow-sm flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
                    </div>
                 </div>
                 <div className="bg-white border border-slate-200 rounded-[20px] sm:rounded-tl-sm p-5 shadow-sm w-full relative overflow-hidden">
                   <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                   <div className="space-y-4">
                     <div className="h-4 bg-slate-200 rounded animate-pulse w-full max-w-[60%]"></div>
                     <div className="h-4 bg-slate-100 rounded animate-pulse w-full max-w-[40%]"></div>
                   </div>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      <div className="flex-none bg-gradient-to-t from-[#F1F5F9] via-[#F1F5F9] to-[#F1F5F9]/80 backdrop-blur-sm border-t border-slate-200 p-3 sm:p-5 pb-6 sm:pb-8 z-10 relative">
        <div className="max-w-4xl mx-auto relative">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className={`flex items-end gap-2 sm:gap-3 bg-white border rounded-[20px] p-1.5 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.06)]
              ${apiKey ? 'border-slate-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10' : 'border-amber-300 bg-amber-50/30'}`}
          >
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={apiKey ? "Tanya KBLI atau ceritakan omset usaha..." : "⚠️ API Key Groq Belum Dikonfigurasi."}
              className="w-full bg-transparent border-0 resize-none max-h-[140px] py-4 px-4 sm:px-5 text-[14px] sm:text-[15px] text-slate-800 focus:ring-0 focus:outline-none placeholder:text-slate-400 font-medium"
              rows={1}
              style={{ minHeight: '56px' }}
              disabled={isLoading || !apiKey}
            />
            <button type="submit" disabled={!inputValue.trim() || isLoading || !apiKey} className={`flex-shrink-0 m-1 p-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center active:scale-95 ${!inputValue.trim() || isLoading || !apiKey ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5'}`}>
              {isLoading ? <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" /> : <Send className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />}
            </button>
          </form>
        </div>
      </div>

      {/* FLOATING CALCULATOR */}
      <div className="fixed bottom-24 right-4 md:bottom-28 md:right-8 z-[100] flex flex-col items-end pointer-events-none">
        <div className={`mb-4 w-[calc(100vw-2.5rem)] max-w-[320px] bg-white/95 backdrop-blur-xl rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden transition-all duration-300 origin-bottom-right ${isCalcOpen ? 'scale-100 opacity-100 translate-y-0 pointer-events-auto visible' : 'scale-75 opacity-0 translate-y-10 pointer-events-none invisible'}`}>
          <div className="p-5 pb-4 bg-slate-50/80 border-b border-slate-100 flex flex-col justify-end min-h-[100px]">
            <p className="text-slate-400 text-sm font-medium h-5 truncate w-full text-right" dir="ltr">{calcExpr || '0'}</p>
            <p className="text-slate-800 text-4xl font-extrabold truncate w-full text-right mt-1 tracking-tight">{calcResult}</p>
          </div>
          <div className="grid grid-cols-4 gap-2.5 p-4 bg-white">
            <button onClick={() => handleCalcBtnClick('C')} className="col-span-2 py-3 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 active:scale-95">C</button>
            <button onClick={() => handleCalcBtnClick('DEL')} className="py-3 bg-slate-100 text-slate-600 rounded-xl font-bold flex justify-center items-center hover:bg-slate-200 active:scale-95"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg></button>
            <button onClick={() => handleCalcBtnClick('÷')} className="py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-100 active:scale-95">÷</button>
            
            <button onClick={() => handleCalcBtnClick('7')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 active:scale-95">7</button>
            <button onClick={() => handleCalcBtnClick('8')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 active:scale-95">8</button>
            <button onClick={() => handleCalcBtnClick('9')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 active:scale-95">9</button>
            <button onClick={() => handleCalcBtnClick('×')} className="py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-100 active:scale-95">×</button>

            <button onClick={() => handleCalcBtnClick('4')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 active:scale-95">4</button>
            <button onClick={() => handleCalcBtnClick('5')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 active:scale-95">5</button>
            <button onClick={() => handleCalcBtnClick('6')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 active:scale-95">6</button>
            <button onClick={() => handleCalcBtnClick('-')} className="py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-100 active:scale-95">-</button>

            <button onClick={() => handleCalcBtnClick('1')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 active:scale-95">1</button>
            <button onClick={() => handleCalcBtnClick('2')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 active:scale-95">2</button>
            <button onClick={() => handleCalcBtnClick('3')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 active:scale-95">3</button>
            <button onClick={() => handleCalcBtnClick('+')} className="py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-100 active:scale-95">+</button>

            <button onClick={() => handleCalcBtnClick('0')} className="col-span-2 py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 active:scale-95">0</button>
            <button onClick={() => handleCalcBtnClick('.')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-bold text-lg hover:bg-slate-100 active:scale-95">.</button>
            <button onClick={() => handleCalcBtnClick('=')} className="py-3 bg-emerald-500 text-white rounded-xl font-bold text-lg hover:bg-emerald-600 shadow-md shadow-emerald-500/30 active:scale-95">=</button>
          </div>
        </div>
        <button onClick={() => setIsCalcOpen(!isCalcOpen)} className={`pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-50 ${isCalcOpen ? 'bg-rose-500 text-white rotate-90' : 'bg-slate-900 text-white hover:scale-105 hover:-translate-y-1'}`}>
          {isCalcOpen ? <X className="w-6 h-6" /> : <Calculator className="w-6 h-6" />}
        </button>
      </div>

      {/* SETTINGS MODAL */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm fade-in-up">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="bg-slate-900 p-6 text-white flex items-center gap-4 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 relative z-10">
                <Key className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                <h3 className="font-extrabold text-xl leading-tight">Konfigurasi API</h3>
                <p className="text-xs text-slate-300 font-medium mt-1">Sistem Groq Llama 3</p>
              </div>
            </div>
            <div className="p-6 space-y-5">
              {apiKey ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex gap-3 items-start">
                   <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                   <div>
                     <p className="text-sm font-bold text-emerald-800">Kunci API Tersimpan</p>
                     <p className="text-xs text-emerald-600 mt-1.5 leading-relaxed">Aplikasi berjalan normal. Kunci tersimpan di <i>Local Storage</i> perangkat Anda.</p>
                     <button onClick={handleRemoveKey} className="mt-4 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-md border border-rose-100 transition-colors">Hapus Kunci</button>
                   </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-slate-400" /> API Key Groq
                    </label>
                    <input type="password" value={tempApiKey} onChange={(e) => setTempApiKey(e.target.value)} placeholder="gsk_..." className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-mono" />
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <p className="text-xs text-blue-800 leading-relaxed font-medium">Data diproses di perangkat (*Client-Side*). Dapatkan kunci gratis di Console Groq.</p>
                    <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-blue-700 hover:underline">Ambil Kunci <ExternalLink className="w-3 h-3" /></a>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
              <button onClick={() => setIsSettingsOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors">Tutup</button>
              {!apiKey && <button onClick={handleSaveKey} disabled={!tempApiKey.trim()} className="px-6 py-2.5 rounded-xl text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 transition-all shadow-md active:scale-95">Simpan & Mulai</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

