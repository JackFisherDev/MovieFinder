import axios from 'axios'
import { isContext } from 'vm';

export default () => {
	return axios.create({
		baseURL: 'http://www.omdbapi.com/'
	})
}
