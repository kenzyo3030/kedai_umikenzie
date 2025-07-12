import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { useCart } from '@/hooks/useCart';
import { menuItems } from '@/data/menu';
import Header from '@/components/Header';
import StoreInfo from '@/components/StoreInfo';
import MenuCategoryFilter from '@/components/MenuCategoryFilter';
import MenuList from '@/components/MenuList';
import CartSidebar from '@/components/CartSidebar';
import QRCodeModal from '@/components/QRCodeModal';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const cartHook = useCart();
  const categories = ["Semua", "Makanan", "Minuman"];
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredMenu =
    selectedCategory === "Semua"
      ? menuItems
      : menuItems.filter(item => item.category === selectedCategory);
  
  return (
    <>
      <Helmet>
        <title>Kedai Umi Kenzie - Menu Digital</title>
        <meta name="description" content="Pesan minuman dan makanan favorit Anda secara online dengan mudah. Langsung chat ke owner!" />
      </Helmet>
      
      <div className="min-h-screen bg-stone-50 font-sans">
        <Header 
          totalItems={cartHook.getTotalItems()}
          onCartClick={() => setShowCart(true)} 
          onQRClick={() => setShowQR(true)}
        />

        <StoreInfo />

        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <MenuCategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <MenuList 
                menuItems={filteredMenu} 
                addToCart={cartHook.addToCart} 
              />
            </div>

            <CartSidebar 
              showCart={showCart}
              onClose={() => setShowCart(false)}
              cartHook={cartHook}
            />
          </div>
        </main>
        
        <footer className="bg-stone-800 text-stone-300 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-4">
              <span className="text-2xl font-bold text-white">🍜 Kedai Umi Kenzie</span>
            </div>
            <p className="text-stone-400 mb-4">
              Menemukan kenikmatan dalam setiap suapan.
            </p>
            <div className="flex justify-center space-x-4 text-sm text-stone-500">
              <span>© 2025 Kedai Umi Kenzie</span>
              <span>•</span>
              <span>Dibuat dengan ❤️(Abi Kenz)</span>
            </div>
          </div>
        </footer>

        <Toaster />
        <QRCodeModal isOpen={showQR} onClose={() => setShowQR(false)} />
      </div>
    </>
  );
}

export default App;