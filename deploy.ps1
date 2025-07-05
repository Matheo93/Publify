# deploy.ps1
Write-Host "🏗️ Construction de l'image Docker..."
docker build -t publify:latest .

Write-Host "🔑 Connexion à ECR..."
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 626635439764.dkr.ecr.eu-north-1.amazonaws.com

Write-Host "🏷️ Tag de l'image..."
docker tag publify:latest 626635439764.dkr.ecr.eu-north-1.amazonaws.com/publify:latest

Write-Host "⬆️ Push vers ECR..."
docker push 626635439764.dkr.ecr.eu-north-1.amazonaws.com/publify:latest

Write-Host "✅ Déploiement terminé avec succès"