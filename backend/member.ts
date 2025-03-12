//JSON Daten, Backend antwortet mit dem und durch API wird es zurückgegeben, damit es im Frontend angezeigt werden kann
export interface Member {
    _id: string; 
    forename: string;
    surname: string;
    email: string;
    password?: string; //optional, da es nicht im Frontend anzgezeigt werden soll
  }
  