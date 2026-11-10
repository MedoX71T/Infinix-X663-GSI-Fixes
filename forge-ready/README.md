# Download Forge X663 images and the phone patcher

Download the pre-patched firmware images or the Android app for patching your own stock `boot.img`. Check your original stock build in the [installation guide](../docs/INSTALLATION.md) before choosing a pre-patched image.

## Match the listed stock build

Match your full original stock build before using these pre-patched images:

`X663-H6915ABCEFGHIO-S-GL-230113V402`

Do not substitute a nearby firmware version or use the Android version shown by an installed Generic System Image (GSI). If the full stock build is unknown or different, use your own matching firmware and a patcher that supports it.

## Choose the file for your task

| Image | Purpose | Size in bytes |
| --- | --- | ---: |
| [patched_boot_bpf_fix.img](patched_boot_bpf_fix.img?raw=true) | Boot-image patch for GSI Wi-Fi/mobile-data problems | 33,554,432 |
| [lk-patched.img](lk-patched.img?raw=true) | Optional Little Kernel (LK) boot-warning patch | 1,167,792 |
| [stock_boot.img](stock_boot.img?raw=true) | Saved original boot image for the listed stock build | 33,554,432 |

The stock boot image is not a full recovery kit. Matching stock LK, vbmeta, and other recovery images are not bundled.

## Download the automatic phone patcher

The Android application package (APK) patches your own matching stock `boot.img` on the phone. It is an app, not one of the pre-patched firmware images above.

| App | Purpose | Size in bytes |
| --- | --- | ---: |
| [mtk-bpf-patcher-release.apk](mtk-bpf-patcher-release.apk?raw=true) | Automatic stock boot-image patching on Android | 3,905,918 |

Follow the [phone-patching steps](../docs/BOOT-PATCH.md#path-b-prepare-your-own-matching-boot-image) to install the APK, choose **Select File**, and save the automatic patch result. You don’t need Python or a terminal script for patching. Copy the completed boot image to your computer for the flashing steps.

## Verify your download

Use [SHA256SUMS](SHA256SUMS) to compare any downloaded image or APK with the saved file. A matching hash checks file identity, not firmware compatibility, app safety, or a trusted signature.

On Linux or macOS, run this from the folder containing the three images, the APK, and `SHA256SUMS`:

```sh
sha256sum -c SHA256SUMS
```

If macOS does not provide `sha256sum`, use `shasum -a 256 -c SHA256SUMS`.

In Windows PowerShell, compute the boot patch’s hash and compare it with the same filename in `SHA256SUMS`:

```powershell
Get-FileHash .\patched_boot_bpf_fix.img -Algorithm SHA256
```

For an APK-only download, compute its hash in Windows PowerShell and compare it with the APK’s entry in `SHA256SUMS`:

```powershell
Get-FileHash .\mtk-bpf-patcher-release.apk -Algorithm SHA256
```

On Linux, use `sha256sum mtk-bpf-patcher-release.apk`. On macOS, use `shasum -a 256 mtk-bpf-patcher-release.apk`. The whole-manifest command expects all four listed downloads; use the file-specific command if you downloaded only the APK.

Use the same file-specific check with another filename to verify an individual image.

## Keep networking and warning removal separate

Flash the boot patch only with a matching firmware and a supported installation procedure. LK warning removal is optional and does not repair networking, relock the bootloader, or restore verified boot.

Back up your data and keep untouched matching recovery images before changing partitions. Bootloader unlocking and factory reset erase user data.

[Boot-patch preparation](../docs/BOOT-PATCH.md) · [ADB setup](../docs/ADB-SETUP.md) · [Installation guide](../docs/INSTALLATION.md) · [Troubleshooting](../docs/TROUBLESHOOTING.md) · [Back to Forge X663](../README.md)
