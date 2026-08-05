import TextHero from '@/components/sections/TextHero';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';



// export async function generateMetadata(): Promise<Metadata> {
//   // return buildPageMetadata('/privacy-policy');
// }

/* The notice renders its inline <span> copy in a soft blue and its <strong>
   copy in navy; links sit a shade brighter. Both tokens live here so the
   colour is changed in one place. */
const blue = 'text-[#000000]';
const linkCls =
  'text-blue-600 underline underline-offset-2 decoration-blue-600/50 transition-colors hover:text-blue-800 hover:decoration-blue-800 break-words';

/** Numbered section heading — serif small caps, matching the reference layout. */
function Heading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h5
      id={id}
      className="mt-12 mb-5 scroll-mt-32 font-serif text-[20px] font-normal text-navy [font-variant:small-caps]"
    >
      {children}
    </h5>
  );
}

/** Small bold sans label used for "PRIVACY NOTICE" / "SUMMARY OF KEY POINTS". */
function Label({ children }: { children: ReactNode }) {
  return <p className="mb-6 font-sans text-[15px] font-bold text-navy">{children}</p>;
}

function InShort({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 italic">
      <em>In Short:</em> {children}
    </p>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className={`mb-6 list-disc space-y-2 pl-6 ${blue}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

const tableOfContents = [
  { href: '#infocollect', label: 'WHAT INFORMATION DO WE COLLECT?' },
  { href: '#infouse', label: 'HOW DO WE PROCESS YOUR INFORMATION?' },
  { href: '#whoshare', label: 'WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?' },
  { href: '#cookies', label: 'DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?' },
  { href: '#inforetain', label: 'HOW LONG DO WE KEEP YOUR INFORMATION?' },
  { href: '#infosafe', label: 'HOW DO WE KEEP YOUR INFORMATION SAFE?' },
  { href: '#infominors', label: 'DO WE COLLECT INFORMATION FROM MINORS?' },
  { href: '#privacyrights', label: 'WHAT ARE YOUR PRIVACY RIGHTS?' },
  { href: '#DNT', label: 'CONTROLS FOR DO-NOT-TRACK FEATURES' },
  { href: '#caresidents', label: 'DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?' },
  { href: '#virginia', label: 'DO VIRGINIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?' },
  { href: '#policyupdates', label: 'DO WE MAKE UPDATES TO THIS NOTICE?' },
  { href: '#contact-div', label: 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' },
  {
    href: '#request',
    label: 'HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?',
  },
];

/** CCPA disclosure table — [category, examples, collected]. */
const ccpaCategories: Array<[string, string, 'YES' | 'NO']> = [
  [
    'A. Identifiers',
    'Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name',
    'YES',
  ],
  [
    'B. Personal information categories listed in the California Customer Records statute',
    'Name, contact information, education, employment, employment history, and financial information',
    'YES',
  ],
  [
    'C. Protected classification characteristics under California or federal law',
    'Gender and date of birth',
    'YES',
  ],
  [
    'D. Commercial information',
    'Transaction information, purchase history, financial details, and payment information',
    'YES',
  ],
  ['E. Biometric information', 'Fingerprints and voiceprints', 'NO'],
  [
    'F. Internet or other similar network activity',
    'Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements',
    'YES',
  ],
  ['G. Geolocation data', 'Device location', 'NO'],
  [
    'H. Audio, electronic, visual, thermal, olfactory, or similar information',
    'Images and audio, video or call recordings created in connection with our business activities',
    'NO',
  ],
  [
    'I. Professional or employment-related information',
    'Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us',
    'NO',
  ],
  ['J. Education Information', 'Student records and directory information', 'NO'],
  [
    'K. Inferences drawn from other personal information',
    'Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics',
    'NO',
  ],
  ['L. Sensitive Personal Information', '', 'NO'],
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* <PageJsonLd route="/privacy-policy" /> */}
      <TextHero title="Privacy Policy" />

      <section className="section bg-white">
        <div className="shell-narrow">
          {/* Plain div, not <Reveal>: the reveal observer needs 10% of its target
              on screen, which a document this tall can never reach. */}
          <div className="mx-auto max-w-[860px] text-[15px] leading-[1.9] text-ink">
            <Label>PRIVACY NOTICE</Label>

            <p className="mb-6 italic">Last updated March 14, 2024</p>

            <p className={`mb-6 ${blue}`}>
              This privacy notice for Savannah Age Management Medicine (&ldquo;
              <strong className="font-bold text-black">Company</strong>,&rdquo; &ldquo;
              <strong className="font-bold text-black">we</strong>,&rdquo; &ldquo;
              <strong className="font-bold text-black">us</strong>,&rdquo; or &ldquo;
              <strong className="font-bold text-black">our</strong>&rdquo;), describes how and why we
              might collect, store, use, and/or share (&ldquo;
              <strong className="font-bold text-black">process</strong>&rdquo;) your information when
              you use our services (&ldquo;
              <strong className="font-bold text-black">Services</strong>&rdquo;), such as when you:
            </p>

            <ul className={`mb-6 list-disc space-y-2 pl-6 ${blue}`}>
              <li>
                Visit our website at{' '}
                <Link href="/" className={linkCls}>
                  https://agemanagementmed.com/
                </Link>
                , or any website of ours that links to this privacy notice
              </li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>

            <p className="mb-6">
              <strong className="font-bold text-navy">Questions or concerns?</strong> Reading this
              privacy notice will help you understand your privacy rights and choices. If you do not
              agree with our policies and practices, please do not use our Services. If you still
              have any questions or concerns, please contact us at john@agemanagementmed.com.
            </p>

            <Label>SUMMARY OF KEY POINTS</Label>

            <p className="mb-6 italic">
              This summary provides key points from our privacy notice, but you can find out more
              details about any of these topics by clicking the link following each key point or by
              using our table of contents below to find the section you are looking for. You can
              also click{' '}
              <a href="#toc" className={linkCls}>
                here
              </a>{' '}
              to go directly to our table of contents.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">
                What personal information do we process?
              </strong>
              <span className={blue}>
                {' '}
                When you visit, use, or navigate our Services, we may process personal information
                depending on how you interact with Savannah Age Management Medicine and the
                Services, the choices you make, and the products and features you use. Click{' '}
                <a href="#personalinfo" className={linkCls}>
                  here
                </a>{' '}
                to learn more.
              </span>
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">
                Do we process any sensitive personal information?
              </strong>
              <span className={blue}> We do not process sensitive personal information.</span>
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">
                Do we receive any information from third parties?
              </strong>
              <span className={blue}>
                {' '}
                We may receive information from public databases, marketing partners, social media
                platforms, and other outside sources. Click{' '}
                <a href="#othersources" className={linkCls}>
                  here
                </a>{' '}
                to learn more.
              </span>
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">How do we process your information?</strong>
              <span className={blue}>
                {' '}
                We process your information to provide, improve, and administer our Services,
                communicate with you, for security and fraud prevention, and to comply with law. We
                may also process your information for other purposes with your consent. We process
                your information only when we have a valid legal reason to do so. Click{' '}
                <a href="#infouse" className={linkCls}>
                  here
                </a>{' '}
                to learn more.
              </span>
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">
                In what situations and with which types of parties do we share personal information?
              </strong>
              <span className={blue}>
                {' '}
                We may share information in specific situations and with specific categories of
                third parties. Click{' '}
                <a href="#whoshare" className={linkCls}>
                  here
                </a>{' '}
                to learn more.
              </span>
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">How do we keep your information safe?</strong>
              <span className={blue}>
                {' '}
                We have organizational and technical processes and procedures in place to protect
                your personal information. However, no electronic transmission over the internet or
                information storage technology can be guaranteed to be 100% secure, so we cannot
                promise or guarantee that hackers, cybercriminals, or other unauthorized third
                parties will not be able to defeat our security and improperly collect, access,
                steal, or modify your information. Click{' '}
                <a href="#infosafe" className={linkCls}>
                  here
                </a>{' '}
                to learn more.
              </span>
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">What are your rights?</strong>
              <span className={blue}>
                {' '}
                Depending on where you are located geographically, the applicable privacy law may
                mean you have certain rights regarding your personal information. Click{' '}
                <a href="#privacyrights" className={linkCls}>
                  here
                </a>{' '}
                to learn more.
              </span>
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">How do you exercise your rights?</strong>
              <span className={blue}>
                {' '}
                The easiest way to exercise your rights is by filling out our data subject request
                form available here:{' '}
                <Link href="/contact-us" className={linkCls}>
                  https://agemanagementmed.com/contact-us/
                </Link>
                , or by contacting us. We will consider and act upon any request in accordance with
                applicable data protection laws.
              </span>
            </p>

            <p className={`mb-6 ${blue}`}>
              Want to learn more about what Savannah Age Management Medicine does with any
              information we collect? Click{' '}
              <a href="#toc" className={linkCls}>
                here
              </a>{' '}
              to review the notice in full.
            </p>

            <Heading id="toc">Table of Contents</Heading>

            <ol className="mb-6 list-decimal space-y-2 pl-6">
              {tableOfContents.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkCls}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>

            <Heading id="infocollect">1. What Information Do We Collect?</Heading>

            <p id="personalinfo" className="mb-6 scroll-mt-32">
              <strong className="font-bold text-navy">Personal information you disclose to us</strong>
            </p>

            <InShort>We collect personal information that you provide to us.</InShort>

            <p className={`mb-6 ${blue}`}>
              We collect personal information that you voluntarily provide to us when you register
              on the Services, express an interest in obtaining information about us or our products
              and Services, when you participate in activities on the Services, or otherwise when
              you contact us.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">Personal Information Provided by You.</strong>
              <span className={blue}>
                {' '}
                The personal information that we collect depends on the context of your interactions
                with us and the Services, the choices you make, and the products and features you
                use. The personal information we collect may include the following:
              </span>
            </p>

            <Bullets
              items={[
                'names',
                'phone numbers',
                'email addresses',
                'usernames',
                'passwords',
                'contact preferences',
                'billing addresses',
                'mailing addresses',
              ]}
            />

            <p className="mb-6">
              <strong className="font-bold text-navy">Sensitive Information.</strong>
              <span className={blue}> We do not process sensitive information.</span>
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">Payment Data.</strong>
              <span className={blue}>
                {' '}
                We may collect data necessary to process your payment if you make purchases, such as
                your payment instrument number, and the security code associated with your payment
                instrument. All payment data is stored by Stripe. You may find their privacy notice
                link(s) here:{' '}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className={linkCls}
                >
                  https://stripe.com/privacy
                </a>
                .
              </span>
            </p>

            <p className={`mb-6 ${blue}`}>
              All personal information that you provide to us must be true, complete, and accurate,
              and you must notify us of any changes to such personal information.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">Information automatically collected</strong>
            </p>

            <InShort>
              Some information &mdash; such as your Internet Protocol (IP) address and/or browser and
              device characteristics &mdash; is collected automatically when you visit our Services.
            </InShort>

            <p className={`mb-6 ${blue}`}>
              We automatically collect certain information when you visit, use, or navigate the
              Services. This information does not reveal your specific identity (like your name or
              contact information) but may include device and usage information, such as your IP
              address, browser and device characteristics, operating system, language preferences,
              referring URLs, device name, country, location, information about how and when you use
              our Services, and other technical information. This information is primarily needed to
              maintain the security and operation of our Services, and for our internal analytics
              and reporting purposes.
            </p>

            <p className={`mb-6 ${blue}`}>
              Like many businesses, we also collect information through cookies and similar
              technologies.
            </p>

            <p className={`mb-6 ${blue}`}>The information we collect includes:</p>

            <ul className={`mb-6 list-disc space-y-3 pl-6 ${blue}`}>
              <li>
                <em>Log and Usage Data.</em> Log and usage data is service-related, diagnostic,
                usage, and performance information our servers automatically collect when you access
                or use our Services and which we record in log files. Depending on how you interact
                with us, this log data may include your IP address, device information, browser
                type, and settings and information about your activity in the Services (such as the
                date/time stamps associated with your usage, pages and files viewed, searches, and
                other actions you take such as which features you use), device event information
                (such as system activity, error reports (sometimes called &ldquo;crash dumps&rdquo;),
                and hardware settings).
              </li>
              <li>
                <em>Device Data.</em> We collect device data such as information about your computer,
                phone, tablet, or other device you use to access the Services. Depending on the
                device used, this device data may include information such as your IP address (or
                proxy server), device and application identification numbers, location, browser
                type, hardware model, Internet service provider and/or mobile carrier, operating
                system, and system configuration information.
              </li>
              <li>
                <em>Location Data.</em> We collect location data such as information about your
                device&rsquo;s location, which can be either precise or imprecise. How much
                information we collect depends on the type and settings of the device you use to
                access the Services. For example, we may use GPS and other technologies to collect
                geolocation data that tells us your current location (based on your IP address). You
                can opt out of allowing us to collect this information either by refusing access to
                the information or by disabling your Location setting on your device. However, if
                you choose to opt out, you may not be able to use certain aspects of the Services.
              </li>
            </ul>

            <p id="othersources" className="mb-6 scroll-mt-32">
              <strong className="font-bold text-navy">
                Information collected from other sources
              </strong>
            </p>

            <InShort>
              We may collect limited data from public databases, marketing partners, and other
              outside sources.
            </InShort>

            <p className={`mb-6 ${blue}`}>
              In order to enhance our ability to provide relevant marketing, offers, and services to
              you and update our records, we may obtain information about you from other sources,
              such as public databases, joint marketing partners, affiliate programs, data
              providers, and from other third parties. This information includes mailing addresses,
              job titles, email addresses, phone numbers, intent data (or user behavior data),
              Internet Protocol (IP) addresses, social media profiles, social media URLs, and custom
              profiles, for purposes of targeted advertising and event promotion.
            </p>

            <Heading id="infouse">2. How Do We Process Your Information?</Heading>

            <InShort>
              We process your information to provide, improve, and administer our Services,
              communicate with you, for security and fraud prevention, and to comply with law. We
              may also process your information for other purposes with your consent.
            </InShort>

            <p className="mb-6">
              <strong className="font-bold text-navy">
                We process your personal information for a variety of reasons, depending on how you
                interact with our Services, including:
              </strong>
            </p>

            <ul className={`mb-6 list-disc space-y-3 pl-6 ${blue}`}>
              <li>
                <strong className="font-bold text-navy">
                  To facilitate account creation and authentication and otherwise manage user
                  accounts.
                </strong>{' '}
                We may process your information so you can create and log in to your account, as
                well as keep your account in working order.
              </li>
              <li>
                <strong className="font-bold text-navy">
                  To respond to user inquiries/offer support to users.
                </strong>{' '}
                We may process your information to respond to your inquiries and solve any potential
                issues you might have with the requested service.
              </li>
              <li>
                <strong className="font-bold text-navy">To fulfill and manage your orders.</strong>{' '}
                We may process your information to fulfill and manage your orders, payments,
                returns, and exchanges made through the Services.
              </li>
              <li>
                <strong className="font-bold text-navy">To request feedback.</strong> We may process
                your information when necessary to request feedback and to contact you about your
                use of our Services.
              </li>
              <li>
                <strong className="font-bold text-navy">
                  To send you marketing and promotional communications.
                </strong>{' '}
                We may process the personal information you send to us for our marketing purposes,
                if this is in accordance with your marketing preferences. You can opt out of our
                marketing emails at any time. For more information, see &ldquo;
                <a href="#privacyrights" className={linkCls}>
                  WHAT ARE YOUR PRIVACY RIGHTS?
                </a>
                &rdquo; below).
              </li>
              <li>
                <strong className="font-bold text-navy">
                  To deliver targeted advertising to you.
                </strong>{' '}
                We may process your information to develop and display personalized content and
                advertising tailored to your interests, location, and more.
              </li>
              <li>
                <strong className="font-bold text-navy">To post testimonials.</strong> We post
                testimonials on our Services that may contain personal information.
              </li>
              <li>
                <strong className="font-bold text-navy">
                  To evaluate and improve our Services, products, marketing, and your experience.
                </strong>{' '}
                We may process your information when we believe it is necessary to identify usage
                trends, determine the effectiveness of our promotional campaigns, and to evaluate
                and improve our Services, products, marketing, and your experience.
              </li>
              <li>
                <strong className="font-bold text-navy">
                  To determine the effectiveness of our marketing and promotional campaigns.
                </strong>{' '}
                We may process your information to better understand how to provide marketing and
                promotional campaigns that are most relevant to you.
              </li>
            </ul>

            <Heading id="whoshare">
              3. When And With Whom Do We Share Your Personal Information?
            </Heading>

            <InShort>
              We may share information in specific situations described in this section and/or with
              the following categories of third parties.
            </InShort>

            <p className="mb-6">
              <strong className="font-bold text-navy">
                Vendors, Consultants, and Other Third-Party Service Providers.
              </strong>
              <span className={blue}>
                {' '}
                We may share your data with third-party vendors, service providers, contractors, or
                agents (&ldquo;<strong className="font-bold text-navy">third parties</strong>&rdquo;)
                who perform services for us or on our behalf and require access to such information
                to do that work. We have contracts in place with our third parties, which are
                designed to help safeguard your personal information. This means that they cannot do
                anything with your personal information unless we have instructed them to do it.
                They will also not share your personal information with any organization apart from
                us. They also commit to protect the data they hold on our behalf and to retain it
                for the period we instruct. The categories of third parties we may share personal
                information with are as follows:
              </span>
            </p>

            <Bullets
              items={['Social Networks', 'Payment Processors', 'Sales & Marketing Tools', 'Ad Networks']}
            />

            <p className={`mb-6 ${blue}`}>
              We also may need to share your personal information in the following situations:
            </p>

            <ul className={`mb-6 list-disc space-y-2 pl-6 ${blue}`}>
              <li>
                <strong className="font-bold text-navy">Business Transfers.</strong> We may share or
                transfer your information in connection with, or during negotiations of, any merger,
                sale of company assets, financing, or acquisition of all or a portion of our
                business to another company.
              </li>
            </ul>

            <Heading id="cookies">4. Do We Use Cookies And Other Tracking Technologies?</Heading>

            <InShort>
              We may use cookies and other tracking technologies to collect and store your
              information.
            </InShort>

            <p className={`mb-6 ${blue}`}>
              We may use cookies and similar tracking technologies (like web beacons and pixels) to
              access or store information.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">What Are Cookies</strong>
            </p>

            <p className="mb-6">
              As is common practice with almost all professional websites this site uses cookies,
              which are tiny files that are downloaded to your computer, to improve your experience.
              This page describes what information they gather, how we use it and why we sometimes
              need to store these cookies. We will also share how you can prevent these cookies from
              being stored however this may downgrade or &lsquo;break&rsquo; certain elements of the
              sites functionality.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">How We Use Cookies</strong>
            </p>

            <p className="mb-6">
              We use cookies for a variety of reasons detailed below. Unfortunately in most cases
              there are no industry standard options for disabling cookies without completely
              disabling the functionality and features they add to this site. It is recommended that
              you leave on all cookies if you are not sure whether you need them or not in case they
              are used to provide a service that you use.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">Disabling Cookies</strong>
            </p>

            <p className="mb-6">
              You can prevent the setting of cookies by adjusting the settings on your browser (see
              your browser Help for how to do this). Be aware that disabling cookies will affect the
              functionality of this and many other websites that you visit. Disabling cookies will
              usually result in also disabling certain functionality and features of the this site.
              Therefore it is recommended that you do not disable cookies.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">The Cookies We Set</strong>
            </p>

            <ul className="mb-6 list-disc space-y-2 pl-6">
              <li>Storing referral sources to track how you first discovered our website.</li>
            </ul>

            <p className="mb-6">
              <strong className="font-bold text-navy">Third Party Cookies</strong>
            </p>

            <p className="mb-6">
              In some special cases we also use cookies provided by trusted third parties. The
              following section details which third party cookies you might encounter through this
              site.
            </p>

            <ul className="mb-6 list-disc space-y-3 pl-6">
              <li>
                This site uses Google Analytics which is one of the most widespread and trusted
                analytics solution on the web for helping us to understand how you use the site and
                ways that we can improve your experience. These cookies may track things such as how
                long you spend on the site and the pages that you visit so we can continue to produce
                engaging content.
              </li>
              <li>
                For more information on Google Analytics cookies, see the official Google Analytics
                page.
              </li>
              <li>
                As we sell products it&rsquo;s important for us to understand statistics about how
                many of the visitors to our site actually make a purchase and as such this is the
                kind of data that these cookies will track. This is important to you as it means that
                we can accurately make business predictions that allow us to monitor our advertising
                and product costs to ensure the best possible price.
              </li>
              <li>
                We use adverts to offset the costs of running this site and provide funding for
                further development. The behavioural advertising cookies used by this site are
                designed to ensure that we provide you with the most relevant adverts where possible
                by anonymously tracking your interests and presenting similar things that may be of
                interest.
              </li>
              <li>
                Several partners advertise on our behalf and affiliate tracking cookies simply allow
                us to see if our customers have come to the site through one of our partner sites so
                that we can credit them appropriately and where applicable allow our affiliate
                partners to provide any bonus that they may provide you for making a purchase.
              </li>
            </ul>

            <Heading id="inforetain">5. How Long Do We Keep Your Information?</Heading>

            <InShort>
              We keep your information for as long as necessary to fulfill the purposes outlined in
              this privacy notice unless otherwise required by law.
            </InShort>

            <p className={`mb-6 ${blue}`}>
              We will only keep your personal information for as long as it is necessary for the
              purposes set out in this privacy notice, unless a longer retention period is required
              or permitted by law (such as tax, accounting, or other legal requirements). No purpose
              in this notice will require us keeping your personal information for longer than the
              period of time in which users have an account with us.
            </p>

            <p className={`mb-6 ${blue}`}>
              When we have no ongoing legitimate business need to process your personal information,
              we will either delete or anonymize such information, or, if this is not possible (for
              example, because your personal information has been stored in backup archives), then
              we will securely store your personal information and isolate it from any further
              processing until deletion is possible.
            </p>

            <Heading id="infosafe">6. How Do We Keep Your Information Safe?</Heading>

            <InShort>
              We aim to protect your personal information through a system of organizational and
              technical security measures.
            </InShort>

            <p className={`mb-6 ${blue}`}>
              We have implemented appropriate and reasonable technical and organizational security
              measures designed to protect the security of any personal information we process.
              However, despite our safeguards and efforts to secure your information, no electronic
              transmission over the Internet or information storage technology can be guaranteed to
              be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or
              other unauthorized third parties will not be able to defeat our security and
              improperly collect, access, steal, or modify your information. Although we will do our
              best to protect your personal information, transmission of personal information to and
              from our Services is at your own risk. You should only access the Services within a
              secure environment.
            </p>

            <Heading id="infominors">7. Do We Collect Information From Minors?</Heading>

            <InShort>
              We do not knowingly collect data from or market to children under 18 years of age.
            </InShort>

            <p className={`mb-6 ${blue}`}>
              We do not knowingly solicit data from or market to children under 18 years of age. By
              using the Services, you represent that you are at least 18 or that you are the parent
              or guardian of such a minor and consent to such minor dependent&rsquo;s use of the
              Services. If we learn that personal information from users less than 18 years of age
              has been collected, we will deactivate the account and take reasonable measures to
              promptly delete such data from our records. If you become aware of any data we may
              have collected from children under age 18, please contact us at
              john@agemanagementmed.com.
            </p>

            <Heading id="privacyrights">8. What Are Your Privacy Rights?</Heading>

            <InShort>You may review, change, or terminate your account at any time.</InShort>

            <p className={`mb-6 ${blue}`}>
              If you are located in the EEA or UK and you believe we are unlawfully processing your
              personal information, you also have the right to complain to your local data
              protection supervisory authority. You can find their contact details here:{' '}
              <a
                href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
                target="_blank"
                rel="noreferrer"
                className={linkCls}
              >
                https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
              </a>
              .
            </p>

            <p className={`mb-6 ${blue}`}>
              If you are located in Switzerland, the contact details for the data protection
              authorities are available here:{' '}
              <a
                href="https://www.edoeb.admin.ch/edoeb/en/home.html"
                target="_blank"
                rel="noreferrer"
                className={linkCls}
              >
                https://www.edoeb.admin.ch/edoeb/en/home.html
              </a>
              .
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">Withdrawing your consent:</strong>
              <span className={blue}>
                {' '}
                If we are relying on your consent to process your personal information, which may be
                express and/or implied consent depending on the applicable law, you have the right
                to withdraw your consent at any time. You can withdraw your consent at any time by
                contacting us by using the contact details provided in the section &ldquo;
                <a href="#contact-div" className={linkCls}>
                  HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </a>
                &rdquo; below.
              </span>
            </p>

            <p className={`mb-6 ${blue}`}>
              However, please note that this will not affect the lawfulness of the processing before
              its withdrawal nor, when applicable law allows, will it affect the processing of your
              personal information conducted in reliance on lawful processing grounds other than
              consent.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">
                Opting out of marketing and promotional communications:
              </strong>
              <span className={blue}>
                {' '}
                You can unsubscribe from our marketing and promotional communications at any time by
                clicking on the unsubscribe link in the emails that we send, replying &ldquo;
                STOP&rdquo; or &ldquo;UNSUBSCRIBE&rdquo; to the SMS messages that we send, or by
                contacting us using the details provided in the section &ldquo;
                <a href="#contact-div" className={linkCls}>
                  HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </a>
                &rdquo; below. You will then be removed from the marketing lists. However, we may
                still communicate with you &mdash; for example, to send you service-related messages
                that are necessary for the administration and use of your account, to respond to
                service requests, or for other non-marketing purposes.
              </span>
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">Account Information</strong>
            </p>

            <p className={`mb-6 ${blue}`}>
              If you would at any time like to review or change the information in your account or
              terminate your account, you can:
            </p>

            <Bullets items={['Log in to your account settings and update your user account.']} />

            <p className={`mb-6 ${blue}`}>
              Upon your request to terminate your account, we will deactivate or delete your account
              and information from our active databases. However, we may retain some information in
              our files to prevent fraud, troubleshoot problems, assist with any investigations,
              enforce our legal terms and/or comply with applicable legal requirements.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">Cookies and similar technologies:</strong>
              <span className={blue}>
                {' '}
                Most Web browsers are set to accept cookies by default. If you prefer, you can
                usually choose to set your browser to remove cookies and to reject cookies. If you
                choose to remove cookies or reject cookies, this could affect certain features or
                services of our Services. To opt out of interest-based advertising by advertisers on
                our Services visit{' '}
                <a
                  href="http://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noreferrer"
                  className={linkCls}
                >
                  http://www.aboutads.info/choices/
                </a>
                .
              </span>
            </p>

            <p className={`mb-6 ${blue}`}>
              If you have questions or comments about your privacy rights, you may email us at
              john@agemanagementmed.com.
            </p>

            <Heading id="DNT">9. Controls For Do-Not-Track Features</Heading>

            <p className={`mb-6 ${blue}`}>
              Most web browsers and some mobile operating systems and mobile applications include a
              Do-Not-Track (&ldquo;DNT&rdquo;) feature or setting you can activate to signal your
              privacy preference not to have data about your online browsing activities monitored
              and collected. At this stage no uniform technology standard for recognizing and
              implementing DNT signals has been finalized. As such, we do not currently respond to
              DNT browser signals or any other mechanism that automatically communicates your choice
              not to be tracked online. If a standard for online tracking is adopted that we must
              follow in the future, we will inform you about that practice in a revised version of
              this privacy notice.
            </p>

            <Heading id="caresidents">
              10. Do California Residents Have Specific Privacy Rights?
            </Heading>

            <InShort>
              Yes, if you are a resident of California, you are granted specific rights regarding
              access to your personal information.
            </InShort>

            <p className={`mb-6 ${blue}`}>
              California Civil Code Section 1798.83, also known as the &ldquo;Shine The Light&rdquo;
              law, permits our users who are California residents to request and obtain from us,
              once a year and free of charge, information about categories of personal information
              (if any) we disclosed to third parties for direct marketing purposes and the names and
              addresses of all third parties with which we shared personal information in the
              immediately preceding calendar year. If you are a California resident and would like
              to make such a request, please submit your request in writing to us using the contact
              information provided below.
            </p>

            <p className={`mb-6 ${blue}`}>
              If you are under 18 years of age, reside in California, and have a registered account
              with Services, you have the right to request removal of unwanted data that you
              publicly post on the Services. To request removal of such data, please contact us
              using the contact information provided below and include the email address associated
              with your account and a statement that you reside in California. We will make sure the
              data is not publicly displayed on the Services, but please be aware that the data may
              not be completely or comprehensively removed from all our systems (e.g., backups,
              etc.).
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">CCPA Privacy Notice</strong>
            </p>

            <p className={`mb-6 ${blue}`}>
              The California Code of Regulations defines a &ldquo;resident&rdquo; as:
            </p>

            <ol className={`mb-6 list-decimal space-y-2 pl-6 ${blue}`}>
              <li>
                every individual who is in the State of California for other than a temporary or
                transitory purpose and
              </li>
              <li>
                every individual who is domiciled in the State of California who is outside the
                State of California for a temporary or transitory purpose
              </li>
              <li>All other individuals are defined as &ldquo;non-residents.&rdquo;</li>
            </ol>

            <p className={`mb-6 ${blue}`}>
              If this definition of &ldquo;resident&rdquo; applies to you, we must adhere to certain
              rights and obligations regarding your personal information.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">
                What categories of personal information do we collect?
              </strong>
            </p>

            <p className={`mb-6 ${blue}`}>
              We have collected the following categories of personal information in the past twelve
              (12) months:
            </p>

            <div className="mb-8 -mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0">
              <table className="w-full min-w-[620px] border-collapse text-left text-[14px] leading-[1.6]">
                <thead>
                  <tr className="bg-haze">
                    <th className="w-[30%] px-4 py-4 align-top font-sans font-bold text-navy">
                      Category
                    </th>
                    <th className="px-4 py-4 align-top font-sans font-bold text-navy">Examples</th>
                    <th className="w-[15%] px-4 py-4 text-center align-top font-sans font-bold text-navy">
                      Collected
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ccpaCategories.map(([category, examples, collected], index) => (
                    <tr key={category} className={index % 2 === 1 ? 'bg-haze' : 'bg-white'}>
                      <td className={`px-4 py-4 align-top ${blue}`}>{category}</td>
                      <td className={`px-4 py-4 align-top ${blue}`}>{examples}</td>
                      <td className="px-4 py-4 text-center align-middle text-ink">{collected}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className={`mb-6 ${blue}`}>
              We will use and retain the collected personal information as needed to provide the
              Services or for:
            </p>

            <Bullets
              items={[
                'Category A - 6 months',
                'Category B - 6 months',
                'Category C - 6 months',
                'Category D - 6 months',
                'Category F - 6 months',
              ]}
            />

            <p className={`mb-6 ${blue}`}>
              We may also collect other personal information outside of these categories through
              instances where you interact with us in person, online, or by phone or mail in the
              context of:
            </p>

            <Bullets
              items={[
                'Receiving help through our customer support channels;',
                'Participation in customer surveys or contests; and',
                'Facilitation in the delivery of our Services and to respond to your inquiries.',
              ]}
            />

            <p className="mb-6">
              <strong className="font-bold text-navy">
                How do we use and share your personal information?
              </strong>
            </p>

            <p className={`mb-6 ${blue}`}>
              Savannah Age Management Medicine collects and shares your personal information through:
            </p>

            <Bullets items={['Beacons/Pixels/Tags']} />

            <p className={`mb-6 ${blue}`}>
              More information about our data collection and sharing practices can be found in this
              privacy notice.
            </p>

            <p className={`mb-6 ${blue}`}>
              You may contact us by visiting{' '}
              <Link href="/contact-us" className={linkCls}>
                https://agemanagementmed.com/contact-us/
              </Link>
              , or by referring to the contact details at the bottom of this document.
            </p>

            <p className={`mb-6 ${blue}`}>
              If you are using an authorized agent to exercise your right to opt out we may deny a
              request if the authorized agent does not submit proof that they have been validly
              authorized to act on your behalf.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">
                Will your information be shared with anyone else?
              </strong>
            </p>

            <p className={`mb-6 ${blue}`}>
              We may disclose your personal information with our service providers pursuant to a
              written contract between us and each service provider. Each service provider is a
              for-profit entity that processes the information on our behalf, following the same
              strict privacy protection obligations mandated by the CCPA.
            </p>

            <p className={`mb-6 ${blue}`}>
              We may use your personal information for our own business purposes, such as for
              undertaking internal research for technological development and demonstration. This is
              not considered to be &ldquo;selling&rdquo; of your personal information.
            </p>

            <p className={`mb-6 ${blue}`}>
              Savannah Age Management Medicine has not sold or shared any personal information to
              third parties for a business or commercial purpose in the preceding twelve (12)
              months. Savannah Age Management Medicine has disclosed the following categories of
              personal information to third parties for a business or commercial purpose in the
              preceding twelve (12) months:
            </p>

            <p className={`mb-6 ${blue}`}>
              The categories of third parties to whom we disclosed personal information for a
              business or commercial purpose can be found under &ldquo;
              <a href="#whoshare" className={linkCls}>
                WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
              </a>
              &rdquo;.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">
                Your rights with respect to your personal data
              </strong>
            </p>

            <p className={`mb-6 ${blue}`}>
              Right to request deletion of the data &mdash; Request to delete
            </p>

            <p className={`mb-6 ${blue}`}>
              You can ask for the deletion of your personal information. If you ask us to delete
              your personal information, we will respect your request and delete your personal
              information, subject to certain exceptions provided by law, such as (but not limited
              to) the exercise by another consumer of his or her right to free speech, our
              compliance requirements resulting from a legal obligation, or any processing that may
              be required to protect against illegal activities.
            </p>

            <p className={`mb-6 ${blue}`}>Right to be informed &mdash; Request to know</p>

            <p className={`mb-6 ${blue}`}>
              Depending on the circumstances, you have a right to know:
            </p>

            <Bullets
              items={[
                'whether we collect and use your personal information;',
                'the categories of personal information that we collect;',
                'the purposes for which the collected personal information is used;',
                'whether we sell or share personal information to third parties;',
                'the categories of personal information that we sold, shared, or disclosed for a business purpose;',
                'the categories of third parties to whom the personal information was sold, shared, or disclosed for a business purpose;',
                'the business or commercial purpose for collecting, selling, or sharing personal information; and',
                'the specific pieces of personal information we collected about you.',
              ]}
            />

            <p className={`mb-6 ${blue}`}>
              In accordance with applicable law, we are not obligated to provide or delete consumer
              information that is de-identified in response to a consumer request or to re-identify
              individual data to verify a consumer request.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">
                Right to Non-Discrimination for the Exercise of a Consumer&rsquo;s Privacy Rights
              </strong>
            </p>

            <p className={`mb-6 ${blue}`}>
              We will not discriminate against you if you exercise your privacy rights.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">
                Right to Limit Use and Disclosure of Sensitive Personal Information
              </strong>
            </p>

            <p className={`mb-6 ${blue}`}>
              We do not process consumer&rsquo;s sensitive personal information.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">Verification process</strong>
            </p>

            <p className={`mb-6 ${blue}`}>
              Upon receiving your request, we will need to verify your identity to determine you are
              the same person about whom we have the information in our system. These verification
              efforts require us to ask you to provide information so that we can match it with
              information you have previously provided us. For instance, depending on the type of
              request you submit, we may ask you to provide certain information so that we can match
              the information you provide with the information we already have on file, or we may
              contact you through a communication method (e.g., phone or email) that you have
              previously provided to us. We may also use other verification methods as the
              circumstances dictate.
            </p>

            <p className={`mb-6 ${blue}`}>
              We will only use personal information provided in your request to verify your identity
              or authority to make the request. To the extent possible, we will avoid requesting
              additional information from you for the purposes of verification. However, if we
              cannot verify your identity from the information already maintained by us, we may
              request that you provide additional information for the purposes of verifying your
              identity and for security or fraud-prevention purposes. We will delete such
              additionally provided information as soon as we finish verifying you.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">Other privacy rights</strong>
            </p>

            <Bullets
              items={[
                'You may object to the processing of your personal information.',
                'You may request correction of your personal data if it is incorrect or no longer relevant, or ask to restrict the processing of the information.',
                'You can designate an authorized agent to make a request under the CCPA on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with the CCPA.',
                'You may request to opt out from future selling or sharing of your personal information to third parties. Upon receiving an opt-out request, we will act upon the request as soon as feasibly possible, but no later than fifteen (15) days from the date of the request submission.',
              ]}
            />

            <p className={`mb-6 ${blue}`}>
              To exercise these rights, you can contact us by visiting{' '}
              <Link href="/contact-us" className={linkCls}>
                https://agemanagementmed.com/contact-us/
              </Link>
              , or by referring to the contact details at the bottom of this document. If you have a
              complaint about how we handle your data, we would like to hear from you.
            </p>

            <Heading id="virginia">11. Do Virginia Residents Have Specific Privacy Rights?</Heading>

            <InShort>
              Yes, if you are a resident of Virginia, you may be granted specific rights regarding
              access to and use of your personal information.
            </InShort>

            <p className="mb-6">
              <strong className="font-bold text-navy">Virginia CDPA Privacy Notice</strong>
            </p>

            <p className={`mb-6 ${blue}`}>
              Under the Virginia Consumer Data Protection Act (CDPA):
            </p>

            <p className={`mb-6 ${blue}`}>
              &ldquo;Consumer&rdquo; means a natural person who is a resident of the Commonwealth
              acting only in an individual or household context. It does not include a natural
              person acting in a commercial or employment context.
            </p>

            <p className={`mb-6 ${blue}`}>
              &ldquo;Personal data&rdquo; means any information that is linked or reasonably
              linkable to an identified or identifiable natural person. &ldquo;Personal data&rdquo;
              does not include de-identified data or publicly available information.
            </p>

            <p className={`mb-6 ${blue}`}>
              &ldquo;Sale of personal data&rdquo; means the exchange of personal data for monetary
              consideration.
            </p>

            <p className={`mb-6 ${blue}`}>
              If this definition &ldquo;consumer&rdquo; applies to you, we must adhere to certain
              rights and obligations regarding your personal data.
            </p>

            <p className={`mb-6 ${blue}`}>
              The information we collect, use, and disclose about you will vary depending on how you
              interact with Savannah Age Management Medicine and our Services. To find out more,
              please visit the following links:
            </p>

            <ul className={`mb-6 list-disc space-y-2 pl-6 ${blue}`}>
              <li>
                <a href="#infocollect" className={linkCls}>
                  Personal data we collect
                </a>
              </li>
              <li>
                <a href="#infouse" className={linkCls}>
                  How we use your personal data
                </a>
              </li>
              <li>
                <a href="#whoshare" className={linkCls}>
                  When and with whom we share your personal data
                </a>
              </li>
            </ul>

            <p className={`mb-6 ${blue}`}>Your rights with respect to your personal data</p>

            <Bullets
              items={[
                'Right to be informed whether or not we are processing your personal data',
                'Right to access your personal data',
                'Right to correct inaccuracies in your personal data',
                'Right to request deletion of your personal data',
                'Right to obtain a copy of the personal data you previously shared with us',
                'Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects ("profiling")',
              ]}
            />

            <p className={`mb-6 ${blue}`}>
              Savannah Age Management Medicine has not sold any personal data to third parties for
              business or commercial purposes. Savannah Age Management Medicine will not sell
              personal data in the future belonging to website visitors, users, and other consumers.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">
                Exercise your rights provided under the Virginia CDPA
              </strong>
            </p>

            <p className={`mb-6 ${blue}`}>
              More information about our data collection and sharing practices can be found in this
              privacy notice.
            </p>

            <p className={`mb-6 ${blue}`}>
              You may contact us by email at john@agemanagementmed.com, by visiting{' '}
              <Link href="/contact-us" className={linkCls}>
                https://agemanagementmed.com/contact-us/
              </Link>
              , or by referring to the contact details at the bottom of this document.
            </p>

            <p className={`mb-6 ${blue}`}>
              If you are using an authorized agent to exercise your rights, we may deny a request if
              the authorized agent does not submit proof that they have been validly authorized to
              act on your behalf.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">Verification process</strong>
            </p>

            <p className={`mb-6 ${blue}`}>
              We may request that you provide additional information reasonably necessary to verify
              you and your consumer&rsquo;s request. If you submit the request through an authorized
              agent, we may need to collect additional information to verify your identity before
              processing your request.
            </p>

            <p className={`mb-6 ${blue}`}>
              Upon receiving your request, we will respond without undue delay, but in all cases,
              within forty-five (45) days of receipt. The response period may be extended once by
              forty-five (45) additional days when reasonably necessary. We will inform you of any
              such extension within the initial 45-day response period, together with the reason for
              the extension.
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">Right to appeal</strong>
            </p>

            <p className={`mb-6 ${blue}`}>
              If we decline to take action regarding your request, we will inform you of our
              decision and reasoning behind it. If you wish to appeal our decision, please email us
              at john@agemanagementmed.com. Within sixty (60) days of receipt of an appeal, we will
              inform you in writing of any action taken or not taken in response to the appeal,
              including a written explanation of the reasons for the decisions. If your appeal if
              denied, you may contact the Attorney General to{' '}
              <a
                href="https://www.oag.state.va.us/consumer-protection/index.php/file-a-complaint"
                target="_blank"
                rel="noreferrer"
                className={linkCls}
              >
                submit a complaint
              </a>
              .
            </p>

            <Heading id="policyupdates">12. Do We Make Updates To This Notice?</Heading>

            <InShort>
              Yes, we will update this notice as necessary to stay compliant with relevant laws.
            </InShort>

            <p className={`mb-6 ${blue}`}>
              We may update this privacy notice from time to time. The updated version will be
              indicated by an updated &ldquo;Revised&rdquo; date and the updated version will be
              effective as soon as it is accessible. If we make material changes to this privacy
              notice, we may notify you either by prominently posting a notice of such changes or by
              directly sending you a notification. We encourage you to review this privacy notice
              frequently to be informed of how we are protecting your information.
            </p>

            <Heading id="contact-div">13. How Can You Contact Us About This Notice?</Heading>

            <p className={`mb-6 ${blue}`}>
              If you have questions or comments about this notice, you may email us at
              john@agemanagementmed.com or by post to:
            </p>

            <p className="mb-6">
              <strong className="font-bold text-navy">Savannah Age Management Medicine</strong>
              <br />
              <em>ATTN: Savannah Age Management Medicine</em>
              <br />
              200 Blue Moon Xing
              <br />
              Suite 102
              <br />
              Pooler, GA 31322
              <br />
              United States
            </p>

            <Heading id="request">
              14. How Can You Review, Update, Or Delete The Data We Collect From You?
            </Heading>

            <p className={`mb-6 ${blue}`}>
              Based on the applicable laws of your country, you may have the right to request access
              to the personal information we collect from you, change that information, or delete
              it. To request to review, update, or delete your personal information, please visit:{' '}
              <Link href="/contact-us" className={linkCls}>
                https://agemanagementmed.com/contact-us/
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
