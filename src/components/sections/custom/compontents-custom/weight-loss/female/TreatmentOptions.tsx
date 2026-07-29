import React from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";

/**
 * Central icon registry — add new entries here and reference them by
 * name anywhere in the app instead of importing lucide icons ad hoc.
 */
const ICONS: Record<string, LucideIcon> = {
  bullet: ArrowRight,
};

type IconName = keyof typeof ICONS;

function getIcon(name: IconName): LucideIcon {
  return ICONS[name] ?? ArrowRight;
}

const BulletIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => {
  const LucideIcon = getIcon("bullet");
  return <LucideIcon className={className} strokeWidth={2} />;
};

interface TreatmentData {
  image: string;
  imageBg?: string;
  title: string;
  description: string;
  label: string;
  bullets: string[];
  cta?: { text: string; href: string };
  dark?: boolean;
}

const treatments: TreatmentData[] = [
  {
    image:
      "https://www.agemanagementmed.com/themes/default/assets/images/column-box-14-img.png",
    title: "Laser Vaginal Rejuvenation (CO2 Laser)",
    description:
      "Laser vaginal rejuvenation uses fractional CO2 laser energy to stimulate collagen production and restore the structure of vaginal tissue.",
    label: "This treatment may help improve:",
    bullets: [
      "Vaginal dryness and thinning tissue",
      "Pain during intercourse",
      "Vaginal laxity",
      "Mild stress urinary incontinence",
    ],
    cta: { text: "Learn more", href: "/laser-vaginal-therapy/" },
    dark: true,
  },
  {
    image:
      "https://www.agemanagementmed.com/themes/default/assets/images/column-box-12-img.png",
    imageBg: "bg-[#A9B979]",
    title: "Bioidentical Hormone Replacement Therapy (BHRT)",
    description:
      "Hormonal fluctuations during perimenopause and menopause can impact libido, energy levels, and vaginal health.",
    label: "BHRT may help:",
    bullets: [
      "Improve libido and sexual desire",
      "Reduce vaginal dryness",
      "Restore hormonal balance",
      "Improve mood, sleep, and energy",
    ],
  },
  {
    image:
      "https://www.agemanagementmed.com/themes/default/assets/images/column-box-16-img.png",
    title: "PRP Therapy For Female Sexual Wellness",
    description:
      "PRP therapy uses platelets from your own blood to stimulate cellular regeneration and nerve function in sensitive areas.",
    label: "Benefits may include:",
    bullets: [
      "Improved sexual arousal and sensation",
      "Increased sensitivity",
      "Enhanced orgasm quality",
      "Support for urinary control",
    ],
  },
  {
    image:
      "https://www.agemanagementmed.com/themes/default/assets/images/column-box-15-img.png",
    title: "Supplementation & Hormonal Support",
    description:
      "Hormonal changes, stress, and lifestyle factors can all influence libido, arousal, and overall sexual wellness.",
    label: "Treatment plans may include:",
    bullets: [
      "Hormone-supportive supplements for libido and vitality",
      "Nutritional protocols designed to support circulation and tissue health",
      "Prescription options that support female sexual health",
      "Complementary support alongside PRP or laser treatments",
    ],
  },
];

const TreatmentCard: React.FC<{ data: TreatmentData }> = ({ data }) => {
  const isDark = !!data.dark;

  return (
    <div
      className={
        isDark
          ? "bg-[#0F1E4D] rounded-3xl p-6 md:p-8"
          : "bg-white border border-slate-200 rounded-3xl p-6 md:p-8"
      }
    >
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div
          className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0 bg-cover bg-center ${
            data.imageBg ?? "bg-slate-100"
          } ${isDark ? "ring-4 ring-white/20" : "ring-4 ring-slate-100"}`}
          style={{ backgroundImage: `url('${data.image}')` }}
        />

        <div className="flex-1">
          <h3
            className={`text-xl font-serif mb-2 ${
              isDark ? "text-white" : "text-[#14214B]"
            }`}
          >
            {data.title}
          </h3>

          <p className={`text-sm mb-3 ${isDark ? "text-white/85" : "text-slate-600"}`}>
            {data.description}
          </p>

          <p
            className={`text-xs font-bold uppercase tracking-wider mb-2 ${
              isDark ? "text-white" : "text-[#14214B]"
            }`}
          >
            {data.label}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 mb-4">
            {data.bullets.map((bullet) => (
              <li
                key={bullet}
                className={`flex items-start gap-2 text-sm ${
                  isDark ? "text-white/90" : "text-slate-600"
                }`}
              >
                <BulletIcon
                  className={`w-4 h-4 mt-0.5 shrink-0 ${
                    isDark ? "text-[#7fb8b5]" : "text-[#519B98]"
                  }`}
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {data.cta && (
            <a
              href={data.cta.href}
              className="inline-flex items-center gap-2 bg-[#519B98] hover:bg-[#457f7d] transition-colors text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full"
            >
              {data.cta.text}
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const TreatmentOptions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif text-[#14214B] mb-2">Treatment Options</h2>
        <p className="text-slate-500 text-sm">
          Tailored to your needs, these services support lasting improvements
          in libido, performance, and satisfaction.
        </p>
      </div>

      <div className="space-y-6">
        {treatments.map((treatment) => (
          <TreatmentCard key={treatment.title} data={treatment} />
        ))}
      </div>
    </div>
  );
};

export default TreatmentOptions;
export { BulletIcon, getIcon, ICONS };
export type { IconName };
