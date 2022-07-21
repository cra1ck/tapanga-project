function post_position() {
    const ball = document.getElementById('ball');
    var posY = ball.style.left;
    var posY = ball.style.left;
    console.log(posY);
    var pos = `pos=${posY}`;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('pos').innerHTML = this.responseText;
        }
    };
    xhttp.open('POST', 'position', true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(pos);
}