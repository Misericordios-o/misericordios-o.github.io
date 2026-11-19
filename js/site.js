// ================== Ciclo de palabras (hero) ==================
(function () {
    const span = document.getElementById("palabra-ciclo");
    if (!span) return; // esta página no tiene el elemento, no hacemos nada más acá

    const palabras = [
        "Desarrollamos",
        "Vendemos",
        "Creamos",
        "Investigamos",
        "Promovemos",
        "Mejoramos",
    ];

    const VELOCIDAD_ESCRITURA = 90; // ms por letra al escribir
    const VELOCIDAD_BORRADO = 50; // ms por letra al borrar
    const PAUSA_PALABRA = 1400; // ms con la palabra completa antes de borrar
    const PAUSA_ANTES_DE_ESCRIBIR = 300; // ms con el campo vacío antes de escribir

    let indice = 0;

    function borrar(callback) {
        const actual = span.textContent;
        if (actual.length === 0) {
            callback();
            return;
        }
        span.textContent = actual.slice(0, -1);
        setTimeout(() => borrar(callback), VELOCIDAD_BORRADO);
    }

    function escribir(palabra, posicion, callback) {
        if (posicion > palabra.length) {
            setTimeout(callback, PAUSA_PALABRA);
            return;
        }
        span.textContent = palabra.slice(0, posicion);
        setTimeout(() => escribir(palabra, posicion + 1, callback), VELOCIDAD_ESCRITURA);
    }

    function siguientePalabra() {
        borrar(() => {
            setTimeout(() => {
                const palabra = palabras[indice];
                indice = (indice + 1) % palabras.length;
                escribir(palabra, 0, siguientePalabra);
            }, PAUSA_ANTES_DE_ESCRIBIR);
        });
    }

    setTimeout(siguientePalabra, PAUSA_PALABRA);
})();

// ================== Loop de palabras (sección Propuesta) ==================
(function () {
    const items = document.querySelectorAll(".propuesta-words li");
    if (!items.length) return; // esta página no tiene la sección, no seguimos

    const VELOCIDAD_ESCRITURA = 90; // ms por letra
    const PAUSA_ENTRE_PALABRAS = 300; // ms de aire antes de la siguiente
    const PAUSA_FINAL = 5000; // ms de espera al completar las 5 palabras

    function escribirPalabra(li, callback) {
        const palabra = li.dataset.word;
        const span = li.querySelector(".palabra-texto");
        let posicion = 0;

        function paso() {
            span.textContent = palabra.slice(0, posicion);
            posicion++;
            if (posicion > palabra.length) {
                callback();
                return;
            }
            setTimeout(paso, VELOCIDAD_ESCRITURA);
        }
        paso();
    }

    function limpiarTodo() {
        items.forEach((li) => {
            li.classList.remove("activa");
            li.querySelector(".palabra-texto").textContent = "";
        });
    }

    function correrLoop(indice) {
        if (indice >= items.length) {
            setTimeout(() => {
                limpiarTodo();
                correrLoop(0);
            }, PAUSA_FINAL);
            return;
        }

        items.forEach((li) => li.classList.remove("activa"));
        items[indice].classList.add("activa");

        escribirPalabra(items[indice], () => {
            setTimeout(() => correrLoop(indice + 1), PAUSA_ENTRE_PALABRAS);
        });
    }

    correrLoop(0);
})();

