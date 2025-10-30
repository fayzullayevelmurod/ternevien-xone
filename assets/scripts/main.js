// form_modal
const formBtns = document.querySelectorAll(".form_btn");
const formModal = document.querySelector(".form_modal");
const closeBtn = document.querySelector(".form_modal_close");

formBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    formModal.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => {
  formModal.classList.remove("active");
});
// form_modal

// policy
const policyBtns = document.querySelectorAll(".policy_modal_btn");
const policyModal = document.querySelector(".policy_modal");
const policyBtnClose = document.querySelector(".policy_modal_close");

policyBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    policyModal.classList.add("active");
  });
});

policyBtnClose.addEventListener("click", () => {
  policyModal.classList.remove("active");
});
// policy

// service
const serviceBtns = document.querySelectorAll(".service_modal_btn");
const serviceModal = document.querySelector(".service_modal");
const serviceBtnClose = document.querySelector(".service_modal_close");

serviceBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    serviceModal.classList.add("active");
  });
});

serviceBtnClose.addEventListener("click", () => {
  serviceModal.classList.remove("active");
});
// service

// policy
const faqBtns = document.querySelectorAll(".faq_modal_btn");
const faqModal = document.querySelector(".faq_modal");
const faqBtnClose = document.querySelector(".faq_modal_close");

faqBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    faqModal.classList.add("active");
  });
});

faqBtnClose.addEventListener("click", () => {
  faqModal.classList.remove("active");
});
// policy

// burger
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".header_in");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// burger

// form
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputs = this.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "px solid #ccc";
      }
    });
  });
});
// form

// form_modal
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    setTimeout(() => {
      document.querySelector(".form_bg").classList.add("active");
    }, 2000);
  });
});

document.addEventListener("click", function (e) {
  const bg = document.querySelector(".form_bg");
  if (bg.classList.contains("active") && !e.target.closest("form")) {
    bg.classList.remove("active");
  }
});
// form_modal

let swiper = new Swiper(".commentSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: ".comment-pagination",
  },
  navigation: {
    nextEl: ".comment_btn_next",
    prevEl: ".comment_btn_prev",
  },
});


const formTelBlocks = document.querySelectorAll(".form-tel");

const getCountries = async () => {
  try {
    const res = await fetch("/assets/scripts/countries.json");
    if (!res.ok) throw new Error("JSON yuklanmadi");
    return res.json();
  } catch (error) {
    console.error("Telefon kodlari JSON fayli yuklanmadi:", error);
    return [];
  }
};

if (formTelBlocks.length) {
  getCountries().then((countries) => {
    formTelBlocks.forEach((el) => {
      const btn = el.querySelector(".form-tel__btn");
      const telList = el.querySelector(".form-tel__list");
      const elInp = el.querySelector('input[type="tel"]');
      const elImg = el.querySelector(".form-tel__btn img");
      const elCode = el.querySelector(".form-tel__btn span");

      if (!btn || !telList || !elInp || !elImg || !elCode) return;

      btn.addEventListener("click", () => {
        el.classList.toggle("active");
      });

      const mask = IMask(elInp, {
        mask: "(000)000-000",
      });

      elInp.addEventListener("input", () => {
        elInp.classList.toggle("active", elInp.value.trim() !== "");
      });

      countries.forEach((data) => {
        const li = document.createElement("li");
        li.classList.add("form-tel__list-item");

        const span = document.createElement("span");
        const img = document.createElement("img");
        img.src = data.flag;
        const code = document.createElement("span");
        code.textContent = data.code;

        span.appendChild(img);
        span.appendChild(code);

        const name = document.createElement("div");
        name.textContent = data.name;

        li.appendChild(span);
        li.appendChild(name);
        telList.appendChild(li);

        li.addEventListener("click", () => {
          elCode.textContent = data.code;
          elImg.src = data.flag;
          elInp.placeholder = data.placeholder;
          elInp.classList.remove("active");
          mask.updateOptions({ mask: data.mask });
          mask.value = "";
          el.classList.remove("active");
        });
      });
    });
  });
}

window.addEventListener("click", (event) => {
  document.querySelectorAll(".form-tel.active").forEach((el) => {
    if (!el.contains(event.target)) {
      el.classList.remove("active");
    }
  });
});


// tabs
(function () {
  const tabButtons = Array.from(document.querySelectorAll('.tabs__btn'));
  const panels = Array.from(document.querySelectorAll('.tabs__panel'));
  const select = document.getElementById('tabs-select');

  if (!tabButtons.length || !panels.length) return;

  function activateTab(targetId, focusBtn = false) {
    tabButtons.forEach(btn => {
      const isTarget = btn.dataset.target === targetId;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      if (isTarget && focusBtn) btn.focus();
    });

    panels.forEach(panel => {
      if (panel.id === targetId) {
        panel.removeAttribute('hidden');
        panel.classList.add('active');
      } else {
        panel.setAttribute('hidden', '');
        panel.classList.remove('active');
      }
    });

    if (select) {
      select.value = targetId;
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activateTab(btn.dataset.target, true);
    });

    btn.addEventListener('keydown', (e) => {
      const idx = tabButtons.indexOf(btn);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = tabButtons[(idx + 1) % tabButtons.length];
        next.click();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = tabButtons[(idx - 1 + tabButtons.length) % tabButtons.length];
        prev.click();
      } else if (e.key === 'Home') {
        e.preventDefault();
        tabButtons[0].click();
      } else if (e.key === 'End') {
        e.preventDefault();
        tabButtons[tabButtons.length - 1].click();
      }
    });
  });

  if (select) {
    select.addEventListener('change', (e) => {
      activateTab(e.target.value);
    });
  }

  function checkHash() {
    const hash = location.hash.replace('#', '');
    const valid = panels.some(p => p.id === hash);
    if (valid) activateTab(hash);
  }
  window.addEventListener('hashchange', checkHash, false);
  checkHash();

  if (!tabButtons.some(b => b.classList.contains('active'))) {
    const first = tabButtons[0];
    if (first) activateTab(first.dataset.target);
  }
})();
// tabs


// quiz
const questions = document.querySelectorAll(".quiz__question");
const countEl = document.getElementById("current");
const progress = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const form = document.querySelector(".quiz__form");

let current = 0;

function updateQuiz() {
  questions.forEach((q, i) => q.classList.toggle("active", i === current));

  countEl.textContent = current + 1;
  const progressWidth = ((current + 1) / questions.length) * 100;
  progress.style.width = `${progressWidth}%`;

  prevBtn.disabled = current === 0;

  if (current === questions.length - 1) {
    nextBtn.textContent = "Получить результат";
  } else {
    nextBtn.textContent = "Далее →";
  }
}

nextBtn.addEventListener("click", () => {
  if (current < questions.length - 1) {
    current++;
    updateQuiz();
  } else {
    document.querySelector(".quiz__body").style.display = "none";
    document.querySelector(".quiz__progress").style.display = "none";
    document.querySelector(".quiz__head").style.display = "none";
    document.querySelector(".quiz__footer").style.display = "none";
    form.style.display = "block";
  }
});

prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    updateQuiz();
  }
});

updateQuiz();


// quiz
