# =================================================================
# SCRIPT D'INSTALLATION POSTGRESQL POUR WINDOWS
# Projet: Publify CCP 2 - Installation automatique PostgreSQL
# =================================================================

Write-Host "===============================================" -ForegroundColor Green
Write-Host "INSTALLATION POSTGRESQL POUR CCP 2" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green

# Vérification des droits administrateur
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "ERREUR: Ce script nécessite des droits administrateur" -ForegroundColor Red
    Write-Host "Relancez PowerShell en tant qu'administrateur" -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

# Installation de Chocolatey si pas présent
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Installation de Chocolatey..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    RefreshEnv
}

Write-Host "Installation de PostgreSQL 14..." -ForegroundColor Yellow
choco install postgresql14 --params '/Password:publify123' -y

Write-Host "Installation de pgAdmin 4..." -ForegroundColor Yellow
choco install pgadmin4 -y

# Attendre que l'installation soit terminée
Start-Sleep -Seconds 10

# Ajouter PostgreSQL au PATH
$env:PATH += ";C:\Program Files\PostgreSQL\14\bin"
[Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\Program Files\PostgreSQL\14\bin", [EnvironmentVariableTarget]::Machine)

Write-Host "Redémarrage du service PostgreSQL..." -ForegroundColor Yellow
net stop postgresql-x64-14
net start postgresql-x64-14

Write-Host "===============================================" -ForegroundColor Green
Write-Host "INSTALLATION TERMINÉE !" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Write-Host "Mot de passe PostgreSQL: publify123" -ForegroundColor Cyan
Write-Host "Utilisateur: postgres" -ForegroundColor Cyan
Write-Host "Port: 5432" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Green

Write-Host "Test de connexion..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Test de connexion
$env:PGPASSWORD = "publify123"
try {
    & "C:\Program Files\PostgreSQL\14\bin\psql.exe" -U postgres -c "SELECT version();"
    Write-Host "✓ PostgreSQL fonctionne correctement !" -ForegroundColor Green
} catch {
    Write-Host "⚠ Problème de connexion, redémarrez PowerShell" -ForegroundColor Yellow
}

Write-Host "Prochaines étapes:" -ForegroundColor Cyan
Write-Host "1. Redémarrez PowerShell" -ForegroundColor White
Write-Host "2. Exécutez: psql -U postgres" -ForegroundColor White
Write-Host "3. Mot de passe: publify123" -ForegroundColor White

Read-Host "Appuyez sur Entrée pour terminer"