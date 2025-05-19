// src/app/privacy/page.tsx
import Header from '../../components/Header';
import Footer from '@/components/Footer'; // Assuming you extract the footer into a component

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto py-12 px-6 flex-grow">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">DingerZone Privacy Policy</h1>
        <p className="text-lg text-gray-600 mb-4">
          <strong>Effective Date:</strong> May 19, 2025
        </p>
        <p className="text-lg text-gray-600 mb-6">
          DingerZone ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application ("App") and website (https://www.dingerzone.com). The App enables youth baseball players, parents, and coaches to analyze swing mechanics using AI-powered computer vision and collaborate on team improvements.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
          <p className="text-gray-600 mb-4">We collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li><strong>Personal Information:</strong> When you create an account, we collect your name, email address, and, for parents, information about child players (e.g., player names, ages).</li>
            <li><strong>Video Content:</strong> Users may upload videos of baseball swings, which are stored and processed to provide AI-driven feedback.</li>
            <li><strong>Payment Information:</strong> Subscription payments are processed via Stripe, which collects and stores payment details (e.g., credit card information). We do not store payment information directly.</li>
            <li><strong>Usage Data:</strong> We collect data on how you interact with the App, such as features used, video uploads, and team interactions.</li>
            <li><strong>Device Information:</strong> We collect device details (e.g., device type, operating system, IP address) to optimize App performance.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Provide and improve the App’s core features, including AI swing analysis, video processing, and team collaboration.</li>
            <li>Authenticate users via AWS Cognito and manage accounts.</li>
            <li>Store videos securely in AWS S3 and process data in AWS DynamoDB.</li>
            <li>Send transactional emails (e.g., account confirmations, subscription updates) via AWS SES.</li>
            <li>Process payments securely through Stripe for premium subscriptions.</li>
            <li>Analyze usage to enhance App performance and user experience.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Share Your Information</h2>
          <p className="text-gray-600 mb-4">We share your information only in the following cases:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li><strong>With Coaches:</strong> If a player joins a team, their swing videos and related data are accessible to the team’s coach for a pre-determined period.</li>
            <li><strong>Service Providers:</strong> We use third-party services like AWS (for hosting, storage, and authentication) and Stripe (for payments). These providers process data on our behalf and are bound by strict confidentiality agreements.</li>
            <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights, safety, or property.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
          <p className="text-gray-600">
            We use industry-standard security measures, including encryption for data in transit and at rest, to protect your information. AWS services (Cognito, S3, DynamoDB) and Stripe comply with high security standards. However, no system is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Children’s Privacy</h2>
          <p className="text-gray-600">
            The App allows parents to create profiles for child players under 13. We comply with the Children’s Online Privacy Protection Act (COPPA) by obtaining verifiable parental consent before collecting personal information from children. Parents control their child’s data and can request deletion at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Choices</h2>
          <p className="text-gray-600 mb-4">You may:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Update or delete your account information via the App.</li>
            <li>Opt out of non-essential emails (e.g., marketing) by following unsubscribe instructions.</li>
            <li>Contact us to request access, correction, or deletion of your data.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Third-Party Links</h2>
          <p className="text-gray-600">
            The App or website may link to third-party services (e.g., Stripe). We are not responsible for their privacy practices. Please review their policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Changes to This Privacy Policy</h2>
          <p className="text-gray-600">
            We may update this policy to reflect changes in our practices or legal requirements. We will notify you via email or the App of significant changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
          <p className="text-gray-600">
            For questions or requests regarding your privacy, contact us at:
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Email:</strong>{' '}
            <a href="mailto:support@dingerzone.com" className="text-blue-600 hover:underline">
              support@dingerzone.com
            </a>
            <br />
            <strong>Website:</strong>{' '}
            <a href="https://www.dingerzone.com/support" className="text-blue-600 hover:underline">
              https://www.dingerzone.com/support
            </a>
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'DingerZone Privacy Policy',
  description: 'Learn how DingerZone collects, uses, and protects your personal information when using our app and website.',
};