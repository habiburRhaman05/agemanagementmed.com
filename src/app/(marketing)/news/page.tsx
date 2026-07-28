import { ContentGrid } from '@/components/sections/ContentGrid'
import { expertsContent } from '@/content/pages/experts'
import React from 'react'

const NewsPage = () => {
  return (
    <div>
          <ContentGrid eyebrow="As seen on" title="In the news" items={expertsContent.press} columns={2} />
    </div>
  )
}

export default NewsPage