import { createRenderEffect, createSignal } from "solid-js";

const url = "https://sauron.onrender.com/sauron/backend";

function ProjectsMobile() {
  const [projects, setProjects] = createSignal([{data: {title: "abc", desc:"lll",link:"/as/as"}},{data: {title: "abc", desc:"lll",link:"/as/as"}}]);
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
    $(event
      .target).removeClass("btn-primary")
  };

  console.log(projects())
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
  const [projects, setProjects] = createSignal([
    {
      id: 1,
      title:
        "Performance Modeling and Analysis of Unsupervised Domain Adaptation",
      desc: "Performance analysis of SOTA <span class='proj-highlight'>image-to-image translation (i2i)</span> networks for the task of <span class='proj-highlight'>domain adaptation</span> in computer vision. A detailed study using multiple compute resources, datasets, architectures and frameworks was made to analyse the impact of these variations on performance metrics.",
      link: "https://github.com/VishalS99/COMS6998-Project",
    },
    {
      id: 2,
      title: "Real-time detection of vehicular accidents using CCTV footage ",
      desc: " Modeling and comparing two approaches through computer vision and supervised deep learning to detect accidents in real-time. A setup capitalizing on various <span class='proj-highlight'>spatio-temporal features</span> extracted from the CCTV surveillance footage, providing a robust method by achieving low false alarm rate while ensuring a high detection rate.",
      link: "",
    },
    {
      id: 3,
      title: "Project Securise",
      desc: "Developed an Automatic Number Plate Recognition System for university campus that logs entrance and exit of vehicles, using <span class='proj-highlight'>FasterRCNN</span> with <span class='proj-highlight'>ResNet101</span>. The system achieved 95% extraction accuracy. ",
      link: "https://github.com/VishalS99/Project-Securise",
    },
  
    {
      id: 4,
      title: "Document Requisition Portal",
      desc: "A web portal for managing university's document request and verification during pandemic, created using <span class='proj-highlight'>NodeJS/Express</span>, <span class='proj-highlight'>ReactJS</span>, <span class='proj-highlight'>SQL</span>, and deployed on custom servers.",
      link: "https://github.com/SpiderNitt/Document-Request-Portal",
    },
    {
      id: 5,
      title: "Smart SQLizer",
      desc: "An <span class='proj-highlight'>OpenCV</span> based database populator to relieve the hassle! Using image processing techniques to extract tables and, create and populate SQL databases, without much user involvement.",
      link: "https://github.com/VishalS99/Smart-SQLizer",
    },
  ]);
  // createRenderEffect(() => {
  //   fetch(url + "/project/get/all")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProjects(data);
  //     });
  // });
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
                      <h2 class="card-title">{project.title}</h2>
                      <p class="prose">
                        <span innerHTML={project.desc}></span>
                      </p>
                      <div class="card-actions justify-end">
                        <button class="btn btn-outline">
                          {" "}
                          <a target="_blank" href={project.link}>
                            Code {project}
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
