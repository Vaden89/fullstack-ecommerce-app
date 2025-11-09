import { DiscountBanner } from "@/components/discount-banner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { NewsLetterSection } from "@/components/sections/newsletter";
import { TestimonialSection } from "@/components/sections/testimonials";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col">
      <DiscountBanner />
      <Navbar />
      <div className="w-full h-full sm:px-14">
        <hr />
        {children}
      </div>
      <NewsLetterSection />
      <Footer />
    </div>
  );
}
