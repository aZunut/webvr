const joints = [
  "wrist", "thumb-tip", "index-finger-tip", "middle-finger-tip", "ring-finger-tip", "pinky-finger-tip"
];

// コンソール出力を画面に表示
function logToScreen(message) {
  const consoleEl = document.getElementById("consoleOutput");
  const currentText = consoleEl.getAttribute("text").value;
  const newText = currentText + "\n" + message;
  consoleEl.setAttribute("text", "value", newText.slice(-500));  // 最後の500文字だけ表示
}

// console.log と console.error を上書き
console.log = (message) => logToScreen("[LOG] " + message);
console.error = (message) => logToScreen("[ERROR] " + message);
console.warn = (message) => logToScreen("[WARN] " + message);

function updateCoordinates(text) {
  const coordinatesEl = document.getElementById("coordinates");
  coordinatesEl.setAttribute("text", "value", text);
  console.log(text);  // 座標も表示
}

AFRAME.registerComponent("track-hands", {
  tick: function () {
    let output = "";
    ["left-hand", "right-hand"].forEach((handId) => {
      const handEl = document.getElementById(handId);
      if (handEl && handEl.components["hand-tracking-controls"]) {
        const hand = handEl.components["hand-tracking-controls"].controller;
        if (hand) {
          joints.forEach((jointName) => {
            const joint = hand.joints[jointName];
            if (joint) {
              const pos = joint.position;
              output += `${handId} - ${jointName}: (${pos.x.toFixed(3)}, ${pos.y.toFixed(3)}, ${pos.z.toFixed(3)})\n`;
            } else {
              console.warn(`Joint not found: ${jointName}`);
            }
          });
        } else {
          console.error(`Hand controller not found for ${handId}`);
        }
      } else {
        console.error(`Hand element not found for ${handId}`);
      }
    });
    updateCoordinates(output || "No hand data");
  },
});

document.querySelector("a-scene").setAttribute("track-hands", "");
