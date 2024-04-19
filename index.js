const stepsTela = document.querySelectorAll('.step');
const stepsNumeros = document.querySelectorAll('.numero-step')
const buttonsNext = document.querySelectorAll('.button-next');
const buttonsBack = document.querySelectorAll('.button-back')
const inputsStep1 = document.querySelectorAll('.input-step-1')
const camposErro = document.querySelectorAll('.mensagem-erro')
const boxsPlan = document.querySelectorAll('.plan-box');
const planoDescontoTextos = document.querySelectorAll(".plano-desconto")
const switchButton = document.querySelector(".switch-button")
const precos = document.querySelectorAll(".preco-box")
const checkBoxStep2 = document.querySelector(".checkbox-step2")
const checkBoxOns = document.querySelectorAll(".checkbox-ons-input")
const precosOns = document.querySelectorAll(".preco-ons")
const precoFinalElemento = document.querySelector(".total-resultado-preco")
const precoPorAno = document.querySelector(".preco-resultado-mes")
const planoContainer = document.querySelector("#plan")
let parcela = "";
let plan = "";
let aux;
let ativo;
let valorTotal = 0
const tituloResultado = document.querySelector(".titulo-resultado")
const totalResultadoP = document.querySelector(".total-resultado-p")
const elementos = [];

console.log(precosOns);

inputsStep1.forEach((input, i) =>{
    input.addEventListener("blur", ()=> {
        verificaInput(input, i)
        input.classList.remove("active-input-text");
    })
    input.addEventListener("focus", ()=> {
        input.classList.add("active-input-text")
        camposErro[i].textContent = ""
    })
})
buttonsNext.forEach((button, i) =>{
    button.addEventListener('click', (e)=>{
        e.preventDefault()
        mudaPagina(stepsTela[i], stepsTela[i+1], i, "")
    })
})
buttonsBack.forEach((button, i)=>{
    button.addEventListener('click', ()=>{
        mudaPagina(stepsTela[i], stepsTela[i+1], i + 1, "volta")
    })
})

function verificaInput(input, i){
    if(!input.checkValidity() && input.validity['valueMissing'] === true){
        camposErro[i].textContent = "This field is required" 
    } else 
    camposErro[i].textContent = ""
}

function mudaPagina(primeira, proxima, i, direcao){
    let display1 = "none"
    let display2 = "block"

    if(direcao === "volta"){
        display1 = "block"
        display2 = "none"

        if(stepsNumeros[i - 1]){
            stepsNumeros[i - 1].classList.add("active-step")
            stepsNumeros[i].classList.remove("active-step")
        }
    } 
    else
    {
    if(stepsNumeros[i+1]){
        stepsNumeros[i + 1].classList.add("active-step")
        stepsNumeros[i].classList.remove("active-step")
    }
    }
    if(primeira.classList.contains("step1")){
        primeira.style.display = display1
        proxima.style.display = display2  
    }
    else if(primeira.classList.contains("step2")){
        primeira.style.display = display1
        proxima.style.display = display2
        if(!checkBoxStep2.checked){
            parcela = "Monthly"
        } else {
            parcela = "Yearly"
        }
        if(ativo){
            plan = ativo.classList[2];
        }
    }
    else if(primeira.classList.contains("step3")){
        primeira.style.display = display1
        proxima.style.display = display2
        let valorOns = 0
        checkBoxOns.forEach((check, i)=>{
            if(check.checked && i == 0){
                valorOns += 1;
            } else if(check.checked) {
                valorOns += 2;
            }

            if(check.checked){

                let titulo = check.parentElement.nextElementSibling.querySelector('.titulo-box');
                let preco = titulo.parentElement.nextElementSibling.querySelector('.preco-ons').textContent;
                
                if(parcela ="Yearly"){
                    preco * 10
                }
                elementos.push(`<div class="resultado-flex">
                <p class="p-resultado">${titulo.textContent}</p>
                <p class="preco-resultado">${preco}</p>
                </div>`)
            }
        })
        if(parcela === "Yearly"){   
            if(plan === "arcade"){
                valorTotal += 90;
            }
            else if(plan === "advanced"){
                valorTotal += 120;
            }
            else if(plan === "pro"){
                valorTotal += 150
            }
            tituloResultado.innerHTML = "Arcade (Yearly)"
            totalResultadoP.textContent = "Total (per year)"
            precoPorAno.textContent = `$${valorTotal}/yr`
            valorTotal += valorOns * 10
        } else {
            if(plan === "arcade"){
                valorTotal += 9;
            }
            else if(plan === "advanced"){
                valorTotal += 12;
            }
            else if(plan === "pro"){
                valorTotal += 15;
            }
            tituloResultado.textContent = "Arcade (Monthly)"
            totalResultadoP.textContent = "Arcade (Per month)"  
            precoPorAno.textContent = `$${valorTotal}/yr`
            valorTotal += valorOns;
        }
        precoFinalElemento.textContent = `+$${valorTotal}/mo` 
        elementos.forEach(elemento=>{
            console.log(elemento)
            planoContainer.innerHTML += elemento
        }) 

    }
    else if(primeira.classList.contains("step4")){
        primeira.style.display = display1
        proxima.style.display = "flex"
        stepsNumeros[i].classList.add("active-step")
    }
}

boxsPlan.forEach(box => {
    box.addEventListener("click", ()=>{
       boxsPlan.forEach(box=>{
        if(box.classList.contains("plano-active")){
            aux = box
        }
       })
       if(!aux){
            box.classList.add("plano-active")
            ativo = box;
       } else{
            aux.classList.remove("plano-active")
            box.classList.add("plano-active")
            aux = null
            ativo = box
       }
    })
})

switchButton.addEventListener("click", ()=>{
    if(!checkBoxStep2.checked){
        precos[0].textContent = "$90/yr"
        precos[1].textContent = "$120/yr"
        precos[2].textContent = "$150/yr"
        precosOns[0].textContent = "+$10/yr"
        precosOns[1].textContent = "+$20/yr"
        precosOns[2].textContent = "+$20/yr"     
    } else {
        precos[0].textContent = "$9/mo"
        precos[1].textContent = "$12/mo"
        precos[2].textContent = "$15/mo"
        precosOns[0].textContent = "+$1/mo"
        precosOns[1].textContent = "+$2/mo"
        precosOns[2].textContent = "+$2/mo"
    }
    planoDescontoTextos.forEach(texto => {
        texto.classList.toggle("hidden")
    })
})
