/*

TemplateMo 618 The Catalyst

https://templatemo.com/tm-618-the-catalyst

*/

/* ===== Mobile Nav Toggle ===== */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    navToggle.setAttribute('aria-expanded',
        navToggle.classList.contains('active'));
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

/* ===== Pricing Toggle ===== */
const toggleMonthly = document.getElementById('toggleMonthly');
const toggleYearly  = document.getElementById('toggleYearly');
const toggleSave    = document.getElementById('toggleSave');
const priceValues   = document.querySelectorAll('.pricing-value[data-monthly]');
const billedTexts   = document.querySelectorAll('.pricing-billed[data-monthly]');

function setPlan(plan) {
    priceValues.forEach(el => {
        el.textContent = el.dataset[plan];
    });
    billedTexts.forEach(el => {
        el.textContent = el.dataset[plan];
        el.classList.toggle('yearly-active', plan === 'yearly');
    });

    if (!toggleMonthly || !toggleYearly || !toggleSave) return;

    if (plan === 'yearly') {
        toggleYearly.classList.add('active');
        toggleMonthly.classList.remove('active');
        toggleSave.classList.add('visible');
    } else {
        toggleMonthly.classList.add('active');
        toggleYearly.classList.remove('active');
        toggleSave.classList.remove('visible');
    }
}

if (toggleMonthly && toggleYearly) {
    toggleMonthly.addEventListener('click', () => setPlan('monthly'));
    toggleYearly.addEventListener('click',  () => setPlan('yearly'));
}

/* ===== FAQ Accordion ===== */
function faqOpen(item) {
    const answer = item.querySelector('.faq-answer');
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
}

function faqClose(item) {
    const answer = item.querySelector('.faq-answer');
    item.classList.remove('open');
    answer.style.maxHeight = '0';
    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
}

document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (item.classList.contains('open')) {
            faqClose(item);
        } else {
            faqOpen(item);
        }
    });
});

document.getElementById('faqExpandAll').addEventListener('click', () => {
    document.querySelectorAll('.faq-item').forEach(item => faqOpen(item));
});

document.getElementById('faqCollapseAll').addEventListener('click', () => {
    document.querySelectorAll('.faq-item').forEach(item => faqClose(item));
});

/* ===== Scroll Reveal ===== */
/* 3-second fallback for iframe previews where IntersectionObserver may not fire */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${i * 60}ms`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));

    /* Fallback: force all reveals visible after 3s (iframe preview) */
    setTimeout(() => {
        reveals.forEach(el => el.classList.add('visible'));
    }, 3000);
} else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

/* ===== Produto Galeria Scroll Indicators ===== */
document.querySelectorAll('.produto-galeria').forEach(galeria => {
    const card = galeria.closest('.produto');
    const bolinhas = card
        ? card.querySelectorAll('.produto-bolinha')
        : galeria.querySelectorAll('.produto-bolinha');

    if (bolinhas.length <= 1) return;

    const setActive = index => {
        bolinhas.forEach((bolinha, i) => {
            bolinha.classList.toggle('ativa', i === index);
        });
    };

    setActive(0);

    galeria.addEventListener('scroll', () => {
        if (galeria.scrollWidth > galeria.clientWidth) {
            const index = Math.round(galeria.scrollLeft / galeria.clientWidth);
            setActive(Math.min(index, bolinhas.length - 1));
        }
    });

    galeria.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768 && bolinhas.length > 1) {
            setActive(1);
        }
    });

    galeria.addEventListener('mouseleave', () => {
        setActive(0);
    });
});
