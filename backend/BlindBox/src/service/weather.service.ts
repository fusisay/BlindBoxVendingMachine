import { makeHttpRequest, Provide } from "@midwayjs/core";
import { WeatherInfo } from "../interface";


@Provide()
export class WeatherService {
  async getWeather(cityId: string):Promise<WeatherInfo> {
    const result = await makeHttpRequest(`https://midwayjs.org/resource/${cityId}.json`,{
        dataType: 'json',
    });

    if (result.status === 200) {
        return result.data as WeatherInfo;
    }
  }
}