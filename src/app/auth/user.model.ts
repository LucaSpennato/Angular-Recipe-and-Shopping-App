export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  // il get di ts è come una proprietà che si comporta come un metodo nella quale puoi eseguire del codice
  // quando richiami il get, il codice viene eseguito
  // non può essere sovrascritto
  get token() {
    // se la data di scandenza esiste e se il token della data è passata, ritorna null, altrimenti il token
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
