document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const navLinks = document.querySelectorAll('.section-nav a');
const sections = Array.from(navLinks).map(link => {
  const id = link.getAttribute('href').slice(1);
  return { link, section: document.getElementById(id) };
}).filter(x => x.section);

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sections.forEach(({ link, section }) => {
          link.classList.toggle('active', section === entry.target);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(({ section }) => observer.observe(section));
}
