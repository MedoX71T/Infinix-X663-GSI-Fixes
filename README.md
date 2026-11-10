![Forge X663: GSI installation and network fixes for Infinix Note 11](.github/forge-x663.svg)

# Forge X663

> Beyond the factory build.

A step-by-step guide to installing an alternative Android system, called a **Generic System Image (GSI)**, on **Infinix Note 11 (X663)** and addressing Wi-Fi/mobile-data problems.

A GSI replaces Android’s system image; it is not an app or a normal system update. Stock firmware is the manufacturer’s original software package, and its full build number identifies the images your phone needs. Forge X663 connects MedoX71T’s patch files with beginner instructions and recovery checks.

**[Read the 22-step installation guide](docs/INSTALLATION.md)** · [Download and verify the images](forge-ready/README.md) · [Troubleshoot a problem](docs/TROUBLESHOOTING.md)

> [!WARNING]
> Unlocking the bootloader and factory reset erase your data. Match your full original stock-firmware build before using a pre-patched image. Keep matching stock recovery files; the included stock boot image is not a complete recovery kit.

## Choose your next step

Follow the full installation guide in order. Android Debug Bridge (ADB) is the computer program used to send commands to a running phone. Use its setup guide or the boot-patch guide when those preparation steps are unfamiliar; both return you to the same installation workflow.

