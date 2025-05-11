import { Campaign, CampaignSegment, Customer } from '../types/campaign';
import { v4 as uuidv4 } from 'uuid';

// Mock dashboard stats data
export const fetchDashboardStats = (): Promise<{
  totalCustomers: number;
  activeCampaigns: number;
  deliveryRate: number;
  avgEngagement: number;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalCustomers: 2489,
        activeCampaigns: 3,
        deliveryRate: 96.8,
        avgEngagement: 44.2,
      });
    }, 800);
  });
};

// Mock recent campaigns data
export const fetchRecentCampaigns = (): Promise<Campaign[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Spring Promotion',
          status: 'completed',
          audienceSize: 1242,
          deliveredCount: 1198,
          failedCount: 44,
          createdAt: '2023-04-12T10:30:00Z',
          completedAt: '2023-04-12T11:45:00Z',
        },
        {
          id: '2',
          name: 'Loyalty Rewards',
          status: 'sending',
          audienceSize: 582,
          deliveredCount: 325,
          failedCount: 12,
          createdAt: '2023-04-15T14:20:00Z',
        },
        {
          id: '3',
          name: 'Abandoned Cart Recovery',
          status: 'draft',
          audienceSize: 0,
          deliveredCount: 0,
          failedCount: 0,
          createdAt: '2023-04-16T09:15:00Z',
        },
        {
          id: '4', 
          name: 'Welcome Series',
          status: 'completed',
          audienceSize: 104,
          deliveredCount: 101,
          failedCount: 3,
          createdAt: '2023-04-08T08:30:00Z',
          completedAt: '2023-04-08T09:15:00Z',
        },
        {
          id: '5',
          name: 'Product Updates',
          status: 'completed',
          audienceSize: 1876,
          deliveredCount: 1805,
          failedCount: 71,
          createdAt: '2023-04-05T16:45:00Z',
          completedAt: '2023-04-05T18:30:00Z',
        },
      ]);
    }, 800);
  });
};

// Mock segments data
export const fetchSegments = (): Promise<CampaignSegment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'High Spenders',
          rules: [
            {
              id: '1-1',
              field: 'totalSpend',
              operator: '>',
              value: 10000,
            },
          ],
          createdAt: '2023-03-15T12:30:00Z',
          audienceSize: 542,
        },
        {
          id: '2',
          name: 'Inactive Customers',
          rules: [
            {
              id: '2-1',
              field: 'lastActivity',
              operator: '<',
              value: '90',
              conjunction: 'AND',
            },
            {
              id: '2-2',
              field: 'totalSpend',
              operator: '>',
              value: 1000,
            },
          ],
          createdAt: '2023-03-20T09:45:00Z',
          audienceSize: 328,
        },
        {
          id: '3',
          name: 'New Customers',
          rules: [
            {
              id: '3-1',
              field: 'createdAt',
              operator: '>',
              value: '30',
            },
          ],
          createdAt: '2023-04-01T14:15:00Z',
          audienceSize: 104,
        },
      ]);
    }, 800);
  });
};

// Mock customers data
export const fetchCustomers = (): Promise<Customer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: uuidv4(),
          name: 'Alex Johnson',
          email: 'alex.johnson@example.com',
          phone: '+1-555-123-4567',
          totalSpend: 12450,
          visitCount: 28,
          lastActivity: '2023-04-15T10:30:00Z',
          tags: ['vip', 'frequent-buyer'],
          createdAt: '2022-10-05T08:15:00Z',
        },
        {
          id: uuidv4(),
          name: 'Samantha Williams',
          email: 'sam.williams@example.com',
          phone: '+1-555-987-6543',
          totalSpend: 8975,
          visitCount: 15,
          lastActivity: '2023-04-10T14:45:00Z',
          tags: ['regular'],
          createdAt: '2022-11-12T11:30:00Z',
        },
        {
          id: uuidv4(),
          name: 'Michael Chen',
          email: 'michael.chen@example.com',
          totalSpend: 4350,
          visitCount: 9,
          lastActivity: '2023-03-22T09:15:00Z',
          tags: ['new-customer'],
          createdAt: '2023-01-20T15:45:00Z',
        },
        {
          id: uuidv4(),
          name: 'Emily Rodriguez',
          email: 'emily.rodriguez@example.com',
          phone: '+1-555-234-5678',
          totalSpend: 16780,
          visitCount: 34,
          lastActivity: '2023-04-16T16:20:00Z',
          tags: ['vip', 'loyalty-program'],
          createdAt: '2022-08-15T13:10:00Z',
        },
        {
          id: uuidv4(),
          name: 'David Kim',
          email: 'david.kim@example.com',
          totalSpend: 2150,
          visitCount: 5,
          lastActivity: '2023-02-18T11:05:00Z',
          tags: ['inactive'],
          createdAt: '2022-12-10T10:30:00Z',
        },
      ]);
    }, 1000);
  });
};

// Calculate audience size based on segment rules
export const calculateAudienceSize = (
  rules: { field: string; operator: string; value: string | number; conjunction?: 'AND' | 'OR' }[]
): Promise<number> => {
  return new Promise((resolve) => {
    // Simulate a calculation - in real API this would evaluate rules against customer database
    setTimeout(() => {
      // Generate a realistic but random number between 100 and 2000
      const size = Math.floor(Math.random() * 1900) + 100;
      resolve(size);
    }, 500);
  });
};

// Generate AI message suggestions
export const generateAIMessageSuggestions = (
  segmentName: string, 
  campaignObjective: string
): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const suggestions = [
        `Hi {customer.firstName}, we noticed you haven't shopped with us recently. Here's 10% off your next purchase!`,
        `{customer.firstName}, we miss you! Come back and enjoy exclusive savings just for you.`,
        `Hey {customer.firstName}! It's been a while. Here's a special offer to welcome you back to our store.`
      ];
      
      resolve(suggestions);
    }, 800);
  });
};

// Generate AI campaign performance summary
export const generateAICampaignSummary = (campaign: Campaign): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Calculate delivery rate
      const deliveryRate = ((campaign.deliveredCount / campaign.audienceSize) * 100).toFixed(1);
      
      // Different summaries based on campaign status
      if (campaign.status === 'completed') {
        resolve(
          `Your campaign "${campaign.name}" reached ${campaign.audienceSize.toLocaleString()} customers with a ${deliveryRate}% delivery rate. Out of all messages, ${campaign.failedCount} failed to deliver. Customers with higher engagement rates responded best to this campaign.`
        );
      } else if (campaign.status === 'sending') {
        resolve(
          `Your campaign "${campaign.name}" is currently in progress. So far, ${campaign.deliveredCount.toLocaleString()} out of ${campaign.audienceSize.toLocaleString()} messages have been delivered (${deliveryRate}% delivery rate). The campaign is performing within expected parameters.`
        );
      } else {
        resolve(
          `Your draft campaign "${campaign.name}" is ready to be sent to ${campaign.audienceSize.toLocaleString()} customers. Based on previous campaigns, we expect a delivery rate of approximately 96%.`
        );
      }
    }, 800);
  });
};