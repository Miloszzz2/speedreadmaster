"use client";

import React, { useEffect } from "react";


const AdBanner = () => {
   useEffect(() => {
      try {
         ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
            {}
         );
      } catch (error: any) {
         console.log(error.message);
      }
   }, []);

   return (
      <ins
         className="adsbygoogle"
         style={{ display: "block" }}
         data-ad-client={`ca-pub${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
         data-ad-slot="6005679727"
         data-ad-format="auto"
         data-full-width-responsive="true"
      ></ins>
   );
};

export default AdBanner;