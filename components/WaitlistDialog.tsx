'use client';

import { useState, useEffect, useRef } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useIsMobile } from '@/hooks/useIsMobile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  const isMobile = useIsMobile();
  const { login, logout, user } = usePrivy();
  const [email, setEmail] = useState('');
  const shouldReopenAfterLogin = useRef(false);

  // Get wallet address and email from Privy user
  const walletAddress = user?.wallet?.address || '';
  const userEmail = user?.email?.address || '';

  // Auto-fill email if user is authenticated via email
  useEffect(() => {
    if (userEmail && !email) {
      setEmail(userEmail);
    }
  }, [userEmail, email]);

  // Reopen dialog after successful login
  useEffect(() => {
    if (walletAddress && shouldReopenAfterLogin.current) {
      shouldReopenAfterLogin.current = false;
      onOpenChange(true);
    }
  }, [walletAddress, onOpenChange]);

  const handleConnectWallet = async () => {
    // Close the dialog before opening Privy login
    onOpenChange(false);
    login();
  };

  const handleDisconnectWallet = async () => {
    await logout();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) {
      alert('Please connect your wallet first');
      return;
    }
    // Handle form submission here
    console.log({ address: walletAddress, email });
    // Reset form and close dialog
    setEmail('');
    onOpenChange(false);
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="address">Wallet Address</Label>
        <div className="space-y-2">
          <Input
            id="address"
            type="text"
            value={walletAddress}
            disabled
            placeholder="Connect wallet to detect address"
            className="bg-muted"
          />
          {walletAddress ? (
            <Button
              type="button"
              onClick={handleDisconnectWallet}
              className="w-full"
              variant="outline"
            >
              Disconnect Wallet
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleConnectWallet}
              className="w-full"
              variant="outline"
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-muted-foreground">(optional)</span>
        </Label>
        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={!!userEmail}
            className={userEmail ? 'bg-muted' : ''}
          />
          {userEmail && (
            <Button
              type="button"
              onClick={handleDisconnectWallet}
              className="w-full"
              variant="outline"
            >
              Logout
            </Button>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={!walletAddress}>
        Join Waitlist
      </Button>
    </form>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Join the Waitlist</DrawerTitle>
            <DrawerDescription>
              Connect your wallet to join the
              waitlist.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-8">
            {formContent}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Join the Waitlist</DialogTitle>
          <DialogDescription>
            Connect your wallet to join the
            waitlist.
          </DialogDescription>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}
