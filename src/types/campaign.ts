export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'sending' | 'completed' | 'failed';
  audienceSize: number;
  deliveredCount: number;
  failedCount: number;
  createdAt: string;
  completedAt?: string;
}

export interface CampaignSegment {
  id: string;
  name: string;
  rules: SegmentRule[];
  createdAt: string;
  audienceSize: number;
}

export interface SegmentRule {
  id: string;
  field: string;
  operator: string;
  value: string | number;
  conjunction?: 'AND' | 'OR';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalSpend: number;
  visitCount: number;
  lastActivity: string;
  tags: string[];
  createdAt: string;
}

export interface CampaignMessage {
  id: string;
  campaign_id: string;
  subject: string;
  body: string;
  created_at: string;
}

export type CampaignDeliveryStatus = 'SENT' | 'FAILED' | 'PENDING';

export interface CommunicationLog {
  id: string;
  campaign_id: string;
  customer_id: string;
  message_id: string;
  status: CampaignDeliveryStatus;
  sent_at?: string;
  delivery_timestamp?: string;
  error_message?: string;
}