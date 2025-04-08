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
          "name": "Samsung Galaxy A54 6GB RAM-128GB Storage",
          "price": 42999,
          "originalPrice": 49999,
          "description": "6.4-inch Super AMOLED display, 50MP camera, 5000mAh battery, Android 13",
          "category": "Smartphones",
          "image": "https://m.media-amazon.com/images/I/618GdXB6JlL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 25
        },
        {
          "id": 2,
          "name": "Xiaomi Redmi Note 12 Pro 8GB RAM-256GB",
          "price": 36999,
          "originalPrice": 45999,
          "description": "6.67-inch AMOLED display, 108MP camera, 5000mAh battery, Snapdragon processor",
          "category": "Smartphones",
          "image": "https://m.media-amazon.com/images/I/61It8HMCz8L._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 18
        },
        {
          "id": 3,
          "name": "Lenovo IdeaPad Slim 3 Laptop",
          "price": 46999,
          "originalPrice": 54999,
          "description": "Intel Core i3, 8GB RAM, 256GB SSD, 15.6-inch HD display, Windows 11",
          "category": "Laptops",
          "image": "https://m.media-amazon.com/images/I/71OJ8m9zQXL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 10
        },
        {
          "id": 4,
          "name": "DELL Latitude E5270 Laptop",
          "price": 47999,
          "originalPrice": 58999,
          "description": "Intel Core i5, 8GB RAM, 256GB SSD, 12.5-inch display, refurbished",
          "category": "Laptops",
          "image": "https://m.media-amazon.com/images/I/81OSVN7tgRL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 8
        },
        {
          "id": 5,
          "name": "HP LaserJet M15w Wireless Printer",
          "price": 28999,
          "originalPrice": 34999,
          "description": "Compact laser printer, 19ppm print speed, WiFi connectivity, mobile printing",
          "category": "Printers",
          "image": "https://m.media-amazon.com/images/I/71uMFKhjioL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 15
        },
        {
          "id": 6,
          "name": "Dawlance Refrigerator 9188 WB",
          "price": 45999,
          "originalPrice": 49999,
          "description": "8 cubic feet capacity, energy efficient, glass shelves, vegetable drawer",
          "category": "Home Appliances",
          "image": "https://m.media-amazon.com/images/I/61fTMFIW3wL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 12
        },
        {
          "id": 7,
          "name": "Anex Deluxe Juicer Blender AG-188",
          "price": 4899,
          "originalPrice": 6499,
          "description": "3-in-1 food processor, 4 speed settings, stainless steel blades, 1-year warranty",
          "category": "Kitchen Appliances",
          "image": "https://m.media-amazon.com/images/I/51GtiTNHXrL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 30
        },
        {
          "id": 8,
          "name": "100% Original Zamurd Gemstone",
          "price": 34000,
          "originalPrice": 40000,
          "description": "Natural emerald gemstone, 3 carat weight, certified, perfect for jewelry making",
          "category": "Jewelry",
          "image": "https://m.media-amazon.com/images/I/31uV2+FrtIL._AC_UL600_FMwebp_QL65_.jpg",
          "stock": 5
        },
        {
          "id": 9,
          "name": "Magic Warm Body Winter Unisex Electric Heated Jacket",
          "price": 8999,
          "originalPrice": 12999,
          "description": "USB powered heated jacket, 3 temperature settings, water-resistant, multiple sizes",
          "category": "Fashion",
          "image": "https://m.media-amazon.com/images/I/51XMXdxVRXL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 20
        },
        {
          "id": 10,
          "name": "DSLR Nikon D3500 With 18-55mm Lens",
          "price": 48999,
          "originalPrice": 54999,
          "description": "24.2MP CMOS sensor, Full HD video recording, Bluetooth connectivity, beginner-friendly",
          "category": "Cameras",
          "image": "https://m.media-amazon.com/images/I/81a2+nYahxL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 7
        },
        {
          "id": 11,
          "name": "Gree 1.5 Ton Inverter AC GS-18PITH7WL",
          "price": 49999,
          "originalPrice": 59999,
          "description": "Energy efficient cooling, WiFi enabled, eco-friendly refrigerant, silent operation",
          "category": "Home Appliances",
          "image": "https://m.media-amazon.com/images/I/41Zfngny8OS._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 10
        },
        {
          "id": 12,
          "name": "Wireless Earbuds Half Noise Reduction Bluetooth Earphone",
          "price": 3400,
          "originalPrice": 4599,
          "description": "True wireless stereo, noise cancellation, 20hrs battery life, touch controls",
          "category": "Audio Accessories",
          "image": "https://m.media-amazon.com/images/I/61t8Ob6GPwL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 35
        },
        {
          "id": 13,
          "name": "OCILINA Mens Swimming Shorts Swim Trunks Quick Drying",
          "price": 4400,
          "originalPrice": 6500,
          "description": "Breathable fabric, quick-dry material, elastic waistband, multiple colors available",
          "category": "Sports & Outdoor",
          "image": "https://m.media-amazon.com/images/I/61cvr4nzm+L._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 25
        },
        {
          "id": 14,
          "name": "Pack Coffee Filter Bags Portable Hanging Ear Style",
          "price": 1899,
          "originalPrice": 2599,
          "description": "50pcs disposable coffee filters, environmentally friendly, easy to use, portable",
          "category": "Kitchen Accessories",
          "image": "https://m.media-amazon.com/images/I/71bhBf7YtUL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 50
        },
        {
          "id": 15,
          "name": "Europe and United States new silver-plated men's domineering ring",
          "price": 2998,
          "originalPrice": 4299,
          "description": "Adjustable size, tarnish-resistant plating, elegant design, gift box included",
          "category": "Jewelry",
          "image": "https://m.media-amazon.com/images/I/81s-tlNUJ-L._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 18
        },
        {
          "id": 16,
          "name": "Expandable Fridge Storage Rack Plastic Fridge Space Saver Fridge Shelf",
          "price": 2559,
          "originalPrice": 3720,
          "description": "Adjustable width, durable plastic, easy to clean, maximizes refrigerator storage space",
          "category": "Home Organization",
          "image": "https://m.media-amazon.com/images/I/61n3ZHv-maL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 22
        },
        {
          "id": 17,
          "name": "2022 Men's Leather PU Wallet with ID Zipper Purse Removable Card Holder",
          "price": 3456,
          "originalPrice": 4350,
          "description": "Multiple card slots, zipper coin pocket, removable ID holder, premium PU leather",
          "category": "Fashion Accessories",
          "image": "https://m.media-amazon.com/images/I/81HLc-gjNSL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 30
        },
        {
          "id": 18,
          "name": "2 Piece TA211IN TA211IN2 DIP-24 IC Hook",
          "price": 4099,
          "originalPrice": 5150,
          "description": "Electronic component, 24-pin DIP package, high-quality integrated circuit for DIY projects",
          "category": "Electronic Components",
          "image": "https://m.media-amazon.com/images/I/61qJlwGq8UL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 15
        },
        {
          "id": 19,
          "name": "Cat Cartoon Plush Photocards Holder Kawaii Rabbit Korean Style Card Case",
          "price": 1520,
          "originalPrice": 2150,
          "description": "Cute design, holds up to 40 cards, soft plush material, portable size",
          "category": "Stationery",
          "image": "https://m.media-amazon.com/images/I/417q1A4pYtL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 40
        },
        {
          "id": 20,
          "name": "Waterproof 170° HD Car RearView Reverse Backup Camera",
          "price": 1899,
          "originalPrice": 2450,
          "description": "170-degree wide angle, night vision capability, easy installation, weather resistant",
          "category": "Automotive",
          "image": "https://m.media-amazon.com/images/I/61Afn7TefkL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 18
        },
        {
          "id": 21,
          "name": "Storage Tools Nylon Storage Straps Heavy Duty Handle Hose Organizer",
          "price": 1299,
          "originalPrice": 1850,
          "description": "Set of 5, durable nylon material, adjustable design, ideal for garden hoses and cords",
          "category": "Home & Garden",
          "image": "https://m.media-amazon.com/images/I/71xnlNOiLkS._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 25
        },
        {
          "id": 22,
          "name": "50W LED Flood Light COB Chip Lamp 220/220V White High Brightness IP65",
          "price": 1049,
          "originalPrice": 1599,
          "description": "50W high brightness, energy efficient, waterproof IP65 rated, outdoor use approved",
          "category": "Lighting",
          "image": "https://m.media-amazon.com/images/I/61edTyx4D2L._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 20
        },
        {
          "id": 23,
          "name": "Popcorn Maker/Hot Air Popcorn Maker/Household Air Popped Popcorn Machine",
          "price": 4999,
          "originalPrice": 6999,
          "description": "Oil-free popcorn maker, fast operation, easy to clean, compact design for home use",
          "category": "Kitchen Appliances",
          "image": "https://m.media-amazon.com/images/I/51DddaY-uxL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 15
        },
        {
          "id": 24,
          "name": "JQUYI 4X Badminton Tennis Racket Handle over Grip Wrap Sweatband",
          "price": 932,
          "originalPrice": 1450,
          "description": "Anti-slip design, sweat-absorbent material, pack of 4, suitable for all racket sports",
          "category": "Sports & Outdoor",
          "image": "https://m.media-amazon.com/images/I/71rD+JNMU4L._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 45
        },
        {
          "id": 25,
          "name": "Velvet Jewelry storage case Spa etious Storage Amazing Velvet Jewelry Organizer Box",
          "price": 785,
          "originalPrice": 1299,
          "description": "Elegant velvet finish, multiple compartments, portable design, protects jewelry from scratches",
          "category": "Home Organization",
          "image": "https://m.media-amazon.com/images/I/51xmx7ejDOL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 30
        },
        {
          "id": 26,
          "name": "12pcs Happy birthday themed2 Cupcakes/birthday banner/birthday decoration",
          "price": 1125,
          "originalPrice": 1850,
          "description": "Complete birthday decoration set, cupcake toppers, banners, colorful designs",
          "category": "Party Supplies",
          "image": "https://m.media-amazon.com/images/I/81ksTdOQQlL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 25
        },
        {
          "id": 27,
          "name": "National standard D9 rose DTL copper aluminum terminal high-voltage wire connector",
          "price": 2750,
          "originalPrice": 3950,
          "description": "High-quality copper-aluminum terminal, corrosion resistant, high voltage compatible, pack of 10",
          "category": "Electronic Components",
          "image": "https://m.media-amazon.com/images/I/61mUZsV9YNL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 20
        },
        {
          "id": 28,
          "name": "Glycolic Acid 7% Toning Solution - 240ML Bright Instant Glow for All Skin Types",
          "price": 1850,
          "originalPrice": 2980,
          "description": "Exfoliating toner, improves skin texture, reduces fine lines, alcohol-free formula",
          "category": "Beauty",
          "image": "https://m.media-amazon.com/images/I/714i5qu9dTL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 18
        },
        {
          "id": 29,
          "name": "8pcs Car Upgraded Door Bulkhead Kit Door Rattle Fix Set",
          "price": 4081,
          "originalPrice": 4950,
          "description": "Reduces car door rattles, easy installation, durable material, universal fit for most vehicles",
          "category": "Automotive",
          "image": "https://m.media-amazon.com/images/I/71z8JAgKtBL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 15
        },
        {
          "id": 30,
          "name": "Multifunctional Magnetic Hang Dry eraser Plastic Glasses Hook Storage Rack",
          "price": 4250,
          "originalPrice": 5950,
          "description": "Magnetic mounting, multifunctional storage, ideal for dry erase markers and glasses, easy to install",
          "category": "Home Organization",
          "image": "https://m.media-amazon.com/images/I/71aOo+78haL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 22
        }
      ]

      // Add more products to get to 32

      commit('setProducts', products)
    }
  }
})
