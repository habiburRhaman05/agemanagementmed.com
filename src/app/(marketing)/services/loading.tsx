import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'

export default function ServicesLoading() {
  return (
    <div className="pt-24 pb-12">
      <Section background="page" spacing="lg">
        <Container>
          <div className="animate-pulse">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto h-4 w-24 rounded-full bg-slate-200"></div>
              <div className="mx-auto mt-4 h-10 w-3/4 rounded-lg bg-slate-200"></div>
              <div className="mx-auto mt-4 h-6 w-5/6 rounded-lg bg-slate-200"></div>
            </div>

            <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-[420px] w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <div className="h-60 w-full bg-slate-200"></div>
                  <div className="flex flex-1 flex-col p-5 pt-4">
                    <div className="h-3 w-1/4 rounded bg-slate-200"></div>
                    <div className="mt-2 h-6 w-3/4 rounded bg-slate-200"></div>
                    <div className="mt-2 h-4 w-full rounded bg-slate-200"></div>
                    <div className="mt-1 h-4 w-5/6 rounded bg-slate-200"></div>
                    
                    <div className="mt-auto pt-4 flex gap-2 flex-wrap">
                      <div className="h-4 w-20 rounded-full bg-slate-200"></div>
                      <div className="h-4 w-24 rounded-full bg-slate-200"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
