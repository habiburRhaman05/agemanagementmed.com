import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { getPublishedTestimonials } from '@/content/testimonials'
import { pillars } from '@/content/treatments'
import type { Testimonial, Treatment } from '@/types/content'
import { causesIcons, pathwayIcons } from '../compontents-custom/perimenopause/perimenopause-icons'
import { LifestyleAndEvaluation } from '../compontents-custom/perimenopause/LifestyleAndEvaluation'
import { SymptomsIntroCards } from '../compontents-custom/perimenopause/SymptomsIntroCards'
import { TextImagePanel } from '../compontents-custom/perimenopause/TextImagePanel'
import { TreatmentPathwaysPanel } from '../compontents-custom/perimenopause/TreatmentPathwaysPanel'
import { SymptomsOutcomesGrid } from '../compontents-custom/shared/SymptomsOutcomesGrid'
import { MidPageCTA } from '../compontents-custom/shared/MidPageCTA'

interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function PerimenopauseMenopauseLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  const testimonials: Testimonial[] = [
    {
      id: '1',
      source: 'google',
      author: 'E.H.',
      quote: 'Dr. Collins has been an absolute delight and so informative and patient. He has a great personality and is very passionate about his profession to inform, teach, guide, and give his patients the most beneficial advice for good health and longevity. He has been very helpful for both my Husband and myself. The staff is very helpful and friendly as well.',
    },
    {
      id: '2',
      source: 'google',
      author: 'S.R.',
      quote: 'All members of the staff are absolutely wonderful. They are polite and address any questions or concerns you have in a professional approach. They have literally changed my life for the better.',
    },
    {
      id: '3',
      source: 'google',
      author: 'J.F.',
      quote: 'Every experience has been excellent. All questions and concerns were answered. I\'ve recommended them to my family and friends.',
    },
    {
      id: '4',
      source: 'google',
      author: 'C.G.',
      quote: 'Great employees to work with. The staff is very knowledgeable and explain all processes.',
    }
  ]

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
          ctaLabel: 'Schedule a Consultation',
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
            'Hot Flashes And Night Sweats',
            'Brain Fog And Difficulty Concentrating',
            'Chronic Fatigue',
            'Mood Swings Or Irritability',
            'Weight Gain And Slower Metabolism',
            'Low Libido',
            'Sleep Disruptions',
            'Vaginal Dryness Or Discomfort',
            'Anxiety Or Increased Stress Sensitivity',
            'Muscle Loss And Reduced Strength',
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
          heading: 'How We Evaluate and Treat Menopausal Hormonal Imbalance',
          paragraphs: [
            'At SAMM, treatment starts with understanding your full health picture. We evaluate symptoms alongside detailed labwork to identify hormone shifts and other factors that may be contributing to your perimenopause or menopause symptoms.',
          ],
          bulletsLabel: 'Testing may include:',
          bullets: [
            'Estrogen And Progesterone Levels',
            'Thyroid Function',
            'Testosterone Levels',
            'Cortisol And Stress Response',
            'Metabolic Health Markers',
            'Inflammation Indicators',
          ],
          closingParagraphs: [
            'From there, we create a customized plan that may include hormone therapy, lifestyle recommendations, weight management support, or sexual wellness treatments depending on your needs.',
            'We also believe ongoing monitoring matters. Hormones can shift over time, which is why follow up evaluations and treatment adjustments are an important part of long term success.',
          ],
        }}
      />

      <SymptomsOutcomesGrid
        title="What Causes Menopausal Symptoms?"
        wide
        titleAs="heading"
        items={[
          {
            icon: causesIcons[0],
            title: 'Hot Flashes And Night Sweats',
            description:
              "Hormonal fluctuations can affect the body's temperature regulation system, leading to sudden heat, sweating, flushing, and disrupted sleep patterns. These symptoms are among the most common menopause symptoms women experience.",
          },
          {
            icon: causesIcons[1],
            title: 'Brain Fog And Fatigue',
            description:
              'Changes in estrogen and progesterone levels can impact sleep quality, mental clarity, focus, and energy production. Many women describe feeling mentally exhausted or less sharp than usual during perimenopause.',
          },
          {
            icon: causesIcons[2],
            title: 'Weight Gain And Metabolic Changes',
            description:
              'Hormonal changes can influence insulin sensitivity, muscle mass, and fat distribution. Even women maintaining healthy habits may notice increased abdominal weight gain or slower metabolism.',
          },
          {
            icon: causesIcons[3],
            title: 'Low Libido And Sexual Health Changes',
            description:
              'Reduced hormone levels can affect sexual desire, comfort, arousal, and intimacy. Vaginal dryness and discomfort may also become more noticeable during menopause.',
          },
        ]}
      />

      <div className="lg-flexspace-100" />

      <TreatmentPathwaysPanel
        title="Menopause Treatment Pathways Based on Your Symptoms"
        lead="Your symptoms can help guide the right treatment approach. Depending on your needs, your care plan may include one or more of the following services."
        pathways={[
          { icon: pathwayIcons[0], title: 'Hormone Therapy For Women', href: '/bioidentical-hormone-replacement-therapy/female' },
          { icon: pathwayIcons[1], title: 'Sexual Wellness', href: '/rejuvenation-enhancement' },
          { icon: pathwayIcons[2], title: 'Medical Weight Loss', href: '/concierge-medical-weight-loss' },
        ]}
      />

      <TextImagePanel
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785338093/why-woman-chose-samm_g7evxb.jpg',
          alt: 'A patient consulting with her SAMM provider',
        }}
        imageSide="left"
        heading="Why Women Choose SAMM"
        items={[
          'Personalized Treatment Plans',
          'Comprehensive Hormone Testing',
          'Ongoing Monitoring And Support',
          'Data Driven Recommendations',
          'Focus On Long Term Wellness',
          'Experienced Medical Guidance',
        ]}
      />

      <MidPageCTA
        backgroundImage="https://www.agemanagementmed.com/themes/default/assets/images/hero-35-bg.jpg"
        backgroundPosition="80% center"
        title="Ready To Get Answers?"
        body="You deserve more than temporary fixes or generic advice. Our team can help identify the root causes behind your symptoms and create a plan designed specifically for you."
        ctaLabel="Schedule Hormone Testing"
        ctaHref="/bioidentical-hormone-replacement-therapy/female"
        align="full"
        gradient={false}
      />

      <TextImagePanel
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785338393/What_Patients_Often_vuuuis.jpg',
          alt: 'A woman enjoying renewed energy and confidence',
        }}
        imageSide="right"
        heading="What Patients Often Notice After Treatment"
        lead="Every patient responds differently, but many women report improvements such as:"
        items={[
          'Better Energy Levels',
          'Improved Mental Clarity',
          'More Restful Sleep',
          'Better Mood Stability',
          'Increased Libido',
          'Easier Weight Management',
          'Greater Confidence And Overall Well Being',
        ]}
      />

      {testimonials.length ? (
        <TestimonialSet
          eyebrow="Patient testimonials"
          title="What our patients say"
          testimonials={testimonials}
          background="alt"
          backgroundImage="https://www.agemanagementmed.com/themes/default/assets/images/testimonial-17-bg.jpg"
        />
      ) : null}

      {treatment.faqs.length ? (
        <FAQAccordion title="Menopause and Perimenopause FAQs" items={treatment.faqs} />
      ) : null}

      <ClosingCTA {...treatment.closingCta} backgroundImage="https://www.agemanagementmed.com/themes/default/assets/images/hero-36-bg.jpg" />
    </>
  )
}
