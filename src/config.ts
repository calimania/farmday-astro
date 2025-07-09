export const markketplace = {
  api: import.meta.env.STRAPI_URL || 'https://markket.farmday.io',
  markket: import.meta.env.MARKKET_URL || 'https://api.farmday.io',
  store_slug: import.meta.env.STORE_SLUG || 'farmday',
  markketplace: import.meta.env.MARKKETPLACE_URL || 'https://de.markket.place',
  posthog_id: import.meta.env.PUBLIC_POSTHOG_KEY || '',
  url: import.meta.env.PUBLIC_URL || 'https://farmday.io',
  content: {
    title: 'Farmday',
    url: 'https://farmday.io',
  },
  styles: {
    cover: 'https://markketplace.nyc3.digitaloceanspaces.com/uploads/c2491ef7c413165be47c9882a08d7ffd.png',
    secondary_color: '',
    primary_color: '',
    logo: 'https://markketplace.nyc3.digitaloceanspaces.com/uploads/de9a4e973e95821a8fa312cdb0f79db4.png',
    color: '',
    favicon: 'https://markketplace.nyc3.digitaloceanspaces.com/uploads/dcc2b867fb4736c356bb481fc6eecab5.png',
  }
};
