import Navbar from "../components/Navbar";


function ShopLayout ({ children }) {

    return (
        <>
            <Navbar />
            <div className="pt-24">
                { children }
            </div>
        </>
    )
}


export default ShopLayout;