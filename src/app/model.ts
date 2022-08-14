export interface User {
  id: number,
  username: string,
  password: string,
  name: string,
  surname: string,
  permissions: Permission[]
}

export interface Permission {
  id: number,
  name: string
}

export interface JWT {
  jwt: string
}


export interface Machine {
  id: number,
  name: string,
  status: string,
  active: boolean,
  creator: string,
  dateFrom: Date
}


export interface ErrorMessage {
  id: number,
  date: Date,
  machine_id: number,
  scheduledAction: string,
  message: string
}
