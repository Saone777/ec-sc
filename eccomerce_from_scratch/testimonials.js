// Testimonials Data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "Amazing quality products! The shirt I ordered fits perfectly and arrived faster than expected. Highly recommend!",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=1",
    product: "T-Shirts",
  },
  {
    id: 2,
    name: "Raj Kumar",
    text: "Great shopping experience. The jeans are very comfortable and the price is reasonable compared to other sites.",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=2",
    product: "Jeans",
  },
  {
    id: 3,
    name: "Emily Chen",
    text: "Love the shoe collection! Customer service was super helpful when I had questions. Will definitely buy again.",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=3",
    product: "Shoes",
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    text: "Received my watch in perfect condition. Quality is better than expected. 5 stars!",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=4",
    product: "Watches",
  },
  {
    id: 5,
    name: "Lisa Martinez",
    text: "Best fashion store online! Always have new designs and sales. My go-to place for shopping.",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=5",
    product: "Fashion",
  },
];

// Flash Sale Data
const flashSale = {
  active: true,
  endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
  discount: 30,
  title: "FLASH SALE - 30% OFF",
  description: "Limited time offer! Get 30% discount on selected items",
};

// Promotions/Banners
const promotions = [
  {
    id: 1,
    active: true,
    text: "🎉 FREE SHIPPING on orders over $50",
    bgColor: "#ff6b6b",
    icon: "fa-truck",
  },
  {
    id: 2,
    active: true,
    text: "🎁 NEW COLLECTION ARRIVED! Check it out now",
    bgColor: "#4ecdc4",
    icon: "fa-gift",
  },
];
