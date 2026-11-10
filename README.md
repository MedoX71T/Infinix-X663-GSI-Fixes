# Forge X663

> Maintainer-created GSI networking patches and optional boot-warning removal for Infinix Note 11 (X663).

This is a static landing page plus firmware-image files and documentation. It is not a build system or a compatibility-certification service. Files and recommendations come from the maintainer’s work; individual firmware/GSI combinations still need their own checks.

## Workshop

- [Homepage](index.html)
- [Forge Ready — pre-patched images](forge-ready/README.md)
- [Forge Manual — own-image guidance](forge-manual/README.md)
- [Problem Wall — risks and bug reports](problem-wall/README.md)
- [Gathering Table — community guidance](gathering-table/README.md)
- [Repository review](REVIEW.md)

## Files and stock-firmware target

The existing maintainer-listed stock-firmware identifier is:

`X663-H6915ABCDEFGHIO-S-GL-230113V402`

It is preserved literally. Do not treat an installed GSI’s version number as the original stock-firmware build. A file hash identifies an image; it does not prove compatibility or a trusted signature.

| File | Role | Bytes |
| --- | --- | ---: |
| [patched_boot_bpf_fix.img](forge-ready/patched_boot_bpf_fix.img) | Maintainer’s boot-image networking patch | 33,554,432 |
| [lk-patched.img](forge-ready/lk-patched.img) | Optional Little Kernel warning-removal patch | 1,167,792 |
| [stock_boot.img](forge-ready/stock_boot.img) | Saved original boot reference | 33,554,432 |

A stock boot image is not a complete recovery kit. Stock LK, vbmeta, and other device-specific recovery files are not bundled.

## Selected GSIs

These are MedoX71T’s selected upstream references, all maintained by Doze-off. Their repositories describe bypass patches and overlay resources; this is not independent confirmation that every build works on X663.

- [Derpfest Treble](https://github.com/Doze-off/Derpfest_treble)
- [Project Infinity-X](https://github.com/Doze-off/ProjectInfinity-X_gsi)
- [AxionOS](https://github.com/Doze-off/axion_aosp)

Read each project’s current release and device notes. No additional generic-GSI recommendations are included.

## Patching resources and risks

BPF means Berkeley Packet Filter. The [upstream MediaTek BPF patcher](https://github.com/R0rt1z2/mtk-bpf-patcher) describes a binary patch for a MediaTek arraymap regression. It works on the kernel; its output must not be assumed to be a repacked flashable boot image.

LK means Little Kernel, the bootloader code. [lkpatcher](https://github.com/R0rt1z2/lkpatcher) has several patch categories; warning removal is separate from the networking task. Follow its current documentation and recovery requirements.

Before modifying partitions:

1. Back up your data and keep matching, untouched stock images.
2. Understand your device’s partition and recovery workflow.
3. Read the relevant upstream tool’s supported inputs, outputs, and patch categories.
4. Record the exact firmware, GSI build, changed images, symptoms, and results.

Bootloader unlocking erases data. Firmware mismatches can prevent booting. VoLTE, VoWiFi, hotspot, and SELinux behavior depend on the firmware and GSI. No new flashing recipe is presented here as device-verified.

## Reports and contact

Use [GitHub Issues](https://github.com/MedoX71T/Infinix-X663-GSI-Fixes/issues) for public reports. Include the full stock build, exact GSI release, changes, and relevant logs with private data removed.

- [Maintainer Telegram](https://t.me/MedoX71T)
- [Upstream Doze-off GSI group](https://t.me/dozeoff_treble)

The upstream group is not a dedicated Forge forum. GitHub Discussions is not promoted while disabled.

## Frontend development

No framework or package install is required. Serve the repository over HTTP for ES modules:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080/`. Do not rely on `file://` for the module-driven menu, tabs, and effects.

```sh
node --test tests/site.test.mjs
```

`tests/browser.html` exercises actual file-tab behavior against the local homepage. The design system stays unmodified; page-specific branding is in `assets/forge.css`.

Publishing and a canonical site URL require separate setup. Local checks do not establish public deployment or search indexing. A project-path robots.txt does not control GitHub Pages’ origin-wide crawler policy.

## Credits and license

MedoX71T created the supplied patches. R0rt1z2 maintains the upstream patchers. Doze-off maintains the selected GSI projects. Original screenshots and firmware files remain preserved.

Repository license: [MIT](LICENSE). The linked upstream tools retain their own licenses. Software is provided as is, without warranty.
