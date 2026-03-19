export interface PisoData {
  id: string;
  numero: number;
  arquitectura: string;
  estructuras: string;
  sanitarias: string;
  electricas: string;
  gas: string;
  otraEspecialidad: string;
  intervencion: string;
  observaciones: string;
}

export interface FamiliarData {
  id: string;
  nombre: string;
  relacion: string;
}

export interface InspeccionData {
  // 1. General (Subdivided)
  // 1.1. Información de la Inspección
  fecha: string;
  codigoInspeccion: string;
  personaContacto: string;
  telefono: string;
  
  // 1.2. Ubicación del Predio
  direccion: string;
  distritoProvincia: string;
  urbanizacionSector: string;
  referencia: string;
  
  // 1.3. Propietarios y Familiares
  propietarioLegal: string;
  dniPropietario: string;
  familiares: FamiliarData[];

  // 2. Documentacion
  partidaRegistral: boolean;
  numeroPartida: string;
  copiaLiteral: boolean;
  constanciaPosesion: boolean;
  planosArquitectura: boolean;
  planosEstructuras: boolean;
  planosSanitarias: boolean;
  planosElectricas: boolean;
  formatoPlanos: string;
  observacionesDoc: string;

  // 3. Requerimiento
  reqConstruir: boolean;
  reqAmpliar: boolean;
  reqModificar: boolean;
  reqRemodelar: boolean;
  reqRegularizar: boolean;
  reqDemoler: boolean;
  reqIndependizar: boolean;
  reqSubdividir: boolean;
  reqConsultaTecnica: boolean;
  resumenCliente: string;

  // 4. Pisos
  numeroPisos: number;
  pisos: PisoData[];

  // 5. Conclusiones
  evaluacionPreliminar: string;
  documentosFaltantes: string;
  proximosPasos: string;
  observacionesFinales: string;
  notasPropietario: string;
}

export type InspeccionAction =
  | { type: 'UPDATE_FIELD'; field: keyof InspeccionData; value: any }
  | { type: 'UPDATE_PISO_FIELD'; pisoId: string; field: keyof PisoData; value: string }
  | { type: 'UPDATE_NUMERO_PISOS'; count: number }
  | { type: 'ADD_FAMILIAR' }
  | { type: 'REMOVE_FAMILIAR'; id: string }
  | { type: 'UPDATE_FAMILIAR'; id: string; field: keyof FamiliarData; value: string }
  | { type: 'RESET_FORM' }
  | { type: 'LOAD_DRAFT'; data: InspeccionData };
