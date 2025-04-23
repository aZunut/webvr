AFRAME.registerComponent('wall-collider', {
    schema: {
      raycaster: { type: 'selector' },
    },
    multiple: true,
    init: function () {
      this.face = null;
      this.el.addEventListener('raycaster-intersection', (evt) => {
        if (evt.target !== this.data.raycaster) return;
        this.face = evt.detail.intersections[0].face.normal;
      });
      this.el.addEventListener('raycaster-intersection-cleared', (evt) => {
        if (evt.target !== this.data.raycaster) return;
        this.face = null;
      });
    },
    tick: function () {
      if (!this.face) return;
      this.el.object3D.position.add(this.face.multiplyScalar(0.5));
    }
  });
  
