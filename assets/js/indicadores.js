export function Indicators() {
    const indicador = () => {
        try{
            fetch('https://mindicador.cl/api').parse()
        } catch (error) {
            console.log("Requestfailed", error);
        };
    }

    return indicador;
}


/*
fetch('https://mindicador.cl/api').then(function (response) {
        return response.json();
    }).then(function (dailyIndicators) {
        dailyIndicators.uf.valor;
        dailyIndicators.dolar.valor;
        dailyIndicators.euro.valor;
        dailyIndicators.utm.valor;

    }).catch(function (error) {
        console.log("Requestfailed", error);
    });
*/