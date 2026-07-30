import { BrainCircuit, Dna, HeartCrack, HeartHandshake, Scale, Thermometer } from 'lucide-react'

import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { pillars } from '@/content/treatments'
import type { Treatment } from '@/types/content'
import { LifestyleAndEvaluation } from '../compontents-custom/perimenopause/LifestyleAndEvaluation'
import { SymptomsIntroCards } from '../compontents-custom/perimenopause/SymptomsIntroCards'
import { TextImagePanel } from '../compontents-custom/perimenopause/TextImagePanel'
import { TreatmentPathwaysPanel } from '../compontents-custom/perimenopause/TreatmentPathwaysPanel'
import { SymptomsOutcomesGrid } from '../compontents-custom/shared/SymptomsOutcomesGrid'

interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function PerimenopauseMenopauseLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]

  return (
    <>
      <HeroEditorial
        {...treatment.hero}
        fullHeight
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pillar.label, href: pillar.href },
          { label: treatment.shortName, href: treatment.href },
        ]}
      />

      <SymptomsIntroCards
        darkCard={{
          image: {
            src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785337975/donnt-ignorre-sympth_j7eqyv.jpg',
            alt: 'A woman speaking with her provider about her symptoms',
          },
          heading: "Don't Ignore Your Symptoms",
          paragraphs: [
            "You don't have to push through exhaustion, brain fog, mood swings, or stubborn weight gain alone. Our team can help you understand what's happening and build a treatment plan that supports your health now and long term.",
          ],
          ctaLabel: 'Schedule a consultation',
          ctaHref: '/book-appointment',
        }}
        lightCard={{
          image: {
            src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785338006/under-symptth_rcghu3.jpg',
            alt: 'Common Symptoms Of Perimenopause And Menopause',
          },
          heading: 'Common Symptoms Of Perimenopause And Menopause',
          paragraphs: [
            'Perimenopause happens as hormone levels begin fluctuating before menopause officially begins. Menopause occurs once menstrual cycles have stopped for 12 consecutive months. While both stages are completely natural, the symptoms can feel disruptive and frustrating.',
            'Every woman experiences hormonal changes differently. Some notice mild symptoms, while others deal with significant physical and emotional changes that impact work, relationships, sleep, and confidence.',
          ],
          bulletsLabel: 'Common symptoms may include:',
          bullets: [
            'Hot flashes and night sweats',
            'Brain fog and difficulty concentrating',
            'Chronic fatigue',
            'Mood swings or irritability',
            'Weight gain and slower metabolism',
            'Low libido',
            'Sleep disruptions',
            'Vaginal dryness or discomfort',
            'Anxiety or increased stress sensitivity',
            'Muscle loss and reduced strength',
          ],
        }}
      />

      <LifestyleAndEvaluation
        lifestylePanel={{
          image: {
            src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785338030/why-life-chnage_jjgcsr.jpg',
            alt: 'A woman practicing a healthy, active lifestyle',
          },
          heading: "Why Lifestyle Changes Aren't Always Enough",
          paragraphs: [
            'Healthy habits absolutely matter. Nutrition, exercise, hydration, and stress management can all support hormonal health. But when hormone levels begin fluctuating or declining significantly, lifestyle changes alone may not fully address the root cause of symptoms.',
            'Many women come to us after trying supplements, restrictive diets, or fitness programs without getting lasting relief. That\'s because symptoms like fatigue, stubborn weight gain, low libido, and brain fog are often tied to deeper hormonal and metabolic imbalances.',
            "Our approach focuses on identifying what's happening internally through advanced testing and personalized evaluations so treatment decisions are based on real data, not guesswork.",
          ],
        }}
        evaluationPanel={{
          image: {
            src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785338054/photo-content-92-img_nitez0.jpg',
            alt: 'A provider reviewing lab results with a patient',
          },
          heading: 'How We Evaluate And Treat Menopausal Hormonal Imbalance',
          paragraphs: [
            'At SAMM, treatment starts with understanding your full health picture. We evaluate symptoms alongside detailed labwork to identify hormone shifts and other factors that may be contributing to your perimenopause or menopause symptoms.',
          ],
          bulletsLabel: 'Testing may include:',
          bullets: [
            'Estrogen and progesterone levels',
            'Thyroid function',
            'Testosterone levels',
            'Cortisol and stress response',
            'Metabolic health markers',
            'Inflammation indicators',
          ],
          closingParagraphs: [
            'From there, we create a customized plan that may include hormone therapy, lifestyle recommendations, weight management support, or sexual wellness treatments depending on your needs.',
            'We also believe ongoing monitoring matters. Hormones can shift over time, which is why follow up evaluations and treatment adjustments are an important part of long term success.',
          ],
        }}
      />

      <SymptomsOutcomesGrid
        title="What Causes Menopausal Symptoms?"
        items={[
          {
            icon: Thermometer,
            title: 'Hot Flashes And Night Sweats',
            description:
              "Hormonal fluctuations can affect the body's temperature regulation system, leading to sudden heat, sweating, flushing, and disrupted sleep patterns. These symptoms are among the most common menopause symptoms women experience.",
          },
          {
            icon: BrainCircuit,
            title: 'Brain Fog And Fatigue',
            description:
              'Changes in estrogen and progesterone levels can impact sleep quality, mental clarity, focus, and energy production. Many women describe feeling mentally exhausted or less sharp than usual during perimenopause.',
          },
          {
            icon: Scale,
            title: 'Weight Gain And Metabolic Changes',
            description:
              'Hormonal changes can influence insulin sensitivity, muscle mass, and fat distribution. Even women maintaining healthy habits may notice increased abdominal weight gain or slower metabolism.',
          },
          {
            icon: HeartCrack,
            title: 'Low Libido And Sexual Health Changes',
            description:
              'Reduced hormone levels can affect sexual desire, comfort, arousal, and intimacy. Vaginal dryness and discomfort may also become more noticeable during menopause.',
          },
        ]}
      />

      <TreatmentPathwaysPanel
        title="Menopause Treatment Pathways Based On Your Symptoms"
        lead="Your symptoms can help guide the right treatment approach. Depending on your needs, your care plan may include one or more of the following services."
        pathways={[
          { icon: Dna, title: 'Hormone Therapy For Women', href: '/bioidentical-hormone-replacement-therapy/female' },
          { icon: HeartHandshake, title: 'Sexual Wellness', href: '/rejuvenation-enhancement' },
          { icon: Scale, title: 'Medical Weight Loss', href: '/concierge-medical-weight-loss' },
        ]}
      />

      {/* <TextImagePanel
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785338093/why-woman-chose-samm_g7evxb.jpg',
          alt: 'A patient consulting with her SAMM provider',
        }}
        imageSide="left"
        heading="Why Women Choose SAMM"
        items={[
          'Personalized treatment plans',
          'Comprehensive hormone testing',
          'Ongoing monitoring and support',
          'Data driven recommendations',
          'Focus on long term wellness',
          'Experienced medical guidance',
        ]}
      /> */}

      <TextImagePanel
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785338393/What_Patients_Often_vuuuis.jpg',
          alt: 'A woman enjoying renewed energy and confidence',
        }}
        imageSide="right"
        heading="What Patients Often Notice After Treatment"
        lead="Every patient responds differently, but many women report improvements such as:"
        items={[
          'Better energy levels',
          'Improved mental clarity',
          'More restful sleep',
          'Better mood stability',
          'Increased libido',
          'Easier weight management',
          'Greater confidence and overall well being',
        ]}
      />

      {treatment.faqs.length ? (
        <FAQAccordion
          eyebrow="Frequently asked"
          title={`${treatment.shortName} questions`}
          items={treatment.faqs}
        />
      ) : null}

      <ClosingCTA {...treatment.closingCta} />
    </>
  )
}
