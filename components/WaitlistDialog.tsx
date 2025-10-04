'use client';

import { useState, useEffect, useRef } from 'react';
import { useSignMessage } from 'wagmi';
import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { toast } from 'sonner';
import JSConfetti from 'js-confetti';
import {
  Dialog,
  DialogPopup,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/animate-ui/components/base/dialog';
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
  const { open: openModal } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldReopenAfterLogin = useRef(false);
  const confettiRef = useRef<JSConfetti | null>(null);

  // Initialize confetti
  useEffect(() => {
    confettiRef.current = new JSConfetti();
  }, []);

  // Get wallet address
  const walletAddress = address || '';

  // Reopen dialog after successful wallet connection
  useEffect(() => {
    if (walletAddress && shouldReopenAfterLogin.current) {
      shouldReopenAfterLogin.current = false;
      onOpenChange(true);
    }
  }, [walletAddress, onOpenChange]);

  const handleConnectWallet = async () => {
    // Mark that we should reopen after login
    shouldReopenAfterLogin.current = true;
    // Close the dialog before opening wallet modal
    onOpenChange(false);
    openModal();
  };

  const handleDisconnectWallet = async () => {
    disconnect();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletAddress) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a message for the user to sign
      const timestamp = Date.now();
      const message = `Sign this message to join the Tangerine waitlist.\n\nWallet: ${walletAddress}\nTimestamp: ${timestamp}`;

      // Request signature from user
      let signature: string;
      try {
        signature = await signMessageAsync({ message });
      } catch (signError) {
        console.error('Signature error:', signError);
        toast.error('Signature rejected. Please sign the message to continue.');
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
          message,
          signature,
          timestamp,
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

      // Trigger confetti with tangerine emojis
      confettiRef.current?.addConfetti({
        emojis: ['🍊'],
        emojiSize: 100,
        confettiNumber: 50,
      });

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
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
        />
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
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Join the Waitlist</DialogTitle>
          <DialogDescription>
            Connect your wallet to join the waitlist.
          </DialogDescription>
        </DialogHeader>
        {formContent}
      </DialogPopup>
    </Dialog>
  );
}
