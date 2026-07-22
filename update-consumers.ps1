<#
  mokona-ui를 쓰는 로컬 레포들을 한 번에 최신 버전으로 업데이트한다.
  새 앱이 생기면 $repos 배열에 폴더명만 추가하면 됨.
  package.json/lockfile만 갱신하고 커밋/푸시는 하지 않음 — 직접 diff 확인 후 커밋할 것.
#>

$repos = @(
    "mokona-ui-showcase",
    "family-graph",
    "file-sweeper",
    "mokiru",
    "photo-cull",
    "qwen-batch-processor",
    "human-filter",
    "jap-lab",
    "plate-board",
    "separato",
    "webp-gen",
    "yky-portal"
)

function Get-MokonaVersion($pkgJsonPath) {
    if (-not (Test-Path $pkgJsonPath)) { return $null }
    $content = Get-Content $pkgJsonPath -Raw
    if ($content -match '"mokona-ui"\s*:\s*"([^"]+)"') {
        return $Matches[1]
    }
    return $null
}

$root = Split-Path $PSScriptRoot -Parent
$results = @()

foreach ($repo in $repos) {
    $path = Join-Path $root $repo
    $pkgJsonPath = Join-Path $path "package.json"

    if (-not (Test-Path $pkgJsonPath)) {
        $results += [PSCustomObject]@{ Repo = $repo; Before = "-"; After = "-"; Status = "NOT FOUND" }
        continue
    }

    $before = Get-MokonaVersion $pkgJsonPath

    Push-Location $path
    try {
        if (Test-Path "pnpm-lock.yaml") {
            pnpm add "mokona-ui@latest" *>$null
        } elseif (Test-Path "yarn.lock") {
            yarn add "mokona-ui@latest" *>$null
        } else {
            npm install "mokona-ui@latest" *>$null
        }
        $after = Get-MokonaVersion $pkgJsonPath
        $status = if ($before -eq $after) { "no change" } else { "updated" }
        $results += [PSCustomObject]@{ Repo = $repo; Before = $before; After = $after; Status = $status }
    } catch {
        $results += [PSCustomObject]@{ Repo = $repo; Before = $before; After = "ERROR"; Status = $_.Exception.Message }
    } finally {
        Pop-Location
    }
}

$results | Format-Table -AutoSize

Write-Host "`n위 결과 확인 후, 변경된 레포만 들어가서 build/lint 돌려보고 커밋/푸시 하세요 (자동 커밋 안 함)." -ForegroundColor Yellow
