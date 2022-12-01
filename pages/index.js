import {API} from '/api'
import {useEffect, useState} from 'react'

export default function Index(){
	const [menus, setMenus] = useState()
	const [foods, setFoods] = useState()

	useEffect(() => {
		fetch(API.GET_MENUS)
		.then(e => e.json())
		.then(({data}) => setMenus(data))

		fetch(API.GET_FOODS)
		.then(e => e.json())
		.then(({data}) => setFoods(data))
	}, [])

	return (
		<section className = 'container-fluid'>
			<div className = 'row'>
				{/* <div className = 'col-auto py-4 px-3 theme-bg vh-100 overflow-y-auto'>
					<div className = 'row flex-column flex-nowrap min-h-100 text-center'>
						<div className = 'col-auto'>
							<div className = 'row'>
								<div className = 'col-auto mb-5'>
									<a href = '/'>
										<img src = './logo.png' width = '35' />
									</a>
								</div>
							</div>
						</div>
						<div className = 'col'>
							<div className = 'row flex-column'>
								<div className = 'col-auto mb-5'>
									<button title = 'Home' className = 'border-0 px-1 bg-clear btn'>
										<img src = './images/icons/home1.png' width = '25' />
									</button>
								</div>
								<div className = 'col-auto mb-5'>
									<button title = 'Menu' className = 'border-0 px-1 bg-clear btn'>
										<img src = './images/icons/bibimbap.png' width = '25' />
									</button>
								</div>
								<div className = 'col-auto mb-5'>
									<button title = 'Foods' className = 'border-0 px-1 bg-clear btn'>
										<img src = './images/icons/diet.png' width = '25' />
									</button>
								</div>
							</div>
						</div>
						<div className = 'col-auto'>
							<div className = 'row flex-column'>
								<div className = 'col-auto'>
									<button title = 'Logout' className = 'border-0 bg-clear btn'>
										<img src = './images/icons/logout.png' width = '25' />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div> */}
				<div className = 'col bg-white vh-100 overflow-y-auto'>
					<div className = 'row flex-column'>
						<div className = 'col-auto position-sticky top-0 left-0' style = {{zIndex: 10}}>
							<header className = 'bg-white shadow-sm row a-i-c j-c-space-between py-4 px-md-5'>
								<div className = 'col-auto'>
									<img src = './whale-restaurant.png' width = '160' />
								</div>
								<div className = 'col-auto'>
									<button title = 'View cart' className = 'border-0 bg-clear btn'>
										<img src = './images/icons/cart.png' width = '25' />
									</button>
								</div>
							</header>
						</div>
						<div className = 'col'>
							<div className = 'row py-5 px-md-5'>
								<div className = 'col-12 mb-5'>
									<h5 className = 'text-uppercase half-bold theme-color mb-4'>our menu</h5>
									<div className = 'row overflow-x-auto flex-nowrap'>{
										(menus)
										? (
											(menus.length > 0)
											? menus.map((_, index) => (
												<div className = 'col-auto' key = {index}>
													<MenuItem />
												</div>
											))
											: undefined
										)
										: (
											(typeof menus === 'undefined')
											? <div>loading</div>
											: <div>couldn't fetch</div>
										)
									}</div>
								</div>
								<div className = 'col-12 mb-5'>
									<h5 className = 'text-uppercase half-bold theme-color mb-4'>our popular dishes</h5>
									<div className = 'row'>{
										(foods)
										? (
											(foods.length > 0)
											? foods.map((_, index) => (
												<div className = 'col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-5' key = {index}>
													<FoodItem />
												</div>
											))
											: undefined
										)
										: (
											(typeof foods === 'undefined')
											? <div>loading</div>
											: <div>couldn't fetch</div>
										)
									}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function FoodItem(){
	const [isCarted, setIsCarted] = useState(false)

	return (
		<div className = 'border rounded-1x p-4'>
			<img className = 'd-block w-100 object-fit-contain bg-light rounded-1x' height = '150' src = './images/icons/starters.png' />
			<div className = 'my-4 text-center'>
				<h5 className = 'half-bold text-capitalize text-dark m-0 one-line'>moti pkmotichu</h5>
				<div className = 'text-teal text-capitalize one-line'>price</div>
			</div>
			<div className = 'row text-capitalize'>
				<div className = 'col-6 pr-1'>
					<div className = 'text-center border-right'>
						<div className = 'text-muted one-line'>price</div>
						<div className = 'text-dark half-bold one-line'>$15.00</div>
					</div>
				</div>
				<div className = 'col-6 pl-1'>
					<div className = 'text-center border-left'>
						<div className = 'text-muted one-line'>ordered</div>
						<div className = 'text-dark half-bold one-line'>12575</div>
					</div>
				</div>
			</div>
			<div className = 'mt-4'>
				<Button className = 'container-fluid text-left bg-teal rounded-1x text-light border-0 py-3'>
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
			.then(() => setTimeout(() => setIsLoading(false), 500))
			.catch(() => setTimeout(() => setIsLoading(false), 5000))
		}} className = {`${isLoading ? 'disabled' : ''} ${className}`} {...otherProps}>{
			isLoading
			? loadingAnimation
			: children
		}</button>
	)
}

function MenuItem(){
	return (
		<div className = 'container-fluid'>
			<button style = {{width: '85px', borderRadius: '50px', height: '160px'}} className = 'outline-0 row py-3 flex-column bg-clear border'>
				<div style = {{width: '60px', height: '60px'}} className = 'theme-bg rounded-circle mx-auto flex-v a-i-c j-c-c'>
					<img width = '30' src = './images/icons/breakfast.png' />
				</div>
				<div className = 'mt-3 text-capitalize double-line mx-auto text-dark px-2'>breakfast in bed with me and you</div>
			</button>
		</div>
	)
}
