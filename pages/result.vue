<template>
  <section class="container">
    <div class="row mt-3">
      <div class="col-sm-3 align-items-center">
        <button @click="goToSearch" class="btn btn-primary">Back to Search</button>
      </div>
      <div class="col-sm-9">
        <h3 v-if="isCarouselVisible || gotError" class="tape-heading text-center">You'd searched <code>{{ getUserRequest }}</code></h3>
        <div v-else-if="!isCarouselVisible && !gotError" class="tape-heading d-flex justify-content-center align-items-center">
          <strong>Loading...</strong>
          <div class="spinner-border" role="status" aria-hidden="true"></div>
        </div>
      </div>
      <div class="col-sm-12 mt-4">
        <carousel
          :perPageCustom="[[320, 1], [480, 2], [768, 3], [1024, 4]]"
          :navigationEnabled="true"
          :paginationEnabled="false"
          :navigationPrevLabel="arrowLeft"
          :navigationNextLabel="arrowRight"
          v-if="isCarouselVisible"
        >
          <slide
            v-for="movie in movies"
            :key="movie.imdbID"
            class="p-2"
          >
            <MovieCard :movie="movie" />
          </slide>
        </carousel>

        <h2 v-if="gotError" class="tape-heading text-center mt-5">{{ errorMessage }}</h2>
      </div>
    </div>
  </section>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import MovieService from '@/services/MovieService'
import MovieCard from '@/components/MovieCard'

export default {
  components: {
    Carousel,
    Slide,
    MovieCard
  },
  data() {
    return {
      movies: [],
      page: 1,
      isCarouselVisible: false,
      errorMessage: '',
      gotError: false,
      arrowLeft: `<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M222 255L394 83c19-19 19-50 0-69s-51-19-68 0L117 221c-8 9-13 22-13 34 0 14 5 26 13 35l207 208c9 9 22 14 34 14a48 48 0 0 0 35-82L222 255zm148 218c-5 5-15 5-20 0L141 266c-3-4-5-7-5-11 0-3 2-6 5-10L350 38c2-3 5-5 10-5s7 2 10 5c6 5 6 15 0 21L184 243c-3 4-5 7-5 12s2 9 5 12l185 185c7 7 7 16 1 21z"/>
                  </svg>`,
      arrowRight: `<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M395 223L186 14c-19-19-51-19-68 0a49 49 0 0 0 0 69l172 174-172 173a49 49 0 0 0 0 68c8 9 22 14 34 14s26-5 34-14l209-207c8-8 13-22 13-34s-5-26-13-34zm-24 44L164 474c-5 5-16 5-21 0s-5-15 0-20l185-185c7-7 7-17 0-24L142 60c-6-7-6-15 0-20 3-4 6-5 10-5 3 0 7 1 10 5l209 209c3 3 5 6 5 10-2 1-3 7-5 8z"/>
                  </svg>`
    }
  },
  computed: {
    getUserRequest () {
      return localStorage.getItem('request')
    }
  },
  methods: {
    async getMovies () {
      try {
        await MovieService.getMovies({
          s: this.getUserRequest,
          page: this.page
        }).then(response => {
          if (response.data.Response === 'False') {
            throw new Error(response.data.Error)
          } else {
            this.movies = response.data.Search

            this.setDirectorForMovie()
          }
        })
      } catch (e) {
        this.errorMessage = e.message
        this.gotError = true
      }
    },
    setDirectorForMovie () {
      this.movies.forEach(async (movie, index) => {
        let movieObj = (await MovieService.getMovies({ i: movie.imdbID })).data
        movie.Director = movieObj.Director
        
        if (index === this.movies.length -1) this.isCarouselVisible = true
      })
    },
    goToSearch () {
      this.$router.push({ path: '/' })
    }
  },
  created () {
    this.getMovies()
  }
}
</script>

<style>
  .VueCarousel-navigation-button {
    background: #fff !important;
  }

  .VueCarousel-navigation-button svg {
    width: 50px;
  }
</style>

