// import CoinTable from "../components/CoinTable";
import Currency from "../components/Currency";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Trust from "../components/Trust";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Currency />
      {/* <CoinTable /> */}
      <Trust />
      <Testimonials />
    </div>
  );
}
