import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 8, 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using FitOnTheGo's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">2. Products and Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              FitOnTheGo provides fitness equipment, workout programs, and related services for home gym enthusiasts. All products are subject to availability, and we reserve the right to discontinue any product at any time.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Product descriptions and images are for illustrative purposes</li>
              <li>Prices are subject to change without notice</li>
              <li>We reserve the right to limit quantities</li>
              <li>Colors may vary slightly from images shown</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">3. User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you create an account with us, you must provide accurate and complete information. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your contact information is up to date</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">4. User-Generated Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              By submitting content (including gym photos, reviews, and comments) to our platform, you grant FitOnTheGo a non-exclusive, royalty-free license to use, display, and distribute such content. You represent that you own or have the right to share this content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">5. Prohibited Activities</h2>
            <p className="text-muted-foreground leading-relaxed">You agree not to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Use the service for any unlawful purpose</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Upload malicious code or interfere with the service</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Engage in harassment or abusive behavior</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website, including text, graphics, logos, images, and software, is the property of FitOnTheGo and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">7. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are provided "as is" without warranties of any kind. We do not guarantee that our services will be uninterrupted, secure, or error-free. Fitness results may vary, and you should consult a healthcare professional before starting any exercise program.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              FitOnTheGo shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount paid by you for the specific product or service in question.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">9. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">10. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-foreground mt-2">
              Email: legal@fitonthego.com<br />
              Address: 123 Fitness Street, Gym City, GC 12345
            </p>
          </section>
        </article>
      </div>
    </main>
  );
};

export default TermsOfService;
