"use client";

import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdUnit(props:{slot:string, client:string}) {
  const { slot, client } = props;

  useEffect(() => {
    try {
      (window.adsbygoogle ??= []).push({})
    } catch (e) {}
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}