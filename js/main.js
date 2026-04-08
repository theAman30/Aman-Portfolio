        /* ── AOS ── */
        AOS.init({ duration: 800, once: true, offset: 60 });

        /* ── Year ── */
        document.getElementById('year').textContent = new Date().getFullYear();

        /* ── Navbar scroll ── */
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        });

        /* ── Mobile menu ── */
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
        mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

        /* ── Custom cursor ── */
        const dot = document.getElementById('cursorDot');
        const ring = document.getElementById('cursorRing');
        let mx = 0, my = 0, rx = 0, ry = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        function animCursor() {
            dot.style.left = mx + 'px'; dot.style.top = my + 'px';
            rx += (mx - rx) * .12; ry += (my - ry) * .12;
            ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
            requestAnimationFrame(animCursor);
        }
        animCursor();

        /* ── Particles ── */
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 900 } },
                color: { value: '#ff7613' },
                shape: { type: 'circle' },
                opacity: { value: 0.35, random: true },
                size: { value: 2, random: true },
                line_linked: { enable: true, distance: 140, color: '#ff7613', opacity: 0.12, width: 1 },
                move: { enable: true, speed: 1.2, direction: 'none', random: true, out_mode: 'out' }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 180, line_linked: { opacity: .6 } },
                    push: { particles_nb: 3 }
                }
            },
            retina_detect: true
        });

        /* ── Typed.js ── */
        new Typed('.typing-text', {
            strings: ['React Apps', 'REST APIs', 'E-Commerce Platforms', 'Scalable Systems', 'Clean UIs'],
            typeSpeed: 60, backSpeed: 30, backDelay: 1600,
            loop: true, smartBackspace: true, showCursor: true, cursorChar: '|'
        });

        /* ── GSAP Hero Entrance ── */
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.hero-badge', { opacity: 0, y: 20, duration: .6, delay: .3 })
            .from('#hero-line1', { opacity: 0, y: 40, duration: .7 }, '-=.2')
            .from('#hero-line2', { opacity: 0, y: 40, duration: .7 }, '-=.4')
            .from('#hero-line3', { opacity: 0, y: 40, duration: .7 }, '-=.4')
            .from('.hero-subtitle', { opacity: 0, y: 20, duration: .6 }, '-=.3')
            .from('.hero-typed', { opacity: 0, y: 20, duration: .5 }, '-=.3')
            .from('.hero-actions', { opacity: 0, y: 20, duration: .5 }, '-=.3')
            .from('.stat-item', { opacity: 0, y: 20, stagger: .12, duration: .5 }, '-=.2')
            .from('#heroVisual', { opacity: 0, x: 40, duration: .8, ease: 'power2.out' }, '-=.8');

        /* ── GSAP Scroll-triggered counters ── */
        function animateCounter(el, target) {
            gsap.fromTo({ val: 0 }, { val: target }, {
                duration: 1.5, ease: 'power2.out',
                onUpdate: function () { el.childNodes[0].textContent = Math.round(this.targets()[0].val); }
            });
        }
        ScrollTrigger.create({
            trigger: '.hero-stats',
            once: true,
            onEnter: () => {
                document.querySelectorAll('.stat-num').forEach((el, i) => {
                    animateCounter(el, [2, 10, 5][i]);
                });
            }
        });

        /* ── Social bar hide at footer ── */
        const socialBar = document.getElementById('socialBar');
        const footer = document.getElementById('footer');
        window.addEventListener('scroll', () => {
            if (window.innerWidth > 1280) {
                const footerTop = footer.getBoundingClientRect().top;
                socialBar.style.opacity = footerTop < window.innerHeight - 80 ? '0' : '1';
                socialBar.style.pointerEvents = footerTop < window.innerHeight - 80 ? 'none' : 'auto';
            }
        });

        /* ── Contact form AJAX ── */
        document.getElementById('contact-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            btn.textContent = 'Sending…';
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: { Accept: 'application/json' }
            }).then(() => {
                btn.innerHTML = '✓ Message Sent!';
                btn.style.background = '#22c55e';
                this.reset();
                setTimeout(() => {
                    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                    btn.style.background = '';
                }, 4000);
            }).catch(() => {
                btn.textContent = 'Something went wrong.';
                btn.style.background = '#ef4444';
            });
        });

        /* ── Active nav on scroll ── */
        const sections = document.querySelectorAll('section[id]');
        const navAs = document.querySelectorAll('.nav-links a');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    navAs.forEach(a => a.style.color = '');
                    const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
                    if (active) active.style.color = 'var(--orange)';
                }
            });
        }, { threshold: .4 });
        sections.forEach(s => observer.observe(s));