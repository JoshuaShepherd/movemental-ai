# Content Organization Script
# Maps content research files to portal directories

$baseDir = "C:\dev\alan-hirsch-content\content-research"
$sourceDir = "$baseDir\core-content"
$destDir = "$baseDir\portals"

# Comprehensive Q&A mappings
$qaMappings = @{
    "qa-apest-5q.md" = @("mdna/comprehensive-qa", "subportals/apest-fivefold-ministry/comprehensive-qa")
    "qa-metanoia.md" = @("metanoia/comprehensive-qa")
    "qa-movement-dna-mdna.md" = @("mdna/comprehensive-qa")
    "qa-apostolic-genius.md" = @("forgotten-ways/comprehensive-qa", "mdna/comprehensive-qa")
    "qa-movement-dynamics.md" = @("movement-intelligence/comprehensive-qa")
    "qa-organic-systems.md" = @("subportals/organic-systems/comprehensive-qa", "mdna/comprehensive-qa")
    "qa-discipleship-disciplism.md" = @("subportals/disciple-making/comprehensive-qa", "mdna/comprehensive-qa")
    "qa-missional-church.md" = @("subportals/missional-incarnational-impulse/comprehensive-qa", "mdna/comprehensive-qa")
    "qa-theological-foundations.md" = @("mdna/comprehensive-qa", "forgotten-ways/comprehensive-qa")
    "qa-contextual-application.md" = @("mdna/comprehensive-qa")
    "qa-framework-implementation.md" = @("mdna/comprehensive-qa")
    "qa-integration.md" = @("cross-portal/integrated-frameworks")
    "qa-advanced-concepts.md" = @("mdna/comprehensive-qa")
}

# FAQ mappings
$faqMappings = @{
    "faq-001-what-is-missional-church.md" = @("subportals/missional-incarnational-impulse/faq-answers", "mdna/faq-answers")
    "faq-002-what-is-movement-dna-mdna.md" = @("mdna/faq-answers")
    "faq-003-what-is-apest.md" = @("subportals/apest-fivefold-ministry/faq-answers", "mdna/faq-answers")
    "faq-004-what-is-metanoia.md" = @("metanoia/faq-answers")
    "faq-005-how-do-movements-work.md" = @("movement-intelligence/faq-answers")
    "faq-006-how-do-i-become-missional.md" = @("subportals/missional-incarnational-impulse/faq-answers", "mdna/faq-answers")
    "faq-007-what-is-apostolic-genius.md" = @("forgotten-ways/faq-answers", "mdna/faq-answers")
    "faq-008-what-is-disciplism.md" = @("subportals/disciple-making/faq-answers", "mdna/faq-answers")
    "faq-009-difference-missional-attractional.md" = @("subportals/missional-incarnational-impulse/faq-answers", "mdna/faq-answers")
    "faq-010-how-do-i-activate-movement-dna.md" = @("mdna/faq-answers")
    "faq-011-how-do-i-embed-mdna.md" = @("mdna/faq-answers")
    "faq-012-how-do-i-activate-apest-5q.md" = @("subportals/apest-fivefold-ministry/faq-answers", "mdna/faq-answers")
    "faq-013-how-do-i-begin-metanoia-journey.md" = @("metanoia/faq-answers")
    "faq-014-how-do-i-transition-institution-to-movement.md" = @("movement-intelligence/faq-answers")
    "faq-015-how-do-i-develop-missional-practices.md" = @("subportals/missional-incarnational-impulse/faq-answers", "mdna/faq-answers")
    "faq-016-how-do-i-create-communitas.md" = @("subportals/liminality-communitas/faq-answers", "mdna/faq-answers")
    "faq-017-how-do-i-implement-disciplism.md" = @("subportals/disciple-making/faq-answers", "mdna/faq-answers")
    "faq-018-how-do-i-build-organic-systems.md" = @("subportals/organic-systems/faq-answers", "mdna/faq-answers")
    "faq-019-how-do-i-reframe-understanding.md" = @("reframation/faq-answers")
    "faq-020-how-do-i-create-liminal-experiences.md" = @("subportals/liminality-communitas/faq-answers", "mdna/faq-answers")
    "faq-021-what-happens-when-mdna-elements-missing.md" = @("mdna/faq-answers")
    "faq-022-how-do-i-handle-resistance-to-change.md" = @("mdna/faq-answers", "metanoia/faq-answers")
    "faq-023-what-if-church-too-small-large.md" = @("mdna/faq-answers")
    "faq-024-how-do-i-know-mdna-activating.md" = @("mdna/faq-answers")
    "faq-025-common-mistakes-implementing.md" = @("mdna/faq-answers")
    "faq-026-how-does-this-work-specific-context.md" = @("mdna/faq-answers")
    "faq-027-what-if-leaders-dont-support.md" = @("mdna/faq-answers", "metanoia/faq-answers")
    "faq-028-how-long-does-transformation-take.md" = @("metanoia/faq-answers")
    "faq-029-what-resources-do-i-need.md" = @("mdna/faq-answers")
    "faq-030-how-do-i-measure-progress.md" = @("mdna/faq-answers")
}

