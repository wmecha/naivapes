export type ProductCategory =
  | "Devices"
  | "Pods"
  | "Disposables"
  | "E-liquids"
  | "Accessories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  stock: number;
  image: string;
  gallery: string[];
  tags: string[];
  description: string;
  fullDescription: string;
  flavourFamily?: string;
  nicotineStrength?: string;
  deviceType?: string;
  puffCount?: string;
  batteryCapacity?: string;
  podCapacity?: string;
  coilCompatibility?: string;
  whatsInBox: string[];
  warnings: string[];
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
};

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "age_review_required"
  | "processing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refund_requested"
  | "refunded"
  | "failed";

export type SiteSettings = {
  checkoutEnabled: boolean;
  paystackEnabled: boolean;
  catalogueOnly: boolean;
  warningText: string;
  ageGateText: string;
  businessName: string;
  businessPhone: string;
  businessEmail: string;
  whatsappNumber: string;
};
