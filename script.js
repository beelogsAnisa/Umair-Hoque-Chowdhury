(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    root.style.setProperty("--scroll-progress", String(max > 0 ? window.scrollY / max : 0));
    document.body.classList.toggle("has-scrolled", window.scrollY > 24);
  };

  const updatePointer = (event) => {
    if (reducedMotion || event.pointerType === "touch") return;
    root.style.setProperty("--pointer-x", `${event.clientX}px`);
    root.style.setProperty("--pointer-y", `${event.clientY}px`);
  };

  const revealNodes = document.querySelectorAll("[data-reveal]");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );
    revealNodes.forEach((node) => observer.observe(node));
  }

  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("pointermove", updatePointer, { passive: true });

  const portrait = document.querySelector(".portrait-wrap");
  if (portrait) {
    portrait.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;
      const bounds = portrait.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      portrait.style.setProperty("--tilt-x", `${y * -5}deg`);
      portrait.style.setProperty("--tilt-y", `${x * 7}deg`);
    });
    portrait.addEventListener("pointerleave", () => {
      portrait.style.setProperty("--tilt-x", "0deg");
      portrait.style.setProperty("--tilt-y", "0deg");
    });
  }

  const removeBrokenImage = (image, onSuccess) => {
    if (!image) return;
    const fail = () => image.remove();
    image.addEventListener("error", fail, { once: true });
    image.addEventListener("load", onSuccess, { once: true });
    if (image.complete) {
      if (image.naturalWidth === 0) fail();
      else onSuccess();
    }
  };

  const logo = document.querySelector(".wordmark-image");
  removeBrokenImage(logo, () => logo?.parentElement?.classList.add("has-logo"));
  removeBrokenImage(document.querySelector(".portrait-frame > img"), () => {});

  const capabilityGroups = {
    visual: {
      title: "I make things people can feel.",
      copy: "Graphic design was where I started. Video editing came next, and then cameras, color, VFX, and 3D. I like taking a plain idea and slowly shaping it until it has a mood, a pace, and a reason to be remembered.",
      skills: [
        "I edit videos and build their pace.",
        "I shoot with drones and professional cameras.",
        "I make graphics and photo edits in Photoshop.",
        "I grade footage in DaVinci Resolve.",
        "I create VFX and composite different visual layers.",
        "I am moving from beginner into intermediate Blender and 3D work.",
        "I have also appeared on camera as a model.",
      ],
      tools: "What I use: DaVinci Resolve · Photoshop · Blender · drones · professional cameras",
    },
    digital: {
      title: "I build to understand.",
      copy: "I am a technology enthusiast. I do not know everything, but I learn fast by making real things, breaking them, finding the problem, and trying again. AI models help me learn, but I still have to make the decisions and understand what the result is doing.",
      skills: [
        "I build websites with HTML and CSS.",
        "I understand light programming and app logic.",
        "I use AI to learn, prototype, and improve ideas.",
        "I built a working texting-app experience.",
        "I developed a playable 2D game.",
        "I think carefully about mobile and responsive design.",
        "I enjoy connecting creative ideas with technology.",
      ],
      tools: "What I use: HTML · CSS · JavaScript concepts · AI models · testing and iteration",
    },
    strategy: {
      title: "I can lead and follow through.",
      copy: "A good idea still needs a plan. Through volunteering, events, field work, and content production, I learned how to organize tasks, communicate with a team, take responsibility, and adjust when the original plan stops working.",
      skills: [
        "I research audiences, places, and social trends.",
        "I plan, schedule, manage, and publish content.",
        "I coordinate tasks and communicate with a team.",
        "I can lead when a group needs direction.",
        "I turn a plan into clear steps and follow through.",
        "I have spoken directly with business owners and community members.",
        "I stay calm and solve problems when things change.",
      ],
      tools: "How I work: research · planning · teamwork · leadership · communication · adaptability",
    },
  };

  const panel = document.querySelector("#capability-panel");
  const tabs = document.querySelectorAll(".capability-tabs [role='tab']");

  const renderCapability = (id) => {
    const group = capabilityGroups[id];
    if (!panel || !group) return;
    tabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab.id === `tab-${id}`)));
    panel.setAttribute("aria-labelledby", `tab-${id}`);
    panel.innerHTML = `
      <div class="capability-statement">
        <h3>${group.title}</h3>
        <p>${group.copy}</p>
        <span>${group.tools}</span>
      </div>
      <div class="skill-orbit">
        ${group.skills.map((skill, index) => `<span style="--skill-index:${index}">${skill}</span>`).join("")}
      </div>`;
    panel.style.animation = "none";
    void panel.offsetHeight;
    panel.style.animation = "";
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => renderCapability(tab.id.replace("tab-", "")));
  });

  const copyButton = document.querySelector(".contact-actions button");
  copyButton?.addEventListener("click", async () => {
    const email = "umairhoquechowdhury13@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    copyButton.textContent = "Email copied";
    window.setTimeout(() => { copyButton.textContent = "Copy email"; }, 1800);
  });
})();
