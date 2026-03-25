const API_BASE_URL = 'https://phpstack-1076337-5399863.cloudwaysapps.com';
const API_TOKEN = 'nL3ggwGvsiYZ5vzCqhAL58WnDcZgB9ad7FtDv82oaAAYa36UoJPS35sIbR9F';
// API token de proves: pHJNhm719MN5LCVqE839lOse0qvlbL1lBXndZmAWoJfiPXZFQHmgNQrzUHYS

class ApiService {
    /**
     * 1. Consultar es rànquing
     * @param {number} top - Opcional, nombre de resultats a  retornar
     * @returns {Promise<Array>} llista d'objectes amb name i puntuacion
     */
    static async getRanking(top = null) {
        let url = `${API_BASE_URL}/api/classification/${API_TOKEN}`;
        if (top !== null) {
            url += `/${top}`;
        }
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al obtenir el rànquing');
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error('Error in getRanking:', error);
            throw error;
        }
    }

    /**
     * 2. Llistar es posts
     * @returns {Promise<Array>} llista de posts
     */
    static async getPosts() {
        const url = `${API_BASE_URL}/api/posts/${API_TOKEN}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al obtenir els posts');
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error('Error in getPosts:', error);
            throw error;
        }
    }

    /**
     * Llistar  es comentaris
     * @returns {Promise<Array>} llista de comentaris
     */
    static async getComments() {
        const url = `${API_BASE_URL}/api/comments/${API_TOKEN}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al obtenir els comentaris');
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error('Error in getComments:', error);
            throw error;
        }
    }

    /**
     * Publicar un comentari
     * @param {string} name - Nom de s'autor
     * @param {string} content - contingut des comentari
     * @returns {Promise<Object>} Sa resposta de s'API
     */
    static async postComment(name, content) {
        const url = `${API_BASE_URL}/api/comments`;
        const data = {
            api_token: API_TOKEN,
            name: name,
            content: content
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Error al publicar el comentari');
            return await response.json();
        } catch (error) {
            console.error('Error in postComment:', error);
            throw error;
        }
    }

    /**
     * 3. El meu contacte i missatgeria
     * @param {string} nombre - Nom des remitent
     * @param {string} email - correu electrònic
     * @param {string} asunto - assumpte
     * @param {string} mensaje - missatge
     * @returns {Promise<Object>} Sa resposta de s'API
     */
    static async sendContactMessage(nombre, email, asunto, mensaje) {
        const url = `${API_BASE_URL}/api/contact`;
        const data = {
            api_token: API_TOKEN,
            nombre: nombre,
            email: email,
            asunto: asunto,
            mensaje: mensaje
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Error al enviar el missatge de contacte');
            return await response.json();
        } catch (error) {
            console.error('Error in sendContactMessage:', error);
            throw error;
        }
    }
}

// exportar per usar-ho a mòduls, o ho deix disponible globalment
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = ApiService;
} else {
    window.ApiService = ApiService;
}
