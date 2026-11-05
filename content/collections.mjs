// Stable aesthetic groups. Add any number of collages to a group's slug.
export const aesthetics = [
  ['collected-contrast', 'Collected Contrast', 'Embroidery, fluid satin and unexpected color. Pieces with individual character, brought together with intention.', '6325807', '#d7dbc6'],
  ['tempered-romance', 'Tempered Romance', 'Draping, soft shapes and delicate details, balanced with grounded everyday pieces.', '5817907', '#e5d3cc'],
  ['relaxed-layering', 'Relaxed Layering', 'Easy denim, loose proportions and thoughtful layers for everyday dressing.', '5041895', '#d6dee0'],
  ['controlled-sensuality', 'Controlled Sensuality', 'A considered approach to revealing lines, draped shapes and evening dressing.', '4898061', '#d9c5bb'],
  ['refined-ease', 'Refined Ease', 'Soft draping and clean tailoring. Understated pieces with a distinctive point of view.', '4715550', '#e7dfce'],
  ['sculpted-contrast', 'Sculpted Contrast', 'An exploration of silhouette: defined shapes, contrasting proportions and an intentional balance.', '4682462', '#d6d0c6'],
  ['cultured-eclectic', 'Cultured Eclectic', 'Unexpected combinations, expressive details and pieces that feel collected over time.', '4352313', '#d5c7b4'],
  ['sculpted-minimalism', 'Sculpted Minimalism', 'Shape and proportion take the lead in a restrained, considered wardrobe.', '4187672', '#e5e1d9'],
  ['structured-intelligence', 'Structured Intelligence', 'An edit centered on structure, precise lines and thoughtful outfit composition.', '4178531', '#c8ced0'],
  ['controlled-wild', 'Controlled Wild', 'Animal print and statement texture, grounded by simpler supporting pieces.', '4163437', '#d6c3a7'],
].map(([slug, title, description, collectionId, color]) => ({ slug, title, description, color, shopUrl: `https://shopmy.us/shop/collections/${collectionId}` }));

// User-selected moodboard covers, kept in their full original proportions.
const coverSlugs = ["collected-contrast", "controlled-wild", "structured-intelligence", "sculpted-minimalism", "cultured-eclectic", "sculpted-contrast", "refined-ease", "relaxed-layering", "controlled-sensuality", "tempered-romance"];
for (const group of aesthetics) {
 if (coverSlugs.includes(group.slug)) {
  group.cover = `/aesthetic-covers/${group.slug}.jpg`;
  group.coverAlt = `${group.title} outfit moodboard`;
 }
}

// Edits → category → individual edit → outfit visuals. Aesthetics stay separate.
export const editCategories = [
  { slug: 'gift-guides', title: 'Gift Guides', description: 'Thoughtful finds for giving, from small delights to pieces worth the upgrade. Browse curated ideas by budget.', color: '#e5d5cc' },
  { slug: 'fall-fashion', title: 'Fall Fashion', description: 'Fall fashion inspiration through rich textures, relaxed tailoring and sophisticated everyday outfits. Explore neutral wardrobe styling and seasonal color stories.', color: '#d6c3af' },
  { slug: 'statement-bags-clutches', title: 'Statement Bags & Clutches', description: 'Distinctive bags, evening clutches and accessories worth building an outfit around. Explore color stories and considered shapes.', color: '#ded6c7' },
];

