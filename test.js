const Numbers = [];
for(let i = 1; i<=10; i++){
    Numbers.push(i)
}

const result = document.querySelector(".result");
let search = document.querySelector("#search").value;
search = parseInt(search);
const button = document.querySelector("#button")

button.addEventListener("click",function(){
   if(Numbers.includes(search)){
    result.innerHTML = `<h1>${search}</h1>`
   }
   else{
    result.innerHTML = `<h1>Number not in the list</h1>`
   }
})
