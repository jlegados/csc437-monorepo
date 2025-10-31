export interface Merchant {
    id?: string;
  
    name: string;
    logoSrc?: string;
    websiteHref?: string;
    phone?: string;
    category?: string;
  
    monthlySpend?: number;   
    transactions?: number;  
    lastDate?: string;       
    notes?: string;
  }
  