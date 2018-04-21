import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {result} from '../models/result.model';
import {Observable} from 'rxjs/Observable';


const url = 'http://localhost:3000/users';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  signIn$(username: string, password: string, ): Observable<result> {
    return this.http.post<result>(url + '/login', new User(username, null, password, null, null));
  }

  Register$(username : string, password: string, surname: string, role:string): Observable<result>{
    return this.http.post<result>(url + '/register', new User( username, surname, password, role,null));
  }
  filtrarpornombre$(name:string):Observable<User[]>{
    return this.http.post<User[]>(url+ '/filtranombre', {name: name});
  }
  filtrarporsurname$(surname:string):Observable<User[]>{
    return this.http.post<User[]>(url+ '/filtrasurname', {surname: surname});
  }
  filtrarporrol$(role:string):Observable<User[]>{
    return this.http.post<User[]>(url+ '/filtrarole', {role: role});
  }
  filtrarporstate(state:Boolean):Observable<User[]>{
    return this.http.post<User[]>(url+ '/filtrastate', {state: state});
  }
  nombrealfabetico$():Observable<User[]>{
    return this.http.get<User[]>(url+ '/alfabetico');
  }
  usuariodetalle$(id:number):Observable<User>{
    return this.http.post<User>(url+ '/detalleusuairo', { _id : id} );
  }
  Modify$(name : string,  surname: string, role:string, id:number): Observable<result>{
    return this.http.post<result>(url + '/updateusuario', {name:name, surname:surname, role: role, _id:id});
  }
  usuariobloquear$(id:number):Observable<User>{
    return this.http.post<User>(url+ '/bloquear', { _id : id} );
  }



}
