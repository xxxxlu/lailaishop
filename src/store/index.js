import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    categories: [
      { id: 1, name: 'kurtas', slug: 'kurtas' },
      { id: 4, name: 'Clocks', slug: 'clocks' }
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
          id: 1,
          name: "Unstitched Men's Soft Egyptian Cotton Shalwar Kameez",
          price: 1899,
          originalPrice: 2278.8, // 1899 * 1.2
          description: "Elegant unstitched men's shalwar kameez made from high-quality soft Egyptian cotton. Perfect for formal events and everyday wear.",
          category: "Men's Fashion",
          image: "https://ext.same-assets.com/38964423/19217565.jpeg",
          stock: true ? 10 : 0
        },
        {
          id: 2,
          name: "Pakistani Wash N Wear Men's Shalwar Kameez",
          price: 1799,
          originalPrice: 2158.8, // 1799 * 1.2
          description: "Premium quality wash and wear shalwar kameez in maroon color. Easy maintenance and comfortable for everyday use.",
          category: "Men's Fashion",
          image: "https://ext.same-assets.com/38964423/1323193879.jpeg",
          stock: true ? 10 : 0
        },
        {
          id: 3,
          name: "Rasasi L'Incontournable Blue Lady Perfume",
          price: 2999,
          originalPrice: 3598.8, // 2999 * 1.2
          description: "A luxurious perfume with a captivating scent perfect for women. Long-lasting fragrance for special occasions.",
          category: "Beauty & Health",
          image: "https://ext.same-assets.com/38964423/1846040737.jpeg",
          stock: true ? 10 : 0
        },
        {
          id: 4,
          name: "Rechargeable LED Table Fan",
          price: 1399,
          originalPrice: 1678.8, // 1399 * 1.2
          description: "Portable rechargeable LED table fan with adjustable speed settings. Perfect for home and office use.",
          category: "Appliances",
          image: "https://ext.same-assets.com/38964423/2964393110.false",
          stock: true ? 10 : 0
        },
        {
          id: 5,
          name: "Artificial Flower Bouquet",
          price: 899,
          originalPrice: 1078.8, // 899 * 1.2
          description: "Beautiful artificial flower arrangement in a decorative vase. Perfect for home decor that requires no maintenance.",
          category: "Home & Living",
          image: "https://ext.same-assets.com/38964423/1576205675.false",
          stock: true ? 10 : 0
        },
        {
          id: 6,
          name: "Butterfly Nail Art Stickers",
          price: 299,
          originalPrice: 358.8, // 299 * 1.2
          description: "Set of colorful butterfly nail art stickers for beautiful nail decoration. Easy to apply and long-lasting.",
          category: "Beauty & Health",
          image: "https://ext.same-assets.com/38964423/150617405.false",
          stock: true ? 10 : 0
        },
        {
          id: 7,
          name: "Portable Bluetooth Speaker",
          price: 1599,
          originalPrice: 1918.8, // 1599 * 1.2
          description: "Compact portable Bluetooth speaker with exceptional sound quality. Water-resistant and perfect for outdoor activities.",
          category: "Electronics",
          image: "https://ext.same-assets.com/38964423/2182205906.false",
          stock: true ? 10 : 0
        },
        {
          id: 8,
          name: "Men's Casual T-Shirt",
          price: 899,
          originalPrice: 1078.8, // 899 * 1.2
          description: "Comfortable cotton t-shirt for men in blue color. Perfect for casual wear with modern design.",
          category: "Men's Fashion",
          image: "https://ext.same-assets.com/38964423/4054160186.false",
          stock: true ? 10 : 0
        },
        {
          id: 9,
          name: "Men's Denim Shirt",
          price: 1299,
          originalPrice: 1558.8, // 1299 * 1.2
          description: "Stylish denim shirt for men with comfortable fit. Perfect for casual and semi-casual occasions.",
          category: "Men's Fashion",
          image: "https://ext.same-assets.com/38964423/486733287.false",
          stock: true ? 10 : 0
        },
        {
          id: 10,
          name: "Women's Makeup Kit",
          price: 1699,
          originalPrice: 2038.8, // 1699 * 1.2
          description: "Complete makeup kit for women with eyeshadow, lipstick, blush, and brushes. Perfect for everyday use.",
          category: "Beauty & Health",
          image: "https://ext.same-assets.com/38964423/938082949.false",
          stock: true ? 10 : 0
        },
        {
          id: 11,
          name: "Nokia Feature Phone",
          price: 3299,
          originalPrice: 3958.8, // 3299 * 1.2
          description: "Classic Nokia feature phone with long battery life. Perfect as a backup phone or for basic calling needs.",
          category: "Electronics",
          image: "https://ext.same-assets.com/38964423/2032880799.false",
          stock: true ? 10 : 0
        },
        {
          id: 12,
          name: "Bathroom Scale",
          price: 1299,
          originalPrice: 1558.8, // 1299 * 1.2
          description: "Digital bathroom scale with high precision. Modern design with LED display and automatic calibration.",
          category: "Home & Living",
          image: "https://ext.same-assets.com/38964423/1367694759.false",
          stock: true ? 10 : 0
        },
        {
          id: 13,
          name: "Electric Tea Kettle",
          price: 1899,
          originalPrice: 2278.8, // 1899 * 1.2
          description: "Fast-heating electric kettle with auto shut-off feature. Perfect for making tea, coffee, and hot beverages.",
          category: "Appliances",
          image: "https://ext.same-assets.com/38964423/3682472419.false",
          stock: true ? 10 : 0
        },
        {
          id: 20,
          name: "Sweet Mint Double-Ended Mascara Waterproof",
          price: 1299, // Rs. 1,299 converted to cents/pence
          originalPrice: 1559, // 1299 * 1.2
          description: "Dual brush design with curved and straight brushes for both volume and length. Silver gradient tube.",
          category: "Makeup",
          image: "https://s.alicdn.com/@sc04/kf/Hfc3d6f3a08d2406ca508bcf8d9534b522.jpg_720x720q50.jpg",
          stock: true ? 15 : 0
        },
        {
          id: 21,
          name: "Royues 2-in-1 Waterproof Mascara with Primer",
          price: 899, // Rs. 899 converted to cents/pence
          originalPrice: 1079, // 899 * 1.2
          description: "White and gold tube design with black mascara and white primer for ultimate lash volume.",
          category: "Makeup",
          image: "https://m.media-amazon.com/images/I/613R3ghD17L.jpg",
          stock: true ? 20 : 0
        },
        {
          id: 22,
          name: "RevitaLash Double-Ended Volume Lash Primer & Mascara",
          price: 1899, // Rs. 1,899 converted to cents/pence
          originalPrice: 2279, // 1899 * 1.2
          description: "Professional dual-ended lash enhancer with blue volumizing primer and black mascara.",
          category: "Makeup",
          image: "http://www.revitalash.com/cdn/shop/products/PDP-DE-Product.png?v=1699473312",
          stock: true ? 8 : 0
        },
        {
          id: 23,
          name: "Easilydays 2-in-1 Waterproof Mascara White Base & Black Fiber",
          price: 999, // Rs. 999 converted to cents/pence
          originalPrice: 1199, // 999 * 1.2
          description: "Creates long thick and slim lashes with eyelash base primer and black mascara formulation.",
          category: "Makeup",
          image: "https://m.media-amazon.com/images/I/61KEB4NMZiL.jpg",
          stock: true ? 12 : 0
        },
        {
          id: 24,
          name: "QIC Q802 Waterproof Double-Ended 4D Mascara",
          price: 799, // Rs. 799 converted to cents/pence
          originalPrice: 959, // 799 * 1.2
          description: "Silver tube with turquoise accent and two different brush types for maximum effect.",
          category: "Makeup",
          image: "https://img.myipadbox.com/upload/store/product_l/HCB4210.jpg",
          stock: true ? 18 : 0
        },
        {
          id: 25,
          name: "Easilydays Dual Effect Brush Head Mascara Waterproof",
          price: 849, // Rs. 849 converted to cents/pence
          originalPrice: 1019, // 849 * 1.2
          description: "One-line straight brush and tower shaped silicone brush for dual effect on lashes.",
          category: "Makeup",
          image: "https://m.media-amazon.com/images/I/71OXhKm5FUL.jpg",
          stock: true ? 14 : 0
        },
        {
          id: 26,
          name: "Yanqina 2-in-1 Double-Ended Mascara Rose Gold",
          price: 699, // Rs. 699 converted to cents/pence
          originalPrice: 839, // 699 * 1.2
          description: "Elegant rose gold tube with two-step application system for precise and intensive results.",
          category: "Makeup",
          image: "https://i5.walmartimages.com/asr/8991e700-99c2-4884-9ecc-43127d0e875f.5fca3bb6cd2879be17db0f46a0459997.jpeg",
          stock: true ? 22 : 0
        },
        {
          id: 27,
          name: "Easilydays 12-Hour Curl All Day Waterproof Mascara",
          price: 749, // Rs. 749 converted to cents/pence
          originalPrice: 899, // 749 * 1.2
          description: "Gel-based lightweight curling formula that lasts for 12 hours without collapsing.",
          category: "Makeup",
          image: "https://m.media-amazon.com/images/I/814uLhWm98L.jpg",
          stock: true ? 16 : 0
        },
        {
          id: 28,
          name: "Lavone 2-in-1 Double-ended Ink Pen Mascara Waterproof",
          price: 649, // Rs. 649 converted to cents/pence
          originalPrice: 779, // 649 * 1.2
          description: "Professional makeup dual-ended pen with pink accent and precise application.",
          category: "Makeup",
          image: "https://m.media-amazon.com/images/I/612FvpLLGcL._AC_UF1000,1000_QL80_.jpg",
          stock: true ? 19 : 0
        },
        {
          id: 29,
          name: "Double-Ended Color Mascara Waterproof White & Black",
          price: 599, // Rs. 599 converted to cents/pence
          originalPrice: 719, // 599 * 1.2
          description: "Dual-ended design with white primer and black color for dramatic sparkle effect.",
          category: "Makeup",
          image: "https://img.fruugo.com/product/8/87/1662071878_0340_0340.jpg",
          stock: true ? 21 : 0
        },
        {
          id: 30,
          name: "2-in-1 Makeup Waterproof 4D Fiber Lash Mascara Double Effect",
          price: 899, // Rs. 899 converted to cents/pence
          originalPrice: 1079, // 899 * 1.2
          description: "Silver tube with turquoise accent and numbered brushes for two-step application.",
          category: "Makeup",
          image: "https://s.alicdn.com/@sc04/kf/H3115b921318e4550a296418fde688b59x.jpg_720x720q50.jpg",
          stock: true ? 11 : 0
        },
        {
          id: 31,
          name: "Sweet Mint Dense and Curl Double-Ended Mascara",
          price: 1199, // Rs. 1,199 converted to cents/pence
          originalPrice: 1439, // 1199 * 1.2
          description: "Waterproof formula with before and after demonstration of volume effect.",
          category: "Makeup",
          image: "https://s.alicdn.com/@sc04/kf/Hae4d6e8734904932872d8ca404a8d5e71.jpg_720x720q50.jpg",
          stock: true ? 13 : 0
        },
        {
          id: 32,
          name: "DragonRanel Brown Tube Waterproof Mascara",
          price: 549, // Rs. 549 converted to cents/pence
          originalPrice: 659, // 549 * 1.2
          description: "Brown shade mascara for natural-looking volume and length. Waterproof formula.",
          category: "Makeup",
          image: "https://m.media-amazon.com/images/I/71uEEiTxn-L._AC_UF1000,1000_QL80_.jpg",
          stock: true ? 24 : 0
        },
        {
          id: 33,
          name: "Sarelly Creativo Lab Black & White Dual Mascara Set",
          price: 799, // Rs. 799 converted to cents/pence
          originalPrice: 959, // 799 * 1.2
          description: "Two-piece set with curved brush and waterproof formula with panthenol and nourishing oils.",
          category: "Makeup",
          image: "https://m.media-amazon.com/images/I/810RoELF6uL.jpg",
          stock: true ? 17 : 0
        },
        {
          id: 34,
          name: "Sweet Mint Original Package Double-Ended Mascara",
          price: 1099, // Rs. 1,099 converted to cents/pence
          originalPrice: 1319, // 1099 * 1.2
          description: "Original box packaging with silver tube dual-ended waterproof mascara.",
          category: "Makeup",
          image: "https://s.alicdn.com/@sc04/kf/H9063977a4c0045029dda54ffbaf0b103f.jpg_720x720q50.jpg",
          stock: true ? 9 : 0
        },
        {
          id: 35,
          name: "Sarelly Dual Color Mascara Blue and Green",
          price: 649, // Rs. 649 converted to cents/pence
          originalPrice: 779, // 649 * 1.2
          description: "Colorful mascara set with blue and green options for creative eye makeup looks.",
          category: "Makeup",
          image: "https://m.media-amazon.com/images/I/41eEcrvanlL._AC_.jpg",
          stock: true ? 20 : 0
        },
        {
          id: 36,
          name: "Double-Headed Eyeliner and Mascara Waterproof Set",
          price: 599, // Rs. 599 converted to cents/pence
          originalPrice: 719, // 599 * 1.2
          description: "Combination product with eyeliner stamp and mascara for complete eye look.",
          category: "Makeup",
          image: "https://i.ebayimg.com/images/g/RSUAAOSwHvlc8IZ3/s-l1200.jpg",
          stock: true ? 23 : 0
        },
        {
          id: 37,
          name: "Easilydays Slim-Dense-Flexible Waterproof Mascara",
          price: 849, // Rs. 849 converted to cents/pence
          originalPrice: 1019, // 849 * 1.2
          description: "Before and after demonstration of length and volume effect with waterproof formula.",
          category: "Makeup",
          image: "https://m.media-amazon.com/images/I/712ESnwSJJL.jpg",
          stock: true ? 18 : 0
        },
        {
          id: 38,
          name: "Sweet Mint Curling and Lengthening Double-Ended Mascara",
          price: 1199, // Rs. 1,199 converted to cents/pence
          originalPrice: 1439, // 1199 * 1.2
          description: "Silver gradient tube with dual brushes for curling and lengthening effect.",
          category: "Makeup",
          image: "https://s.alicdn.com/@sc04/kf/H170540fb0ced42e79fb44cf52863c4a2D.jpg_720x720q50.jpg",
          stock: true ? 15 : 0
        },
        {
          id: 39,
          name: "QIC Waterproof Thick Mascara with Double-Ended Brushes",
          price: 899, // Rs. 899 converted to cents/pence
          originalPrice: 1079, // 899 * 1.2
          description: "Sleek metallic design with dual brushes for thick, curled lashes that last all day.",
          category: "Makeup",
          image: "https://img.myipadbox.com/upload/store/product_l/HCB4210.jpg",
          stock: true ? 10 : 0
        }
      ];

      // Add more products to get to 32

      commit('setProducts', products)
    }
  }
})
