window.onload = Indicators();
function Indicators() {
    fetch('https://mindicador.cl/api').then(function (response) {
        return response.json()
    }).then(
        function (indicator) {
            //Captura valor del indicador desde la api
            document.getElementById("UF").value = indicator.uf.valor
            document.getElementById("Euro").value = indicator.euro.valor
            document.getElementById("Dolar").value = indicator.dolar.valor
            document.getElementById("UTM").value = indicator.utm.valor
        }
    ).catch(function (error) {
        console.log("Requestfailed", error)
    })
}


var intervalId = window.setInterval(function () {
    switcher();
}, 1000);


document.getElementById("selector1").addEventListener("click", switcher)

function switcher() {
    Indicators()
    //Se guarda el valor capturado en las variables correspondientes
    let valSelector = document.getElementById("selector1").value;
    let uf = document.getElementById("UF").value
    let utm = document.getElementById("UTM").value
    let dolar = document.getElementById("Dolar").value
    let euro = document.getElementById("Euro").value
    let valor1 = document.getElementById("valor1").value
    let valor2 = document.getElementById("valor2").innerHTML
    let res = 0

    //Segun el selector se realiza el calculo necesario
    switch (valSelector) {
        case "uf":
            res = valor1 * uf
            document.getElementById("valor2").setAttribute('value', Math.trunc(res).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
            console.log(valor2)
            break
        case "utm":
            res = valor1 * utm
            document.getElementById("valor2").setAttribute('value', Math.trunc(res).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
            console.log(valor2)
            break
        case "dolar":
            res = valor1 * dolar
            document.getElementById("valor2").setAttribute('value', Math.trunc(res).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
            console.log(valor2)
            break
        case "euro":
            res = valor1 * euro
            document.getElementById("valor2").setAttribute('value', Math.trunc(res).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
            console.log(valor2)
            break
        default:
            res = "error"
            break
    }
}


function historial() {
    Indicators()
    console.log(document.getElementById("UF").value);

    const fecha = new Date();

    let hoy = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`;
    let hora = `${fecha.getHours()}:${(fecha.getMinutes() < 10 ? '0' : '') + fecha.getMinutes()}`;
    let tipo;
    let valor;
    let registroHistorial = [];

    class registro {
        constructor(fecha, hora, tipo, valor) {
            this.fecha = fecha;
            this.hora = hora;
            this.tipo = tipo;
            this.valor = valor;
        }
    }

    const tiposInd = ["UF", "UTM", "DOLAR", "EURO"];
    for (let index = 0; index < tiposInd.length; index++) {
        console.log(tiposInd[index])
        switch (tiposInd[index]) {
            case "UF":
                tipo = "UF"
                valor = document.getElementById("UF").value
                registroHistorial[1] = new registro(hoy, hora, tipo, valor);
            case "UTM":
                tipo = "UTM"
                valor = document.getElementById("UTM").value
                registroHistorial[2] = new registro(hoy, hora, tipo, valor);
            case "DOLAR":
                tipo = "DOLAR"
                valor = document.getElementById("Dolar").value
                registroHistorial[3] = new registro(hoy, hora, tipo, valor);

            case "EURO":
                tipo = "EURO"
                valor = document.getElementById("Euro").value
                registroHistorial[4] = new registro(hoy, hora, tipo, valor);
            default:
                tipo = "error"
                break
        }

    }
    console.log(registroHistorial)


}
console.log(historial())