// ================== Carrusel "¿Qué hacemos?" ==================
(function () {
    const card = document.getElementById("qh-card");
    if (!card) return; // esta página no tiene la sección, no seguimos

    const section = document.getElementById("que-hacemos");
    const tituloEl = document.getElementById("qh-titulo");
    const arrowEl = document.getElementById("qh-next");
    const slideTitleEl = document.getElementById("qh-slide-title");
    const slideBoldEl = document.getElementById("qh-slide-bold");
    const paragraphsEl = document.getElementById("qh-paragraphs");
    const listHeadingEl = document.getElementById("qh-list-heading");
    const listEl = document.getElementById("qh-list");
    const extraNoteEl = document.getElementById("qh-extra-note");
    const ctaEl = document.getElementById("qh-cta");

    const SLIDES = [
        {
            variant: "azul",
            title: "E-commerce",
            bold: "Tiendas online diseñadas para vender.",
            paragraphs: [
                "Diseñamos y desarrollamos tiendas online rápidas, responsive y adaptadas a las necesidades reales de cada negocio.",
                "Desde catálogos simples hasta tiendas con múltiples categorías, variantes, stock, pagos y envíos.",
            ],
            listHeading: "Incluye:",
            items: [
                "Diseño UX/UI.",
                "Desarrollo frontend y backend.",
                "Catálogo de productos.",
                "Carrito de compra.",
                "Checkout.",
                "Integración de métodos de pago.",
                "Configuración de envíos.",
                "Diseño responsive.",
                "Panel de administración.",
                "Optimización de rendimiento.",
            ],
            cta: "Quiero una tienda online",
        },
        {
            variant: "violeta",
            title: "UX / UI",
            bold: "Diseñamos antes de desarrollar.",
            paragraphs: [
                "Una tienda no debería obligar al usuario a pensar.",
                "Diseñamos interfaces intuitivas y experiencias de compra que hacen que encontrar un producto, entenderlo y comprarlo sea lo más sencillo posible.",
            ],
            listHeading: "Trabajamos sobre:",
            items: [
                "Arquitectura de información.",
                "Wireframes.",
                "Diseño de interfaces.",
                "Responsive Design.",
                "Design Systems.",
                "Prototipos.",
                "Microinteracciones.",
                "Menos fricción.",
                "Más claridad.",
                "Más oportunidades de compra.",
            ],
            cta: "Quiero mejorar mi experiencia de compra",
        },
        {
            variant: "azul",
            title: "Branding",
            bold: "Tu tienda necesita una marca que esté a la altura.",
            paragraphs: [
                "Una tienda online puede funcionar técnicamente y aun así no transmitir confianza.",
                "Si tu identidad visual necesita mejorar, podemos trabajar sobre ella antes de llevarla al entorno digital.",
            ],
            listHeading: "Podemos ayudarte con:",
            items: [
                "Identidad visual.",
                "Logo.",
                "Paleta cromática.",
                "Tipografías.",
                "Dirección visual.",
                "Banners y recursos gráficos.",
                "Diseño de piezas para e-commerce.",
                "Guía básica de identidad.",
            ],
            extraNote:
                "No todos los negocios necesitan un branding desde cero. Primero analizamos lo que ya tenés y te recomendamos únicamente lo que realmente necesita tu marca.",
            cta: "Quiero mejorar mi marca",
        },
        {
            variant: "violeta",
            title: "Desarrollo",
            bold: "Diseñamos lo que desarrollamos.",
            paragraphs: [
                "No creemos en separar el diseño de la tecnología. Por eso trabajamos como un equipo desde el comienzo del proyecto.",
                "Diseñamos la experiencia, definimos la estructura y después la convertimos en una tienda funcional. Tecnología al servicio de la experiencia.",
            ],
            listHeading: "En cada proyecto priorizamos:",
            items: [
                "Seguridad.",
                "Velocidad.",
                "Escalabilidad.",
                "Responsive Design.",
                "Integraciones.",
                "Mantenimiento.",
                "Buenas prácticas de desarrollo.",
            ],
            cta: "Quiero comenzar mi proyecto",
        },
    ];

    let indiceActual = 0;

    function render(indice) {
        const data = SLIDES[indice];

        section.dataset.variant = data.variant; 
        ctaEl.dataset.variant = data.variant;

        slideTitleEl.textContent = data.title;
        slideBoldEl.textContent = data.bold;

        paragraphsEl.innerHTML = "";
        data.paragraphs.forEach((texto) => {
            const p = document.createElement("p");
            p.className = "qh-slide-text";
            p.textContent = texto;
            paragraphsEl.appendChild(p);
        });

        listHeadingEl.textContent = data.listHeading;

        listEl.innerHTML = "";
        data.items.forEach((texto) => {
            const li = document.createElement("li");
            li.textContent = texto;
            listEl.appendChild(li);
        });

        if (data.extraNote) {
            extraNoteEl.textContent = data.extraNote;
            extraNoteEl.classList.add("qh-visible");
        } else {
            extraNoteEl.textContent = "";
            extraNoteEl.classList.remove("qh-visible");
        }

        ctaEl.textContent = data.cta;
    }

    function irAlSiguiente() {
        card.classList.add("qh-fading");
        ctaEl.style.opacity = "0";

        setTimeout(() => {
            indiceActual = (indiceActual + 1) % SLIDES.length;
            render(indiceActual);
            card.classList.remove("qh-fading");
            ctaEl.style.opacity = "1";
        }, 300);
    }

    arrowEl.addEventListener("click", irAlSiguiente);

    render(indiceActual);

    // El título aparece una sola vez al hacer scroll hasta la sección,
    // y no se vuelve a animar aunque se cambie de slide.
    if (tituloEl) {
        const observer = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        tituloEl.classList.add("qh-title-visible");
                        observer.unobserve(tituloEl);
                    }
                });
            },
            { threshold: 0.4 }
        );
        observer.observe(tituloEl);
    }
})();

