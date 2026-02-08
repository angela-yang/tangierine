"use client";

import { useState, useEffect } from 'react';
import HomeNav from "../../components/HomeNav";
import ShopItem from "../../components/ShopItem";

const artCollections = [
  {
    id: 1,
    title: "Commissions",
    count: 6,
    artworks: [
      { id: 1, image: "/images/works/commissions/Mango.png", title: "Mango - Pet Commission", year: "2025" },
      { id: 2, image: "/images/works/commissions/Atem.png", title: "Atem - Pet Commission", year: "2025" },
      { id: 3, image: "/images/works/commissions/Pierogi.png", title: "Pierogi - Pet Commission", year: "2025" },
      { id: 4, image: "/images/works/commissions/Ducks.png", title: "Ducks - Pet Commission", year: "2025" },
      { id: 5, image: "/images/works/commissions/Luna.png", title: "Luna - Fanart", year: "2025" },
      { id: 6, image: "/images/works/commissions/Krusty.png", title: "Krusty - Pet Commission", year: "2025" },
    ]
  },
  {
    id: 2,
    title: "Fanarts",
    count: 10,
    artworks: [
      { id: 1, image: "/images/works/fanarts/Hornet.png", title: "Hornet Personified", year: "2025" },
      { id: 2, image: "/images/works/fanarts/Derpy.png", title: "Derpy from Kpop Demon Hunters", year: "2025" },
      { id: 3, image: "/images/works/fanarts/appa-pfp.png", title: "Appa Drawing", year: "2023" },
      { id: 4, image: "/images/works/fanarts/val.png", title: "Kazuha x Valorant", year: "2023" },
      { id: 5, image: "/images/works/fanarts/jett.png", title: "Jett x Lofi Girl", year: "2023" },
      { id: 6, image: "/images/works/fanarts/kazuha.png", title: "Kazuha Drawing", year: "2022" },
      { id: 7, image: "/images/works/fanarts/wefatcats.png", title: "We Fat Cats", year: "2022" },
      { id: 8, image: "/images/works/fanarts/megumi.png", title: "Megumi from JJK", year: "2022" },
      { id: 9, image: "/images/works/fanarts/genshin.png", title: "Genshin Fanart", year: "2022" },
      { id: 10, image: "/images/works/fanarts/spiritedaway.png", title: "Spirited Away Fanart", year: "2022" },
    ]
  },
  {
    id: 3,
    title: "Character Designs",
    count: 6,
    artworks: [
      { id: 1, image: "/images/works/characters/Eli.png", title: "Eli Heung", year: "2023" },
      { id: 2, image: "/images/works/characters/Ashe.png", title: "Ashe Kamal", year: "2023" },
      { id: 3, image: "/images/works/characters/Tian.png", title: "Tian Zheng", year: "2023" },
      { id: 4, image: "/images/works/characters/ren.png", title: "Ren - Kitsune Mask", year: "2022" },
      { id: 5, image: "/images/works/characters/hana.png", title: "Hana", year: "2022" },
      { id: 6, image: "/images/works/characters/Miya.png", title: "Miya - School Girl", year: "2022" },
    ]
  },
  {
    id: 4,
    title: "Design Work",
    count: 6,
    artworks: [
      { id: 1, image: "/images/works/designs/rca.png", title: "Redmond Code Association Hoodie Design", year: "2024" },
      { id: 2, image: "/images/works/designs/banner.png", title: "Redmond Code Association Sustainability Drive Banner", year: "2024" },
      { id: 3, image: "/images/works/designs/robot.gif", title: "RCA Robot Animation", year: "2023" },
      { id: 4, image: "/images/works/designs/rocket.gif", title: "RCA Rocket Animation", year: "2023" },
      { id: 5, image: "/images/works/designs/people.png", title: "Future Scholar Foundation Team", year: "2023" },
      { id: 6, image: "/images/works/designs/me.gif", title: "GIF of myself", year: "2023" },
    ]
  },
  {
    id: 5,
    title: "Traditional Works",
    count: 15,
    artworks: [
      { id: 1, image: "/images/works/traditional/art1.jpg", title: "Comfort Food - Colored Pencil", year: "2025" },
      { id: 2, image: "/images/works/traditional/art3.jpg", title: "Mom and Me - Crayon", year: "2025" },
      { id: 3, image: "/images/works/traditional/art2.jpg", title: "Memory Project", year: "2025" },
      { id: 4, image: "/images/works/traditional/art4.jpg", title: "Love", year: "2025" },
      { id: 5, image: "/images/works/traditional/art5.jpg", title: "Fairytale Romance", year: "2025" },
      { id: 6, image: "/images/works/traditional/painting1.jpg", title: "Window to the Soul", year: "2024" },
      { id: 7, image: "/images/works/traditional/painting2.jpg", title: "Digital Mind", year: "2024" },
      { id: 8, image: "/images/works/traditional/painting3.jpg", title: "Imagination", year: "2024" },
      { id: 9, image: "/images/works/traditional/painting4.jpg", title: "Global Warming", year: "2024" },
      { id: 10, image: "/images/works/traditional/painting5.jpg", title: "Statue Study - Oil Painting", year: "2024" },
      { id: 11, image: "/images/works/traditional/painting6.jpg", title: "Statue Study - Oil Painting", year: "2023" },
      { id: 12, image: "/images/works/traditional/painting7.jpg", title: "Vase + Fruit - Oil Painting", year: "2023" },
      { id: 13, image: "/images/works/traditional/sketch1.jpg", title: "Statue Study - Graphite", year: "2023" },
      { id: 14, image: "/images/works/traditional/sketch2.jpg", title: "Statue Study - Graphite", year: "2022" },
      { id: 15, image: "/images/works/traditional/sketch3.jpg", title: "Statue Study - Graphite", year: "2022" },
    ]
  },
];

