import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ShippingPolicy = () => {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Shipping Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 8, 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">1. Shipping Destinations</h2>
            <p className="text-muted-foreground leading-relaxed">
              We currently ship to the following regions:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>United States (all 50 states)</li>
              <li>Canada</li>
              <li>United Kingdom</li>
              <li>European Union countries</li>
              <li>Australia</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              For other international destinations, please contact us for availability and rates.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">2. Shipping Options & Timeframes</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left text-foreground">Shipping Method</th>
                    <th className="border border-border p-3 text-left text-foreground">Delivery Time</th>
                    <th className="border border-border p-3 text-left text-foreground">Cost</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="border border-border p-3">Standard Shipping</td>
                    <td className="border border-border p-3">5-7 business days</td>
                    <td className="border border-border p-3">$7.99 (Free over $75)</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">Express Shipping</td>
                    <td className="border border-border p-3">2-3 business days</td>
                    <td className="border border-border p-3">$14.99</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">Next Day Delivery</td>
                    <td className="border border-border p-3">1 business day</td>
                    <td className="border border-border p-3">$24.99</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">Large Equipment</td>
                    <td className="border border-border p-3">7-14 business days</td>
                    <td className="border border-border p-3">Calculated at checkout</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">3. Free Shipping</h2>
            <p className="text-muted-foreground leading-relaxed">
              Enjoy free standard shipping on orders over $75 within the United States. Free shipping applies to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Standard-size fitness equipment</li>
              <li>Accessories and apparel</li>
              <li>Combined orders meeting the threshold</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>Note:</strong> Free shipping does not apply to oversized equipment (treadmills, exercise bikes, etc.) which have special shipping requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">4. Processing Time</h2>
            <p className="text-muted-foreground leading-relaxed">
              Orders are typically processed within 1-2 business days. During peak periods or sales events, processing may take up to 3-5 business days. You will receive a confirmation email once your order ships.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">5. Order Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              Once your order ships, you will receive a tracking number via email. You can track your package:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Through your HomeFit account dashboard</li>
              <li>Using the link provided in your shipping confirmation email</li>
              <li>Directly on the carrier's website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">6. Large Equipment Delivery</h2>
            <p className="text-muted-foreground leading-relaxed">
              For large fitness equipment (treadmills, exercise bikes, multi-gyms):
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Delivery is to ground-floor or curbside only</li>
              <li>White-glove delivery available for an additional fee</li>
              <li>Assembly services can be added at checkout</li>
              <li>Delivery appointments will be scheduled</li>
              <li>Someone 18+ must be present to receive delivery</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">7. International Shipping</h2>
            <p className="text-muted-foreground leading-relaxed">
              For international orders:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Delivery times vary by destination (typically 7-21 business days)</li>
              <li>Customers are responsible for any customs duties or taxes</li>
              <li>Some products may not be available for international shipping</li>
              <li>Shipping rates are calculated at checkout based on weight and destination</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">8. Delivery Issues</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you experience delivery issues:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li><strong>Delayed Package:</strong> Contact us if your package hasn't arrived within the estimated timeframe</li>
              <li><strong>Lost Package:</strong> We will file a claim and either reship or refund your order</li>
              <li><strong>Damaged Package:</strong> Report within 48 hours with photos for immediate resolution</li>
              <li><strong>Wrong Address:</strong> Contact us immediately; additional fees may apply for rerouting</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">9. Signature Requirements</h2>
            <p className="text-muted-foreground leading-relaxed">
              Signature confirmation is required for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Orders over $200</li>
              <li>Large equipment deliveries</li>
              <li>International shipments</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For shipping inquiries:
            </p>
            <p className="text-foreground mt-2">
              Email: shipping@homefit.com<br />
              Phone: 1-800-HOMEFIT<br />
              Hours: Monday-Friday, 9AM-6PM EST
            </p>
          </section>
        </article>
      </div>
    </main>
  );
};

export default ShippingPolicy;