// Set category on every edit. Optional path preserves a legacy public URL.
// Collages (outfit visuals) are stored separately below.
export const editTopics = [
  { slug: 'green-bags', category: 'statement-bags-clutches', path: '/collections/edits/green-bags/', title: 'Green bags', description: 'A color-focused edit of green evening bags, clutches and statement shapes.', color: '#cdd7b4', shopUrl: 'https://shopmy.us/collections/8326267', shopLabel: 'Browse the wider bag collection' },
  { slug: 'gifts-under-50', category: 'gift-guides', title: 'Gifts Under $50', layout: 'editorial', searchTitle: 'Gifts Under $50: Thoughtful Gift Guide', description: 'Little luxuries, personal accessories, beauty finds and thoughtful objects I would actually give. Explore the gift guide and shop the full selection.', metaDescription: 'Explore Rebecca Gerber’s Gifts Under $50 guide, with ideas across accessories, beauty, home and more. View the editorial slides and shop the linked collection.', color: '#e8ddd2', cover: '/collection-assets/01-under-50-01.webp', coverAlt: 'Gifts Under $50 editorial cover featuring gold earrings, a bright scarf, beauty products and accessories.', coverWidth: 1080, coverHeight: 1920, showCoverOnPage: false, shopUrl: 'https://shopmy.us/collections/8678994', shopLabel: 'Shop Gifts Under $50', galleryTitle: 'The gift guide', note: 'These slides were designed for social sharing. Shop the linked collection for the full list and current product details.' },
  { slug: 'gifts-under-100', category: 'gift-guides', title: 'Gifts Under $100', layout: 'editorial', searchTitle: 'Gifts Under $100: Considered Gift Guide', description: 'Pieces worth the upgrade: expressive accessories, soft layers, beauty and home finds that feel special to give. Explore the guide and shop the full selection.', metaDescription: 'Explore Rebecca Gerber’s Gifts Under $100 guide, with considered fashion, beauty and home gift ideas. View the editorial slides and shop the linked collection.', color: '#ded4d4', cover: '/collection-assets/02-under-100-01.webp', coverAlt: 'Gifts Under $100 editorial cover featuring a lilac sweater, red pouch, colorful bowl, beauty products and accessories.', coverWidth: 1080, coverHeight: 1920, showCoverOnPage: false, shopUrl: 'https://shopmy.us/collections/8678998', shopLabel: 'Shop Gifts Under $100', galleryTitle: 'The gift guide', note: 'These slides were designed for social sharing. Shop the linked collection for the full list and current product details.' },
];

for (const [slug, title, prefix, collectionId, description, color] of [
  ['gifts-under-250', 'Gifts Under $250', '03-under-250', '8679003', 'A considered mix of fashion, accessories, jewelry and pieces for the home, with gifts for the people closest to you.', '#ded6cb'],
  ['the-splurge', 'The Splurge', '04-splurge', '8679006', 'Statement pieces and enduring luxuries for a memorable gift.', '#d7c8bb'],
  ['whats-on-my-wishlist', "What's on My Wishlist", '05-wishlist', '8679008', 'The fashion, accessories and jewelry I keep coming back to.', '#ded2ca'],
  ['gifts-for-the-homebody', 'Gifts for the Homebody', '06-homebody', '8679009', 'Comfort, character and little rituals for staying in.', '#d9dbca'],
  ['jewelry-shell-actually-wear', "Jewelry She'll Actually Wear", '07-jewelry', '8679011', 'Everyday pieces with a little sparkle, from delicate details to expressive rings.', '#e7dcd0'],
  ['vintage-designer-gifts', 'Vintage Designer Gifts', '08-vintage', '8679012', 'Pre-owned designer finds with individual character.', '#d6c8b7'],
  ['gifts-for-him', 'Gifts for Him', '09-for-him', '8679014', 'Useful, considered gifts for his wardrobe and everyday life.', '#ded8cc'],
]) {
  editTopics.push({
    slug, category: 'gift-guides', title, layout: 'editorial',
    searchTitle: `${title}: Coder Who Clothes Gift Guide`, description: `${description} Explore the slides and shop the full selection.`,
    metaDescription: `Explore Rebecca Gerber’s ${title} guide. View the editorial slides and shop the linked collection.`,
    color, cover: `/collection-assets/${prefix}-01.webp`, coverAlt: `${title} editorial gift guide cover.`,
    coverWidth: 1080, coverHeight: 1920, showCoverOnPage: false,
    shopUrl: `https://shopmy.us/collections/${collectionId}`, shopLabel: `Shop ${title}`,
    galleryTitle: 'The gift guide',
    note: 'These slides were designed for social sharing. Shop the linked collection for the full list and current product details.',
  });
}

editTopics.push({
  slug: 'nico', category: 'fall-fashion', title: 'Nico', layout: 'editorial', showCoverOnPage: false,
  searchTitle: 'Nico: Elevated Denim & Neutral Fall Outfit Ideas',
  description: 'Nico is a considered approach to everyday dressing, built around elevated denim, tonal browns, and sophisticated combinations of cream, camel, and navy. The collection brings together relaxed tailoring, rich textures, soft knitwear, and polished accessories for a wardrobe that feels effortless but intentional.',
  metaDescription: 'Explore elevated denim outfit ideas, chocolate brown outfits, and cream, camel and navy combinations in Nico, a considered fall fashion edit by Rebecca Gerber.',
  color: '#d6c3af', cover: '/collection-assets/nico-elevated-denim.jpeg',
  coverAlt: 'Nico editorial collage with relaxed blue denim, black tailoring, cream tops and brown accessories.',
  coverWidth: 1299, coverHeight: 1938,
  shopUrl: 'https://shopmy.us/collections/8644947', shopLabel: 'Shop the Edit',
  interpretation: 'These AI-assisted styling interpretations explore the Nico collection. Colors, proportions and details may differ from the linked products; exact product correspondence has not been independently verified. Refer to the ShopMy collection for product details.',
});

