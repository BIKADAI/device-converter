
function loadCountries(){
let url="https://free.currencyconverterapi.com/api/v5/countries";
let from = document.getElementById("from");
let to = document.getElementById("to");

fetch(url, { headers: { "Content-Type": "application/json; charset=utf-8" }})
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
        // here you do what you want with response
		const countries=response.results;
		let ids=Object.getOwnPropertyNames(countries);
		ids.forEach(function (id) {
		from.options[from.options.length] = new Option(`${countries[id].currencyName}  (${countries[id].currencyId})`, countries[id].currencyId);
			to.options[to.options.length] = new Option(`${countries[id].currencyName}  (${countries[id].currencyId})`, countries[id].currencyId);
       });
    })
    .catch(err => {
        alert("sorry, error on currency converter")
    });
}
 function convert(){
	 const to =document.getElementById("to").value;
	 let from=document.getElementById("from").value;
	 let amount=document.getElementById("amount").value;
	 let url=`https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to},${to}_${from}&compact=ultra`;
     fetch(url, { headers: { "Content-Type": "application/json; charset=utf-8" }})
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
        // here you do what you want with response
	  const result= response[`${from}_${to}`];
	  document.getElementById("result").innerHTML=`Result: ${amount} ${from} = ${result*amount} ${to}`;

    
    })
    .catch(err => {
        alert("sorry, error occur on  conversion")
    });
 }
 