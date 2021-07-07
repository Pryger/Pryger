'use strict';
$(function () {
	//? Лоадер
	$(document).ready(function () {
		$('#loader').removeClass('loader-show');
	});

	//? 100vh
	function vh100() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}
	vh100();
	$(window).resize(function () {
		vh100();
	});

	//? Фиксированная шапка
	function fixedHeader() {
		if ($(window).scrollTop() > 0) {
			$('.header-fixed').addClass('header-fixed-scroll');
		} else {
			$('.header-fixed').removeClass('header-fixed-scroll');
		}
	}
	fixedHeader();
	$(window).on('scroll', function () {
		fixedHeader();
	});

	//? Плавный скрол
	$('[data-scroll]').each(function (i, el1) {
		$(el1).click(function (e) {
			let timeout = 400;
			if ($(document).width() < 576)
				timeout = 800;

			let id = $(this).attr('data-scroll');
			let top = $(id).offset().top - 25;
			$('body, html').animate({ scrollTop: top }, timeout);
			e.preventDefault();
		});
	});

	//? Модалки
	$('[data-popup]').each(function (i, el1) {
		function popupShow(popup) {
			let scrollBarWidth = window.innerWidth - popup.width() + 'px';
			popup.addClass('popup-show');
			$('body').css({
				'overflow-y': 'hidden',
				'padding-right': scrollBarWidth
			});
			$('.header-fixed').css({
				'transition': '0s',
				'padding-right': scrollBarWidth
			});
		}
		function popupHide(popup) {
			popup.removeClass('popup-show');
			setTimeout(function () {
				$('body').css({
					'overflow-y': 'scroll',
					'padding-right': 0
				});
				$('.header-fixed').css('padding-right', '0px');
				setTimeout(function () {
					$('.header-fixed').css('transition', '0.3s');
				}, 50);
			}, 500);
		}

		let popup = $($(el1).attr('data-popup'));

		$(el1).click(function (e) { // Открывать по клику на кнопку
			popupShow(popup);
			e.preventDefault();
		});
		popup.find('.popup-close').click(function (e) { // Закрывать на крест в углу
			popupHide(popup);
			e.preventDefault();
		});
		$(document).keydown(function (e) { // Закрытие по клавише Esc
			if (e.keyCode === 27) {
				e.stopPropagation();
				popupHide(popup);
			}
		});
		popup.click(function (e) { // Закрытие по клику вне модалки
			if ($(e.target).closest('.popup-wrapper').length == 0) {
				popupHide(popup);
			}
		});
	});

	//? Гамбургер
	$('[data-humb-menu]').each(function (i, el1) {
		let popup = $($(el1).attr('data-humb-menu'));
		$(el1).click(function (e) {
			popup.toggleClass('humb-show');
			$('body').toggleClass('no-scroll');
			e.preventDefault();
		});
	});

	//? Переворот карты по наведению
	$('.card-flip').each(function (i, el1) {
		$(el1).click(function (e) {
			$(this).toggleClass('flip');
			e.preventDefault();
		});
	});

});
$(function () {
	//? Отзывы
	$('#reviews-slider').slick({
		dots: true,
		speed: 300,
		arrows: false,
		infinite: true,
		// autoplay: true,
		autoplaySpeed: 3000,
		dots: true,
	});

	//? Портфолио mixitup
	mixitup('.portfolio__block', {
		animation: {
			duration: 400,
			effectsIn: 'fade translateY(-100%)',
			effectsOut: 'fade translateY(-100%)'
		},
		selectors: {
			control: '[data-mixitup-control]'
		}
	});

	//? Гамбургер
	$('[data-humb-menu]').each(function (i, el1) {
		$(el1).click(function (e) {
			if ($(window).scrollTop() == 0)
				$('.header-fixed').toggleClass('header-fixed-scroll');
			$('.humb-btn').toggleClass('humb-active');
			e.preventDefault();
		});
	});

	//? Плавный скрол с закрытием меню
	$('[data-scroll]').each(function (i, el1) {
		$(el1).click(function (e) {
			if ($('.humb').hasClass('humb-show')) {
				$('.humb').removeClass('humb-show');
				$('.humb-btn').toggleClass('humb-active');
				$('body').removeClass('no-scroll');
			}
			e.preventDefault();
		});
	});





});