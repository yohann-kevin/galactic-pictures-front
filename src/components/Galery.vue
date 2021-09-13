<template>
  <div class="scene">
    <div class="carousel">
      <div class="carousel__cell"><img class="cell-image" src="../assets/images/LastRingPortrait_Cassini_1080.jpg" /></div>
      <div class="carousel__cell"><img class="cell-image" src="../assets/images/LastRingPortrait_Cassini_1080.jpg" /></div>
      <div class="carousel__cell"><img class="cell-image" src="../assets/images/LastRingPortrait_Cassini_1080.jpg" /></div>
      <div class="carousel__cell"><img class="cell-image" src="../assets/images/LastRingPortrait_Cassini_1080.jpg" /></div>
      <div class="carousel__cell"><img class="cell-image" src="../assets/images/LastRingPortrait_Cassini_1080.jpg" /></div>
      <div class="carousel__cell"><img class="cell-image" src="../assets/images/LastRingPortrait_Cassini_1080.jpg" /></div>
      <div class="carousel__cell"><img class="cell-image" src="../assets/images/LastRingPortrait_Cassini_1080.jpg" /></div>
      <div class="carousel__cell"><img class="cell-image" src="../assets/images/LastRingPortrait_Cassini_1080.jpg" /></div>
      <div class="carousel__cell"><img class="cell-image" src="../assets/images/LastRingPortrait_Cassini_1080.jpg" /></div>
      <div class="carousel__cell"><img class="cell-image" src="../assets/images/LastRingPortrait_Cassini_1080.jpg" /></div>
    </div>
  </div>

  <div class="carousel-options">
    <p>
      <button class="previous-button">Previous</button>
      <button class="next-button">Next</button>
    </p>
    <p>
      Orientation:
      <label>
        <input type="radio" name="orientation" value="horizontal" checked />
        horizontal
      </label>
      <label>
        <input type="radio" name="orientation" value="vertical" />
        vertical
      </label>
    </p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var carousel = document.querySelector('.carousel');
      var cells = carousel.querySelectorAll('.carousel__cell');
      var cellCount;
      var selectedIndex = 0;
      var cellWidth = carousel.offsetWidth;
      var cellHeight = carousel.offsetHeight;
      var isHorizontal = true;
      var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
      var radius, theta;

      function rotateCarousel() {
        var angle = theta * selectedIndex * -1;
        carousel.style.transform = 'translateZ(' + -radius + 'px) ' + rotateFn + '(' + angle + 'deg)';
      }

      var prevButton = document.querySelector('.previous-button');
      prevButton.addEventListener( 'click', function() {
        selectedIndex--;
        rotateCarousel();
      });

      var nextButton = document.querySelector('.next-button');
      nextButton.addEventListener( 'click', function() {
        selectedIndex++;
        rotateCarousel();
      });

      function changeCarousel() {
        cellCount = 10;
        theta = 360 / cellCount;
        var cellSize = isHorizontal ? cellWidth : cellHeight;
        radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
        for ( var i=0; i < cells.length; i++ ) {
          var cell = cells[i];
          if ( i < cellCount ) {
            cell.style.opacity = 1;
            var cellAngle = theta * i;
            cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
          } else {
            cell.style.opacity = 0;
            cell.style.transform = 'none';
          }
        }

        rotateCarousel();
      }

      var orientationRadios = document.querySelectorAll('input[name="orientation"]');
      ( function() {
        for ( var i=0; i < orientationRadios.length; i++ ) {
          var radio = orientationRadios[i];
          radio.addEventListener( 'change', onOrientationChange );
        }
      })();

      function onOrientationChange() {
        var checkedRadio = document.querySelector('input[name="orientation"]:checked');
        isHorizontal = checkedRadio.value == 'horizontal';
        rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
        document.getElementsByClassName("scene")[0].style.marginTop = isHorizontal ? '70px' : '300px' ;
        changeCarousel();
      }

      onOrientationChange();
    }
  },
}
</script>

<style>
.scene {
  border: 1px solid #CCC;
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

.carousel__cell {
  position: absolute;
  width: 760px;
  height: 480px;
  left: 20px;
  top: 20px;
  border: 2px solid black;
  line-height: 232px;
  font-size: 160px;
  font-weight: bold;
  text-align: center;
  transition: transform 1s, opacity 1s;
}

.carousel-options {
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;
  background: hsla(0, 0%, 100%, 0.8);
}

.cell-image {
  width: 100%;
  height: 100%;
}
</style>
