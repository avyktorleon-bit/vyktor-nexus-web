"use server";

import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';

const AUTH_COOKIE_NAME = 'personal_panel_auth';

async function getAuthCookieOptions() {
  const headerStore = await headers();
  const forwardedProto = headerStore.get('x-forwarded-proto');
  const host = headerStore.get('host') ?? '';
  const isIpHost = /^\d{1,3}(\.\d{1,3}){3}(?::\d+)?$/.test(host);
  const isLocalHost =
    host.includes('localhost') ||
    host.startsWith('127.0.0.1') ||
    isIpHost;

  return {
    httpOnly: true,
    secure: forwardedProto === 'https' && !isLocalHost,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  };
}

export async function loginAction(formData: FormData) {
  const usuarioInput = formData.get('usuario') as string;
  const passwordInput = formData.get('password') as string;

  try {
    // Determine the path to the credentials file
    // IMPORTANT: This dependency on '../_docs' is only for LOCAL/PRIVATE operation.
    // In a production deployment (e.g. Vercel), this file will not be available outside the repo.
    // Use environment variables (GEMINI_API_KEY, etc.) or a proper database for production auth.
    const configPath = path.join(process.cwd(), '..', '_docs', 'seguridad', 'acceso.json');
    
    if (!fs.existsSync(configPath)) {
      return { success: false, message: "Error interno: Configuración de acceso no encontrada." };
    }

    const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    if (usuarioInput === configData.usuario && passwordInput === configData.password) {
      const cookieStore = await cookies();
      cookieStore.set(AUTH_COOKIE_NAME, 'true', await getAuthCookieOptions());
      
      return { success: true };
    } else {
      return { success: false, message: "Usuario o contraseña incorrectos." };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Error al procesar la solicitud." };
  }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
    return { success: true };
}

export async function checkAuth() {
    const cookieStore = await cookies();
    return cookieStore.get(AUTH_COOKIE_NAME)?.value === 'true';
}
