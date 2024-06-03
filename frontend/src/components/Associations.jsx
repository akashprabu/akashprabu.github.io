import { createRenderEffect, createSignal } from "solid-js";

const url = "https://sauron.onrender.com/sauron/backend"
export default function Associations() {
  const s3Associations = "https://sauron-data.s3.amazonaws.com/associations/";
  const [associations, setAssociations] = createSignal();
  createRenderEffect(() => {
    fetch(url + "/association/get/all")
      .then((response) => response.json())
      .then((data) => setAssociations(data));
  });
  return (
    <div>
      <div class="flex flex-col h-[calc(100vh-7rem)] gap-8  place-items-center">
        <For each={associations()}>
          {(assoc, i) => (
            <figure class="w-2/3 place-items-center row-span-1">
              <img
                style={{
                  filter: "sepia(100%) hue-rotate(170deg) saturate(3)",
                }}
                src={s3Associations + assoc.data.url}
                alt={assoc.data.name}
              />
            </figure>
          )}
        </For>
        <div class="row-span-2 h-full w-0.5 bg-secondary" />
      </div>
    </div>
  );
}
