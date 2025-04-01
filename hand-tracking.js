const joints = [
  "wrist", "thumb-tip", "index-finger-tip", "middle-finger-tip",
  "ring-finger-tip", "pinky-finger-tip"
];

function updateCoordinates(text) {
  // エンティティが存在するかをチェックしてから操作
  const coordinatesEl = document.getElementById("coordinates");
  if (coordinatesEl) {
    coordinatesEl.setAttribute("text", "value", text);
  } else {
    console.warn("Coordinates entity not found");
  }
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
              console.log(`[${handId}] ${jointName}: (${pos.x}, ${pos.y}, ${pos.z})`);  // デバッグ用ログ
            }
          });
        } else {
          console.warn(`Hand controller not found for ${handId}`);
        }
      } else {
        console.warn(`Hand element not found for ${handId}`);
      }
    });

    // 座標が空の場合でも更新を試みる（表示リセット）
    updateCoordinates(output || "No hand data");
  },
});

document.querySelector("a-scene").setAttribute("track-hands", "");
