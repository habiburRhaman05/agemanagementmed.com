import React from "react";

type FAQ = {
  question: string;
  answer: string;
};

type JourneyStep = {
  title: string;
  description: string;
};

type ServiceSheet = {
  title: string;
  internalReference: string;
  tagline: string;
  description: string[];
  benefits: string[];
  idealCandidates: string;
  symptoms: string[];
  journey: JourneyStep[];
  features: string[];
  faqs: FAQ[];
  compliance: string[];
  voiceTone: string;
};

const SectionTitle = ({
  number,
  title,
}: {
  number: string;
  title: string;
}) => (
  <h3 className="section-title">
    {number}. {title}
  </h3>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="content-list">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

const ServiceSheetComponent = ({
  service,
}: {
  service: ServiceSheet;
}) => {
  return (
    <section className="service-sheet">
      <h2 className="service-title">{service.title}</h2>

      <SectionTitle number="1" title="Internal Reference" />
      <p className="internal-reference">{service.internalReference}</p>

      <SectionTitle number="2" title="Elevator Tagline (≤ 20 words)" />
      <p>{service.tagline}</p>

      <SectionTitle
        number="3"
        title="Short Description (customer-facing, 2 paragraphs)"
      />

      {service.description.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}

      <SectionTitle number="4" title="Key Benefits" />
      <BulletList items={service.benefits} />

      <SectionTitle number="5" title="Ideal Candidates" />
      <p>{service.idealCandidates}</p>

      <SectionTitle
        number="6"
        title="Typical Symptoms / Signs That Trigger Inquiry"
      />
      <BulletList items={service.symptoms} />

      <SectionTitle number="7" title="3-Step Patient Journey (scriptable)" />

      <ol className="journey-list">
        {service.journey.map((step, index) => (
          <li key={index}>
            <strong>{step.title}</strong> – {step.description}
          </li>
        ))}
      </ol>

      <SectionTitle number="8" title="Program Features" />
      <BulletList items={service.features} />

      <SectionTitle
        number="9"
        title="Frequently Asked Questions (concise answers)"
      />

      <div className="faq-list">
        {service.faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <strong>{faq.question}</strong>
            <span> {faq.answer}</span>
          </div>
        ))}
      </div>

      <SectionTitle number="10" title="Compliance & Guardrails" />
      <BulletList items={service.compliance} />

      <SectionTitle number="11" title="Voice / Tone Guidelines" />
      <p>{service.voiceTone}</p>
    </section>
  );
};

