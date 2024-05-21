import Cards from "@/components/LandingPage/Card";
import Card from "@/components/LandingPage/Card";
import Carousel from "@/components/LandingPage/Carousel";
import Carousel2 from "@/components/LandingPage/Carousel2";
import Popular from "@/components/LandingPage/Popular";
import AuthenticatedNavbar from "@/components/Navbar/AuthenticatedNavbar";
import NavbarLogin from "@/components/Navbar/NavbarLogin";
import NavbarNonLogin from "@/components/Navbar/NavbarNonLogin";



export default function Home() {
  return (
   <>
   <NavbarNonLogin/>
   <NavbarLogin/>
   <div className="container border border-danger ">


   <Carousel/>
   <Carousel2/>
   <Cards/>
   <Popular/>
   </div>

   </>
  );
}
