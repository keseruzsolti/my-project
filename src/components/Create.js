export function Create() {
    return (
        <div className="newProduct">
            <h2 className="textCenter" style={{ marginTop: "30px" }}> Irodaszerek</h2>
            <div>
                <h3>Új irodaszer felvétele:</h3>
                <form onSubmit={(event) => {
                    if (
                        event.target.elements.name.value !== "" &&
                        event.target.elements.price.value !== "" &&
                        event.target.elements.brand.value !== ""
                    ) {
                        fetch("/Irodaszerek", {
                            method: 'POST',
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
                        });
                    } else {
                        alert("Adj meg értékeket!");
                        event.preventDefault();
                    }
                    console.log(event.target.elements.brand.value)
                    console.log('aaa')
                    //getFetch();
                }}>
                    <label >Új irodaszer neve:</label>
                    <div>
                        <input type="text" name="name" className="inputStyle"></input>
                    </div>

                    <label >Új irodaszer márkája:</label>
                    <div>
                        <input type="text" name="brand" className="inputStyle"></input>
                    </div>

                    <label >Új irodaszer ára(Ft):</label>
                    <div>
                        <input type="text" name="price" className="inputStyle"></input>
                    </div>

                    <button className="buttonStyle btn btn-success">Új felvétele</button>
                </form>
            </div>
        </div>
    )
}