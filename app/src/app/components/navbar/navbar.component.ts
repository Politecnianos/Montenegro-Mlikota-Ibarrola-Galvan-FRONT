import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.idAlumno = parseInt(this.route.snapshot.params['id'], 10);
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


  


