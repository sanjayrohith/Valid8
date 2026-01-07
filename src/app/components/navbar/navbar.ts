import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WalletService } from '../../service/wallet';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(public walletService: WalletService) {}

  async connectWallet() {
    await this.walletService.connectWallet();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  get truncatedAddress(): string {
    const addr = this.walletService.walletAddress;
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(38)}`;
  }
}
