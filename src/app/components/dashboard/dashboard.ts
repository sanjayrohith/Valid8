import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WalletService } from '../../service/wallet';

export interface Certificate {
  tokenId: string;
  name: string;
  degree: string;
  institution: string;
  dateIssued: string;
  imageUrl: string;
  transactionHash: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  certificates: Certificate[] = [];
  isLoading = false;
  isConnected = false;

  // Demo certificates for UI showcase
  demoCertificates: Certificate[] = [
    {
      tokenId: '1',
      name: 'Alex Johnson',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Massachusetts Institute of Technology',
      dateIssued: '2025-05-15',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
      transactionHash: '0x8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d'
    },
    {
      tokenId: '2',
      name: 'Alex Johnson',
      degree: 'Master of Business Administration',
      institution: 'Stanford Graduate School of Business',
      dateIssued: '2024-12-20',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
      transactionHash: '0x2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a'
    },
    {
      tokenId: '3',
      name: 'Alex Johnson',
      degree: 'Professional Certificate in Blockchain Development',
      institution: 'Ethereum Foundation',
      dateIssued: '2025-01-10',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
      transactionHash: '0x9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f'
    }
  ];

  constructor(public walletService: WalletService) {}

  ngOnInit() {
    this.checkConnection();
  }

  async checkConnection() {
    if (this.walletService.walletAddress) {
      this.isConnected = true;
      await this.loadCertificates();
    }
  }

  async connectWallet() {
    this.isLoading = true;
    const address = await this.walletService.connectWallet();
    if (address) {
      this.isConnected = true;
      await this.loadCertificates();
    }
    this.isLoading = false;
  }

  async loadCertificates() {
    this.isLoading = true;
    
    // Simulate API call - In production, this will fetch from the blockchain
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Load demo certificates for showcase
    this.certificates = this.demoCertificates;
    this.isLoading = false;
  }

  get truncatedAddress(): string {
    const addr = this.walletService.walletAddress;
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(38)}`;
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  truncateHash(hash: string): string {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
  }
}
