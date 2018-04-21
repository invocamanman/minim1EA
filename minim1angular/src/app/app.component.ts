import {Component, Output, EventEmitter} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserService} from './service/user.service';
import {User} from './models/user.model';




interface Result
{
  result:string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  showLogin: Boolean;
  showResto:Boolean;
  showRegister:Boolean;
  showuser: Boolean;
  Nombres: any;
  filter: String;
  resultadologin: String;
  userlist: User[];
  showlist:Boolean;
  userdetalle: User;
  resultadoRegister: String;
  showlogout:Boolean;
  mensajebloq:String;
  mensajemodify:String;
  @Output() users = new EventEmitter<Set<User>>();

  constructor(private userService: UserService) {
    this.showLogin = true;
    this.showResto = false;
    this.resultadologin="";
    this.showRegister=true;
    this.showlist = true;
    this.showuser = true;
    this.mensajebloq=" ";

  }


  login(username, password) {
    //const body = { name: username.value, password: password.value };
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json'}) };
    //this.http.post<Result>('http://localhost:3000/users/login', body, httpOptions).subscribe(
    this.userService.signIn$(username, password).subscribe(
    //this.http.post<Result>('http://localhost:3000/users/login', ({name: username.value, password: password.value})).subscribe(
      data => {
        console.log(data);
        if (data.result == '0') {
          this.resultadologin= 'Login fail';
        } else
        {
          if(data.result == '3') {
          this.resultadologin='estas bloqueado'
        }
        else{
            this.resultadologin= 'Bienvenido '+ username;
            this.showRegister=false;
            this.showLogin=false;
            this.showlogout=true;
            this.showResto= true;
            this.userdetalle.name="1";
            this.userdetalle.role="1";
            this.userdetalle.surname="1";
          }
        }
      } );
  }
  Register(username, password, surname, role) {
    this.userService.Register$(username,password,surname,role).subscribe(
      data => {
        console.log(data);
        this.resultadoRegister = 'te has registrado correctamente!';
      }

      );
  }
  Buscarnombre(name){
    this.userService.filtrarpornombre$(name).subscribe(
      data => {
        console.log(data);
        this.userlist = data;
      }
    );
  }
  Buscarsurname(surname){
    this.userService.filtrarporsurname$(surname).subscribe(
      data => {
        console.log(data);
        this.userlist = data;
      }
    );
  }
  Buscarrol(rol){
    this.userService.filtrarporrol$(rol).subscribe(
      data => {
        console.log(data);
        this.userlist = data;
      }
    );
  }
  Buscastate(state){
    this.userService.filtrarporstate(state).subscribe(
      data => {
        console.log(data);
        this.userlist = data;
      }
    );
  }
  Buscaralfabetico(name){
    this.userService.nombrealfabetico$().subscribe(
      data => {
        console.log(data);
        this.userlist = data;
      }
    );
  }
  Buscarporid(id){
    this.userService.usuariodetalle$(id).subscribe(
      data => {
        console.log(data);
        this.userdetalle = data;
        this.userdetalle._id=id;
      }
    );

  }
  Modificar(name, surname, rol){
    if(name=="")
      name=this.userdetalle.name;
    if(surname=="")
      surname=this.userdetalle.surname;
    if(rol=="")
      rol=this.userdetalle.role;
  this.userService.Modify$(name,surname,rol,this.userdetalle._id).subscribe(
    data => {
        console.log(data);
        if ( data.result =='0'){
          this.mensajemodify="NO se ha modificado!";
          this.userdetalle = null;
        }
        else
        {
          this.mensajemodify="se ha modificado!";
          this.Buscarporid(this.userdetalle._id);
        }

     }
    );
  }

  Bloquearporid(id) {
    this.userService.usuariodetalle$(id).subscribe(
      data => {
        this.mensajebloq ='te has registrado correctamente!';
        console.log(data);

      }
    );
  }



  logout(){
    this.showRegister=true;
    this.showLogin=true;
    this.showlogout=false;
    this.showResto=false;
    this.resultadologin="";
    this.resultadoRegister="";
  }




}

