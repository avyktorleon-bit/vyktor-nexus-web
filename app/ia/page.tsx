"use client";

import { BrandHeader } from '@/components/layout/BrandHeader';
import IAView from './IAView';

export default function IALandingPage() {
    return (
        <div className="min-h-screen bg-[#dde8f4]">
            <BrandHeader />
            <IAView />
        </div>
    );
}
