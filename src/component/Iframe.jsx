// src/components/Iframe.js

import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import weakMemoize from '@emotion/weak-memoize'
import CssBaseline from '@mui/material/CssBaseline';
// literally copied from Mitchell's codesandbox
// https://github.com/emotion-js/emotion/issues/760#issuecomment-404353706
let memoizedCreateCacheWithContainer = weakMemoize(container => {
  let newCache = createCache({ 
    key: 'css',
    container,
    prepend: true
 });
  return newCache;
});


/* render Emotion style to iframe's head element */
function EmotionProvider({ children, $head }) {
  return (
    <CacheProvider value={memoizedCreateCacheWithContainer($head)}>
      {children}
    </CacheProvider>
  )
}

/* hack-ish: force iframe to update */
function useForceUpdate(){
  const [_, setValue] = useState()
  return () => setValue(0)
}

/* rudimentary Iframe component with Portal */
export function Iframe({ children, ...props }) {
  const iFrameRef = useRef(null)
  const [$iFrameBody, setIframeBody] = useState(null)
  const [$iFrameHead, setIframeHead] = useState(null)
  const forceUpdate = useForceUpdate()

  useEffect(function(){
    if (!iFrameRef.current) return

    const $iframe = iFrameRef.current
    $iframe.addEventListener('load', onLoad)

    function onLoad() {
      // TODO can probably attach these to ref itself?
      setIframeBody($iframe.contentDocument.body)
      setIframeHead($iframe.contentDocument.head)

      // force update, otherwise portal children won't show up
      forceUpdate()
    }

    return function() {
      // eslint-disable-next-line no-restricted-globals
      $iframe.removeEventListener('load', onload)
    }
  })

  return (<iframe  {...props} title="" ref={iFrameRef} style={{
    border:'none',
    width:'100%',
    height:'100%'
    }} >
    
      {$iFrameBody && $iFrameHead && createPortal((
        <EmotionProvider $head={$iFrameHead}><CssBaseline />{children}</EmotionProvider>
      ), $iFrameBody)}
    </iframe>)
}