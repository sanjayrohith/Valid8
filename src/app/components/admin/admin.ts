import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../../service/wallet';

interface MintForm {
  studentName: string;
  studentWallet: string;
  degree: string;
  institution: string;
  dateIssued: string;
  certificateImage: File | null;
}

interface MintedCertificate {
  tokenId: string;
  transactionHash: string;
  ipfsHash: string;
  timestamp: Date;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent {
  isAdmin = false;
  isConnected = false;
  isLoading = false;
  isMinting = false;
  mintSuccess = false;
  mintError = '';
  
  // Contract owner address (for demo - in production this comes from contract)
  readonly contractOwner = '0x742d35Cc6634C0532925a3b844Bc9e7595f8bE2C';

  form: MintForm = {
    studentName: '',
    studentWallet: '',
    degree: '',
    institution: '',
    dateIssued: '',
    certificateImage: null
  };

  imagePreview: string | null = null;
  
  recentMints: MintedCertificate[] = [
    {
      tokenId: '3',
      transactionHash: '0x9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f',
      ipfsHash: 'QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ',
      timestamp: new Date('2025-01-10')
    },
    {
      tokenId: '2',
      transactionHash: '0x2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a',
      ipfsHash: 'QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V',
      timestamp: new Date('2024-12-20')
    },
    {
      tokenId: '1',
      transactionHash: '0x8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d3c2b1a9e8f7d',
      ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
      timestamp: new Date('2024-05-15')
    }
  ];

  constructor(public walletService: WalletService) {}

  async connectWallet() {
    this.isLoading = true;
    const address = await this.walletService.connectWallet();
    if (address) {
      this.isConnected = true;
      this.checkAdmin();
    }
    this.isLoading = false;
  }

  checkAdmin() {
    // In production, this would check if connected wallet is the contract owner
    // For demo, we'll allow any connected wallet to access admin features
    this.isAdmin = true;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.form.certificateImage = input.files[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  removeImage() {
    this.form.certificateImage = null;
    this.imagePreview = null;
  }

  isFormValid(): boolean {
    return !!(
      this.form.studentName.trim() &&
      this.form.studentWallet.trim() &&
      this.form.degree.trim() &&
      this.form.institution.trim() &&
      this.form.dateIssued &&
      this.isValidAddress(this.form.studentWallet)
    );
  }

  isValidAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  async mintCertificate() {
    if (!this.isFormValid()) {
      this.mintError = 'Please fill in all required fields correctly';
      return;
    }

    this.isMinting = true;
    this.mintError = '';
    this.mintSuccess = false;

    try {
      // Simulate minting process
      // Step 1: Upload image to IPFS (simulated)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 2: Upload metadata to IPFS (simulated)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 3: Mint NFT on blockchain (simulated)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add to recent mints
      const newMint: MintedCertificate = {
        tokenId: (this.recentMints.length + 1).toString(),
        transactionHash: '0x' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2),
        ipfsHash: 'Qm' + Math.random().toString(36).slice(2, 15) + Math.random().toString(36).slice(2, 15),
        timestamp: new Date()
      };
      
      this.recentMints.unshift(newMint);
      this.mintSuccess = true;
      this.resetForm();

    } catch (error) {
      this.mintError = 'Failed to mint certificate. Please try again.';
    }

    this.isMinting = false;
  }

  resetForm() {
    this.form = {
      studentName: '',
      studentWallet: '',
      degree: '',
      institution: '',
      dateIssued: '',
      certificateImage: null
    };
    this.imagePreview = null;
  }

  get truncatedAddress(): string {
    const addr = this.walletService.walletAddress;
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(38)}`;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  truncateHash(hash: string): string {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
  }
}
