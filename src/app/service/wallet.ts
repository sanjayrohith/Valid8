import { Injectable } from '@angular/core';
import { BrowserProvider } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  public walletAddress: string = '';
  private provider: BrowserProvider | null = null;

  constructor() { }

  // 1. Check if MetaMask is installed
  checkWalletConnection = async () => {
    // @ts-ignore (Ethereum is injected by MetaMask into the window object)
    if (window.ethereum) {
      // Create a new Ethers provider connected to the browser wallet
      // @ts-ignore
      this.provider = new BrowserProvider(window.ethereum);
      return true;
    } else {
      console.error("MetaMask not found!");
      return false;
    }
  }

  // 2. Connect to Wallet
  connectWallet = async () => {
    if (await this.checkWalletConnection() && this.provider) {
      try {
        // Request account access
        const accounts = await this.provider.send("eth_requestAccounts", []);
        this.walletAddress = accounts[0]; // The first account is the active one
        console.log("Connected:", this.walletAddress);
        return this.walletAddress;
      } catch (error) {
        console.error("User rejected connection", error);
        return null;
      }
    } else {
      alert("Please install MetaMask!");
      return null;
    }
  }
}