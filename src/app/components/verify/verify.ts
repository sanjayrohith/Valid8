import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../../service/wallet';

interface VerificationResult {
  isValid: boolean;
  tokenId: string;
  studentName: string;
  degree: string;
  institution: string;
  dateIssued: string;
  ownerAddress: string;
  imageUrl: string;
  transactionHash: string;
  ipfsHash: string;
}

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verify.html',
  styleUrls: ['./verify.css']
})
export class VerifyComponent {
  searchQuery = '';
  searchType: 'tokenId' | 'wallet' = 'tokenId';
  isSearching = false;
  hasSearched = false;
  verificationResult: VerificationResult | null = null;
  errorMessage = '';

  // Demo data for showcase
  demoResults: Record<string, VerificationResult> = {
    '1': {
      isValid: true,
      tokenId: '1',
      studentName: 'Alex Johnson',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Massachusetts Institute of Technology',
      dateIssued: '2025-05-15',
      ownerAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f8bE2C',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
      transactionHash: '0x8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d',
      ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG'
    },
    '2': {
      isValid: true,
      tokenId: '2',
      studentName: 'Maria Garcia',
      degree: 'Master of Business Administration',
      institution: 'Stanford Graduate School of Business',
      dateIssued: '2024-12-20',
      ownerAddress: '0x8Ba1f109551bD432803012645Ac136ddd64DBA72',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop',
      transactionHash: '0x2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a',
      ipfsHash: 'QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V'
    },
    '3': {
      isValid: true,
      tokenId: '3',
      studentName: 'James Chen',
      degree: 'Doctor of Philosophy in Artificial Intelligence',
      institution: 'Carnegie Mellon University',
      dateIssued: '2025-01-10',
      ownerAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
      transactionHash: '0x9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f',
      ipfsHash: 'QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ'
    }
  };

  constructor(public walletService: WalletService) {}

  async search() {
    if (!this.searchQuery.trim()) {
      this.errorMessage = 'Please enter a Token ID or Wallet Address';
      return;
    }

    this.isSearching = true;
    this.hasSearched = false;
    this.verificationResult = null;
    this.errorMessage = '';

    // Simulate blockchain query
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check demo data
    if (this.searchType === 'tokenId') {
      this.verificationResult = this.demoResults[this.searchQuery] || null;
    } else {
      // Search by wallet address - find first matching certificate
      const result = Object.values(this.demoResults).find(
        r => r.ownerAddress.toLowerCase() === this.searchQuery.toLowerCase()
      );
      this.verificationResult = result || null;
    }

    if (!this.verificationResult) {
      this.errorMessage = this.searchType === 'tokenId' 
        ? 'No certificate found with this Token ID' 
        : 'No certificates found for this wallet address';
    }

    this.isSearching = false;
    this.hasSearched = true;
  }

  clearSearch() {
    this.searchQuery = '';
    this.hasSearched = false;
    this.verificationResult = null;
    this.errorMessage = '';
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  truncateAddress(address: string): string {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  truncateHash(hash: string): string {
    return `${hash.substring(0, 14)}...${hash.substring(hash.length - 10)}`;
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  }
}
