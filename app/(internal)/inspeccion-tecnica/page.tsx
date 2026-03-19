"use client";

import React, { useEffect } from 'react';
import { useInspeccionForm } from './hooks/useInspeccionForm';
import { ActionsHeader } from './components/UI/ActionsHeader';
import { FormGeneral } from './components/FormGeneral';
import { FormDocumentacion } from './components/FormDocumentacion';
import { FormRequerimiento } from './components/FormRequerimiento';
import { FormPisos } from './components/FormPisos';
import { FormConclusiones } from './components/FormConclusiones';
import { Alert, Spin } from 'antd';

export default function InspeccionTecnicaPage() {
  const { state, dispatch, saveDraft, clearForm } = useInspeccionForm();
  
  // Pequeño pre-loader mientras se lee localStorage en useEffect (para evitar hidratación mismatch grande)
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spin size="large" />
          <div className="text-[#ea7048] font-bold tracking-widest text-sm uppercase">Cargando Evaluador Técnico...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      <ActionsHeader 
        data={state} 
        onSaveDraft={saveDraft} 
        onClear={clearForm}
        onImport={(data) => dispatch({ type: 'LOAD_DRAFT', data })}
      />

      <main className="container mx-auto px-4 max-w-5xl">
        <Alert
          message="Modo Desarrollo (MVP)"
          description="Los datos se guardan temporalmente en tu navegador. Exporta para no perderlos."
          type="info"
          showIcon
          className="mb-8"
          closable
        />

        {/* Sección 1: Datos Generales */}
        <FormGeneral data={state} dispatch={dispatch} />

        {/* Sección 2: Documentación */}
        <FormDocumentacion data={state} dispatch={dispatch} />

        {/* Sección 3: Requerimiento */}
        <FormRequerimiento data={state} dispatch={dispatch} />

        {/* Sección 4: Inspección por Pisos (Dinámica) */}
        <FormPisos data={state} dispatch={dispatch} />

        {/* Sección 5: Conclusiones */}
        <FormConclusiones data={state} dispatch={dispatch} />
      </main>
    </div>
  );
}
