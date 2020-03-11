export interface User {
  uid: string;
  email: string;
  password: string;
  name: string;
  surname: string;
}

export interface Availabilities {
  yearFrom: string;
  monthFrom: string;
  dayFrom: string;
  yearTo: string;
  monthTo: string;
  dayTo: string;
}

export interface Dates {
  from: string;
  to: string;
}

export interface Movie {
  title: {
    international: string
  }
}
