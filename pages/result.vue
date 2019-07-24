<template>
  <section class="container">
    <div class="row">
      <div class="col-sm-12">
        <h2 class="text-center">Your results</h2>
        <carousel
          :perPageCustom="[[320, 1], [480, 2], [768, 3], [1024, 4]]"
          v-if="isCarouselVisible"
        >
          <slide
            v-for="movie in movies"
            :key="movie.imdbID"
          >
            <div class="card" style="width: 10rem;">
              <img
                :src="movie.Poster"
                :alt="movie.Title"
                class="card-img-top"
              >
              <div class="card-body">
                <h5 class="text-center">{{ movie.Title }}</h5>
                <p class="text-center">Directed by {{ movie.Director }}</p>
                <p class="text-center text-muted">{{ movie.Year }}</p>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </section>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import MovieService from '@/services/MovieService'

export default {
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      movies: [],
      page: 1,
      isCarouselVisible: false
    }
  },
  methods: {
    async getMovies () {
      await MovieService.getMovies({
        s: localStorage.getItem('request'),
        page: this.page
      }).then(response => {
        this.movies = response.data.Search

        this.movies.forEach(async (movie, index) => {
          let obj = (await MovieService.getMovies({ i: movie.imdbID })).data
          movie.Director = obj.Director
          
          if (index === this.movies.length -1) this.isCarouselVisible = true
        })
      })
    }
  },
  created () {
    this.getMovies()
  }
}
</script>

<style>

</style>

