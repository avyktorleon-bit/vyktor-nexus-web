import React from 'react';
import { getInspeccionById } from '@/lib/inspecciones-server';
import InspeccionDetailClient from './InspeccionDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function InspeccionDetailPage({ params }: Props) {
  const { id } = await params;
  const inspeccion = await getInspeccionById(id);
  return <InspeccionDetailClient inspeccion={inspeccion} id={id} />;
}
