import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ['100.93.24.65'],
    turbopack: {
        root: projectRoot,
    },
};

export default nextConfig;
