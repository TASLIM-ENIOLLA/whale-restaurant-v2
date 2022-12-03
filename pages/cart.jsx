import {useRouter} from 'next/router'
import Layout from '/components/layout'
import {AppContext} from '/contexts/app'
import {useEffect, useState, useContext, useCallback, memo} from 'react'
import {Loader, ErrorOccured, EmptySetReturned} from '/components/loader'

export default function Cart(){
	const {back} = useRouter()
	const {getItems} = useContext(AppContext)
	const [cart, setCart] = useState(getItems())

	useEffect(() => console.log(cart, typeof window), [cart])

	return (
		<Layout>
			<div className = 'col-12 mb-5'>
				<h5 className = 'text-uppercase half-bold theme-color mb-4'>my cart</h5>
				<div className = 'row overflow-x-auto flex-nowrap'>{
					(cart)
					? (
						(cart.length > 0)
						? cart.map((_, index) => (
							<div className = 'col-auto' key = {index}>
								{index}
							</div>
						))
						: (
							<div className = 'col-12'>
								<EmptySetReturned title = 'oops' onReload = {() => setCart(getItems())} />
							</div>
						)
					)
					: (
						(typeof cart === 'undefined')
						? (
							<div className = 'col-12'>
								<Loader />
							</div>
						)
						: (
							<div className = 'col-12'>
								<ErrorOccured onReload = {() => setCart(getItems())} />
							</div>
						)
					)
				}</div>
			</div>
		</Layout>
	)
}