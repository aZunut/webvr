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
    const bones = document.getElementById('right-hand').components['hand-tracking-controls'].bones;
    bones.forEach((bone, index) => {
    console.log(`Joint ${index}:`, bone.getWorldPosition());
    output = `Joint ${index}: ${bone.getWorldPosition()}`;
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
