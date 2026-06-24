@echo off
echo Preparing to send updates to GitHub and Vercel...

echo.
echo 1. Staging new files...
git add .

echo.
echo 2. Committing changes...
git commit -m "Auto-update website files from local PC"

echo.
echo 3. Pushing to live server...
git push origin main

echo.
echo Success! Vercel is now building your live site.
pause