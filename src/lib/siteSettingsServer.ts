import clientPromise from "./mongodb";
import {
  SiteSettings,
  defaultSiteSettings,
  defaultPreHeader,
  defaultStats,
  defaultPricing,
} from "./siteSettingsTypes";

const SETTINGS_DOC_ID = "global_settings";
const DB_NAME = process.env.MONGODB_DB || "gtm_pro";
const COLLECTION_NAME = "site_settings";

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const doc = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: SETTINGS_DOC_ID } as any);

    if (!doc) {
      // First-time seed into database
      await db.collection(COLLECTION_NAME).updateOne(
        { _id: SETTINGS_DOC_ID } as any,
        {
          $set: {
            ...defaultSiteSettings,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );
      return defaultSiteSettings;
    }

    return {
      preHeader: { ...defaultPreHeader, ...(doc.preHeader || {}) },
      stats: { ...defaultStats, ...(doc.stats || {}) },
      pricing: {
        ...defaultPricing,
        ...(doc.pricing || {}),
        freePlan: { ...defaultPricing.freePlan, ...(doc.pricing?.freePlan || {}) },
        fiveAccountsPlan: {
          ...defaultPricing.fiveAccountsPlan,
          ...(doc.pricing?.fiveAccountsPlan || {}),
        },
        unlimitedPlan: {
          ...defaultPricing.unlimitedPlan,
          ...(doc.pricing?.unlimitedPlan || {}),
        },
        whiteLabelPlan: {
          ...defaultPricing.whiteLabelPlan,
          ...(doc.pricing?.whiteLabelPlan || {}),
        },
        sourceCode: {
          ...defaultPricing.sourceCode,
          ...(doc.pricing?.sourceCode || {}),
        },
      },
      updatedAt: doc.updatedAt,
    };
  } catch (error) {
    console.error("[GET_SITE_SETTINGS_ERROR]", error);
    return defaultSiteSettings;
  }
}

export async function saveSiteSettings(
  newSettings: Partial<SiteSettings>
): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const updatePayload = {
      ...newSettings,
      updatedAt: new Date().toISOString(),
    };

    await db.collection(COLLECTION_NAME).updateOne(
      { _id: SETTINGS_DOC_ID } as any,
      { $set: updatePayload },
      { upsert: true }
    );

    return true;
  } catch (error) {
    console.error("[SAVE_SITE_SETTINGS_ERROR]", error);
    return false;
  }
}

