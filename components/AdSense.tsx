import Script from 'next/script';
import React from 'react'


const AdSense = () => {
   return (
      <Script
         async
         src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3042835337090879`}
         crossOrigin='anonymous'
         strategy='afterInteractive'
      />
   )
}

export default AdSense