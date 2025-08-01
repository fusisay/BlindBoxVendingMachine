import Header from "../layouts/Header.jsx";
import "../components/Background.css"




export default function Home() {
    return (
        <div className="background">
            <div className="mask"></div>
            <div className="container">
                <Header isLoggedIn={false} />
            </div>
        </div>

    )
}