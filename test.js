const Numbers = [];
for(let i = 1; i<=10; i++){
    Numbers.push(i)
}

const result = document.querySelector("#result");
const search = document.querySelector("#search").value;
const button = document.querySelector("#button")

button.addEventListener("click",function(){
    if(search === 0){
        console.log("No number")
    }
    else{
        console.log(search)
    }
})
