function Indicators() {
    fetch('https://mindicador.cl/api').then(function (response) {
        return response.json()
    }).then(
        function (indicator) {
            document.getElementById("UF").value = indicator.uf.valor
            document.getElementById("Euro").value = indicator.euro.valor
            document.getElementById("Dolar").value = indicator.dolar.valor
            document.getElementById("UTM").value = indicator.utm.valor
        }
    ).catch(function (error) {
        console.log("Requestfailed", error)
    })
}

var intervalId = window.setInterval(function(){
    switcher();
  }, 1000);


document.getElementById("selector1").addEventListener("click", switcher)

function switcher() {
    Indicators()
    //Captura valor del Selector
    let valSelector = document.getElementById("selector1").value;
    let uf = document.getElementById("UF").value
    let utm = document.getElementById("UTM").value
    let dolar = document.getElementById("Dolar").value
    let euro = document.getElementById("Euro").value
    let valor1 = document.getElementById("valor1").value
    let valor2 = document.getElementById("valor2").innerHTML
    let res = 0


    switch (valSelector) {
        case "uf":
            res = valor1 * uf
            document.getElementById("valor2").setAttribute('value', res)
            console.log(valor2)
            break
        case "utm":
            res = valor1 * utm
            document.getElementById("valor2").setAttribute('value', res)
            console.log(valor2)
            break
        case "dolar":
            res = valor1 * dolar
            document.getElementById("valor2").setAttribute('value', res)
            console.log(valor2)
            break
        case "euro":
            res = valor1 * euro
            document.getElementById("valor2").setAttribute('value', res)
            console.log(valor2)
            break
        default:
            res = "error"
            break
    }
}
