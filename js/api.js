// Configuració de sa API
var URL_BASE = 'https://phpstack-1076337-5399863.cloudwaysapps.com';
var MI_TOKEN = 'nL3ggwGvsiYZ5vzCqhAL58WnDcZgB9ad7FtDv82oaAAYa36UoJPS35sIbR9F';

// Funció per obtenir es ranking de jugadors
function obtenerRanking(cuantos) {
    var url = URL_BASE + '/api/classification/' + MI_TOKEN;
    
    // Si volem un número específic de resultats
    if (cuantos != null) {
        url = url + '/' + cuantos;
    }
    
    return fetch(url)
        .then(function(respuesta) {
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                console.log("Error en carregar es ranking");
            }
        })
        .then(function(datos) {
            // Tornam ses dades (o sa llista dins data si existeix)
            if (datos.data) {
                return datos.data;
            } else {
                return datos;
            }
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
}

// Funció per obtenir es posts (històries)
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

// Funció per obtenir es comentaris de s'API
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

// Funció per enviar un comentari a sa API
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

// Funció per enviar un missatge de contacte
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

// Deixam ses funcions disponibles globalment
window.obtenerRanking = obtenerRanking;
window.obtenerPosts = obtenerPosts;
window.obtenerComentarios = obtenerComentarios;
window.enviarComentario = enviarComentario;
window.enviarMensajeContacto = enviarMensajeContacto;
