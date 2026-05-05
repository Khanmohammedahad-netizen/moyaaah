"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Flame, Star, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEATURED = [
  {
    name: "Smashed Buff Burger",
    description: "Multiple smashed patties with gooey melted cheese and house sauce.",
    price: "₹450",
    image: "/ambience/ambience_10.png",
    tag: "BEST SELLER",
    icon: <Flame className="text-orange-500" size={16} />,
  },
  {
    name: "Buff Ribs",
    description: "Juicy ribs glazed with MOYAAAH Steak Sauce. Falls off the bone.",
    price: "₹450",
    image: "/ambience/ambience_11.png",
    tag: "MUST TRY",
    icon: <Star className="text-yellow-500" size={16} />,
  },
  {
    name: "Lamb Shank",
    description: "Slow-cooked lamb shank immersed in rich brown sauce with sides.",
    price: "₹650",
    image: "/ambience/ambience_03.png",
    tag: "CHEF'S PICK",
    icon: <Zap className="text-blue-500" size={16} />,
  },
];

type MenuItem = { name: string; desc: string; price: string; veg: boolean; note?: string };
type Category = { id: string; label: string; items: MenuItem[] };

const CATEGORIES: Category[] = [
  {
    id: "starters",
    label: "Starters",
    items: [
      { name: "Onion Rings", desc: "Crispy rings served with asian BBQ sauce", price: "₹200", veg: true },
      { name: "Mozza Sticks", desc: "Breaded spice-rubbed mozzarella sticks, deep fried", price: "₹350", veg: true },
      { name: "Mash Bombs", desc: "Herbed mashed potatoes with cheese", price: "₹350", veg: true },
      { name: "Scotch Egg", desc: "Seasoned buff meat with soft-boiled egg, deep-fried", price: "₹400", veg: false },
      { name: "Pulled Buff Crostini", desc: "Slow-cooked buff on toasted bread with gravy", price: "₹400", veg: false },
      { name: "Buff Skewer", desc: "Marinated buff chunks, grilled", price: "₹400", veg: false },
      { name: "Chimichanga", desc: "Deep-fried tortilla with veggies or chicken", price: "₹400 / ₹450", veg: false },
      { name: "Juicy Chicken Wings", desc: "Wings in sauce of your choice with fries", price: "₹400", veg: false },
      { name: "Super Chicken Tenders", desc: "Hand-battered fried tenders", price: "₹350", veg: false },
      { name: "Fish Fingers", desc: "Breaded fish with tartare sauce", price: "₹450", veg: false },
      { name: "Prawn on Toast", desc: "Sautéed prawns in house sauce", price: "₹600", veg: false },
      { name: "Dynamite Prawns", desc: "Breaded prawns with Bang Bang sauce", price: "₹600", veg: false },
      { name: "The MOYAAAH Mix", desc: "Platter selection — veg or non-veg", price: "₹1,000 / ₹1,200", veg: false },
    ],
  },
  {
    id: "burgers",
    label: "Burgers",
    items: [
      { name: "Smashed Buff Burger", desc: "Multiple smashed patties with gooey melted cheese", price: "₹450", veg: false },
      { name: "The Beast Buff Burger", desc: "Caramelized onions and signature sauce", price: "₹450", veg: false },
      { name: "Triple Barrel Burger Buff", desc: "Three mozzarella sticks stacked on patty", price: "₹500", veg: false },
      { name: "Pulled Buff Burger", desc: "Slow-cooked buff, 10-hour preparation", price: "₹450", veg: false },
      { name: "Harissa Burger", desc: "In-house harissa sauce with buff patty", price: "₹400", veg: false },
      { name: "Chimi Burger", desc: "Patty with chimichurri", price: "₹400", veg: false },
      { name: "Peppercorn Burger", desc: "Peppercorn-infused sauce", price: "₹400", veg: false },
      { name: "Butter Burger", desc: "Smashed patty with signature butter sauce", price: "₹450", veg: false },
      { name: "Chili Cheese Burger", desc: "Green chilli-infused cheese", price: "₹450", veg: false },
      { name: "The Juicy Lucy", desc: "Cheese oozing from the center", price: "₹400", veg: false },
      { name: "Pulled Lamb Burger", desc: "Slow-cooked lamb, rich and tender", price: "₹550", veg: false },
      { name: "Crispy Fish Burger", desc: "Crispy fish fillet with sriracha mayo and melted cheese", price: "₹500", veg: false },
      { name: "Southern Fried Chicken Burger", desc: "Crispy batter fried chicken", price: "₹400", veg: false },
      { name: "Smashed Chicken Burger", desc: "Multiple smashed chicken patties", price: "₹400", veg: false },
      { name: "Mexican Chicken Burger", desc: "Mexican spices with salsa", price: "₹400", veg: false },
      { name: "Peri Peri Paneer Burger", desc: "Peri peri spiced paneer", price: "₹350", veg: true },
      { name: "Veg Patty Burger", desc: "Classic vegetable patty burger", price: "₹350", veg: true },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    items: [
      { name: "Buff Ribs", desc: "Juicy ribs glazed with MOYAAAH Steak Sauce", price: "₹450", veg: false },
      { name: "Lamb Shank", desc: "Slow-cooked lamb shank immersed in rich brown sauce", price: "₹650", veg: false },
      { name: "Buff Steak", desc: "Medium-well with mash and greens, choice of sauce", price: "₹550", veg: false },
      { name: "Pulled Buff", desc: "Slow-cooked with curry sauce", price: "₹550", veg: false },
      { name: "Pulled Lamb", desc: "Slow-cooked lamb with curry sauce", price: "₹600", veg: false },
      { name: "Peri Peri Chicken Steak", desc: "Grilled chicken with mash and greens", price: "₹400", veg: false },
      { name: "Chicken Steak", desc: "Grilled chicken breast with sides", price: "₹350", veg: false },
      { name: "Coriander Pesto Fish", desc: "Grilled fillet with pesto cream", price: "₹600", veg: false },
      { name: "Peri Peri Prawns", desc: "Marinated prawns with butter herb rice", price: "₹600", veg: false },
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches & Wraps",
    items: [
      { name: "Pulled Buff Sandwich", desc: "BBQ sauce with melted cheese", price: "₹450", veg: false },
      { name: "Classic Chicken Cheese & Mayo Sandwich", desc: "Melted cheese grilled sandwich", price: "₹350", veg: false },
      { name: "Egg & Cheese Sandwich", desc: "Classic egg and cheese grilled", price: "₹300", veg: false },
      { name: "Aloo Tikki Cheese Sandwich", desc: "Super crispy aloo tikki topped with cheese slices", price: "₹300", veg: true },
      { name: "Buff Steak Quesadilla", desc: "Pan-grilled with steak and caramelized onions", price: "₹450", veg: false },
      { name: "Egg & Buff Quesadilla", desc: "Hard-boiled egg with pulled buff", price: "₹450", veg: false },
      { name: "Smashed Chicken Patty Quesadilla", desc: "Pan-grilled chicken patty quesadilla", price: "₹450", veg: false },
      { name: "Crispy Cottage Cheese Quesadilla", desc: "Cottage cheese with BBQ sauce", price: "₹350", veg: true },
    ],
  },
  {
    id: "pasta",
    label: "Pasta & Salads",
    items: [
      { name: "Spaghetti Buff Bolognese", desc: "Pasta with rich bolognese sauce", price: "₹450", veg: false },
      { name: "Cheesy Mac", desc: "MOYAAAH special cheesy mac with cheese mix sauce", price: "₹300", veg: true },
      { name: "Pasta", desc: "Penne or spaghetti — Alfredo, Arrabbiata, or Tomato", price: "₹300", veg: true },
      { name: "Caesar Salad", desc: "Lettuce, croutons, parmesan — veg or grilled chicken", price: "₹300 / ₹350", veg: false },
      { name: "BBQ Salad", desc: "Mixed greens with ranch dressing — veg or grilled chicken", price: "₹300 / ₹350", veg: false },
    ],
  },
  {
    id: "sides",
    label: "Sides & Fries",
    items: [
      { name: "Loaded Fries", desc: "Topped with chicken or buff, cheese, BBQ sauce", price: "₹300 / ₹350", veg: false },
      { name: "Cheese Fries", desc: "Melted cheese with ranch", price: "₹225", veg: true },
      { name: "Sweet Chilli Fries", desc: "With mayo and seasoning", price: "₹225", veg: true },
      { name: "Peri Peri Fries", desc: "With garlic mayo", price: "₹175", veg: true },
      { name: "Classic Salted Fries", desc: "With garlic mayo", price: "₹175", veg: true },
      { name: "Gravy & Mash", desc: "Rich gravy with smooth mashed potato", price: "₹200", veg: true },
      { name: "Polenta", desc: "Creamy polenta side", price: "₹200", veg: true },
      { name: "BBQ Beans", desc: "Smoky BBQ baked beans", price: "₹175", veg: true },
      { name: "Herb n Butter Rice", desc: "Fragrant herb and butter rice", price: "₹175", veg: true },
      { name: "Saute Greens", desc: "Sautéed seasonal greens", price: "₹175", veg: true },
      { name: "Coleslaw", desc: "Creamy house coleslaw", price: "₹175", veg: true },
      { name: "Guacamole", desc: "Fresh guacamole dip", price: "₹50", veg: true },
      { name: "Cheese Sauce", desc: "House cheese dipping sauce", price: "₹35", veg: true },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { name: "Blueberry Cheesecake", desc: "Sinfully rich & velvety smooth cheesecake", price: "₹250", veg: true },
      { name: "Bread Pudding", desc: "Warm, velvety, soft and gooey bread pudding", price: "₹250", veg: true },
      { name: "Fudgy Brownie & Choco Mousse", desc: "Fudgy brownie paired with chocolate mousse", price: "₹250", veg: true },
      { name: "Umm Ali", desc: "Puff pastry with nuts, baked warm", price: "₹300", veg: true },
      { name: "Fudgy Brownie & Ice Cream", desc: "Classic brownie with a scoop of ice cream", price: "₹200", veg: true },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    items: [
      { name: "Choco Heaven Milkshake", desc: "Rich chocolate milkshake", price: "₹300", veg: true },
      { name: "Brownie Shake", desc: "Chocolate and fudge brownie shake", price: "₹300", veg: true },
      { name: "Salted Caramel Shake", desc: "Sweet and salty caramel shake", price: "₹300", veg: true },
      { name: "Oreo Shake", desc: "Vanilla with Oreo chunks", price: "₹300", veg: true },
      { name: "Vanilla Affair", desc: "Classic vanilla milkshake", price: "₹300", veg: true },
      { name: "Frappe", desc: "Premium coffee and ice blend", price: "₹350", veg: true },
      { name: "Blueberry Smoothie", desc: "Fresh blueberry blend", price: "₹450", veg: true },
      { name: "Banana & Date Smoothie", desc: "Ripe banana and date", price: "₹350", veg: true },
      { name: "Tiramisu Smoothie", desc: "Italian dessert flavors", price: "₹450", veg: true },
      { name: "Chatka Orange Mojito", desc: "Orange mojito with a twist", price: "₹250", veg: true },
      { name: "Yuzu Lemonade", desc: "Citrus and sweetness", price: "₹250", veg: true },
      { name: "Watermelon Mojito", desc: "Fresh watermelon flavor", price: "₹250", veg: true },
      { name: "Spicy Guava Mojito", desc: "Guava with a spice kick", price: "₹250", veg: true },
      { name: "Virgin Piña Colada", desc: "Caribbean flavors, alcohol-free", price: "₹275", veg: true },
      { name: "Virgin Mojito", desc: "Citrus, mint and sweetness", price: "₹250", veg: true },
      { name: "Ice Tea", desc: "Chilled — lemon or peach", price: "₹250", veg: true },
      { name: "Blue Lagoon", desc: "Blue curaçao mocktail blend", price: "₹250", veg: true },
      { name: "Americano", desc: "Classic black coffee", price: "₹180", veg: true },
      { name: "Latte", desc: "Espresso with steamed milk", price: "₹170", veg: true },
      { name: "Cappuccino", desc: "Espresso with steamed milk and foam", price: "₹170", veg: true },
      { name: "Hazelnut Latte", desc: "Espresso with hazelnut", price: "₹200", veg: true },
      { name: "Mocha", desc: "Chocolate and espresso fusion", price: "₹200", veg: true },
      { name: "Hot Chocolate", desc: "Rich hot chocolate", price: "₹200", veg: true },
      { name: "Espresso", desc: "Robust single or double shot", price: "₹130", veg: true },
      { name: "Vanilla Affogato", desc: "Vanilla ice cream with espresso poured over", price: "₹200", veg: true },
      { name: "Green Tea", desc: "Light and refreshing", price: "₹150", veg: true },
      { name: "English Breakfast Tea", desc: "Classic black tea", price: "₹150", veg: true },
      { name: "Red Bull", desc: "Energy drink", price: "₹125", veg: true },
      { name: "Coke / Sprite / Thums Up", desc: "Chilled soft beverage", price: "₹40", veg: true },
      { name: "Diet Coke", desc: "Zero sugar cola", price: "₹40", veg: true },
    ],
  },
];

export default function Menu() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("starters");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menu-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const activeCategory = CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <section id="menu" ref={sectionRef} className="py-32 bg-black relative">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-sm font-black tracking-[0.5em] uppercase text-primary mb-4">The Collection</h2>
            <h3 className="text-5xl md:text-7xl font-black leading-none">SIGNATURE <br /><span className="moyaaah-gradient text-glow">SELECTIONS.</span></h3>
          </div>
        </div>

        {/* Featured Cards */}
        <div className="grid md:grid-cols-3 gap-10 mb-32">
          {FEATURED.map((item, id) => (
            <div key={id} className="menu-item group cursor-pointer">
              <div className="relative glass-card overflow-hidden rounded-[40px] aspect-[4/5] mb-8">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  {item.icon}
                  <span className="text-[10px] font-black tracking-widest uppercase text-white">{item.tag}</span>
                </div>
                <div className="absolute bottom-10 left-8 right-8 transition-transform duration-500 group-hover:-translate-y-4">
                  <div className="text-4xl font-black mb-2 text-white">{item.price}</div>
                  <h4 className="text-2xl font-black text-primary mb-4 leading-tight">{item.name}</h4>
                  <p className="text-sm text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">{item.description}</p>
                </div>
                <button className="absolute bottom-10 right-8 w-14 h-14 bg-primary text-secondary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:rotate-90">
                  <span className="text-3xl font-black">+</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Full Menu */}
        <div>
          <h3 className="text-sm font-black tracking-[0.5em] uppercase text-primary mb-8">Full Menu</h3>

          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 border ${
                  activeTab === cat.id
                    ? "bg-primary text-black border-primary"
                    : "bg-transparent text-white/50 border-white/10 hover:border-primary/50 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid md:grid-cols-2 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
            {activeCategory.items.map((item, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-6 p-6 bg-black hover:bg-white/[0.03] transition-colors duration-200"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.veg ? "bg-green-500" : "bg-red-500"}`} />
                    <span className="text-white font-bold text-sm">{item.name}</span>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed pl-4">{item.desc}</p>
                </div>
                <span className="text-primary font-black text-sm whitespace-nowrap flex-shrink-0">{item.price}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-white/20 text-xs text-center tracking-widest">
            🟢 VEG &nbsp;&nbsp; 🔴 NON-VEG
          </p>
        </div>
      </div>
    </section>
  );
}
