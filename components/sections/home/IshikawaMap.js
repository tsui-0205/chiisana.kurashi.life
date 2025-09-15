'use client';

import { useState } from 'react';

// 石川県の訪問済み場所データ
const visitedPlaces = {
    kanazawa: {
        name: '金沢市',
        description: '兼六園や金沢城、ひがし茶屋街を訪問。金沢の歴史と文化を堪能しました。',
        spots: ['兼六園', 'ひがし茶屋街', '金沢城公園', '近江町市場'],
        date: '2023年10月',
        color: '#E3F2FD'
    },
    kaga: {
        name: '加賀市',
        description: '山中温泉と山代温泉でゆっくり。伝統工芸の九谷焼も見学しました。',
        spots: ['山中温泉', '山代温泉', '九谷焼窯跡展示館'],
        date: '2023年11月',
        color: '#FFF3E0'
    },
    noto: {
        name: '能登町',
        description: '能登半島の美しい海岸線と新鮮な海の幸を楽しみました。',
        spots: ['恋路海岸', '九十九湾', '能登町漁港'],
        date: '2024年春',
        color: '#E8F5E8'
    },
    wajima: {
        name: '輪島市',
        description: '輪島塗の伝統工芸と朝市を見学。能登の文化に触れました。',
        spots: ['輪島朝市', '輪島塗会館', '白米千枚田'],
        date: '2024年夏',
        color: '#FCE4EC'
    },
    hakui: {
        name: '羽咋市',
        description: 'UFOの街として有名な羽咋市。千里浜なぎさドライブウェイを体験しました。',
        spots: ['千里浜なぎさドライブウェイ', 'コスモアイル羽咋'],
        date: '2024年春',
        color: '#F3E5F5'
    }
};

