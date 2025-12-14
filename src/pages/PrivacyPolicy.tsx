import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 8, 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              FitOnTheGo ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
            <h3 className="text-xl font-medium text-foreground mt-4">Personal Information</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
              <li>Name and contact information (email, phone, address)</li>
              <li>Account credentials (username, password)</li>
              <li>Payment information (processed securely through PayPal)</li>
              <li>Profile information and preferences</li>
            </ul>
            
            <h3 className="text-xl font-medium text-foreground mt-4">Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
              <li>Usage data and browsing patterns</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">We use collected information to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Process and fulfill your orders</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Personalize your shopping experience</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Detect and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">4. Information Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li><strong>Service Providers:</strong> Payment processors, shipping companies, and analytics providers</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">5. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar technologies to enhance your experience. You can control cookie preferences through your browser settings. Types of cookies we use:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand site usage</li>
              <li><strong>Preference Cookies:</strong> Remember your settings</li>
              <li><strong>Marketing Cookies:</strong> Used for targeted advertising</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate security measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure password hashing</li>
              <li>Regular security audits</li>
              <li>Limited access to personal data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">8. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a minor, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">9. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party sites. We are not responsible for their privacy practices. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">10. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy periodically. We will notify you of significant changes by posting a notice on our website or sending you an email. Your continued use after changes constitutes acceptance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For privacy-related questions or to exercise your rights, contact us:
            </p>
            <p className="text-foreground mt-2">
              Email: privacy@fitonthego.com<br />
              Address: 123 Fitness Street, Gym City, GC 12345
            </p>
          </section>
        </article>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
