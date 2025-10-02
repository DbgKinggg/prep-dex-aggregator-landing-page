'use client';

import { useState, useEffect, useRef } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useIsMobile } from '@/hooks/useIsMobile';
import { toast } from 'sonner';
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
import { Loader2 } from 'lucide-react';

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  const isMobile = useIsMobile();
  const { login, logout, user, getAccessToken } = usePrivy();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    // Mark that we should reopen after login
    shouldReopenAfterLogin.current = true;
    // Close the dialog before opening Privy login
    onOpenChange(false);
    login();
  };

  const handleDisconnectWallet = async () => {
    await logout();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletAddress) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get Privy access token for authentication
      const privyToken = await getAccessToken();

      if (!privyToken) {
        toast.error('Authentication failed. Please try logging in again.');
        setIsSubmitting(false);
        return;
      }

      // Submit to API
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress,
          email: email || undefined,
          privyToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast.warning('This wallet address is already registered on the waitlist.');
        } else {
          toast.error(data.error || 'Failed to join waitlist. Please try again.');
        }
        return;
      }

      // Success
      toast.success('Successfully joined the waitlist!');
      setEmail('');
      onOpenChange(false);
    } catch (error) {
      console.error('Waitlist submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
              className="w-full cursor-pointer"
              variant="outline"
            >
              Disconnect Wallet
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleConnectWallet}
              className="w-full cursor-pointer"
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
              className="w-full cursor-pointer"
              variant="outline"
            >
              Logout
            </Button>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={!walletAddress || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Join Waitlist'
        )}
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
