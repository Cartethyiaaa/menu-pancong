import React from 'react';
import { MapPin, Clock, Phone, Instagram, ExternalLink } from 'lucide-react';
import { GoldUnderlineHeading } from './GoldUnderlineHeading';

export const LocationSection: React.FC = () => {
  return (
    <section id="lokasi" className="py-24 px-6 md:px-16 bg-[#0d0905] border-t border-[#c9973e]/15">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Info */}
          <div>
            <GoldUnderlineHeading subtitle="TEMUKAN KAMI">
              Mampir ke Pancong Donto
            </GoldUnderlineHeading>

            <p className="mt-6 text-[#a0988e] text-[15px] sm:text-[16px] font-sans font-light leading-relaxed">
              Buka tiap hari dari pagi sampai larut malam &mdash; paling asik nongkrong pas senja. Datang lebih awal kalau mau dapat tempat duduk favoritmu bersama teman dan keluarga!
            </p>

            <div className="mt-8 space-y-6">
              {/* Alamat */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c9973e]/15 border border-[#c9973e]/40 flex items-center justify-center text-[#c9973e] flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f5f0e8] uppercase tracking-wider font-sans">
                    Alamat Kedai
                  </h4>
                  <p className="text-xs sm:text-sm text-[#a0988e] font-sans mt-0.5 leading-relaxed">
                    Jl. Siti Jenab No. 67, Pamoyanan, Kec. Cianjur, Kabupaten Cianjur, Jawa Barat
                  </p>
                </div>
              </div>

              {/* Jam Buka */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c9973e]/15 border border-[#c9973e]/40 flex items-center justify-center text-[#c9973e] flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f5f0e8] uppercase tracking-wider font-sans">
                    Jam Operasional
                  </h4>
                  <p className="text-xs sm:text-sm text-[#a0988e] font-sans mt-0.5">
                    Setiap hari, <strong className="text-[#f5f0e8]">07.00 &ndash; 23.00 WIB</strong>
                  </p>
                </div>
              </div>

              {/* Kontak */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c9973e]/15 border border-[#c9973e]/40 flex items-center justify-center text-[#c9973e] flex-shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f5f0e8] uppercase tracking-wider font-sans">
                    WhatsApp &amp; Telepon
                  </h4>
                  <a
                    href="https://wa.me/6285782203468"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-[#c9973e] hover:underline font-sans mt-0.5 block"
                  >
                    0857-8220-3468
                  </a>
                </div>
              </div>

              {/* Sosmed */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c9973e]/15 border border-[#c9973e]/40 flex items-center justify-center text-[#c9973e] flex-shrink-0 mt-1">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f5f0e8] uppercase tracking-wider font-sans">
                    Sosial Media
                  </h4>
                  <p className="text-xs sm:text-sm text-[#a0988e] font-sans mt-0.5">
                    <a
                      href="https://www.instagram.com/dontopancong"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c9973e] hover:underline"
                    >
                      @dontopancong
                    </a>{' '}
                    &bull;{' '}
                    <a
                      href="https://tiktok.com/@pancong.donto6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c9973e] hover:underline"
                    >
                      @pancong.donto6
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://share.google/hVPR2yXPPjXpFyWBk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#c9973e] text-[#0d0905] text-xs uppercase tracking-wider font-sans font-bold rounded-sm hover:bg-[#e0aa48] transition-all shadow-[0_0_20px_rgba(201,151,62,0.25)]"
              >
                <span>Buka di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Storefront Photo */}
          <div className="relative rounded-sm overflow-hidden border border-[#c9973e]/30 shadow-2xl aspect-[4/3] group">
            <img
              src="img/kedai_storefront.jpg"
              alt="Storefront Kedai Pancong Donto Cianjur"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 z-10 p-3 rounded bg-black/75 backdrop-blur-sm border border-white/10 text-xs">
              <strong className="block text-[#f5f0e8] font-serif text-sm">Pancong Donto &mdash; Cianjur</strong>
              <span className="text-[#a0988e]">Jl. Siti Jenab No. 67</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
