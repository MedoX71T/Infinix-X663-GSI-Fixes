# Forge Manual — own-image guidance

Start from your own stock-firmware images when a pre-patched image is not suitable. Patching your own image does not guarantee that a tool supports it.

## Preparation

1. Identify the original stock build and keep its untouched images.
2. Back up data and understand the device-specific recovery path.
3. Read the upstream tool’s accepted input, output format, and supported patch categories.
4. Record what changed and the resulting behavior.

## Upstream tools

- [MediaTek BPF patcher](https://github.com/R0rt1z2/mtk-bpf-patcher): binary patching of a MediaTek arraymap regression. The tool works on a kernel; do not assume its output is a repacked boot image.
- [lkpatcher](https://github.com/R0rt1z2/lkpatcher): Little Kernel patching with several categories. Optional warning removal is separate from networking; review intended categories and recovery requirements.
- [Android Platform Tools](https://developer.android.com/tools/releases/platform-tools): official ADB and fastboot tools.

Follow current upstream documentation for installation and usage. No nonexistent `bpf_patcher.py`, fabricated module injection, signature-preservation guarantee, or universal firmware support is claimed here. No new flashing workflow is presented as device-verified.

## Workshop references

- [Brand colors](colors.md)
- [Frontend guide](../index.html#manual)
- [Forge Ready files](../forge-ready/README.md)
- [Problem Wall](../problem-wall/README.md)

[Main documentation](../README.md)
