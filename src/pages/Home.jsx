import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  BsPrinter,
  BsBook,
  BsGraphUp,
  BsArrowRight,
  BsChevronDown,
  BsBuilding,
  BsCodeSquare,
  BsBrush,
  BsRulers,
  BsCreditCard,
  BsJournalBookmark,
  BsDisplay,
  BsGlobe,
  BsPlayCircle,
  BsStarFill,
  BsQuote,
  BsCamera
} from "react-icons/bs";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const studentsData = [
  { id: 1, name: "Нұрмағанбет Аян", img: "/img/student/Ayn.jpg", role: "Frontend Developer" },
  { id: 2, name: "Адамбаев Мади", img: "/img/student/madi3.jpg", role: "UI/UX Designer" },
  { id: 3, name: "Нурсултан Қуаныш", img: "/img/student/Kuanysh.jpg", role: "Fullstack Developer" },
  { id: 4, name: "Шерхан Нурназ", img: "/img/student/Nurnaz.png", role: "Graphic Designer" },
];

const aynPhotos = [
  "/img/works/Ayn/photo_1.jpg",
  "/img/works/Ayn/photo_2.jpg",
  "/img/works/Ayn/photo_3.jpg",
  "/img/works/Ayn/photo_4.jpg",
  "/img/works/Ayn/photo_5.jpg",
  "/img/works/Ayn/photo_6.jpg",
  "/img/works/Ayn/photo_7.jpg",
  "/img/works/Ayn/photo_8.jpg",
  "/img/works/Ayn/photo_9.jpg",
  "/img/works/Ayn/photo_10.jpg",
  "/img/works/Ayn/photo_11.jpg",
  "/img/works/Ayn/photo_12.jpg",
  "/img/works/Ayn/photo_13.jpg",
];  

const kuanyshPhotos = [
  "/img/works/Kuanysh/photo_1.jpg",
  "/img/works/Kuanysh/photo_2.jpg",
  "/img/works/Kuanysh/photo_3.jpg",
  "/img/works/Kuanysh/photo_4.jpg",
  "/img/works/Kuanysh/photo_5.jpg",
  "/img/works/Kuanysh/photo_6.jpg",
  "/img/works/Kuanysh/photo_7.jpg",
  "/img/works/Kuanysh/photo_8.jpg",
  "/img/works/Kuanysh/photo_9.jpg",
];

const madiPhotos = [
  "/img/works/Madi/photo_1.jpg",
  "/img/works/Madi/photo_2.jpg",
  "/img/works/Madi/photo_3.jpg",
  "/img/works/Madi/photo_4.jpg",
  "/img/works/Madi/photo_5.jpg",
  "/img/works/Madi/photo_6.jpg",
  "/img/works/Madi/photo_7.jpg",
  "/img/works/Madi/photo_8.jpg",
  "/img/works/Madi/photo_9.jpg",
  "/img/works/Madi/photo_10.jpg",
  "/img/works/Madi/photo_11.jpg",
  "/img/works/Madi/photo_12.jpg",
  "/img/works/Madi/photo_13.jpg",
  "/img/works/Madi/photo_14.jpg",
];

const nurnazPhotos = [
  "/img/works/Nurnaz/photo_1.jpg",
  "/img/works/Nurnaz/photo_2.jpg",
  "/img/works/Nurnaz/photo_3.jpg",
  "/img/works/Nurnaz/photo_4.jpg",
  "/img/works/Nurnaz/photo_5.jpg",
  "/img/works/Nurnaz/photo_6.jpg",
  "/img/works/Nurnaz/photo_7.jpg",
  "/img/works/Nurnaz/photo_8.jpg",
  "/img/works/Nurnaz/photo_9.jpg",
  "/img/works/Nurnaz/photo_10.jpg",
  "/img/works/Nurnaz/photo_11.jpg",
  "/img/works/Nurnaz/photo_12.jpg",
  "/img/works/Nurnaz/photo_13.jpg",
];

const allPhotos = [
  ...aynPhotos.map(src => ({ src, studentName: "Нұрмағанбет Аян" })),
  ...kuanyshPhotos.map(src => ({ src, studentName: "Нурсултан Қуаныш" })),
  ...madiPhotos.map(src => ({ src, studentName: "Адамбаев Мади" })),
  ...nurnazPhotos.map(src => ({ src, studentName: "Шерхан Нурназ" })),
];

