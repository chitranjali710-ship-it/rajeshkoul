<#
  Housekeeping for the Rajesh Koul website.

  Moves (never deletes) the following into a backup folder OUTSIDE the project:
    1. Old deploy .zip files in the project folder and its parent folder
    2. The old review-page JPGs (public\reviews\*\page-*.jpg) — the site now uses .webp
    3. Leftover navy theme files (components\lns-theme-ehs.css, scripts\lns-theme\)
    4. Images in public\ that no source file references

  Usage (run from the website folder in PowerShell):
    .\scripts\move-unused-files.ps1            # preview only, nothing is moved
    .\scripts\move-unused-files.ps1 -Apply     # actually move the files

  Once you have checked the site still works, you can delete the backup folder.
#>
param([switch]$Apply)

$ErrorActionPreference = "Stop"
$root   = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$parent = Split-Path $root -Parent
$stamp  = Get-Date -Format "yyyy-MM-dd_HHmm"
$backup = Join-Path $parent "website-cleanup-backup_$stamp"

$plan = New-Object System.Collections.Generic.List[object]
function Add-Item($path, $group) {
  if (Test-Path -LiteralPath $path) {
    $size = (Get-ChildItem -LiteralPath $path -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum
    if (-not $size) { $size = (Get-Item -LiteralPath $path).Length }
    $plan.Add([pscustomobject]@{ Group = $group; Path = $path; Bytes = [int64]$size })
  }
}

# ---- 1. Zip files -----------------------------------------------------------
Get-ChildItem -LiteralPath $root   -Filter *.zip -File | ForEach-Object { Add-Item $_.FullName "Deploy zips" }
Get-ChildItem -LiteralPath $parent -Filter *.zip -File | ForEach-Object { Add-Item $_.FullName "Deploy zips" }

# ---- 2. Old review JPGs (only where the matching .webp exists) --------------
Get-ChildItem -LiteralPath (Join-Path $root "public\reviews") -Recurse -Filter "page-*.jpg" -File -ErrorAction SilentlyContinue |
  Where-Object { Test-Path -LiteralPath ([IO.Path]::ChangeExtension($_.FullName, ".webp")) } |
  ForEach-Object { Add-Item $_.FullName "Old review JPGs" }

# ---- Source text used for reference checks ----------------------------------
$srcDirs  = "app","components","lib","content","data","src","styles" | ForEach-Object { Join-Path $root $_ } | Where-Object { Test-Path $_ }
$srcFiles = Get-ChildItem -LiteralPath $srcDirs -Recurse -File -Include *.ts,*.tsx,*.js,*.jsx,*.mjs,*.css,*.json,*.md,*.mdx -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName -notmatch "\\node_modules\\|\\\.next\\|\\dist\\" }
$rootCfg  = Get-ChildItem -LiteralPath $root -File -ErrorAction SilentlyContinue |
  Where-Object { $_.Extension -in ".ts",".js",".mjs",".json" -and $_.Name -ne "package-lock.json" }
$allSrc   = @($srcFiles) + @($rootCfg)

# ---- 3. Navy theme leftovers (skipped if anything still imports them) -------
$themeCss = Join-Path $root "components\lns-theme-ehs.css"
$themeDir = Join-Path $root "scripts\lns-theme"
$cssUsed  = $allSrc | Where-Object { $_.FullName -ne $themeCss } | Select-String -SimpleMatch "lns-theme-ehs" -List
if (-not $cssUsed) { Add-Item $themeCss "Navy theme leftovers" } else { Write-Host "Keeping lns-theme-ehs.css (still referenced in $($cssUsed[0].Path))" -ForegroundColor Yellow }
Add-Item $themeDir "Navy theme leftovers"

# ---- 4. Unreferenced images in public\ --------------------------------------
$corpus = ($allSrc | ForEach-Object { Get-Content -LiteralPath $_.FullName -Raw -ErrorAction SilentlyContinue }) -join "`n"
$keepPatterns = @(
  "\\public\\reviews\\",          # handled above; webps are built from slugs
  "\\public\\art\\covers\\",      # cover paths are built dynamically by thumb()
  "\\public\\art\\lns-hero-books\\",
  "\\public\\(favicon|apple-touch-icon|icon-\d+|og|opengraph|twitter)[^\\]*$"
)
$publicDir = Join-Path $root "public"
Get-ChildItem -LiteralPath $publicDir -Recurse -File -Include *.png,*.jpg,*.jpeg,*.webp,*.gif,*.avif,*.svg -ErrorAction SilentlyContinue |
  Where-Object { $p = $_.FullName; -not ($keepPatterns | Where-Object { $p -match $_ }) } |
  ForEach-Object {
    $rel  = $_.FullName.Substring($publicDir.Length).Replace("\", "/")      # e.g. /art/foo.png
    $base = [IO.Path]::GetFileNameWithoutExtension($_.Name)
    # Referenced if the path, the file name, or the name without extension appears anywhere in source
    if (-not ($corpus.Contains($rel) -or $corpus.Contains($_.Name) -or $corpus.Contains($base))) {
      Add-Item $_.FullName "Unreferenced public images"
    }
  }

# ---- Report -----------------------------------------------------------------
if ($plan.Count -eq 0) { Write-Host "Nothing to move." -ForegroundColor Green; return }
$plan | Group-Object Group | ForEach-Object {
  "{0,-28} {1,5} items  {2,10:N1} MB" -f $_.Name, $_.Count, (($_.Group | Measure-Object Bytes -Sum).Sum / 1MB)
} | Write-Host
"{0,-28} {1,5} items  {2,10:N1} MB" -f "TOTAL", $plan.Count, (($plan | Measure-Object Bytes -Sum).Sum / 1MB) | Write-Host -ForegroundColor Cyan

$listFile = Join-Path $parent "website-cleanup-plan_$stamp.txt"
$plan | Sort-Object Group, Path | ForEach-Object { "[{0}] {1}" -f $_.Group, $_.Path } | Set-Content -LiteralPath $listFile -Encoding UTF8
Write-Host "Full list written to $listFile"

if (-not $Apply) {
  Write-Host "`nPreview only. Review the list, then run again with -Apply to move these files to:`n  $backup" -ForegroundColor Yellow
  return
}

# ---- Move -------------------------------------------------------------------
foreach ($item in $plan) {
  $relPath = if ($item.Path.StartsWith($root)) { "website" + $item.Path.Substring($root.Length) } else { $item.Path.Substring($parent.Length).TrimStart("\") }
  $dest = Join-Path $backup $relPath
  New-Item -ItemType Directory -Force -Path (Split-Path $dest -Parent) | Out-Null
  Move-Item -LiteralPath $item.Path -Destination $dest
}
# Remove folders left empty under public\
Get-ChildItem -LiteralPath $publicDir -Recurse -Directory | Sort-Object { $_.FullName.Length } -Descending |
  Where-Object { -not (Get-ChildItem -LiteralPath $_.FullName -Force) } | Remove-Item
Write-Host "`nMoved $($plan.Count) items to $backup" -ForegroundColor Green
Write-Host "Restart the dev server, click through the site, then delete that folder when you're happy."
