document.getElementById('formulario').addEventListener('submit', cadastraMotoboy);

function cadastraMotoboy (e) {
    var nomeMotoboy = document.getElementById('nomeMotoboy').value;
    var valorDinheiro = document.getElementById('valorDinheiro').value;
    var time = new Date();

    if(!nomeMotoboy || !valorDinheiro){
        alert("Por favor, preencha os campos em branco!");
        return false;
    }

    motoboy = {
        nome: nomeMotoboy,
        valor: valorDinheiro,
        hora: time.getHours(),
        minutos: time.getMinutes(),
    }

    if(localStorage.getItem('patio2') === null) {
        var motoboys = [];
        motoboys.push(motoboy);
        localStorage.setItem('patio2', JSON.stringify(motoboys));
    }else{
        var motoboys = JSON.parse(localStorage.getItem('patio2'));
        motoboys.push(motoboy);
        localStorage.setItem('patio2', JSON.stringify(motoboys));
    }

    mostraPatio();

    e.preventDefault();
}

function apagarMotoboy(valor){
    var motoboys = JSON.parse(localStorage.getItem('patio2'));

    for(var i = 0; i < motoboys.length; i++){
        if(motoboys[i].valor == valor){
            motoboys.splice(i, 1);
        }
        localStorage.setItem('patio2', JSON.stringify(motoboys));
    }

    document.getElementById('formulario').reset();

    mostraPatio();
}

function mostraPatio(){
    var motoboys = JSON.parse(localStorage.getItem('patio2'));
    var motoboysResultado = document.getElementById('resultados');

    motoboysResultado.innerHTML = '';

    for(var i = 0; i < motoboys.length; i++){
        var nome = motoboys[i].nome;
        var valor  = motoboys[i].valor;
        var hora = motoboys[i].hora;
        var minutos = motoboys[i].minutos;

        var hora = hora < 10 ? "0" + hora : hora;
        var minutos = minutos < 10 ? "0" + minutos : minutos;

        motoboysResultado.innerHTML += '<tr><td>' + nome + '</td><td>' + valor + '</td><td>' + hora + ':' + minutos + '</td><td><button class="btn btn-danger" onclick="apagarMotoboy(\'' + valor + '\')">OK</button></td>' + '</tr>'; 
    }
}