const Cards = () => {
    return (
        <div className="container" style={style.container}>
            <h2>Coming soon</h2><br/>
            <h3>New Cards will be displayed here </h3>
        </div>
    )
}

const style={
    container: {
        "max-width": "50%",
        "border": "1px solid #000",
        "height": "400px",
        "text-align": "center",
        "align-items": "center",
        "display": "flex",
        "flex-direction": "column",
        "justify-content": "center",
    }
}

export default Cards;