import { Component } from '@angular/core';
import { WalletService } from '../../service/wallet';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  public userAddress: string = '';

  constructor(private walletService: WalletService) {}

  async connect() {
    const address = await this.walletService.connectWallet();
    if (address) {
      this.userAddress = address;
    }
  }
}