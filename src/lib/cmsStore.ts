import fs from "fs";
import path from "path";
import {
  CmsContent,
  DEFAULT_CMS_CONTENT,
  ReassuranceMetric,
  CategoryCardItem,
  EngagementPillar
} from "@/types/cms";

export type {
  CmsContent,
  ReassuranceMetric,
  CategoryCardItem,
  EngagementPillar
};
export { DEFAULT_CMS_CONTENT };

const DATA_DIR = path.join(process.cwd(), "data");
const PUBLISHED_CONTENT_FILE = path.join(DATA_DIR, "site-content.json");
const DRAFT_CONTENT_FILE = path.join(DATA_DIR, "site-content-draft.json");
const PUBLISH_HISTORY_FILE = path.join(DATA_DIR, "publish-history.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Returns published CMS content (served to public visitors)
 */
export function getPublishedCmsContent(): CmsContent {
  ensureDir();
  try {
    if (fs.existsSync(PUBLISHED_CONTENT_FILE)) {
      const raw = fs.readFileSync(PUBLISHED_CONTENT_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_CMS_CONTENT, ...parsed };
    }
  } catch (err) {
    console.error("Erreur lecture site-content.json :", err);
  }

  // Initialize if not present
  try {
    fs.writeFileSync(PUBLISHED_CONTENT_FILE, JSON.stringify(DEFAULT_CMS_CONTENT, null, 2), "utf-8");
  } catch {}
  return DEFAULT_CMS_CONTENT;
}

/**
 * Returns draft CMS content (served to authenticated Admin in visual edit mode)
 */
export function getDraftCmsContent(): CmsContent {
  ensureDir();
  try {
    if (fs.existsSync(DRAFT_CONTENT_FILE)) {
      const raw = fs.readFileSync(DRAFT_CONTENT_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_CMS_CONTENT, ...parsed };
    }
  } catch (err) {
    console.error("Erreur lecture site-content-draft.json :", err);
  }

  // If no draft exists yet, initialize it from published
  const published = getPublishedCmsContent();
  try {
    fs.writeFileSync(DRAFT_CONTENT_FILE, JSON.stringify(published, null, 2), "utf-8");
  } catch {}
  return published;
}

/**
 * Saves changes to draft store
 */
export function saveDraftCmsContent(partial: Partial<CmsContent>): CmsContent {
  ensureDir();
  const current = getDraftCmsContent();
  const updated: CmsContent = {
    ...current,
    ...partial,
    lastUpdated: new Date().toISOString(),
    hasUnpublishedChanges: true
  };

  try {
    fs.writeFileSync(DRAFT_CONTENT_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.error("Erreur sauvegarde draft CMS :", err);
  }
  return updated;
}

/**
 * Publishes draft changes to the live site
 */
export function publishCmsContent(): CmsContent {
  ensureDir();
  const draft = getDraftCmsContent();
  const now = new Date().toISOString();

  const published: CmsContent = {
    ...draft,
    publishedAt: now,
    hasUnpublishedChanges: false
  };

  try {
    fs.writeFileSync(PUBLISHED_CONTENT_FILE, JSON.stringify(published, null, 2), "utf-8");
    fs.writeFileSync(DRAFT_CONTENT_FILE, JSON.stringify(published, null, 2), "utf-8");

    // Add entry to publish history
    let history: any[] = [];
    if (fs.existsSync(PUBLISH_HISTORY_FILE)) {
      try {
        history = JSON.parse(fs.readFileSync(PUBLISH_HISTORY_FILE, "utf-8"));
      } catch {}
    }
    history.unshift({
      timestamp: now,
      publishedBy: "Admin",
      summary: "Publication complète du site ROBOLAB"
    });
    fs.writeFileSync(PUBLISH_HISTORY_FILE, JSON.stringify(history.slice(0, 50), null, 2), "utf-8");
  } catch (err) {
    console.error("Erreur publication CMS :", err);
  }

  return published;
}
