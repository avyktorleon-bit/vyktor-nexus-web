@echo off
title Vyktor Nexus - Servidor Web (Next.js)
color 0B

echo =======================================================
echo          VYKTOR NEXUS - MODO DESARROLLO
echo =======================================================
echo.
echo Iniciando el servidor local con Next.js...
echo.

:: Navegar a la raíz del proyecto (una carpeta arriba de _EXTRAS)
Z:
cd "Z:\Proyectos\10 Vyktor Nexus\01 Pagina Web VN"

:: Ejecutar el servidor de desarrollo
npm run dev

:: Por si ocurre algún error, dejar la ventana abierta
pause
