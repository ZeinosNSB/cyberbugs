import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function Content({ selected, dir, TABS }) {
  const [left, setLeft] = useState(0)

  useEffect(() => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`)
      const overlayContent = document.getElementById('overlay-content')

      if (!hoveredTab || !overlayContent) return

      const tabRect = hoveredTab.getBoundingClientRect()
      const { left: contentLeft } = overlayContent.getBoundingClientRect()

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft

      setLeft(tabCenter)
    }
  }, [selected])

  return (
    <motion.div
      id='overlay-content'
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className='absolute left-0 top-[calc(100%_+_24px)] w-full rounded-lg border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 p-4'
    >
      <div className='absolute -top-[24px] left-0 right-0 h-[24px]' />
      <motion.span
        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%, 0% 100%)' }}
        animate={{ left }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className='absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900'
      />

      {TABS.map(tab => {
        return (
          <div className='overflow-hidden' key={tab.id}>
            {selected === tab.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === 'l' ? 100 : dir === 'r' ? -100 : 0
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <tab.Component />
              </motion.div>
            )}
          </div>
        )
      })}
    </motion.div>
  )
}

export default Content
