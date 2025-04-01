const joints = [
    "wrist", "thumb-tip", "index-finger-tip", "middle-finger-tip",
    "ring-finger-tip", "pinky-finger-tip"
  ];
  
function updateCoordinates(text) {
  const coordinatesEl = document.getElementById("coordinates");
  if (coordinatesEl) {
    coordinatesEl.setAttribute("text", "value", text);
  } else {
    console.warn("Coordinates entity not found");
  }
}

function checkComponentRegistration() {
    if (AFRAME.components["track-hands"]) {
      console.log("track-handsコンポーネントは正常に登録されています");
    } else {
      console.log("track-handsコンポーネントは登録されていません");
    }
  }

AFRAME.registerComponent("track-hands", {
  tick: function () {
    // let d = new Date();
    let output = "";
    ["left-hand", "right-hand"].forEach((handId) => {
      const handEl = document.getElementById(handId); // 文字列に一致するidをもつものを返す
      if (handEl && handEl.components["hand-tracking-controls"]) {
        const hand = handEl.hand;
        if (hand) {
          joints.forEach((jointName) => {
            const joint = hand.joints[jointName];
            output += jointName
            if (joint) {
              const pos = joint.position;
            //   output += `${handId} - ${jointName}: (${pos.x.toFixed(3)}, ${pos.y.toFixed(3)}, ${pos.z.toFixed(3)})\n`;
            }
          });
        } else {
          console.warn(`Hand controller not found for ${handId}`);
          output = `Hand controller not found for ${hand}`;
        }
      } else {
        console.warn(`Hand element not found for ${handId}`);
        output = `Hand element not found for ${handId}`;
      }
    });

    // updateCoordinates(output || "No data");
    updateCoordinates(output);
  },
});

// A-Frameのシーンが完全にロードされ、エンティティが存在することを確認
window.addEventListener("load", () => {
  const sceneEl = document.querySelector("a-scene");
  sceneEl.addEventListener("loaded", () => {
    console.log("A-Frame scene fully loaded");

    // エンティティが確実に作成されてから処理を開始
    const coordinatesEl = document.getElementById("coordinates");
    if (coordinatesEl) {
      sceneEl.setAttribute("track-hands", "");

    } else {
      console.error("Coordinates entity is missing. Please check the HTML.");
    }
  });
});
window.addEventListener("load", checkComponentRegistration);
