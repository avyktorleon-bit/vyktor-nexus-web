import React from 'react';
import { getInspecciones } from '@/lib/inspecciones-server';
import InspeccionesClient from './InspeccionesClient';

export const runtime = 'edge';

export const metadata = {
  title: 'Gestión de Inspecciones | Vyktor Nexus',
  description: 'Módulo interno para gestión de inspecciones técnicas.',
};

export const revalidate = 0; // Evita el cache para mostrar datos frescos de Supabase

export default async function InspeccionesListPage() {
  const inspecciones = await getInspecciones();
  return <InspeccionesClient data={inspecciones} />;
}
