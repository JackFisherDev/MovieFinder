<template>
  <section class="container">
    <div class="row wrapper justify-content-center align-items-center">
      <div class="col-sm-12 col-md-8 col-lg-6">
        <h1 class="tape-heading text-center">Movie Finder</h1>
        <h4 class="tape-heading text-center text-muted mt-5">Search engine for movies</h4>
        <div class="container search-form mt-5">
          <div class="row justify-content-center">
            <div class="col-sm-12">
              <input
                v-model="request"
                @keyup.enter="getMovies"
                class="form-control form-control-lg"
                type="text"
                placeholder="Enter movie title"
              >
            </div>
            <div class="col-sm-12 mt-2 text-center">
              <button
                @click="getMovies"
                :disabled="!getUserRequest"
                type="button"
                class="btn btn-primary btn-lg"
              >Find</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      request: ''
    }
  },
  computed: {
    getUserRequest () {
      return this.request.trim()
    }
  },
  methods: {
    goToResults () {
      this.$router.push({ path: '/result' })
    },
    getMovies () {
      if (!!this.getUserRequest) {
        localStorage.setItem('request', this.getUserRequest)
        this.goToResults()
      }
    }
  }
}
</script>

<style>
  .wrapper {
    height: 100vh;
  }
</style>