export const editPath = group => group.path || `/collections/edits/${group.category}/${group.slug}/`;
export const groupPath = (section, group) => section === 'edits' ? editPath(group) : `/collections/aesthetics/${group.slug}/`;

// Publication is authorized by Rebecca for this batch, including retained sold-out links.
// Set status: 'published' only after the image, product facts and destination
// have been reviewed. Drafts are excluded from normal production builds.
export const collages = [
  { slug: 'green-four-ways', section: 'edits', group: 'green-bags', title: 'Green, four ways.', searchTitle: 'Green Evening Bags: Satin, Beaded and Leather Styles', description: 'A color-focused shopping edit: compare green satin, beaded texture and a sculptural leather knot. Try these accents with cream, chocolate or black.', image: 'green-four-ways.webp', alt: 'Collage of four green bags: STAUD Eve clutch, FANCI CLUB forest-green long clutch, peridot beaded Josphine bag and MÉLISSE knot bag.', products: ['STAUD Eve clutch in Wasabi', 'Peridot beaded Josphine mini bag', 'FANCI CLUB Extended Ostrich Long Clutch in Forest Green', 'MÉLISSE chartreuse leather knot bag'] },
  { slug: 'lace-satin-and-green', section: 'aesthetics', group: 'collected-contrast', title: 'Lace, satin & a little green', searchTitle: 'Lace Top and Satin Maxi Skirt Outfit Ideas', description: 'A texture-led outfit study combining embroidery, ivory satin and a moss-green bag.', image: '01.png', alt: 'Four-piece collage with an ivory pleated maxi skirt, black embroidered jacket, green tassel bag and black lace-trimmed top.', products: ['Manière De Voir Fiona ivory satin skirt', 'RIXO Denver embroidered jacket', 'SIMONMILLER moss-green tassel bag', 'RIXO Emmie lace-trimmed top'] },
  { slug: 'soft-shapes-interesting-layers', section: 'aesthetics', group: 'tempered-romance', title: 'Soft shapes. Interesting layers.', searchTitle: 'Asymmetric Skirt Outfit Ideas with Draped Tops', description: 'Two top directions to consider with an asymmetric skirt: a draped sleeveless shape or a close-fitting knit.', image: '02.png', alt: 'Four-piece collage of a pear-colored top, asymmetric skirt, black ballet flats and a mocca turtleneck.', products: ['The Five Studio Rio top in pear', '1999 Estudio Falda Sueño Café', 'Scarlet & Sam Noa black ballet flats', 'The Five Studio Frida mocca turtleneck'] },
  { slug: 'relaxed-denim-layers', section: 'aesthetics', group: 'relaxed-layering', title: 'Relaxed layers. Considered details.', searchTitle: 'Relaxed Denim Outfit Ideas with a Cream Jacket', description: 'Light denim and cream create an easy base; a loose shirt and a structured jacket give two layering options.', image: '03.png', alt: 'Four-piece collage of a putty jacket, light jeans, denim shirt and light-colored sandal clogs.', products: ['OZMA Loretta jacket in putty', 'OZMA Cinch jeans in salt', 'OZMA Denim Marcie shirt', 'Rachel Comey Sesley sandal clogs'] },
  { slug: 'ivory-satin-black-tailoring', section: 'aesthetics', group: 'refined-ease', title: 'Ivory satin. Black tailoring.', searchTitle: 'Ivory Satin Top and Black Wide-Leg Pants Outfit', description: 'Soft draping with a clean trouser line: a dinner outfit idea with a woven bag and coffee-colored heels.', image: '04.png', alt: 'Four-piece collage of an ivory cowl-neck satin top, black wide-leg pants, coffee-colored heels and a black woven bag.', products: ['JAKI Les ivory satin top', 'DISSH Parker black wide-leg pants', 'St. Agni Petit Pouch heels in coffee', 'St. Agni black woven mini tote'] },
  { slug: 'animal-print-controlled-dose', section: 'aesthetics', group: 'controlled-wild', title: 'Animal print. A controlled dose.', searchTitle: 'Animal Print Outfit Ideas with Black Trousers', description: 'Choose a printed coat or a tiger clutch as the focal point, with simpler black pieces to ground the look.', image: '05.png', alt: 'Four-piece collage of a tiger-print clutch, black faux-leather trousers, animal-print coat and wide black belt.', products: ['Le Nodo Le Clutch Classic Tigre', 'SEROYA Ronja black trousers', 'SEROYA Chiara Bengal-print coat', 'St. Agni Wide Classic Belt in black'] },
].map(item => ({ ...item, status: 'published' }));

