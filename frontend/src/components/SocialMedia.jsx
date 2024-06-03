import { HiOutlineMail } from "solid-icons/hi";
import { FiGithub } from "solid-icons/fi";
import { TbBrandLinkedin } from "solid-icons/tb";
import { FiInstagram } from "solid-icons/fi";
import { FiTwitter } from "solid-icons/fi";
import { createRenderEffect, createSignal } from "solid-js";

const url = "https://sauron.onrender.com/sauron/backend"
export default function SocialMedia() {
  const [links, setLinks] = createSignal();
  createRenderEffect(() => {
    fetch(url + "/link/get/all")
      .then((response) => response.json())
      .then((data) => {
        setLinks(data);
      });
  });
  return (
    <div class="flex flex-col h-[calc(100vh-7rem)] gap-8 place-items-center">
      <div class="h-full w-0.5 bg-secondary" />
          <div class="place-items-center row-span-1">
            <a href={links()? "mailto:" + links()[1].data.link: "#"} target="_blank">
              <HiOutlineMail
                size={24}
                class="stroke-primary hover:fill-accent"
              />
            </a>
          </div>
          <div class=" place-items-center row-span-1">
            <a href={links()?links()[3].data.link: "#"} target="_blank">
              <FiGithub size={24} class="stroke-primary hover:fill-accent" />
            </a>
          </div>
          <div class=" place-items-center row-span-1">
            <a href={links()?links()[4].data.link: "#"} target="_blank">
              <TbBrandLinkedin
                size={24}
                class="stroke-primary hover:fill-accent"
              />
            </a>
          </div>
          <div class=" place-items-center row-span-1">
            <a href={links()?links()[0].data.link: "#"} target="_blank">
              <FiInstagram size={24} class="stroke-primary hover:fill-accent" />
            </a>
          </div>
          <div class=" place-items-center row-span-1">
            <a href={links()?links()[2].data.link: "#"} target="_blank">
              <FiTwitter size={24} class="stroke-primary hover:fill-accent" />
            </a>
          </div>
    </div>
  );
}
