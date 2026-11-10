# Troubleshoot installation and patch problems

Find the first failed step, check the phone’s current mode, and keep your matching stock images available. Stop when a command reports `FAILED`; repeating it with another firmware image can make recovery harder.

## Connect the phone to the computer

Android Debug Bridge (ADB) works when Android or an ADB-enabled recovery is running. Fastboot works in bootloader mode or userspace fastboot (fastbootd). Follow the [ADB setup guide](ADB-SETUP.md) for downloads, Windows drivers, opening the correct terminal, and phone authorization.

| Symptom | What to check |
| --- | --- |
| `adb devices` shows `unauthorized` | Unlock the screen, accept the USB debugging prompt, and run `adb devices` again. |
| `adb devices` lists no phone | Enable USB debugging, use a data-capable cable, and check the Windows USB driver. |
| Fastboot waits for a device | Run `fastboot devices`. Check the cable and bootloader USB driver, which can differ from the ADB driver. |
| Command Prompt cannot find `adb` or `fastboot` | Open the extracted folder containing `adb.exe` and `fastboot.exe`, type `cmd` in File Explorer’s address bar, and retry there. |
| PowerShell cannot find `adb` or `fastboot` | Use `.\adb.exe` and `.\fastboot.exe` from the extracted platform-tools folder. |
| Linux/macOS cannot find the tools | Use `./adb` and `./fastboot` from the extracted folder, or install them on your `PATH`. |
| More than one device is connected | Disconnect the others before running this guide’s commands. |

## Check bootloader mode and fastbootd

Use the same mode checks as the [installation guide](INSTALLATION.md):

```sh
fastboot getvar is-userspace
```

A `yes` result identifies fastbootd. A `no` result identifies bootloader fastboot. Some bootloaders do not implement this variable; an error is not proof that you are in the correct mode.

| Task | Mode |
| --- | --- |
| Unlock the bootloader | Bootloader fastboot |
| Flash the boot patch | Bootloader fastboot in this guide |
| Flash the logical system partition | Fastbootd |
| Flash the optional LK image | Bootloader fastboot, not fastbootd |

Return from fastbootd to the bootloader with `fastboot reboot bootloader`. Enter fastbootd from the bootloader with `fastboot reboot fastboot`.

## Handle firmware and partition errors

A missing file or partition is a reason to stop and check your inputs, not to download a similarly named image.

- **Unknown original stock build**: do not use the supplied pre-patched files until you identify the matching stock firmware
- **No `vbmeta_system.img` in the stock package**: skip that optional step; do not create an empty image or substitute `vbmeta.img`
- **Partition does not exist**: check the device’s actual partition layout and mode; do not invent an `_a`, `_b`, or numbered partition name
- **System image is too large**: check the GSI project’s X663 guidance; do not delete `product`, `vendor`, or other partitions by trial and error
- **Patcher cannot recognize the input**: stop; the tool may not support that image or its packaging
- **An image or command reports a verification error**: record the complete error and check the upstream requirements before changing more security settings

Never flash an archive such as `.xz`, `.7z`, or `.zip` as a system image. Extract the complete `.img` first.

## Diagnose networking after the GSI boots

Check Wi-Fi and mobile data separately; a successful boot does not prove that either works. Use the [boot-patch guide](BOOT-PATCH.md) to distinguish a matching full boot image from an unpatched stock image or raw kernel.

1. Confirm which full boot image you flashed and which stock build it came from.
2. Test Wi-Fi with mobile data disabled.
3. Test mobile data with Wi-Fi disabled; check your SIM and access point name (APN) settings.
4. Record the GSI release, patcher version, errors, and results in a [problem report](https://github.com/MedoX71T/Infinix-X663-GSI-Fixes/issues/new?template=problem.yml).

The networking boot patch does not guarantee carrier calling, hotspot, camera, encryption, or every GSI feature. Do not disable the phone’s security policy, SELinux, as a blanket networking fix.

## Recover from a boot problem

Use untouched images from your exact original stock firmware. The repository’s `stock_boot.img` is one saved boot image, not a complete recovery package.

- **Android does not start but fastboot works**: return to the known-working setup with matching stock images and the device-specific recovery procedure
- **A problem starts after LK flashing**: use your saved matching stock LK and the device-specific recovery procedure; do not continue patching other partitions
- **Fastboot and Android are unavailable**: follow the matching stock firmware’s MediaTek recovery instructions, or seek device-specific support before attempting a full restore
- **A restore asks to format everything**: stop; full-format operations can remove device-specific calibration or identity data

Do not relock the bootloader while custom or modified images remain installed. Do not format `nvram`, `nvdata`, or other calibration partitions as a GSI troubleshooting step.

## Submit a useful report

Use [GitHub Issues](https://github.com/MedoX71T/Infinix-X663-GSI-Fixes/issues). Include the full original stock build, exact GSI release, filenames, changed partitions, current mode, and the first error.

Remove passwords, accounts, IMEI, device serials, Wi-Fi names, and other personal information from logs and screenshots. Keep results for your own firmware separate from claims about other builds.

[ADB setup](ADB-SETUP.md) · [Boot-patch guide](BOOT-PATCH.md) · [Return to the installation guide](INSTALLATION.md) · [Return to Forge X663](../README.md)
