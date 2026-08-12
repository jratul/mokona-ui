<#
  mokona-ui를 쓰는 로컬 레포들을 한 번에 최신 버전으로 업데이트한다.
  새 앱이 생기면 $repos 배열에 폴더명만 추가하면 됨.
  버전이 실제로 바뀐 레포만 커밋하고, remote가 있으면 푸시까지 한다.
  showcase/는 이 레포 안에 포함되어 있으므로 별도로 관리한다.
#>

$repos = @(
    "family-graph",
    "file-sweeper",
    "gramio",
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

        if ($before -eq $after) {
            $results += [PSCustomObject]@{ Repo = $repo; Before = $before; After = $after; Status = "no change" }
        } else {
            # 변경된 경우 커밋
            git add package.json *lock* 2>$null
            git commit -m "chore: mokona-ui $before → $after" 2>&1 | Out-Null

            # remote가 있으면 푸시
            $hasRemote = git remote 2>$null
            if ($hasRemote) {
                $branch = git rev-parse --abbrev-ref HEAD 2>$null
                git push origin $branch 2>&1 | Out-Null
                $status = "updated + pushed"
            } else {
                $status = "updated + committed"
            }
            $results += [PSCustomObject]@{ Repo = $repo; Before = $before; After = $after; Status = $status }
        }
    } catch {
        $results += [PSCustomObject]@{ Repo = $repo; Before = $before; After = "ERROR"; Status = $_.Exception.Message }
    } finally {
        Pop-Location
    }
}

$results | Format-Table -AutoSize
