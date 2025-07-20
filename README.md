# 👁️ Peekr: Browser-based Eye Tracking

**Peekr** is a lightweight, browser-compatible webcam eye tracking module. It runs entirely in the browser — no installation, no data sent to a server.

## 🎓 Background

Peekr was developed by **Aryaman Taore**, a visual neuroscientist and machine learning engineer. The project emerged during Aryaman's PhD at the University of Auckland and continued through his postdoctoral research at **Stanford University**. Peekr's underlying ML model was trained on **268,000+ image frames** from **264 participants** recruited via Prolific. Each participant used their own personal setup.

**Accuracy** (after calibration):

* Mean horizontal error: **1.53 cm** (~1.75° visual angle)
* Mean vertical error: **2.20 cm** (~2.52° visual angle)
These results were obtained from 30 randomly selected participants using their own setups, with no supervision. Each participant followed a stimulus on screen after completing a simple 5-dot calibration. The calibration consisted of four dots in the corners and one in the center of the screen. After this, a linear fit was applied separately to the x and y axes to adjust the gaze predictions.

---
## 🚀 Install via NPM

```bash
npm install peekr
```

Then use it in your app:

```js
import * as Peekr from 'peekr';

Peekr.initEyeTracking({
  onReady: () => console.log("Ready"),
  onGaze: (gaze) => {
    console.log(gaze.output.cpuData); // [x, y] in ~[0,1]
  }
});

Peekr.runEyeTracking(); // Start prediction
Peekr.stopEyeTracking(); // Stop webcam and prediction
```
---
## 🧪 Demo App

A full demo is available in the [`/demo`](./demo) folder.

### 🧰 To run it locally:

```bash
cd demo
npm install
npm run start
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

### 🧭 How to use the demo:

1. **Click "Init Eye Tracking"** – this loads the model and sets up the webcam.
2. Once the model is ready, a message will confirm that it's loaded.
3. **Click "Run Eye Tracking"** – a red dot will begin tracking your gaze in real-time.
4. Use the **calibration sliders** to adjust the X/Y offset and scaling so the dot aligns with your actual gaze.

> Requires: Chrome or any browser with webcam + WASM support

---

## 🧠 Available Functions

### `Peekr.initEyeTracking({ onReady, onGaze })`

Initializes the webcam, loads the ONNX model, and sets up gaze detection.

* `onReady`: Called once the model is loaded and initialized.
* `onGaze(gaze)`: Called every frame with the gaze prediction:

  ```js
  gaze.output.cpuData = [x, y]; // Both values in range ~[0, 1]
  ```

### `Peekr.runEyeTracking()`

Starts real-time gaze prediction.

### `Peekr.stopEyeTracking()`

Stops webcam and gaze processing.

## 📁 Files Included

| File          | Purpose                         |
| ------------- | ------------------------------- |
| `index.js`    | Main entry module               |
| `worker.js`   | Off-main-thread gaze processing |
| `peekr.onnx`  | Gaze detection model            |
| `.wasm` files | ONNX Runtime Web WASM backend   |

---

## 📦 Publishing

To build and publish:

```bash
npm run build
npm publish --access public
```

Make sure your `dist/` includes the model, worker, and all necessary WASM files.

## 🧠 Credits

Built by **Aryaman Taore** at [Dakin Lab](https://www.dakinlab.org) and [Stanford Brain Development & Education Lab](https://edneuro.stanford.edu).

## 🗪 License

[MIT](https://mit-license.org/)
