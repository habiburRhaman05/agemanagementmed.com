import Image from 'next/image';

type PageHeroProps = {
  title: string;
  intro?: string;
  /** Focal point for the background crop. */
  align?: "center" | "top" | "bottom";
};

export default function TextHero({
  title,
  intro,
  align = 'center',
}: PageHeroProps) {
  
  return (
    <section className="relative flex min-h-[350px] sm:min-h-[350px]  sm:max-h-[350px] bg-[#14214B] items-center justify-center overflow-hidden">

    <h1 className="display-1 animate-fadeUp text-white sm:text-[54px] text-[34px] mt-5 ">{title}</h1>
        {intro && (
          <p className="mx-auto mt-5 max-w-[780px] animate-fadeUp text-[19px] leading-[1.65] text-white text-shadow-hero [animation-delay:120ms] sm:mt-6 sm:text-[20px] sm:leading-[1.7] lg:text-[21px]">
            {intro}
          </p>
        )}
 
    </section>
  );
}
