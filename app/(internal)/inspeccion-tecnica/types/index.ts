// ---------------------------------------------------------
// Tipos para la Inspección Técnica (Estructura Profesional)
// ---------------------------------------------------------

export interface EspecialidadData {
  observado: string;
  declarado: string;
  pendienteVerificar: string;
}

export interface FotoEnlace {
  id: string;
  label: string; // Ej: "Fachada", "Cocina", "Fisura en Viga"
  url: string;   // Link de Drive
  descripcion: string;
}

export interface FotoCheck {
  id: string;
  key: string;      // Identificador único (ej: 'fachada', 'piso-1')
  label: string;    // Nombre visible
  checked: boolean;
  url?: string;     // Opcional: Link directo si se desea poner aquí
}

export interface PisoData {
  id: string;
  numero: number;
  
  // 1. Disciplinas separadas por origen de información
  arquitectura: EspecialidadData;
  estructuras: EspecialidadData;
  sanitarias: EspecialidadData;
  electricas: EspecialidadData;
  gas: EspecialidadData;
  
  // 2. Intervención / Análisis
  intervencionPropuesta: string;
  incidencias: string;
  observacionesAdicionales: string;
}

export interface FamiliarData {
  id: string;
  nombre: string;
  relacion: string;
  telefono: string;
}

export interface InspeccionData {
  // ---------------------------------------------------------
  // 1. Datos de Control de Inspección
  // ---------------------------------------------------------
  fecha: string;
  codigoInspeccion: string;
  inspector: string;
  estado: string; // "Borrador" | "Completa" | "Pendiente"
  
  // ---------------------------------------------------------
  // 2. Identificación del Predio
  // ---------------------------------------------------------
  direccion: string;
  distritoProvincia: string;
  urbanizacionSector: string;
  referencia: string;
  coordenadas: string;
  
  // ---------------------------------------------------------
  // 3. Contacto y Relación con el Inmueble
  // ---------------------------------------------------------
  propietarioLegal: string;
  dniPropietario: string;
  poseedorActual: string;
  representante: string;
  personaContacto: string; // Quien atiende la visita
  telefonoContacto: string;
  familiares: FamiliarData[];

  // ---------------------------------------------------------
  // 4. Documentación (Entregada / Faltante)
  // ---------------------------------------------------------
  docsEntregados: {
    partidaRegistral: boolean;
    numeroPartida: string;
    copiaLiteral: boolean;
    constanciaPosesion: boolean;
    planosArquitectura: boolean;
    planosEstructuras: boolean;
    planosSanitarias: boolean;
    planosElectricas: boolean;
    formatoPlanos: string;
  };
  docsFaltantes: string;
  observacionesDoc: string;

  // ---------------------------------------------------------
  // 5. Requerimientos del Cliente
  // ---------------------------------------------------------
  requerimientos: {
    reqConstruir: boolean;
    reqAmpliar: boolean;
    reqModificar: boolean;
    reqRemodelar: boolean;
    reqRegularizar: boolean;
    reqDemoler: boolean;
    reqIndependizar: boolean;
    reqSubdividir: boolean;
    reqConsultaTecnica: boolean;
  };
  resumenCliente: string;
  
  // ---------------------------------------------------------
  // 6. Descripción Técnica por Niveles / Pisos
  // ---------------------------------------------------------
  numeroPisos: number;
  pisos: PisoData[];

  // ---------------------------------------------------------
  // 7. Evaluación y Análisis
  // ---------------------------------------------------------
  evaluacionPreliminar: string;
  limitaciones: {
    acceso: string;
    visibilidad: string;
    documentales: string;
  };
  riesgos: {
    estructurales: string;
    uso: string;
    legales: string;
  };
  patologias: {
    tipoUbicacion: string;
    gravedad: string;
  };

  // ---------------------------------------------------------
  // 8. Panel Fotográfico (Checklist y Enlaces)
  // ---------------------------------------------------------
  fotosChecklist: FotoCheck[]; // Fachada, Calle, etc.
  fotosPanel: FotoEnlace[];    // Fotos libres

  // ---------------------------------------------------------
  // 9. Conclusiones y Cierre
  // ---------------------------------------------------------
  observacionesFinales: string;
  proximosPasos: string;
}

export type InspeccionAction =
  | { type: 'UPDATE_ROOT_FIELD'; field: keyof InspeccionData; value: any }
  | { type: 'UPDATE_DOCS_ENTREGADOS'; field: keyof InspeccionData['docsEntregados']; value: any }
  | { type: 'UPDATE_REQUERIMIENTOS'; field: keyof InspeccionData['requerimientos']; value: any }
  | { type: 'UPDATE_LIMITACIONES'; field: keyof InspeccionData['limitaciones']; value: any }
  | { type: 'UPDATE_RIESGOS'; field: keyof InspeccionData['riesgos']; value: any }
  | { type: 'UPDATE_PATOLOGIAS'; field: keyof InspeccionData['patologias']; value: any }
  | { type: 'UPDATE_NUMERO_PISOS'; count: number }
  | { type: 'UPDATE_PISO_FIELD'; pisoId: string; field: keyof PisoData; value: any }
  | { 
      type: 'UPDATE_PISO_ESPECIALIDAD'; 
      pisoId: string; 
      especialidad: keyof Pick<PisoData, 'arquitectura' | 'estructuras' | 'sanitarias' | 'electricas' | 'gas'>; 
      subField: keyof EspecialidadData; 
      value: string 
    }
  | { type: 'ADD_FAMILIAR' }
  | { type: 'REMOVE_FAMILIAR'; id: string }
  | { type: 'UPDATE_FAMILIAR'; id: string; field: keyof FamiliarData; value: string }
  | { type: 'UPDATE_FOTO_CHECK'; id: string; field: keyof FotoCheck; value: any }
  | { type: 'ADD_FOTO_ENLACE' }
  | { type: 'REMOVE_FOTO_ENLACE'; id: string }
  | { type: 'UPDATE_FOTO_ENLACE'; id: string; field: keyof FotoEnlace; value: string }
  | { type: 'RESET_FORM' }
  | { type: 'LOAD_DRAFT'; data: InspeccionData };
