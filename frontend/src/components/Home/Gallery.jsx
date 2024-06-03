import { createRenderEffect, createSignal } from "solid-js";

const url = "https://sauron.onrender.com/sauron/backend";

function GalleryMobile() {
  const s3Photography = "https://sauron-data.s3.amazonaws.com/photography/";
  const [photos, setPhotos] = createSignal();
  createRenderEffect(() => {
    fetch(url + "/photo/get/all")
      .then((response) => response.json())
      .then((data) => [setPhotos(data)]);
  });
  return (
    <div class="h-full flex" id="photography-mb">
      <div class="w-11/12 h-3/4 flex flex-col m-auto">
        <div class="flex z-50 ">
          <div class="w-1/2 flex flex-col mx-auto shadow-[0_0_15px_15px_#051420] text-center rounded-md bg-base-100">
            <span class="text-3xl text-accent">Gallery</span>
          </div>
        </div>
        <div class="p-4 h-2/3 border-2 border-solid border-primary rounded-lg shadow-mainbox font-body bg-neutral">
          <div class="flex flex-col h-full">
            <p class="text-center mb-8 text-primary">
              <span class="italic">
                An aimless wanderlust, marking my presence in wonderlands!
              </span>
              <br />
              Do check out my page{" "}
              <a
                href="https://www.instagram.com/_vishal_here_/"
                class="text-accent underline hover:text-secondary"
              >
                _vishal_here_
              </a>{" "}
              for more of my photomania.
            </p>
            <div class="w-full carousel rounded-box">
              <For each={photos()}>
                {(photo, i) => (
                  <div class="carousel-item w-full">
                    
                    <a href={s3Photography + photo.data.photo_url} target="_blank">
                    <img
                      src={s3Photography + photo.data.photo_url}
                      alt={photo.data.photo_name}
                      class="w-full"
                    />
                      </a>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const s3Photography = "https://sauron-data.s3.amazonaws.com/photography/";
  const [photos, setPhotos] = createSignal();
  createRenderEffect(() => {
    fetch(url + "/photo/get/all")
      .then((response) => response.json())
      .then((data) => [setPhotos(data)]);
  });
  return (
    <div class="min-h-full flex" id="photography">
      <div class="w-full flex flex-col m-auto">
        <div class="flex z-50">
          <div class="w-[18%] ml-[9rem] flex flex-col shadow-[0_0_15px_15px_#051420] rounded-md text-center bg-base-100">
            <span class="text-4xl text-accent">Gallery</span>
          </div>
        </div>
        <div class="p-8 h-2/3 border-2 border-solid border-primary rounded-lg shadow-mainbox font-body bg-neutral">
          <p class="text-center mb-8 text-primary">
            <span class="italic">
              An aimless wanderlust, marking my presence in wonderlands!
            </span>
            <br />
            Do check out my page{" "}
            <a
              href="https://github.com/VishalS99"
              class="text-accent underline hover:text-secondary"
            >
              _vishal_here_
            </a>{" "}
            for more of my photomania.
          </p>
          <div class="grid grid-cols-12">
            <For each={photos()}>
              {(photo, i) => (
                <div class="col-span-3">
                  <div class="flex h-full container">
                    <figure class="m-auto w-5/6">
                      <a href={s3Photography + photo.data.photo_url} target="_blank">
                        <img
                          src={s3Photography + photo.data.photo_url}
                          alt={photo.data.photo_name}
                        />
                      </a>
                    </figure>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Gallery, GalleryMobile };
