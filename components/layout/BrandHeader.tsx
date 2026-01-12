"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ReadOutlined,
    PlayCircleOutlined,
    BulbOutlined,
    FolderOpenOutlined,
    DownOutlined,
    MenuOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const navigationItems = [
    {
        label: 'NOTICIAS',
        href: '/noticias',
        icon: <ReadOutlined />,
        dropdown: [
            { label: 'Todas las Noticias', href: '/noticias' },
            { label: 'Actualidad en Construcción', href: '/noticias?cat=Infraestructura' }, // Mapped to existing category
            { label: 'Infraestructura', href: '/noticias?cat=Infraestructura' },
            { label: 'Tecnología', href: '/noticias?cat=Tecnología' },
            { label: 'IA', href: '/noticias?cat=IA' },
        ],
    },
    {
        label: 'TUTORIALES',
        href: '/tutoriales',
        icon: <PlayCircleOutlined />,
        dropdown: [
            { label: 'AutoCAD', href: '/tutoriales-autocad' },
            { label: 'Revit', href: '/tutoriales-revit' },
            { label: 'ETABS', href: '/recursos?section=etabs' }, // Redirect to resources for now
            { label: 'IA para Arquitectos', href: '/tutoriales-ia' }, // Needs check or create page
        ],
    },
    {
        label: 'IA',
        href: '/ia',
        icon: <BulbOutlined />,
        dropdown: [
            { label: 'Prompts AutoCAD', href: '/ia-prompts-autocad' },
            { label: 'Prompts Revit', href: '/ia-prompts-revit' },
            { label: 'Nanobanana', href: '/recursos?section=nanobanana' }, // Redirect to resources
        ],
    },
    {
        label: 'RECURSOS',
        href: '/recursos',
        icon: <FolderOpenOutlined />,
        dropdown: [
            { label: 'Plantillas Revit', href: '/recursos-revit' },
            { label: 'Bloques AutoCAD', href: '/recursos-autocad' },
            { label: 'Formatos Técnicos', href: '/recursos?section=formatos' },
        ],
    },
];

export function BrandHeader() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-[80px] flex items-center justify-between gap-4">
                {/* Logo Section */}
                <div className="flex-shrink-0">
                    <Link href="/" className="flex items-center gap-3 no-underline group">
                        <Image
                            src="/assets/img/logo-color.png"
                            alt="Vyktor Nexus Logo"
                            width={50}
                            height={50}
                            className="h-[50px] w-auto transition-transform group-hover:scale-105"
                        />
                        <span className="text-2xl font-bold text-[#2f4860] tracking-wider uppercase hidden md:block">
                            VYKTORNEXUS
                        </span>
                    </Link>
                </div>

                {/* Navigation Menu (Custom Desktop) */}
                <nav className="hidden lg:flex flex-grow justify-center">
                    <ul className="flex items-center gap-6 list-none m-0 p-0 h-full">
                        {navigationItems.map((item) => (
                            <li
                                key={item.label}
                                className="relative group h-full flex items-center"
                                onMouseEnter={() => setOpenDropdown(item.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-2 text-[#2f4860] font-bold text-sm tracking-tight hover:text-[#ea7048] transition-colors py-8 h-full"
                                    onClick={(e) => {
                                        // Optional: allow toggle on click for touch screens/desktop clickers
                                        if (window.innerWidth >= 1024) {
                                            // On desktop, we can still navigate, but maybe prevent default if we want it to JUST open?
                                            // Usually, a hover menu should also have a main category link.
                                        }
                                    }}
                                >
                                    <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                                    {item.label}
                                    <DownOutlined className="text-[10px] transition-transform duration-300 group-hover:rotate-180" />
                                </Link>

                                {/* Invisible Bridge to prevent closing when moving to dropdown */}
                                <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {openDropdown === item.label && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2 pt-4 z-50"
                                        >
                                            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-bottom-[10px] border-bottom-white absolute -top-2 left-1/2 -translate-x-1/2"></div>
                                            {item.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.label}
                                                    href={subItem.href}
                                                    className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#ea7048] hover:bg-orange-50 rounded-lg transition-all"
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right Action & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/contacto"
                        className="bg-[#ea7048] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#d15d36] transition-all whitespace-nowrap hidden sm:block"
                    >
                        Contacto
                    </Link>

                    <button
                        className="lg:hidden text-2xl text-[#2f4860] p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu (Overlay) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <ul className="list-none m-0 p-4 space-y-4">
                            {navigationItems.map((item) => (
                                <li key={item.label} className="space-y-2">
                                    <div className="flex items-center gap-2 text-[#2f4860] font-bold text-lg border-b border-gray-50 pb-1">
                                        {item.icon} {item.label}
                                    </div>
                                    <div className="pl-6 space-y-2">
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.label}
                                                href={subItem.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block text-gray-500 hover:text-[#ea7048] text-sm"
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
