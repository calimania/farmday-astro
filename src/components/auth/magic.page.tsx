import type { Page, Store } from '@/markket';
import React, { useState, useEffect } from 'react';
import MagicLinkForm from "@components/auth/magic.form";
import MagicVerifyingForm from "@components/auth/magic.verifying";

import { markketplace} from '@/config';

const MagicPage = ({page, store}: { page: Page, store: Store }) => {
  const [urlCode, setUrlCode] = useState<string | null>(null);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [showDelayedLoading, setShowDelayedLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      setUrlCode(code);
      // Add a 1-second delay before starting validation for better UX
      setTimeout(() => {
        setShowDelayedLoading(true);
        validateMagicLink(code);
      }, 1000);
    }
  }, []);


  const reset = () => {
    window.history.pushState({}, document.title, window.location.pathname);
    setValidationStatus('idle');
    setShowDelayedLoading(false);
    setUrlCode(null);
  }

  const validateMagicLink = async (code: string) => {
    setValidationStatus('loading');

    try {
      const res = await fetch(new URL(`/api/markket?path=/api/auth-magic/verify`, markketplace.markket), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
        body: JSON.stringify({
          code: code,
        }),
      });

      const data = await res.json();


      if (res.ok && data.jwt) {
        setValidationStatus('valid');
        localStorage.setItem('farmday.auth', JSON.stringify(data))
      } else {
        setValidationStatus('invalid');
      }
    } catch (error) {
      console.error('Magic link validation error:', error);
      setValidationStatus('invalid');
    }
  };

  if (urlCode) {
    return <MagicVerifyingForm validationStatus={validationStatus} showDelayedLoading={showDelayedLoading} requestNew={reset}/>
  }

  return <MagicLinkForm store={store} page={page} />
}

export default MagicPage;

