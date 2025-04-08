import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    categories: [
      { id: 1, name: 'Bedding', slug: 'Bedding' },
      { id: 2, name: 'Bath', slug: 'Bath' }
    ]
  },
  getters: {
    cartTotal: state => {
      return state.cart.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    cartCount: state => {
      return state.cart.reduce((count, item) => {
        return count + item.quantity
      }, 0)
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    addToCart(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.cart.push({
          ...product,
          quantity: 1
        })
      }
    },
    updateCartItem(state, { id, quantity }) {
      const item = state.cart.find(item => item.id === id)
      if (item) {
        item.quantity = quantity
      }
    },
    removeFromCart(state, id) {
      state.cart = state.cart.filter(item => item.id !== id)
    },
    clearCart(state) {
      state.cart = []
    }
  },
  actions: {
    fetchProducts({ commit }) {
      // In a real app, this would be an API call
      // For now, we'll use hardcoded data
      const products = [
        {
          "id": 1,
          "name": "Bedsure Waffle Duvet Cover Queen Set - Dark Grey",
          "price": 3499,
          "originalPrice": 4198.8,
          "description": "Premium quality waffle textured duvet cover queen set with 2 pillow shams. Made from soft, moisture-wicking fabric with zipper closure and corner ties. Perfect for all-season comfort.",
          "category": "Bedding",
          "image": "https://ext.same-assets.com/1656695661/479450343.jpeg",
          "stock": 15
        },
        {
          "id": 2,
          "name": "Bedsure Waffle Duvet Cover Queen Set - Cream White",
          "price": 3299,
          "originalPrice": 3958.8,
          "description": "Luxurious waffle textured duvet cover set in cream white. Includes duvet cover and 2 pillow shams. Soft microfiber material that's both breathable and durable for year-round use.",
          "category": "Bedding",
          "image": "https://m.media-amazon.com/images/I/91W9DterWWL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 12
        },
        {
          "id": 3,
          "name": "JELLYMONI 100% Cotton Striped Duvet Cover Set",
          "price": 2999,
          "originalPrice": 3598.8,
          "description": "100% cotton duvet cover set with classic thin stripe pattern. Set includes one queen duvet cover and two pillow shams. Breathable fabric with button closure and corner ties.",
          "category": "Bedding",
          "image": "https://m.media-amazon.com/images/I/811VZKvFwZL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 8
        },
        {
          "id": 4,
          "name": "ENJOHOS Blue Floral Patchwork Quilt Set Queen Size",
          "price": 4199,
          "originalPrice": 5038.8,
          "description": "Beautiful blue floral patchwork quilt set with vintage-inspired design. Set includes 1 quilt and 2 pillow shams. Perfect for adding a cottage core aesthetic to your bedroom.",
          "category": "Bedding",
          "image": "https://m.media-amazon.com/images/I/91gjDBBcQOL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 5
        },
        {
          "id": 5,
          "name": "Navy Blue Queen Bed in a Bag Comforter Set - 7 Pieces",
          "price": 4599,
          "originalPrice": 5518.8,
          "description": "Complete 7-piece navy blue comforter set including comforter, flat sheet, fitted sheet, bed skirt, 2 pillow shams, and 1 decorative pillow. Modern striped design with soft microfiber material.",
          "category": "Bedding",
          "image": "https://m.media-amazon.com/images/I/719w4ld8JXL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 7
        },
        {
          "id": 6,
          "name": "DREAMNINE Soft Fuzzy Faux Rabbit Fur Throw Blanket - White",
          "price": 2499,
          "originalPrice": 2998.8,
          "description": "Ultra-soft faux rabbit fur throw blanket in elegant white. Plush and luxurious feel, perfect for adding warmth and texture to your bed or couch. Machine washable for easy care.",
          "category": "Bedding",
          "image": "https://m.media-amazon.com/images/I/81YFIFPG6PL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 20
        },
        {
          "id": 7,
          "name": "Lush Decor Race Car Kids' 3-Piece Quilt Bed Set - Twin",
          "price": 3199,
          "originalPrice": 3838.8,
          "description": "Fun race car themed quilt set for kids. Includes quilt and 2 pillow shams with colorful car designs. Made from soft, durable cotton blend fabric that's machine washable.",
          "category": "Kids Bedding",
          "image": "https://m.media-amazon.com/images/I/91kEvU0QC4L._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 10
        },
        {
          "id": 8,
          "name": "American Soft Linen 6-Piece Luxury Towel Set - White",
          "price": 2899,
          "originalPrice": 3478.8,
          "description": "Premium 6-piece cotton towel set including 2 bath towels, 2 hand towels, and 2 washcloths. Made from 100% Turkish cotton for maximum absorbency and softness. Quick-drying and durable.",
          "category": "Bath",
          "image": "https://m.media-amazon.com/images/I/81TbrZM7s1L._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 25
        },
        {
          "id": 9,
          "name": "LANE LINEN 100% Cotton Bath Towels Set - Space Grey",
          "price": 2599,
          "originalPrice": 3118.8,
          "description": "Elegant 6-piece bath towel set in space grey. Includes 2 bath towels, 2 hand towels, and 2 washcloths. Made from premium 100% cotton with high absorbency and plush softness.",
          "category": "Bath",
          "image": "https://m.media-amazon.com/images/I/91T2d54aafL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 18
        },
        {
          "id": 10,
          "name": "Chakir Turkish Linens Luxury Spa and Hotel Quality Towel Set",
          "price": 2799,
          "originalPrice": 3358.8,
          "description": "Hotel-quality 6-piece towel set in silver gray. Set includes 2 bath towels, 2 hand towels, and 2 washcloths. Crafted from premium Turkish cotton with double-stitched hems for extra durability.",
          "category": "Bath",
          "image": "https://m.media-amazon.com/images/I/91ok9hjOlPL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 14
        },
        {
          "id": 11,
          "name": "OLANLY Bathroom Rug - Beige Chenille Bath Mat",
          "price": 1499,
          "originalPrice": 1798.8,
          "description": "Plush chenille bathroom rug with non-slip backing. Size: 30x20 inches. Ultra-absorbent and soft underfoot with durable construction. Machine washable for easy maintenance.",
          "category": "Bath",
          "image": "https://m.media-amazon.com/images/I/91wxQE7yPML._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 22
        },
        {
          "id": 12,
          "name": "4-Piece Thanksgiving Fall Bathroom Set with Shower Curtain",
          "price": 2299,
          "originalPrice": 2758.8,
          "description": "Festive fall bathroom set featuring pumpkin designs. Includes shower curtain, contour rug, bath mat, and toilet lid cover. Made from waterproof polyester with machine-washable rugs.",
          "category": "Bath",
          "image": "https://m.media-amazon.com/images/I/81FN0ICUi0L._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 6
        },
        {
          "id": 13,
          "name": "Pink Solid Color 4-Piece Bathroom Set",
          "price": 1999,
          "originalPrice": 2398.8,
          "description": "Simple and elegant solid pink bathroom set. Includes shower curtain, contour rug, bath mat, and toilet lid cover. Perfect for adding a pop of color to your bathroom.",
          "category": "Bath",
          "image": "https://m.media-amazon.com/images/I/6136YLvrjgL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 13
        },
        {
          "id": 14,
          "name": "Bath Fusion Cameron Bath Rug Set with Shower Curtain - Dark Grey",
          "price": 2699,
          "originalPrice": 3238.8,
          "description": "Elegant bathroom set featuring a damask pattern. Includes a 72-inch shower curtain with matching bath rug set. Machine washable with non-slip backing on rugs.",
          "category": "Bath",
          "image": "https://m.media-amazon.com/images/I/91c84zFTwqL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 9
        },
        {
          "id": 15,
          "name": "Christmas Snowman 4-Piece Bathroom Set",
          "price": 2399,
          "originalPrice": 2878.8,
          "description": "Festive 'Let it Snow' bathroom set featuring a cheerful snowman design. Includes shower curtain, toilet lid cover, contour rug, and bath mat. Perfect for holiday decorating.",
          "category": "Bath",
          "image": "https://m.media-amazon.com/images/I/71ToU44bnTL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 4
        },
        {
          "id": 16,
          "name": "White and Grey Striped Shower Curtain",
          "price": 1199,
          "originalPrice": 1438.8,
          "description": "Minimalist white shower curtain with grey stripes at the bottom. Made from high-quality fabric with reinforced buttonholes. Waterproof and mildew-resistant with classic farmhouse style.",
          "category": "Bath",
          "image": "https://m.media-amazon.com/images/I/71s70PPkf6L._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 30
        },
        {
          "id": 17,
          "name": "Decorative Throw Pillow Covers - Burnt Orange (Set of 2)",
          "price": 1099,
          "originalPrice": 1318.8,
          "description": "Set of 2 burnt orange chenille throw pillow covers with decorative stitch detail. Size: 18x18 inches. Soft velvet-like texture perfect for fall and winter home decor.",
          "category": "Home Decor",
          "image": "https://m.media-amazon.com/images/I/71YAboIsyAL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 16
        },
        {
          "id": 18,
          "name": "Star Shaped Plush Pillow - Cream White",
          "price": 1399,
          "originalPrice": 1678.8,
          "description": "Adorable star-shaped decorative pillow in soft cream white. Size: 19.7 inches. Made from plush, soft material. Perfect for kids' rooms, nurseries, or as a fun accent piece.",
          "category": "Home Decor",
          "image": "https://m.media-amazon.com/images/I/71UH8y0B64L._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 11
        },
        {
          "id": 19,
          "name": "Geometric Pattern Throw Pillow Cover - Mint Green",
          "price": 899,
          "originalPrice": 1078.8,
          "description": "Stylish mint green throw pillow cover with diamond geometric pattern and tassels. Size: 18x18 inches. Removable cover with hidden zipper for easy cleaning.",
          "category": "Home Decor",
          "image": "https://m.media-amazon.com/images/I/A1WOFRAx6hL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 24
        },
        {
          "id": 20,
          "name": "Corduroy Decorative Throw Pillow Cover - Orange with Pom Poms",
          "price": 999,
          "originalPrice": 1198.8,
          "description": "Vibrant orange corduroy throw pillow cover with playful pom-pom trim. Size: 18x18 inches. Adds texture and a pop of color to any room. Machine washable.",
          "category": "Home Decor",
          "image": "https://m.media-amazon.com/images/I/81XpsL1phCL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 17
        },
        {
          "id": 21,
          "name": "100% Cotton Sheet Set - Queen Size Light Blue",
          "price": 2999,
          "originalPrice": 3598.8,
          "description": "Pure cotton queen sheet set in light blue. Includes flat sheet, fitted sheet, and 2 pillowcases. 400 thread count for a soft, luxurious feel with deep pocket fitted sheet.",
          "category": "Bedding",
          "image": "https://m.media-amazon.com/images/I/71MrW222GWL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 19
        },
        {
          "id": 22,
          "name": "Microfiber Queen Sheet Set - Dark Grey",
          "price": 1799,
          "originalPrice": 2158.8,
          "description": "Soft microfiber queen sheet set in dark grey. Includes flat sheet, fitted sheet, and 2 pillowcases. Wrinkle-resistant and fade-resistant with brushed finish for extra softness.",
          "category": "Bedding",
          "image": "https://m.media-amazon.com/images/I/71t45pSxVkL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 28
        },
        {
          "id": 23,
          "name": "Decorative Bed Runner with Matching Pillow Covers - Royal Blue",
          "price": 1899,
          "originalPrice": 2278.8,
          "description": "Elegant royal blue bed runner with 2 matching pillow covers. Features embroidered floral design and silky texture. Perfect for adding a luxurious touch to your bedroom.",
          "category": "Bedding",
          "image": "https://m.media-amazon.com/images/I/61oU0ic5RjL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 7
        },
        {
          "id": 24,
          "name": "Waterproof Mattress Protector - Queen Size",
          "price": 1699,
          "originalPrice": 2038.8,
          "description": "Premium waterproof mattress protector with fitted skirt for queen size beds. Hypoallergenic with breathable barrier. Protects against spills, stains, dust mites, and allergens.",
          "category": "Bedding",
          "image": "https://m.media-amazon.com/images/I/71ETkjHgcbL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 33
        },
        {
          "id": 25,
          "name": "2-Pack Down Alternative Pillows - Standard Size",
          "price": 1599,
          "originalPrice": 1918.8,
          "description": "Set of 2 hotel-quality down alternative pillows. Hypoallergenic fiber filling with cotton cover. Medium firmness suitable for all sleeping positions. Machine washable.",
          "category": "Bedding",
          "image": "https://m.media-amazon.com/images/I/613x0tPjpWL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 26
        },
        {
          "id": 26,
          "name": "Knitted Throw Blanket - Teal",
          "price": 1899,
          "originalPrice": 2278.8,
          "description": "Cozy knitted throw blanket in teal blue. Size: 50x60 inches. Made from soft acrylic yarn with decorative fringe. Perfect for snuggling on the couch or adding as a bed accent.",
          "category": "Bedding",
          "image": "https://m.media-amazon.com/images/I/81FqA9daRlL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 12
        },
        {
          "id": 27,
          "name": "3-Piece Bathroom Accessory Set - White Ceramic",
          "price": 1499,
          "originalPrice": 1798.8,
          "description": "Elegant white ceramic bathroom accessory set. Includes soap dispenser, toothbrush holder, and soap dish. Modern minimalist design that complements any bathroom decor.",
          "category": "Bath",
          "image": "https://m.media-amazon.com/images/I/61ML-XytWhL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 20
        },
        {
          "id": 28,
          "name": "Extra Large Cotton Bath Towel - Sage Green",
          "price": 1299,
          "originalPrice": 1558.8,
          "description": "Oversized sage green bath towel. Size: 35x70 inches. Made from 100% combed cotton with high absorption and quick-drying properties. Perfect for the bath or beach.",
          "category": "Bath",
          "image": "https://m.media-amazon.com/images/I/81zArBdMjXL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 18
        },
        {
          "id": 29,
          "name": "Memory Foam Bath Mat Set - Grey (2-Piece)",
          "price": 1899,
          "originalPrice": 2278.8,
          "description": "Set of 2 luxurious memory foam bath mats in grey. Includes one large (20x32 inch) and one contour mat. Super plush with non-slip backing. Machine washable cover with resilient foam interior.",
          "category": "Bath",
          "image": "https://m.media-amazon.com/images/I/81JqWneZqpL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 15
        },
        {
          "id": 30,
          "name": "Bamboo Shower Caddy - Expandable",
          "price": 1799,
          "originalPrice": 2158.8,
          "description": "Natural bamboo shower caddy with expandable design. Features adjustable shelves, soap dish, and hooks for razors. Water-resistant treatment with drain holes for quick drying.",
          "category": "Bath",
          "image": "https://m.media-amazon.com/images/I/71cpkXY4b5L._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 9
        }
      ]

      // Add more products to get to 32

      commit('setProducts', products)
    }
  }
})
