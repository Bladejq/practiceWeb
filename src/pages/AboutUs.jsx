import React, { useState, useEffect } from "react";
import { CheckCircleIcon, ExclamationCircleIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const founders = [
    {
        name: "Нұрмағанбет Аян",
        role: "Студент | Web-дизайнер",
        quote: "Шығармашыл әрі керемет дизайн жасауға ұмтылатын талантты студент.",
        image: "/img/student/Ayn.jpg",
    },
    {
        name: "Адамбаев Мади",
        role: "Студент | Web-дизайнер",
        quote: "Талантты дизайнер, әр затқа мән беретін мұқият әрі жауапты.",
        image: "/img/student/madi3.jpg",
    },
    {
        name: "Нурсултан Куаныш",
        role: "Студент | Web-дизайнер",
        quote: "Сапа мен қарапайымдылықты бағалайтын шығармашыл студент.",
        image: "/img/student/Kuanysh.jpg",
    },
    {
        name: "Шерхан Нурназ",
        role: "Студент | Front-end разработчик",
        quote: "Код жазуда шыдамды, логикалық ойлауы дамыған студент. Осы сайтты әзірлеуші.",
        image: "/img/student/Nurnaz.png",
    },
];

export default function AboutUs() {
    // eslint-disable-next-line 
    const [studentsData, setStudentsData] = useState([]);
    const [allPhotos, setAllPhotos] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        document.title = "Біз туралы";
        import("../data/student.json")
            .then((data) => {
                setStudentsData(data.default || data);

                const allPhotosArray = [];
                (data.default || data).forEach(student => {
                    if (student.photos && Array.isArray(student.photos)) {
                        student.photos.forEach(photo => {
                            allPhotosArray.push({
                                src: photo,
                                studentName: student.name
                            });
                        });
                    }
                });
                setAllPhotos(allPhotosArray);
            })
            .catch((error) => console.error("Ошибка загрузки student.json:", error));
    }, []);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
    };

    return (
        <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                    Біз туралы
                </h2>

                {/* Founders Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {founders.map((f, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden flex flex-col items-center text-center p-8 transition-all duration-500 hover:bg-white/20 hover:scale-105 border border-white/20"
                        >
                            <div className="relative mb-6">
                                <div className="w-36 h-36 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 p-1">
                                    <img
                                        src={f.image}
                                        alt={f.name}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500"></div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{f.name}</h3>
                            <p className="text-gray-300 mb-4 font-medium text-sm">{f.role}</p>
                            <p className="text-gray-200 text-sm italic bg-white/10 px-4 py-3 rounded-2xl border border-white/20">
                                "{f.quote}"
                            </p>
                        </div>
                    ))}
                </div>

                {/* Experience Section */}
                <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-3xl p-10 max-w-4xl mx-auto border border-white/20">
                    <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                        Тәжірибе есебі
                    </h3>
                    <ul className="space-y-8">
                        <li className="flex items-start p-6 rounded-2xl bg-gradient-to-r from-emerald-700/20 to-teal-700/20 border border-emerald-500/30 transition-all duration-300 hover:border-emerald-400/50">
                            <CheckCircleIcon className="w-8 h-8 text-emerald-400 mr-5 flex-shrink-0 mt-1" />
                            <span className="text-gray-200 text-lg leading-relaxed">
                                Біз алғашында кәсіпорын құрылымы мен жұмыс бағыттарымен таныстық, қызметкерлердің тәртібі мен техника қауіпсіздігі жайлы білдік.
                            </span>
                        </li>
                        <li className="flex items-start p-6 rounded-2xl bg-gradient-to-r from-amber-700/20 to-orange-700/20 border border-amber-500/30 transition-all duration-300 hover:border-amber-400/50">
                            <LightBulbIcon className="w-8 h-8 text-amber-400 mr-5 flex-shrink-0 mt-1" />
                            <span className="text-gray-200 text-lg leading-relaxed">
                                Біз компания қызметтері туралы мәлімет жинап, бірбеткей брошюраның макетін жасап, сонымен қатар Алматының картасын және де визитка дизайндарын даярлап тәжірибе жинадық.
                            </span>
                        </li>
                        <li className="flex items-start p-6 rounded-2xl bg-gradient-to-r from-rose-700/20 to-pink-700/20 border border-rose-500/30 transition-all duration-300 hover:border-rose-400/50">
                            <ExclamationCircleIcon className="w-8 h-8 text-rose-400 mr-5 flex-shrink-0 mt-1" />
                            <span className="text-gray-200 text-lg leading-relaxed">
                                Көпбетті брошюра жасап, композиция, түстер үйлесімі мен шрифт таңдау тәжірибесін меңгеру кезінде кейбір қиындықтарға тап болдық, бірақ бәрін бірге орындадық.
                            </span>
                        </li>
                    </ul>
                    <p className="mt-12 text-center text-gray-300 text-lg bg-white/10 py-5 rounded-2xl border border-white/20">
                        Бұл тәжірибе бізге кәсіби ортаға дайындалуға және веб-дизайн мен front-end саласындағы алғашқы қадамдарымызды жасауға көмектесті.
                    </p>
                </div>

                {/* Portfolio Section */}
                {allPhotos.length > 0 && (
                    <div className="mt-20">
                        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                            Біздің жұмыстар
                        </h3>
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
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
                                            <div className="relative overflow-hidden rounded-2xl bg-gray-700">
                                                <img
                                                    src={photo.src}
                                                    alt={`Жұмыс ${index + 1}`}
                                                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
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

                            {/* Pagination & Controls */}
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
                    </div>
                )}
            </div>

            <style jsx>{`
                :global(.swiper-pagination-bullet-active) {
                    opacity: 1 !important;
                    background: #f59e0b !important; /* amber active bullet */
                    transform: scale(1.3) !important;
                }
            `}</style>
        </section>
    );
}