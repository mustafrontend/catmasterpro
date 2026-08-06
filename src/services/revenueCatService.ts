import { Capacitor } from '@capacitor/core';
import { Purchases, LOG_LEVEL } from '@revenuecat/purchases-capacitor';

// REVENUECAT API KEY FROM REVENUECAT DASHBOARD
export const REVENUECAT_API_KEY = 'test_zyBIeoJvywAucjIbspgHipfbOWz';
export const REVENUECAT_ENTITLEMENT_ID = 'pro_access';

export const initializeRevenueCat = async (): Promise<boolean> => {
  try {
    await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });

    const platform = Capacitor.getPlatform();
    console.log('[RevenueCat] Configuring RevenueCat on platform:', platform);

    if (platform === 'ios' || platform === 'android') {
      await Purchases.configure({ apiKey: REVENUECAT_API_KEY });
      console.log('[RevenueCat] Successfully configured RevenueCat SDK with key:', REVENUECAT_API_KEY);
      return true;
    } else {
      console.log('[RevenueCat] Web browser mode detected. SDK configuration skipped.');
      return false;
    }
  } catch (error) {
    console.error('[RevenueCat] Initialization error:', error);
    return false;
  }
};

export const checkIsProUser = async (): Promise<boolean> => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo.customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID] !== undefined;
  } catch {
    return false;
  }
};

export const purchaseProPackage = async (packageId: 'annual' | 'monthly' | 'lifetime'): Promise<boolean> => {
  try {
    const offerings = await Purchases.getOfferings();
    console.log('[RevenueCat] Fetched offerings:', offerings);

    // Collect all packages from current offering + all available offerings
    let allAvailablePackages = offerings.current?.availablePackages || [];
    if (offerings.all) {
      Object.values(offerings.all).forEach((offering) => {
        if (offering && offering.availablePackages) {
          allAvailablePackages = [...allAvailablePackages, ...offering.availablePackages];
        }
      });
    }

    if (allAvailablePackages.length > 0) {
      const targetPackage = allAvailablePackages.find(
        (pkg) =>
          pkg.identifier.includes(packageId) ||
          (pkg.product && pkg.product.identifier.includes(packageId)) ||
          pkg.packageType.toLowerCase().includes(packageId)
      ) || allAvailablePackages[0];

      console.log('[RevenueCat] Purchasing target package:', targetPackage.identifier);
      const { customerInfo } = await Purchases.purchasePackage({ aPackage: targetPackage });
      return customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID] !== undefined;
    }
    return false;
  } catch (error) {
    console.error('[RevenueCat] Purchase failed or cancelled:', error);
    return false;
  }
};

export const restoreProPurchases = async (): Promise<boolean> => {
  try {
    const { customerInfo } = await Purchases.restorePurchases();
    return customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID] !== undefined;
  } catch (error) {
    console.error('[RevenueCat] Restore failed:', error);
    return false;
  }
};
