import {API} from '/api'
import Layout from '/components/layout'
import {useEffect, useState, useContext, useCallback, memo} from 'react'
import {Loader, ErrorOccured, EmptySetReturned} from '/components/loader'

export default function Menu(){
	const [menus, setMenus] = useState()
	
	const getMenus = useCallback(() => {
		setMenus()

		fetch(API.GET_MENUS)
		.then(e => e.json())
		.then(({data}) => setMenus(data))
	}, [menus])

	useEffect(() => getMenus(), [])

	return (
		<Layout>
			<div className = 'col-12 mb-5'>
				<h5 className = 'text-uppercase half-bold theme-color mb-4'>our menu</h5>
				<div className = 'row'>{
					(menus)
					? (
						(menus.length > 0)
						? menus.map(({id, image, name, description}, index) => (
							<div className = 'col-12' key = {`${new Date().getTime()}-${index}`}>
								<a href = {`./menu/${id}`} className = 'container-fluid d-block w-100 py-3 bg-white border shadow-sm rounded-1x mb-4'>
									<div className = 'row a-i-c'>
										<div className = 'col-auto'>
											<img width = '60' src = {`./images/menus/${image}`} className = 'object-fit-contain' />
										</div>
										<div className = 'col'>
											<h5 className = 'half-bold text-teal text-capitalize m-0'>{name}</h5>
										</div>
									</div>
								</a>
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
		</Layout>
	)
}