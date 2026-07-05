import { NextResponse } from 'next/server';
import { createLead } from '@/lib/supabase';
import fs from 'fs/promises';
import path from 'path';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// Offline rules matching helper function
function runLocalRulesEngine(messages, websiteContext) {
  const lastUserMsg = messages[messages.length - 1]?.text || '';
  const query = lastUserMsg.toLowerCase().trim();

  // 1. Help / Contacts
  if (query.includes('contact') || query.includes('phone') || query.includes('call') || query.includes('helpline') || query.includes('email') || query.includes('number') || query.includes('mobile')) {
    return "Our official helplines are 9835168368 and 9934166164, and our email is npmdhanbad11@gmail.com. You can reach out to our Dhanbad HQ or any regional coordinator directly!";
  }

  // 2. GST / Legal Registration
  if (query.includes('gst') || query.includes('gstin') || query.includes('registration') || query.includes('regd') || query.includes('regno') || query.includes('tin') || query.includes('iba')) {
    return "National Packers & Movers is an IBA-compliant relocator. Our registered GSTIN is 20AIHPJ7005R1Z6 and Government Regd No. is 0039. All bills are audit-compliant for bank and PSU reimbursements.";
  }

  // 3. Claims / Billing Kit / Reimbursements
  if (query.includes('claim') || query.includes('reimburse') || query.includes('bill') || query.includes('invoice') || query.includes('receipt') || query.includes('document') || query.includes('bilty') || query.includes('consignment')) {
    return "For corporate and PSU claims, we provide a complete document kit: GST Tax Invoice (5% GTA or 18% full service), Consignment Note/Lorry Receipt (LR), itemized Packing List checksheet, and a stamped payment receipt. All formats are accepted by Coal India (BCCL, NCL), Railways, SAIL, NTPC, and all public banks.";
  }

  // 4. Shifting Rates / Pricing
  if (query.includes('rate') || query.includes('cost') || query.includes('price') || query.includes('charge') || query.includes('fare') || query.includes('estimate') || query.includes('how much')) {
    return "Local Shifting (within 15km) starts from: ₹10,000 (1 BHK), ₹10,500 (2 BHK), ₹15,000 (3 BHK). Bike transport starts at ₹2,500; Car transport starts at ₹8,000. Interstate shifting costs are calculated at approximately ₹30–₹50 per km depending on cargo volume. Let me know your origin, destination, and cargo size for an exact estimate!";
  }

  // 5. Specific cities / branches search
  const citiesList = [
    'dhanbad', 'ranchi', 'bokaro', 'deoghar', 'jamshedpur', 'hazaribagh', 'giridih', 'dumka', 'jasidih', 'madhupur',
    'kolkata', 'durgapur', 'asansol', 'siliguri', 'howrah', 'kharagpur', 'raniganj', 'burnpur', 'salt lake', 'newtown',
    'patna', 'bhagalpur', 'gaya', 'muzaffarpur', 'danapur',
    'singrauli', 'waidhan', 'morwa',
    'bhubaneswar', 'cuttack', 'rourkela', 'sambalpur',
    'lucknow', 'kanpur', 'varanasi', 'prayagraj', 'allahabad', 'noida'
  ];
  
  for (const city of citiesList) {
    if (query.includes(city)) {
      // Find matching branch details in the markdown file
      const lines = websiteContext.split('\n');
      let matchingLines = [];
      
      // Look for lines that mention the city name to extract contextual info
      for (const line of lines) {
        if (line.toLowerCase().includes(city)) {
          matchingLines.push(line.trim());
        }
      }
      
      let responseText = `Yes! We provide complete packing and moving services in ${city.toUpperCase()}. `;
      if (matchingLines.length > 0) {
        // Return a brief summary of the matches
        const cleanSnippet = matchingLines.slice(0, 2).map(l => l.replace(/^[*\s-]+/, '')).join(' | ');
        responseText += `Details: ${cleanSnippet}. `;
      }
      responseText += `Please share your shifting dates and contact number to arrange a coordinator call!`;
      return responseText;
    }
  }

  // 6. Services & Workflows
  if (query.includes('household') || query.includes('home') || query.includes('house') || query.includes('saman') || query.includes('furniture')) {
    return "For Household Shifting, we use multi-layer bubble wrap, corrugated sheets, and stretch film. Delicate glass items are packed in heavy-duty carton boxes, and everything is transported in secure closed containers.";
  }
  if (query.includes('car') || query.includes('bike') || query.includes('vehicle') || query.includes('scooter') || query.includes('motorcycle')) {
    return "We transport cars in specialized double-deck enclosed car carriers (scratch-free) and bikes in double-layer foam padding. We perform a full scratch/tyre inspection before loading.";
  }
  if (query.includes('office') || query.includes('corporate') || query.includes('server') || query.includes('business')) {
    return "We specialize in corporate shifting. We pack server racks/computers in shockproof crates and label desk inventories. Shifting is done over weekends to avoid employee downtime.";
  }

  // 7. General search fallback in the handbook text
  const words = query.split(/\s+/).filter(w => w.length > 3);
  if (words.length > 0) {
    const lines = websiteContext.split('\n');
    let matchedSnippet = '';
    for (const line of lines) {
      // Search for a line matching at least one keyword
      for (const word of words) {
        if (line.toLowerCase().includes(word) && !line.startsWith('#') && line.trim().length > 10) {
          matchedSnippet = line.replace(/^[*\s-]+/, '').trim();
          break;
        }
      }
      if (matchedSnippet) break;
    }
    if (matchedSnippet) {
      return `According to our handbook: "${matchedSnippet}" Let me know if you would like me to connect you with a coordinator on WhatsApp for more details!`;
    }
  }

  // 8. Default fallback
  return "I am currently responding in offline fallback mode. National Packers & Movers provides IBA-compliant household shifting, vehicle carriers, and corporate office shifting across Jharkhand, Bengal, Bihar, MP, UP, and Odisha. Please contact our helpline directly at 9835168368 for booking schedules!";
}

