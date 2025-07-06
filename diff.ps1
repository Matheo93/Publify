# diff.ps1
# Ce script met à jour local_files.txt puis compare les fichiers locaux et serveur.

# --- Mise à jour de local_files.txt ---
Write-Output "Mise à jour de local_files.txt..."

Get-ChildItem -Recurse -File | 
    Where-Object { 
        $_.DirectoryName -notlike "*\.git*" -and 
        $_.FullName -notmatch 'node_modules' -and 
        $_.FullName -notmatch '\.next'
    } |
    Sort-Object FullName |
    ForEach-Object {
        # Calcul du chemin relatif par rapport au répertoire courant
        $relative = $_.FullName.Substring($pwd.Path.Length)
        # Supprimer les éventuels caractères "\" ou "/" en début de chaîne
        $relative = $relative -replace '^[\\\/]+',''
        # Remplacer les "\" par "/" et ajouter le préfixe "./"
        $relative = "./" + ($relative -replace '\\','/')
        # Formater la ligne avec la taille et le chemin relatif
        "$($_.Length) $relative"
    } |
    Out-File -Encoding utf8NoBOM local_files.txt

# --- Définition des fichiers de liste ---
$serverListFile = "server_files.txt"
$localListFile  = "local_files.txt"

# --- Création des tables de hachage pour stocker les données ---
$serverFiles = @{}
$localFiles  = @{}

# --- Fonction pour lire et parser un fichier de liste ---
function Get-FileListData {
    param(
        [string]$FilePath
    )
    $data = @{}
    # Chaque ligne doit être au format : "taille chemin"
    Get-Content $FilePath | ForEach-Object {
        if ($_ -match '^\s*(\d+)\s+(.*)$') {
            $size = [int]$matches[1]
            $path = $matches[2].Trim()
            $data[$path] = $size
        }
    }
    return $data
}

# --- Récupération des listes depuis les fichiers ---
$serverFiles = Get-FileListData -FilePath $serverListFile
$localFiles  = Get-FileListData -FilePath $localListFile

$results = @()

# --- Comparaison pour les fichiers présents en local ---
foreach ($path in $localFiles.Keys) {
    if ($serverFiles.ContainsKey($path)) {
        $localSize  = $localFiles[$path]
        $serverSize = $serverFiles[$path]
        if ($localSize -ne $serverSize) {
            $diff = $serverSize - $localSize
            $results += [pscustomobject]@{
                Fichier              = $path
                "Présent en local"   = $localSize
                "Présent sur serveur" = $serverSize
                Différence           = $diff
                Statut               = "Différence de taille"
            }
        }
    }
    else {
         $results += [pscustomobject]@{
             Fichier              = $path
             "Présent en local"   = $localFiles[$path]
             "Présent sur serveur" = "Non"
             Différence           = "N/A"
             Statut               = "Local seulement"
         }
    }
}

# --- Comparaison pour les fichiers présents sur le serveur mais pas en local ---
foreach ($path in $serverFiles.Keys) {
    if (-not $localFiles.ContainsKey($path)) {
         $results += [pscustomobject]@{
             Fichier              = $path
             "Présent en local"   = "Non"
             "Présent sur serveur" = $serverFiles[$path]
             Différence           = "N/A"
             Statut               = "Serveur seulement"
         }
    }
}

# --- Affichage du tableau final (seuls les fichiers non identiques) ---
$results | Where-Object { $_.Statut -ne "Identique" } | Format-Table -AutoSize | Out-String -Width 200

# --- Fin du script ---