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
  const [selectedArtIndex, setSelectedArtIndex] = useState(0);
  const [hoveredCollection, setHoveredCollection] = useState<number | null>(null);

  const openCollection = (collection: typeof artCollections[0]) => {
    setSelectedCollection(collection);
    setSelectedArtIndex(0);
  };

  const closeCollection = () => {
    setSelectedCollection(null);
    setSelectedArtIndex(0);
  };

  const nextArt = () => {
    if (selectedCollection) {
      setSelectedArtIndex((prev) => (prev + 1) % selectedCollection.artworks.length);
    }
  };

  const prevArt = () => {
    if (selectedCollection) {
      setSelectedArtIndex((prev) => (prev - 1 + selectedCollection.artworks.length) % selectedCollection.artworks.length);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 min-h-screen" style={{ marginTop: '50px' }}>
      <NavBar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-600 mb-4">
            Art Gallery
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Browse through my past works!
          </p>
        </div>

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
                      className="absolute w-full rounded-lg shadow-xl overflow-hidden transition-all duration-500 ease-out"
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
                        <div 
                            className={`text-center text-white bg-black/50 backdrop-blur-sm text-sm transition-opacity duration-300 ${
                            hoveredCollection === collection.id ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            Click to view full collection
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="relative p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                {collection.title}
                </h3>
                <p className="text-gray-600 text-sm">
                {collection.count} artworks
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCollection && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeCollection}
        >
          <div
            className="bg-white rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-indigo-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-700 mb-1">
                  {selectedCollection.title}
                </h2>
                <p className="text-gray-600">
                  {selectedCollection.artworks.length} artworks in this collection
                </p>
              </div>
              <button
                onClick={closeCollection}
                className="w-12 h-12 bg-indigo-800/20 hover:bg-indigo-800/40 rounded-full flex items-center justify-center text-3xl text-white transition-all cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col lg:flex-row h-[calc(95vh-100px)]">
              <div className="lg:w-2/3 bg-gray-100 relative flex items-center justify-center p-8">
                <button
                  onClick={prevArt}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-indigo-300/90 rounded-full flex items-center justify-center text-3xl text-gray-700 hover:text-white transition-all shadow-lg z-10 cursor-pointer"
                >
                  ‹
                </button>
                
                <div className="max-w-4xl max-h-full flex items-center justify-center">
                  <img
                    src={selectedCollection.artworks[selectedArtIndex].image}
                    alt={selectedCollection.artworks[selectedArtIndex].title}
                    className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-2xl"
                  />
                </div>

                <button
                  onClick={nextArt}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-indigo-300/90 rounded-full flex items-center justify-center text-3xl text-gray-700 hover:text-white transition-all shadow-lg z-10 cursor-pointer"
                >
                  ›
                </button>

                <div className="absolute left-5 top-4 p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {selectedCollection.artworks[selectedArtIndex].title}
                  </h3>
                  <p className="text-gray-600">
                    {selectedCollection.artworks[selectedArtIndex].year}
                  </p>
                </div>
              </div>

              <div className="lg:w-1/3 bg-gray-50 overflow-y-auto p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  All Artworks ({selectedCollection.artworks.length})
                </h3>
                <div className="grid grid-cols-2 gap-5">
                  {selectedCollection.artworks.map((art, index) => (
                    <div
                      key={art.id}
                      onClick={() => setSelectedArtIndex(index)}
                      className={`cursor-pointer rounded-lg overflow-hidden transition-all ${
                        index === selectedArtIndex
                        ? 'ring-4 ring-indigo-400 shadow-lg scale-105'
                        : 'hover:ring-3 hover:ring-indigo-300'
                      }`}
                    >
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2">
                        <p className="text-xs font-lg text-gray-900 truncate">
                          {art.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}