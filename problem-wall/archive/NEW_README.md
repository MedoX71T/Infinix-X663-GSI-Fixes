<div align="center">

![GSI-Ready X663](assets/banner.svg)

# GSI-Ready X663

**Unlock Custom Android on Your Infinix Note 11**

[![License: MIT](https://img.shields.io/badge/License-MIT-D2691E.svg)](LICENSE)
[![Device](https://img.shields.io/badge/Device-Infinix%20Note%2011%20(X663)-8B6F47.svg)]()
[![Android](https://img.shields.io/badge/Android-14%20|%2015%20|%2016-6B8E23.svg)]()

[📖 Read Guide](#-what-is-this) • [🚀 Quick Start](#-installation-steps) • [❓ FAQ](#-frequently-asked-questions) • [💬 Get Help](#-need-help)

</div>

---

## 🤔 What Is This?

**Simple answer:** This fixes WiFi and mobile data on custom Android versions for Infinix Note 11 (X663).

### What's a "Custom Android" (GSI)?

Your phone comes with **Infinix's version of Android** (called XOS). But Android is open source, which means other developers create their own improved versions with:

- ✨ Cleaner interface (no bloatware)
- 🎨 More customization options
- 🚀 Better performance
- 🔒 Enhanced privacy
- 📱 Newer Android versions (Android 16 on your Android 12 phone!)

These custom versions are called **GSIs** (Generic System Images). Popular ones include:
- **LineageOS** - Privacy-focused, clean Android
- **Pixel Experience** - Google Pixel phone experience
- **DerpFest** - Feature-packed with customization
- **AOSP** - Pure Android, no extras

### The Problem We Fix

When you install custom Android (GSI) on Infinix Note 11, **WiFi and mobile data stop working**. This is a known bug on MediaTek phones running Android 14+.

**Our solution:**
1. ✅ Fixes WiFi completely
2. ✅ Fixes mobile data (4G/LTE)
3. ✅ Fixes hotspot sharing
4. ✅ Removes bootloader warning screen
5. ✅ Works on Android 14, 15, and 16

---

## 📋 What You Need

### Required Items
- ✅ **Infinix Note 11 (X663)** - This only works on this specific model
- ✅ **Windows PC or Laptop** - For installing files
- ✅ **USB Cable** - To connect phone to PC
- ✅ **Your current firmware version** - We'll show you how to find it

### Downloads You'll Need
All download links are in the [Installation Steps](#-installation-steps) section below.

---

## 🚀 Installation Steps

We've made this **beginner-friendly**. Follow each step carefully. Estimated time: **30-45 minutes**.

### 📱 Step 1: Check Your Firmware Version

1. Open **Settings** on your phone
2. Scroll down → tap **"My Phone"** (or "About Phone")
3. Find **"Build Number"** - it looks like: `X663-H6915...`
4. **Write it down** - you'll need it later

---

### 💾 Step 2: Download Your Stock ROM

Your phone's original software is called "Stock ROM". We need one file from it.

1. Search Google for: `Infinix X663 Stock ROM [your build number]`
2. Download the ZIP file (usually 2-4 GB)
3. **Extract** the ZIP using WinRAR or 7-Zip
4. Find these 2 files inside:
   - `boot.img`
   - `vbmeta.img`
5. Copy **boot.img** to your phone's storage (use USB cable)

---

### 🔧 Step 3: Patch Boot Image (On Phone)

This adds the network fix to your boot file.

1. **Download** BPF Patcher app: [Get it here](https://xdaforums.com/attachments/mtk-bpf-patcher-release-apk.6238876/)
2. **Install** the APK on your phone
3. **Open** BPF Patcher app
4. Tap **"Select Input File"**
5. Find the `boot.img` you copied earlier
6. Tap **"Patch"** and wait
7. It creates: `patched_boot_bpf.img`
8. **Copy this file** back to your PC

---

### 💻 Step 4: Setup PC Tools

Now we prepare your computer.

1. **Download** Platform Tools: [Google's Official Link](https://developer.android.com/tools/releases/platform-tools)
2. **Extract** the ZIP to a folder (example: `C:\platform-tools\`)
3. Copy these files into that folder:
   - `patched_boot_bpf.img` (from Step 3)
   - `vbmeta.img` (from Step 2)
   - `lk-patched.img` (from this repository - download from [Releases](../../releases))

---

### 🔓 Step 5: Unlock Bootloader

**⚠️ WARNING:** This erases all phone data. **Backup everything first!**

1. On phone: **Settings** → **About Phone**
2. Tap **"Build Number"** 7 times (enables Developer Options)
3. Go back → **Settings** → **Developer Options**
4. Enable **"OEM Unlocking"**
5. Enable **"USB Debugging"**
6. Connect phone to PC
7. On PC: Open terminal in platform-tools folder
   - Hold **Shift** + **Right-click** → "Open PowerShell here"
8. Type: `adb devices`
   - On phone: Tap **"Allow"** when prompted
9. Type: `adb reboot bootloader`
10. Type: `fastboot flashing unlock`
11. On phone: Use volume buttons to select **"Unlock"**, press power to confirm
12. Phone will reboot and **erase everything**

---

### 📲 Step 6: Flash GSI (Custom Android)

Now install your chosen custom Android.

1. **Download** your preferred GSI:
   - [Andy Yan's GSI Collection](https://sourceforge.net/projects/andyyan-gsi/files/)
   - [Pixel Experience](https://get.pixelexperience.org/)
   - [LineageOS GSI](https://sourceforge.net/projects/lineageos-gsi/)
2. **Extract** the GSI file (usually `system.img`)
3. Boot to bootloader: `adb reboot bootloader`
4. Enter fastbootd mode: `fastboot reboot fastboot`
5. Type these commands:

```bash
fastboot --disable-verification flash vbmeta vbmeta.img
fastboot --disable-verity --disable-verification flash vbmeta_system vbmeta.img
fastboot erase system
fastboot flash system [drag your GSI file here]
```

6. On phone screen: Select **"Wipe all data"**
7. Select **"Reboot to system"**

**Your phone now runs custom Android!** But WiFi/data won't work yet...

---

### 🔌 Step 7: Fix Network (Apply Patches)

This is the main fix!

1. Boot phone to bootloader: `adb reboot bootloader`
2. Flash patched boot:
   ```bash
   fastboot reboot fastboot
   fastboot flash boot patched_boot_bpf.img
   ```
3. Flash patched LK (removes warning screen):
   ```bash
   fastboot reboot bootloader
   fastboot flash lk lk-patched.img
   ```
4. Reboot:
   ```bash
   fastboot reboot
   ```

### 🎉 Done!

Your phone now runs custom Android with working WiFi and mobile data!

---

## 🧪 Quick Test (Try This First!)

Before flashing patches, try this simple fix:

```bash
adb shell settings put global restricted_networking_mode 0
```

If WiFi/data starts working, you don't need the patched boot image!

---

## ❓ Frequently Asked Questions

### Will this work on other Infinix phones?
**No.** Only Infinix Note 11 (X663). Other models need different patches.

### Will I lose my data?
**Yes**, unlocking bootloader erases everything. Backup first!

### Can I go back to stock ROM?
**Yes**, flash your stock ROM ZIP using SP Flash Tool.

### What if WiFi still doesn't work?
1. Check you used the correct firmware version
2. Try the [Quick Test](#-quick-test-try-this-first) command
3. Ask for help in [Issues](../../issues)

### Is this safe?
Flashing carries risk. Follow steps carefully. We're not responsible for bricked devices.

### Which GSI should I choose?
**Beginners:** Pixel Experience (stable, Google-like)  
**Customization:** DerpFest (tons of features)  
**Privacy:** LineageOS (clean, no Google)

---

## 📚 Technical Details

<details>
<summary>For Developers (Click to expand)</summary>

### What's Actually Fixed

**Network Issue:**
MediaTek devices need BPF (Berkeley Packet Filter) support in the kernel for Android 14+ GSIs. Stock kernels lack this. We patch the kernel using [mtk-bpf-patcher](https://github.com/R0rt1z2/mtk-bpf-patcher).

**Boot Warning:**
Unlocked bootloader shows orange state warning. We patch LK (Little Kernel) using [lkpatcher](https://github.com/R0rt1z2/lkpatcher).

### Included Files

| File | Purpose | Size |
|------|---------|------|
| `patched_boot_bpf_fix.img` | Boot image with BPF patch | 32 MB |
| `lk-patched.img` | LK with warning removed | 1.1 MB |
| `stock_boot.img` | Original boot (reference) | 32 MB |

### Tested GSI Versions
- ✅ Android 14 AOSP
- ✅ Android 15 DerpFest
- ✅ Android 16 AOSP

### Build Info
- **Base ROM:** X663-H6915ABCDEFGHIO-S-GL-230113V402
- **Android Version:** 12 (base for patches)
- **Patcher Used:** mtk-bpf-patcher v1.0

</details>

---

## 💬 Need Help?

- 🐛 **Found a bug?** [Open an Issue](../../issues)
- 💬 **Questions?** [Discussions](../../discussions)
- 📱 **Telegram:** [@MedoX71T](https://t.me/MedoX71T)

---

## 🙏 Credits

- **MedoX71T** (Me) - Testing, patching, guide creation
- **[R0rt1z2](https://github.com/R0rt1z2)** - mtk-bpf-patcher & lkpatcher tools
- **XDA Community** - Research and support
- **Project Treble** - GSI development

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

<div align="center">

**⭐ Star this repo if it helped you!**

Made with ❤️ for the Infinix X663 community

[⬆ Back to Top](#gsi-ready-x663)

</div>
