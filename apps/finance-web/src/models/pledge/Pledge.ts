export interface Pledge {
  clientId: number,
  id: number,
  title: string,
  ageOfPledger: string,
  location: string,
  amountOfPrepayment: string,
  typeOfBuilt: string,
  yearOfBuilt: string,
  countryOfManufacture: string,
  typeOfVehicle: string,
  yearOfRelease: string,
  typeOfPledge: string,
  wallMaterial: string,
}

export enum PledgeType {
  VEHICLE = 'auto',
  PROPERTY = 'realEstate',
}
