import { Capacitor } from '@capacitor/core';
import { Purchases, LOG_LEVEL } from '@revenuecat/purchases-capacitor';

// REVENUECAT LIVE PRODUCTION API KEY FOR APP STORE
export const REVENUECAT_API_KEY = 'appl_JYVlJKQALPEgHINrBpUgYismGUU';
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
    const platform = Capacitor.getPlatform();
    if (platform !== 'ios' && platform !== 'android') {
      return true; // Web sandbox fallback
    }

    const offerings = await Purchases.getOfferings();
    console.log('[RevenueCat] Fetched offerings:', offerings);

    // 1. Try finding package in Offerings
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
          pkg.identifier.toLowerCase().includes(packageId) ||
          (pkg.product && pkg.product.identifier.toLowerCase().includes(packageId)) ||
          pkg.packageType.toLowerCase().includes(packageId)
      ) || allAvailablePackages[0];

      console.log('[RevenueCat] Purchasing target package:', targetPackage.identifier);
      const { customerInfo } = await Purchases.purchasePackage({ aPackage: targetPackage });
      return customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID] !== undefined;
    }

    // 2. Fallback: Query Store Products directly from Apple App Store
    const productIdMap = {
      annual: 'com.catmaster.pro.annual',
      monthly: 'com.catmaster.pro.monthly',
      lifetime: 'com.catmaster.pro.lifetime',
    };
    const targetProductId = productIdMap[packageId] || 'com.catmaster.pro.annual';

    console.log('[RevenueCat] Fetching StoreProduct directly from Apple StoreKit for:', targetProductId);
    const { products } = await Purchases.getProducts({ productIdentifiers: [targetProductId] });

    if (products && products.length > 0) {
      console.log('[RevenueCat] Purchasing StoreProduct directly:', products[0].identifier);
      const { customerInfo } = await Purchases.purchaseStoreProduct({ product: products[0] });
      return customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID] !== undefined;
    } else {
      console.warn('[RevenueCat] No products returned from StoreKit for ID:', targetProductId);
      alert(`[RevenueCat Bilgi] Apple StoreKit ürünü (${targetProductId}) bulunamadı. Lütfen App Store Connect > In-App Purchases bölümünde ürünlerin bağlandığından emin olun.`);
      return false;
    }
  } catch (error: any) {
    console.error('[RevenueCat] Purchase failed or cancelled:', error);
    if (error?.userCancelled) {
      console.log('[RevenueCat] User cancelled purchase');
    } else {
      alert(`[RevenueCat Ödeme Hatası] ${error?.message || JSON.stringify(error)}`);
    }
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
