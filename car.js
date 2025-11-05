document.getElementById('year').textContent = new Date().getFullYear();

                    function scrollRow(id, distance) {
                        const el = document.getElementById(id);
                        if (!el) return;
                        el.scrollBy({
                            left: distance,
                            behavior: 'smooth'
                        });
                    }

                    const modalBack = document.getElementById('modalBack');

                    function openModal(data) {
                        const gallery = document.getElementById('modalGallery');
                        gallery.innerHTML = '';

                        if (Array.isArray(data.imgs)) {
                            data.imgs.forEach((src, i) => {
                                const img = document.createElement('img');
                                img.src = src;
                                if (i === 0) img.classList.add('active');
                                gallery.appendChild(img);
                            });
                        } else if (data.img) {
                            const img = document.createElement('img');
                            img.src = data.img;
                            img.classList.add('active');
                            gallery.appendChild(img);
                        }

                        document.getElementById('modalName').innerText = data.name;
                        document.getElementById('modalPrice').innerText = data.price;
                        document.getElementById('modalDesc').innerText = data.desc || '';

                        const specsList = document.getElementById('modalSpecs');
                        specsList.innerHTML = '';
                        if (Array.isArray(data.specs)) {
                            data.specs.forEach(s => {
                                const li = document.createElement('li');
                                li.innerText = s;
                                specsList.appendChild(li);
                            });
                        }

                        const phone = '+923339017459';
                        document.getElementById('whBtn').href = `https://api.whatsapp.com/send?phone=${phone}&text=I'm%20interested%20in%20${encodeURIComponent(data.name)}`;
                        document.getElementById('callBtn').href = `tel:${phone}`;

                        modalBack.style.display = 'flex';

                        let current = 0;
                        const imgs = gallery.querySelectorAll('img');
                        const prevBtn = document.getElementById('galleryPrev');
                        const nextBtn = document.getElementById('galleryNext');

                        function show(i) {
                            imgs[current].classList.remove('active');
                            current = (i + imgs.length) % imgs.length;
                            imgs[current].classList.add('active');
                        }

                        prevBtn.onclick = () => show(current - 1);
                        nextBtn.onclick = () => show(current + 1);
                    }

                    function closeModal() {
                        modalBack.style.display = 'none';
                    }

                    modalBack.addEventListener('click', function(e) {
                        if (e.target === modalBack) closeModal();
                    });

                    // === SLIDER LOGIC ===
                    const slides = document.querySelectorAll(".slide");
                    const dots = document.querySelectorAll(".dot");
                    const nextBtn = document.getElementById("slideNext");
                    const prevBtn = document.getElementById("slidePrev");
                    const slidesContainer = document.getElementById("slides");

                    let currentSlide = 0;
                    const totalSlides = slides.length;

                    function showSlide(index) {
                        currentSlide = (index + totalSlides) % totalSlides;
                        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

                        dots.forEach((dot, i) => {
                            dot.classList.toggle("active", i === currentSlide);
                        });
                    }

                    // Manual navigation
                    nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
                    prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));

                    // Dots navigation
                    dots.forEach((dot, i) => {
                        dot.addEventListener("click", () => showSlide(i));
                    });

                    // Automatic sliding every 4 seconds
                    setInterval(() => {
                        showSlide(currentSlide + 1);
                    }, 2000);

