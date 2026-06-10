import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import studentsData from "../data/student.json";
import commentsData from "../data/comments.json";

export default function StudentAlbum() {
  const { id } = useParams();
  const student = studentsData.find((s) => s.id === parseInt(id));

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  const comments = commentsData.filter(c => c.studentId === student?.id);

  useEffect(() => {
    if (student) {
      document.title = `${student.name} | Фото Альбом`;
    }
  }, [student]);

  const handleImageLoad = (photoIndex) => {
    setLoadedImages(prev => ({ ...prev, [photoIndex]: true }));
  };

  if (!student) return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center text-white">
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">😕</span>
        </div>
        <p className="text-lg mb-4">Студент табылмады</p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium"
        >
          ← Басты бетке қайту
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-6 px-4 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all"
          >
            ← Артқа
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <p className="text-gray-300 text-sm">Фото альбомы</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center transition-all hover:bg-white/20">
            <div className="text-2xl font-bold text-amber-400">{student.photos.length}</div>
            <div className="text-sm text-gray-300">Фото</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center transition-all hover:bg-white/20">
            <div className="text-2xl font-bold text-emerald-400">{student.works.length}</div>
            <div className="text-sm text-gray-300">Жұмыс</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center transition-all hover:bg-white/20">
            <div className="text-2xl font-bold text-orange-400">{comments.length}</div>
            <div className="text-sm text-gray-300">Пікір</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center transition-all hover:bg-white/20">
            <div className="text-2xl font-bold text-teal-400">{student.id}</div>
            <div className="text-sm text-gray-300">№</div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Фотолар</h2>
            <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded">
              {student.photos.length} фото
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {student.photos.map((photo, i) => (
              <div 
                key={i}
                className="relative group rounded-lg overflow-hidden border border-white/20 cursor-pointer transition-all hover:scale-105 hover:border-amber-400/40"
                onClick={() => { setIndex(i); setOpen(true); }}
              >
                <div className="aspect-[4/3] bg-white/5 relative">
                  {!loadedImages[i] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-gray-400 border-t-amber-400 rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={photo}
                    alt={`${student.name} жұмысы ${i + 1}`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      loadedImages[i] ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(i)}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-white text-xs font-medium">
                    Жұмыс {i + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {open && (
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={student.photos.map(p => ({ src: p }))}
            index={index}
            plugins={[Zoom]}
            controller={{ closeOnBackdropClick: true }}
          />
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Атқарылған жұмыстар</h2>
          <div className="bg-white/10 rounded-lg border border-white/20 p-4">
            <div className="space-y-3">
              {student.works.map((work, i) => (
                <div key={i} className="flex items-start gap-3 transition-all hover:bg-white/20 p-2 rounded-lg">
                  <div className="w-5 h-5 bg-amber-400 rounded-full flex-shrink-0 mt-1"></div>
                  <span className="text-gray-200 leading-relaxed">{work}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Мінездеме</h2>
          {comments.length === 0 ? (
            <div className="bg-white/10 rounded-lg border border-white/20 p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💭</span>
              </div>
              <p className="text-gray-300 mb-2">Әлі пікірлер жоқ</p>
              <p className="text-sm text-gray-400">Алғашқы пікірді жазыңыз</p>
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map((c, i) => (
                <div
                  key={i}
                  className="bg-white/10 rounded-lg border border-white/20 p-4 transition-all hover:bg-white/20 hover:border-amber-400/40"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0 font-semibold text-gray-900">
                      {c.name[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-white ">{c.name}</span>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span className="text-xs text-gray-400">Пікір #{i + 1}</span>
                      </div>
                      <p className="text-gray-200 leading-relaxed">{c.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}