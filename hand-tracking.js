const joints = [
    "wrist", "thumb-tip", "index-finger-tip", "middle-finger-tip", "ring-finger-tip", "pinky-finger-tip"
  ];
  
  function updateCoordinates(text) {
    const coordinatesDiv = document.getElementById("coordinates");
    coordinatesDiv.textContent = text;
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
              }
            });
          }
        }
      });
      updateCoordinates(output || "No hand data");
    },
  });
  
  document.querySelector("a-scene").setAttribute("track-hands", "");
  
