<template>
	<div class="card">
		<div class="card-img-top" :style="{ backgroundImage: getPosterStyle }"></div>
		<div class="card-body">
			<h5 class="text-center">{{ movie.Title }}</h5>
			<p class="text-center">Directed by {{ movie.Director }}</p>
			<p class="text-center text-muted">{{ movie.Year }}</p>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		movie: Object
	},
	computed: {
		getPosterStyle () {
			return `url(${this.movie.Poster})`
		}
	}
}
</script>

<style>
	.card {
		height: 100%;
	}

	.card-img-top {
		background-position: center center;
		background-size: cover;
		height: 300px;
	}
</style>