export async function POST(req) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[AI CHAT] GEMINI_API_KEY is missing in environmental settings. Falling back to connection error message.');
    return NextResponse.json({ error: 'Gemini API key is not configured.' }, { status: 500 });
  }

  // Load the complete website knowledge base dynamically from the local file
  let websiteContext = '';
  try {
    const filePath = path.join(process.cwd(), 'data', 'website_knowledge_base.md');
    websiteContext = await fs.readFile(filePath, 'utf-8');
  } catch (err) {
    console.error('[AI CHAT] Failed to read website_knowledge_base.md:', err);
    websiteContext = 'National Packers & Movers: Founded in 1987 by Debabrata Jhampaty. GSTIN: 20AIHPJ7005R1Z6. Registration Number: 0039.';
  }

  const SYSTEM_PROMPT = `
You are "Dev", the AI Operations & Relocation Coordinator for National Packers & Movers.
Your job is to assist clients, answer questions about shifting, explain reimbursement guidelines, and capture booking details.
Dev must act extremely smart and be deeply knowledgeable about the business, utilizing the full website content handbook provided below.

### OFFICIAL COMPANY HANDBOOK & KNOWLEDGE BASE:
${websiteContext}

### GENERAL & OFF-TOPIC QUESTIONS:
Since you are a highly capable LLM (Gemini 2.5), answer any general, educational, or off-topic questions intelligently using this knowledge base and your broad training. But always end the reply by pivoting back to the user's relocation plans (e.g. "Let me know if you are moving soon so I can calculate your estimate!").

### CHATBOT GUIDELINES:
1. Keep replies direct, helpful, and conversational (max 2-3 sentences).
2. If the user wants a quote/rates, you MUST capture:
   - Shifting Route (From and To).
   - Cargo Size / Home Size (e.g. 1 BHK, 2 BHK).
   - Tentative Shifting Date.
   - Contact Mobile Number & Name.
3. Once the customer provides their route, cargo size, and phone number, acknowledge it immediately (e.g., "Perfect! I am registering your moving details in our portal right now and our survey coordinator will call you back shortly.")

### OUTPUT FORMAT:
You must output your response as normal text, but if you have successfully captured the user's phone number, route, and cargo description, you must end your response with a structured JSON block on a new line enclosed in <LEAD_JSON> tags like this:
<LEAD_JSON>
{
  "name": "Customer Name",
  "phone": "10-Digit-Number",
  "from": "Origin City",
  "to": "Destination City",
  "date": "Shifting Date",
  "notes": "Brief cargo notes"
}
</LEAD_JSON>
`;

  try {
    const { messages } = await req.json();

    // Filter out the initial welcome bot message so the message history sent to Gemini
    // always starts with a 'user' role, ensuring correct alternating conversation flow.
    const filteredMessages = messages.filter((msg, index) => {
      return msg.sender === 'user' || index > 0;
    });

    const contents = filteredMessages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Inject system context instructions at the top
    contents.unshift({
      role: 'user',
      parts: [{ text: `System Context & Guidelines:\n${SYSTEM_PROMPT}\n\nExecute instructions above. Answer the user's latest query.` }]
    });

    let rawText = '';
    let leadData = null;
    let fallbackTriggered = false;

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contents })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('[AI CHAT] Gemini API returned error status:', response.status, errText);
        throw new Error(`Gemini status: ${response.status}`);
      }

      const data = await response.json();
      rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (apiErr) {
      console.warn('[AI CHAT] Gemini API call failed. Shifting to offline rules fallback...', apiErr.message);
      fallbackTriggered = true;
      rawText = runLocalRulesEngine(filteredMessages, websiteContext);
    }

    if (fallbackTriggered) {
      // Local lead extraction parsing helper inside fallback mode
      const lastMsg = filteredMessages[filteredMessages.length - 1]?.text || '';
      const phoneMatch = lastMsg.match(/\b\d{10}\b/);
      if (phoneMatch) {
        const extractedPhone = phoneMatch[0];
        leadData = {
          name: 'Offline Chat Inquiry',
          phone: extractedPhone,
          from: null,
          to: null,
          date: null,
          notes: `Offline Fallback: Captured during Gemini downtime. Message: "${lastMsg}"`
        };

        // Write lead to Supabase
        try {
          await createLead({
            name: leadData.name,
            phone: leadData.phone,
            email: null,
            from: null,
            to: null,
            date: null,
            moveType: 'household',
            notes: leadData.notes,
            source: 'Offline Chat Backup',
            status: 'New'
          });
          console.log('[AI CHAT] Offline Lead successfully recorded in Supabase:', leadData.phone);
        } catch (dbErr) {
          console.error('[AI CHAT] Failed to write offline lead to database:', dbErr);
        }
      }
    } else {
      // Normal extraction for successful Gemini response
      const jsonRegex = /<LEAD_JSON>([\s\S]*?)<\/LEAD_JSON>/;
      const match = rawText.match(jsonRegex);

      if (match && match[1]) {
        try {
          leadData = JSON.parse(match[1].trim());
          rawText = rawText.replace(jsonRegex, '').trim();

          // Ensure we have a valid name and phone
          if (leadData.phone && /^\d{10}$/.test(leadData.phone.replace(/[^0-9]/g, ''))) {
            try {
              await createLead({
                name: leadData.name || 'Web Chat Inquiry',
                phone: leadData.phone.replace(/[^0-9]/g, ''),
                email: null,
                from: leadData.from || null,
                to: leadData.to || null,
                date: leadData.date || null,
                moveType: 'household',
                notes: leadData.notes ? `AI Captured: ${leadData.notes}` : 'Captured via AI Shifting Chatbot',
                source: 'AI Chat Coordinator',
                status: 'New'
              });
              console.log('[AI CHAT] Lead successfully recorded in Supabase:', leadData.phone);
            } catch (dbErr) {
              console.error('[AI CHAT] Failed to write auto-lead to database:', dbErr);
            }
          }
        } catch (parseErr) {
          console.error('[AI CHAT] Failed to parse lead JSON block from model response:', parseErr);
        }
      }
    }

    return NextResponse.json({
      reply: rawText,
      leadCaptured: !!leadData,
      leadDetails: leadData
    });
  } catch (error) {
    console.error('[AI CHAT] Server error processing request:', error);
    return NextResponse.json({ error: 'Failed to process chat response' }, { status: 500 });
  }
}
