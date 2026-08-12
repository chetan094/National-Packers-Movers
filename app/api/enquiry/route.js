import { createLead } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      from,
      to,
      date,
      moveType,
      notes,
      message,
      inventory,
      matchedVehicle,
      totalCft,
      source
    } = body;

    // Basic Validation
    if (!name || !phone || !source) {
      return Response.json(
        { success: false, error: 'Missing required fields: name, phone, and source are mandatory.' },
        { status: 400 }
      );
    }

    // Save lead to Supabase database
    let dbLead = null;
    try {
      dbLead = await createLead({
        name,
        phone,
        email,
        from,
        to,
        date,
        moveType,
        notes,
        message,
        inventory,
        matchedVehicle,
        totalCft,
        source
      });
    } catch (dbErr) {
      console.error('[DATABASE SAVE ERROR] Failed to record lead:', dbErr);
    }


    // Format fields for email display
    let formattedDate = 'N/A';
    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        formattedDate = parsedDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      }
    }
    const cleanEmail = email ? email.trim() : 'N/A';
    const routeInfo = from && to ? `${from} to ${to}` : 'N/A';
    const shiftingDetails = notes || message || 'N/A';
    const vehicleDetail = matchedVehicle ? `${matchedVehicle} (${totalCft || 0} CFT)` : 'N/A';

    // Design a premium, highly professional HTML email template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Website Enquiry</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .wrapper {
            width: 100%;
            background-color: #f4f6f8;
            padding: 30px 15px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border: 1px solid #e1e8ed;
          }
          .header {
            background: linear-gradient(135deg, #0D1B2A 0%, #162236 100%);
            padding: 30px 20px;
            text-align: center;
            border-bottom: 3px solid #F7B731;
          }
          .header h1 {
            color: #ffffff;
            font-size: 20px;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .header p {
            color: #F7B731;
            font-size: 14px;
            margin: 5px 0 0 0;
            font-weight: bold;
          }
          .content {
            padding: 30px 25px;
          }
          .section-title {
            font-size: 14px;
            font-weight: 700;
            color: #0D1B2A;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #e1e8ed;
            padding-bottom: 6px;
            margin-top: 25px;
            margin-bottom: 15px;
          }
          .section-title:first-of-type {
            margin-top: 0;
          }
          .grid-row {
            margin-bottom: 12px;
          }
          .label {
            font-size: 12px;
            color: #8898aa;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 4px;
          }
          .value {
            font-size: 15px;
            color: #273444;
            font-weight: 500;
          }
          .highlight {
            font-size: 15px;
            color: #C1121F;
            font-weight: bold;
          }
          .badge {
            display: inline-block;
            background-color: #F7B731;
            color: #0D1B2A;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
          }
          .footer {
            background-color: #0D1B2A;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #8898aa;
          }
          .footer p {
            margin: 5px 0;
          }
          .footer a {
            color: #F7B731;
            text-decoration: none;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1>National Packers & Movers</h1>
              <p>New Leads Dispatch System</p>
            </div>
            <div class="content">
              <div class="section-title">Enquiry Source</div>
              <div class="grid-row">
                <span class="badge">${source}</span>
              </div>

              <div class="section-title">Customer Contact Details</div>
              <div class="grid-row">
                <div class="label">Full Name</div>
                <div class="value"><strong>${name}</strong></div>
              </div>
              <div class="grid-row">
                <div class="label">Phone Number</div>
                <div class="value"><a href="tel:${phone}" style="color: #0D1B2A; text-decoration: underline; font-weight: bold;">${phone}</a></div>
              </div>
              <div class="grid-row">
                <div class="label">Email Address</div>
                <div class="value">${cleanEmail}</div>
              </div>

              <div class="section-title">Shifting Plan</div>
              <div class="grid-row">
                <div class="label">Route (From &rarr; To)</div>
                <div class="value highlight">${routeInfo}</div>
              </div>
              ${date ? `
              <div class="grid-row">
                <div class="label">Shifting Date</div>
                <div class="value">${formattedDate}</div>
              </div>
              ` : ''}
              ${moveType ? `
              <div class="grid-row">
                <div class="label">Relocation Category</div>
                <div class="value" style="text-transform: capitalize;">${moveType} Shifting</div>
              </div>
              ` : ''}

              ${inventory ? `
              <div class="section-title">Calculated Shifting Inventory</div>
              <div class="grid-row">
                <div class="label">Selected Items Checklist</div>
                <div class="value" style="background-color: #fafbfc; border: 1px solid #e1e8ed; padding: 10px; border-radius: 4px; font-size: 13px; line-height: 1.5; color: #333d47;">
                  ${inventory}
                </div>
              </div>
              <div class="grid-row" style="margin-top: 15px;">
                <div class="label">Matched Vehicle Capacity</div>
                <div class="value" style="color: #F7B731; font-weight: bold;">🚛 ${vehicleDetail}</div>
              </div>
              ` : ''}

              ${(notes || message) ? `
              <div class="section-title">Special Instructions / Message</div>
              <div class="grid-row">
                <div class="value" style="background-color: #fafbfc; border: 1px solid #e1e8ed; padding: 10px; border-radius: 4px; font-style: italic; color: #4b566b; font-size: 14px; line-height: 1.5;">
                  "${shiftingDetails}"
                </div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>National Packers & Movers &copy; ${new Date().getFullYear()}</p>
              <p>GSTIN: 20AIHPJ7005R1Z6 | Regd No: 0039</p>
              <p>Powered by <a href="https://thenationalpackersmovers.com" target="_blank">thenationalpackersmovers.com</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const recipient = process.env.RECIPIENT_EMAIL || 'cjhampaty@gmail.com';
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      // Production - send actual email via Resend API
      const resendSender = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
      const subject = `🚀 [Lead: ${source}] - ${name} (${from || 'HQ'} -> ${to || 'Dest'})`;

      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            from: `NPM Web Leads <${resendSender}>`,
            to: [recipient],
            subject: subject,
            html: emailHtml,
            reply_to: email && email.includes('@') ? email : undefined
          })
        });

        const responseData = await response.json();

        if (!response.ok) {
          console.warn('[NOTIFICATIONS WARNING] Resend API error (handled gracefully):', response.status, responseData);
          return Response.json({
            success: true,
            emailSent: false,
            warning: responseData?.message || `Resend HTTP ${response.status}`,
            leadId: dbLead?.id
          });
        }

        console.log(`[EMAIL DISPATCH SUCCESS] Lead for ${name} sent via Resend API. ID: ${responseData.id}`);
        return Response.json({ success: true, emailSent: true, provider: 'resend', id: responseData.id, leadId: dbLead?.id });
      } catch (emailErr) {
        console.error('[NOTIFICATIONS ERROR] Resend fetch exception (handled gracefully):', emailErr);
        return Response.json({ success: true, emailSent: false, warning: emailErr.message, leadId: dbLead?.id });
      }
    } else {
      // Development Fallback - Log lead to server console
      console.warn('========================================================================');
      console.warn(`⚠️ [MOCK EMAIL DELIVERED TO HQ] (RESEND_API_KEY is not configured)`);
      console.warn(`------------------------------------------------------------------------`);
      console.warn(`Source:      [${source}]`);
      console.warn(`Customer:    ${name}`);
      console.warn(`Phone:       ${phone}`);
      console.warn(`Email:       ${cleanEmail}`);
      console.warn(`Route:       ${routeInfo}`);
      console.warn(`Date:        ${formattedDate}`);
      if (moveType) console.warn(`Category:    ${moveType}`);
      if (matchedVehicle) console.warn(`Vehicle:     ${vehicleDetail}`);
      if (inventory) console.warn(`Inventory:   ${inventory}`);
      if (notes || message) console.warn(`Details:     "${shiftingDetails}"`);
      console.warn('========================================================================');

      return Response.json({
        success: true,
        emailSent: false,
        warning: 'MOCK_MODE: Email logged to console because RESEND_API_KEY is not configured in .env'
      });
    }
  } catch (error) {
    console.error('[ROUTE HANDLER ERROR] Failed to process enquiry:', error);
    return Response.json(
      { success: false, error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
