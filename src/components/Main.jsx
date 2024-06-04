import { About, AboutMobile } from "./Home/About";
import { Experience, ExperienceMobile } from "./Home/Experience";
import { Education, EducationMobile } from "./Home/Education";
import { Projects, ProjectsMobile } from "./Home/Projects";
import { Gallery, GalleryMobile } from "./Home/Gallery";
import Footer from "./Footer";

function MainBodyMobile() {
  return (
    <div class="flex flex-col space-y-8">
      <AboutMobile />
      <ExperienceMobile />
      <EducationMobile />
      <ProjectsMobile />
      <GalleryMobile />
      <Footer />
    </div>
  );
}

function MainBody() {
  return (
    <div class="h-full" id="main">
      <About />
      <Experience />
      <Education />
      <Projects />
      <Gallery />
      <Footer />
    </div>
  );
}

export { MainBody, MainBodyMobile };
