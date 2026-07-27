import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { privacyPolicyHtml } from '@/content/privacy-policy'

export const metadata = {
  title: 'Privacy Policy | SAMM',
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="py-24 sm:py-32 bg-surface-page">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="prose prose-lg prose-slate max-w-none prose-a:text-sage-700 hover:prose-a:text-sage-800">
            <h1>Privacy Policy</h1>
            <div dangerouslySetInnerHTML={{ __html: privacyPolicyHtml }} />
          </div>
        </div>
      </main>
      
    </>
  )
}
