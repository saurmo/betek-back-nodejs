
import axios from 'axios'

export class Reportes {


    async consultarReporteProductos() {

        // Url del microservicio de reportes
        const url = 'http://localhost:3001/api/v1/reportes/productos'
        const response = await axios.get(url)
        return response.data

    }


}
