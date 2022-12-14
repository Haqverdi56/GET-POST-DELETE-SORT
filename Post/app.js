// import Toastify from 'toastify-js'

const addBUtton = document.getElementById('add-button')
const nameInput = document.getElementById('name-input')
const descInput = document.getElementById('desc-input')
const body = document.getElementById('desc-input')



function add() {
    let newProduct = {
        name: nameInput.value,
        description: descInput.value,
    }

    network.add('/products', newProduct)
        .then(res => {
        console.log('Res ', res);
        Toastify({
            text: "This is a toast",
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
    })
    .catch (err => {
        console.log(err)
    })

    const success = document.createElement('p')
    document.body.appendChild(success);
}