# Concept definition mappings
$conceptMappings = @{
    "concept-definition-apest-5q-overview.md" = @("subportals/apest-fivefold-ministry/concept-definitions", "mdna/concept-definitions")
    "concept-definition-apest-culture.md" = @("subportals/apest-fivefold-ministry/concept-definitions", "mdna/concept-definitions")
    "concept-definition-apostle-aq.md" = @("subportals/apest-fivefold-ministry/concept-definitions", "mdna/concept-definitions")
    "concept-definition-apostolic-genius.md" = @("forgotten-ways/concept-definitions", "mdna/concept-definitions")
    "concept-definition-communitas.md" = @("subportals/liminality-communitas/concept-definitions", "mdna/concept-definitions")
    "concept-definition-disciple-making.md" = @("subportals/disciple-making/concept-definitions", "mdna/concept-definitions")
    "concept-definition-evangelist-eq.md" = @("subportals/apest-fivefold-ministry/concept-definitions", "mdna/concept-definitions")
    "concept-definition-jesus-is-lord-mdna.md" = @("subportals/jesus-is-lord/concept-definitions", "mdna/concept-definitions")
    "concept-definition-liminality.md" = @("subportals/liminality-communitas/concept-definitions", "mdna/concept-definitions")
    "concept-definition-metanoia.md" = @("metanoia/concept-definitions")
    "concept-definition-missional-incarnational-impulse.md" = @("subportals/missional-incarnational-impulse/concept-definitions", "mdna/concept-definitions")
    "concept-definition-movement-dna-mdna.md" = @("mdna/concept-definitions")
    "concept-definition-organic-systems.md" = @("subportals/organic-systems/concept-definitions", "mdna/concept-definitions")
    "concept-definition-prophet-pq.md" = @("subportals/apest-fivefold-ministry/concept-definitions", "mdna/concept-definitions")
    "concept-definition-shepherd-sq.md" = @("subportals/apest-fivefold-ministry/concept-definitions", "mdna/concept-definitions")
    "concept-definition-teacher-tq.md" = @("subportals/apest-fivefold-ministry/concept-definitions", "mdna/concept-definitions")
}

# Function to copy files based on mappings
function Copy-FilesByMapping {
    param(
        [string]$sourceSubdir,
        [hashtable]$mappings
    )
    
    foreach ($file in $mappings.Keys) {
        $sourcePath = Join-Path $sourceDir (Join-Path $sourceSubdir $file)
        if (Test-Path $sourcePath) {
            $destPaths = $mappings[$file]
            foreach ($destPath in $destPaths) {
                $fullDestPath = Join-Path $destDir $destPath
                $destFile = Join-Path $fullDestPath $file
                if (-not (Test-Path $fullDestPath)) {
                    New-Item -ItemType Directory -Path $fullDestPath -Force | Out-Null
                }
                Copy-Item $sourcePath $destFile -Force
                Write-Host "Copied $file to $destPath"
            }
        } else {
            Write-Warning "Source file not found: $sourcePath"
        }
    }
}

# Copy comprehensive Q&A files
Write-Host "Copying Comprehensive Q&A files..."
Copy-FilesByMapping "comprehensive-qa" $qaMappings

# Copy FAQ files
Write-Host "Copying FAQ files..."
Copy-FilesByMapping "faq-answers" $faqMappings

