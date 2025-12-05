"use client";

import { useState } from 'react';
import NavBar from "../../components/NavBar";

const artCollections = [
  {
    id: 1,
    title: "Commissions",
    count: 12,
    artworks: [
      { id: 1, image: "/images/works/Mango.png", title: "Mango - Pet Commission", year: "2025" },
      { id: 2, image: "/images/works/Atem.png", title: "Atem - Pet Commission", year: "2025" },
      { id: 3, image: "/images/works/Pierogi.png", title: "Pierogi - Pet Commission", year: "2025" },
      { id: 4, image: "/images/works/Ducks.png", title: "Ducks - Pet Commission", year: "2025" },
      { id: 5, image: "/images/works/Luna.png", title: "Luna - Fanart", year: "2025" },
      { id: 6, image: "/images/works/Krusty.png", title: "Krusty - Pet Commission", year: "2025" },
    ]
  },
  {
    id: 2,
    title: "Character Designs",
    count: 8,
    artworks: [
      { id: 1, image: "/art/char1.jpg", title: "Fantasy Warrior", client: "Personal", year: "2024" },
      { id: 2, image: "/art/char2.jpg", title: "Cyberpunk Hero", client: "Personal", year: "2024" },
      { id: 3, image: "/art/char3.jpg", title: "Magical Girl", client: "Personal", year: "2023" },
    ]
  },
];

export default function Work() {
  const [selectedCollection, setSelectedCollection] = useState<typeof artCollections[0] | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<{art: typeof artCollections[0]['artworks'][0], collection: typeof artCollections[0]} | null>(null);
  const [hoveredCollection, setHoveredCollection] = useState<number | null>(null);

  const openCollection = (collection: typeof artCollections[0]) => {
    setSelectedCollection(collection);
  };

  const closeCollection = () => {
    setSelectedCollection(null);
  };

  const openArtwork = (art: typeof artCollections[0]['artworks'][0], collection: typeof artCollections[0]) => {
    setSelectedArtwork({ art, collection });
  };

  const closeArtwork = () => {
    setSelectedArtwork(null);
  };

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

  return (
    <div className="bg-indigo-200 min-h-screen" style={{ marginTop: '50px' }}>
      <NavBar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800/80 mb-4">
            Art Gallery
          </h1>
          <p className="text-lg text-gray-600/75 max-w-2xl mx-auto">
            Browse through my past works.
          </p>
        </div>

        {!selectedCollection && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-8">
            {artCollections.map((collection) => (
              <div
                key={collection.id}
                onClick={() => openCollection(collection)}
                onMouseEnter={() => setHoveredCollection(collection.id)}
                onMouseLeave={() => setHoveredCollection(null)}
                className="cursor-pointer relative"
                style={{ 
                  perspective: '1000px',
                  minHeight: '400px',
                }}
              >
                <div className="relative w-full h-96">
                  {collection.artworks.slice(0, 5).map((art, index) => {
                    const isHovered = hoveredCollection === collection.id;
                    
                    const randomOffsets = [
                      { x: -5, y: 0, rot: 2 },
                      { x: -8, y: -4, rot: -3 },
                      { x: 12, y: -7, rot: 4 },
                      { x: -6, y: 5, rot: 2 },
                      { x: 10, y: -8, rot: -3 },
                    ];
                    
                    const offset = randomOffsets[index];

                    const stackedX = offset.x * 0.5;
                    const stackedY = index * 3;
                    const stackedRot = offset.rot * 0.7;

                    const spreadX = offset.x * 3;
                    const spreadY = index * 8 + offset.y * 2;
                    const spreadRot = offset.rot * 2.5;
                    
                    return (
                      <div
                        key={art.id}
                        className="absolute w-full bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-500 ease-out"
                        style={{
                          height: '360px',
                          zIndex: 10 - index,
                          transform: isHovered 
                            ? `translate(${spreadX}px, ${spreadY}px) rotate(${spreadRot}deg)`
                            : `translate(${stackedX}px, ${stackedY}px) rotate(${stackedRot}deg)`,
                          transformOrigin: 'center center',
                        }}
                      >
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover"
                        />

                        {isHovered && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center"/>
                        )}
                      </div>
                    );
                  })}
                  {hoveredCollection === collection.id && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 30 }}>
                      <p className="text-white text-lg font-semibold">View {collection.title}</p>
                    </div>
                  )}
                </div>

                <div className="text-center mt-8">
                  <h3 className="text-2xl font-bold text-gray-800/90 mb-1">
                    {collection.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {collection.count} artworks
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCollection && (
          <div className="animate-fadeIn">
            <button
              onClick={closeCollection}
              className="items-center gap-2 text-gray-700/90 hover:text-gray-900 font-semibold transition-colors cursor-pointer"
            >
              <span className="text-2xl">←</span> Back to Collections
            </button>

            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-700 mb-2">
                {selectedCollection.title}
              </h2>
              <p className="text-gray-700/80">
                {selectedCollection.artworks.length} artworks
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {selectedCollection.artworks.map((art) => (
                <div
                  key={art.id}
                  onClick={() => openArtwork(art, selectedCollection)}
                  className="group cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-700 truncate">
                      {art.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {art.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedArtwork && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeArtwork}
        >
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            <button
              onClick={closeArtwork}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/50 rounded-full flex items-center justify-center text-3xl text-white transition-all z-10 cursor-pointer"
            >
              ×
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevArtwork(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/50 rounded-full flex items-center justify-center text-3xl text-white transition-all z-10 cursor-pointer"
            >
              ‹
            </button>

            <div className="flex flex-col items-center justify-center max-h-[90vh]">
              <img
                src={selectedArtwork.art.image}
                alt={selectedArtwork.art.title}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedArtwork.art.title}
                </h3>
                <p className="text-white/80">
                  {selectedArtwork.art.year}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); nextArtwork(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/50 rounded-full flex items-center justify-center text-3xl text-white transition-all z-10 cursor-pointer"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}