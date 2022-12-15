const thead = document.getElementById('thead')
const tbody = document.getElementById('tbody')

const url = "https://northwind.vercel.app/api/orders"


async function getData() {
    await axios.get(url)
    .then (res => {
        fillTable(res.data)
        // console.log(res.data);
    })
}
getData()

function fillTable(data) {
    let suppliers = data.sort((a, b) => a.orderDate.localeCompare(b.orderDate)); 
    suppliers.forEach(el => {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        const th1 = document.createElement('th');
        const th2 = document.createElement('th');

        th.innerText += el.employeeId;
        th1.innerText = el.customerId;
        th2.innerText += el.orderDate;

        tr.appendChild(th)
        tr.appendChild(th1)
        tr.appendChild(th2)
        tbody.appendChild(tr)
    })
}



// Son 4 şərt burda console olunur

axios.get("https://northwind.vercel.app/api/products")
.then(res => {
    let count; // En pahali urun
    let sum=0; // Ortalama stok miktari
    count = res.data.sort((a, b) => b.unitPrice - a.unitPrice )
    res.data.forEach(el => {
        if(el.name[0] === 'C' || el.name[0] === 'c') {
            // console.log(el) //3
        }
        sum+=el.unitsInStock;
    });
    // console.log(count[0].unitPrice) //1
    // console.log(sum/res.data.length) //2
})

axios.get("https://northwind.vercel.app/api/customers")
.then(res => {
    res.data.forEach(el => {
        if(el.address?.city == "London") {
            // console.log(el);
        } 
    })
})



// BONUS 
// 2. display orders on console between year 1996 and 1997

axios.get("https://northwind.vercel.app/api/orders")
.then(res=>{
    res.data.forEach(el=>{
        if(el.orderDate.substring(0,4) == 1996 && el.orderDate.substring(0,4) == 1997) {
            console.log(el);
        }
    })
})
