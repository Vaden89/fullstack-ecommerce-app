import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LucideIcon,
  LucideProps,
  TwitterIcon,
} from "lucide-react";
import Twitter from "next-auth/providers/twitter";

export const Footer = () => {
  const columns = [
    {
      header: "COMPANY",
      children: ["About", "Contact", "Careers", "Blog"],
    },
    {
      header: "HELP",
      children: ["FAQ", "Shipping", "Returns", "Contact Us"],
    },
    {
      header: "ACCOUNT",
      children: ["My Account", "Orders", "Wishlist", "Notifications"],
    },
    {
      header: "LEGAL",
      children: [
        "Terms of Service",
        "Privacy Policy",
        "Cookie Policy",
        "Accessibility",
      ],
    },
  ];

  return (
    <footer className="w-full -mt-32 px-4 py-28 flex flex-col bg-gray-200 gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-3xl font-bold">SHOP.CO</span>
        <p className="text-gray-500 text-sm leading-[20px]">
          We have clothes thtat suits your style and which you're proud to wear.
          From women to men
        </p>
      </div>
      <div className="flex items-center gap-2">
        <SocialCard icon={TwitterIcon} />
        <SocialCard icon={FacebookIcon} />
        <SocialCard icon={InstagramIcon} isFilled={false} />
        <SocialCard icon={GithubIcon} />
      </div>
      <div className="w-full grid grid-cols-2 gap-6">
        {columns.map((column, index) => (
          <FooterBaseColumn
            key={index}
            header={column.header}
            children={column.children}
          />
        ))}
      </div>
      <div
        className="w-full flex flex-col items-center border-t
         border-t-gray-300 py-4 mt-4"
      >
        <span className="text-sm text-[#00000060]">
          Shop.co © 2000-2025, All Rights Reserved
        </span>
      </div>
    </footer>
  );
};

const FooterBaseColumn = ({
  header,
  children,
}: {
  header: string;
  children: string[];
}) => {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-medium tracking-[3px]">{header}</span>
      {children.map((child, index) => (
        <span className="text-[#00000060]" key={index}>
          {child}
        </span>
      ))}
    </div>
  );
};

const SocialCard = ({
  icon,
  isFilled = true,
}: {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  isFilled?: boolean;
}) => {
  const Icon = icon as LucideIcon;
  return (
    <div className="w-7 h-7 rounded-full border bg-white flex flex-col items-center justify-center">
      <Icon size={15} fill={isFilled ? "black" : "none"} />
    </div>
  );
};
