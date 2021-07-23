const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);

	if (classNames) {
		element.classList.add(...classNames);
	}

	if (attributes) {
		for (const attribute in attributes) {
			element[attribute] = attributes[attribute];
		}
	}

	return element;
};

const createHeader = ({ title, header: { logo, menu, social } }) => { //создаю шапку
	const header = getElement('header'); //в этом headere будут все элементы
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);

	if (logo) { //проверяю наличие logo
		const logoElem = getElement('img', ['logo'], { //создаю img с классом logo
			src: logo,
			alt: 'Logo ' + title,
		});
		wrapper.append(logoElem);
	}

	if (menu) { //проверяю наличие меню
		const menuWrapper = getElement('nav', ['menu-list']); //создаю nav с классом menu-list
		const allMenu = menu.map(item => { //внутри nav создаю циклом ссылки с классом menu-link
			const menuLink = getElement('a', ['menu-link'], {
				textContent: item.title,
                href: item.link,
			});

			return menuLink;
		});

		menuWrapper.append(...allMenu);
		wrapper.append(menuWrapper);

		const menuBtn = getElement('bitton', ['menu-button']); //добавляю бургер
		menuBtn.addEventListener('click', () => {
			menuBtn.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		});
		container.append(menuBtn);
	}

	if (social) { //проверяю наличие иконок соц сетей
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map(item => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title,
			}));

			socialLink.href = item.link;

			return socialLink;
		});

		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}

	header.append(container); //раставляю созданные элементы в createHeader по местам
	container.append(wrapper);

	return header;
};

const createMain = ({ title, main: { genre, rating, description, trailer, slider }}) => { //создаю меню

    const main = getElement('main'); //вкладываю обертки
    const container = getElement('div', ['container']);
    main.append(container);
    const wrapper = getElement('div', ['main-content']);
    container.append(wrapper);
    const content = getElement('div', ['content']);
    wrapper.append(content);

    if (genre) {
        const genreSpan = getElement('span',
            ['genre', 'animated', 'fadeInRight'],
            {textContent: genre}
        );

        content.append(genreSpan);
    }

    if(rating) {
        const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRigh']);
        const ratingStars = getElement('div', ['rating-stars']);
        const ratingNumber = getElement('div', ['rating-number'], {
            textContent: `${rating}/10`
        });

        for (let i = 0; i < 10; i++) {
            const star = getElement('img', ['star'], {
                alt: i ? '' : `Rating ${rating} out of  10`,
                src: i < rating ? 'img/star.svg' : 'img/star-o.svg'
            });
            ratingStars.append(star);
        }

        ratingBlock.append(ratingStars, ratingNumber);
        content.append(ratingBlock);
    }

    content.append(getElement('img',
        ['main-title', 'animated', 'fadeInRight'],
        {
			src: 'rickandmorty/fonts.png',
			alt: '',
			width: '400',
		},
    ));

    if (description) {
        content.append(getElement('p',
            ['main-description', 'animated', 'fadeInRight'],
            {textContent: description},
        ));
    }

    if (trailer) {
        const youtubeLink = getElement('a',
            ['button', 'animated', 'fadeInRight', 'youtube-modal'],
            {
                href: trailer,
                textContent: 'Watch the trailer',
            }
        );

        const youtubeImgLink = getElement('a', ['play', 'youtube-modal'],
            {
                href: trailer,
                ariaLabel: 'Watch the trailer',
            }
        );

        const iconPlay = getElement('img', ['play-img'],
            {
                src: 'img/play.svg',
                alt: '',
                ariaHidden: true,
            }
        );

        content.append(youtubeLink);
        youtubeImgLink.append(iconPlay);
        wrapper.append(youtubeImgLink);
    }

	if (slider) {
		const sliderBlock = getElement('div', ['series']);
		const swiperBlock = getElement('div', ['swiper-container']);
		const swiperWrapper = getElement('div', ['swiper-wrapper']);
		const arrow = getElement('button', ['arrow']);

		const slides = slider.map(item => {

			const swiperSlide = getElement('div', ['swiper-slide']);
			const card = getElement('figure', ['card']);
			const cardImage = getElement('img', ['card-img'], {
				src: item.img,
				alt: ((item.title || '') + ' ' + (item.subtitle || '')).trim()
			})

			card.append(cardImage);

			if (item.title || item.subtitle) {
				const cardDescription = getElement('figcaption', ['card-description']);
				cardDescription.innerHTML = `
					${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''}
					${item.title ? `<p class="card-title">${item.title}</p>` : ''}
				`;

				card.append(cardDescription)
			}
			swiperSlide.append(card);
			return swiperSlide;
		});

		swiperWrapper.append(...slides);
		swiperBlock.append(swiperWrapper);
		sliderBlock.append(swiperBlock, arrow);

		container.append(sliderBlock);

		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});
	}

    return main;
};

