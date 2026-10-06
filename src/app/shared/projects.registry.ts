/** Every project page, in the order the "previous / next" links follow. */
export interface RegistryEntry {
  id: string;
  title: { en: string; fr: string };
}

export const PROJECT_ORDER: RegistryEntry[] = [
  { id: 'car-rental', title: { en: 'Car Rental Manager', fr: 'Car Rental Manager' } },
  { id: 'mallos', title: { en: 'Mall OS', fr: 'Mall OS' } },
  { id: 'delivery-tracking', title: { en: 'SwiftDeliver', fr: 'SwiftDeliver' } },
  { id: 'sportclub', title: { en: 'SportClub Platform', fr: 'SportClub Platform' } },
  { id: 'friendmap', title: { en: 'FriendMap', fr: 'FriendMap' } },
  { id: 'data-analytics', title: { en: 'InsightHub', fr: 'InsightHub' } },
  { id: 'albumy', title: { en: 'Albumy', fr: 'Albumy' } },
  { id: 'n8n', title: { en: 'ReachFlow', fr: 'ReachFlow' } },
  { id: 'caferesto', title: { en: 'CafeResto', fr: 'CafeResto' } },
  { id: 'bookpro', title: { en: 'BookPro', fr: 'BookPro' } },
  { id: 'document-marketplace', title: { en: 'Massarat+', fr: 'Massarat+' } },
  { id: 'mediplus', title: { en: 'MediPlus', fr: 'MediPlus' } },
];
