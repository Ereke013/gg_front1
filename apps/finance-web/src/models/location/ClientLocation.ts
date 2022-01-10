import {LocationInformation} from "@finance-web/models/location/LocationInformation";

export interface ClientLocation {
  region: string,
  cityName: LocationInformation[],
}
