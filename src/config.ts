export const markketplace = {
  api: import.meta.env.STRAPI_URL || 'https://api.markket.place',
  markket: import.meta.env.MARKKET_URL || 'https://de.markket.place',
  store_slug: import.meta.env.STORE_SLUG || 'farmday',
  markketplace: import.meta.env.MARKKETPLACE_URL || 'https://dev.markket.place',
  posthog_id: import.meta.env.PUBLIC_POSTHOG_KEY || '',
  url: import.meta.env.PUBLIC_URL || 'https://farmday.caliman.org',
  content: {
    title: 'Markketplace',
    url: 'https://dev.markket.place',
  },
  styles: {
    cover: 'https://markketplace.nyc3.digitaloceanspaces.com/uploads/c2491ef7c413165be47c9882a08d7ffd.png',
    secondary_color: '',
    primary_color: '',
    logo: 'https://markketplace.nyc3.digitaloceanspaces.com/uploads/e9f3a0b16c347ff596e4d0a5c7b0d47d.png',
    color: '',
    favicon: 'https://markketplace.nyc3.digitaloceanspaces.com/uploads/7e7d574c6559b065e8fcf0975792a22a.png',
  }
};
