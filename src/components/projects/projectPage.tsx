import React, { useState } from 'react';
import {
  IconShoppingCart,
  IconTag,
  IconClock,
  IconChevronLeft,
  IconChevronRight,
  IconX,
  IconCreditCard,
  IconCheck
} from '@tabler/icons-react';
import { markdownify } from "@lib/textConverter";
import type { ProductEntry as Product, StoreEntry as Store } from '@/types/index';
import { createPaymentLink } from "@/markket/payment.ts";
import { markketplace } from '@/config';

const formatDescription = (description: string) => {
  return markdownify(description || '', true);
};

/**
 * JSON: https://markket.farmday.io/api/products?filters[slug]=presale-demo&populate[]=Slides&populate[]=SEO&populate[]=PRICES&populate[]=Tag
 * @param param0
 * @returns
 */
const ProductDisplay: React.FC<{ product: Product["data"], store: Store["data"] }> = ({ product, store }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  // const [isLiked, setIsLiked] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % product.Slides?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + product.Slides.length) % product.Slides.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };


  const handleStripeCheckout = async () => {
    const price = product?.PRICES?.[0];
    console.log({ price, prices: product?.PRICES })

    try {
      await createPaymentLink({
        totalPrice: price?.Price as number,
        product: product.documentId,
        prices: [
          {
            quantity: 1,
            price: price?.STRIPE_ID as string,
            currency: "usd",
            unit_amount: price?.Price || 0,
            Name: price?.Name as string,
          }
        ],
        stripe_test: !!product?.Name?.toLowerCase()?.includes('test'),
        includes_shipping: false,
        store_id: store?.documentId,
        redirect_to_url: new URL(`/auth/magic`, markketplace.url).toString(),
      });

    } catch (error) {
    // notifications.show({
    //   title: 'Payment Error',
    //   message: 'Could not create payment link. Please try again.',
    //   color: 'red',
    // });
      console.error('Payment link error:', error);
      alert('Unknown error');
    }
  };

  return (
    <>
      <div className="min-h-[70vh] bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span>
                <a href="/projects">Projects</a>
              </span>
              <span>/</span>
              <span className="text-gray-900 font-medium">{product.Name}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
                <img
                  src={product.Slides[currentSlide]?.url}
                  alt={product.Slides[currentSlide]?.alternativeText || product.Name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Navigation Arrows */}
                {product.Slides.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <IconChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <IconChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Slide Indicators */}
                {product.Slides.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {product.Slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                          }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.Slides.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.Slides.map((slide, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${index === currentSlide
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <img
                        src={slide.formats?.thumbnail?.url || slide.url}
                        alt={slide.alternativeText}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              {/* Title and Tags */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    {product.Name}
                  </h1>
                  {/* <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full transition-all ml-4 ${
                      isLiked
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <IconHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button> */}
                </div>

                {/* Tags */}
                {product.Tag && product.Tag.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.Tag.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                      >
                        <IconTag className="w-3 h-3 mr-1" />
                        {tag.Label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(product.usd_price as number)}
                  </span>
                  <span className="text-lg text-gray-500">USD</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => setShowCheckoutModal(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <IconShoppingCart className="w-5 h-5" />
                    <span>Checkout</span>
                  </div>
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-6 pt-6 border-t border-gray-200">
                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">About this product</h3>
                  <div
                    className="text-gray-600 leading-relaxed prose prose-sm max-w-none prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{
                      __html: formatDescription(product.Description as string) as string,
                    }}
                  />
                </div>

                {/* SEO Info */}
                {product.SEO && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">Details</h3>
                    <div className="grid gap-3">
                      {/* <div className="flex items-center space-x-3 text-sm">
                        <IconMapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">SKU:</span>
                        <span className="font-medium text-gray-900">{product.SKU}</span>
                      </div> */}
                      <div className="flex items-center space-x-3 text-sm">
                        <IconClock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Created:</span>
                        <span className="font-medium text-gray-900">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {product.SEO.metaKeywords && (
                        <div className="flex items-start space-x-3 text-sm">
                          <IconTag className="w-4 h-4 text-gray-400 mt-0.5" />
                          <span className="text-gray-600">Keywords:</span>
                          <span className="font-medium text-gray-900">{product.SEO.metaKeywords}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Choose Your Option</h2>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <IconX className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Product Summary */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <img
                  src={product.Slides[0]?.formats?.thumbnail?.url || product.Slides[0]?.url}
                  alt={product.Name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{product.Name}</h3>
                  <p className="text-sm text-gray-600">
                    {product.Tag?.[0]?.Label && (
                      <span className="inline-flex items-center">
                        <IconTag className="w-3 h-3 mr-1" />
                        {product.Tag[0].Label}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Price Options */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Select a pricing option:</h3>

                {product.PRICES && product.PRICES.length > 0 ? (
                  <div className="space-y-3">
                    {product.PRICES.map((price, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPrice(index)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedPrice === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{price.Name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{price.Description}</p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-xl font-bold text-gray-900">
                              {formatPrice(price.Price)}
                            </div>
                            <div className="text-sm text-gray-500">{price.Currency}</div>
                          </div>
                          {selectedPrice === index && (
                            <div className="ml-3">
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <IconCheck className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border-2 border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Standard Price</h4>
                        <p className="text-sm text-gray-600">Default pricing option</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                            {formatPrice(product.usd_price as number)}
                        </div>
                        <div className="text-sm text-gray-500">USD</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Checkout Button */}
              <button
                // disabled={!product?.PRICES?.length}
                onClick={() => {
                  handleStripeCheckout();
                }}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                <div className="flex items-center justify-center space-x-2">
                  <IconCreditCard className="w-5 h-5" />
                  <span>
                    Proceed to Payment - {
                      product.PRICES?.[selectedPrice]
                        ? formatPrice(product.PRICES[selectedPrice].Price)
                        : formatPrice(product.usd_price as number)
                    }
                  </span>
                </div>
              </button>

              {/* Security Notice */}
              <div className="text-center text-xs text-gray-500 mt-4">
                <p>🔒 Secure payment powered by Stripe</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDisplay;
