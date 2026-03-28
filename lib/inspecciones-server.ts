import { supabase, SUPABASE_CONFIGURED } from './supabase';

export interface Inspeccion {
  id: string;
  numero_inspeccion: string;
  propietaria: string;
  direccion: string;
  fecha: string;
  estado: string;
  observaciones: string;
  mejoras_pendientes: string;
  created_at: string;
  data?: any;
}

export interface InspeccionesResult {
  data: Inspeccion[];
  hasConnectionIssue: boolean;
}

export async function getInspecciones(): Promise<InspeccionesResult> {
  try {
    if (!SUPABASE_CONFIGURED || !supabase) {
      return { data: [], hasConnectionIssue: true };
    }

    const { data, error } = await supabase
      .from('inspecciones')
      .select('id, numero_inspeccion, propietaria, direccion, fecha, estado, observaciones, mejoras_pendientes, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase Error:", error);
      return { data: [], hasConnectionIssue: true };
    }

    return { data: data || [], hasConnectionIssue: false };
  } catch (error) {
    console.error("Error obteniendo inspecciones:", error);
    return { data: [], hasConnectionIssue: true };
  }
}

export async function getInspeccionById(id: string): Promise<Inspeccion | null> {
  try {
    if (SUPABASE_CONFIGURED && supabase) {
      const { data, error } = await supabase
        .from('inspecciones')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Supabase Error detail:", error);
        return null;
      }

      return data;
    }

    return null;
  } catch (error) {
    console.error("Error detalle inspección:", error);
    return null;
  }
}

export async function saveInspeccion(inspeccion: Partial<Inspeccion>) {
  if (SUPABASE_CONFIGURED && supabase) {
    const { data, error } = await supabase
      .from('inspecciones')
      .upsert(inspeccion)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  throw new Error("Supabase no configurado para guardado.");
}
