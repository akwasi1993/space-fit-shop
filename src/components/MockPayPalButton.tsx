import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, Lock } from "lucide-react";

interface MockPayPalButtonProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export const MockPayPalButton = ({
  amount,
  onSuccess,
  onError,
  disabled = false,
}: MockPayPalButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<"login" | "processing" | "success">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePayPalClick = () => {
    setShowModal(true);
    setStep("login");
    setEmail("");
    setPassword("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    
    // Simulate payment processing
    setTimeout(() => {
      setStep("success");
      // Generate mock transaction ID
      const transactionId = `PAYPAL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      setTimeout(() => {
        setShowModal(false);
        onSuccess(transactionId);
      }, 1500);
    }, 2000);
  };

  const handleClose = () => {
    if (step !== "processing") {
      setShowModal(false);
      setStep("login");
    }
  };

  return (
    <>
      <div className="space-y-3">
        {/* PayPal Button */}
        <Button
          type="button"
          onClick={handlePayPalClick}
          disabled={disabled}
          className="w-full h-12 bg-[#FFC439] hover:bg-[#F0B90B] text-[#003087] font-bold rounded-md transition-all"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19a.774.774 0 0 0-.765.645l-.007.045-.699 4.432-.035.223a.643.643 0 0 1-.633.661z"/>
          </svg>
          Pay with PayPal
        </Button>

        {/* Debit/Credit Card via PayPal */}
        <Button
          type="button"
          onClick={handlePayPalClick}
          disabled={disabled}
          variant="outline"
          className="w-full h-12 border-2 border-[#2C2E2F] hover:bg-[#2C2E2F] hover:text-white font-semibold rounded-md transition-all"
        >
          Debit or Credit Card
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Powered by <span className="text-[#003087] font-semibold">PayPal</span> • Demo Mode
        </p>
      </div>

      {/* PayPal Mock Modal */}
      <Dialog open={showModal} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          {/* PayPal Header */}
          <div className="bg-[#003087] px-6 py-4">
            <svg viewBox="0 0 24 24" className="h-8 w-auto" fill="white">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19a.774.774 0 0 0-.765.645l-.007.045-.699 4.432-.035.223a.643.643 0 0 1-.633.661z"/>
            </svg>
          </div>

          <div className="p-6">
            {step === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <DialogHeader>
                  <DialogTitle className="text-center text-lg">
                    Log in to your PayPal account
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                  <div>
                    <Label htmlFor="pp-email">Email or mobile number</Label>
                    <Input
                      id="pp-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="demo@example.com"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pp-password">Password</Label>
                    <Input
                      id="pp-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter any password"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#0070BA] hover:bg-[#003087] text-white font-semibold"
                >
                  Log In
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-[#0070BA] hover:underline cursor-pointer">
                    Having trouble logging in?
                  </p>
                  <p className="text-xs text-muted-foreground">
                    or
                  </p>
                  <p className="text-sm text-[#0070BA] hover:underline cursor-pointer">
                    Sign Up
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    <span>Demo Mode - Enter any credentials</span>
                  </div>
                </div>
              </form>
            )}

            {step === "processing" && (
              <div className="py-12 text-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#0070BA]" />
                <div>
                  <p className="font-semibold text-lg">Processing Payment</p>
                  <p className="text-sm text-muted-foreground">
                    Please wait while we process your payment of ${amount.toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="py-12 text-center space-y-4">
                <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
                <div>
                  <p className="font-semibold text-lg text-green-600">Payment Successful!</p>
                  <p className="text-sm text-muted-foreground">
                    Your payment of ${amount.toFixed(2)} has been completed
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
