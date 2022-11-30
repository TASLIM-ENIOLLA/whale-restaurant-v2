import {API} from '/api'
import {useEffect, useState} from 'react'

export default function Index(){
	const [menus, setMenus] = useState(Array(10).fill(''))
	const [foods, setFoods] = useState(Array(10).fill(''))

	// useEffect(() => {
	// 	fetch(API.GET_MENUS)
	// 	.then(e => e.json())
	// 	.then(({data}) => setMenus(data))
	// }, [])

	return (
		<section className = 'container-fluid'>
			<div className = 'row'>
				<div className = 'col-auto p-4 theme-bg vh-100 overflow-y-auto'>
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
									<button title = 'Home' className = 'border-0 px-1 bg-clear'>
										<img src = './images/icons/home1.png' width = '20' />
									</button>
								</div>
								<div className = 'col-auto mb-5'>
									<button title = 'Menu' className = 'border-0 px-1 bg-clear'>
										<img src = './images/icons/bibimbap.png' width = '20' />
									</button>
								</div>
								<div className = 'col-auto mb-5'>
									<button title = 'Foods' className = 'border-0 px-1 bg-clear'>
										<img src = './images/icons/diet.png' width = '20' />
									</button>
								</div>
							</div>
						</div>
						<div className = 'col-auto'>
							<div className = 'row flex-column'>
								<div className = 'col-auto'>
									<button title = 'Logout' className = 'border-0 bg-clear'>
										<img src = './images/icons/logout.png' width = '20' />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className = 'col bg-white vh-100 overflow-y-auto'>
					<div className = 'row flex-column'>
						<div className = 'col-auto position-sticky top-0 left-0' style = {{zIndex: 10}}>
							<header className = 'bg-white shadow-sm row a-i-c j-c-space-between py-4'>
								<div className = 'col-auto'>
									<img src = './whale-restaurant.png' width = '160' />
								</div>
								<div className = 'col-auto'>
									<div>
									</div>
								</div>
							</header>
						</div>
						<div className = 'col py-5 px-md-5'>
							<div className = 'row'>
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
									<h5 className = 'text-uppercase half-bold theme-color mb-4'>our dishes</h5>
									<div className = 'row'>{
										(foods)
										? (
											(foods.length > 0)
											? foods.map((_, index) => (
												<div className = 'col-lg-3 mb-5'>
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
	return (
		<div className = 'border rounded-1x p-4'>
			<img className = 'd-block w-100 object-fit-contain bg-light rounded-1x' height = '150' src = './images/icons/starters.png' />
			<div className = 'my-4'>
				<h5 className = 'half-bold text-capitalize text-center text-dark m-0'>moti pkmotichu</h5>
			</div>
			<div className = 'row text-capitalize'>
				<div className = 'col-6 pr-1'>
					<div className = 'text-center border-right'>
						<div className = 'text-muted'>price</div>
						<div className = 'text-dark half-bold'>$15.00</div>
					</div>
				</div>
				<div className = 'col-6 pl-1'>
					<div className = 'text-center border-left'>
						<div className = 'text-muted'>ordered</div>
						<div className = 'text-dark half-bold'>12575</div>
					</div>
				</div>
			</div>
			<div className = 'mt-4'>
				<button className = 'border rounded-1x d-block w-100 bg-teal text-light px-5 py-3 text-uppercase btn bold'>
					add to cart
				</button>
			</div>
		</div>
	)
}

function MenuItem(){
	return (
		<div className = 'container-fluid'>
			<button style = {{width: '80px', borderRadius: '50px', height: '140px'}} className = 'outline-0 row py-3 flex-column bg-light border-0'>
				<div style = {{width: '60px', height: '60px'}} className = 'border theme-bg rounded-circle mx-auto flex-v a-i-c j-c-c'>
					<img width = '30' src = './images/icons/breakfast.png' />
				</div>
				<div className = 'mt-3 text-capitalize double-line mx-auto px-2'>breakfast in bed with me and you</div>
			</button>
		</div>
	)
}
