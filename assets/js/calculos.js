import * as Indicators from "../js/indicadores.js";

//Captura valor del Selector
var valSelector = document.getElementById("selector").selectedIndex;

let res = Indicators.Indicators()

console.log(res);

if (valSelector.value == "uf") {
    let res = Indicators()
    // let res = indicators.dailyIndicators * document.getElementById("valor1");

    document.getElementById("valor2").value = res;
}
// console.log(Indicators.Indicators.indicador.uf.valor);
