export default function TermsPage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-20">
      <a
        href="/howlflow"
        className="text-wolf-blue text-sm mb-8 inline-block hover:underline"
      >
        &larr; Back to home
      </a>
      <h1 className="text-4xl font-bold text-wolf-blue mb-8">
        Terms of Service
      </h1>
      <div className="prose prose-invert max-w-none space-y-6 text-text-secondary">
        <p>
          <strong>Last updated:</strong> February 25, 2026
        </p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">
          Acceptance of Terms
        </h2>
        <p>
          By downloading, installing, or using HowlFlow (&quot;the App&quot;),
          you agree to be bound by these Terms of Service. If you do not agree,
          do not use the App.
        </p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">
          Description of Service
        </h2>
        <p>
          HowlFlow is a personal productivity app designed to help individuals
          with ADHD manage their daily schedules, focus sessions, and thoughts.
          The App runs entirely on your device with optional iCloud
          synchronization.
        </p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">
          Your Data
        </h2>
        <p>
          You own all data created within the App. We do not access, collect, or
          store your data on any server. Data stored in iCloud is governed by
          Apple&apos;s terms and conditions.
        </p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">
          Acceptable Use
        </h2>
        <p>You agree to use the App for its intended purpose as a personal productivity tool.</p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">
          Disclaimer of Warranties
        </h2>
        <p>
          The App is provided &quot;as is&quot; without warranty of any kind.
          HowlFlow is not a medical device and is not intended to diagnose,
          treat, or manage any medical condition including ADHD. Consult a
          healthcare professional for medical advice.
        </p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">
          Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by law, MrDemonWolf, Inc. shall not be
          liable for any indirect, incidental, special, or consequential damages
          arising from your use of the App.
        </p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">
          Changes to Terms
        </h2>
        <p>
          We may update these terms from time to time. Continued use of the App
          after changes constitutes acceptance of the new terms.
        </p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">
          Contact
        </h2>
        <p>
          Questions? Contact us at{" "}
          <a
            href="mailto:support@mrdemonwolf.com"
            className="text-wolf-blue hover:underline"
          >
            support@mrdemonwolf.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
