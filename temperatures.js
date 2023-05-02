function convert() {
    if (document.getElementById("celsius").value!="") {
        document.getElementById("farenheit").value = document.getElementById("celsius").value*1.8+32
    }
    else if (document.getElementById("farenheit").value!="") {
        document.getElementById("celsius").value = document.getElementById("farenheit").value*1.8+32
    }
    else {
        alert("Veuillez rentrer une valeur.")
    }
}