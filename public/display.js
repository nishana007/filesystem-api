const displayflowers = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:8080/flowers", false);
    xhttp.send();

    const blossom = JSON.parse(xhttp.responseText);

    for (let bloss of blossom) {
        const x = `
            <div>
                <div>NAME:${bloss.label}</div>
                <div>COLOR: ${bloss.color}</div>
                <div>ID: ${bloss.id}</div>
                <button type="button" class="btn btn-danger">remove</button>
                <button type="button" class="btn btn-info">Modify </button>

           </div>
           </br>
           
         `

        document.getElementById('petals').innerHTML = document.getElementById('petals').innerHTML + x;
    }
}

displayflowers();