export default function IshikawaMap() {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [hoveredPlace, setHoveredPlace] = useState(null);

    const handlePlaceClick = (placeKey) => {
        if (visitedPlaces[placeKey]) {
            setSelectedPlace(visitedPlaces[placeKey]);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPlace(null);
    };

    return (
        <div className="relative w-full">
            <style>{`
                .map-area {
                    cursor: pointer;
                    transition: all 0.3s ease;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
                }
                .map-area:hover {
                    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
                    transform: scale(1.02);
                }
                .map-area.visited {
                    stroke: #666;
                    stroke-width: 2;
                }
                .map-area.unvisited {
                    fill: #f5f5f5;
                    stroke: #ddd;
                    stroke-width: 1;
                }
                .modal-backdrop {
                    backdrop-filter: blur(4px);
                }
            `}</style>

            {/* セクションヘッダー */}
            <div className="text-center py-12 px-6">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-800 mb-4">
                    石川県の思い出マップ
                </h2>
                <p className="text-base md:text-lg text-zinc-600 mb-2">
                    これまでに訪れた場所をタップしてみてください
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-zinc-500">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-blue-200 border border-gray-400"></div>
                        <span>訪問済み</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gray-200 border border-gray-300"></div>
                        <span>未訪問</span>
                    </div>
                </div>
            </div>

            {/* 石川県地図 */}
            <div className="flex justify-center px-4 pb-12">
                <div className="relative max-w-2xl w-full">
                    <svg
                        viewBox="0 0 400 600"
                        className="w-full h-auto"
                        style={{ maxHeight: '70vh' }}
                    >
                        {/* 石川県の簡略化された地図 */}
                        
                        {/* 金沢市 */}
                        <path
                            d="M180 250 L220 240 L240 280 L200 300 L160 290 Z"
                            className={`map-area ${visitedPlaces.kanazawa ? 'visited' : 'unvisited'}`}
                            fill={visitedPlaces.kanazawa ? visitedPlaces.kanazawa.color : '#f5f5f5'}
                            onClick={() => handlePlaceClick('kanazawa')}
                            onMouseEnter={() => setHoveredPlace('kanazawa')}
                            onMouseLeave={() => setHoveredPlace(null)}
                        />
                        
                        {/* 加賀市 */}
                        <path
                            d="M160 320 L200 310 L220 350 L180 370 L140 360 Z"
                            className={`map-area ${visitedPlaces.kaga ? 'visited' : 'unvisited'}`}
                            fill={visitedPlaces.kaga ? visitedPlaces.kaga.color : '#f5f5f5'}
                            onClick={() => handlePlaceClick('kaga')}
                            onMouseEnter={() => setHoveredPlace('kaga')}
                            onMouseLeave={() => setHoveredPlace(null)}
                        />
                        
                        {/* 輪島市 */}
                        <path
                            d="M120 80 L180 70 L200 120 L160 140 L100 130 Z"
                            className={`map-area ${visitedPlaces.wajima ? 'visited' : 'unvisited'}`}
                            fill={visitedPlaces.wajima ? visitedPlaces.wajima.color : '#f5f5f5'}
                            onClick={() => handlePlaceClick('wajima')}
                            onMouseEnter={() => setHoveredPlace('wajima')}
                            onMouseLeave={() => setHoveredPlace(null)}
                        />
                        
                        {/* 能登町 */}
                        <path
                            d="M200 50 L280 40 L300 100 L260 120 L200 110 Z"
                            className={`map-area ${visitedPlaces.noto ? 'visited' : 'unvisited'}`}
                            fill={visitedPlaces.noto ? visitedPlaces.noto.color : '#f5f5f5'}
                            onClick={() => handlePlaceClick('noto')}
                            onMouseEnter={() => setHoveredPlace('noto')}
                            onMouseLeave={() => setHoveredPlace(null)}
                        />
                        
                        {/* 羽咋市 */}
                        <path
                            d="M140 180 L180 170 L200 210 L160 230 L120 220 Z"
                            className={`map-area ${visitedPlaces.hakui ? 'visited' : 'unvisited'}`}
                            fill={visitedPlaces.hakui ? visitedPlaces.hakui.color : '#f5f5f5'}
                            onClick={() => handlePlaceClick('hakui')}
                            onMouseEnter={() => setHoveredPlace('hakui')}
                            onMouseLeave={() => setHoveredPlace(null)}
                        />

                        {/* 他の市町村（未訪問） */}
                        <path
                            d="M240 150 L280 140 L300 180 L260 200 L220 190 Z"
                            className="map-area unvisited"
                            fill="#f5f5f5"
                        />
                        <path
                            d="M100 200 L140 190 L160 230 L120 250 L80 240 Z"
                            className="map-area unvisited"
                            fill="#f5f5f5"
                        />

                        {/* 地名ラベル */}
                        <text x="200" y="270" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                            金沢市
                        </text>
                        <text x="180" y="340" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                            加賀市
                        </text>
                        <text x="150" y="105" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                            輪島市
                        </text>
                        <text x="240" y="80" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                            能登町
                        </text>
                        <text x="160" y="200" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                            羽咋市
                        </text>
                    </svg>

                    {/* ホバー時のツールチップ */}
                    {hoveredPlace && visitedPlaces[hoveredPlace] && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border">
                            <p className="text-sm font-medium text-gray-800">
                                {visitedPlaces[hoveredPlace].name}
                            </p>
                            <p className="text-xs text-gray-600">
                                {visitedPlaces[hoveredPlace].date}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* モーダル */}
            {showModal && selectedPlace && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/30"
                    onClick={closeModal}
                >
                    <div 
                        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform scale-100 transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-800">
                                {selectedPlace.name}
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            {selectedPlace.description}
                        </p>
                        
                        <div className="mb-4">
                            <h4 className="font-semibold text-gray-800 mb-2">訪問したスポット:</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedPlace.spots.map((spot, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                    >
                                        {spot}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                            訪問時期: {selectedPlace.date}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
