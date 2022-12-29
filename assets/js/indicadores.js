//El boton  debe llamar a tabla valores
let button = document.querySelector('#Valores');
button.addEventListener('click', () => {
    tablaIndicadores();
});

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
            return indicator
        }
    ).catch(function (error) {
        console.log("Requestfailed", error)
    })

    //Historial de valores segun datos de local storage
    let valUF = JSON.parse(localStorage.getItem("UF"))
    let valUTM = JSON.parse(localStorage.getItem("UTM"))
    let valDolar = JSON.parse(localStorage.getItem("DOLAR"))
    let valEuro = JSON.parse(localStorage.getItem("EURO"))
    document.getElementById("iniUF").innerText = "El valor de la " + valUF.tipo + " fue de " + valUF.valor + " CLP el dia " + valUF.fecha
    document.getElementById("iniUTM").innerText = "El valor de la " + valUTM.tipo + " fue de " + valUTM.valor + " CLP el dia " + valUTM.fecha
    document.getElementById("iniDolar").innerText = "El valor del " + valDolar.tipo + " fue de " + valDolar.valor + " CLP el dia " + valDolar.fecha
    document.getElementById("iniEuro").innerText = "El valor del " + valEuro.tipo + " fue de " + valEuro.valor + " CLP el dia " + valEuro.fecha


}

var intervalId = window.setInterval(function () {
    switcher();
}, 1000);

document.getElementById("selector1").addEventListener("click", switcher)

function switcher() {
    Indicators()
    //Se guarda el valor capturado en las variables correspondientes y se declaran variables
    let valSelector = document.getElementById("selector1").value;
    let uf = document.getElementById("UF").value
    let utm = document.getElementById("UTM").value
    let dolar = document.getElementById("Dolar").value
    let euro = document.getElementById("Euro").value
    let valor1 = document.getElementById("valor1").value
    let res = 0

    //Segun el selector se realiza el calculo necesario
    switch (valSelector) {
        case "uf":
            res = valor1 * uf
            document.getElementById("valor2").setAttribute('value', Math.trunc(res).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
            break
        case "utm":
            res = valor1 * utm
            document.getElementById("valor2").setAttribute('value', Math.trunc(res).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
            break
        case "dolar":
            res = valor1 * dolar
            document.getElementById("valor2").setAttribute('value', Math.trunc(res).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
            break
        case "euro":
            res = valor1 * euro
            document.getElementById("valor2").setAttribute('value', Math.trunc(res).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
            break
        default:
            res = "error"
            break
    }
}

function tablaIndicadores() {
    const fecha = new Date();

    //Declaracion de variables
    let uf = document.getElementById("UF").value
    let utm = document.getElementById("UTM").value
    let dolar = document.getElementById("Dolar").value
    let euro = document.getElementById("Euro").value
    let hoy = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`;
    let hora = `${fecha.getHours()}:${(fecha.getMinutes() < 10 ? '0' : '') + fecha.getMinutes()}`;
    let tipo
    let valor
    let registroValores = [];

    //Crear tabla donde se almacenan los datos
    const crearVal = () => {
        let valTablaDiv = document.querySelector("div.tablaValDiv")
        let table = document.querySelector("table.tablaVal")
        let tableHead = document.querySelector("thead.tablaValHead")

        //Ciclo para recorrer el largo del arreglo tiposInd
        let index = 0
        tiposInd.forEach(element => {
            index = index + 1

            //Declarar variables y DOM
            let valTablaRow = document.createElement("tr")
            valTablaRow.className = "TablaRow"
            let valTipo = document.createElement("th")
            valTipo.className = "valTipo"
            let valValor = document.createElement("th")
            valValor.className = "valValor"
            let valDia = document.createElement("th")
            valDia.className = "valDia"
            let valHora = document.createElement("th")
            valHora.className = "valHora"

            //Creacion de local storage
            //El local storage guarda los valores de la tabla luego llamar por lo menos una vez a la funcion tablaIndicadores
            const guardarStorage = (id, valor) => { localStorage.setItem(id, valor) }
            const obj = JSON.stringify(registroValores[index])

            guardarStorage(registroValores[index].tipo, obj)


            //Llamada a los objetos que almacenan los datos
            valTipo.innerText = registroValores[index].tipo
            valValor.innerText = registroValores[index].valor
            valDia.innerText = registroValores[index].fecha
            valHora.innerText = registroValores[index].hora

            //Se adjuntan las variables correspondientes a cada parte de la tabla
            valTablaRow.append(valTipo)
            valTablaRow.append(valValor)
            valTablaRow.append(valDia)
            valTablaRow.append(valHora)
            tableHead.append(valTablaRow)
            table.append(tableHead)
            valTablaDiv.append(table)
        });
    }
    //Se crea el constructor
    class registro {
        constructor(fecha, hora, tipo, valor) {
            this.fecha = fecha;
            this.hora = hora;
            this.tipo = tipo;
            this.valor = valor;
        }
    }

    //Arreglo y recorrido
    const tiposInd = ["UF", "UTM", "DOLAR", "EURO"];
    for (let index = 0; index < tiposInd.length; index++) {

        //Usando la iteracion de recorrido de usa un switch para obtener datos de cada tipo de indicador
        switch (tiposInd[index]) {
            case "UF":
                tipo = "UF"
                valor = uf
                registroValores[1] = new registro(hoy, hora, tipo, valor);
            case "UTM":
                tipo = "UTM"
                valor = utm
                registroValores[2] = new registro(hoy, hora, tipo, valor);
            case "DOLAR":
                tipo = "DOLAR"
                valor = dolar
                registroValores[3] = new registro(hoy, hora, tipo, valor);
            case "EURO":
                tipo = "EURO"
                valor = euro
                registroValores[4] = new registro(hoy, hora, tipo, valor);
            default:
                tipo = "error"
                break
        }
    }
    //Se llama a la tabla
    crearVal()
}
