export function Loader(){
    return (
        <div className = 'text-center bg-light p-5 rounded-1x'>
            <p><img src = '/gifs/2.webp' width = '30' /></p>
            <h6 className = 'text-sentence text-muted m-0'>loading...</h6>
        </div>
    )
}

export function ErrorOccured({onReload}){
    return (
        <div className = 'text-center bg-light p-5 rounded-1x'>
            <p><img src = '/gifs/2.webp' width = '30' /></p>
            <h6 className = 'text-sentence text-muted mb-3'>An error occured, couldn't retrieve data!</h6>
            <div>
                <button onClick = {() => typeof onReload === 'function' && onReload()} className = 'px-3 rounded-lg py-2 bg-white text-capitalize btn'>reload</button>
            </div>
        </div>
    )
}

export function EmptySetReturned({title, onReload}){
    return (
        <div className = 'text-center bg-light p-5 rounded-1x'>
            <p><img src = '/gifs/2.webp' width = '30' /></p>
            <h6 className = 'text-sentence text-muted mb-3'>{title ? `${title}, ` : ''}empty list returned!</h6>
            <div>
                <button onClick = {() => typeof onReload === 'function' && onReload()} className = 'px-3 rounded-lg py-2 bg-white text-capitalize btn'>reload</button>
            </div>
        </div>
    )
}