export default function Work() {
  const [selectedCollection, setSelectedCollection] = useState<typeof artCollections[0] | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<{art: typeof artCollections[0]['artworks'][0], collection: typeof artCollections[0]} | null>(null);

  const openCollection = (collection: typeof artCollections[0]) => setSelectedCollection(collection);
  const closeCollection = () => setSelectedCollection(null);

  const openArtwork = (art: typeof artCollections[0]['artworks'][0], collection: typeof artCollections[0]) =>
    setSelectedArtwork({ art, collection });
  const closeArtwork = () => setSelectedArtwork(null);

  const nextArtwork = () => {
    if (!selectedArtwork) return;
    const currentIndex = selectedArtwork.collection.artworks.findIndex(a => a.id === selectedArtwork.art.id);
    const nextIndex = (currentIndex + 1) % selectedArtwork.collection.artworks.length;
    setSelectedArtwork({
      art: selectedArtwork.collection.artworks[nextIndex],
      collection: selectedArtwork.collection
    });
  };

  const prevArtwork = () => {
    if (!selectedArtwork) return;
    const currentIndex = selectedArtwork.collection.artworks.findIndex(a => a.id === selectedArtwork.art.id);
    const prevIndex = (currentIndex - 1 + selectedArtwork.collection.artworks.length) % selectedArtwork.collection.artworks.length;
    setSelectedArtwork({
      art: selectedArtwork.collection.artworks[prevIndex],
      collection: selectedArtwork.collection
    });
  };


  const [offset, setOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX - innerWidth / 2) / innerWidth) * -30;
      const y = ((e.clientY - innerHeight / 2) / innerHeight) * -30;
      setOffset({ x, y });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-[url('/images/bg.png')] bg-cover bg-center relative">
      <div className="hidden md:flex pointer-events-none fixed inset-0 border-[30px] border-[#3E1F69] z-[10]" />
      <div className="min-h-screen">
        <HomeNav />

        <div className="mx-auto px-[15vw] py-[10vh]">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-white/90 mb-4 mt-5">Art Gallery</h1>
            <p className="text-xl text-gray-100/80 max-w-3xl mx-auto">
              A gallery of my different creations. Choose which collections you wish to browse!
            </p>
          </div>

          {/* Collection Grid */}
          {!selectedCollection && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
              {artCollections.map((collection) => (
                <div
                  key={collection.id}
                  onClick={() => openCollection(collection)}
                  className="cursor-pointer relative group"
                >
                  <div className="relative h-[25vh]">
                    {collection.artworks.slice(0, 3).map((art, i) => (
                      <img
                        key={i}
                        src={art.image}
                        alt={`${collection.title} ${i + 1}`}
                        loading="lazy"
                        className={`
                          absolute inset-0 w-full h-full object-cover
                          border-[2px] border-[#996944]/70
                          rounded-sm shadow-md
                          transition-transform duration-500
                          ${i === 0 ? "z-30" : i === 1 ? "z-20" : "z-10"}
                          ${i === 1 ? "translate-x-2 translate-y-2 rotate-1" : ""}
                          ${i === 2 ? "translate-x-4 translate-y-4 -rotate-1" : ""}
                          group-hover:scale-105
                        `}
                      />
                    ))}
                    <div className="absolute bottom-2 left-2 z-40 bg-white/80 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-sm text-gray-800">
                      {collection.title} ({collection.count})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Single Collection View */}
          {selectedCollection && (
            <div className="animate-fadeIn">
              <button
                onClick={closeCollection}
                className="mb-8 px-4 py-2 bg-[#CB9861] hover:bg-[#EBC794] text-gray-800 rounded-xl cursor-pointer shadow-sm transition-all flex items-center gap-2"
              >
                ← Back to Gallery
              </button>

              <h2 className="text-4xl font-bold text-gray-200 mb-6">{selectedCollection.title}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {selectedCollection.artworks.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => openArtwork(art, selectedCollection)}
                    className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="bg-[#EBC794] p-2 border-3 border-[#996944] rounded-md shadow-md">
                      <div className="bg-[#CB9861] border-2 border-[#996944]/70 p-3 shadow-inner">
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={art.image}
                            alt={art.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-center">
                      <h3 className="text-md font-medium text-gray-100">
                        {art.title}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {art.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Artwork Modal */}
        {selectedArtwork && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeArtwork}
          >
            <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
              {/* Close */}
              <button
                onClick={closeArtwork}
                className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/50 rounded-full flex items-center justify-center text-3xl text-white cursor-pointer"
              >
                ×
              </button>

              {/* Prev */}
              <button
                onClick={(e) => { e.stopPropagation(); prevArtwork(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/50 rounded-full flex items-center justify-center text-3xl text-white cursor-pointer"
              >
                ‹
              </button>

              {/* Artwork */}
              <div className="flex flex-col items-center justify-center max-h-[90vh]">
                <img
                  src={selectedArtwork.art.image}
                  alt={selectedArtwork.art.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                  loading="lazy"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedArtwork.art.title}</h3>
                  <p className="text-white/80">{selectedArtwork.art.year}</p>
                </div>
              </div>

              {/* Next */}
              <button
                onClick={(e) => { e.stopPropagation(); nextArtwork(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/50 rounded-full flex items-center justify-center text-3xl text-white cursor-pointer"
              >
                ›
              </button>
            </div>
          </div>
        )}

        <ShopItem label="Lights" imgSrc="/images/light1.png" width={50} positionX={30} positionY={8} offsetX={0} offsetY={0} depthX={1.0} depthY={1.0}/>
        <ShopItem label="Light" imgSrc="/images/light2.png" width={50} positionX={85} positionY={5} offsetX={0} offsetY={0} depthX={1.0} depthY={1.0}/>
      </div>
    </div>
  );
}
