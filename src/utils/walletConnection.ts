export interface WalletInfo {
  name: string;
  icon: string;
  id: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
}

export const SUPPORTED_WALLETS: WalletInfo[] = [
  {
    name: "MetaMask",
    icon: "🦊",
    id: "metamask"
  },
  {
    name: "WalletConnect",
    icon: "🔗", 
    id: "walletconnect"
  },
  {
    name: "Coinbase Wallet",
    icon: "🔵",
    id: "coinbase"
  }
];

declare global {
  interface Window {
    ethereum?: any;
  }
}

export class WalletConnectionError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'WalletConnectionError';
  }
}

export const walletUtils = {
  // Check if MetaMask is installed
  isMetaMaskInstalled(): boolean {
    return typeof window !== 'undefined' && Boolean(window.ethereum?.isMetaMask);
  },

  // Get current wallet state
  async getCurrentWalletState(): Promise<WalletState> {
    if (!this.isMetaMaskInstalled()) {
      return {
        isConnected: false,
        address: null,
        chainId: null,
        balance: null
      };
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      if (accounts.length > 0) {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });

        return {
          isConnected: true,
          address: accounts[0],
          chainId: parseInt(chainId, 16),
          balance: this.formatBalance(balance)
        };
      }

      return {
        isConnected: false,
        address: null,
        chainId: null,
        balance: null
      };
    } catch (error) {
      console.error('Error getting wallet state:', error);
      return {
        isConnected: false,
        address: null,
        chainId: null,
        balance: null
      };
    }
  },

  // Connect to MetaMask
  async connectMetaMask(): Promise<WalletState> {
    if (!this.isMetaMaskInstalled()) {
      throw new WalletConnectionError(
        'MetaMask is not installed. Please install MetaMask to continue.',
        'METAMASK_NOT_INSTALLED'
      );
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new WalletConnectionError('No accounts found in MetaMask');
      }

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest']
      });

      return {
        isConnected: true,
        address: accounts[0],
        chainId: parseInt(chainId, 16),
        balance: this.formatBalance(balance)
      };
    } catch (error: any) {
      if (error.code === 4001) {
        throw new WalletConnectionError('User rejected the connection request');
      }
      throw new WalletConnectionError(`Failed to connect to MetaMask: ${error.message}`);
    }
  },

  // Connect to WalletConnect (mock implementation)
  async connectWalletConnect(): Promise<WalletState> {
    // Mock implementation for demonstration
    throw new WalletConnectionError('WalletConnect integration coming soon!');
  },

  // Connect to Coinbase Wallet (mock implementation)
  async connectCoinbaseWallet(): Promise<WalletState> {
    // Mock implementation for demonstration
    throw new WalletConnectionError('Coinbase Wallet integration coming soon!');
  },

  // Generic connect method
  async connectWallet(walletId: string): Promise<WalletState> {
    switch (walletId) {
      case 'metamask':
        return this.connectMetaMask();
      case 'walletconnect':
        return this.connectWalletConnect();
      case 'coinbase':
        return this.connectCoinbaseWallet();
      default:
        throw new WalletConnectionError(`Unsupported wallet: ${walletId}`);
    }
  },

  // Disconnect wallet
  async disconnectWallet(): Promise<void> {
    // For MetaMask, we can't programmatically disconnect
    // The user needs to disconnect from the MetaMask UI
    // We'll just clear our local state
  },

  // Format balance from wei to ETH
  formatBalance(balanceWei: string): string {
    const balanceInEth = parseInt(balanceWei, 16) / Math.pow(10, 18);
    return balanceInEth.toFixed(4);
  },

  // Format address for display
  formatAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  },

  // Setup event listeners for account/chain changes
  setupEventListeners(
    onAccountsChanged: (accounts: string[]) => void,
    onChainChanged: (chainId: string) => void
  ) {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', onAccountsChanged);
      window.ethereum.on('chainChanged', onChainChanged);
    }
  },

  // Remove event listeners
  removeEventListeners(
    onAccountsChanged: (accounts: string[]) => void,
    onChainChanged: (chainId: string) => void
  ) {
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', onAccountsChanged);
      window.ethereum.removeListener('chainChanged', onChainChanged);
    }
  }
};