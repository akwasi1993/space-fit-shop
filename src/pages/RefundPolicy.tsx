import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const RefundPolicy = () => {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-2">Refund & Return Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 8, 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">1. Return Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              We want you to be completely satisfied with your purchase. You may return most items within 30 days of delivery for a full refund, subject to the following conditions:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Items must be unused and in original packaging</li>
              <li>All tags and labels must be attached</li>
              <li>Proof of purchase is required</li>
              <li>Items must be free from damage caused by the customer</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">2. Non-Returnable Items</h2>
            <p className="text-muted-foreground leading-relaxed">The following items cannot be returned:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Digital products and downloadable workout programs</li>
              <li>Personalized or custom-made equipment</li>
              <li>Items marked as "Final Sale"</li>
              <li>Hygiene-sensitive products (yoga mats, workout gloves) once opened</li>
              <li>Items damaged due to misuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">3. Return Process</h2>
            <p className="text-muted-foreground leading-relaxed">To initiate a return:</p>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-4">
              <li>Contact our customer service at returns@fitonthego.com</li>
              <li>Provide your order number and reason for return</li>
              <li>Receive a Return Merchandise Authorization (RMA) number</li>
              <li>Pack the item securely with all original packaging</li>
              <li>Ship the item using a trackable shipping method</li>
              <li>Include the RMA number on the outside of the package</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">4. Refund Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Once we receive and inspect your return, we will process your refund within 5-7 business days. Please note:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Refunds will be credited to your original payment method</li>
              <li>PayPal refunds typically appear within 3-5 business days</li>
              <li>Credit card refunds may take up to 10 business days</li>
              <li>Original shipping costs are non-refundable unless the return is due to our error</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">5. Exchanges</h2>
            <p className="text-muted-foreground leading-relaxed">
              We offer exchanges for items of equal or lesser value. For items of greater value, you will need to pay the difference. To request an exchange:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Contact customer service within 30 days of delivery</li>
              <li>Specify the item you wish to receive</li>
              <li>Return the original item following our return process</li>
              <li>The new item will be shipped once we receive the return</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">6. Damaged or Defective Items</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you receive a damaged or defective item:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Contact us within 48 hours of delivery</li>
              <li>Provide photos of the damage</li>
              <li>We will arrange for a replacement or full refund</li>
              <li>Return shipping will be covered by FitOnTheGo</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">7. Shipping Costs</h2>
            <p className="text-muted-foreground leading-relaxed">Return shipping responsibilities:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li><strong>Customer-initiated returns:</strong> Customer pays return shipping</li>
              <li><strong>Defective/damaged items:</strong> FitOnTheGo covers shipping</li>
              <li><strong>Wrong item shipped:</strong> FitOnTheGo covers shipping</li>
              <li><strong>Exchanges:</strong> Free shipping for replacement items</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">8. Workout Programs</h2>
            <p className="text-muted-foreground leading-relaxed">
              For digital workout programs purchased through our platform:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Refund requests must be made within 7 days of purchase</li>
              <li>Program must not have been fully accessed or downloaded</li>
              <li>One refund allowed per customer per program</li>
              <li>No refunds for programs marked as "Non-Refundable"</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">9. Bundle Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              For equipment bundles, you may return the entire bundle for a full refund or individual items at their prorated value. Bundle discounts will be adjusted accordingly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about returns or refunds:
            </p>
            <p className="text-foreground mt-2">
              Email: returns@fitonthego.com<br />
              Phone: 1-800-FITONTHEGO<br />
              Hours: Monday-Friday, 9AM-6PM EST
            </p>
          </section>
        </article>
      </div>
    </main>
  );
};

export default RefundPolicy;
