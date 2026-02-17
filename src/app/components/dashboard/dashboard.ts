import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WalletService } from '../../service/wallet';

interface Certificate {
  tokenId: string;
  studentName: string;
  degree: string;
  institution: string;
  dateIssued: string;
  imageUrl: string;
  ownerAddress: string;
  transactionHash: string;
  ipfsHash: string;
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

  private demoCertificates: Certificate[] = [
    {
      tokenId: '1',
      studentName: 'Alex Johnson',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Massachusetts Institute of Technology',
      dateIssued: '2025-05-15',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
      ownerAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f8bE2C',
      transactionHash: '0x8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e',
      ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG'
    },
    {
      tokenId: '2',
      studentName: 'Alex Johnson',
      degree: 'Master of Business Administration',
      institution: 'Stanford Graduate School of Business',
      dateIssued: '2024-12-20',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop',
      ownerAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f8bE2C',
      transactionHash: '0x2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c',
      ipfsHash: 'QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V'
    },
    {
      tokenId: '3',
      studentName: 'Alex Johnson',
      degree: 'Doctor of Philosophy in Artificial Intelligence',
      institution: 'Carnegie Mellon University',
      dateIssued: '2025-01-10',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
      ownerAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f8bE2C',
      transactionHash: '0x9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a',
      ipfsHash: 'QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ'
    }
  ];

  constructor(public walletService: WalletService) { }

  ngOnInit() {
    this.checkConnection();
  }

  checkConnection() {
    if (this.walletService.walletAddress) {
      this.isConnected = true;
      this.loadCertificates();
    }
  }

  async connectWallet() {
    await this.walletService.connectWallet();
    if (this.walletService.walletAddress) {
      this.isConnected = true;
      this.loadCertificates();
    }
  }

  async loadCertificates() {
    this.isLoading = true;
    // Simulate fetching from blockchain
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.certificates = this.demoCertificates;
    this.isLoading = false;
  }

  get truncatedAddress(): string {
    const addr = this.walletService.walletAddress;
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(38)}`;
  }

  get uniqueInstitutions(): number {
    return new Set(this.certificates.map(c => c.institution)).size;
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