const createFooter = ({ title, footer: { copyright, menu } }) => { //создаю футер
	const footer = getElement('footer', ['footer']);
	const container = getElement('div', ['container']);
	footer.append(container);
	const content = getElement('div', ['footer-content']);
	container.append(content);
	const footerLeft = getElement('div', ['left']);
	const footerRight = getElement('div', ['right']);
	content.append(footerLeft, footerRight);

	console.log(footer);

	if (copyright) {
		const copyrightSpan = getElement('span', ['copyright'], {
			textContent: copyright,
		});
		footerLeft.append(copyrightSpan);
	}

	if (menu) {
		const footerNav = getElement('nav', ['footer-menu']);
		const allMenuLinks = menu.map((item) => {
			const menuLink = getElement('a', ['footer-link'], {
				href: item.href,
				textContent: item.title,
			});

			return menuLink;
		});
		footerNav.append(...allMenuLinks);
		footerRight.append(footerNav);
	}

	return footer;
};

const movieConstructor = (selector, options) => {

	const app = document.querySelector(selector);
	app.classList.add('body-app');

	app.style.color = options.fontColor || '';
	app.style.backgroundColor = options.backgroundColor || '';

	if (options.subColor) {
		document.documentElement.style.setProperty('#71e238', options.subColor);
	}

	if (options.favicon) { //проверяю наличие фавиконки
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.substring(index +1);

		const favicon = getElement('link', null, {
			rel: 'icon',
			href: options.favicon,
			type: 'image/' + (type === 'svg' ? 'svg-xml' : type),
		});

		document.head.append(favicon);
	}

    app.style.backgroundImage = options.background ?
        `url("${options.background}")` : '';

    document.title = options.title; //синхронизация title

	if (options.header) {
		app.append(createHeader(options));
	}

    if (options.main) {
        app.append(createMain(options));
    }

	if (options.footer) {
		app.append(createFooter(options));
	}

};

/* вывод всеч созданных элементов на страницу */
movieConstructor('.app', {
	title: 'rickandmorty/fonts.png',
    background: 'rickandmorty/background.png',
	fontColor: '#ffffff',
	backgroundColor: '#0f190a',
	subColor: '#9D2929',
	favicon: 'rickandmorty/logo.png',
	header: {
		logo: 'rickandmorty/logo.png',
		menu: [
			{
				title: 'Description',
				link: '#',
			},
			{
				title: 'Trailer',
				link: '#',
			},
			{
				title: 'Reviews',
				link: '#',
			},
		],
		social: [
			{
				title: 'Twitter',
				link: 'https://twitter.com',
				image: 'rickandmorty/social/twitter.svg',
			},
			{
				title: 'Instagram',
				link: 'https://instagram.com',
				image: 'rickandmorty/social/instagram.svg',
			},
			{
				title: 'Facebook',
				link: 'https://facebook.com',
				image: 'rickandmorty/social/facebook.svg',
			}
		]
	},
    main: {
        genre: '2013 Science fiction, tragicomedy, adventure, black humor',
        rating: '9',
        description: 'The series is dedicated to the misadventures of the cynical mad scientist Rick Sanchez and his naive, capricious and insecure grandson Morty.',
        trailer: 'https://www.youtube.com/watch?v=YHkjM3bWDyw',
		slider: [
			{
				img: 'rickandmorty/series/series-1.jpg',
				title: 'Pilot',
				subtitle: 'Series No.1',
			},
			{
				img: 'rickandmorty/series/series-2.jpg',
				title: 'Lawnmower Dog',
				subtitle: 'Series No.2',
			},
			{
				img: 'rickandmorty/series/series-3.jpg',
				title: 'Anatomy Park',
				subtitle: 'Series No.3',
			},
			{
				img: 'rickandmorty/series/series-4.jpg',
				title: 'M. Night Shaym-Aliens!',
				subtitle: 'Series No.4',
			},
			{
				img: 'rickandmorty/series/series-5.jpg',
				title: 'Meeseeks and Destroy',
				subtitle: 'Series No.5',
			},
			{
				img: 'rickandmorty/series/series-6.jpg',
				title: 'Rick Potion #9',
				subtitle: 'Series No.6',
			},
			{
				img: 'rickandmorty/series/series-7.jpg',
				title: 'Raising Gazorpazorp',
				subtitle: 'Series No.7',
			},
			{
				img: 'rickandmorty/series/series-8.jpg',
				title: 'Rixty Minutes',
				subtitle: 'Series No.8',
			},
			{
				img: 'rickandmorty/series/series-9.jpg',
				title: 'Something Ricked This Way Comes',
				subtitle: 'Series No.9',
			},
			{
				img: 'rickandmorty/series/series-10.jpg',
				title: 'Close Rick-counters of the Rick Kind',
				subtitle: 'Series No.10',
			},
			{
				img: 'rickandmorty/series/series-11.jpg',
				title: 'Ricksy Business',
				subtitle: 'Series No.11',
			}
		]
    },
	footer: {
		copyright: "© 2013 Rick and Morty. All right reserved.",
		menu: [
		  {
			title: "Privacy Policy",
			link: "#",
		  },
		  {
			title: "Terms of Service",
			link: "#",
		  },
		  {
			title: "Legal",
			link: "#",
		  },
		],
	  },
});