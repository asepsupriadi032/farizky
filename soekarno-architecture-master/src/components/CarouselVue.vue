<template>
  <div id="CarouselVue" class="carousel-container">
    <!-- Carousel Wrapper -->
    <div class="carousel">
      <div class="carousel-slide" v-for="(item, index) in items" :key="index"
        :class="['carousel-item', { 'active': index === currentIndex }]" :style="getSlideStyle(index)">
        <div class="carousel__item" :style="{ 'background-image': `url(${item})` }"></div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button v-for="(item, index) in items" :key="index"
        :class="['page-btn', 'cursor-pointer', { 'active': index === currentIndex }]"
        @click="goToSlide(index)"></button>
    </div>

    <!-- Navigation Buttons -->
    <button class="prev-btn" @click="prevSlide">&#10094;</button>
    <button class="next-btn" @click="nextSlide">&#10095;</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  }
});

const currentIndex = ref(0);

const goToSlide = (index) => {
  currentIndex.value = index;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.items.length;
};

const getSlideStyle = (index) => {
  return {
    transform: `translateX(-${currentIndex.value * 100}%)`,
    transition: 'transform 0.5s ease-in-out',
  };
};

watch(currentIndex, (newIndex) => {
  // Automatically loop the carousel with smooth transitions
});

</script>

<style scoped>
/* Carousel container */
.carousel-container {
  width: 1236px;
  border-radius: 40px;
  margin: auto;
  margin-top: 78px;
  position: relative;
}

/* Carousel Items */
.carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
  overflow: hidden;
}

.carousel-item {
  min-width: 100%;
  transition: transform 0.5s ease-in-out;
}

.carousel-item img {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
}

/* Pagination (Dots) */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.page-btn.active {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Navigation buttons */
.prev-btn,
.next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 30px;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
}

.prev-btn {
  left: 10px;
}

.next-btn {
  right: 10px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .carousel-container {
    max-width: 100%;
  }

  .prev-btn,
  .next-btn {
    font-size: 20px;
  }
}
</style>
