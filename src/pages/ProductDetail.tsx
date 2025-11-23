import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, TrendingUp, Shield, Truck, ArrowLeft, Share2, Zap, Check, ArrowRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart, cart } = useCart();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <Link to="/products" className="text-primary hover:text-primary-700">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const isInCart = cart.some(item => item.product.id === product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <Link to="/products" className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 font-semibold transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Image Section */}
            <div>
              <div className="mb-6 bg-white rounded-2xl p-8 border-2 border-gray-50 shadow-inner">
                <img
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-96 object-contain mix-blend-multiply transition-all duration-300"
                />
              </div>
              <div className="grid grid-cols-5 gap-4">
                {product.images?.map((img, idx) => (
                  <div 
                    key={idx}
                    className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === idx ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-transparent hover:border-gray-200'
                    }`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Info Section */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-primary font-bold mb-2 tracking-wide uppercase bg-primary/10 inline-block px-3 py-1 rounded-full">{product.category}</p>
                  <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">{product.name}</h1>
                  <div className="flex flex-wrap gap-3">
                    {product.trending && (
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-bold border border-purple-200">
                        <TrendingUp className="w-4 h-4" />
                        Trending
                      </span>
                    )}
                    {product.deliveryTime === 10 && (
                        <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-bold border border-yellow-200">
                            <Zap className="w-4 h-4" />
                            10-Min Delivery
                        </span>
                    )}
                  </div>
                </div>
                <button className="text-gray-400 hover:text-primary transition-colors bg-gray-50 p-3 rounded-full hover:bg-primary/10">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900 text-lg">{product.rating}</span>
                </div>
                <span className="text-gray-500 font-medium border-l pl-3">{product.reviews} reviews</span>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-5xl font-black text-gray-900 tracking-tight">₹{product.price.toLocaleString('en-IN')}</span>
                {product.comparePrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through decoration-2">
                      ₹{product.comparePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-sm">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 mb-10 leading-relaxed text-lg">{product.description}</p>

              <div className="mb-10 p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                <p className="text-sm text-gray-600 mb-2">Sold by: <span className="font-bold text-blue-600">{product.sellerName}</span></p>
                <p className={`text-sm font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </p>
              </div>

              {!isInCart ? (
                <div className="flex items-center gap-4 mb-10">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-5 py-4 hover:bg-gray-50 text-xl font-medium text-gray-600 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-5 py-4 border-x-2 border-gray-200 font-bold text-gray-900 min-w-[3.5rem] text-center bg-gray-50">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-5 py-4 hover:bg-gray-50 text-xl font-medium text-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 bg-primary text-white py-4 rounded-xl hover:bg-primary-600 transition-all shadow-lg shadow-primary/30 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-3 font-bold text-lg transform hover:-translate-y-1"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart
                  </button>
                </div>
              ) : (
                <div className="mb-10 animate-in fade-in zoom-in duration-300">
                  <Link 
                    to="/cart"
                    className="w-full bg-secondary text-white py-4 rounded-xl hover:bg-blue-400 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3 font-bold text-lg transform hover:-translate-y-1"
                  >
                    <Check className="w-6 h-6" />
                    Go to Cart
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <p className="text-center text-sm text-primary font-semibold mt-3">Item added to cart!</p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-green-100 rounded-full text-green-600"><Shield className="w-6 h-6" /></div>
                  <span className="text-xs font-bold text-gray-700">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-yellow-100 rounded-full text-yellow-600"><Truck className="w-6 h-6" /></div>
                  <span className="text-xs font-bold text-gray-700">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-purple-100 rounded-full text-purple-600"><TrendingUp className="w-6 h-6" /></div>
                  <span className="text-xs font-bold text-gray-700">Earn Rewards</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
