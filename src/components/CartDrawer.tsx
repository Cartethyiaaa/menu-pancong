import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQty, clearCart, isCartOpen, setIsCartOpen, totalQty, totalPrice } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('Dine-in (Makan di Tempat)');
  const [notes, setNotes] = useState('');

  const handleCheckoutWA = () => {
    if (cart.length === 0) return;

    const name = customerName.trim() || 'Pelanggan';
    let itemsList = '';
    cart.forEach((item) => {
      const subtotal = item.price * item.qty;
      itemsList += `• ${item.qty}x ${item.name} (Rp ${subtotal.toLocaleString('id-ID')})\n`;
    });

    let message = `Halo Pancong Donto! 👋\nSaya mau pesan:\n\n`;
    message += `📋 DETAIL PESANAN (${totalQty} item):\n`;
    message += `${itemsList}\n`;
    message += `💰 TOTAL: Rp ${totalPrice.toLocaleString('id-ID')}\n\n`;
    message += `👤 Nama: ${name}\n`;
    message += `🛵 Opsi: ${orderType}\n`;
    if (notes.trim()) {
      message += `📝 Catatan: ${notes.trim()}\n`;
    }
    message += `\nMohon diproses ya min, terima kasih! 🙏`;

    const waUrl = `https://wa.me/6285782203468?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100001] flex justify-end">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Body */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-md bg-[#120b07] border-l border-[#c9973e]/25 h-full flex flex-col shadow-2xl text-[#f5f0e8]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#c9973e]/20 flex items-center justify-between bg-[#160e09]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#c9973e]/15 border border-[#c9973e]/40 flex items-center justify-center text-[#c9973e]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    className="text-xl font-normal text-[#f5f0e8] leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Keranjang Pesanan
                  </h3>
                  <span className="text-[11px] text-[#a0988e] tracking-wider uppercase font-sans">
                    Pancong Donto &bull; Cianjur
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-[#a0988e] hover:text-[#f5f0e8] transition-colors"
                aria-label="Tutup keranjang"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#a0988e]">
                  <ShoppingBag className="w-12 h-12 text-[#c9973e]/30 mb-3" />
                  <p className="text-base text-[#f5f0e8] font-serif">Keranjang belanja masih kosong</p>
                  <p className="text-xs text-[#a0988e] mt-1 max-w-xs">
                    Pilih pancong lumer, kopi Sevenov, atau menu camilan favoritmu di bawah!
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-xs text-[#a0988e] uppercase tracking-wider">
                      {totalQty} item di keranjang
                    </span>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs text-red-400/80 hover:text-red-400 transition-colors"
                    >
                      Hapus Semua
                    </button>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={item.name}
                      className="p-3.5 rounded bg-white/[0.03] border border-[#c9973e]/15 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-[#f5f0e8] truncate">
                          {item.name}
                        </h4>
                        <span className="text-xs text-[#c9973e] font-serif tracking-wider font-semibold">
                          Rp {item.price.toLocaleString('id-ID')}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQty(item.name, -1)}
                          className="w-7 h-7 rounded border border-[#c9973e]/30 flex items-center justify-center text-[#f5f0e8] hover:bg-[#c9973e]/20 transition-colors"
                          aria-label="Kurang satu"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold w-5 text-center font-mono">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.name, 1)}
                          className="w-7 h-7 rounded border border-[#c9973e]/30 flex items-center justify-center text-[#f5f0e8] hover:bg-[#c9973e]/20 transition-colors"
                          aria-label="Tambah satu"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.name)}
                          className="ml-1 text-red-400/70 hover:text-red-400 p-1 transition-colors"
                          aria-label="Hapus item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Footer / Form */}
            {cart.length > 0 && (
              <div className="p-6 bg-[#160e09] border-t border-[#c9973e]/20 space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#c9973e] font-sans font-medium mb-1">
                      Nama Pemesan <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Cth: Kak Dandi / Meja 3"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-white/[0.04] text-xs text-[#f5f0e8] px-3 py-2.5 border border-[#c9973e]/30 rounded focus:border-[#c9973e] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#c9973e] font-sans font-medium mb-1">
                        Opsi Pemesanan
                      </label>
                      <select
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                        className="w-full bg-[#120b07] text-xs text-[#f5f0e8] px-3 py-2.5 border border-[#c9973e]/30 rounded focus:border-[#c9973e] focus:outline-none"
                      >
                        <option value="Dine-in (Makan di Tempat)">Makan di Tempat (Dine-in)</option>
                        <option value="Takeaway (Bawa Pulang)">Bawa Pulang (Takeaway)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#c9973e] font-sans font-medium mb-1">
                        Catatan Pesanan (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="Cth: 1/2 matang lumer, es sedikit"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-white/[0.04] text-xs text-[#f5f0e8] px-3 py-2 border border-[#c9973e]/30 rounded focus:border-[#c9973e] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Subtotal & Total */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#a0988e]">
                    Total Pembayaran
                  </span>
                  <span className="text-xl font-bold text-[#c9973e] font-serif">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Checkout WA Button */}
                <button
                  type="button"
                  onClick={handleCheckoutWA}
                  className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-[#0d0905] text-xs uppercase tracking-[0.15em] font-sans font-bold flex items-center justify-center gap-2 rounded transition-all shadow-lg active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Checkout ke WhatsApp
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
