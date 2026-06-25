export function trackEvent(eventType, eventName = null) {
  if (typeof window === 'undefined') return;

  // Retrieve or generate tab session ID
  let sessionId = sessionStorage.getItem('npm_analytics_session');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    sessionStorage.setItem('npm_analytics_session', sessionId);
  }

  // Fire background POST request
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_type: eventType,
      event_name: eventName,
      page_path: window.location.pathname,
      session_id: sessionId,
      referrer: document.referrer || null
    })
  }).catch(() => {});
}

export function trackTimeSpent(path, duration) {
  if (typeof window === 'undefined') return;
  
  const sessionId = sessionStorage.getItem('npm_analytics_session') || '';
  const data = JSON.stringify({
    event_type: 'time_spent',
    event_name: String(duration),
    page_path: path,
    session_id: sessionId,
    referrer: null
  });

  // Use sendBeacon if supported (safe for tab closure), fallback to fetch keepalive
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    const blob = new Blob([data], { type: 'application/json' });
    navigator.sendBeacon('/api/analytics', blob);
  } else {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
      keepalive: true
    }).catch(() => {});
  }
}
