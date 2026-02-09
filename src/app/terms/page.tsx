
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header Section */}
      <div className="bg-primary/5 py-10 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Terms and Conditions</h1>
          <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>-</span>
            <span className="text-primary font-medium">Terms and Conditions</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 max-w-4xl">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Dreams LMS. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms. If you do not agree with any part of these terms, you must not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Intellectual Property Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              Other than the content you own, under these Terms, Dreams LMS and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Restrictions</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You are specifically restricted from all of the following:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Publishing any Website material in any other media;</li>
              <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
              <li>Publicly performing and/or showing any Website material;</li>
              <li>Using this Website in any way that is or may be damaging to this Website;</li>
              <li>Using this Website in any way that impacts user access to this Website;</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Your Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Dreams LMS a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. No warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Website is provided "as is," with all faults, and Dreams LMS express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Limitation of liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall Dreams LMS, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Dreams LMS, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Variation of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Dreams LMS is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