# Framework explanation mappings
$frameworkMappings = @{
    "framework-apest-5q.md" = @("subportals/apest-fivefold-ministry/framework-explanations", "mdna/framework-explanations")
    "framework-disciplism.md" = @("subportals/disciple-making/framework-explanations", "mdna/framework-explanations")
    "framework-mDNA-system.md" = @("mdna/framework-explanations")
    "framework-metanoia-journey.md" = @("metanoia/framework-explanations")
    "framework-missional-incarnational-impulse.md" = @("subportals/missional-incarnational-impulse/framework-explanations", "mdna/framework-explanations")
    "framework-movement-dynamics.md" = @("movement-intelligence/framework-explanations")
    "framework-organic-systems.md" = @("subportals/organic-systems/framework-explanations", "mdna/framework-explanations")
    "framework-paradigm-platform-practices.md" = @("metanoia/framework-explanations")
    "framework-reframation-process.md" = @("reframation/framework-explanations")
    "framework-integration-all-frameworks.md" = @("cross-portal/integrated-frameworks")
    "framework-integration-contexts.md" = @("cross-portal/integrated-frameworks")
    "framework-integration-mdna-apest.md" = @("cross-portal/integrated-frameworks", "mdna/framework-explanations")
    "framework-integration-metanoia-movement-dynamics.md" = @("cross-portal/integrated-frameworks", "metanoia/framework-explanations", "movement-intelligence/framework-explanations")
}

# Practical guide mappings
$practicalGuideMappings = @{
    "how-to-activate-apest-5q-in-your-context.md" = @("subportals/apest-fivefold-ministry/practical-guides", "mdna/practical-guides")
    "how-to-begin-the-metanoia-journey.md" = @("metanoia/practical-guides")
    "how-to-develop-missional-incarnational-practices.md" = @("subportals/missional-incarnational-impulse/practical-guides", "mdna/practical-guides")
    "how-to-embed-mdna-in-your-church.md" = @("mdna/practical-guides")
}

# Case study mappings (historical movements typically go to forgotten-ways and movement-intelligence)
$caseStudyMappings = @{
    "case-study-celtic-missionary-movement.md" = @("forgotten-ways/case-studies", "movement-intelligence/case-studies")
    "case-study-chinese-underground-church.md" = @("forgotten-ways/case-studies", "movement-intelligence/case-studies")
    "case-study-early-church-movement.md" = @("forgotten-ways/case-studies", "movement-intelligence/case-studies")
    "case-study-methodist-movement.md" = @("forgotten-ways/case-studies", "movement-intelligence/case-studies")
    "case-study-moravian-movement.md" = @("forgotten-ways/case-studies", "movement-intelligence/case-studies")
    "leader-profile-john-wesley.md" = @("forgotten-ways/case-studies", "movement-intelligence/case-studies")
    "leader-profile-st-patrick.md" = @("forgotten-ways/case-studies", "movement-intelligence/case-studies")
}

# Copy concept definition files
Write-Host "Copying Concept Definition files..."
Copy-FilesByMapping "concept-definitions" $conceptMappings

# Copy framework explanation files
Write-Host "Copying Framework Explanation files..."
Copy-FilesByMapping "framework-explanations" $frameworkMappings

# Copy practical guide files
Write-Host "Copying Practical Guide files..."
Copy-FilesByMapping "practical-guides" $practicalGuideMappings

# Copy case study files
Write-Host "Copying Case Study files..."
Copy-FilesByMapping "case-studies" $caseStudyMappings

# Copy remaining content types (connection maps, thematic deep-dives, topic clusters, contextual background, story index, voice-style-reference)
# These will be copied based on file name patterns and content analysis
Write-Host "Copying Connection Maps, Thematic Deep-Dives, Topic Clusters, Contextual Background, Story Index, and Voice/Style files..."

# Connection maps - many are cross-portal
$connectionMapFiles = Get-ChildItem "$sourceDir\connection-maps\*.md"
foreach ($file in $connectionMapFiles) {
    $fileName = $file.Name
    if ($fileName -match "mdna|apest|fivefold") {
        Copy-Item $file.FullName "$destDir\mdna\connection-maps\$fileName" -Force
        if ($fileName -match "apest|fivefold") {
            Copy-Item $file.FullName "$destDir\subportals\apest-fivefold-ministry\connection-maps\$fileName" -Force
        }
    }
    if ($fileName -match "integration|complementarity|framework") {
        Copy-Item $file.FullName "$destDir\cross-portal\connection-maps\$fileName" -Force
    }
    if ($fileName -match "movement") {
        Copy-Item $file.FullName "$destDir\movement-intelligence\connection-maps\$fileName" -Force
    }
    if ($fileName -match "metanoia|transformation") {
        Copy-Item $file.FullName "$destDir\metanoia\connection-maps\$fileName" -Force
    }
}

