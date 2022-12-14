const thead = document.getElementById('thead')
const tbody = document.getElementById('tbody')

const url = "https://northwind.vercel.app/api/suppliers"


async function getData() {
    await axios.get(url)
    .then (res => {
        fillTable(res.data)
    })
}
getData()

function fillTable(data) {
    let suppliers = data.sort((a, b) => a.companyName.localeCompare(b.companyName));
    // console.log(sortName);
    suppliers.forEach(el => {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        const th1 = document.createElement('th');
        const th2 = document.createElement('th');
        const th3 = document.createElement('th');
        const deleteTh = document.createElement('th');

        // tr.innerText += el.companyName;
        th.innerText = el.companyName;
        th1.innerText += el.contactName;
        th2.innerText += el.contactTitle;
        th3.innerText += el.address.city;
        deleteTh.innerText = "Delete"
        deleteTh.style.cursor = 'pointer'

        tr.appendChild(th)
        tr.appendChild(th1)
        tr.appendChild(th2)
        tr.appendChild(th3)
        tr.appendChild(deleteTh)
        tbody.appendChild(tr)

        deleteTh.addEventListener('click', async function() {
            await axios.delete(`${url}/${el.id}`)
            .then(res => {
                console.log(res.data)
            })
            Toastify({
                text: "Deleted Success",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
            tbody.innerHTML ="";
            getData();  
        })
    })
}