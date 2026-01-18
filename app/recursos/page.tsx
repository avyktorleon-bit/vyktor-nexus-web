"use client";

import { BrandHeader } from '@/components/layout/BrandHeader';
import ResourcesView from './ResourcesView';

export default function RecursosPage() {
    return (
        <div className="min-h-screen bg-[#dde8f4]">
            <BrandHeader />
            <ResourcesView />
        </div>
    );
}
