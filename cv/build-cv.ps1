# Prints cv-en.html and cv-fr.html to the PDFs the site links (public/assets/cv-majd-abbassi-*.pdf).
# Run from anywhere:  powershell -File cv\build-cv.ps1
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$browser = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Google\Chrome\Application\chrome.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw 'Edge or Chrome is needed to print the CV.' }
foreach ($lang in 'en', 'fr') {
  $src = Join-Path $here "cv-$lang.html"
  $out = Join-Path $here "..\public\assets\cv-majd-abbassi-$lang.pdf"
  $url = 'file:///' + ($src -replace '\\', '/')
  & $browser --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$out" $url 2>$null | Out-Null
  Start-Sleep -Milliseconds 500
  "{0}: {1} KB" -f (Split-Path $out -Leaf), [int]((Get-Item $out).Length / 1024)
}
