export default function PrivacyPage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-20">
      <a
        href="/howlflow"
        className="text-wolf-blue text-sm mb-8 inline-block hover:underline"
      >
        &larr; Back to home
      </a>
      <h1 className="text-4xl font-bold text-wolf-blue mb-8">
        Privacy Policy
      </h1>
      <div className="prose prose-invert max-w-none space-y-6 text-text-secondary">
        <p>
          <strong>Last updated:</strong> February 25, 2026
        </p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">
          Our Commitment
        </h2>
        <p>
          HowlFlow is built with a local-first architecture. Your data stays on
          your device and, optionally, in your personal iCloud account. We do not
          collect, store, or transmit any personal data to our servers — because
          we don&apos;t have any servers.
        </p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">
          Data Storage
        </h2>
        <p>
          All your data — schedule blocks, tasks, brain dump entries, timer
          sessions, streaks, and settings — is stored locally on your device
          using MMKV, a high-performance key-value storage library.
        </p>
        <p>
          If you enable iCloud Sync, selected data (templates, streaks,
          settings) is synced via Apple&apos;s iCloud key-value store and iCloud
          Documents. This data is managed entirely by Apple and subject to
          Apple&apos;s privacy policies.
        </p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">
          What We Don&apos;t Collect
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>No analytics or tracking</li>
          <li>No personal information</li>
          <li>No usage data</li>
          <li>No advertising identifiers</li>
          <li>No third-party SDKs that collect data</li>
        </ul>

        <h2 className="text-xl font-semibold text-text-primary mt-8">
          Notifications
        </h2>
        <p>
          HowlFlow uses local notifications only (for timer alerts). These are
          scheduled entirely on your device and never touch any external server.
        </p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">
          Contact
        </h2>
        <p>
          If you have questions about this policy, contact us at{" "}
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
