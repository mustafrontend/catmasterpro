/**
 * Cat Master PRO - Live VPS API Service Integration
 * Endpoint Base: https://www.sosyalvideoolustur.com.tr/api/cat
 */

const API_BASE_URL = 'https://www.sosyalvideoolustur.com.tr/api/cat';

export interface ApiLesson {
  id: string;
  title: string;
  category: string;
  estimatedMinutes: number;
  isPremium: boolean;
  videoUrl?: string;
}

export const CatApiService = {
  /**
   * Fetch 8 step-by-step lessons from VPS backend
   */
  async fetchLessons(): Promise<ApiLesson[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/lessons`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const data = await res.json();
      if (Array.isArray(data.lessons)) {
        return data.lessons;
      }
      return [];
    } catch {
      return [];
    }
  },

  async getLessons(): Promise<ApiLesson[]> {
    return this.fetchLessons();
  },

  /**
   * Sync Cat Profile, Health Logs & Sessions with live VPS backend
   */
  async syncCloudData(payload: {
    cats: any[];
    skills: any[];
    sessions: any[];
    reminders: any[];
    token?: string;
  }): Promise<{ success: boolean; data?: any }> {
    try {
      const token = payload.token || localStorage.getItem('cat_auth_token');

      // Guest / Local mode: do not send unauthorized HTTP requests if token is missing
      if (!token) {
        return { success: true, data: { isGuest: true } };
      }

      const res = await fetch(`${API_BASE_URL}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 401) {
          // Clean invalid token
          localStorage.removeItem('cat_auth_token');
          return { success: false, data: { unauthorized: true } };
        }
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      return { success: true, data };
    } catch {
      return { success: false };
    }
  },

  /**
   * Fetch reminders from live VPS backend
   */
  async getReminders(token?: string): Promise<any[]> {
    try {
      const authToken = token || localStorage.getItem('cat_auth_token');
      if (!authToken) return [];

      const res = await fetch(`${API_BASE_URL}/reminders`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) return [];
      const data = await res.json();
      return data.reminders || [];
    } catch {
      return [];
    }
  },

  /**
   * Notify Admin via SMTP email on app launch / user login
   */
  async notifyLogin(catName?: string, devicePlatform?: string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/notify_login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ catName, devicePlatform: devicePlatform || 'iOS/Web' }),
      });
    } catch (e) {
      console.warn('[CatApiService] Login notification email error:', e);
    }
  },

  /**
   * Notify Admin via SMTP email on successful in-app purchase
   */
  async notifyPurchase(packageId: string, price: string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/notify_purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId, price }),
      });
    } catch (e) {
      console.warn('[CatApiService] Purchase notification email error:', e);
    }
  },
};
