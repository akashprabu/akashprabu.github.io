// import logo from "./logo.svg";
import Navbar from "./components/Navbar.jsx";
import { MainBody, MainBodyMobile } from "./components/Main.jsx";
import SocialMedia from "./components/SocialMedia.jsx";
import Associations from "./components/Associations.jsx";
import "./App.css";

function App() {
  return (
    <div class="md:h-[calc(100vh-5.5rem)] md:border-none h-full border-2 border-primary ">
      <header class="sticky top-0 z-[100]">
        <Navbar />
      </header>
      {/* Mobile */}
      <main class="md:hidden w-full flex flex-col">
        <MainBodyMobile />
      </main>
      {/* Desktop */}
      <main class="hidden md:grid md:grid-cols-12 md:h-full md:mt-4">
        <div class="col-span-1">
          <SocialMedia />
        </div>
        <div class="col-span-10 flex overflow-hidden">
          <div class=" flex-1 overflow-y-scroll scrollbar-hide ">
            <MainBody />
          </div>
        </div>
        <div class="col-span-1">
          <Associations />
        </div>
      </main>
    </div>
  );
}

export default App;
