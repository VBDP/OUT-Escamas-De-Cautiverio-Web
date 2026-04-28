var URL_BASE = 'https://phpstack-1076337-5399863.cloudwaysapps.com';
var MI_TOKEN = 'nL3ggwGvsiYZ5vzCqhAL58WnDcZgB9ad7FtDv82oaAAYa36UoJPS35sIbR9F';

function obtenerRanking(cuantos) {
    var url = URL_BASE + '/api/classification/' + MI_TOKEN;
    
    if (cuantos != null) {
        url = url + '/' + cuantos;
    }
    
    return fetch(url)
        .then(function(respuesta) {
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                alert("Error de conexión con la API del ranking. Código: " + respuesta.status);
                throw new Error("La API ha devuelto un error");
            }
        })
        .then(function(datos) {
            if (datos == null) {
                return [];
            }

            if (datos.data != null) {
                return datos.data;
            } else {
                return datos;
            }
        })
        .catch(function(error) {
            return [];
        });
}

function obtenerPosts() {
    var url = URL_BASE + '/api/posts/' + MI_TOKEN;
    
    return fetch(url)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            if (datos.data) {
                return datos.data;
            } else {
                return datos;
            }
        });
}

function obtenerComentarios() {
    var url = URL_BASE + '/api/comments/' + MI_TOKEN;
    
    return fetch(url)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            if (datos.data) {
                return datos.data;
            } else {
                return datos;
            }
        });
}

function enviarComentario(nombre, contenido) {
    var url = URL_BASE + '/api/comments';
    
    var misDatos = {
        api_token: MI_TOKEN,
        name: nombre,
        content: contenido
       
    };
    

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(misDatos)
    })
    .then(function(respuesta) {
        return respuesta.json();
    });
}

function enviarMensajeContacto(nombre, email, asunto, mensaje) {
    var url = URL_BASE + '/api/contact';
    
    var misDatos = {
        api_token: MI_TOKEN,
        nombre: nombre,
        email: email,
        asunto: asunto,
        mensaje: mensaje
    };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(misDatos)
    })
    .then(function(respuesta) {
        return respuesta.json();
    });
}

window.obtenerRanking = obtenerRanking;
window.obtenerPosts = obtenerPosts;
window.obtenerComentarios = obtenerComentarios;
window.enviarComentario = enviarComentario;
window.enviarMensajeContacto = enviarMensajeContacto;
