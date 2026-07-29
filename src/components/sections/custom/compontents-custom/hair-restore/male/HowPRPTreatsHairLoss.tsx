import React from "react";
import {
  ArrowRight,
  UserRound,
  Hand,
  UserCircle2,
  Crown,
  type LucideIcon,
} from "lucide-react";

/** Replace with the real photo. */
const TREATMENT_IMAGE =
  "https://res.cloudinary.com/khs2rcsr/image/upload/v1785306021/hair-treatment-image-male_dik98b.jpg";

/**
 * Central icon registry — add new entries here and reference them by
 * name anywhere in the app instead of importing lucide icons ad hoc.
 */
const ICONS: Record<string, LucideIcon> = {
  bullet: ArrowRight,
  androgeneticAlopecia: UserRound,
  thinningHair: Hand,
  recedingHairlines: UserCircle2,
  crownThinning: Crown,
};

type IconName = keyof typeof ICONS;

function getIcon(name: IconName): LucideIcon {
  return ICONS[name] ?? ArrowRight;
}

const Icon: React.FC<{ name: IconName; className?: string }> = ({
  name,
  className = "w-5 h-5",
}) => {
  const LucideIcon = getIcon(name);
  return <LucideIcon className={className} strokeWidth={1.5} />;
};

const BulletIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => {
  const LucideIcon = getIcon("bullet");
  return <LucideIcon className={className} strokeWidth={2} />;
};

const growthFactors = [
  "Stimulate dormant hair follicles",
  "Improve blood circulation to the scalp",
  "Strengthen existing hair strands",
  "Promote the growth of new, healthy hair",
];

interface CandidateItem {
  name: IconName;
  label: string;
}

const candidateItems: CandidateItem[] = [
  { name: "androgeneticAlopecia", label: "Androgenetic alopecia (male/female pattern baldness)" },
  { name: "thinningHair", label: "Thinning hair or reduced hair density" },
  { name: "recedingHairlines", label: "Receding hairlines" },
  { name: "crownThinning", label: "Crown thinning" },
];

const HowPRPTreatsHairLoss: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-2.5">
        {/* Top: image + navy content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div
            className="rounded-2xl bg-cover bg-center bg-slate-200 aspect-[4/3] md:aspect-auto md:min-h-[280px]"
            style={{ backgroundImage: `url('${TREATMENT_IMAGE}')` }}
            role="img"
            aria-label="Provider administering PRP treatment to a patient's scalp"
          />

          <div className="bg-[#0F1E4D] rounded-2xl p-6">
            <h2 className="text-2xl font-serif text-white leading-tight mb-3">
              How Does PRP Treat Hair Loss?
            </h2>

            <p className="text-xs text-white/80 leading-relaxed mb-3">
              Platelet-Rich Plasma (PRP) therapy is a cutting-edge, non-surgical
              treatment that uses your own blood's healing properties to
              stimulate hair growth. During the procedure, we draw a small
              amount of your blood, process it to concentrate the platelets
              that fuel regeneration, and inject the nutrient-rich plasma
              directly into your scalp.
            </p>

            <p className="text-xs font-semibold text-white mb-2 leading-relaxed">
              These concentrated platelets contain powerful growth factors
              that:
            </p>

            <ul className="space-y-1">
              {growthFactors.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-white/90">
                  <BulletIcon className="w-3.5 h-3.5 mt-0.5 text-white/70 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom: candidate section */}
        <div className="text-center px-4 py-8 md:px-10">
          <h2 className="text-2xl font-serif text-[#14214B] mb-2">
            Who Is a Candidate For PRP For Hair Loss?
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            PRP hair treatment is ideal for both men and women experiencing
            hair loss. PRP can be used for:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-md mx-auto text-left">
            {candidateItems.map((item) => (
              <div key={item.name} className="flex items-center gap-2.5">
                <Icon name={item.name} className="w-6 h-6 text-[#519B98] shrink-0" />
                <p className="text-sm text-slate-600 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowPRPTreatsHairLoss;
export { Icon, BulletIcon, getIcon, ICONS };
export type { IconName };
