<template>
  <div class="scene">
    <div class="carousel">
      <div class="carousel-cell" v-for="(picture, selectedIndex) in pictures" :key="selectedIndex">
        <img class="cell-image" :src="picture.url" v-on:click="selectPicture()"/>
      </div>
    </div>
  </div>

  <div class="carousel-options">
    <div>
      <button class="previous-button" v-on:click="previousPicture()" >Previous</button>
      <button class="next-button" v-on:click="nextPicture()" >Next</button>
    </div>
    <div>
      Orientation:
      <label>
        <input type="radio" name="orientation" value="horizontal" checked v-on:click="onOrientationChange()" />
        horizontal
      </label>
      <label>
        <input type="radio" name="orientation" value="vertical" v-on:click="onOrientationChange()" />
        vertical
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPictures: null,
      carousel: null,
      cells: null,
      cellCount: 15,
      selectedIndex: 0,
      cellWidth: null,
      cellHeight: null,
      isHorizontal: true,
      rotateFn: null,
      radius: null,
      theta: null
    }
  },
  props: {
    pictures: {
      type: Array,
      required: true
    }
  },
  created() {
    this.currentPictures = this.pictures;
  },
  mounted() {
    this.initGalery();
  },
  methods: {
    initGalery() {
      this.carousel = document.querySelector('.carousel');
      this.cells = this.carousel.querySelectorAll('.carousel-cell');
      this.cellWidth = this.carousel.offsetWidth;
      this.cellHeight = this.carousel.offsetHeight;
      this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';

      this.onOrientationChange();
    },
    rotateCarousel() {
      if ((this.selectedIndex % 15) == 0 && this.selectedIndex != 0) {
        for (let i = 0; i < 15; i++) this.currentPictures.push(this.currentPictures.splice(i, 1)[0]);
      }
      let angle = this.theta * this.selectedIndex * -1;
      this.carousel.style.transform = 'translateZ(' + -this.radius + 'px) ' + this.rotateFn + '(' + angle + 'deg)';
    },
    changeCarousel() {
      this.theta = 360 / this.cellCount;
      let cellSize = this.isHorizontal ? this.cellWidth : this.cellHeight;
      this.radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / this.cellCount ) );
      for ( let i = 0; i < this.cells.length; i++ ) {
        let cell = this.cells[i];
        if ( i < this.cellCount ) {
          cell.style.opacity = 1;
          let cellAngle = this.theta * i;
          cell.style.transform = this.rotateFn + '(' + cellAngle + 'deg) translateZ(' + this.radius + 'px)';
        } else {
          cell.style.opacity = 0;
          cell.style.transform = 'none';
        }
      }

      this.rotateCarousel();
    },
    onOrientationChange() {
      let checkedRadio = document.querySelector('input[name="orientation"]:checked');
      this.isHorizontal = checkedRadio.value == 'horizontal';
      this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
      document.getElementsByClassName("scene")[0].style.marginTop = this.isHorizontal ? '70px' : '300px' ;
      this.changeCarousel();
    },
    nextPicture() {
      this.selectedIndex++;
      this.rotateCarousel();
    },
    previousPicture() {
      this.selectedIndex--;
      this.rotateCarousel();
    },
    selectPicture() {
      this.$emit("selectPicture", this.currentPictures[this.selectedIndex]);
    }
  },
}
</script>

<style>
.scene {
  position: relative;
  width: 840px;
  height: 560px;
  margin-top: 70px;
  perspective: 1000px;
}

.carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 1s;
}

.carousel-cell {
  position: absolute;
  width: 760px;
  height: 480px;
  left: 20px;
  top: 20px;
  border: 2px solid black;
  line-height: 232px;
  font-size: 80px;
  font-weight: bold;
  text-align: center;
  transition: transform 1s, opacity 1s;
}

.carousel-cell:hover {
  cursor: pointer;
}

.carousel-options {
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;
  background: hsla(0, 0%, 100%, 0.8);
}

.carousel-options div {
  padding: 15px;
}

.cell-image {
  width: 100%;
  height: 100%;
}
</style>
