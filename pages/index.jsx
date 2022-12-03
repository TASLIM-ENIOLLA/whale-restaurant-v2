import {API} from '/api'
import Layout from '/components/layout'
import {AppContext} from '/contexts/app'
import {useEffect, useState, useContext, useCallback, memo} from 'react'
import {Loader, ErrorOccured, EmptySetReturned} from '/components/loader'

export default function Index(){
	const [menus, setMenus] = useState()
	const [foods, setFoods] = useState()

	const getMenus = useCallback(() => {
		setMenus()

		fetch(API.GET_MENUS)
		.then(e => e.json())
		.then(({data}) => setMenus([
			{id: '', name: 'all menus', image: '1.jpg'},
			...data
		]))
	}, [menus])

	const getFoods = useCallback(() => {
		setFoods()

		fetch(API.GET_FOODS)
		.then(e => e.json())
		.then(({data}) => setFoods(data))
	}, [foods])

	useEffect(() => {
		getMenus()
		getFoods()
	}, [])

	return (
		<Layout>
			<div className = 'col-12 mb-5'>
				<h5 className = 'text-uppercase half-bold theme-color mb-4'>our menu</h5>
				<div className = 'row overflow-x-auto flex-nowrap'>{
					(menus)
					? (
						(menus.length > 0)
						? menus.map((item, index) => (
							<div className = 'col-auto' key = {`${new Date().getTime()}-${index}`}>
								<MenuItem {...item} />
							</div>
						))
						: (
							<div className = 'col-12'>
								<EmptySetReturned title = 'oops' onReload = {() => getMenus()} />
							</div>
						)
					)
					: (
						(typeof menus === 'undefined')
						? (
							<div className = 'col-12'>
								<Loader />
							</div>
						)
						: (
							<div className = 'col-12'>
								<ErrorOccured onReload = {() => getMenus()} />
							</div>
						)
					)
				}</div>
			</div>
			<div className = 'col-12 mb-5'>
				<h5 className = 'text-uppercase half-bold theme-color mb-4'>our popular dishes</h5>
				<div className = 'row'>{
					(foods)
					? (
						(foods.length > 0)
						? foods.map((item, index) => (
							<div className = 'col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-5' key = {`${new Date().getTime()}-${index}`}>
								<FoodItem {...item} />
							</div>
						))
						: (
							<div className = 'col-12'>
								<EmptySetReturned title = 'oops' onReload = {() => getFoods()} />
							</div>
						)
					)
					: (
						(typeof foods === 'undefined')
						? (
							<div className = 'col-12'>
								<Loader />
							</div>
						)
						: (
							<div className = 'col-12'>
								<ErrorOccured onReload = {() => getFoods()} />
							</div>
						)
					)
				}</div>
			</div>
		</Layout>
	)
}

function FoodItem(foodData){
	const {id, name, image, menu_name, price, orders} = foodData
	const {removeItem, addItem, carted} = useContext(AppContext)
	const [isCarted, setIsCarted] = useState(carted(id))

	function onButtonClick(){
		if(isCarted) removeItem(id, () => setIsCarted(false))
		else addItem(foodData, () => setIsCarted(true))
	}

	return (
		<div className = 'border rounded-1x p-4'>
			<div>
				<a href = {`./foods/${id}`} className = 'd-block w-100'>
					<img className = 'd-block w-100 object-fit-contain bg-light rounded-1x' height = '150' src = './images/icons/starters.png' />
				</a>
			</div>
			<div className = 'my-4 text-center'>
				<h5 className = 'half-bold text-capitalize text-dark m-0 one-line'>
					<a href = {`./foods/${id}`} className = 'underline'>{name}</a>
				</h5>
				<div className = 'text-teal text-capitalize one-line mt-2'>{menu_name}</div>
			</div>
			<div className = 'row text-capitalize'>
				<div className = 'col-6 pr-1'>
					<div className = 'text-center border-right'>
						<div className = 'text-muted one-line'>price</div>
						<div className = 'half-bold one-line text-teal'>N{new Intl.NumberFormat().format(price)}</div>
					</div>
				</div>
				<div className = 'col-6 pl-1'>
					<div className = 'text-center border-left'>
						<div className = 'text-muted one-line'>orders</div>
						<div className = 'half-bold one-line text-teal'>{new Intl.NumberFormat().format(orders)}</div>
					</div>
				</div>
			</div>
			<div className = 'mt-4'>
				<Button onClick = {onButtonClick} className = {`container-fluid text-left bg-${isCarted ? 'light text-teal' : 'teal text-light'} rounded-1x border-0 py-3`}>
					<div className = 'row a-i-c flex-nowrap'>
						<div className = 'col pr-0'>
							<div className = 'text-uppercase bold one-line'>{isCarted ? 'remove from' : 'add to'} cart</div>
						</div>
						<div className = 'col-auto pl-0'>
							<img src = {`./images/icons/${isCarted ? 'remove-from-cart' : 'add-to-cart'}.png`} width = '20' />
						</div>
					</div>
				</Button>
			</div>
		</div>
	)
}

function Button({children, onClick, className, ...otherProps}){
	const [isLoading, setIsLoading] = useState(false)
	const loadingAnimation = (
		<div className = 'text-center'>
			<span className = 'd-inline-block bi-arrow-repeat fo-s-18 spin'></span>
			<style jsx>{`
				.spin{
					animation: spiner 1s linear infinite;
				}
				@keyframes spiner{
					from{transform: rotate(0deg)}
					to{transform: rotate(360deg)}
				}
			`}</style>
		</div>
	)

	return (
		<button onClick = {() => {
			setIsLoading(true)
			new Promise(resolve => resolve(typeof onClick === 'function' ? onClick() : undefined))
			.then(() => setTimeout(() => setIsLoading(false), 100))
			.catch(() => setTimeout(() => setIsLoading(false), 5000))
		}} className = {`${isLoading ? 'disabled' : ''} btn ${className}`} {...otherProps}>{
			isLoading
			? loadingAnimation
			: children
		}</button>
	)
}

function MenuItem({id, name, image}){
	return (
		<div className = 'container-fluid' onClick = {() => window.location = `./menus/${id}`}>
			<button style = {{width: '85px', borderRadius: '50px', height: '160px'}} className = 'outline-0 row py-3 flex-column bg-clear border'>
				<div style = {{width: '60px', height: '60px'}} className = 'theme-bg rounded-circle mx-auto flex-v a-i-c j-c-c'>
					<img width = '30' src = {`./images/menu/${image}`} />
				</div>
				<div className = 'mt-3 text-capitalize double-line mx-auto text-dark px-2'>{name}</div>
			</button>
		</div>
	)
}
