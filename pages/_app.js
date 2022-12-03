import '/public/css/common.css'
import '/public/css/animate.css'
import '/public/css/globals.css'
import '/public/css/bootstrap.css'

import {AppContext} from '/contexts/app'
import {useEffect, useState, useMemo} from 'react'

export default function App({Component, pageProps}){
	const [cartData, setCartData] = useState([])
	const AppContextValue = useMemo(() => ({
		getItems: (item_id) => {
			if(typeof item_id === 'undefined') return cartData
			else{
				const [item] = cartData.filter(({id}) => id == item_id)
				return item
			}
		},
		addItem: (item, callback) => {
			const updatedCart = [item, ...cartData]

			window.sessionStorage.setItem('cart', JSON.stringify(updatedCart))
			setCartData(updatedCart)

			if(typeof callback === 'function') callback()
		},
		removeItem: (item_id, callback) => {
			const updatedCart = cartData.filter(({id}) => id != item_id)

			window.sessionStorage.setItem('cart', JSON.stringify(updatedCart))
			setCartData(updatedCart)

			if(typeof callback === 'function') callback()
		},
		carted: (id) => {
			return cartData.map(({id}) => id).includes(id)
		}
	}), [cartData])

	useEffect(() => setCartData(JSON.parse(window.sessionStorage.getItem('cart')) || []), [])

	return (
		<AppContext.Provider value = {AppContextValue}>
			<Component {...pageProps} />
		</AppContext.Provider>
	)
}
