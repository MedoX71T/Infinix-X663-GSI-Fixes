# Download images for Forge X663

These are MedoX71T’s existing firmware-image files for Infinix Note 11 (X663). Choose an image only after checking your original stock build in the [installation guide](../docs/INSTALLATION.md).

## Match the listed stock build

The supplied images are listed for this original stock build:

`X663-H6915ABCEFGHIO-S-GL-230113V402`

Do not substitute a nearby firmware version or use the Android version shown by an installed Generic System Image (GSI). If the full stock build is unknown or different, use your own matching firmware and a patcher that supports it.

## Choose the file for your task

| Image | Purpose | Size in bytes |
| --- | --- | ---: |
| [patched_boot_bpf_fix.img](patched_boot_bpf_fix.img?raw=true) | Boot-image patch for the reported GSI Wi-Fi/mobile-data problem | 33,554,432 |
| [lk-patched.img](lk-patched.img?raw=true) | Optional Little Kernel (LK) boot-warning patch | 1,167,792 |
| [stock_boot.img](stock_boot.img?raw=true) | Saved original boot image for the listed stock build | 33,554,432 |

The stock boot image is not a full recovery kit. Matching stock LK, vbmeta, and other recovery images are not bundled.

## Verify your download

Use [SHA256SUMS](SHA256SUMS) to compare a downloaded image with the saved file. A matching hash checks file identity, not firmware compatibility or a trusted signature.

On Linux or macOS, run this from the folder containing the three images and `SHA256SUMS`:

```sh
sha256sum -c SHA256SUMS
```

If macOS does not provide `sha256sum`, use `shasum -a 256 -c SHA256SUMS`.

In Windows PowerShell, compute the boot patch’s hash and compare it with the same filename in `SHA256SUMS`:

```powershell
Get-FileHash .\patched_boot_bpf_fix.img -Algorithm SHA256
```

Use the same command with each other filename to check those downloads.

## Keep networking and warning removal separate

Flash the boot patch only with a matching firmware and a supported installation procedure. LK warning removal is optional and does not repair networking, relock the bootloader, or restore verified boot.

Back up your data and keep untouched matching recovery images before changing partitions. Bootloader unlocking and factory reset erase user data.

[Boot-patch preparation](../docs/BOOT-PATCH.md) · [ADB setup](../docs/ADB-SETUP.md) · [Installation guide](../docs/INSTALLATION.md) · [Troubleshooting](../docs/TROUBLESHOOTING.md) · [Back to Forge X663](../README.md)
