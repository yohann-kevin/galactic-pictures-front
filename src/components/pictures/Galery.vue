<template>
  <div class="galery">
    <h1>Picture of these last two weeks</h1>
    <div class="scene">
      <div class="carousel">
        <div class="carousel-cell" v-for="(picture, selectedIndex) in pictures" :key="selectedIndex">
          <img class="cell-image" :src="picture.url" v-on:click="selectPicture()" v-if="picture.mediaType != 'video'"/>
          <img class="cell-image" :src="videoThumbnail(picture.url)" v-on:click="selectPicture()" v-else/>
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

    <div class="all-picture">
      <h1>All picture provided by nasa</h1>
      <article v-for="(picture, i) in currentPictures" :key="i" >
        <img v-on:click="selectPictureInAllPicture(i)" :src="picture.url" v-if="picture.mediaType != 'video'" />
        <img v-on:click="selectPictureInAllPicture(i)" :src="videoThumbnail(picture.url)" v-else />
        <p v-on:click="selectPictureInAllPicture(i)">{{ picture.title }}</p>
      </article>
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
      let scene = document.getElementsByClassName("scene")[0];
      if (this.isHorizontal) {
        scene.style.marginTop = '25px';
        scene.style.marginBottom = '0px';
      } else {
        scene.style.marginTop = '450px';
        scene.style.marginBottom = '450px';
      }
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
    },
    selectPictureInAllPicture(index) {
      this.$emit("selectPicture", this.currentPictures[index]);
    },
    videoThumbnail(initialUrl) {
      let videoId = initialUrl.split("/");
      videoId = videoId[videoId.length - 1].split("?")[0];
      return "https://i1.ytimg.com/vi/" + videoId + "/default.jpg";
    }
  },
}
</script>

<style>
.galery {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.galery h1 {
  width: 100%;
}

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

.all-picture {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.all-picture h1 {
  width: 100%;
}

.all-picture article {
  width: 21%;
  background-color: #efefef;
  margin: 25px;
  border: none;
  transition: 0.8s;
}

.all-picture article:hover {
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0px 30px 60px 0px #c0bebe;
}

.all-picture article > img {
  width: 100%;
  min-height: 200px;
  max-height: 200px;
}
</style>
