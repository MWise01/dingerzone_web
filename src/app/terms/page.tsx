'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto py-12 px-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Terms of Service</h1>
          <p className="text-lg text-gray-700 mb-6">
            Welcome to DingerZone! These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the DingerZone mobile application (&ldquo;App&rdquo;) and website (collectively, the &ldquo;Service&rdquo;), operated by DingerZone AI (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, please do not use the Service.
          </p>
          <p className="text-sm text-gray-600 mb-8">
            Last Updated: August 29, 2025
          </p>

          {/* Section 1: Description of Service */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Description of Service</h2>
          <p className="text-lg text-gray-700 mb-6">
            DingerZone is an AI-powered platform designed to help baseball players, parents, and coaches improve swing techniques. Users can record swings using their smartphone, receive instant AI feedback and personalized drills, track progress, and share videos securely. The Service includes features like video uploads, AI analysis, subscription plans, and collaboration tools for families and teams. All content is user-controlled and stored securely on AWS infrastructure.
          </p>

          {/* Section 2: User Accounts */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. User Accounts</h2>
          <p className="text-lg text-gray-700 mb-6">
            To access certain features, you must create an account using AWS Cognito. You agree to provide accurate information and keep your credentials secure. You are responsible for all activities under your account. Accounts are for individuals aged 13 or older; users under 18 must have parental consent. We reserve the right to suspend or suspend accounts for violations of these Terms.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Account deletion is available in-app per privacy guidelines. Upon deletion, your data will be removed in accordance with our Privacy Policy.
          </p>

          {/* Section 3: Subscriptions and Payments */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Subscriptions and Payments</h2>
          <p className="text-lg text-gray-700 mb-6">
            DingerZone offers a free tier and premium subscriptions (e.g., DINGERZONE Pro at $5.00/month with a 30-day free trial). Payments are processed via Stripe. By subscribing, you authorize recurring charges. You can manage or cancel subscriptions through the Stripe Billing Portal linked from the App. Refunds are not provided except as required by law. All fees are non-refundable after the trial period.
          </p>

          {/* Section 4: Content Ownership and Usage */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Content Ownership and Usage</h2>
          <p className="text-lg text-gray-700 mb-6">
            You retain ownership of videos and data you upload (&ldquo;User Content&rdquo;). By uploading, you grant us a limited, non-exclusive license to process, store, and analyze your content using AI for Service features (e.g., swing analysis, feedback). You represent that your User Content does not infringe third-party rights. We may remove content that violates these Terms.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            AI-generated outputs (e.g., summaries, scorecards) are provided &ldquo;as is&rdquo; and for informational purposes only—not as professional coaching advice.
          </p>

          {/* New Section 5: Use of User Content for AI Training */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Use of User Content for AI Training</h2>
          <p className="text-lg text-gray-700 mb-6">
            By uploading swing videos or other User Content, you grant us a non-exclusive, royalty-free license to use anonymized or aggregated versions of such content to train and improve our AI models for swing feedback, analysis, and related features. This helps enhance the Service for all users. We will not use identifiable personal information without your consent, and all data is handled in accordance with our Privacy Policy.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            You may opt out of this use at any time through your account settings or by contacting us at feedback@dingerzone.ai. Opting out will not affect your access to existing features but may limit future improvements based on your data.
          </p>

          {/* Section 6: Prohibited Conduct */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Prohibited Conduct</h2>
          <p className="text-lg text-gray-700 mb-6">
            You agree not to: (a) upload harmful, illegal, or infringing content; (b) misuse the Service (e.g., spam, hacking); (c) reverse-engineer the App or AI; (d) share accounts without permission; or (e) violate laws. Violations may result in account termination.
          </p>

          {/* Section 7: Intellectual Property */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Intellectual Property</h2>
          <p className="text-lg text-gray-700 mb-6">
            The Service, including AI models, designs, and trademarks (e.g., DingerZone logo), is our property or licensed to us. You may not copy, modify, or distribute it without written consent.
          </p>

          {/* Section 8: Privacy */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Privacy</h2>
          <p className="text-lg text-gray-700 mb-6">
            Your privacy matters. Our Privacy Policy (linked in the App and website) explains data collection (e.g., videos, user info), usage, and sharing. By using the Service, you consent to these practices.
          </p>

          {/* Section 9: Limitation of Liability */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Limitation of Liability</h2>
          <p className="text-lg text-gray-700 mb-6">
            The Service is provided &ldquo;as is&rdquo; without warranties. We are not liable for indirect damages, data loss, or AI inaccuracies. Liability is limited to fees paid in the last 12 months.
          </p>

          {/* Section 10: Governing Law */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">10. Governing Law</h2>
          <p className="text-lg text-gray-700 mb-6">
            These Terms are governed by U.S. laws (or your jurisdiction if outside). Disputes will be resolved in [Your State/Country] courts.
          </p>

          {/* Section 11: Changes to Terms */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">11. Changes to Terms</h2>
          <p className="text-lg text-gray-700 mb-6">
            We may update these Terms. Continued use constitutes acceptance. Check back for changes.
          </p>

          <p className="text-lg text-gray-700 mb-6">
            Questions? Contact us at <a href="mailto:feedback@dingerzone.ai" className="text-blue-600 hover:underline">feedback@dingerzone.ai</a>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// 'use client';

// import Header from '../../components/Header';
// import Footer from '../../components/Footer';

// export default function TermsOfService() {
//   return (
//     <div className="flex flex-col min-h-screen bg-white text-gray-800">
//       <Header />
//       <main className="flex-grow">
//         <section className="container mx-auto py-12 px-6">
//           <h1 className="text-3xl font-bold mb-4 text-gray-800">Terms of Service</h1>
//           <p className="text-lg text-gray-700 mb-6">
//             Welcome to DingerZone! These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the DingerZone mobile application (&ldquo;App&rdquo;) and website (collectively, the &ldquo;Service&rdquo;), operated by DingerZone AI (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, please do not use the Service.
//           </p>
//           <p className="text-sm text-gray-600 mb-8">
//             Last Updated: August 29, 2025
//           </p>

//           {/* Section 1: Description of Service */}
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Description of Service</h2>
//           <p className="text-lg text-gray-700 mb-6">
//             DingerZone is an AI-powered platform designed to help baseball players, parents, and coaches improve swing techniques. Users can record swings using their smartphone, receive instant AI feedback and personalized drills, track progress, and share videos securely. The Service includes features like video uploads, AI analysis, subscription plans, and collaboration tools for families and teams. All content is user-controlled and stored securely on AWS infrastructure.
//           </p>

//           {/* Section 2: User Accounts */}
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. User Accounts</h2>
//           <p className="text-lg text-gray-700 mb-6">
//             To access certain features, you must create an account using AWS Cognito. You agree to provide accurate information and keep your credentials secure. You are responsible for all activities under your account. Accounts are for individuals aged 13 or older; users under 18 must have parental consent. We reserve the right to suspend or suspend accounts for violations of these Terms.
//           </p>
//           <p className="text-lg text-gray-700 mb-6">
//             Account deletion is available in-app per privacy guidelines. Upon deletion, your data will be removed in accordance with our Privacy Policy.
//           </p>

//           {/* Section 3: Subscriptions and Payments */}
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Subscriptions and Payments</h2>
//           <p className="text-lg text-gray-700 mb-6">
//             DingerZone offers a free tier and premium subscriptions (e.g., DINGERZONE Pro at $5.00/month with a 30-day free trial). Payments are processed via Stripe. By subscribing, you authorize recurring charges. You can manage or cancel subscriptions through the Stripe Billing Portal linked from the App. Refunds are not provided except as required by law. All fees are non-refundable after the trial period.
//           </p>

//           {/* Section 4: Content Ownership and Usage */}
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Content Ownership and Usage</h2>
//           <p className="text-lg text-gray-700 mb-6">
//             You retain ownership of videos and data you upload (&ldquo;User Content&rdquo;). By uploading, you grant us a limited, non-exclusive license to process, store, and analyze your content using AI for Service features (e.g., swing analysis, feedback). You represent that your User Content does not infringe third-party rights. We may remove content that violates these Terms.
//           </p>
//           <p className="text-lg text-gray-700 mb-6">
//             AI-generated outputs (e.g., summaries, scorecards) are provided &ldquo;as is&rdquo; and for informational purposes only—not as professional coaching advice.
//           </p>

//           {/* New Section 5: Use of User Content for AI Training */}
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Use of User Content for AI Training</h2>
//           <p className="text-lg text-gray-700 mb-6">
//             By uploading swing videos or other User Content, you grant us a non-exclusive, royalty-free license to use anonymized or aggregated versions of such content to train and improve our AI models for swing feedback, analysis, and related features. This helps enhance the Service for all users. We will not use identifiable personal information without your consent, and all data is handled in accordance with our Privacy Policy.
//           </p>
//           <p className="text-lg text-gray-700 mb-6">
//             You may opt out of this use at any time through your account settings or by contacting us at feedback@dingerzone.ai. Opting out will not affect your access to existing features but may limit future improvements based on your data.
//           </p>

//           {/* Section 6: Prohibited Conduct */}
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Prohibited Conduct</h2>
//           <p className="text-lg text-gray-700 mb-6">
//             You agree not to: (a) upload harmful, illegal, or infringing content; (b) misuse the Service (e.g., spam, hacking); (c) reverse-engineer the App or AI; (d) share accounts without permission; or (e) violate laws. Violations may result in account termination.
//           </p>

//           {/* Section 7: Intellectual Property */}
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Intellectual Property</h2>
//           <p className="text-lg text-gray-700 mb-6">
//             The Service, including AI models, designs, and trademarks (e.g., DingerZone logo), is our property or licensed to us. You may not copy, modify, or distribute it without written consent.
//           </p>

//           {/* Section 8: Privacy */}
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Privacy</h2>
//           <p className="text-lg text-gray-700 mb-6">
//             Your privacy matters. Our Privacy Policy (linked in the App and website) explains data collection (e.g., videos, user info), usage, and sharing. By using the Service, you consent to these practices.
//           </p>

//           {/* Section 9: Limitation of Liability */}
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Limitation of Liability</h2>
//           <p className="text-lg text-gray-700 mb-6">
//             The Service is provided &ldquo;as is&rdquo; without warranties. We are not liable for indirect damages, data loss, or AI inaccuracies. Liability is limited to fees paid in the last 12 months.
//           </p>

//           {/* Section 10: Governing Law */}
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">10. Governing Law</h2>
//           <p className="text-lg text-gray-700 mb-6">
//             These Terms are governed by U.S. laws (or your jurisdiction if outside). Disputes will be resolved in [Your State/Country] courts.
//           </p>

//           {/* Section 11: Changes to Terms */}
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">11. Changes to Terms</h2>
//           <p className="text-lg text-gray-700 mb-6">
//             We may update these Terms. Continued use constitutes acceptance. Check back for changes.
//           </p>

//           <p className="text-lg text-gray-700 mb-6">
//             Questions? Contact us at <a href="mailto:feedback@dingerzone.ai" className="text-blue-600 hover:underline">feedback@dingerzone.ai</a>.
//           </p>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }