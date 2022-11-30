export default function Template({children}){
    return (
        <div className="">
            <div className="row flex-column vh-100">
                <div className="col overflow-y-auto">
                    {children}
                </div>
                <div className="col-auto">
                    <div className="row">
                        <div className="col">
                            <button className="bg-clear border-0">
                                <div>
                                    <span className="bi-house fo-s-16"></span>
                                </div>
                                <div>
                                    <span className="">home</span>
                                </div>
                            </button>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}