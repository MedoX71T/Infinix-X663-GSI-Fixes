# Forge Ready — pre-patched images

Maintainer-created files for Infinix Note 11 (X663). Networking and optional boot-warning removal are separate tasks.

## Stock-firmware target

Existing maintainer-listed identifier, preserved literally:

`X663-H6915ABCDEFGHIO-S-GL-230113V402`

Match your original stock firmware before using pre-patched images. An installed GSI’s version is not the stock build. These files are not a universal firmware patch.

## Files

| Image | Role | SHA-256 |
| --- | --- | --- |
| [patched_boot_bpf_fix.img](patched_boot_bpf_fix.img) | Boot-image networking patch | `2d85ca76cd1a1b2bdcb09641fa07e3d60ca324225c634bd6aa08344cd7c8ba86` |
| [lk-patched.img](lk-patched.img) | Optional Little Kernel warning-removal patch | `a7f9aea6fdeaf0c60cb8522424b35c131fea7af7eb0a837f72c2035d1ad6be8e` |
| [stock_boot.img](stock_boot.img) | Saved original boot reference | `3c2a70733284d75b9726bf1c7ea656cd185b4c16d03d9dc5f325fb03f8f80ffd` |

Hashes identify these saved files; they are not signatures or compatibility certificates. MedoX71T created the patches. No files are changed by the frontend.

## Before flashing

- Back up data. Bootloader unlocking erases it.
- Keep untouched, matching stock images and know the recovery path.
- Stock LK, vbmeta, and other recovery partitions are not bundled here.
- LK warning removal is optional and is not the networking patch.
- Record the firmware, GSI build, changed partitions, symptoms, and results.

For other firmware, use your own images and read [Forge Manual](../forge-manual/README.md). Follow device-specific instructions rather than assuming a generic flashing recipe.

[Homepage file inspector](../index.html#ready) · [Releases](https://github.com/MedoX71T/Infinix-X663-GSI-Fixes/releases) · [Main documentation](../README.md)
