import {useContext, useEffect, Fragment} from 'react'
import {getTimeOfTheDay} from '/functions'
import {useRouter} from 'next/router'
import {AppContext} from '/contexts/app'

export default function Layout({children}){
    const {back, asPath} = useRouter()
    const {getItems} = useContext(AppContext)
    const cartCount = getItems().length
    
    return (
        <section className = 'container-fluid'>
            <div className = 'row flex-column vh-100'>
                <div className = 'col-auto'>
                    <header className = 'bg-white shadow-sm row a-i-c j-c-space-between py-4 px-md-5'>
                        <div className = 'col-auto'>
                            <a href = '/'>
                                <img src = './whale-restaurant.png' width = '160' />
                            </a>
                        </div>
                        <div className = 'col-auto'>
                            <a href = './cart' title = 'View cart' className = 'border-0 bg-clear btn po-rel'>
                                <span className = 'd-inline-flex a-i-c j-c-c bg-teal top-0 right-0 cart-count rounded-circle bold text-white po-abs'>{
                                    (cartCount > 9)
                                    ? '9+'
                                    : cartCount
                                }</span>
                                <img src = './images/icons/cart.png' width = '25' />
                            </a>
                        </div>
                    </header>
                </div>
                <div className = 'col overflow-y-auto'>
                    <div className = 'row py-5 px-md-5'>
                        {children}
                    </div>
                </div>{
                    (asPath === '/')
                    ? <></>
                    : (
                        <div className = 'col-auto'>
                            <footer className = 'bg-white row px-md-5 py-3 border-top'>
                                <div className = 'col-auto'>
                                    <button onClick = {() => back()} title = 'Go back' className = 'btn border-0 bg-clear'>
                                        <img src = './images/icons/left-arrow.png' width = '20' />
                                    </button>
                                </div>
                            </footer>
                        </div>
                    )
                }
                <div className = 'col w-auto position-fixed bottom-0 right-0'>
                    <div className = 'row p-4 px-md-5'>
                        <button title = 'Go back' className = 'btn rounded-circle bg-teal floating-button'>
                            <img src = './images/icons/phone.png' width = '30' />
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                .z-index-10{
                    z-index: 10;
                }
                .cart-count{
                    transform: translate(30%, -30%);
                    width: 20px;
                    height: 20px;
                }
                .floating-button{
                    width: 60px;
                    height: 60px;
                }
            `}</style>
        </section>
    )
}