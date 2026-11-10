# Install a GSI on Infinix Note 11 (X663)

Follow MedoX71T’s workflow to prepare matching stock firmware, install a Generic System Image (GSI), and apply the networking boot patch. Steps 17–22 cover optional boot-warning removal. Start from step 1 for a new installation; use the separate [existing-GSI boot-patch path](BOOT-PATCH.md#apply-the-patch-to-an-existing-gsi) if Android already boots and networking is your only task.

## Understand the changes before starting

A GSI is an alternative Android system image. Installing one replaces Android’s system software, not every device-specific driver. It is not an app or an ordinary system update.

Stock firmware is the manufacturer’s original software package. Its full build number identifies the revision your images must match. An image file, such as `boot.img`, contains software for one partition, a storage area on the phone.

Flashing means writing that image to its partition. The bootloader starts the phone and controls which images can boot; unlocking it allows custom images and erases user data.

Need more detail before a command? Read [ADB setup](ADB-SETUP.md) and [boot-patch preparation](BOOT-PATCH.md), then return to the numbered steps below.

The two patches have separate purposes:

- **Boot patch**: addresses the reported MediaTek kernel networking problem affecting Wi-Fi and mobile data
- **Little Kernel (LK) patch**: removes the unlocked-bootloader warning; it is optional and does not repair networking

Bootloader fastboot and userspace fastboot (fastbootd) use the same computer command, `fastboot`, but they are different phone modes. This guide flashes boot and LK in bootloader mode, and the logical system partition in fastbootd.

> [!WARNING]
> Bootloader unlocking and factory reset erase your data. Wrong firmware or bootloader images can prevent the phone from starting. Back up your data, save untouched matching stock images, and understand the X663 recovery procedure before continuing. Do not relock the bootloader while modified images remain installed.

## Prepare the phone and files

Complete these steps before unlocking or erasing a partition. Keep your stock originals in a separate backup folder.

### 1. Record the model and original stock build

Open **Settings → My Phone** or **About phone**. Record the model and the complete **Build number** or **Software information** string.

Confirm the phone is **Infinix Note 11 (X663)**. The supplied images are listed for this original stock build:

`X663-H6915ABCEFGHIO-S-GL-230113V402`

Compare the entire string, not only `V402`, `X663`, or the Android version. If a GSI is already installed, its build number is not your original stock-firmware identifier. If the original build is unknown, stop before using the supplied patches.

### 2. Back up data and prepare recovery

Copy photos, documents, and other important files to another device. Check how to restore your exact stock firmware before changing partitions.

Keep the complete matching stock package and its untouched images. The repository’s `stock_boot.img` is one boot image, not a complete recovery kit. Keep matching stock LK and vbmeta images even if you only plan to use the networking patch.

### 3. Download and extract matching stock firmware

Download the stock package that matches the full build recorded in step 1. The maintainer’s suggested download directory is [FirmwareFile: Infinix Note 11 X663 firmware](https://firmwarefile.com/infinix-note-11-x663/).

FirmwareFile is a third-party source, not Infinix’s official support service. Check the selected package’s device, build, and provenance before using it. Extract the archive with [7-Zip](https://www.7-zip.org/) or WinRAR on your computer.

### 4. Save the images and choose a patch path

Find `boot.img`, `vbmeta.img`, and `lk.img` in the extracted stock package. If the package also contains `vbmeta_system.img`, keep it; do not create or borrow this file when it is absent.

Choose one path:

| Your original stock build | Boot patch path |
| --- | --- |
| Exact match with the repository’s listed build | Download [patched_boot_bpf_fix.img](../forge-ready/patched_boot_bpf_fix.img?raw=true) and verify its [SHA-256](../forge-ready/SHA256SUMS); skip step 5 |
| Different or unconfirmed match | Do not flash the supplied image; use your own matching `boot.img` and a patcher that supports it, or stop until the build is identified |

Do not change the original stock files. The optional LK patch has its own matching-firmware requirement in step 17.

### 5. Patch your own boot image if needed

Skip this step if you chose the matching pre-patched image. If BPF patching is new to you, follow the [boot-patch guide’s APK steps](BOOT-PATCH.md#path-b-prepare-your-own-matching-boot-image) for file transfer, input selection, output checks, and copying the result back.

Copy your own matching `boot.img` to the phone. The maintainer’s Android application package (APK) link is [BPF patcher attachment on XDA](https://xdaforums.com/attachments/mtk-bpf-patcher-release-apk.6238876/). This attachment is not a release published in the upstream Python repository.

Check the attachment’s author and instructions before installing it. In the APK’s **Select input file** flow, choose your saved `boot.img` and retain the reported output filename. Transfer the completed output back to your computer before unlocking the bootloader.

Use this path only when that APK version supports full boot-image input and repacking. A raw patched kernel is **not** a flashable boot image. The [upstream MediaTek BPF Python patcher](https://github.com/R0rt1z2/mtk-bpf-patcher) operates on an extracted kernel; its command alone does not repack `boot.img`. Stop if the input, output format, or patch result is unclear.

### 6. Prepare platform-tools and the GSI

Follow [ADB and fastboot setup](ADB-SETUP.md) if you have not installed the tools or authorized a computer before. Download [Android SDK Platform-Tools](https://developer.android.com/tools/releases/platform-tools) for your computer and extract them. On Windows, ADB and bootloader mode can require different USB drivers.

Download the chosen GSI from its project’s release page. The [three selected GSI projects](../README.md#selected-gsi-projects) are starting points, not a compatibility guarantee. Read the chosen release’s X663 guidance, architecture, image-variant, and partition requirements. If the project does not establish the required image variant for your setup, stop rather than choosing by filename alone.

Extract the GSI archive to its complete `.img` file. Put working copies of these files in the `platform-tools` folder:

- The full patched boot image from step 4 or 5
- Your matching `vbmeta.img`
- `vbmeta_system.img`, only if your stock package includes it
- The extracted GSI `.img`

Keep the actual filenames. Do not rename a compressed `.xz` or `.zip` archive to `.img`.

### 7. Enable OEM unlocking and USB debugging

Enable **Developer options** by tapping **Build number** until Settings confirms they are enabled. Open **Developer options** and enable **OEM unlocking** and **USB debugging**; menu names can differ by XOS version.

Connect the unlocked phone screen to the computer with a data-capable USB cable. If OEM unlocking is unavailable, stop and check the device-specific unlock requirements.

### 8. Open the terminal and authorize ADB

On Windows, open the `platform-tools` folder, type `cmd` in File Explorer’s address bar, and press Enter. The commands below use Windows Command Prompt syntax.

In Windows PowerShell, replace `adb` with `.\adb.exe` and `fastboot` with `.\fastboot.exe`. On Linux or macOS, open a terminal in the extracted folder and use `./adb` and `./fastboot` unless those tools are already on your `PATH`.

Run this to list Android Debug Bridge (ADB) connections:

```sh
adb devices
```

Accept the **Allow USB debugging** prompt on the phone. Run the command again and confirm one phone is listed with the status `device`. Resolve `unauthorized` or a missing device before continuing.

## Unlock and install the GSI

Run one command at a time and wait for it to finish. Stop on `FAILED` or an unexpected partition error; do not continue down the guide after a failed step.

### 9. Unlock the bootloader

From running Android, reboot the authorized ADB connection into bootloader mode **even if the bootloader is already unlocked**:

```sh
adb reboot bootloader
```

Check the fastboot connection first:

```sh
fastboot devices
```

Confirm the intended phone is listed. If you already unlocked this phone, skip only the unlock command and its confirmation below; stay in bootloader mode and continue with step 10. Otherwise, send the unlock command:

```sh
fastboot flashing unlock
```

Confirm the unlock warning on the phone using its displayed instructions. **This erases your data.** If the command is denied, stop; do not substitute a security-bypass command from another device’s guide. See [Android’s bootloader-unlock documentation](https://source.android.com/docs/core/architecture/bootloader/locking_unlocking).

### 10. Return to bootloader fastboot after the reset

If unlocking restarted Android, complete enough setup to re-enable Developer options and USB debugging. Authorize the computer again, then run `adb reboot bootloader`.

If the phone is already in fastbootd, return to the bootloader with this command:

```sh
fastboot reboot bootloader
```

Check the connection and mode:

```sh
fastboot devices
fastboot getvar is-userspace
```

For bootloader mode, `is-userspace` should report `no`. If this variable is unsupported, use the device’s mode indication and device-specific guidance; an error is not confirmation. Do not run LK commands while the phone reports fastbootd.

### 11. Flash the full networking boot patch

Use the full boot image selected in step 4 or created in step 5, not a raw kernel.

For the repository’s matching pre-patched file, run this in bootloader mode:

```sh
fastboot flash boot "patched_boot_bpf_fix.img"
```

For an APK-generated full boot image, replace the quoted filename with its actual output filename. Keep it quoted if the path contains spaces. Wait for success before continuing. If your device’s partition layout does not expose `boot`, stop rather than inventing another partition name.

### 12. Flash matching vbmeta with the required verification flags

Android Verified Boot (AVB) checks the integrity of Android images. The maintainer’s custom-GSI workflow uses the following command to disable those checks while flashing matching stock `vbmeta.img`:

```sh
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
```

This changes boot verification, not the firmware’s hardware compatibility. Follow the selected GSI’s X663 instructions if its AVB requirements differ. Do not use an empty vbmeta image or one copied from another device.

### 13. Handle vbmeta_system only when applicable

Skip this step unless the matching stock package contains `vbmeta_system.img` **and** the device-specific layout includes `vbmeta_system`.

When both exist and your GSI instructions require the same verification flags, run:

```sh
fastboot --disable-verity --disable-verification flash vbmeta_system vbmeta_system.img
```

Do not substitute `vbmeta.img` for a missing `vbmeta_system.img`. Stop on a partition or file error instead of guessing.

### 14. Enter fastbootd for the logical system partition

Enter userspace fastboot and check the connection again:

```sh
fastboot reboot fastboot
fastboot devices
fastboot getvar is-userspace
```

Continue only when the phone indicates fastbootd and `is-userspace` reports `yes`. If your X663 firmware does not support this mode, stop and follow its documented partition-flashing procedure. See [Android’s fastbootd documentation](https://source.android.com/docs/core/architecture/bootloader/fastbootd).

### 15. Erase and flash the extracted GSI system image

Confirm the full GSI `.img` is available before erasing the installed system. The maintainer’s workflow erases `system` before flashing the replacement, as in [Android’s general GSI flashing guide](https://source.android.com/docs/core/tests/vts/gsi#requirements-for-flashing-gsis):

```sh
fastboot erase system
```

Type `fastboot flash system `, then drag the extracted image into the terminal or enter its actual quoted path. For example, use the following command **only if your file is named `system.img`**:

```sh
fastboot flash system "system.img"
```

Do not type the word `GSI` as the filename. Do not flash an archive. Wait for all transfers and writes to succeed; the number of parts varies and is not always `14/14`.

If resizing or flashing fails, stop and read [partition troubleshooting](TROUBLESHOOTING.md#handle-firmware-and-partition-errors). Do not delete `product`, `vendor`, or other partitions by trial and error.

### 16. Reset data, reboot, and test the GSI

Use the phone’s recovery/fastbootd menu to select **Wipe data** or **Factory reset**, then confirm the reset. If the device’s documented procedure uses fastboot for this reset instead, the standard command is:

```sh
fastboot -w
```

Use one supported reset method, not both as a requirement. **The reset erases user data.** Stop if formatting fails.

Select **Reboot system** on the phone, or run:

```sh
fastboot reboot
```

Complete setup and test Wi-Fi and mobile data separately. Record the stock build, GSI release, boot image, and results. A successful boot does not prove that calls, VoLTE, VoWiFi, hotspot, camera, encryption, or every GSI feature works.

## Remove boot warnings only if you choose to

The GSI and networking patch do not require these steps. LK is bootloader code; an incompatible LK can remove your normal recovery path. Read the [current lkpatcher documentation](https://github.com/R0rt1z2/lkpatcher) and keep a matching untouched stock LK before continuing.

### 17. Choose a matching LK input or pre-patched image

Save `lk.img` from your exact stock firmware in a separate backup folder.

If your stock build matches the repository’s listed target and you choose its existing [lk-patched.img](../forge-ready/lk-patched.img?raw=true), verify its [SHA-256](../forge-ready/SHA256SUMS) and skip to step 21. Otherwise, patch your own matching stock LK only when the tool supports it.

Upstream lkpatcher documents additional MediaTek security requirements, including seccfg state, and warns about unsupported Secure Boot Check (SBC) devices. A normal fastboot unlock is not proof that every patched LK will boot. This guide does not add a generic mtkclient/seccfg bypass; stop if those device-specific prerequisites are unresolved.

### 18. Download lkpatcher and install Python

Open [R0rt1z2/lkpatcher](https://github.com/R0rt1z2/lkpatcher), select **Code → Download ZIP**, and extract it on your computer. Open the extracted repository folder containing `pyproject.toml`.

Install [Python 3.10 or newer](https://www.python.org/downloads/) and [Git](https://git-scm.com/downloads). The upstream README requires Python; its package also downloads a Git-based dependency, so downloading the ZIP does not remove the Git requirement. Copy a working copy of your own stock `lk.img` into the lkpatcher folder. Leave the recovery original untouched.

### 19. Install lkpatcher in a separate Python environment

Open a new terminal in the extracted lkpatcher folder after installing Git. Confirm that the command starts:

```sh
git --version
```

On Windows Command Prompt, create and activate a Python environment:

```bat
py -3 -m venv .venv
.venv\Scripts\activate.bat
```

On Linux or macOS, create and activate it with:

```sh
python3 -m venv .venv
. .venv/bin/activate
```

With that environment active, install the local repository and display its supported options:

```sh
python -m pip install .
python -m lkpatcher --help
```

This installs the package and its declared dependencies. Downloading the ZIP alone does not install the module. Stop on an installation error; do not patch an image with an incomplete installation.

### 20. Apply only the boot-warning patch category

Keep the environment active. First review the warning-only dry run:

```sh
python -m lkpatcher lk.img --category orange_state --dry-run
```

If the tool recognizes the image, reports the intended patch, and its device-specific prerequisites are satisfied, create a separate output with a backup:

```sh
python -m lkpatcher lk.img --category orange_state --backup -o patched.lk.img
```

The explicit `orange_state` category limits this task to the unlock warning. Do not use unrestricted default patching, `--patch-policies`, or certificate/security bypass options as a warning-removal shortcut. Stop on unsupported input, a missing patch, or an unexpected verification result.

### 21. Flash the chosen LK in bootloader mode

Copy the selected full LK image into `platform-tools`. Switch back to the terminal in that folder from step 8. If you closed it, use the [platform-tools terminal instructions for your operating system](ADB-SETUP.md) to open it again. Do not run these commands from the lkpatcher folder opened in step 19.

Choose the next action by the phone’s current mode:

- **Android is running:** the factory reset in step 16 clears USB-debugging settings and computer authorization. Re-enable [Developer options and USB debugging](ADB-SETUP.md#enable-usb-debugging-on-the-phone), then [authorize your computer again](ADB-SETUP.md#authorize-the-computer-and-check-the-connection). Run `adb devices` and meet the [ADB ready checkpoint](ADB-SETUP.md#ready-checkpoint): the intended phone must show `device`. Only then run `adb reboot bootloader`.
- **The phone is in fastbootd:** run `fastboot reboot bootloader` instead; ADB is not the connection to use in this mode.
- **The phone is already in bootloader fastboot:** skip the reboot command, but still check the connection and mode below.

Check `fastboot devices` and `fastboot getvar is-userspace`. Confirm bootloader mode, not fastbootd, before changing LK.

For the matching supplied file, run:

```sh
fastboot flash lk "lk-patched.img"
```

For the warning-only image created in step 20, use its actual output filename:

```sh
fastboot flash lk "patched.lk.img"
```

Use **one** of these commands, not both. If the stock layout does not expose `lk`, stop; do not invent `lk_a`, `lk_b`, or another partition name. Wait for the write to succeed.

### 22. Reboot and check the optional change separately

Reboot after a successful LK write:

```sh
fastboot reboot
```

Confirm the phone starts and check whether the warning changed. Re-test Wi-Fi and mobile data. Warning removal does not relock the bootloader or restore AVB security.

Keep the full stock build, chosen GSI release, patched filenames, checksums, and test results with your recovery backup. Report failures through [GitHub Issues](https://github.com/MedoX71T/Infinix-X663-GSI-Fixes/issues/new?template=problem.yml); redact personal information first.

## Corrections to the earlier pasted commands

The original workflow is retained, with these command and file-handling corrections:

- `adb fastboot reboot` is not an ADB command; use `adb reboot bootloader` from Android or `fastboot reboot bootloader` from fastbootd
- `fastboot --disable-verification flash vbmeta.img` lacks the partition argument; the corrected command names both `vbmeta` and `vbmeta.img`
- `patched_boot_bpt.img` in the original draft is not a supplied repository file; use the actual complete boot-image output or `patched_boot_bpf_fix.img`
- The boot patch must be flashed; preparing it on the phone alone does not install it
- `vbmeta_system` is conditional, not a file or partition to invent
- System flashing uses fastbootd in this workflow; LK flashing uses bootloader fastboot
- The LK command selects `orange_state` explicitly instead of enabling unrelated default patch categories

[Download and verify the supplied images](../forge-ready/README.md) · [Troubleshoot a failed step](TROUBLESHOOTING.md) · [Return to the project overview](../README.md)
