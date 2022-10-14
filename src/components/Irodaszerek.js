import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Create } from "./Create.js";

export function Irodaszerek() {
    const [products, setProducts] = useState([]);

    async function getFetch() {
        const products = await fetch("/Irodaszerek");
        const prod = await products.json();
        setProducts(prod);
    };

    useEffect(() => {
        getFetch();
    }, [])

    return (
        <div className="otherPages">
            <Create />
            <div className="parent text-uppercase" >
                <h4 >Név</h4>
                <h4 >Márka</h4>
                <h4 >Ár</h4>
            </div>
            {products.map((product) => (
                <div key={product._id} className="parent">
                    <h4 >{product.name}</h4>
                    <h4>{product.brand}</h4>
                    <h5 >{product.price} Ft</h5>
                    <form onSubmit={() => {
                        fetch(`/Irodaszerek/${product._id}`, {
                            method: 'DELETE'
                        })
                        getFetch()
                    }}>
                        <button className="buttonStyle btn btn-danger">Törlés</button>
                    </form>
                    <NavLink to={`/Irodaszerek/${product._id}`}>
                        <button className="buttonStyle btn btn-secondary">Szerkesztés</button>
                    </NavLink>
                </div>
            ))}
        </div>
    )
}