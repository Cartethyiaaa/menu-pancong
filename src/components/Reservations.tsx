import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { GoldUnderlineHeading } from './GoldUnderlineHeading';

export const Reservations: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    guests: '2 Orang',
    orderType: 'Dine-in (Makan di Tempat)',
    time: '19:00 WIB',
    notes: '',
  });

  const handleBookingWA = (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim() || 'Pelanggan';

    let message = `Halo Pancong Donto! 👋\nSaya mau booking meja / pre-order:\n\n`;
    message += `👤 Nama: ${name}\n`;
    message += `👥 Jumlah: ${formData.guests}\n`;
    message += `🛵 Opsi: ${formData.orderType}\n`;
    message += `⏰ Jam Kedatangan: ${formData.time}\n`;
    if (formData.notes.trim()) {
      message += `📝 Catatan/Menu: ${formData.notes.trim()}\n`;
    }
    message += `\nMohon konfirmasi ketersediaan meja ya min, terima kasih! 🙏`;

    const waUrl = `https://wa.me/6285782203468?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="reservations" className="py-24 px-6 md:px-16 bg-[#0a0704] relative border-t border-[#c9973e]/15">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <GoldUnderlineHeading subtitle="PRE-ORDER &bull; NO ANTRI">
            Booking Meja &amp; Pre-Order
          </GoldUnderlineHeading>
          <p className="mt-4 text-[#a0988e] text-sm md:text-base font-sans font-light">
            Sebutkan menu dan perkiraan jam datang agar pancong hangat dan minumanmu siap pas kamu tiba.
          </p>
        </div>

        {/* Visual Effect 5: Glassmorphism Card */}
        <div
          className="w-full relative rounded-sm overflow-hidden p-px shadow-2xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(201,151,62,0.5), rgba(201,151,62,0.05) 50%, rgba(201,151,62,0.2))',
          }}
        >
          <div
            className="rounded-sm p-6 sm:p-10 md:p-12"
            style={{
              background: 'rgba(13,9,5,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            <form onSubmit={handleBookingWA} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#c9973e] mb-2 font-sans font-medium">
                    Nama Pemesan <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kak Dandi / Siti"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/[0.04] text-[#f5f0e8] placeholder-[#a0988e]/40 text-sm px-3.5 py-3 border-b border-[#c9973e]/40 focus:border-[#c9973e] focus:outline-none transition-colors"
                  />
                </div>

                {/* Guests */}
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#c9973e] mb-2 font-sans font-medium">
                    Jumlah Orang / Porsi
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="bg-[#140d07] text-[#f5f0e8] text-sm px-3.5 py-3 border-b border-[#c9973e]/40 focus:border-[#c9973e] focus:outline-none transition-colors"
                  >
                    <option value="1 Orang">1 Orang</option>
                    <option value="2 Orang">2 Orang</option>
                    <option value="3-4 Orang">3–4 Orang</option>
                    <option value="5-8 Orang">5–8 Orang (Rombongan)</option>
                    <option value="Diatas 8 Orang">Diatas 8 Orang (Acara/Nongkrong)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Opsi */}
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#c9973e] mb-2 font-sans font-medium">
                    Opsi Pemesanan
                  </label>
                  <select
                    value={formData.orderType}
                    onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                    className="bg-[#140d07] text-[#f5f0e8] text-sm px-3.5 py-3 border-b border-[#c9973e]/40 focus:border-[#c9973e] focus:outline-none transition-colors"
                  >
                    <option value="Dine-in (Makan di Tempat)">Makan di Tempat (Dine-in)</option>
                    <option value="Takeaway (Bawa Pulang)">Bawa Pulang (Takeaway)</option>
                  </select>
                </div>

                {/* Time */}
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#c9973e] mb-2 font-sans font-medium">
                    Perkiraan Jam Datang
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 19:30 WIB"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="bg-white/[0.04] text-[#f5f0e8] placeholder-[#a0988e]/40 text-sm px-3.5 py-3 border-b border-[#c9973e]/40 focus:border-[#c9973e] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#c9973e] mb-2 font-sans font-medium">
                  Catatan Menu yang Mau Dipesan (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pancong Mix 2 pcs lumer, 1 Butterscotch Coffee"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="bg-white/[0.04] text-[#f5f0e8] placeholder-[#a0988e]/40 text-sm px-3.5 py-3 border-b border-[#c9973e]/40 focus:border-[#c9973e] focus:outline-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 text-[12px] uppercase tracking-[0.2em] text-[#0d0905] bg-[#c9973e] hover:bg-[#e0aa48] transition-all duration-300 font-sans font-bold shadow-[0_0_24px_rgba(201,151,62,0.3)] hover:shadow-[0_0_36px_rgba(201,151,62,0.5)] active:scale-98 flex items-center justify-center gap-2 rounded-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Kirim Booking via WhatsApp
                </button>
              </div>

              <p className="text-center text-[11px] text-[#a0988e]/70 font-sans font-light tracking-wide">
                Buka setiap hari 07.00 &ndash; 23.00 WIB &bull; Jl. Siti Jenab No. 67, Cianjur
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
