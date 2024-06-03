import { createRenderEffect, createSignal } from "solid-js";

const url = "https://sauron.onrender.com/sauron/backend";

function ProjectsMobile() {
  const [projects, setProjects] = createSignal();
  createRenderEffect(() => {
    fetch(url + "/project/get/all")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      });
  });
  const getSelectedProject = (event) => {
    $(".proj-btn").each(function(index) {
      $(this).removeClass("btn-accent")
      $(this).hasClass("btn-primary")? null :  $(this).addClass("btn-primary");
    })
    $(event.target).addClass("btn-accent")
    $(event.target).removeClass("btn-primary")
  };
  return (
    <div class="h-full flex" id="project-mb">
      <div class="w-11/12 h-3/4 flex flex-col m-auto">
        <div class="flex z-50 ">
          <div class="w-1/2 flex flex-col mx-auto shadow-[0_0_15px_15px_#051420] text-center rounded-md bg-base-100">
            <span class="text-3xl text-accent">Projects</span>
          </div>
        </div>
        <div class="p-2 h-2/3 border-2 border-solid border-primary rounded-lg shadow-mainbox font-body bg-neutral">
          <p class="text-center mb-4 mt-4 text-primary">
            Visit my{" "}
            <a
              href="https://github.com/VishalS99"
              class="text-accent underline hover:text-secondary"
            >
              Github
            </a>{" "}
            to view all my projects{" "}
          </p>
          <div class="carousel w-full">
            <For each={projects()}>
              {(project, i) => (
                <div id={"item" + (i() + 1)} class="carousel-item w-full">
                  <div class="card bg-base-100 text-primary-content">
                    <div class="card-body">
                      <h2 class="card-title">
                        {project.data.title}
                      </h2>
                      <p class="prose">
                        <span innerHTML={project.data.desc}></span>
                      </p>
                      <div class="card-actions justify-center">
                        <button class="btn btn-outline">
                          {" "}
                          <a
                            target="_blank"
                            href={project.data.link}
                          >
                            Code
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
          <div class="flex justify-center w-full py-2 gap-2">
            <For each={projects()}>
              {(project, i) => (
                <a
                  href={"#item" + (i() + 1).toString()}
                  class={i() == 0? "btn btn-accent btn-xs proj-btn": "btn btn-primary btn-xs proj-btn"}
                  data-project={i()}
                  onClick={getSelectedProject}
                >
                  {i() + 1}
                </a>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [projects, setProjects] = createSignal();
  createRenderEffect(() => {
    fetch(url + "/project/get/all")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      });
  });
  return (
    <div class="min-h-full flex relative" id="project">
      <div class="w-full h-min flex flex-col m-auto">
        <div class="flex z-50">
          <div class="w-[18%] ml-[9rem] flex flex-col shadow-[0_0_15px_15px_#051420] rounded-md text-center bg-base-100">
            <span class="text-4xl text-accent">Projects</span>
          </div>
        </div>
        <div class="p-8 border-2 border-solid border-primary rounded-lg shadow-mainbox font-body bg-neutral">
          <p class="text-center mb-8 text-primary">
            Visit my{" "}
            <a
              href="https://github.com/VishalS99"
              class="text-accent underline hover:text-secondary"
            >
              Github
            </a>{" "}
            to view all my projects{" "}
          </p>
          <div class="grid grid-cols-12 gap-4">
            <For each={projects()}>
              {(project, i) => (
                <div class="col-span-4">
                  <div class="card bg-base-100 text-primary-content">
                    <div class="card-body" data-project={i()}>
                      <h2 class="card-title">{project.data.title}</h2>
                      <p class="prose">
                        <span innerHTML={project.data.desc}></span>
                      </p>
                      <div class="card-actions justify-end">
                        <button class="btn btn-outline">
                          {" "}
                          <a target="_blank" href={project.data.link}>
                            Code
                          </a>
                        </button>
                      </div>
                    </div>
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

export { Projects, ProjectsMobile };