# Thematic deep-dives - map based on numbered files
$thematicFiles = Get-ChildItem "$sourceDir\thematic-deep-dives\*.md"
foreach ($file in $thematicFiles) {
    $fileName = $file.Name
    if ($fileName -match "01.*jesus.*lord|christocentrism") {
        Copy-Item $file.FullName "$destDir\subportals\jesus-is-lord\thematic-deep-dives\$fileName" -Force
        Copy-Item $file.FullName "$destDir\mdna\thematic-deep-dives\$fileName" -Force
    }
    elseif ($fileName -match "02.*discipleship|disciple") {
        Copy-Item $file.FullName "$destDir\subportals\disciple-making\thematic-deep-dives\$fileName" -Force
        Copy-Item $file.FullName "$destDir\mdna\thematic-deep-dives\$fileName" -Force
    }
    elseif ($fileName -match "03.*movement") {
        Copy-Item $file.FullName "$destDir\movement-intelligence\thematic-deep-dives\$fileName" -Force
    }
    elseif ($fileName -match "04.*transformation|change|metanoia") {
        Copy-Item $file.FullName "$destDir\metanoia\thematic-deep-dives\$fileName" -Force
    }
    elseif ($fileName -match "05.*community|communitas") {
        Copy-Item $file.FullName "$destDir\subportals\liminality-communitas\thematic-deep-dives\$fileName" -Force
        Copy-Item $file.FullName "$destDir\mdna\thematic-deep-dives\$fileName" -Force
    }
    elseif ($fileName -match "06.*mission|incarnation") {
        Copy-Item $file.FullName "$destDir\subportals\missional-incarnational-impulse\thematic-deep-dives\$fileName" -Force
        Copy-Item $file.FullName "$destDir\mdna\thematic-deep-dives\$fileName" -Force
    }
    elseif ($fileName -match "07.*leadership|ministry|apest") {
        Copy-Item $file.FullName "$destDir\subportals\apest-fivefold-ministry\thematic-deep-dives\$fileName" -Force
        Copy-Item $file.FullName "$destDir\mdna\thematic-deep-dives\$fileName" -Force
    }
    elseif ($fileName -match "08.*organizational|organic") {
        Copy-Item $file.FullName "$destDir\subportals\organic-systems\thematic-deep-dives\$fileName" -Force
        Copy-Item $file.FullName "$destDir\mdna\thematic-deep-dives\$fileName" -Force
    }
    elseif ($fileName -match "09.*cultural|engagement") {
        Copy-Item $file.FullName "$destDir\subportals\missional-incarnational-impulse\thematic-deep-dives\$fileName" -Force
        Copy-Item $file.FullName "$destDir\mdna\thematic-deep-dives\$fileName" -Force
    }
    elseif ($fileName -match "10.*simplicity|essence") {
        Copy-Item $file.FullName "$destDir\subportals\organic-systems\thematic-deep-dives\$fileName" -Force
        Copy-Item $file.FullName "$destDir\mdna\thematic-deep-dives\$fileName" -Force
    }
    elseif ($fileName -match "11.*crisis|opportunity|liminal") {
        Copy-Item $file.FullName "$destDir\subportals\liminality-communitas\thematic-deep-dives\$fileName" -Force
        Copy-Item $file.FullName "$destDir\mdna\thematic-deep-dives\$fileName" -Force
    }
    elseif ($fileName -match "12.*multiplication|reproduction") {
        Copy-Item $file.FullName "$destDir\movement-intelligence\thematic-deep-dives\$fileName" -Force
        Copy-Item $file.FullName "$destDir\subportals\organic-systems\thematic-deep-dives\$fileName" -Force
        Copy-Item $file.FullName "$destDir\mdna\thematic-deep-dives\$fileName" -Force
    }
}

# Connection maps - copy based on content
$connectionMapFiles = Get-ChildItem "$sourceDir\connection-maps\*.md" -ErrorAction SilentlyContinue
foreach ($file in $connectionMapFiles) {
    $fileName = $file.Name
    if ($fileName -match "mdna|apest|fivefold") {
        $destPath = "$destDir\mdna\connection-maps"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to mdna/connection-maps"
        if ($fileName -match "apest|fivefold") {
            $destPath = "$destDir\subportals\apest-fivefold-ministry\connection-maps"
            if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
            Copy-Item $file.FullName "$destPath\$fileName" -Force
            Write-Host "Copied $fileName to subportals/apest-fivefold-ministry/connection-maps"
        }
    }
    if ($fileName -match "integration|complementarity|framework") {
        $destPath = "$destDir\cross-portal\connection-maps"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to cross-portal/connection-maps"
    }
    if ($fileName -match "movement") {
        $destPath = "$destDir\movement-intelligence\connection-maps"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to movement-intelligence/connection-maps"
    }
    if ($fileName -match "metanoia|transformation") {
        $destPath = "$destDir\metanoia\connection-maps"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to metanoia/connection-maps"
    }
}

