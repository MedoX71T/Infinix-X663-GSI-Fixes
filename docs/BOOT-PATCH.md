# Prepare the BPF networking boot patch

Choose a matching pre-patched boot image or prepare one from your own stock firmware. This guide explains the files and the Android APK workflow before you reach a flashing command.

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

Choose this path only when you have identified and obtained your own exact stock firmware, and the selected patcher supports its boot-image format.

### 1. Extract and keep the stock original

Download matching stock firmware from the source you checked in [installation step 3](INSTALLATION.md#3-download-and-extract-matching-stock-firmware). The maintainer’s suggested directory is [FirmwareFile’s Infinix Note 11 X663 page](https://firmwarefile.com/infinix-note-11-x663/), a third-party source.

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

The maintainer’s original Android application package (APK) source is [the BPF patcher attachment on XDA](https://xdaforums.com/attachments/mtk-bpf-patcher-release-apk.6238876/).

Check the attachment’s author, instructions, and requested permissions before installing it. If Android asks for permission to install an unknown app, allow it only for the verified download source, then disable that installation permission afterward.

If XDA shows a browser security check or blocks the attachment, open the original link in a normal browser. If it still will not download, contact MedoX71T rather than choosing an unknown APK mirror.

This attachment is not a published release in R0rt1z2’s Python repository. This documentation update did not inspect or certify the APK. Do not treat an unfamiliar APK with a similar filename as the same tool.

### 4. Select the matching input and run the patch

Follow the maintainer’s recorded APK workflow:

1. Open the patcher app.
2. Choose **Select input file**.
3. Open the folder where you copied `boot.img` and select that file.
4. Follow the app’s patch action and wait for its result; button labels and output locations depend on the APK version.
5. Record the output filename and where the app saved it.

Do not select a GSI `system.img`, `lk.img`, `vbmeta.img`, or an already patched boot image as the stock boot input.

> [!IMPORTANT]
> Use this APK path only if its version supports full boot-image input and repacking. A raw patched kernel is not a flashable boot image. The [upstream Python BPF patcher](https://github.com/R0rt1z2/mtk-bpf-patcher) patches an extracted kernel; its command alone does not repack `boot.img`. Stop if the app rejects the input or does not establish the output format.

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

### Optional: check the maintainer’s earlier ADB workaround

The previous README suggested clearing restricted networking mode before trying the boot patch. This is an Android setting workaround, not a repair to the MediaTek kernel bug.

Read the setting while Android is running:

```bat
adb shell settings get global restricted_networking_mode
```

If it reports `1` and you did not enable that restriction as a security policy, the maintainer’s earlier command disables it:

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
