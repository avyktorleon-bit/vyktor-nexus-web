"use client";

import React, { useEffect, useState } from 'react';
import { useInspeccionSupabase } from './useInspeccionSupabase';
import { ActionsHeader } from '../../inspeccion-tecnica/components/UI/ActionsHeader';
import { FormGeneral } from '../../inspeccion-tecnica/components/FormGeneral';
import { FormDocumentacion } from '../../inspeccion-tecnica/components/FormDocumentacion';
import { FormRequerimiento } from '../../inspeccion-tecnica/components/FormRequerimiento';
import { FormPisos } from '../../inspeccion-tecnica/components/FormPisos';
import { FormFotos } from '../../inspeccion-tecnica/components/FormFotos';
import { FormConclusiones } from '../../inspeccion-tecnica/components/FormConclusiones';
import { Alert, Spin, message, Typography, Button } from 'antd';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

const { Title, Text, Paragraph } = Typography;

interface Props {
  inspeccion: any;
  id: string;
}

export default function InspeccionDetailClient({ inspeccion, id }: Props) {
  // Combinamos los datos base con el objeto 'data' guardado en Supabase si existe
  const loadedData = inspeccion?.data || {
    codigoInspeccion: inspeccion?.numero_inspeccion,
    propietarioLegal: inspeccion?.propietaria,
    direccion: inspeccion?.direccion,
    fecha: inspeccion?.fecha,
    estado: inspeccion?.estado,
    resumenCliente: inspeccion?.observaciones,
  };

  const { state, dispatch, saveToSupabase, lastSaved } = useInspeccionSupabase(id, loadedData);
  const [mounted, setMounted] = useState(false);
  const [isImproving, setIsImproving] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <Spin size="large" />
        <Text type="secondary">Sincronizando con Supabase...</Text>
      </div>
    );
  }

  const handleImproveAI = async () => {
    setIsImproving(true);
    try {
      const response = await fetch('/api/ia/mejorar-texto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });
      if (!response.ok) throw new Error('Error al conectar con la IA');
      const refinedData = await response.json();
      dispatch({ type: 'LOAD_DRAFT', data: refinedData });
      message.success('Textos mejorados por la IA con éxito.');
    } catch (error) {
      console.error(error);
      message.error('No se pudo mejorar el texto.');
    } finally {
      setIsImproving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      <ActionsHeader
        data={state}
        onSaveDraft={() => saveToSupabase(state)}
        onClear={undefined} // Desactivado para detalle
        onImport={(data) => {
          dispatch({ type: 'LOAD_DRAFT', data });
          message.success('Información importada correctamente al editor.');
        }}
        onImproveAI={handleImproveAI}
        isImproving={isImproving}
        lastSaved={lastSaved}
        backUrl="/inspecciones"
      />

      <main className="container mx-auto px-4 max-w-5xl mt-8">
        <Alert
          message="Modo Supabase Cloud"
          description={
            <span>
                Estás editando la inspección <strong>{state.codigoInspeccion}</strong>.
                Los cambios se sincronizan automáticamente en la nube.
            </span>
          }
          type="success"
          showIcon
          className="mb-8"
        />

        <FormGeneral data={state} dispatch={dispatch as any} />
        <FormDocumentacion data={state} dispatch={dispatch as any} />
        <FormRequerimiento data={state} dispatch={dispatch as any} />
        <FormPisos data={state} dispatch={dispatch as any} />
        <FormFotos data={state} dispatch={dispatch as any} />
        <FormConclusiones data={state} dispatch={dispatch as any} />
      </main>
    </div>
  );
}