| Your task | Read this | Checkpoint |
| --- | --- | --- |
| Install a GSI for the first time | [The 22-step installation guide](docs/INSTALLATION.md) | Firmware matched, files prepared, GSI installed and tested |
| Set up ADB for the first time | [ADB and fastboot setup](docs/ADB-SETUP.md) | Your computer sees the authorized phone |
| Prepare the networking boot patch | [Boot-patch preparation](docs/BOOT-PATCH.md) | A matching complete boot image is ready |
| Fix networking on an existing GSI | [Apply only the boot patch](docs/BOOT-PATCH.md#apply-the-patch-to-an-existing-gsi) | No unnecessary system erase or GSI reinstall |
| Remove the unlock warning | [Optional LK steps 17–22](docs/INSTALLATION.md#remove-boot-warnings-only-if-you-choose-to) | A separate optional bootloader change |
| Resolve a failed step | [Troubleshooting and recovery](docs/TROUBLESHOOTING.md) | The first error and recovery path identified |

## Match your stock firmware before downloading

The supplied images are listed for this original stock build:

`X663-H6915ABCEFGHIO-S-GL-230113V402`

Stock firmware is the manufacturer’s original Android software package. Find its complete build in **Settings → My Phone / About phone → Build number** before replacing Android. Compare the whole string, not only the device name, `V402`, or Android version.

- **Exact match**: use the supplied files only with the matching device and documented workflow
- **Different or unknown build**: do not flash these pre-patched images; identify the stock firmware and use your own supported images
- **GSI already installed**: its Android build number does not identify the original stock firmware

The maintainer’s suggested firmware directory is [FirmwareFile’s Infinix Note 11 X663 page](https://firmwarefile.com/infinix-note-11-x663/). It is a third-party source; check the selected package’s build and provenance.

## Understand the two patches

An image is a software file for one storage area of the phone, not a photograph. The networking patch and warning-removal patch modify different images:

| Task | Image | What it changes |
| --- | --- | --- |
| Reported Wi-Fi/mobile-data problem on a GSI | `patched_boot_bpf_fix.img` | A boot-image patch for a MediaTek kernel networking regression |
| Unlocked-bootloader warning | `lk-patched.img` | An optional Little Kernel (LK) bootloader patch |
| Keep an original boot reference | `stock_boot.img` | The saved unpatched boot image for the listed stock build |

Berkeley Packet Filter (BPF) is part of Android’s networking stack. The [upstream BPF patcher](https://github.com/R0rt1z2/mtk-bpf-patcher) addresses a MediaTek kernel bug; it does not add arbitrary missing kernel features. LK warning removal does not repair networking, relock the bootloader, or restore verified boot.

## Download the existing images

Keep the original filenames and check the [SHA-256 checksums](forge-ready/SHA256SUMS) after downloading:

| File | Size in bytes |
| --- | ---: |
| [patched_boot_bpf_fix.img](forge-ready/patched_boot_bpf_fix.img?raw=true) | 33,554,432 |
| [lk-patched.img](forge-ready/lk-patched.img?raw=true) | 1,167,792 |
| [stock_boot.img](forge-ready/stock_boot.img?raw=true) | 33,554,432 |

A matching checksum identifies the saved file. It does not prove device compatibility or provide a trusted signature. Matching stock LK, vbmeta, and other recovery images are not bundled.

Read the [download verification instructions](forge-ready/README.md#verify-your-download) for Windows, Linux, or macOS.

## Selected GSI projects

These are MedoX71T’s three selected Doze-off projects:

- [DerpFest Treble](https://github.com/Doze-off/Derpfest_treble)
- [Project Infinity-X](https://github.com/Doze-off/ProjectInfinity-X_gsi)
- [AxionOS](https://github.com/Doze-off/axion_aosp)

Read the chosen project’s release notes and device guidance before downloading. A recommendation does not guarantee that every release or image variant works on X663. Follow the [installation guide’s image-selection checks](docs/INSTALLATION.md#6-prepare-platform-tools-and-the-gsi).

## Questions before flashing

### Do I need to create the BPF patch myself?

Not if your full original stock build matches the supplied image’s target. Use the matching pre-patched file and [verify its checksum](forge-ready/README.md#verify-your-download). For another identified build, follow the supported own-image path in [boot-patch preparation](docs/BOOT-PATCH.md).

### Do I install ADB on the phone?

No. ADB and fastboot run on your computer. You enable USB debugging on the phone and authorize the computer’s connection. Follow [ADB setup](docs/ADB-SETUP.md) before sending commands.

### Must I reinstall the GSI to fix networking?

Not merely to apply the boot patch when a GSI already boots and the bootloader is already unlocked. The [existing-GSI path](docs/BOOT-PATCH.md#apply-the-patch-to-an-existing-gsi) changes the matching boot image without adding a system erase, unlock, or factory reset.

### Is the LK warning patch required?

No. LK warning removal is optional and does not repair networking. Keep it separate from the boot patch, and read the [optional LK requirements](docs/INSTALLATION.md#remove-boot-warnings-only-if-you-choose-to) before modifying bootloader code.

## Results and limits

MedoX71T created the supplied patches and previously reported GSI networking results through Android 16. The [five original device screenshots](src/) remain available, including Android 15, Android 16, and LK examples. They are maintainer examples, not a complete firmware/GSI compatibility matrix.

A working network patch does not guarantee every GSI feature, including carrier calling, hotspot, camera, or encryption. Support depends on the exact stock firmware and GSI release. Do not infer support for another phone or stock build.

## Report a problem or contact the maintainer

Open an [installation or patch problem report](https://github.com/MedoX71T/Infinix-X663-GSI-Fixes/issues/new?template=problem.yml). Include the full original stock build, exact GSI release, files and partitions changed, current phone mode, and the first error message.

Remove passwords, account details, IMEI, device serials, Wi-Fi names, and private information from logs or screenshots before posting.

Existing contacts are:

- [MedoX71T on Telegram](https://t.me/MedoX71T)
- [Doze-off GSI group](https://t.me/dozeoff_treble), the upstream group rather than a dedicated Forge forum

## Credits and license

MedoX71T created the supplied patches, tested the original setup, and wrote the installation workflow. [R0rt1z2](https://github.com/R0rt1z2) maintains [mtk-bpf-patcher](https://github.com/R0rt1z2/mtk-bpf-patcher) and [lkpatcher](https://github.com/R0rt1z2/lkpatcher). Doze-off maintains the selected GSI projects.

The repository retains its [MIT license](LICENSE). Linked tools and original firmware components retain their own licenses and rights. Software is provided as is, without warranty.

[Forge X663 brand direction](docs/BRAND.md)
