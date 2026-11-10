# GSI-Ready X663

**Fix WiFi & Mobile Data on Custom Android (GSI) for Infinix Note 11**

[![License: MIT](https://img.shields.io/badge/License-MIT-D2691E.svg)](LICENSE)
[![Device](https://img.shields.io/badge/Device-Infinix%20Note%2011%20(X663)-8B6F47.svg)]()
[![Android](https://img.shields.io/badge/Android-14%20|%2015%20|%2016-6B8E23.svg)]()

---

## 🤔 What Is This?

**The Problem:** When you install custom Android (GSI) on Infinix Note 11, WiFi and mobile data stop working on Android 14+.

**Why:** MediaTek kernels lack BPF (Berkeley Packet Filter) support needed for modern Android networking.

**The Solution:** This repository provides:
1. 📦 **Pre-patched files for one firmware version** (as an example)
2. 📖 **Complete guide to patch YOUR firmware version**
3. 🛠️ **Tools and instructions for any X663 build**

---

## ⚠️ CRITICAL: Read This First

### Your Firmware Version Matters

The files in this repository (`patched_boot_bpf_fix.img`, `lk-patched.img`, `stock_boot.img`) are **ONLY for firmware version:**

```
X663-H6915ABCDEFGHIO-S-GL-230113V402 (Android 12 base)
```

**If your firmware is different, DO NOT use these files directly!**

Instead, **follow the patching guide below** to create patched files for YOUR firmware version.

### How to Check Your Firmware

1. Settings → My Phone → Build Number
2. Look for something like: `X663-H6915...`
3. Compare with the version above

✅ **Same version?** You can use the pre-patched files  
❌ **Different version?** Follow the patching guide (Section: "Create Your Own Patches")

---

## 📋 What You Need

- ✅ Infinix Note 11 (X663) - **This device only**
- ✅ Windows PC or laptop
- ✅ USB cable
- ✅ 30-45 minutes
- ✅ Backup of your data (bootloader unlock erases everything!)

---

## 🎯 Two Paths to Choose

### Path A: Use Pre-Patched Files (Quick)
**Only if your firmware exactly matches:** `X663-H6915ABCDEFGHIO-S-GL-230113V402`

→ [Jump to Quick Installation](#-path-a-quick-installation-pre-patched-files)

### Path B: Create Your Own Patches (Universal)
**For ANY firmware version** - you patch your own boot.img and lk.img

→ [Jump to Custom Patching](#-path-b-create-your-own-patches-any-firmware)

---

## 🚀 Path A: Quick Installation (Pre-Patched Files)

**STOP! Only proceed if your firmware version is:** `X663-H6915ABCDEFGHIO-S-GL-230113V402`

### Step 1: Download Pre-Patched Files

From this repository's [Releases](../../releases):
- `patched_boot_bpf_fix.img` (32 MB) - Boot with BPF fix
- `lk-patched.img` (1.1 MB) - LK with no warning
- `vbmeta.img` - Verification disable

### Step 2: Setup ADB/Fastboot

1. Download [Platform Tools](https://developer.android.com/tools/releases/platform-tools)
2. Extract to `C:\platform-tools\`
3. Copy downloaded files there

### Step 3: Unlock Bootloader

**⚠️ This erases all data! Backup first!**

1. Phone: Settings → Developer Options
   - Enable "OEM Unlocking"
   - Enable "USB Debugging"
2. Connect to PC
3. Open PowerShell in platform-tools (Shift + Right-click)
4. Commands:
   ```bash
   adb devices
   # On phone: tap "Allow"
   
   adb reboot bootloader
   fastboot flashing unlock
   # On phone: confirm with volume buttons
   ```

### Step 4: Flash GSI

1. Download your GSI:
   - [Andy Yan's GSI](https://sourceforge.net/projects/andyyan-gsi/files/)
   - [Pixel Experience](https://get.pixelexperience.org/)
   - [LineageOS GSI](https://sourceforge.net/projects/lineageos-gsi/)

2. Commands:
   ```bash
   adb reboot bootloader
   fastboot reboot fastboot
   
   fastboot --disable-verification flash vbmeta vbmeta.img
   fastboot --disable-verity --disable-verification flash vbmeta_system vbmeta.img
   fastboot erase system
   fastboot flash system system.img
   # Replace system.img with your GSI filename
   
   # On phone: select "Wipe all data" → "Reboot"
   ```

### Step 5: Apply Network Fix

```bash
adb reboot bootloader
fastboot reboot fastboot
fastboot flash boot patched_boot_bpf_fix.img

fastboot reboot bootloader
fastboot flash lk lk-patched.img

fastboot reboot
```

### 🎉 Done!

WiFi and mobile data should work. No boot warning screen.

---

## 🛠️ Path B: Create Your Own Patches (ANY Firmware)

**Use this method if:**
- Your firmware version is different
- You want to learn the process
- Pre-patched files don't work

### Overview

You'll patch 2 files from YOUR stock ROM:
1. **boot.img** → Add BPF kernel support (fixes network)
2. **lk.img** → Remove bootloader warning

### Step 1: Get Your Stock ROM

1. Check firmware: Settings → My Phone → Build Number
   - Example: `X663-H6915ABCDEFGHIO-S-GL-230113V402`
2. Google: `"Infinix X663 Stock ROM [your version]"`
3. Download the ZIP (2-4 GB)
4. Extract with WinRAR/7-Zip
5. Find these files:
   - `boot.img`
   - `lk.img`
   - `vbmeta.img`

### Step 2: Patch boot.img (Network Fix)

**Method A: On Phone (Easier)**

1. Copy `boot.img` to phone storage
2. Download [BPF Patcher APK](https://xdaforums.com/attachments/mtk-bpf-patcher-release-apk.6238876/)
3. Install and open app
4. Select `boot.img`
5. Tap "Patch"
6. Copy `patched_boot_bpf.img` back to PC

**Method B: On PC (Advanced)**

1. Install Python 3: https://python.org/downloads/
2. Download [mtk-bpf-patcher](https://github.com/R0rt1z2/mtk-bpf-patcher)
3. Extract and open terminal there
4. Command:
   ```bash
   python3 bpf_patcher.py boot.img -o patched_boot_bpf.img
   ```

### Step 3: Patch lk.img (Warning Fix)

1. Download [lkpatcher](https://github.com/R0rt1z2/lkpatcher)
2. Extract and open terminal
3. Copy your `lk.img` to this folder
4. Command:
   ```bash
   python3 -m lkpatcher lk.img -o patched_lk.img
   ```

### Step 4: Flash Everything

Now you have:
- `patched_boot_bpf.img` (your network fix)
- `patched_lk.img` (your warning fix)
- `vbmeta.img` (from stock ROM)

Copy all to platform-tools folder, then follow the same steps as Path A:

1. Unlock bootloader (if not done)
2. Flash GSI
3. Flash your patched files:
   ```bash
   adb reboot bootloader
   fastboot reboot fastboot
   fastboot flash boot patched_boot_bpf.img
   
   fastboot reboot bootloader
   fastboot flash lk patched_lk.img
   
   fastboot reboot
   ```

### 🎉 Done!

Your custom-patched files now work perfectly with your firmware version.

---

## 🧪 Quick Test (Try First!)

Before any patching, try this ADB command:

```bash
adb shell settings put global restricted_networking_mode 0
```

If network starts working → you don't need patching!

---

## ❓ FAQ

### My firmware version is different - will this work?
**Follow Path B** to create patches for your firmware. Don't use pre-patched files.

### Can I share my patched files?
Yes! If you have a different firmware version, share your patches in [Discussions](../../discussions) to help others.

### What if I use wrong firmware patches?
At best: won't boot. At worst: bootloop. Always match firmware versions or create your own.

### Which GSI works best?
- **Beginners:** Pixel Experience
- **Customization:** DerpFest
- **Privacy:** LineageOS

### Can I go back to stock?
Yes. Flash stock ROM with SP Flash Tool. All guides on XDA.

### Is this safe?
Flashing always carries risk. Follow instructions carefully. We're not responsible for bricked devices.

---

## 📚 Technical Details

<details>
<summary>For Developers</summary>

### The Network Problem

MediaTek devices need BPF (Berkeley Packet Filter) in kernel for Android 14+ networking. Stock X663 kernels (Android 12 base) lack this.

**Solution:** [mtk-bpf-patcher](https://github.com/R0rt1z2/mtk-bpf-patcher) injects BPF support into boot.img kernel.

### The Warning Problem

Unlocked bootloader → LK (Little Kernel) shows orange state warning for 5 seconds on boot.

**Solution:** [lkpatcher](https://github.com/R0rt1z2/lkpatcher) patches LK to skip warning.

### Why Firmware Version Matters

Each firmware build has:
- Different kernel version
- Different memory offsets
- Different partition layout

Using wrong boot.img = kernel panic. Using wrong lk.img = brick potential.

**Always match firmware or patch your own.**

### Example Files Provided

This repo includes patches for `X663-H6915ABCDEFGHIO-S-GL-230113V402`:
- `stock_boot.img` - Original (reference)
- `patched_boot_bpf_fix.img` - BPF injected
- `lk-patched.img` - Warning removed

These serve as:
1. Working example for this firmware
2. Reference for patching process
3. Quick fix for users on this version

### Tested GSIs
- ✅ Android 14 AOSP
- ✅ Android 15 DerpFest
- ✅ Android 16 AOSP (TD)

</details>

---

## 💬 Get Help

- 🐛 Found a bug? [Open Issue](../../issues)
- 💬 Questions? [Discussions](../../discussions)
- 📱 Telegram: [@MedoX71T](https://t.me/MedoX71T)
- 🌐 XDA Thread: [Link when posted]

---

## 🙏 Credits

- **MedoX71T** (Me) - Testing, patching, documentation
- **[R0rt1z2](https://github.com/R0rt1z2)** - mtk-bpf-patcher & lkpatcher
- **XDA Community** - Research and support
- **Project Treble** - GSI development

---

## 📄 License

MIT License - See [LICENSE](LICENSE)

---

<div align="center">

**⭐ If this helped you, star the repo!**

**Got a different firmware? Share your patches in Discussions to help others.**

Made with ❤️ for the Infinix X663 community

</div>
