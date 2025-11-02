import Cookies from 'js-cookie'

export const getSession = () => {
	const session = Cookies.get('session')

	return session ?? null
}
