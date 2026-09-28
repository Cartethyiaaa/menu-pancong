import { ReviewItem } from '../types';

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Reza M.',
    location: 'Pelanggan Setia • Cianjur',
    quote: 'Pancong lumernya beneran lumer banget! Keju mozzarellanya molor kayak di video, beneran wow. Wajib banget dicoba kalau ke Cianjur!',
    stars: 5,
  },
  {
    id: 'rev-2',
    name: 'Siti N.',
    location: 'Pelanggan Setia • Cianjur',
    quote: 'Kopinya enak banget, signature blend-nya khas dan unik. Sekarang jadi tempat nongkrong favorit saya sama teman-teman tiap sore.',
    stars: 5,
    isFeatured: true,
  },
  {
    id: 'rev-3',
    name: 'Dandi P.',
    location: 'Pelanggan • Bandung',
    quote: 'Harganya murah tapi kualitasnya beneran oke! Butterscotch coffee-nya bikin nagih, sampe pesan dua gelas sekaligus haha!',
    stars: 5,
  },
];
