import Api from './api'

export default {
	getMovies (options) {
		return Api().get('', {
			params: {
				apikey: '407970e9',
				...options
			}
		})
	}
}
