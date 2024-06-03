import { createSignal } from "solid-js";

const url = "https://sauron.onrender.com/sauron/backend";

function EducationUnit(props) {
  const [logo, setLogo] = createSignal(props.initialLogo);
  const [degree, setDegree] = createSignal(props.initialDegree);
  const [university, setUniversity] = createSignal(props.initialUniversity);
  const [location, setLocation] = createSignal(props.initialLocation);
  const [major, setMajor] = createSignal(props.initialMajor);
  const [specialization, setSpecialization] = createSignal(
    props.initialSpecialization
  );
  return (
    <div class="md:grid md:grid-cols-12 flex flex-col" id="education-mb">
      <div class="md:col-span-4 flex justify-center">
        <figure class="md:w-[60%] md:m-0 w-1/3 m-4">
          <img src={logo()} alt="" />
        </figure>
      </div>
      <div class="md:col-span-8 md:text-left text-center">
        <div class="flex flex-col h-full">
          <div class="md:text-4xl text-[1.3rem] text-accent font-extrabold mb-2">
            {degree()}
          </div>
          <div class="md:mt-4 mb-4">
            {university()}, {location()}
          </div>
          <div class="text-primary text-base">
            {major()} <br />
            {specialization() ? "Specialization - " + specialization() : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

function Education() {
  return (
    <div class="h-full flex" id="education">
      <div class="w-full h-3/4 flex flex-col m-auto">
        <div class="flex z-50">
          <div class="w-[18%] ml-[9rem] flex flex-col shadow-[0_0_15px_15px_#051420] rounded-md text-center bg-base-100">
            <span class="text-4xl text-accent">Education</span>
          </div>
        </div>
        <div class="p-14 h-2/3 border-2 border-solid border-primary rounded-lg shadow-mainbox font-body bg-neutral">
          <div class="grid grid-cols-12 gap-4 h-full">
            <div class="col-span-6 ">
              <EducationUnit
                initialLogo="/education/cu.png"
                initialDegree="Master of Science"
                initialUniversity="Columbia University"
                initialLocation="NY"
                initialMajor="Computer Science"
                initialSpecialization="Computer Vision and Machine Learning "
              />
            </div>
            <div class="col-span-6 ">
              <EducationUnit
                initialLogo="/education/nitt.png"
                initialDegree="Bachelor of Technology"
                initialUniversity="National Institute of Technology, Tiruchirappalli"
                initialLocation="India"
                initialMajor="Computer Science with Honors | Minor - Management Studies"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EducationMobile() {
  return (
    <div class="h-full flex">
      <div class="w-11/12 h-3/4 flex flex-col m-auto">
        <div class="flex z-50 ">
          <div class="w-1/2 flex flex-col mx-auto shadow-[0_0_15px_15px_#051420] text-center rounded-md bg-base-100">
            <span class="text-3xl text-accent">Education</span>
          </div>
        </div>
        <div class="p-8 h-2/3 border-2 border-solid border-primary rounded-lg shadow-mainbox font-body bg-neutral">
          <div class="flex flex-col h-full">
            <div>
              <EducationUnit
                initialLogo="/education/cu.png"
                initialDegree="Master of Science"
                initialUniversity="Columbia University"
                initialLocation="NY"
                initialMajor="Computer Science"
                initialSpecialization="Computer Vision and Machine Learning "
              />
            </div>
            <div class="divider" />
            <div>
              <EducationUnit
                initialLogo="/education/nitt.png"
                initialDegree="Bachelor of Technology"
                initialUniversity="National Institute of Technology, Tiruchirappalli"
                initialLocation="India"
                initialMajor="Computer Science with Honors | Minor - Management Studies"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Education, EducationMobile };
