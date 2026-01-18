"use client";

import { BrandHeader } from '@/components/layout/BrandHeader';
import TutorialsView from './TutorialsView';

export default function TutorialsPage() {
    return (
        <div className="min-h-screen bg-[#dde8f4]">
            <BrandHeader />
            <TutorialsView />
        </div>
    );
}
