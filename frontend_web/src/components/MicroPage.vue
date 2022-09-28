<template>
  <div class="background">
    <div class="title"></div>
    <div class="phone">
      <button class="camera-btn" @click="picture"></button>
    </div>
    <swiper
      :pagination="true"
      :navigation="true"
      :modules="modules"
      :swiper-per-view="auto"
      :space-between="50"
      class="swiper-wrapper"
      :speed="1000"
      @slide-change="turnToReciept"
    >
      <swiper-slide class="swiper-slide">
        <div class="inner">
          <img
            class="reciept-img"
            v-if="!pictured"
            src="../assets/reciept.svg"
            alt=""
          />
          <img class="food-img" v-else src="../assets/pasta2.jpg" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="inner">
          <img class="explain-img" src="../assets/first.svg" alt="" />
          <img class="gif-img" src="../assets/simpson.gif" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="inner">
          <img class="explain-img" src="../assets/second.svg" alt="" />
          <img class="gif-img" src="../assets/cooking.gif" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="inner">
          <img class="explain-img" src="../assets/third.svg" alt="" />
          <img class="gif-img" src="../assets/baking.gif" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="inner">
          <img class="explain-img" src="../assets/last.svg" alt="" />
          <img class="gif-img" src="" alt="" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from "vue";
import "swiper/css";
import "swiper/css/pagination";

export default {
  name: "MicroPage",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const swiperOptions = {
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: "auto",
      spaceBetween: 50,
      loop: true,
      centeredSlides: true,
      speed: 1000,
      effect: "coverflow",
      coverflowEffect: {
        rotate: 50,
        stretch: -100,
        depth: 400,
        modifier: 1,
        slideShadows: false,
      },
    };

    let pictured = ref(false);

    async function picture() {
      const background = document.querySelector(".background");
      background.classList.add("flash-active");
      await setTimeout(() => {
        pictured.value = true;
        background.classList.remove("flash-active");
      }, 1000);
    }

    function turnToReciept() {
      pictured.value = false;
    }

    return {
      swiperOptions,
      picture,
      pictured,
      turnToReciept,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
};
</script>

<style scoped>
.background {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  background: linear-gradient(36deg, #ffc061, #ffecae);
}

.flash-active {
  animation: flash 5s;
}

.phone {
  background-color: black;
  width: 300px;
  height: 500px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 100px;
  left: 618px;
}

.camera-btn {
  background-color: white;
  width: 40px;
  height: 40px;
  align-self: flex-end;
  border-radius: 50%;
  margin-bottom: 24px;
  z-index: 10;
}

.camera-btn:hover {
  cursor: pointer;
}

.swiper-wrapper {
  width: 500px;
  height: 100%;
  position: absolute;
  left: 520px;
}

.swiper-wrapper .swiper-slide {
  width: 500px;
  height: 500px;
  position: relative;
  top: 50%;
  margin-top: -230px;
  display: flex;
  justify-content: center;
}

.swiper-wrapper .swiper-slide .inner {
  width: 252px;
  height: 380px;
  background: #fff;
  padding: 30px;
  box-sizing: border-box;
  opacity: 0.4;
  transition: 1s;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.swiper-wrapper .swiper-slide-active .inner {
  opacity: 1;
  box-shadow: 0px 0px 50px rgba(255, 255, 255, 0.8);
}

.swiper-wrapper .swiper-slide .inner::before,
.swiper-wrapper .swiper-slide .inner::after {
  content: "";
  display: block;
  width: 252px;
  height: 380px;
  position: absolute;
  top: 0px;
  left: 128px;
  opacity: 0;
  background: #fff;
}

.swiper-wrapper .swiper-slide-prev .inner,
.swiper-wrapper .swiper-slide-next .inner {
  opacity: 0.7;
}

@keyframes ani {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  1% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: scale(1.2);
  }
}

.swiper-wrapper .swiper-slide-active .inner::before {
  animation: ani 1s ease 1;
}
.swiper-wrapper .swiper-slide-active .inner::after {
  animation: ani 1s ease 0.3s 1;
}

@keyframes flash {
  0%,
  20%,
  to {
    opacity: 1;
  }
  10% {
    opacity: 0;
  }
}

.reciept-img {
  width: 240px;
}

.food-img {
  height: 400px;
}

.explain-img {
  width: 240px;
}

.gif-img {
  position: absolute;
  width: 240px;
}
</style>
