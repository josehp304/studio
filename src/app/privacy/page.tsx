
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header Section */}
      <div className="bg-primary/5 py-10 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>-</span>
            <span className="text-primary font-medium">Privacy Policy</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 max-w-4xl">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), delivery notes, and other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may use the information we collect about you for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide, maintain, and improve our services;</li>
              <li>Process transactions and send related information;</li>
              <li>Send you technical notices, updates, security alerts, and support messages;</li>
              <li>Respond to your comments, questions, and requests;</li>
              <li>Communicate with you about products, services, offers, and events;</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Sharing of Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows: with third party vendors, consultants and other service providers who need access to such information to carry out work on our behalf.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our Services.
            </p>
          </section>
      
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Changes to the Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
