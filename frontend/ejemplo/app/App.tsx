import { Header } from "./components/Header";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { ProductCategories } from "./components/ProductCategories";
import { Services } from "./components/Services";
import { AboutUs } from "./components/AboutUs";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <FeaturedProducts />
        <ProductCategories />
        <Services />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}