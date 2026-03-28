"use server";

import { cookies } from 'next/headers';
import { headers } from 'next/headers';

const AUTH_COOKIE_NAME = 'personal_panel_auth';
const PANEL_ACCESS_USER = process.env.PANEL_ACCESS_USER || '';
const PANEL_ACCESS_PASSWORD = process.env.PANEL_ACCESS_PASSWORD || '';

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
    if (!PANEL_ACCESS_USER || !PANEL_ACCESS_PASSWORD) {
      return { success: false, message: "Acceso no configurado en este entorno." };
    }

    if (usuarioInput === PANEL_ACCESS_USER && passwordInput === PANEL_ACCESS_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set(AUTH_COOKIE_NAME, 'true', await getAuthCookieOptions());
      return { success: true };
    }

    return { success: false, message: "Usuario o contraseña incorrectos." };
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
