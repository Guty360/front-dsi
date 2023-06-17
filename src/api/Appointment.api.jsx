import { format } from 'date-fns';


export class ApiCitas {
    //REGISTRO
    async registerAppointment(data) {
      try {
        const url = `${config.baseApi}/${configApiBackend.appointments}`;
        const params = {
          method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
          headers: {
            // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
            'Content-Type': 'application/json',
          },
          // Este puede variar si es texto plano del body es un stringfy o tambien puede ser formData
          body: JSON.stringify({
            // Parametros a enviar

            startDate: format(data.startDate, 'dd/MM/yyyy HH:mm'),
            endDate: format(data.endDate, 'dd/MM/yyyy HH:mm'),
            name: data.name,
            descripcion: data.descripcion,

            firstName: data.firstName,
            lastName: data.lastName,          
            emailClient: data.emailClient,
      
          }),
        };
        const response = await fetch(url, params);
        const result = await response.json();
  
        if (response.status !== 200) throw result; // Valida la respuesta del back
        return result;
      } catch (error) {
        throw error; // Manejo del error
      }
    }
  
      //SEND EMAIL EVENT
  async sendEmail(data) {
    try {
      const url = `${config.baseApi}/${configApiBackend.sendEmailCalendar}`; // RUTA
      const params = {
        method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Parametros a enviar
          emailClient: data.emailClient,
          
        }),
      };
      // Fetch funcion que genera la peticion al back con la URL(a donde debe ir) y params(que parametros envias)
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result; // Valida la respuesta del back

      return result;
    } catch (error) {
      throw error; // Manejo del error
    }
  }

   // GUARDA ACCESSTOKEN EN LOCALSTORAGE
   setAccessToken(token) {
    localStorage.setItem(configJwt.access, token);
  }
  // RECUPERACIÓN DE ACCESSTOKEN EN LOCALSTORAGE
  getAccessToken() {
    return localStorage.getItem(configJwt.access);
  }

// ELIMINAR TOKENS DE LOCALSTORAGE
removeTokens() {
  localStorage.removeItem(configJwt.access);
}


  }
  