const practiceData = [
  { id: 1, works: "Кәсіпорынмен танысу", period: "16.04.2025 – 25.04.2025", icon: <BsBuilding />, link: null },
  { id: 2, works: "Баннерлер әзірлеу", period: "26.04.2025 – 10.05.2025", icon: <BsBrush />, link: null },
  { id: 3, works: "Визиткалар дайындау", period: "11.05.2025 – 20.05.2025", icon: <BsCreditCard />, link: null },
  { id: 4, works: "Түптемелі брошюра әзірлеу", period: "21.05.2025 – 31.05.2025", icon: <BsJournalBookmark />, link: null },
  { id: 5, works: "QAZYQURT STEM CENTER веб-сайтын әзірлеу", period: "01.06.2025 – 05.06.2025", icon: <BsCodeSquare />, link: "https://qazyqurt-stem.netlify.app/" },
  { id: 6, works: "Қорытынды жұмыстар", period: "06.06.2025 – 10.06.2025", icon: <BsGraphUp />, link: null },
];

const worksList = [
  { title: "Жарнамалық баннерлер әзірлеу", icon: <BsPrinter />, color: "from-amber-500 to-yellow-500", link: null },
  { title: "Баннер өлшемдерін есептеу", icon: <BsRulers />, color: "from-emerald-500 to-teal-500", link: null },
  { title: "Көлемі 80 метр × 3,5 метр баннер дайындау", icon: <BsBrush />, color: "from-lime-500 to-green-500", link: null },
  { title: "Визитка жасау", icon: <BsCreditCard />, color: "from-violet-500 to-purple-500", link: null },
  { title: "Көпбетті түптемелі брошюра әзірлеу", icon: <BsBook />, color: "from-amber-500 to-orange-500", link: null },
  { title: "Брошюраны серіппемен түптеу", icon: <BsJournalBookmark />, color: "from-indigo-500 to-violet-500", link: null },
  { title: "Полиграфиялық өнімдерді баспаға дайындау", icon: <BsPrinter />, color: "from-rose-500 to-red-500", link: null },
  { title: "QAZYQURT STEM CENTER веб-сайтын әзірлеу", icon: <BsCodeSquare />, color: "from-sky-500 to-blue-500", link: "https://qazyqurt-stem.netlify.app/" },
  { title: "Фото өңдеу және дизайн жасау", icon: <BsCamera />, color: "from-fuchsia-500 to-pink-500", link: null },
];

const techIcons = [
  { name: "Photoshop", icon: "🎨", color: "text-blue-400" },
  { name: "Illustrator", icon: "✏️", color: "text-orange-400" },
  { name: "Figma", icon: "🎯", color: "text-purple-400" },
  { name: "CorelDRAW", icon: "🖌️", color: "text-green-400" },
  { name: "HTML5", icon: "🌐", color: "text-orange-500" },
  { name: "CSS3", icon: "🎨", color: "text-blue-500" },
  { name: "JavaScript", icon: "⚡", color: "text-yellow-400" },
  { name: "React", icon: "⚛️", color: "text-cyan-400" },
];

const videoReview = {
  title: "Кері байланыс",
  teacherName: "Есенкулова Актолкын Актаевна",
  description: "It-колледж студенттердің тәжірибесі туралы кәсіпорын директорының пікірі",
  videoUrl: "/media/video.mp4",
  thumbnail: "/img/video-thumbnail.png",
};

