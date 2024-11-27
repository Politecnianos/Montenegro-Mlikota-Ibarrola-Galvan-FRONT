import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/Usuarios/userService.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isDropdownOpen = false;
  activeTab: string = 'inicio'; 
  idAlumno : number = 0;

  constructor(private router: Router, private route : ActivatedRoute, private usuarioService: UserServiceService) {}

  ngOnInit(): void {
    this.getUsuarioDueno();
  }
  
  getUsuarioDueno(): void {
    const mail = localStorage.getItem('mail');
    if (mail) {
      this.usuarioService.getUsuarioDni(mail).subscribe(
        (response) => {
          this.idAlumno = response.dni;
        },
        (error) => {
          console.error("Error al obtener el usuario:", error);
        }
      );
    } else {
      console.error("No se encontró el correo en localStorage.");
    }
  }
 

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('window:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;

    if (!target.closest('.dropdown-container')) {
      this.isDropdownOpen = false;
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('mail')
    this.router.navigateByUrl('/login')
  }
}


  


