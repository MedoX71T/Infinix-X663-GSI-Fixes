# Set up ADB and fastboot on your computer

Install Google’s platform-tools, enable USB debugging, and confirm that your computer can communicate with the phone. This preparation does not unlock the bootloader, erase data, or flash an image.

**Android Debug Bridge (ADB)** sends commands from your computer to a running Android phone. **Fastboot** sends commands when the phone is in bootloader mode or fastbootd. Both programs come in the same platform-tools download; you do not install them as phone apps.

[Project overview](../README.md) · [Prepare the boot patch](BOOT-PATCH.md) · [Full installation guide](INSTALLATION.md)

## Windows: download and open platform-tools

Use the official standalone download. You do not need Android Studio for this guide.

1. Open [Google’s SDK Platform-Tools download page](https://developer.android.com/tools/releases/platform-tools).
2. Choose **Download SDK Platform-Tools for Windows**, review the terms, and download the ZIP.
3. Right-click the downloaded ZIP and select **Extract All**. Finish extracting before opening the tools.
4. Open the extracted `platform-tools` folder. Check that it contains `adb.exe` and `fastboot.exe`.
5. Click File Explorer’s address bar, type `cmd`, and press Enter. A Command Prompt window opens in that folder.

Run each command separately to check that both programs start:

```bat
adb version
fastboot --version
```

Each command should print its program version. If Windows cannot find the command, check that you opened the extracted folder containing the executable files, not the ZIP or its parent folder.

### If you opened PowerShell instead

PowerShell requires a prefix when a program is in the current folder. Use these commands there:

```powershell
.\adb.exe version
.\fastboot.exe --version
```

The rest of the installation guide uses Command Prompt syntax. If you stay in PowerShell, replace every initial `adb` with `.\adb.exe` and every initial `fastboot` with `.\fastboot.exe`.

## Windows: check the phone’s USB driver

Platform-tools and USB drivers are different. The tools send commands; the driver lets Windows recognize the connected phone.

If `adb devices` already lists the authorized phone, you do not need to replace its working driver. Otherwise, use an appropriate Infinix/MediaTek driver from a verified manufacturer or matching stock-package source. If your matching firmware package includes USB-driver instructions, follow those for its supplied driver. Do not assume Google’s USB driver supports every MediaTek phone. See [Android’s OEM USB-driver guidance](https://developer.android.com/studio/run/oem-usb).

If Windows shows the phone as an unknown device or with a warning icon:

1. Connect the phone and open **Device Manager** from Windows search.
2. Locate the connected phone under **Portable Devices**, **Other devices**, or the relevant Android device category.
3. Right-click it and choose **Update driver**.
4. Choose **Browse my computer for drivers** and select your verified, extracted driver folder.
5. Finish the installation and reconnect the phone.

The ADB and bootloader connections can need different drivers. If ADB works but fastboot later lists no device, check Device Manager again while the phone is in bootloader mode. Do not disable driver-signing protections merely to install an unknown driver package.

## Linux and macOS: open the extracted tools

Download the matching Linux or macOS archive from the same [official platform-tools page](https://developer.android.com/tools/releases/platform-tools). Extract it and open a terminal in its `platform-tools` folder.

Run these version checks from that folder:

```sh
./adb version
./fastboot --version
```

Use `./adb` and `./fastboot` throughout the guide unless those programs are already on your `PATH`. Windows USB-driver installers are not needed on Linux or macOS. Linux permission errors can require your distribution’s Android USB/udev setup; follow [Android’s device-setup documentation](https://developer.android.com/studio/run/device) rather than changing unrelated file permissions.

## Enable USB debugging on the phone

USB debugging lets the phone authorize the computer’s ADB connection. It does not unlock the bootloader.

1. Open **Settings → My Phone** or **About phone**.
2. Find **Build number** and tap it until Settings confirms that Developer options are enabled.
3. Open **Developer options** and enable **USB debugging**. XOS menu locations can differ.
4. Connect the phone with a data-capable USB cable and keep the screen unlocked.
5. If you also need to copy files, select **File transfer** in the phone’s USB notification.

Enable **OEM unlocking** only when you reach the [bootloader preparation step](INSTALLATION.md#7-enable-oem-unlocking-and-usb-debugging). Installing ADB itself does not require a factory reset or an unlocked bootloader.

## Authorize the computer and check the connection

Run this from the same Command Prompt window while Android is running:

```bat
adb devices
```

Accept **Allow USB debugging** on the phone only if you trust the connected computer. Run `adb devices` again after accepting.

Use the status to decide what to do next:

| What you see | Meaning | Next action |
| --- | --- | --- |
| One phone with status `device` | Android authorized the ADB connection | Continue with your prepared files |
| `unauthorized` | The phone has not approved this computer | Unlock the screen, accept the prompt, and check again |
| No phone listed | The USB/debugging connection is missing | Check debugging, data cable, USB port, and Windows driver |
| `offline` | ADB sees a connection but cannot use it | Reconnect the cable and restart the ADB connection if needed |
| More than one phone or emulator | Commands may target the wrong device | Disconnect the others before following this guide |

Do not paste someone else’s device serial into a command. Do not continue to flashing while the connection is missing or unauthorized.

## If the authorization prompt does not appear

Check the phone and cable before changing anything else:

1. Keep Android running and unlock the screen.
2. Confirm **USB debugging** is enabled and the cable supports data.
3. Disconnect and reconnect the cable, then run `adb devices` again.
4. If the connection remains stuck, restart ADB on the computer:

```bat
adb kill-server
adb start-server
adb devices
```

These commands restart ADB; they do not restart or wipe the phone. If an authorization was previously refused, use **Revoke USB debugging authorizations** in Developer options, reconnect, and approve your computer again. This removes trust for previously authorized computers.

If Android is not running because the phone is in the bootloader, use `fastboot devices`, not `adb devices`. Read the [phone-mode explanation](INSTALLATION.md#understand-the-changes-before-starting) before sending a flashing command.

## Ready checkpoint

Continue only when you can check all of the following:

- The tools came from Google’s platform-tools page
- The extracted folder contains working ADB and fastboot programs
- Android lists your intended phone with the ADB status `device`
- You recorded the full original stock build and kept your recovery files

For a new GSI installation, return to [step 6 of the full guide](INSTALLATION.md#6-prepare-platform-tools-and-the-gsi) and continue in order. For networking on an existing GSI, read [the boot-patch guide](BOOT-PATCH.md).

[Back to Forge X663](../README.md) · [Boot-patch guide](BOOT-PATCH.md) · [Connection troubleshooting](TROUBLESHOOTING.md#connect-the-phone-to-the-computer)
