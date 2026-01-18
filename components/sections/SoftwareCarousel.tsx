"use client";
import React from 'react';

const softwareList = [
    { name: 'AutoCAD', src: '/assets/img/software/autocad.png' },
    { name: 'Revit', src: '/assets/img/software/revit.png' },
    { name: 'Civil 3D', src: '/assets/img/software/civil3d.png' },
    { name: 'Navisworks', src: '/assets/img/software/navisworks.png' },
    { name: 'ETABS', src: '/assets/img/software/etabs.png' },
    { name: 'SAP2000', src: '/assets/img/software/sap2000.png' },
    { name: 'SAFE', src: '/assets/img/software/safe.png' },
    { name: 'Lumion', src: '/assets/img/software/lumion.png' },
    { name: 'SketchUp', src: '/assets/img/software/sketchup.png' },
    { name: '3ds Max', src: '/assets/img/software/3dsmax.png' },
    { name: 'V-Ray', src: '/assets/img/software/vray.png' },
    { name: 'Photoshop', src: '/assets/img/software/photoshop.png' },
    { name: 'Illustrator', src: '/assets/img/software/illustrator.png' },
];

export function SoftwareCarousel() {
    return (
        <section className="py-10 text-center bg-transparent border-b border-gray-200 overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-[#2f4860] mb-2">Conoce la tecnología y programas para la construcción</h2>
                <p className="text-[#83a0b5] mb-8 tracking-wider">Arquitectura · Ingeniería · BIM · Visualización · Automatización</p>

                <div className="relative w-full mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex w-max gap-16 animate-scroll hover:[animation-play-state:paused] py-5">
                        {[...softwareList, ...softwareList].map((software, index) => (
                            <div key={index} className="flex flex-col items-center justify-center w-28 h-20 transition-all duration-300 hover:scale-115 group">
                                <img
                                    src={software.src}
                                    alt={software.name}
                                    className="max-w-[85px] h-auto grayscale opacity-60 transition-all duration-400 group-hover:grayscale-0 group-hover:opacity-100 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 32px)); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
        </section>
    );
}
