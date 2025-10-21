import { BrowseCategoriesSection } from "@/components/sections/browse-categories";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero";
import { NewArrivalSection } from "@/components/sections/new-arrival";
import { NewsLetterSection } from "@/components/sections/newsletter";
import { TestimonialSection } from "@/components/sections/testimonials";
import { TopSellingSection } from "@/components/sections/top-selling";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <HeroSection />
      <NewArrivalSection />
      <TopSellingSection />
      <TestimonialSection />
      <BrowseCategoriesSection />
      <NewsLetterSection />
      <Footer />
    </div>
  );
}
