import fs from 'fs';
import path from 'path';
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
  data?: any; // Para almacenar el objeto completo del evaluador
}

const DATA_PATH = path.join(process.cwd(), '..', '_docs', 'data', 'inspecciones.json');
export async function getInspecciones(): Promise<Inspeccion[]> {
  try {
    if (SUPABASE_CONFIGURED && supabase) {
      const { data, error } = await supabase
        .from('inspecciones')
        .select('id, numero_inspeccion, propietaria, direccion, fecha, estado, observaciones, mejoras_pendientes, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase Error:", error);
        return await getLocalInspecciones();
      }
      return data || [];
    }
    return await getLocalInspecciones();
  } catch (error) {
    console.error("Error obteniendo inspecciones:", error);
    return await getLocalInspecciones();
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
         return await getLocalInspeccionById(id);
      }
      return data;
    }
    return await getLocalInspeccionById(id);
  } catch (error) {
     console.error("Error detalle inspección:", error);
     return await getLocalInspeccionById(id);
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
  // No implementamos guardado en JSON local por simplicidad en server-side
  throw new Error("Supabase no configurado para guardado.");
}

// Funciones de Respaldo Local (JSON)
async function getLocalInspecciones(): Promise<Inspeccion[]> {
  if (!fs.existsSync(DATA_PATH)) return [];
  const data = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(data);
}

async function getLocalInspeccionById(id: string): Promise<Inspeccion | null> {
  const localData = await getLocalInspecciones();
  return localData.find(i => i.id === id) || null;
}