export default function Home() {
  useEffect(() => {
    document.title = "Өндірістік тәжірибе есебі | ТОО КЕЛЕС АКНАРЖУМ";
  }, []);

  const navigate = useNavigate();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [openFaq, setOpenFaq] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const faqData = [
    { q: "Практика қайда өтті?", a: "Практика ТОО «КЕЛЕС АКНАРЖУМ» кәсіпорнында өтті." },
    { q: "Практика мерзімі қандай болды?", a: "2025 жылдың 16 сәуірінен 10 маусымына дейін." },
    { q: "Қандай бағдарламалар қолданылды?", a: "Adobe Photoshop, Illustrator, CorelDRAW, Figma, HTML, CSS, JavaScript, React." },
    { q: "Қандай жұмыстар орындалды?", a: "Баннерлер, визиткалар, брошюралар және веб-сайттар әзірленді." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-x-hidden">
      
      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={videoReview.videoUrl}
                title="Видеоотзыв от преподавателя"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
      </div>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 pt-20 z-10">
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

        <div className="relative z-20 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mx-auto"
            >
              <span className="text-white text-sm font-medium">ТОО «КЕЛЕС АКНАРЖУМ»</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Өндірістік
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                тәжірибе есебі
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="text-amber-400 font-semibold">Инновациялық Техникалық Колледжі</span>
              <br />
              <span className="text-gray-200">ТОО «КЕЛЕС АКНАРЖУМ»</span> кәсіпорнында өткен практика
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            >
              <button
                onClick={() => scrollToSection("about")}
                className="group px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-bold text-white hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 flex items-center gap-2"
              >
                Практика Туралы
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("works")}
                className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-bold text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                Атқарылған жұмыстар
              </button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-white/60 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      <section id="about" className="relative py-20 px-4 z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Практика туралы
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 hover:border-white/20 transition-all duration-500"
          >
            <p className="text-lg md:text-xl text-gray-200 text-center leading-relaxed">
              Өндірістік тәжірибе барысында біз графикалық дизайн, полиграфия және веб-әзірлеу бағыттары бойынша тәжірибе жинақтадық. 
              <span className="text-teal-300 font-semibold"> Adobe Photoshop, Illustrator, CorelDRAW және Figma</span> 
              бағдарламаларын пайдаланып әртүрлі жобаларды орындадық.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10"
          >
            <h3 className="text-xl font-semibold text-white text-center mb-6">Қолданылған бағдарламалар</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {techIcons.map((tech, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl min-w-[80px] border border-white/10"
                >
                  <span className={`text-2xl ${tech.color} mb-1`}>{tech.icon}</span>
                  <span className="text-xs text-white">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="works" className="relative py-20 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Атқарылған жұмыстар
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
            <p className="text-gray-300 mt-4">Практика барысында орындалған негізгі жұмыстар</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {worksList.map((work, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group cursor-pointer"
                onClick={() => {
                  if (work.link) {
                    window.open(work.link, "_blank");
                  }
                }}
              >
                <div className={`bg-gradient-to-br ${work.color} rounded-2xl p-6 shadow-xl transition-all duration-300 h-full ${work.link ? 'hover:shadow-2xl' : ''}`}>
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl text-white">{work.icon}</span>
                  </div>
                  <h3 className="text-white font-bold text-base leading-relaxed">{work.title}</h3>
                  {work.link && (
                    <div className="mt-3 flex items-center gap-1 text-emerald-300 text-xs">
                      <BsGlobe className="text-emerald-300" />
                      <span>Сайтты көру үшін басыңыз →</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="relative py-20 px-4 z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Практика мерзімдері
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden"
          >
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-amber-600 to-orange-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-bold">№</th>
                    <th className="px-6 py-4 text-left text-white font-bold">Атқарылған жұмыстар</th>
                    <th className="px-6 py-4 text-left text-white font-bold">Мерзімдері</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {practiceData.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`hover:bg-white/5 transition-colors ${item.link ? 'cursor-pointer hover:bg-emerald-500/10' : ''} ${index % 2 === 0 ? 'bg-white/5' : 'bg-white/3'}`}
                      onClick={() => item.link && window.open(item.link, "_blank")}
                    >
                      <td className="px-6 py-4 text-white font-medium">#{item.id}</td>
                      <td className="px-6 py-4 text-gray-200">
                        {item.works}
                        {item.link && (
                          <span className="ml-2 inline-flex items-center gap-1 text-emerald-400 text-xs">
                            <BsGlobe className="text-emerald-400" />
                            сайтқа өту
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          📅 {item.period}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3 p-4">
              {practiceData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white/10 rounded-xl p-4 border border-white/10 ${item.link ? 'cursor-pointer hover:bg-emerald-500/10' : ''}`}
                  onClick={() => item.link && window.open(item.link, "_blank")}
                >
                  <div className="flex items-start gap-3">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-md px-2 py-1 text-xs font-bold">#{item.id}</span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-2">{item.works}</p>
                      {item.link && (
                        <div className="flex items-center gap-1 text-emerald-400 text-xs mb-2">
                          <BsGlobe className="text-emerald-400" />
                          <span>Сайтқа өту үшін басыңыз</span>
                        </div>
                      )}
                      <span className="inline-block bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-medium">
                        📅 {item.period}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ВИДЕООТЗЫВ БӨЛІМІ */}
      <section id="video-review" className="relative py-20 px-4 z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <BsStarFill className="text-amber-400 text-xl" />
              <BsStarFill className="text-amber-400 text-xl" />
              <BsStarFill className="text-amber-400 text-xl" />
              <BsStarFill className="text-amber-400 text-xl" />
              <BsStarFill className="text-amber-400 text-xl" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Кәсіпорын жетекшісі
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Практика барысындағы жұмыстарымыз бен дағдыларымыз туралы оқытушылардың кері байланысы
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-amber-400/50 transition-all duration-500"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <BsQuote className="text-amber-400 text-3xl" />
                  <h3 className="text-2xl font-bold text-white">{videoReview.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                  "{videoReview.description}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">О</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{videoReview.teacherName}</p>
                    <p className="text-gray-400 text-sm">ТОО "КЕЛЕС АКНАРЖУМ"</p>
                  </div>
                </div>
              </div>
              
              <div 
                className="relative group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <div className="aspect-video relative">
                  {videoReview.thumbnail ? (
                    <img
                      src={videoReview.thumbnail}
                      alt="Видео превью"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                      <BsPlayCircle className="text-6xl text-amber-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-300">
                      <BsPlayCircle className="text-4xl text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
                    Видеоотзыв
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="stem" className="relative py-20 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                QAZYQURT STEM CENTER
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-emerald-400/50 transition-all duration-500"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <BsCodeSquare className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Жоба туралы ақпарат</h3>
                </div>
                <p className="text-gray-200 leading-relaxed mb-6">
                  STEM білім беру орталығына арналған заманауи веб-сайт әзірленді.
                  HTML, CSS, JavaScript және React технологиялары қолданылды.
                  Сайт толықтай адаптивті және заманауи дизайнға ие.
                  Барлық заманауи браузерлерде дұрыс көрсетіледі.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-lg text-sm font-medium">🌐 HTML5</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium">🎨 CSS3</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm font-medium">⚡ JavaScript</span>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm font-medium">⚛️ React</span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm font-medium">🎯 Tailwind CSS</span>
                </div>
                
                <motion.a
                  href="https://qazyqurt-stem.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <BsGlobe className="text-white" />
                  Сайтты жаңа терезеде ашу
                  <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
              
              <div 
                className="bg-white/10 rounded-xl p-6 flex flex-col items-center justify-center border border-white/10 cursor-pointer hover:bg-white/15 transition-all duration-300 group"
                onClick={() => window.open("https://qazyqurt-stem.netlify.app/", "_blank")}
              >
                <div className="text-center">
                  <BsDisplay className="text-5xl text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-gray-300 text-sm font-medium">QAZYQURT STEM CENTER</p>
                  <p className="text-gray-400 text-xs mt-1">Заманауи веб-сайт</p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400 text-sm">
                    <BsGlobe />
                    <span className="underline">qazyqurt-stem.netlify.app</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="gallery" className="relative py-20 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                Галерея
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-500 mx-auto rounded-full"></div>
            <p className="text-gray-300 mt-4">Студенттердің тәжірибе барысында орындаған жұмыстарының фотолары</p>
          </motion.div>

          {allPhotos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Біздің жұмыстар
              </h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/20">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={32}
                  slidesPerView={1}
                  navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    renderBullet: function (index, className) {
                      return `<span class="${className} !w-2 !h-2 !bg-gray-400 !opacity-40 !mx-1 !transition-all !duration-300"></span>`;
                    },
                  }}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={true}
                  onSlideChange={handleSlideChange}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 24 },
                    1024: { slidesPerView: 3, spaceBetween: 28 },
                    1280: { slidesPerView: 4, spaceBetween: 32 },
                  }}
                  className="!pb-12"
                >
                  {allPhotos.map((photo, index) => (
                    <SwiperSlide key={index}>
                      <div className="group cursor-pointer transform transition-all duration-500">
                        <div className="relative overflow-hidden rounded-2xl bg-slate-700 aspect-[4/3]">
                          <img
                            src={photo.src}
                            alt={`Жұмыс ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/400x300?text=Photo+Not+Found";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                          <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <p className="text-gray-200 text-sm font-medium text-center">
                              {photo.studentName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="flex justify-between items-center mt-10 px-2">
                  <button className="custom-prev group flex items-center justify-center w-12 h-12 bg-white/10 border border-white/20 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:scale-105">
                    <svg className="w-5 h-5 text-gray-300 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="flex items-center space-x-3 bg-white/10 border border-white/20 px-5 py-2 rounded-2xl">
                    <span className="text-gray-200 font-bold text-lg">
                      {activeIndex + 1}
                      <span className="text-gray-400 mx-1.5">/</span>
                      {allPhotos.length}
                    </span>
                    <div className="w-px h-4 bg-gray-400"></div>
                    <span className="text-gray-400 text-sm font-medium">
                      Жалпы жұмыстар
                    </span>
                  </div>

                  <button className="custom-next group flex items-center justify-center w-12 h-12 bg-white/10 border border-white/20 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:scale-105">
                    <svg className="w-5 h-5 text-gray-300 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <section id="students" className="relative py-20 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Біз туралы
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
            <p className="text-gray-300 mt-4">Практикадан өткен студенттер</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentsData.map((student, idx) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/student/${student.id}`)}
              >
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={student.img}
                      alt={student.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=Student+Photo";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 left-3 right-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold text-center">
                        Фото Альбомды Ашу →
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white text-center group-hover:text-amber-400 transition-colors duration-300">
                      {student.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="relative py-20 px-4 z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Жиі қойылатын сұрақтар
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-amber-400/50 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left"
                >
                  <span className="text-white font-semibold text-lg">{item.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center"
                  >
                    <BsChevronDown className="text-white text-sm" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0 border-t border-white/10">
                        <p className="text-gray-300 leading-relaxed pt-3">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
