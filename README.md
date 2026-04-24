This repository provides a critical solution for the **Infinix Note 11 (X663)** device when running GSI (Generic System Image) builds, specifically addressing the issue of **WiFi - Mobile Data not working** on **Android 14 and higher**.
<div width: fit-content; align="center">
<img max-width="100%" height="60%" alt="Screenshot_20251102-023351_Settings" src="https://github.com/user-attachments/assets/fa5b286d-1790-4685-8036-e446324555ef"/>
<img max-width="100%" height="60%" alt="Screenshot_20251102-023651_Google Play Store" src="https://github.com/user-attachments/assets/5fa98994-5d56-4e1d-8f07-433338196a1b"/>
<img max-width="100%" height="60%" alt="Screenshot_20251102-035929_DerpLauncher" src="https://github.com/user-attachments/assets/190e484b-a664-4c59-8847-21a233a5a1af"/>
<img max-width="100%" height="60%" alt="Screenshot_20251102-040013_Settings" src="https://github.com/user-attachments/assets/c5201e62-7547-4cde-94e7-99754a436f33"/>
</div>
<br>
This fix involves applying the BPF Kernel Patcher to the stock boot image to ensure network connectivity on custom ROMs.

---

## **Device & Fix Details**

| Feature | Detail |
| :--- | :--- |
| **Device Name** | Infinix Note 11 |
| **Codename** | X663 |
| **SoC** | MediaTek Helio G88 (MT6769H) |
| **Target OS** | GSI - Android 14+ |
| **Problem Solved** | WiFi - Mobile Data (Internet) Connectivity |

---

## **The Problem**

When flashing any modern GSI (e.g., AOSP A15 or DerpFest A16) on the Infinix Note 11 (X663), the device boots correctly, but **WiFi - Mobile Data fails to work entirely BUT If we started HOTSPOT Sharing ... the other device can connect to our internet normally**. This is a known issue on many MediaTek devices and requires a specific patch to the kernel within the `boot.img` to enable the necessary BPF layer for network function.

---

## **The Solution**

1. First try this command (if it's not working look at method 2.)
```
adb shell settings put global restricted_networking_mode 0
```

2. The **`mtk-bpf-patcher`** has been successfully applied to the stock `boot.img` to ensure mobile data works correctly with modern GSIs.

### **Included Files**

1.  **`stock_boot.img`**: The original, unpatched boot image from the stock firmware. **(For reference or restoration purposes).**
2.  **`patched_boot_bpf_fix.img`**: The patched boot image with the BPF fix applied. **(This is the file you need to flash).**

---

## **Flashing Instructions**

⚠️ **WARNING:** Flashing custom images carries inherent risks. I am not responsible for any damage to your device. Ensure your device is the **Infinix Note 11 (X663)** and you have Fastboot/ADB access.

### **Prerequisites**

1.  ADB/Fastboot binaries and drivers installed on your PC.
2.  Your device's **Bootloader must be unlocked**.
3.  A GSI (Android 14 or higher) must already be installed.

### **Steps**

1.  Download the **`patched_boot_bpf_fix.img`** file to an easily accessible folder on your computer (e.g., your ADB folder).
2.  Open Command Prompt or PowerShell in your ADB/Fastboot directory.
3.  Verify your device is connected:
   
    ```bash
    adb devices
    ```
5.  Restart to bootloader
    ```bash
    adb reboot bootloader  
    ```
6.  Enter fastbootd Mode
    ```bash
    fastboot reboot fastboot 
    ```
7.  Flash the patched boot image:
    ```bash
    fastboot flash boot patched_boot_bpf_fix.img
    ```
8.  Once flashing is complete, reboot your device:
    ```bash
    fastboot reboot
    ```

**Result:** WiFi - Mobile Data connectivity should now be correctly enabled on your installed GSI.

---

## **Credits and Acknowledgements**

A special thanks to the communities and developers who make these fixes possible:

* **ME**: For the testing, patching, and providing these files.
* **R0rt1z2**: For developing the essential [`mtk-bpf-patcher`](https://github.com/R0rt1z2/mtk-bpf-patcher) tool.
* The wider **XDA and Project Treble communities** for continuous support and research.

Please report any issues or submit improvements by opening a new "Issue" in this repository.
