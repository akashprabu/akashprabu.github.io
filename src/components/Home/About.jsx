// filter: sepia(1) saturate(80%) hue-rotate(170deg) contrast(1.2);
//   transition: filter 500ms linear;
import AboutBody from "./AboutBody";

function AboutMobile() {
  return (
    <div class="h-full">
      <div class="flex container h-full w-2/3 mb-4 mx-auto">
        <figure class="m-auto">
          <img
            class="rounded-full "
            src="https://sauron-data.s3.amazonaws.com/DSC_6317.jpg"
            alt="Vishal Saranathan"
          />
        </figure>
      </div>
      <div class="flex container w-11/12 mx-auto">
        <AboutBody />
      </div>
    </div>
  );
}

function About() {
  return (
    <div class="h-full">
      <div class="grid grid-cols-12 h-full ">
        <div class="col-span-5 h-full">
          <div class="flex h-full container">
            <figure class="m-auto w-75">
              <img
                class="rounded-3xl transition ease-in-out filter saturate-25 brightness-125 contrast-125 hover:filter-none duration-500"
                src="https://sauron-data.s3.amazonaws.com/DSC_6317.jpg"
                alt="Vishal Saranathan"
              />
            </figure>
          </div>
        </div>
        <div class="col-span-7 h-full ">
          <div class="flex h-full container">
            <AboutBody />
          </div>
        </div>
      </div>
    </div>
  );
}

export { About, AboutMobile };
