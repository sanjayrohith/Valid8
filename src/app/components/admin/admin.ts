import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WalletService } from '../../service/wallet';

interface MintedCertificate {
  tokenId: string;
  studentName: string;
  degree: string;
  institution: string;
  dateIssued: string;
  transactionHash: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent {
  // Wallet
  isOwner = true;

  // Form fields
  studentName = '';
  studentWallet = '';
  degree = '';
  institution = '';
  dateIssued = '';

  // Upload
  imagePreview: string | null = null;
  isDragActive = false;

  // Minting
  isMinting = false;
  mintSuccess = false;
  mintError = '';
  mintStep = 1;
  mintingStatus = 'Preparing...';

  // Recent Mints
  recentMints: MintedCertificate[] = [
    {
      tokenId: '3',
      studentName: 'James Chen',
      degree: 'PhD in Artificial Intelligence',
      institution: 'Carnegie Mellon University',
      dateIssued: '2025-01-10',
      transactionHash: '0x9e8f7d3c...1a9e8f7d'
    },
    {
      tokenId: '2',
      studentName: 'Maria Garcia',
      degree: 'MBA',
      institution: 'Stanford Business School',
      dateIssued: '2024-12-20',
      transactionHash: '0x2b1a9e8f...7d3c2b1a'
    }
  ];

  constructor(public walletService: WalletService) { }

  async connectWallet() {
    await this.walletService.connectWallet();
  }

  isFormValid(): boolean {
    return !!(this.studentName.trim() && this.studentWallet.trim() &&
      this.degree.trim() && this.institution.trim() && this.dateIssued);
  }

  async mintCertificate() {
    if (!this.isFormValid()) return;

    this.isMinting = true;
    this.mintSuccess = false;
    this.mintError = '';
    this.mintStep = 1;

    try {
      // Step 1: Prepare
      this.mintingStatus = 'Preparing metadata...';
      await this.delay(800);
      this.mintStep = 2;

      // Step 2: Upload to IPFS
      this.mintingStatus = 'Uploading to IPFS...';
      await this.delay(1200);
      this.mintStep = 3;

      // Step 3: Mint on blockchain
      this.mintingStatus = 'Minting on blockchain...';
      await this.delay(1500);

      // Generate mock data
      const newTokenId = (this.recentMints.length + 1).toString();
      const newMint: MintedCertificate = {
        tokenId: newTokenId,
        studentName: this.studentName,
        degree: this.degree,
        institution: this.institution,
        dateIssued: this.dateIssued,
        transactionHash: `0x${this.randomHex(16)}...${this.randomHex(8)}`
      };

      this.recentMints.unshift(newMint);
      this.mintSuccess = true;
      this.resetForm();
    } catch (error) {
      this.mintError = 'Failed to mint certificate. Please try again.';
    } finally {
      this.isMinting = false;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private randomHex(length: number): string {
    return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  }

  resetForm() {
    this.studentName = '';
    this.studentWallet = '';
    this.degree = '';
    this.institution = '';
    this.dateIssued = '';
    this.imagePreview = null;
    this.mintStep = 1;
  }

  // File Upload Handling
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragActive = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragActive = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragActive = false;
    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('image/')) {
      this.readFile(file);
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.readFile(file);
    }
  }

  private readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage(event: Event) {
    event.stopPropagation();
    this.imagePreview = null;
  }
}
