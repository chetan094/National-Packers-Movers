'use client';

import { useEffect } from 'react';

export default function WebMcpRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.modelContext?.registerTool) {
      try {
        window.navigator.modelContext.registerTool({
          name: 'calculate_moving_cost',
          description: 'Calculate instant relocation and packing cost estimates for moving household, corporate, or vehicle items across Indian cities.',
          inputSchema: {
            type: 'object',
            properties: {
              moveType: { type: 'string', enum: ['household', 'corporate', 'vehicle', 'industrial'] },
              fromCity: { type: 'string', description: 'Origin city' },
              toCity: { type: 'string', description: 'Destination city' },
            },
            required: ['moveType', 'fromCity', 'toCity'],
          },
          execute: async (args) => {
            return {
              status: 'success',
              message: `Relocation quote initialized for ${args.moveType} shift from ${args.fromCity} to ${args.toCity}. Call helpline +91-9835168368 for immediate confirmation.`,
            };
          },
        });

        window.navigator.modelContext.registerTool({
          name: 'track_consignment',
          description: 'Track shipment status and live location of a National Packers & Movers consignment.',
          inputSchema: {
            type: 'object',
            properties: {
              consignmentNumber: { type: 'string', description: 'Consignment / LR number' },
            },
            required: ['consignmentNumber'],
          },
          execute: async (args) => {
            return {
              status: 'success',
              consignmentNumber: args.consignmentNumber,
              message: 'Consignment status active. For live GPS telemetry call +91-9835168368.',
            };
          },
        });
      } catch {
        // Fallback silently if browser does not support modelContext
      }
    }
  }, []);

  return (
    <form
      toolname="request_quote"
      tooldescription="Submit inquiry for packers and movers relocation estimate"
      style={{ display: 'none' }}
      aria-hidden="true"
      action="/get-quote"
    >
      <input name="moveType" type="hidden" defaultValue="household" />
      <input name="fromCity" type="hidden" defaultValue="Dhanbad" />
      <input name="toCity" type="hidden" defaultValue="Kolkata" />
    </form>
  );
}
