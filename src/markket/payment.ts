import type { Price } from "@/markket";
import { markketplace } from "@/config";

export type PaymentLinkOptions = {
  totalPrice: number;
  product: string;
  prices: { price: string, quantity: number, unit_amount: number, Name: string, currency: string }[];
  includes_shipping: boolean;
  stripe_test: boolean;
  store_id?: string;
  redirect_to_url?: string;
};

export const createPaymentLink = async (
  options: PaymentLinkOptions,
  isTest: boolean = true
): Promise<Response> => {
  console.log("Creating payment link", { options, isTest });

  const prices = options.prices;

  const body = {
    prices,
    total: options.totalPrice,
    product: options.product,
    action: "stripe.link",
    includes_shipping: options.includes_shipping,
    stripe_test: options.stripe_test,
    store_id: options.store_id,
    redirect_to_url: options?.redirect_to_url || '',
  };

  const request = await fetch(new URL('/api/markket', markketplace.api), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const response = await request.json();

  const url = response?.data?.link?.response?.url;

  if (request.ok && url) {
    window.location.href = url;
  }

  return request;
};
