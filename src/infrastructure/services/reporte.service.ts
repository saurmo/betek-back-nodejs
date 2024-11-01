
import axios from 'axios'
import config from 'config'
export class Reportes {


    async consultarReporteProductos(filters: { limit: number, search?:string }) {
        // Url del microservicio de reportes
        let url = config.get<string>('REPORT_SERVICE.URL')
        url = `${url}?limit=${filters.limit}`
        if (filters.search) {
            url = `${url}&search=${filters.search}`
        }
        const response = await axios.get(url)
        const data = response.data
        return data?.info
    }


}
