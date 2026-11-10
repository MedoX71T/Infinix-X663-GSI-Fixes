# Forge X663 brand and documentation conventions

Use one identity and one connected learning path across the repository. The README is the project’s branded front door, not a website.

## Identity

- **Name**: Forge X663
- **Tagline**: Beyond the factory build.
- **Device**: Infinix Note 11 (X663)
- **Purpose**: beginner GSI installation guidance, firmware-specific Wi-Fi/mobile-data boot patches, and optional boot-warning removal
- **Audience**: phone owners who can use their phone and download files, but may not know GSI, firmware, ADB, BPF patching, or flashing
- **Language**: English throughout the public repository

The tagline expresses installing and maintaining Android beyond the stock build. It does not claim that Infinix abandoned the phone, that every GSI works, or that every hardware problem is repaired.

## Creative direction

The working insight is that X663 owners want another Android build without losing a usable phone, but unfamiliar files and missing steps leave them unsure what to change. This is derived from the maintainer’s brief, not interview research.

Use an owner’s patch kit as the central idea: name each file, explain its purpose, and give the reader an ordered next action. Put firmware matching before downloads and recovery preparation before risky commands.

Rejected directions are developer dashboards, workshop-themed navigation, universal-fix claims, and decorative award scores. They obscure the beginner’s task or imply unsupported evidence. No numerical creative score establishes device compatibility.

## Visual language

The [README banner](../.github/forge-x663.svg) uses these fixed colors:

| Role | Color |
| --- | --- |
| Beige background | `#f3ede3` |
| Dark brown wordmark | `#332a23` |
| Brown tagline | `#665345` |
| Brown accent | `#94684b` |
| Supporting text | `#765944` |
| Fine border | `#d7c8b7` |

Keep the banner static, with no scripts, animation, downloaded fonts, or external assets. Keep the device and purpose readable in normal README text as well; the image is not the only source of information. GitHub’s native typography and theme control the documentation below it.

## Voice and reader journey

Explain a concept before using it in a command. Use plain English, direct verbs, short paragraphs, and descriptive headings.

The reading order is:

1. Identify the phone, problem, and purpose
2. Explain GSI, stock firmware, image files, and firmware matching
3. Prepare ADB and the boot patch without modifying the phone’s partitions
4. Follow the numbered unlock/flashing workflow, with mode checks and stopping conditions
5. Keep optional LK warning removal separate
6. Check results, recover if needed, and report useful evidence

Each tutorial states its goal, required inputs, expected checkpoint, and return/continue links. Keep the full 22-step installation guide as the main route; the ADB and boot-patch guides explain prerequisites in more detail rather than creating competing installation recipes.

Use **Wi-Fi** and **mobile data** in reader-facing prose. Preserve filenames, stock-build identifiers, commands, upstream repository slugs, and quoted error text literally. Attribute reported results to MedoX71T and do not invent certifications or broader firmware support.

## Discovery without a website

Use the device and task naturally in the README introduction, tutorial titles, repository description, and GitHub topics. Link the authoritative Android and patcher documentation where it supports an instruction.

| Reader intent | Owning document |
| --- | --- |
| Infinix Note 11 X663 GSI guide and project scope | [README](../README.md) |
| Install ADB and connect the phone | [ADB setup](ADB-SETUP.md) |
| Prepare a BPF boot patch or apply it to an existing GSI | [Boot-patch guide](BOOT-PATCH.md) |
| Install and flash a new GSI | [Installation guide](INSTALLATION.md) |
| Fix a failed connection, command, boot, or networking test | [Troubleshooting](TROUBLESHOOTING.md) |
| Download images and compare checksums | [Image reference](../forge-ready/README.md) |

Do not add a keyword-stuffed footer, duplicate AI-only guide, HTML meta tags in Markdown, or a repository `robots.txt` as a substitute for readable content. GitHub controls its own hosting, metadata, and crawler behavior. Google and AI-search indexing, rankings, and citations are not guaranteed by this rebrand.

## Method attribution

Creative-direction framework: Serge Shima, [creative-director-skill](https://github.com/smixs/creative-director-skill), CC BY 4.0. The approved repository identity adapts the framework’s insight-first approach, SIT, bisociation, and inversion methods to a documentation-first project.

[Return to Forge X663](../README.md)
