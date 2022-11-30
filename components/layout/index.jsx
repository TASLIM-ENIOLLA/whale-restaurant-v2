import {Fragment} from 'react'
import {getTimeOfTheDay} from '/functions'
import {useRouter} from 'next/router'

export default function Layout({children}){
    const {asPath, back} = useRouter()
    const [bodyComponent] = children.filter(({type: {name}}) => name === 'Body')
    const [headerComponent] = children.filter(({type: {name}}) => name === 'Header')

    return (
        <section style = {{maxWidth: '500px'}} className = 'mx-auto bg-white'>
            <div className = 'position-sticky top-0 left-0 py-3 bg-white shadow z-index-10'>
                <div className = 'container-fluid'>
                    <div className = 'row a-i-c'>{
                        (asPath !== '/')
                        ? (
                            <div className = 'col-auto'>
                                <button onClick = {() => back()} className = 'border-0 bg-clear p-1'>
                                    <span className = 'bi-arrow-left-circle-fill theme-color fo-s-18'></span>
                                </button>
                            </div>
                        )
                        : undefined
                    }
                        {headerComponent}
                    </div>
                </div>
            </div>
            <div>
                <div className = 'container-fluid min-vh-100'>
                    <div className = 'row'>
                        {bodyComponent}
                    </div>
                </div>
            </div>
            <div className = 'position-fixed bottom-0 right-0 p-4'>
                <button className = 'theme-bg border-0 flicker rounded-circle shadow' style = {{width: '50px', height: '50px'}}>
                    <span className = 'bi-chat-dots-fill text-white fa-2x'></span>
                </button>
            </div>
            <style jsx>{`
                .z-index-10{
                    z-index: 10;
                }
            `}</style>
        </section>
    )
}

export function Header({children}){
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export function Body({children}){
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export function HeaderBar({title}){
    return (
        <div className="col">
            <div className="row a-i-c j-c-space-between">
                <div className="col-auto">
                    <h4 onClick = {() => window.location.reload()} className="bold theme-color text-sentence m-0">{title}</h4>
                </div>
                <div className="col-auto">
                    <div className = 'row a-i-c'>
                        <div className = 'col-auto'>
                            <button title = 'My basket' className="border-0 bg-clear p-1">
                                <span className="theme-color bi-cart-fill fo-s-20"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/*
    <section className = 'bg-white mx-auto overflow-y-auto min-vh-100' style = {{maxWidth: '500px'}}>
        {children}
    </section>
*/
