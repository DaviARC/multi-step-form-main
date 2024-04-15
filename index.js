const stepsTela = document.querySelectorAll('.step');
const stepsNumeros = document.querySelectorAll('.numero-step')
const buttonsNext = document.querySelectorAll('.button-next');
const buttonsBack = document.querySelectorAll('.button-back')
const inputsStep1 = document.querySelectorAll('.input-step-1')
const camposErro = document.querySelectorAll('.mensagem-erro')

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


        console.log(stepsNumeros[i - 1])
        console.log(stepsNumeros[i])
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
    }
    else if(primeira.classList.contains("step3")){
        primeira.style.display = display1
        proxima.style.display = display2
    }
    else if(primeira.classList.contains("step4")){
        primeira.style.display = display1
        proxima.style.display = "flex"
        stepsNumeros[i].classList.add("active-step")
    }
}