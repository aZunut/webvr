const overlay = document.getElementById("overlay");
const handCoordinates = document.getElementById("hand-coordinates");

async function initWebXR() {
    if (!navigator.xr) {
        overlay.textContent = "WebXR is not supported on this device.";
        return;
    }

    try {
        const session = await navigator.xr.requestSession("immersive-vr", {
            optionalFeatures: ["hand-tracking"]
        });

        overlay.textContent = "WebXR session started.";

        const glCanvas = document.createElement("canvas");
        document.body.appendChild(glCanvas);
        const gl = glCanvas.getContext("webgl", { xrCompatible: true });

        const xrRefSpace = await session.requestReferenceSpace("local");

        const updateHandData = (inputSource) => {
            if (inputSource.hand) {
                let handText = "";
                for (const jointName of inputSource.hand.keys()) {
                    const joint = inputSource.hand.get(jointName);
                    if (joint) {
                        const pos = joint.transform.position;
                        handText += `${jointName}: (${pos.x.toFixed(3)}, ${pos.y.toFixed(3)}, ${pos.z.toFixed(3)})\n`;
                    }
                }
                return handText;
            }
            return "No hand";
        };

        const onXRFrame = (time, frame) => {
            const session = frame.session;
            let handDataText = "";

            for (const inputSource of session.inputSources) {
                if (inputSource.hand) {
                    handDataText += updateHandData(inputSource) + "\n";
                }
            }

            overlay.textContent = handDataText || "No hand data";
            handCoordinates.setAttribute("text", `value: ${handDataText}`);

            session.requestAnimationFrame(onXRFrame);
        };

        session.requestAnimationFrame(onXRFrame);
    } catch (error) {
        overlay.textContent = `Error: ${error.message}`;
    }
}

initWebXR();
