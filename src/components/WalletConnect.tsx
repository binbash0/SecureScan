import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from "lucide-react";
import { walletUtils, WalletState, SUPPORTED_WALLETS, WalletConnectionError } from "../utils/walletConnection";
import { toast } from "sonner@2.0.3";

interface WalletConnectProps {
  onWalletStateChange?: (walletState: WalletState) => void;
}

export function WalletConnect({ onWalletStateChange }: WalletConnectProps) {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    balance: null
  });
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check initial wallet state
    const checkInitialState = async () => {
      const state = await walletUtils.getCurrentWalletState();
      setWalletState(state);
      onWalletStateChange?.(state);
    };

    checkInitialState();

    // Setup event listeners for account/chain changes
    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected
        const newState: WalletState = {
          isConnected: false,
          address: null,
          chainId: null,
          balance: null
        };
        setWalletState(newState);
        onWalletStateChange?.(newState);
        toast.info("Wallet disconnected");
      } else {
        // Account changed
        const state = await walletUtils.getCurrentWalletState();
        setWalletState(state);
        onWalletStateChange?.(state);
        toast.success("Account changed");
      }
    };

    const handleChainChanged = async (chainId: string) => {
      const state = await walletUtils.getCurrentWalletState();
      setWalletState(state);
      onWalletStateChange?.(state);
      toast.info(`Network changed to chain ID: ${parseInt(chainId, 16)}`);
    };

    walletUtils.setupEventListeners(handleAccountsChanged, handleChainChanged);

    return () => {
      walletUtils.removeEventListeners(handleAccountsChanged, handleChainChanged);
    };
  }, [onWalletStateChange]);

  const handleConnect = async (walletId: string) => {
    setIsConnecting(true);
    try {
      const state = await walletUtils.connectWallet(walletId);
      setWalletState(state);
      onWalletStateChange?.(state);
      toast.success(`Connected to ${SUPPORTED_WALLETS.find(w => w.id === walletId)?.name}`);
    } catch (error) {
      if (error instanceof WalletConnectionError) {
        if (error.code === 'METAMASK_NOT_INSTALLED') {
          toast.error("MetaMask not installed", {
            description: "Please install MetaMask from metamask.io",
            action: {
              label: "Install",
              onClick: () => window.open('https://metamask.io/download/', '_blank')
            }
          });
        } else {
          toast.error("Connection failed", {
            description: error.message
          });
        }
      } else {
        toast.error("An unexpected error occurred");
        console.error('Wallet connection error:', error);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    const newState: WalletState = {
      isConnected: false,
      address: null,
      chainId: null,
      balance: null
    };
    setWalletState(newState);
    onWalletStateChange?.(newState);
    toast.info("Wallet disconnected locally. To fully disconnect, use your wallet extension.");
  };

  const copyAddress = () => {
    if (walletState.address) {
      navigator.clipboard.writeText(walletState.address);
      toast.success("Address copied to clipboard");
    }
  };

  const openEtherscan = () => {
    if (walletState.address) {
      window.open(`https://etherscan.io/address/${walletState.address}`, '_blank');
    }
  };

  const getNetworkName = (chainId: number | null): string => {
    switch (chainId) {
      case 1: return "Ethereum";
      case 56: return "BSC";
      case 137: return "Polygon";
      case 42161: return "Arbitrum";
      case 10: return "Optimism";
      default: return "Unknown";
    }
  };

  if (!walletState.isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={isConnecting}
            className="bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/50 text-primary"
          >
            <Wallet className="size-3 mr-1" />
            {isConnecting ? "Connecting..." : "Connect Wallet"}
            <ChevronDown className="size-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="p-2 text-sm font-medium text-muted-foreground">
            Choose Wallet
          </div>
          <DropdownMenuSeparator />
          {SUPPORTED_WALLETS.map((wallet) => (
            <DropdownMenuItem
              key={wallet.id}
              onClick={() => handleConnect(wallet.id)}
              disabled={isConnecting}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="text-lg">{wallet.icon}</span>
              <span>{wallet.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/50 text-primary"
        >
          <Wallet className="size-3 mr-1" />
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              {walletUtils.formatAddress(walletState.address!)}
              <ChevronDown className="size-3" />
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">Connected Wallet</span>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {getNetworkName(walletState.chainId)}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Address:</span>
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                {walletUtils.formatAddress(walletState.address!)}
              </code>
            </div>
            
            {walletState.balance && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Balance:</span>
                <span>{walletState.balance} ETH</span>
              </div>
            )}
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
          <Copy className="size-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={openEtherscan} className="cursor-pointer">
          <ExternalLink className="size-4 mr-2" />
          View on Etherscan
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleDisconnect} 
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="size-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}