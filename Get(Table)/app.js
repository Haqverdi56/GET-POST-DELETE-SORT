const thead = document.getElementById('thead')
const tbody = document.getElementById('tbody')

const url = "https://northwind.vercel.app/api/suppliers"

const obj = {}

// MODAL
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
const form = document.getElementById("form");
const companyName = document.getElementById("companyName");
const contactName = document.getElementById("contactName");
const contactTitle = document.getElementById("contactTitle");
const region = document.getElementById("region");

companyName.addEventListener('input', function() {
    obj.compName = companyName.value;
})
contactName.addEventListener('input', function() {
    obj.contName = contactName.value;
})
contactTitle.addEventListener('input', function() {
    obj.contTitle = contactTitle.value;
})
region.addEventListener('input', function() {
    obj.rgn = region.value;
})

form.addEventListener('submit', async function(e) {
    e.preventDefault()
    console.log(obj)
    await axios.put(`${url}/${obj.id}`, obj)
    .then(res=>{
        console.log(res.data);
        tbody.innerHTML ="";
        getData()
    })
})

function toggleModal() {
    modal.classList.toggle("show-modal");
}
function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
//MODAL FINISH

async function getData() {
    await axios.get(url)
    .then (res => {
        fillTable(res.data)
    })
}

getData()

function fillTable(data) {
    // console.log(data)
    // let suppliers = data.sort((a, b) => a.companyName?.localeCompare(b.companyName));

    data.forEach(el => {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        const th1 = document.createElement('th');
        const th2 = document.createElement('th');
        const th3 = document.createElement('th');
        const deleteTh = document.createElement('th');
        const updateTh = document.createElement('th');
        
        th.innerText = el.companyName;
        th1.innerText += el.contactName;
        th2.innerText += el.contactTitle;
        th3.innerText += el.address?.city;
        deleteTh.innerText = "Delete"
        updateTh.innerText = "Update"
        deleteTh.style.cursor = 'pointer'
        updateTh.style.cursor = 'pointer'

        tr.appendChild(th)
        tr.appendChild(th1)
        tr.appendChild(th2)
        tr.appendChild(th3)
        tr.appendChild(deleteTh)
        tr.appendChild(updateTh)
        tbody.appendChild(tr)

        deleteTh.addEventListener('click', async function() {
            await axios.delete(`${url}/${el.id}`)
            .then(res => {
                console.log(res.data)
                getData();
            })
            Toastify({
                text: "Deleted Success",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
            tbody.innerHTML ="";
             
        })
        updateTh.addEventListener('click', function(e) {
            toggleModal()
            // console.log(el)
            obj.compName = el.companyName;
            obj.contName = el.contactName;
            obj.contTitle = el.contactTitle;
            obj.rgn = el.address?.city;
            obj.id = el.id;

            companyName.value = obj.compName
            contactName.value = obj.contName
            contactTitle.value = obj.contTitle
            region.value = obj.rgn
        })
    })
}

