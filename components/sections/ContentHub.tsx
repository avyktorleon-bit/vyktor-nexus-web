import React from 'react';
import { LucideIcon } from 'lucide-react';

interface VideoCard {
    title: string;
    description: string;
    category: string;
    videoUrl?: string; // YouTube ID or URL
    isComingSoon?: boolean;
}

interface NavCard {
    title: string;
    href: string;
    icon: string; // Emoji or Icon component
}

interface ContentHubProps {
    title: string;
    subtitle: string;
    videos: VideoCard[];
    navLinks: NavCard[];
}

export function ContentHub({ title, subtitle, videos, navLinks }: ContentHubProps) {
    return (
        <section className="container mx-auto my-4 py-8 bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-100">
            <div className="px-5">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mb-2 text-[#2f4860]">{title}</h2>
                    <p className="text-[#83a0b5] text-lg">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* LEFT COLUMN: VIDEO CARDS */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                        {videos.map((video, idx) => (
                            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 transition-transform duration-300">
                                <div className="relative pb-[56.25%] h-0 bg-black">
                                    {video.isComingSoon ? (
                                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">PROXIMAMENTE</div>
                                    ) : (
                                        <iframe
                                            className="absolute inset-0 w-full h-full border-0"
                                            src={video.videoUrl}
                                            title={video.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                </div>
                                <div className="p-5">
                                    <span className="bg-[#52aeb2] text-white px-2.5 py-1 rounded text-[0.8rem] uppercase mb-2 inline-block">
                                        {video.category}
                                    </span>
                                    <h3 className="text-xl font-bold mt-2.5 mb-1.5 text-[#2f4860]">{video.title}</h3>
                                    <p className="text-[#83a0b5] text-[0.95rem] leading-relaxed">{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT COLUMN: NAVIGATION CARDS */}
                    <div className="flex flex-col gap-5">
                        {navLinks.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                className="bg-white p-5 rounded-xl flex items-center gap-4 text-[#2f4860] shadow-sm hover:translate-x-1.5 hover:border-[#ea7048] hover:shadow-md transition-all duration-300 border border-transparent"
                            >
                                <span className="text-3xl">{link.icon}</span>
                                <h3 className="m-0 text-lg font-semibold">{link.title}</h3>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
