import header from "../assets/header-sermons.webp"

const SermonsHeader = () => {
    return (
        <section className="header" style={{ backgroundImage: `url(${header})`, backgroundPosition: "50% 65%", backgroundSize: "135%" }}>
            <div className="header-blur">
                <div className="container-medium">
                    <h1 className="header-title">Sermons</h1>
                </div>
            </div>
        </section>
    )
}

export default SermonsHeader