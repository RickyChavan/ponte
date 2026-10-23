// Every picture on the site, in one place. To use your own photograph, copy the file into
// frontend/public/photos/ and set `src` to "/photos/<file>" (and `alt` to what it shows).
// Slots with no `src` show a plain wash until a picture is supplied.

export interface Photo {
  src?: string
  srcSet?: string
  alt: string
  width?: number
  height?: number
  /** CSS object-position, to keep the subject in frame. */
  focus?: string
  /** Credit line for library photographs; shown in the footer. */
  credit?: { name: string; licence: string; href: string }
}

export const PHOTOS: Record<'hero' | 'founder-1' | 'founder-2', Photo> = {
  // Stand-in from the Wikimedia Commons library: replace with your own team or office photograph.
  hero: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg/1280px-KeizersgrachtReguliersgrachtAmsterdam.jpg',
    srcSet:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg/960px-KeizersgrachtReguliersgrachtAmsterdam.jpg 960w, https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg/1280px-KeizersgrachtReguliersgrachtAmsterdam.jpg 1280w, https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg/1920px-KeizersgrachtReguliersgrachtAmsterdam.jpg 1920w',
    alt: 'Canal bridges outlined with lights at dusk in Amsterdam',
    width: 3456,
    height: 2304,
    focus: '50% 55%',
    credit: {
      name: 'Massimo Catarinella',
      licence: 'CC BY-SA 3.0, Wikimedia Commons',
      href: 'https://commons.wikimedia.org/wiki/File:KeizersgrachtReguliersgrachtAmsterdam.jpg',
    },
  },
  // Founder portraits: add the real photographs here (portrait, about 4:5).
  'founder-1': { alt: 'Portrait of the first founder' },
  'founder-2': { alt: 'Portrait of the second founder' },
}
