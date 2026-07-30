'use client'

import { Share2 } from 'lucide-react'

export function ShareButton({ title, url }: { title: string; url: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (navigator.share) {
          navigator.share({ title, url }).catch(() => {})
        } else {
          navigator.clipboard.writeText(url).then(() => {
            const el = document.getElementById('share-msg')
            if (el) {
              el.classList.remove('opacity-0', 'translate-y-1')
              setTimeout(() => el.classList.add('opacity-0', 'translate-y-1'), 2000)
            }
          }).catch(() => {})
        }
      }}
      className="relative inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
    >
      <Share2 className="h-4 w-4" />
      Share
      <span
        id="share-msg"
        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 transition-all duration-200 pointer-events-none translate-y-1"
      >
        Link copied!
      </span>
    </button>
  )
}
