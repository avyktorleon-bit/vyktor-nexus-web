@echo off
cd /d "Z:\Proyectos\10 Vyktor Nexus\01 Pagina Web VN"

echo ============================
echo 🔄 Vyktor Nexus Deploy
echo ============================

set /p mensaje="📝 Escribe el mensaje del commit: "

git add .
git commit -m "%mensaje%"
git push origin main

echo ============================
echo ✅ Todo actualizado 🚀
pause