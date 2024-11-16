import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterLink } from '@angular/router';
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
export class NavbarComponent{
  isDropdownOpen = false;
  activeTab: string = 'inicio'; 

  constructor(private router: Router) {}

 

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
    this.router.navigateByUrl('/login')
  }
}


  