const LeadIntakeTriage = () => {
  const services: ServiceSheet[] = [
    {
      title: "SERVICE SHEET – Bioidentical Hormone Replacement Therapy (BHRT)",
      internalReference: "service_bhrt_savannah_age_mgmt_2025_05_26",
      tagline:
        "Rebalance hormones for men & women so you regain energy, mood stability, libido, and youthful vitality.",
      description: [
        "Bioidentical Hormone Replacement Therapy (BHRT) uses plant-derived hormones that are molecularly identical to those your body naturally makes. By precisely restoring testosterone, estrogen, progesterone, and related hormones to optimal—not just normal—levels, BHRT can relieve age-related fatigue, weight gain, low libido, hot flashes, and sleep or mood issues.",
        "At Savannah Age Management Medicine, every plan begins with in-depth lab work and a one-on-one consult. We tailor dosing via self-administered injections (no pellets) and monitor labs regularly, adjusting as you progress to ensure lasting results.",
      ],
      benefits: [
        "Boost sustained daily energy",
        "Enhance libido & overall sexual wellness",
        "Improve mood stability & mental clarity",
        "Support healthy weight management & muscle tone",
        "Reduce hot flashes / night sweats",
        "Promote deeper, uninterrupted sleep",
      ],
      idealCandidates:
        "Men or women 30+ who experience persistent fatigue, stubborn weight gain, low sex drive, brain fog, mood swings, sleep disturbance, or diminished workout recovery.",
      symptoms: [
        "Fatigue",
        "Low libido",
        "Hot flashes",
        "Night sweats",
        "Unwanted weight gain",
        "Irritability or depression",
        "Insomnia",
        "Muscle loss",
      ],
      journey: [
        {
          title: "Consult & Symptom Review",
          description: "Virtual or in-office chat with our BHRT specialist.",
        },
        {
          title: "Lab-Based Baseline",
          description:
            "Comprehensive blood work to map current hormone levels.",
        },
        {
          title: "Custom Plan & Coaching",
          description:
            "Receive tailored prescriptions, injection training, and scheduled follow-ups.",
        },
      ],
      features: [
        "Includes provider consults, body-composition scans, fitness & nutrition guidance",
        "Lab work often billable to insurance; medications may not be",
        "Active BHRT patients get 10% off other clinic services",
      ],
      faqs: [
        {
          question: "How soon will I feel better?",
          answer: "Early improvements in 2–3 weeks; full benefits in 3–6 months.",
        },
        {
          question: "Pellets or injections?",
          answer: "We use injections—less invasive and easier to titrate than pellets.",
        },
        {
          question: "Will my insurance cover this?",
          answer: "Most cover labs; many do not cover hormone medications.",
        },
        {
          question: "Do I need weekly office visits?",
          answer: "No—after initial training you self-inject at home.",
        },
        {
          question: "Primary-care replacement?",
          answer: "We complement, but do not replace, your primary physician.",
        },
        {
          question: "Discounts on other services?",
          answer: "Yes—10% off while you're an active BHRT patient.",
        },
      ],
      compliance: [
        "Do not provide individual medical advice, prescriptions, or dosing over chat.",
        "Always advise patients to maintain a relationship with their PCP for chronic conditions.",
        'Redirect price-specific questions to: "Our team will outline exact costs during your consult."',
        "Include HIPAA disclaimer on lead forms and remind users they can opt out of SMS at any time.",
        "If asked about side-effects, respond with general risks and recommend discussing them with a provider.",
      ],
      voiceTone:
        "Warm, empowering, and data-informed. Use second-person language. Avoid scare tactics and emphasize partnership, personalization, and evidence-based care.",
    },

    {
      title: "SERVICE SHEET – Platelet-Rich Plasma Therapy (PRP)",
      internalReference: "service_prp_savannah_age_mgmt_2025_05_26",
      tagline:
        "Harness your own platelets to accelerate healing, relieve pain, and restore mobility—without surgery or opioids.",
      description: [
        "Platelet-Rich Plasma (PRP) therapy concentrates the growth-factor-rich platelets from a small sample of your blood and injects them precisely into damaged joints or soft-tissue injuries. The growth factors jump-start tissue repair, dampen inflammation, and encourage new collagen production for lasting relief.",
        "At Savannah Age Management Medicine, PRP is performed entirely in-office. We draw your blood, process it, then deliver the platelet concentrate with ultrasound guidance for pinpoint accuracy.",
      ],
      benefits: [
        "Drug-free relief from chronic or acute pain",
        "Stimulates tissue regeneration",
        "Minimally invasive",
        "Ultrasound-guided for safety & precision",
        "Little downtime",
        "Can support treatment for joints, tendons, ligaments, and other concerns",
      ],
      idealCandidates:
        "Adults with persistent joint or tendon pain, sports injuries, early-stage arthritis, or partial muscle or meniscus tears who want a regenerative alternative.",
      symptoms: [
        "Knee or shoulder pain",
        "Tennis elbow",
        "Plantar fasciitis",
        "Wrist pain",
        "Tendonitis",
        "Limited range of motion",
        "Post-injury swelling",
        "Early osteoarthritis",
      ],
      journey: [
        {
          title: "Consult & Assessment",
          description: "Exam and imaging review to confirm PRP suitability.",
        },
        {
          title: "Blood Draw & Processing",
          description: "Processing isolates high-concentration platelets.",
        },
        {
          title: "Ultrasound-Guided Injection & Follow-ups",
          description:
            "Targeted delivery followed by scheduled progress check-ins.",
        },
      ],
      features: [
        "60- to 90-minute visit start-to-finish",
        "No general anesthesia; local numbing only",
        "Financing available via PatientFi",
        "Active PRP patients receive 10% off additional clinic services",
        "Combined protocols may be available",
      ],
      faqs: [
        {
          question: "What can PRP treat?",
          answer:
            "Sports injuries, tendonitis, arthritis, meniscus or cartilage damage, and more.",
        },
        {
          question: "Is it safe?",
          answer:
            "Uses your own blood; your provider can review individual suitability and risks.",
        },
        {
          question: "When will I feel better?",
          answer:
            "Improvement may develop gradually over the following weeks.",
        },
        {
          question: "How many sessions?",
          answer: "Usually 1–3, depending on provider guidance.",
        },
        {
          question: "Any downtime?",
          answer:
            "Mild tenderness and limited motion may occur temporarily.",
        },
        {
          question: "Insurance coverage?",
          answer:
            "Labs may sometimes be billable; injections are often self-pay.",
        },
      ],
      compliance: [
        "Do not offer individual medical advice, diagnosis, or pricing via chat.",
        "Advise patients to consult their PCP for complex medical histories.",
        "Avoid definitive guarantees; emphasize that individual results vary.",
        "If asked about risks, provide general information and recommend discussing individual risks with a provider.",
      ],
      voiceTone:
        "Supportive, confidence-building, and science-forward. Use plain language, second-person communication, and empowerment-focused messaging.",
    },

    {
      title:
        "SERVICE SHEET – Sexual Performance & Rejuvenation Therapies",
      internalReference:
        "service_sexual_rejuvenation_savannah_age_mgmt_2025_05_26",
      tagline:
        "Drug-free, non-surgical therapies that support libido, sexual wellness, and intimate confidence for men and women.",
      description: [
        "Our Sexual Performance & Rejuvenation program blends regenerative medicine with hormone optimization to address concerns related to libido, sexual performance, vaginal dryness, and stamina.",
        "Treatment options may include PRP, low-intensity shock-wave therapy, BHRT, and other provider-directed approaches following a private consultation.",
      ],
      benefits: [
        "Supports libido and arousal response",
        "May improve erectile firmness and stamina",
        "Supports vaginal lubrication & sensitivity",
        "Non-surgical, in-office treatment options",
        "Minimal downtime for many treatments",
        "Addresses hormones, blood flow, and confidence",
      ],
      idealCandidates:
        "Men or women 30+ experiencing low sex drive, erectile concerns, vaginal dryness, decreased pleasure, or performance-related confidence concerns.",
      symptoms: [
        "Low libido",
        "Erectile dysfunction",
        "Reduced stamina",
        "Vaginal dryness or discomfort",
        "Difficulty achieving orgasm",
        "Performance anxiety",
      ],
      journey: [
        {
          title: "Confidential Consult",
          description: "Symptom review, medical history, and lab work if needed.",
        },
        {
          title: "Personalized Treatment Plan",
          description:
            "Selection of appropriate therapies based on provider evaluation.",
        },
        {
          title: "Progress Check-ins",
          description:
            "Follow-ups to monitor progress and adjust protocols when appropriate.",
        },
      ],
      features: [
        "In-office PRP and shock-wave sessions",
        "Self-administered or in-clinic BHRT options",
        "Provider guidance for appropriate treatment options",
        "Financing may be available",
        "Active program members may receive clinic service discounts",
      ],
      faqs: [
        {
          question: "What treatments are available?",
          answer:
            "Options may include PRP, BHRT, shock-wave therapy, and other provider-directed treatments.",
        },
        {
          question: "Are these therapies risky?",
          answer:
            "Your provider reviews treatment suitability, risks, and benefits before treatment.",
        },
        {
          question: "Who qualifies?",
          answer:
            "Eligibility is determined through an individual provider consultation.",
        },
        {
          question: "When will I notice results?",
          answer:
            "Timing varies depending on the treatment and individual factors.",
        },
        {
          question: "Is there downtime?",
          answer:
            "Downtime varies by treatment; your provider will explain what to expect.",
        },
        {
          question: "Insurance coverage?",
          answer:
            "Many therapies are elective or self-pay; exact costs are reviewed during consultation.",
        },
      ],
      compliance: [
        "No individual medical advice or dosing via chat.",
        "Use neutral and inclusive language.",
        'Redirect price specifics to: "Your provider will outline costs during your consult."',
        "For risk questions, provide general information and recommend medical clearance or provider discussion.",
        "Display HIPAA and SMS opt-out notices where applicable.",
      ],
      voiceTone:
        "Warm, discreet, confidence-building, and science-informed. Focus on empowerment and partnership while avoiding sensational or explicit wording.",
    },

    {
      title: "SERVICE SHEET – Concierge Medical Weight Loss",
      internalReference:
        "service_concierge_weight_loss_savannah_age_mgmt_2025_05_26",
      tagline:
        "Personalized, concierge-level coaching and provider-guided protocols for sustainable fat loss, higher energy, and long-term metabolic health.",
      description: [
        "Our Concierge Medical Weight Loss program addresses factors that may affect weight, including hormones, nutrition, habits, and lifestyle. Plans may include provider-guided medication options and one-on-one coaching.",
        "Following a consultation and appropriate evaluation, patients receive a customized nutrition and exercise roadmap, prescription support when appropriate, and regular check-ins.",
      ],
      benefits: [
        "Provider-guided weight management protocols",
        "Tailored nutrition, exercise, and lifestyle coaching",
        "Regular support and progress monitoring",
        "Mindset support around food and fitness",
        "Focus on energy, mood, and metabolic health",
      ],
      idealCandidates:
        "Adults who have struggled with yo-yo dieting, metabolic concerns, or weight-related health issues and want a medically supervised, customized approach.",
      symptoms: [
        "Stubborn weight gain",
        "Frequent cravings",
        "Low energy",
        "Joint discomfort",
        "Elevated blood sugar or blood pressure",
        "Prior diet failure",
      ],
      journey: [
        {
          title: "Comprehensive Consult & Labs",
          description:
            "Medical history, lifestyle review, and baseline testing when appropriate.",
        },
        {
          title: "Custom Plan & Medication On-Ramp",
          description:
            "Personalized nutrition, exercise, coaching, and medication support when appropriate.",
        },
        {
          title: "Weekly Check-Ins & Adjustments",
          description:
            "Progress reviews and ongoing plan adjustments.",
        },
      ],
      features: [
        "Provider-guided medication options",
        "Body-composition and metabolic tracking",
        "Coaching support between visits",
        "Financing options may be available",
        "Optional BHRT evaluation when clinically appropriate",
      ],
      faqs: [
        {
          question: "How soon will I lose weight?",
          answer:
            "Progress varies; your provider and care team will discuss realistic expectations.",
        },
        {
          question: "Do I have to use injections?",
          answer:
            "Treatment recommendations depend on your individual plan and provider evaluation.",
        },
        {
          question: "Side effects?",
          answer:
            "Your provider will review medication risks, side effects, and suitability.",
        },
        {
          question: "Will the weight stay off?",
          answer:
            "Long-term success depends on individual factors, habits, and ongoing support.",
        },
        {
          question: "Insurance?",
          answer:
            "Coverage varies; your provider will outline exact costs during consultation.",
        },
      ],
      compliance: [
        "Do not dispense individual medical advice, dosing, or pricing via chat.",
        "For medication risk questions, provide general information and emphasize provider oversight.",
        'Direct price questions to: "Your provider will outline exact costs in your consultation."',
        "Remind users to maintain a primary-care relationship for chronic conditions.",
        'HIPAA notice and SMS opt-out language such as "Reply STOP" should accompany applicable forms and messages.',
      ],
      voiceTone:
        "Encouraging, partnership-oriented, and evidence-based. Highlight empowerment and sustainability while avoiding shaming language.",
    },
  ];

  return (
    <main className="lead-intake-page">
    

      <section className="lead-intake-section">
        <h1>General Lead-Intake & Triage</h1>

        <SectionTitle number="1" title="Primary Objective" />

        <BulletList
          items={[
            "Warmly acknowledge the visitor and build trust.",
            "Gather the minimum scheduling info (preferred time, phone/email).",
            "Answer common questions using the specific Service Sheets.",
            "Escalate or promise follow-up within the same chat when the answer is not in the knowledge base.",
          ]}
        />

        <SectionTitle number="2" title="Standard Opening Script" />

        <div className="script-box">
          <p>
            Hi {"{FIRST NAME}"}, thank you for reaching out to Savannah Age
            Management Medicine!
          </p>

          <p>
            I'd love to get you scheduled with a provider who can answer all of
            your questions about our clinic and the services you're interested
            in. Is there a good time for a brief call today?
          </p>
        </div>

        <SectionTitle
          number="3"
          title="Data to Collect (in friendly, conversational order)"
        />

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Example Prompt</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <strong>Preferred call time</strong>
                </td>
                <td>
                  “Great! What time works best for you today or tomorrow?”
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Phone number</strong>
                </td>
                <td>“Which number should we call you on?”</td>
              </tr>

              <tr>
                <td>
                  <strong>Email (optional)</strong>
                </td>
                <td>
                  “And if we need to send any forms, which email do you prefer?”
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Primary service interest</strong>
                </td>
                <td>
                  “Are you mainly curious about BHRT, weight loss, or another
                  service?”
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Top concern / goal</strong>
                </td>
                <td>“What's the main result you hope to achieve?”</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="note">
          Stop collecting once the person seems impatient; the human team can
          fill gaps later.
        </p>

        <SectionTitle number="5" title="Answer-Then-Escalate Logic" />

        <ol className="logic-list">
          <li>
            <strong>Check knowledge base</strong> (BHRT, PRP, Sexual
            Rejuvenation, Weight Loss sheets).
          </li>

          <li>
            <strong>If answer found</strong> → Respond concisely (≤ 3
            sentences) and finish with:
            <em>
              “Does that help, or would you like me to have our team explain in
              more detail on your call?”
            </em>
          </li>

          <li>
            <strong>If answer not found</strong> → Respond:
            <em>
              “That's a great question. I'm going to flag it for one of our
              providers—someone from the office will reach out shortly with the
              details.”
            </em>
          </li>
        </ol>

        <SectionTitle number="7" title="Brand Voice & Tone" />

        <BulletList
          items={[
            "Friendly, knowledgeable, and empowering—never pushy.",
            'Second-person language (“you”).',
            "Avoid medical jargon unless the user initiates it.",
            "Never diagnose or prescribe; always defer clinical specifics to the provider.",
          ]}
        />

        <SectionTitle number="8" title="Compliance & Guardrails" />

        <BulletList
          items={[
            "No medical advice or individualized dosing.",
            'No pricing quotes—use: “Your provider will outline exact costs during your consultation.”',
            "HIPAA caution: Remind users not to share sensitive medical details in chat.",
            'Opt-out reminder on SMS: “Reply STOP to unsubscribe.”',
            "Escalate urgent health concerns appropriately.",
          ]}
        />
      </section>

      {/* =========================
          SERVICE SHEETS
      ========================== */}

      <div className="service-sheets">
        {services.map((service) => (
          <ServiceSheetComponent
            key={service.internalReference}
            service={service}
          />
        ))}
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .lead-intake-page {
          width: 100%;
          min-height: 100vh;
          background: #f7f7f7;
          color: #1f2937;
          padding: 48px 24px 100px;
          font-family: Arial, sans-serif;
        }

        .lead-intake-section,
        .service-sheet {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto 48px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 42px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
        }

        .lead-intake-section h1 {
          margin: 0 0 36px;
          font-family: Georgia, serif;
          font-size: clamp(32px, 4vw, 52px);
          color: #172033;
        }

        .service-title {
          margin: 0 0 38px;
          font-family: Georgia, serif;
          font-size: clamp(26px, 3vw, 38px);
          line-height: 1.25;
          color: #172033;
          padding-bottom: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .section-title {
          margin: 34px 0 14px;
          font-size: 19px;
          font-weight: 700;
          color: #172033;
        }

        p {
          margin: 0 0 16px;
          font-size: 16px;
          line-height: 1.7;
        }

        .internal-reference {
          display: inline-block;
          padding: 8px 12px;
          background: #f3f4f6;
          border-radius: 6px;
          font-family: monospace;
          font-size: 14px;
        }

        .content-list,
        .journey-list,
        .logic-list {
          margin: 0;
          padding-left: 24px;
        }

        .content-list li,
        .journey-list li,
        .logic-list li {
          margin-bottom: 10px;
          font-size: 16px;
          line-height: 1.6;
        }

        .script-box {
          padding: 22px;
          border-left: 4px solid #5b9099;
          background: #f8fafc;
          border-radius: 8px;
        }

        .script-box p:last-child {
          margin-bottom: 0;
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
        }

        table {
          width: 100%;
          min-width: 650px;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 16px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
          font-size: 15px;
        }

        th {
          background: #172033;
          color: #ffffff;
        }

        tbody tr:last-child td {
          border-bottom: 0;
        }

        .note {
          margin-top: 16px;
          font-style: italic;
          color: #6b7280;
        }

        .logic-list li {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 18px;
        }

        .logic-list em {
          color: #4b5563;
        }

        .faq-list {
          display: grid;
          gap: 12px;
        }

        .faq-item {
          padding: 16px 18px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background: #fafafa;
          line-height: 1.6;
        }

        .service-sheets {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        @media (max-width: 768px) {
          .lead-intake-page {
            padding: 20px 14px 60px;
          }

          .lead-intake-section,
          .service-sheet {
            padding: 24px 20px;
            border-radius: 12px;
          }

          .section-title {
            font-size: 18px;
          }

          p,
          .content-list li,
          .journey-list li,
          .logic-list li {
            font-size: 15px;
          }
        }
      `}</style>
    </main>
  );
};

export default LeadIntakeTriage;