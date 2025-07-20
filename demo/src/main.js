// main.js
import { FaceMesh } from '@mediapipe/face_mesh';
window.FaceMesh = FaceMesh;

import * as Peekr from 'peekr';
window.Peekr = Peekr;

window.startEyeTrackingWithCallbacks = () => {
  document.getElementById("initBtn").disabled = true;
  const dot = document.getElementById("gaze-dot");
  const logEl = document.getElementById("log");

  Peekr.initEyeTracking({
    onReady: () => {
      logEl.textContent += "\n✅ Model Loaded. Run Eye Tracking Now.";
      document.getElementById("startBtn").disabled = false;
      document.getElementById("stopBtn").disabled = false;
    },
    onGaze: (gaze) => {
      const rawX = gaze.output.cpuData[0];
      const rawY = gaze.output.cpuData[1];

      const x_coef_ui = parseFloat(document.getElementById("xCoefInput").value) || 0;
      const x_intercept = parseFloat(document.getElementById("xInterceptInput").value) || 0;
      const y_coef = parseFloat(document.getElementById("yCoefInput").value) || 0;
      const y_intercept = parseFloat(document.getElementById("yInterceptInput").value) || 0;

      const x_coef = -x_coef_ui;

      const xpred = ((x_coef * (rawX * 100 - 50) + x_intercept) * screen.width) / 100;
      const ypred = ((y_coef * (rawY * 100) + y_intercept) * screen.height) / 100;

      dot.style.left = `${xpred}px`;
      dot.style.top = `${ypred}px`;
      dot.style.display = "block";
    }
  });
};

window.runEyeTracking = () => {
  Peekr.runEyeTracking();
};

window.stopEyeTracking = () => {
  Peekr.stopEyeTracking();
};
