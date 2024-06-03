import {
  createRenderEffect,
  createSignal,
  For,
} from "solid-js";


const url = "https://sauron.onrender.com/sauron/backend";

function buildDuration(startDate , endDate) {
  startDate = new Date(startDate);
  endDate = endDate? new Date(endDate): null;
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  let duration = [
    monthNames[startDate.getMonth()],
    startDate.getFullYear(),
    "(",
    endDate != null? Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24 * 30)): "Present",
    endDate != null? "months": "",
    ")"
  ];
  return duration.join(" ");
}


function TechBubble(props) {
  return (
    <div class="md:p-4 p-2 md:text-lg text-sm text-[antiquewhite] font-extrabold badge badge-primary hover:badge-secondary">
      {props.item}
    </div>
  );
}

function ExperienceUnit(props) {
  const s3Experiences = "https://sauron-data.s3.amazonaws.com/experiences/";
  return (
    <div class="h-full flex flex-col">
      <div class="md:grid md:grid-cols-12 flex flex-col justify-center">
        <div class="md:col-span-3 ">
          <figure class="md:w-1/2 w-1/3 m-auto">
            <img src={s3Experiences + props.logo} alt={props.company} />
          </figure>
        </div>
        <div class="md:col-span-9 md:text-left h-full text-center">
          <div class="flex flex-col h-full">
            <div class="font-bold md:text-[2.5rem] text-xl mb-4">
              {props.role}
            </div>
            <div class="text-primary md:text-base text-sm">
              {props.company} &#8728; {props.type} &#8728; {props.location}{" "}
              &#8728; {props.duration}
            </div>
          </div>
        </div>
      </div>
      <div class="md:text-xl w-full text-justify text-sm mt-2">
        <ul>
          <For each={props.desc.split("*")}>
            {(descItem) => <li class="m-4">&#8594; {descItem}</li>}
          </For>
        </ul>
      </div>
      <div class="md:ml-4 md:mb-0 w-full flex flex-row flex-wrap space-x-2 ml-2 mb-2 ">
        <For each={props.tech.split(";")}>
          {(techItem) => <TechBubble item={techItem} />}
        </For>
      </div>
    </div>
  );
}

function ExperienceMobile() {
  const [experiences, setExperiences] = createSignal();
  const [currentExperience, setCurrentExperience] = createSignal();
  createRenderEffect(() => {
    fetch(url + "/exp/get/all")
      .then((response) => response.json())
      .then((data) => {
        setExperiences(data);
        setCurrentExperience(data[0]["data"]);
      });
  });
  const getSelectedExperience = (event) => {
    let id = $(event.target).data("exp");
    setCurrentExperience(experiences()[id]["data"]);
    $(".exp-link").each(function(index) {
      $(this).removeClass("text-accent")
      $(this).hasClass("text-primary")? null :  $(this).addClass("text-primary");
    })
    $(event.target).addClass("text-accent")
    $(event.target).removeClass("text-primary")
  };

  return (
    <div class="h-full flex" id="experience-mb">
      <div class="w-11/12 h-3/4 flex flex-col m-auto">
        <div class="flex z-50 ">
          <div class="w-1/2 flex flex-col mx-auto shadow-[0_0_15px_15px_#051420] text-center rounded-md bg-base-100">
            <span class="text-3xl text-accent">Experience</span>
          </div>
        </div>
        <div class="p-4 h-2/3 border-2 border-solid border-primary rounded-lg shadow-mainbox font-body bg-neutral">
          <div class="flex flex-col space-y-8 h-full">
            <div class="flex flex-row space-x-8 justify-center">
            <For each={experiences()}>
                {(exp, i) => (
                  <div class="mb-2 font-bold">
                    <a
                      data-exp={i()}
                      class={(i() == 0)? "exp-link text-accent": "exp-link text-primary"} 
                      onClick={getSelectedExperience}
                    >
                      {i() + 1}.
                    </a>
                  </div>
                )}
              </For>
            </div>
            {currentExperience() ? (
                <ExperienceUnit
                  role={currentExperience().role}
                  company={currentExperience().company}
                  type={currentExperience().job_type}
                  location={currentExperience().location}
                  duration= {buildDuration(currentExperience().start_date, currentExperience().end_date)} 
                  logo={currentExperience().logo}
                  desc={currentExperience().desc}
                  tech={currentExperience().tech}
                />
              ) : (
                ""
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Experience() {
  const [experiences, setExperiences] = createSignal();
  const [currentExperience, setCurrentExperience] = createSignal();
  createRenderEffect(() => {
    fetch(url + "/exp/get/all")
      .then((response) => response.json())
      .then((data) => {
        setExperiences(data);
        setCurrentExperience(data[0]["data"]);
      });
  });
  const getSelectedExperience = (event) => {
    let id = $(event.target).data("exp");
    setCurrentExperience(experiences()[id]["data"]);
    $(".exp-link").each(function(index) {
      $(this).removeClass("text-accent")
      $(this).hasClass("text-primary")? null :  $(this).addClass("text-primary");
    })
    $(event.target).addClass("text-accent")
    $(event.target).removeClass("text-primary")
  };

  return (
    <div class="h-full flex relative"  id="experience">
      <div class="w-full h-min flex flex-col m-auto">
        <div class="flex z-50">
          <div class="w-[18%] ml-[9rem] flex flex-col shadow-[0_0_15px_15px_#051420] rounded-md text-center bg-base-100">
            <span class="text-4xl text-accent">Experience</span>
          </div>
        </div>
        <div class="p-14 h-2/3 border-2 border-solid border-primary rounded-lg shadow-mainbox font-body bg-neutral">
          <div class="grid grid-cols-12 gap-4 h-full">
            <div class="col-span-1 flex text-2xl flex-col">
              <For each={experiences()}>
                {(exp, i) => (
                  <div class="mb-2 font-bold">
                    <a
                      href="#"
                      data-exp={i()}
                      class={(i() == 0)? "exp-link text-accent": "exp-link text-primary"} 
                      onClick={getSelectedExperience}
                    >
                      {i() + 1}.
                    </a>
                  </div>
                )}
              </For>
            </div>
            <div class="col-span-11">
              {currentExperience() ? (
                <ExperienceUnit
                  role={currentExperience().role}
                  company={currentExperience().company}
                  type={currentExperience().job_type}
                  location={currentExperience().location}
                  duration= {buildDuration(currentExperience().start_date, currentExperience().end_date)}
                  logo={currentExperience().logo}
                  desc={currentExperience().desc}
                  tech={currentExperience().tech}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Experience, ExperienceMobile };