// ================== Equipo: hover -> detalle ==================
(function () {
    const stage = document.getElementById("equipo-stage");
    if (!stage) return; // esta página no tiene la sección, no seguimos

    const detailPhoto = document.getElementById("equipo-detail-photo");
    const detailName = document.getElementById("equipo-detail-name");
    const detailTags = document.getElementById("equipo-detail-tags");
    const detailQuote = document.getElementById("equipo-quote");
    const detailSkills = document.getElementById("equipo-skills-list");

    const MIEMBROS = {
        filomeno: {
            foto: "/images/rama.jpg",
            nombre: "Ramiro Terra",
            tags: ["Comunicación Visual", "Branding", "UI / UX"],
            quote:
                '"Soy Ramiro, diseñador gráfico y responsable de la parte visual y de experiencia de Checkout Studio. Mi trabajo consiste en transformar ideas y necesidades de negocio en experiencias digitales claras, atractivas y funcionales. Una tienda no solamente debe verse bien, también debe tener sentido para quien la utiliza y para el negocio que está detrás."',
            skills: [
                "🟣 Branding.",
                "🟣 Identidad visual.",
                "🟣 UX/UI.",
                "🟣 Arquitectura visual.",
                "🟣 Diseño de interfaces.",
                "🟣 Design Systems.",
                "🟣 Dirección de arte.",
            ],
        },
        kilimanjaro: {
            foto: "/images/ema.jpg",
            nombre: "Emanuel Caraballo",
            tags: ["Desarrollo web", "Tecnología", "E-Commerce"],
            quote:
                '"Soy Emanuel, programador y responsable del desarrollo tecnológico de Checkout Studio. Me encargo de transformar las ideas y diseños en productos digitales funcionales, seguros y preparados para operar. Que detrás de una buena experiencia exista una tecnología sólida, rápida y preparada para crecer."',
            skills: [
                "🟣 Desarrollo frontend.",
                "🟣 Desarrollo backend.",
                "🟣 Bases de datos.",
                "🟣 E-commerce.",
                "🟣 Integraciones.",
                "🟣 Métodos de pago.",
                "🟣 Sistemas de envío.",
                "🟣 Infraestructura.",
                "🟣 Optimización y mantenimiento.",
            ],
        },
    };

    function mostrarDetalle(id) {
        const data = MIEMBROS[id];
        if (!data) return;

        detailPhoto.src = data.foto;
        detailPhoto.alt = data.nombre;
        detailName.textContent = data.nombre;

        detailTags.innerHTML = "";
        data.tags.forEach((texto) => {
            const span = document.createElement("span");
            span.className = "tag";
            span.textContent = texto;
            detailTags.appendChild(span);
        });

        detailQuote.textContent = data.quote;

        detailSkills.innerHTML = "";
        data.skills.forEach((texto) => {
            const li = document.createElement("li");
            li.textContent = texto;
            detailSkills.appendChild(li);
        });

        stage.dataset.active = id;
    }

    function ocultarDetalle() {
        delete stage.dataset.active;
    }

    document.querySelectorAll(".equipo-member").forEach((el) => {
        el.addEventListener("mouseenter", () => mostrarDetalle(el.dataset.member));

        // Soporte para móviles
        el.addEventListener("click", () => mostrarDetalle(el.dataset.member));
    });

    stage.addEventListener("mouseleave", ocultarDetalle);

    const closeBtn = document.getElementById("equipo-detail-close");

    if (closeBtn) {
        closeBtn.addEventListener("click", ocultarDetalle);
    }
})();
``