export class MeasurementModel {
  id:any
  description: string
  unit_code: string
  units: string


  constructor() {
    this.id = "";
    this.description = "";
    this.unit_code = "";
    this.units = "";
  }
}


export const UNIT_OF_MEASUREMENT: Unit[] = [
  {
    description: "KILOGRAMS",
    code: 'K'
  },
  {
    description: "LITTERS",
    code: 'Ltr'
  }
]


export class Unit {
  description: string;
  code: string
}
