export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FEATURES_DATA: Feature[] = [
  {
    id: "hifi",
    title: "Hi-Fi Studio Sound",
    description: "Custom-built 13mm dynamic drivers deliver punchy bass, pristine mids, and crystal-clear highs for an audiophile experience.",
    iconName: "Volume2",
  },
  {
    id: "bluetooth",
    title: "Bluetooth 5.3",
    description: "Ultra-stable connection, lower latency, and seamless instant pairing up to 15 meters away.",
    iconName: "Bluetooth",
  },
  {
    id: "noise",
    title: "Active Noise Reduction",
    description: "Smart environmental noise cancellation (ENC) blocks background chatter so your music and calls remain perfectly clear.",
    iconName: "MicOff",
  },
  {
    id: "battery",
    title: "40H Battery Life",
    description: "Get up to 8 hours of continuous playback on a single charge, plus an extra 32 hours inside the premium wireless charging case.",
    iconName: "BatteryCharging",
  },
  {
    id: "charging",
    title: "Fast USB-C Charging",
    description: "A quick 10-minute charge gives you up to 2 full hours of playtime. Never be stranded without your soundtrack.",
    iconName: "Zap",
  },
  {
    id: "comfort",
    title: "Secure-Fit Ergonomics",
    description: "Carefully calibrated weight distribution and three sizes of ultra-soft silicone tips ensure fatigue-free all-day wear.",
    iconName: "Smile",
  },
  {
    id: "mic",
    title: "Built-in Dual Mics",
    description: "Equipped with advanced beamforming dual microphones to isolate your voice for crystal-clear hands-free calls.",
    iconName: "Mic",
  },
  {
    id: "waterproof",
    title: "IPX7 Water Resistant",
    description: "Built to survive heavy workouts, runs in the rain, or accidental splashes. Sweat-proof and water-proof design.",
    iconName: "Droplets",
  },
];

export const SPECS_DATA: ProductSpec[] = [
  { label: "Driver Unit", value: "13mm Custom Dynamic Drivers" },
  { label: "Bluetooth Version", value: "Bluetooth 5.3 + EDR" },
  { label: "Water Resistance", value: "IPX7 Certified" },
  { label: "Battery Playtime", value: "8 Hours (Earbuds) / 40 Hours (Total with case)" },
  { label: "Charging Port", value: "USB Type-C Fast Charge (10-min for 2 hours)" },
  { label: "Microphones", value: "Dual Beamforming with ENC noise reduction" },
  { label: "Supported Codecs", value: "AAC, SBC, aptX Adaptive" },
  { label: "Compatibility", value: "iOS, Android, Windows, macOS, Smart TVs" },
];

export const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    name: "Alex Tremblay",
    rating: 5,
    comment: "Absolutely blew me away! The sound quality is on par with earbuds double the price. The bass is deep without overrunning the vocals. Living in Montreal, the sweatproof rating is perfect for my indoor training.",
    date: "June 14, 2026",
    verified: true,
  },
  {
    id: "rev-2",
    name: "Sarah Jenkins",
    rating: 5,
    comment: "Super comfortable for long Zoom meetings and my daily commutes. The microphone quality is incredibly crisp—nobody has complained about background noise once. Definitely a proud Canadian purchase!",
    date: "May 28, 2026",
    verified: true,
  },
  {
    id: "rev-3",
    name: "Marcus Wong",
    rating: 4,
    comment: "Connecting is instant on both my Android phone and Windows laptop. The charge lasts forever. I've only plugged the case in once over the last two weeks. Exceptional value and service.",
    date: "April 19, 2026",
    verified: true,
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I pair my Norq earbuds for the first time?",
    answer: "Simply open the charging case and remove both earbuds. They will automatically enter pairing mode (the indicator lights will pulse blue). Open the Bluetooth settings on your phone, tablet, or laptop, and select 'Norq Sound' to connect instantly.",
    category: "Bluetooth pairing",
  },
  {
    id: "faq-2",
    question: "What is the warranty policy in Canada?",
    answer: "Every pair of Norq earbuds includes a 12-month manufacturer warranty. We offer reliable, local Canadian support with hassle-free replacements. Just email our support team at er.yogeshupreti@gmail.com for fast assistance.",
    category: "Warranty",
  },
  {
    id: "faq-3",
    question: "How long does the battery last on a single charge?",
    answer: "The earbuds provide up to 8 hours of continuous playback. The compact charging case holds an additional 32 hours of reserve power, giving you 40 hours of total playtime before you need to connect a USB-C cable.",
    category: "Battery life",
  },
  {
    id: "faq-4",
    question: "Can I use only one earbud at a time?",
    answer: "Yes! Both Norq earbuds support independent connection. You can use either the left or right earbud individually for calls or music, while the other earbud charges inside the case.",
    category: "Usage",
  },
  {
    id: "faq-5",
    question: "Are these earbuds suitable for intense workouts?",
    answer: "Absolutely. Norq earbuds are IPX7 water-resistant, making them completely sweat-proof and protected against splashes, heavy rain, or water immersion. The ergonomic secure-fit tips keep them locked in during workouts.",
    category: "Usage",
  },
];
