/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}


export interface WeatherInfo {
  weatherinfo: {
    city: string;
    cityid: string;
    temp: string;
    WD: string;
    WS: string;
    SD: string;
    Ap: string;
    njd: string;
    WSE: string;
    time: string;
    sm: string;
    isRadar: string;
    Rader: string;
  }
}