import React from 'react';
import { Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070503] border-t border-[#c9973e]/25 text-[#a0988e] font-sans text-xs pt-16 pb-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="img/logo.png" alt="Pancong Donto Logo" className="w-10 h-10 object-contain" />
              <div>
                <h4
                  className="text-xl text-[#f5f0e8] font-serif tracking-[0.1em] font-normal leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Pancong Donto
                </h4>
                <p className="text-[10px] text-[#c9973e] tracking-[0.2em] uppercase font-sans">
                  SPECIALTY PANCONG &amp; COFFEE
                </p>
              </div>
            </div>
            <p className="text-[#c9973e] italic font-serif text-sm tracking-wide">
              &ldquo;Baseuh Dijero, Garing Diluar&rdquo;
            </p>
            <p className="text-[#a0988e]/80 text-[13px] leading-relaxed">
              Pelopor kue pancong lumer autentik &amp; racikan kopi Sevenov Signature Blend di Cianjur.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-[#f5f0e8] font-semibold mb-4">
              Jelajahi
            </h5>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a href="#home" className="hover:text-[#c9973e] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#bestseller" className="hover:text-[#c9973e] transition-colors">
                  Menu Favorit
                </a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-[#c9973e] transition-colors">
                  Cerita Kami
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#c9973e] transition-colors">
                  Daftar Harga Menu
                </a>
              </li>
              <li>
                <a href="#paket" className="hover:text-[#c9973e] transition-colors">
                  Paket Hemat
                </a>
              </li>
              <li>
                <a href="#lokasi" className="hover:text-[#c9973e] transition-colors">
                  Lokasi Kedai
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours */}
          <div>
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-[#f5f0e8] font-semibold mb-4">
              Jam Buka
            </h5>
            <div className="space-y-2 text-[13px] leading-relaxed">
              <p>
                <strong className="text-[#f5f0e8] font-normal">Setiap Hari:</strong> 07.00 &ndash; 23.00 WIB
              </p>
              <p className="text-[#c9973e] pt-1 text-xs">
                🔥 Promo Senja: Beli 5 pancong gratis 1 topping (17.00 - 19.00 WIB)
              </p>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div>
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-[#f5f0e8] font-semibold mb-4">
              Kedai Pancong Donto
            </h5>
            <div className="space-y-2 text-[13px] leading-relaxed mb-5">
              <p>Jl. Siti Jenab No. 67, Pamoyanan</p>
              <p>Kec. Cianjur, Kab. Cianjur, Jawa Barat</p>
              <p>
                <a href="https://wa.me/6285782203468" className="hover:text-[#c9973e] transition-colors">
                  WA: 0857-8220-3468
                </a>
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/dontopancong"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#c9973e]/30 flex items-center justify-center text-[#c9973e] hover:border-[#c9973e] hover:bg-[#c9973e]/10 transition-colors"
                aria-label="Instagram @dontopancong"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@pancong.donto6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider text-[#a0988e] hover:text-[#c9973e] transition-colors"
              >
                TikTok @pancong.donto6
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#c9973e]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#a0988e]/60 gap-4">
          <p>&copy; 2026 Pancong Donto. Hak Cipta Dilindungi &bull; Cianjur, Jawa Barat</p>
          <p className="tracking-wide">Baseuh Dijero, Garing Diluar</p>
        </div>
      </div>
    </footer>
  );
};
