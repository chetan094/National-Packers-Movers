// In-memory rate limiter for Next.js API routes

const tracker = new Map();

// Clean up expired entries every 10 minutes to prevent memory leaks
if (typeof globalThis !== 'undefined') {
  if (!globalThis.__rateLimitInterval) {
    globalThis.__rateLimitInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, record] of tracker.entries()) {
        if (now > record.resetTime) {
          tracker.delete(key);
        }
      }
    }, 10 * 60 * 1000);
  }
}

export function checkRateLimit(identifier, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const record = tracker.get(identifier) || { count: 0, resetTime: now + windowMs };

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }

  if (record.count >= maxAttempts) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  return { allowed: true, remaining: maxAttempts - record.count, resetTime: record.resetTime };
}

export function recordFailedAttempt(identifier, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const record = tracker.get(identifier) || { count: 0, resetTime: now + windowMs };
  record.count += 1;
  tracker.set(identifier, record);
}

export function clearRateLimit(identifier) {
  tracker.delete(identifier);
}
