export interface Testimonial {
  quote: string;
  attribution: string;
  source: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The dry-aged ribeye was the best piece of beef I have eaten in this city — full stop. The service matched it every step of the way.",
    attribution: "James R.",
    source: "Chicago Tribune dining column",
  },
  {
    quote: "Ember & Stone walks the line between reverence and approachability perfectly. Not precious, not casual — just exactly right.",
    attribution: "Mariana V.",
    source: "Google Reviews, 5★",
  },
  {
    quote: "We hosted our entire board dinner here. Marcus himself came to the table, explained the menu, and made our guests feel like the only people in the room.",
    attribution: "Alicia W.",
    source: "Private Dining Guest",
  },
];
