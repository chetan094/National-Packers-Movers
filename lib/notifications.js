/**
 * Real-Time Lead Notification System for National Packers & Movers
 * Sends instant mobile push alerts to Telegram & Email whenever a new quote inquiry or AI chat lead arrives.
 */

export async function sendTelegramNotification(lead) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('[NOTIFICATIONS] Telegram credentials missing in .env.local');
    return false;
  }

  const cleanPhone = (lead.phone || '').replace(/[^0-9+]/g, '');
  const timeString = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

  const messageText = `
🚨 <b>NEW SHIFTING LEAD RECEIVED!</b>
━━━━━━━━━━━━━━━━━━
👤 <b>Customer:</b> ${lead.name || 'Web Visitor'}
📞 <b>Phone:</b> <a href="tel:${cleanPhone}">${lead.phone || 'Not provided'}</a>
🚚 <b>Route:</b> ${lead.from || 'Origin'} ➔ ${lead.to || 'Destination'}
📦 <b>Type:</b> ${lead.moveType || 'Household'}
📅 <b>Shifting Date:</b> ${lead.date || 'Flexible'}
📝 <b>Details:</b> ${lead.notes || 'None'}
📍 <b>Source:</b> ${lead.source || 'Website Quote Form'}
⏰ <b>Time:</b> ${timeString}
━━━━━━━━━━━━━━━━━━
👉 <i>Tap phone number above to call customer instantly!</i>
`.trim();

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    if (res.ok) {
      console.log('[NOTIFICATIONS] Telegram alert sent successfully for lead:', lead.phone);
      return true;
    } else {
      const errJson = await res.json();
      console.error('[NOTIFICATIONS] Telegram API error:', errJson);
      return false;
    }
  } catch (err) {
    console.error('[NOTIFICATIONS] Failed to send Telegram alert:', err);
    return false;
  }
}

export async function sendEmailNotification(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[NOTIFICATIONS] RESEND_API_KEY missing in .env.local');
    return false;
  }

  const cleanPhone = (lead.phone || '').replace(/[^0-9+]/g, '');
  const timeString = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; background-color: #0b132b; padding: 20px; color: #ffffff; border-radius: 8px;">
    <div style="background-color: #1c2541; padding: 20px; border-radius: 8px; border-left: 5px solid #F7B731;">
      <h2 style="color: #F7B731; margin-top: 0;">🚨 New Lead Alert — National Packers &amp; Movers</h2>
      <p style="font-size: 15px; color: #e2e8f0;">A new shifting quote inquiry has just been submitted on your website.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; color: #ffffff;">
        <tr><td style="padding: 8px 0; color: #94a3b8; width: 140px;">Customer Name:</td><td style="font-weight: bold; color: #ffffff;">${lead.name || 'Web Visitor'}</td></tr>
        <tr><td style="padding: 8px 0; color: #94a3b8;">Phone Number:</td><td style="font-weight: bold; color: #F7B731;"><a href="tel:${cleanPhone}" style="color: #F7B731; text-decoration: underline;">${lead.phone || 'N/A'}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #94a3b8;">Shifting Route:</td><td style="font-weight: bold;">${lead.from || 'Origin'} ➔ ${lead.to || 'Destination'}</td></tr>
        <tr><td style="padding: 8px 0; color: #94a3b8;">Cargo / Service:</td><td>${lead.moveType || 'Household Shifting'}</td></tr>
        <tr><td style="padding: 8px 0; color: #94a3b8;">Shifting Date:</td><td>${lead.date || 'Flexible'}</td></tr>
        <tr><td style="padding: 8px 0; color: #94a3b8;">Notes / Details:</td><td>${lead.notes || 'None'}</td></tr>
        <tr><td style="padding: 8px 0; color: #94a3b8;">Source Channel:</td><td>${lead.source || 'Website Quote Form'}</td></tr>
        <tr><td style="padding: 8px 0; color: #94a3b8;">Submission Time:</td><td>${timeString}</td></tr>
      </table>

      <div style="margin-top: 25px; text-align: center;">
        <a href="tel:${cleanPhone}" style="background-color: #F7B731; color: #0b132b; padding: 12px 24px; font-weight: bold; text-decoration: none; border-radius: 6px; display: inline-block;">📞 Tap to Call Customer Now</a>
      </div>
    </div>
    <p style="font-size: 12px; color: #64748b; text-align: center; margin-top: 15px;">National Packers &amp; Movers HQ — Real-time Lead Dispatch System</p>
  </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'National Packers & Movers <onboarding@resend.dev>',
        to: ['cjhampaty@gmail.com'],
        subject: `🚨 NEW LEAD: ${lead.name || 'Web Customer'} (${lead.from || 'Origin'} ➔ ${lead.to || 'Destination'})`,
        html: htmlContent
      })
    });

    if (res.ok) {
      console.log('[NOTIFICATIONS] Resend email alert sent successfully to npmdhanbad11@gmail.com');
      return true;
    } else {
      const errText = await res.text();
      console.error('[NOTIFICATIONS] Resend API error:', errText);
      return false;
    }
  } catch (err) {
    console.error('[NOTIFICATIONS] Failed to send Resend email:', err);
    return false;
  }
}

export async function sendLeadNotifications(leadData) {
  try {
    // Run notification dispatches non-blockingly
    await Promise.allSettled([
      sendTelegramNotification(leadData),
      sendEmailNotification(leadData)
    ]);
  } catch (err) {
    console.error('[NOTIFICATIONS] Error dispatching notifications:', err);
  }
}
