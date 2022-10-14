import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function UpdatePage() {
    const [product, setProduct] = useState([])
    const param = useParams();
    const id = param.IrodaszerId;
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/Irodaszerek/${id}`)
            .then((res) => res.json())
            .then((res) => setProduct(res))
    }, [id])

    return (
        <div className="otherPages">
            <div className="text-center pt-5">
                <h2 className="mb-5">{product.name} szerkesztése:</h2>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    if (
                        event.target.elements.name.value !== "" &&
                        event.target.elements.price.value !== "" &&
                        event.target.elements.brand.value !== ""
                    ) {
                        fetch(`/Irodaszerek/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(
                                {
                                    name: event.target.elements.name.value,
                                    brand: event.target.elements.brand.value,
                                    price: event.target.elements.price.value
                                    
                                }
                            )
                        })
                            .then(() => {
                                navigate('/Irodaszerek')
                            })

                    } else {
                        alert("Adj meg értékeket!");
                    }
                }}>
                    <label className="mb-2">{product.name} új neve:</label>
                    <div>
                        <input type="text" name="name" className="inputStyle"></input>
                    </div>

                    <div><label>Eddigi márkája: {product.brand} </label></div>
                    <label >Új irodaszer márkája:</label>
                    <div>
                        <input type="text" name="brand" className="inputStyle"></input>
                    </div>

                    <div><label>Eddigi ára: {product.price} Ft</label></div>
                    <label className="mb-2"> {product.name} új ára(Ft):</label>
                    <div>
                        <input type="text" name="price" className="inputStyle"></input>
                    </div>
                    <button className="buttonStyle btn btn-success mb-2">Véglegesítés</button>
                </form>
                <div>
                    <button className="buttonStyle btn btn-secondary" onClick={() => {
                        navigate("/Irodaszerek");
                    }}> Vissza</button>
                </div>
            </div>
        </div>
    )
}