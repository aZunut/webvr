var speed = 0.01;
var isIntersect = false;

function movePlayer() {
    var camera = document.getElementById('camera');

    if (camera && !isIntersect) {
        var position = camera.getAttribute('position');
        var rotation = camera.getAttribute('rotation');

        position.x += -Math.cos((rotation.y - 90) * Math.PI / 180) * speed;
        position.z += Math.sin((rotation.y - 90) * Math.PI / 180) * speed;
        camera.setAttribute('position', position);
    }
}

var t = 0;

function render() {
    t += 0.01;
    requestAnimationFrame(render);
    movePlayer();
}
render();

AFRAME.registerComponent('collider-check', {
    dependencies: ['raycaster'],
    init: function () {
        this.el.addEventListener('raycaster-intersection', function () {
            isIntersect = true;
        });
        this.el.addEventListener('raycaster-intersection-cleared', function () {
            isIntersect = false;
        });
    }
});