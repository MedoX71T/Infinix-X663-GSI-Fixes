# Prepare the BPF networking boot patch

Choose a matching pre-patched boot image or patch your own stock `boot.img` automatically on your phone. The Android application package (APK) handles the patching step; this guide then returns you to computer-based flashing.

**Berkeley Packet Filter (BPF)** is part of Android’s networking stack. The upstream MediaTek BPF patcher addresses a kernel bug associated with networking failures. The kernel is core system code stored inside the phone’s boot image. Patching a file does not install it; flashing writes the completed image to the phone.

An `.img` here is a firmware image file, not a photograph. Use a complete boot image for the `boot` partition, which is the phone’s storage area for that image.

[Project overview](../README.md) · [ADB setup](ADB-SETUP.md) · [Full installation guide](INSTALLATION.md)

## First, identify the original stock firmware

Stock firmware is the manufacturer’s original software package. Its full build number identifies the version the patch must match.

Read [installation step 1](INSTALLATION.md#1-record-the-model-and-original-stock-build) and record the complete build before replacing Android. The current repository target is:

`X663-H6915ABCEFGHIO-S-GL-230113V402`

Do not identify the stock build from an installed GSI’s Android version. If the original build is unknown, stop before choosing a pre-patched file.

## Path A: use the supplied matching image

Choose this path only when the phone is Infinix Note 11 (X663) and its full stock build matches the listed target.

1. Download [patched_boot_bpf_fix.img](../forge-ready/patched_boot_bpf_fix.img?raw=true).
2. Keep that filename. Do not choose `stock_boot.img`, which is the unpatched reference.
3. Compare the download’s SHA-256 with [SHA256SUMS](../forge-ready/SHA256SUMS), using the [Windows/Linux/macOS verification instructions](../forge-ready/README.md#verify-your-download).
4. Copy the verified file into your computer’s extracted `platform-tools` folder.

You do not need to run the BPF patcher APK on an already patched image. Continue with [new-installation flashing](#continue-with-a-new-gsi-installation) or [the existing-GSI path](#apply-the-patch-to-an-existing-gsi).

## Path B: prepare your own matching boot image

Use `mtk-bpf-patcher-release.apk` to patch a working copy of your matching stock `boot.img` on Android. The app patches the file automatically after you choose it with **Select File**. You don’t need Python or a computer script for this patching step.

### 1. Extract and keep the stock original

Download matching stock firmware from the source you checked in [installation step 3](INSTALLATION.md#3-download-and-extract-matching-stock-firmware). Use [FirmwareFile’s Infinix Note 11 X663 page](https://firmwarefile.com/infinix-note-11-x663/) to find your matching package. Check the build and source; it is not Infinix’s official support service.

Extract the package on the computer and locate `boot.img`. Save an untouched copy in a recovery folder. Work from a second copy, not your only stock original.

### 2. Copy boot.img to the phone

Use USB file transfer while Android is running:

1. Connect and unlock the phone.
2. Select **File transfer** from its USB notification.
3. Open the phone’s shared storage on the computer.
4. Copy your working `boot.img` to a folder you can find, such as **Download**.
5. Check that the copy finished before disconnecting the cable.

Copy the actual `boot.img`, not the stock-firmware ZIP. The APK needs an input image, not the whole archive.

### 3. Obtain the Android patcher APK

Download [mtk-bpf-patcher-release.apk](../forge-ready/mtk-bpf-patcher-release.apk?raw=true) from this repository to your phone. The [download guide](../forge-ready/README.md#verify-your-download) explains how to compare its SHA-256 with [SHA256SUMS](../forge-ready/SHA256SUMS).

Check the download source and requested permissions before installing the app. If Android asks for permission to install an unknown app, allow it only for the download you chose. Disable that installation permission afterward.

Use the [XDA attachment](https://xdaforums.com/attachments/mtk-bpf-patcher-release-apk.6238876/) as an additional download reference. Check the source before installing an APK with a similar filename.

### 4. Select boot.img for automatic patching

Patch the working copy on your phone:

1. Open the installed patcher app.
2. Tap **Select File**.
3. Open the folder where you copied your matching stock `boot.img` and select that file.
4. The app starts patching automatically after selection. Wait for it to finish and check the result.
5. Record the completed output’s filename and the folder where the app saved it.

Do not select a GSI `system.img`, `lk.img`, `vbmeta.img`, or an already patched boot image as the stock boot input.

> [!IMPORTANT]
> This APK workflow uses the complete stock `boot.img`. Stop if the app reports an error or does not produce a completed patched boot image. The separate [upstream Python BPF patcher](https://github.com/R0rt1z2/mtk-bpf-patcher) patches an extracted kernel and does not repack it into `boot.img`; you don’t need that CLI for the phone workflow. Never flash a raw kernel as a boot image.

### 5. Copy the completed output back to the computer

Find the output location reported by the app, reconnect USB file transfer, and copy the completed full boot image into `platform-tools`. Keep its actual filename and retain the stock original separately.

Transfer the output **before unlocking the bootloader**. Unlocking erases phone storage and can delete the file you created there.

Your output is ready for the next stage only when you know its input stock build, actual filename, output location, and full boot-image format. A `.img` extension or nonzero size alone does not establish that it is valid.

## Continue with a new GSI installation

Return to [step 6 of the installation guide](INSTALLATION.md#6-prepare-platform-tools-and-the-gsi), prepare the remaining files, and follow the unlock/flashing steps in order. [Step 11](INSTALLATION.md#11-flash-the-full-networking-boot-patch) applies the complete boot patch.

Creating the patched file on the phone is preparation, not installation. The new-GSI workflow also needs the correct system image, matching vbmeta files where applicable, and a supported recovery path.

## Apply the patch to an existing GSI

Do not erase or reinstall `system` merely to apply a networking boot patch. This path assumes Android already boots, the bootloader is already unlocked, and you have selected a supported full boot image from the matching original stock firmware.

Before sending a command, complete these checks:

- Confirm the full original stock build and keep untouched matching recovery images
- Prepare the complete boot image using Path A or supported Path B above
- Finish [ADB setup](ADB-SETUP.md) and authorize your computer
- Confirm the bootloader is already unlocked; unlocking it now would erase data

### Optional: check restricted networking mode

Check whether Android’s restricted networking mode is blocking the connection before flashing a boot image. Changing this setting does not repair the kernel bug.

Read the setting while Android is running:

```bat
adb shell settings get global restricted_networking_mode
```

If it reports `1` and you did not enable that restriction as a security policy, disable it with:

```bat
adb shell settings put global restricted_networking_mode 0
```

Test Wi-Fi and mobile data afterward. If this solves your problem, do not flash an image solely for that symptom. Do not clear a deliberate device-management policy. If the setting is `0`, `null`, unsupported, or unclear, this check does not establish a fix. To restore a previously enabled setting, set its recorded value back to `1`.

### Enter bootloader mode and check the connection

From the authorized running Android phone, reboot into the bootloader:

```bat
adb reboot bootloader
```

Check the connection and phone mode before writing an image:

```bat
fastboot devices
fastboot getvar is-userspace
```

The intended mode is bootloader fastboot, which reports `no` for `is-userspace`. If it reports `yes`, you are in fastbootd; run `fastboot reboot bootloader` and check again. If the mode cannot be established, stop and use the device-specific guidance.

### Flash the chosen complete boot image

For the repository’s matching supplied file, run:

```bat
fastboot flash boot "patched_boot_bpf_fix.img"
```

For an APK-generated full boot image, replace the quoted filename with its actual output filename. Do not paste the command unchanged if that file is not the image you chose.

Wait for the write to succeed, then reboot:

```bat
fastboot reboot
```

Stop on `FAILED`. This existing-GSI path does not run bootloader unlocking, system erasing, or factory-reset commands. It is still a firmware change and can cause a boot problem if the image is incompatible. If verification or boot fails, follow [recovery guidance](TROUBLESHOOTING.md#recover-from-a-boot-problem) instead of changing more partitions by trial and error.

## Check networking separately

Test Wi-Fi with mobile data disabled, then mobile data with Wi-Fi disabled. Record the exact GSI release, original stock build, patched boot filename, and results.

Read [networking troubleshooting](TROUBLESHOOTING.md#diagnose-networking-after-the-gsi-boots) if either test fails. LK boot-warning removal is a separate optional task and will not repair networking.

[Back to Forge X663](../README.md) · [Continue the installation guide](INSTALLATION.md#6-prepare-platform-tools-and-the-gsi) · [Troubleshoot a patch problem](TROUBLESHOOTING.md)
