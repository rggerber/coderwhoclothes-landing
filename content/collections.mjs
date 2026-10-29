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

// These are thematic edits, not aesthetics. Collages are stored separately below.
export const editTopics = [
  { slug: 'green-bags', title: 'Green bags', description: 'A color-focused edit of green evening bags, clutches and statement shapes.', color: '#cdd7b4', shopUrl: 'https://shopmy.us/collections/8326267', shopLabel: 'Browse the wider bag collection' },
];

// Set status: 'published' only after the image, product facts and destination
// have been reviewed. Drafts are excluded from normal production builds.
export const collages = [
  { slug: 'green-four-ways', section: 'edits', group: 'green-bags', title: 'Green, four ways.', searchTitle: 'Green Evening Bags: Satin, Beaded and Leather Styles', description: 'A color-focused shopping edit: compare green satin, beaded texture and a sculptural leather knot. Try these accents with cream, chocolate or black.', image: '06.png', alt: 'Collage of four green bags: STAUD Eve clutch, peridot beaded Josphine bag, Reformation Solene wristlet and MÉLISSE knot bag.', products: ['STAUD Eve clutch in Wasabi', 'Peridot beaded Josphine mini bag', 'Reformation Solene wristlet in pear', 'MÉLISSE chartreuse leather knot bag'] },
  { slug: 'lace-satin-and-green', section: 'aesthetics', group: 'collected-contrast', title: 'Lace, satin & a little green', searchTitle: 'Lace Top and Satin Maxi Skirt Outfit Ideas', description: 'A texture-led outfit study combining embroidery, ivory satin and a moss-green bag.', image: '01.png', alt: 'Four-piece collage with an ivory pleated maxi skirt, black embroidered jacket, green tassel bag and black lace-trimmed top.', products: ['Manière De Voir Fiona ivory satin skirt', 'RIXO Denver embroidered jacket', 'SIMONMILLER moss-green tassel bag', 'RIXO Emmie lace-trimmed top'] },
  { slug: 'soft-shapes-interesting-layers', section: 'aesthetics', group: 'tempered-romance', title: 'Soft shapes. Interesting layers.', searchTitle: 'Asymmetric Skirt Outfit Ideas with Draped Tops', description: 'Two top directions to consider with an asymmetric skirt: a draped sleeveless shape or a close-fitting knit.', image: '02.png', alt: 'Four-piece collage of a pear-colored top, asymmetric skirt, black ballet flats and a mocca turtleneck.', products: ['The Five Studio Rio top in pear', '1999 Estudio Falda Sueño Café', 'Scarlet & Sam Noa black ballet flats', 'The Five Studio Frida mocca turtleneck'] },
  { slug: 'relaxed-denim-layers', section: 'aesthetics', group: 'relaxed-layering', title: 'Relaxed layers. Considered details.', searchTitle: 'Relaxed Denim Outfit Ideas with a Cream Jacket', description: 'Light denim and cream create an easy base; a loose shirt and a structured jacket give two layering options.', image: '03.png', alt: 'Four-piece collage of a putty jacket, light jeans, denim shirt and light-colored sandal clogs.', products: ['OZMA Loretta jacket in putty', 'OZMA Cinch jeans in salt', 'OZMA Denim Marcie shirt', 'Rachel Comey Sesley sandal clogs'] },
  { slug: 'ivory-satin-black-tailoring', section: 'aesthetics', group: 'refined-ease', title: 'Ivory satin. Black tailoring.', searchTitle: 'Ivory Satin Top and Black Wide-Leg Pants Outfit', description: 'Soft draping with a clean trouser line: a dinner outfit idea with a woven bag and coffee-colored heels.', image: '04.png', alt: 'Four-piece collage of an ivory cowl-neck satin top, black wide-leg pants, coffee-colored heels and a black woven bag.', products: ['JAKI Les ivory satin top', 'DISSH Parker black wide-leg pants', 'St. Agni Petit Pouch heels in coffee', 'St. Agni black woven mini tote'] },
  { slug: 'animal-print-controlled-dose', section: 'aesthetics', group: 'controlled-wild', title: 'Animal print. A controlled dose.', searchTitle: 'Animal Print Outfit Ideas with Black Trousers', description: 'Choose a printed coat or a tiger clutch as the focal point, with simpler black pieces to ground the look.', image: '05.png', alt: 'Four-piece collage of a tiger-print clutch, black faux-leather trousers, animal-print coat and wide black belt.', products: ['Le Nodo Le Clutch Classic Tigre', 'SEROYA Ronja black trousers', 'SEROYA Chiara Bengal-print coat', 'St. Agni Wide Classic Belt in black'] },
].map(item => ({ ...item, status: 'draft' }));