// Approved final editorial images supplied by Rebecca. No unverified product names.
collages.push(
  { slug: 'elevated-denim', section: 'edits', group: 'nico', status: 'published', title: 'Elevated Denim', searchTitle: 'Nico — Elevated Denim Outfit Ideas', description: 'Relaxed denim meets black tailoring, contrast-trimmed knitwear, and refined accessories. An exploration of making familiar wardrobe pieces feel more considered.', image: 'nico-elevated-denim.jpeg', width: 1299, height: 1938, alt: 'AI-assisted Nico editorial collage showing wide-leg blue denim with black blazers and trench styling, cream blouses, contrast-trimmed cardigans and brown bags.', interpretation: true },
  { slug: 'espresso-dressing', section: 'edits', group: 'nico', status: 'published', title: 'Espresso Dressing', searchTitle: 'Nico — Espresso Dressing & Chocolate Brown Outfits', description: 'Rich browns, suede textures, soft knits, and relaxed tailoring create a tonal wardrobe with depth and character.', image: 'nico-espresso-dressing.jpeg', width: 1320, height: 1964, alt: 'AI-assisted Espresso Dressing editorial collage showing tonal brown outfits with checked tailoring, textured knitwear, a camel skirt, trousers and brown accessories.', interpretation: true },
  { slug: 'cream-camel-navy', section: 'edits', group: 'nico', status: 'published', title: 'Cream, Camel & Navy', searchTitle: 'Nico — Cream, Camel & Navy Outfit Ideas', description: 'Soft cream knitwear and camel suede meet structured navy pieces, balancing ease with a more polished silhouette.', image: 'nico-cream-camel-navy.jpeg', width: 1320, height: 1962, alt: 'AI-assisted Nico editorial collage combining cream knitwear and blouses, a camel skirt, navy trousers and outerwear, and brown bags and heels.', interpretation: true },
);

// Supplied social slides in original sequence and proportions. Current shopping
// details are supplied by each guide's ShopMy collection.
for (const [group, prefix, count, title] of [
  ['gifts-under-50', '01-under-50', 9, 'Gifts Under $50'],
  ['gifts-under-100', '02-under-100', 11, 'Gifts Under $100'],
  ['gifts-under-250', '03-under-250', 10, 'Gifts Under $250'],
  ['the-splurge', '04-splurge', 10, 'The Splurge'],
  ['whats-on-my-wishlist', '05-wishlist', 8, "What's on My Wishlist"],
  ['gifts-for-the-homebody', '06-homebody', 8, 'Gifts for the Homebody'],
  ['jewelry-shell-actually-wear', '07-jewelry', 11, "Jewelry She'll Actually Wear"],
  ['vintage-designer-gifts', '08-vintage', 3, 'Vintage Designer Gifts'],
  ['gifts-for-him', '09-for-him', 4, 'Gifts for Him'],
]) {
  // The final social slide asks viewers to comment for links. The website has
  // a direct ShopMy button instead, so omit that slide from the gallery.
  for (let number = 1; number < count; number++) {
    const page = String(number).padStart(2, '0');
    collages.push({ slug: `slide-${page}`, section: 'edits', group, status: 'published', title: number === 1 ? 'The cover' : `Gift ideas · ${page}`, searchTitle: `${title} — Slide ${number} of ${count - 1}`, description: number === 1 ? `An introduction to the ${title} edit.` : `A page of ideas from the ${title} guide.`, image: `${prefix}-${page}.webp`, width: 1080, height: 1920, alt: `${title} editorial gift guide collage, slide ${number} of ${count - 1}.`, interpretation: true });
  }
}