# Thematic deep-dives - map based on numbered files
$thematicFiles = Get-ChildItem "$sourceDir\thematic-deep-dives\*.md" -ErrorAction SilentlyContinue
foreach ($file in $thematicFiles) {
    $fileName = $file.Name
    if ($fileName -match "01.*jesus.*lord|christocentrism") {
        $destPath = "$destDir\subportals\jesus-is-lord\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        $destPath = "$destDir\mdna\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to jesus-is-lord and mdna/thematic-deep-dives"
    }
    elseif ($fileName -match "02.*discipleship|disciple") {
        $destPath = "$destDir\subportals\disciple-making\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        $destPath = "$destDir\mdna\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to disciple-making and mdna/thematic-deep-dives"
    }
    elseif ($fileName -match "03.*movement") {
        $destPath = "$destDir\movement-intelligence\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to movement-intelligence/thematic-deep-dives"
    }
    elseif ($fileName -match "04.*transformation|change|metanoia") {
        $destPath = "$destDir\metanoia\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to metanoia/thematic-deep-dives"
    }
    elseif ($fileName -match "05.*community|communitas") {
        $destPath = "$destDir\subportals\liminality-communitas\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        $destPath = "$destDir\mdna\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to liminality-communitas and mdna/thematic-deep-dives"
    }
    elseif ($fileName -match "06.*mission|incarnation") {
        $destPath = "$destDir\subportals\missional-incarnational-impulse\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        $destPath = "$destDir\mdna\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to missional-incarnational-impulse and mdna/thematic-deep-dives"
    }
    elseif ($fileName -match "07.*leadership|ministry|apest") {
        $destPath = "$destDir\subportals\apest-fivefold-ministry\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        $destPath = "$destDir\mdna\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to apest-fivefold-ministry and mdna/thematic-deep-dives"
    }
    elseif ($fileName -match "08.*organizational|organic") {
        $destPath = "$destDir\subportals\organic-systems\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        $destPath = "$destDir\mdna\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to organic-systems and mdna/thematic-deep-dives"
    }
    elseif ($fileName -match "09.*cultural|engagement") {
        $destPath = "$destDir\subportals\missional-incarnational-impulse\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        $destPath = "$destDir\mdna\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to missional-incarnational-impulse and mdna/thematic-deep-dives"
    }
    elseif ($fileName -match "10.*simplicity|essence") {
        $destPath = "$destDir\subportals\organic-systems\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        $destPath = "$destDir\mdna\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to organic-systems and mdna/thematic-deep-dives"
    }
    elseif ($fileName -match "11.*crisis|opportunity|liminal") {
        $destPath = "$destDir\subportals\liminality-communitas\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        $destPath = "$destDir\mdna\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to liminality-communitas and mdna/thematic-deep-dives"
    }
    elseif ($fileName -match "12.*multiplication|reproduction") {
        $destPath = "$destDir\movement-intelligence\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        $destPath = "$destDir\subportals\organic-systems\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        $destPath = "$destDir\mdna\thematic-deep-dives"
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        Copy-Item $file.FullName "$destPath\$fileName" -Force
        Write-Host "Copied $fileName to movement-intelligence, organic-systems, and mdna/thematic-deep-dives"
    }
}

# Topic clusters, contextual background, story index, voice-style-reference - copy to shared or appropriate portals
$sharedContentTypes = @("topic-clusters", "contextual-background", "story-index", "voice-style-reference")
foreach ($contentType in $sharedContentTypes) {
    $destPath = "$destDir\shared\$contentType"
    if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
    $files = Get-ChildItem "$sourceDir\$contentType\*.md" -ErrorAction SilentlyContinue
    if ($files) {
        foreach ($file in $files) {
            $fileName = $file.Name
            # Copy to shared directory
            Copy-Item $file.FullName "$destPath\$fileName" -Force
            Write-Host "Copied $fileName to shared/$contentType"
        }
    }
}

Write-Host "Done!"
