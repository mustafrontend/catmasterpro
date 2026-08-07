export interface ScheduleNotificationOptions {
  id: number;
  title: string;
  body: string;
  scheduleAt: Date;
  extraData?: Record<string, unknown>;
}

export class NotificationService {
  private static hasRequestedPermission = false;
  private static isNativeCapacitorAvailable(): boolean {
    return (
      typeof window !== 'undefined' &&
      !!(window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.()
    );
  }

  public static async requestPermission(): Promise<boolean> {
    if (this.isNativeCapacitorAvailable()) {
      try {
        const { LocalNotifications } = await import('@capacitor/local-notifications');
        const status = await LocalNotifications.requestPermissions();
        this.hasRequestedPermission = true;
        return status.display === 'granted';
      } catch (err) {
        console.warn('[NotificationService] Capacitor LocalNotifications plugin fallback:', err);
      }
    }

    // Web Fallback
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await window.Notification.requestPermission();
        this.hasRequestedPermission = true;
        return permission === 'granted';
      } catch (err) {
        console.warn('[NotificationService] Web Notification permission error:', err);
      }
    }

    return false;
  }

  public static async scheduleNotification(options: ScheduleNotificationOptions): Promise<boolean> {
    const { id, title, body, scheduleAt, extraData } = options;

    if (this.isNativeCapacitorAvailable()) {
      try {
        const { LocalNotifications } = await import('@capacitor/local-notifications');
        await LocalNotifications.schedule({
          notifications: [
            {
              id,
              title,
              body,
              schedule: { at: scheduleAt },
              extra: extraData,
              sound: 'beep.wav',
              smallIcon: 'ic_stat_icon',
              actionTypeId: 'OPEN_APP',
            },
          ],
        });
        return true;
      } catch (err) {
        console.warn('[NotificationService] Native schedule notification failed:', err);
      }
    }

    // Web Fallback schedule logic
    const msUntilTrigger = scheduleAt.getTime() - Date.now();
    if (msUntilTrigger > 0) {
      setTimeout(() => {
        if ('Notification' in window && window.Notification.permission === 'granted') {
          new window.Notification(title, {
            body,
            icon: '/cat-avatar-default.png',
            data: extraData,
          });
        } else {
          console.log(`[Notification Fallback Alert] ${title}: ${body}`);
        }
      }, msUntilTrigger);
    }
    return true;
  }

  public static async cancelNotification(id: number): Promise<void> {
    if (this.isNativeCapacitorAvailable()) {
      try {
        const { LocalNotifications } = await import('@capacitor/local-notifications');
        await LocalNotifications.cancel({ notifications: [{ id }] });
      } catch (err) {
        console.warn('[NotificationService] Cancel notification error:', err);
      }
    }
  }

  public static async scheduleVetAppointmentReminder(
    appointmentId: string,
    catName: string,
    title: string,
    appointmentDateStr: string,
    appointmentTimeStr: string
  ): Promise<number> {
    const notificationId = Math.floor(Math.abs(this.hashCode(appointmentId)) % 100000);
    const appointmentDateTime = new Date(`${appointmentDateStr}T${appointmentTimeStr}`);
    
    // Schedule reminder 2 hours before appointment
    const reminderTime = new Date(appointmentDateTime.getTime() - 2 * 60 * 60 * 1000);

    // If appointment is soon or future, schedule
    if (reminderTime.getTime() > Date.now()) {
      await this.scheduleNotification({
        id: notificationId,
        title: `🐾 Vet Appointment Reminder: ${catName}`,
        body: `${title} at ${appointmentTimeStr}. Don't forget their carrier!`,
        scheduleAt: reminderTime,
        extraData: { appointmentId, catName },
      });
    }

    return notificationId;
  }

  public static async scheduleMedicationReminder(
    medicationId: string,
    catName: string,
    medicationName: string,
    timeOfDayStr: string
  ): Promise<number> {
    const notificationId = Math.floor(Math.abs(this.hashCode(`${medicationId}_${timeOfDayStr}`)) % 100000);
    const [hours, minutes] = timeOfDayStr.split(':').map(Number);
    
    const targetDate = new Date();
    targetDate.setHours(hours || 9, minutes || 0, 0, 0);

    if (targetDate.getTime() < Date.now()) {
      targetDate.setDate(targetDate.getDate() + 1); // schedule for tomorrow if time passed today
    }

    await this.scheduleNotification({
      id: notificationId,
      title: `💊 Medication Time for ${catName}`,
      body: `Give ${catName} their ${medicationName} dose (${timeOfDayStr}).`,
      scheduleAt: targetDate,
      extraData: { medicationId, catName },
    });

    return notificationId;
  }

  // Schedule 3 daily training notifications (10:00, 15:00, 20:00)
  public static async setupDailyTrainingNotifications(catName: string = 'Kediniz'): Promise<void> {
    try {
      const isGranted = await this.requestPermission();
      if (!isGranted) return;

      const dailyTimes = [
        {
          id: 9001,
          hour: 10,
          minute: 0,
          title: `🐾 Sabah Eğitimi Zamanı!`,
          body: `${catName} ile 3 dakikalık pozitif pekiştirme seansına hazır mısın?`,
        },
        {
          id: 9002,
          hour: 15,
          minute: 0,
          title: `🎯 Eğitime Hazır Mısın?`,
          body: `Bugün 3 dakikalık 1 seans yaparak seri (streak) rekorunu koru!`,
        },
        {
          id: 9003,
          hour: 20,
          minute: 0,
          title: `🌙 Akşam Ödül Seansı!`,
          body: `Günün stresini atmak için ${catName} ile hızlı bir clicker seansı yap.`,
        },
      ];

      for (const item of dailyTimes) {
        const targetDate = new Date();
        targetDate.setHours(item.hour, item.minute, 0, 0);

        if (targetDate.getTime() < Date.now()) {
          targetDate.setDate(targetDate.getDate() + 1);
        }

        await this.scheduleNotification({
          id: item.id,
          title: item.title,
          body: item.body,
          scheduleAt: targetDate,
          extraData: { type: 'daily_training', catName },
        });
      }
      console.log('[NotificationService] Scheduled 3 daily training reminders (10:00, 15:00, 20:00)');
    } catch (err) {
      console.warn('[NotificationService] Error setting up daily training notifications:', err);
    }
  }

  // Schedule Vaccine Reminder (1 day prior)
  public static async scheduleVaccineReminder(
    vaccineId: string,
    catName: string,
    vaccineName: string,
    dueDateStr: string
  ): Promise<number> {
    const notificationId = Math.floor(Math.abs(this.hashCode(`vac_${vaccineId}`)) % 100000);
    const dueDate = new Date(`${dueDateStr}T09:00:00`);
    
    // 1 day before vaccine
    const reminderTime = new Date(dueDate.getTime() - 24 * 60 * 60 * 1000);

    if (reminderTime.getTime() > Date.now()) {
      await this.scheduleNotification({
        id: notificationId,
        title: `💉 Aşı Zamanı Yaklaştı: ${catName}`,
        body: `Yarın ${catName} için ${vaccineName} aşısı zamanı. Sağlık karnesini unutmayın!`,
        scheduleAt: reminderTime,
        extraData: { vaccineId, catName },
      });
    }

    return notificationId;
  }

  private static hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
}
