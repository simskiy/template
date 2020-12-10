let logo = document.querySelector('.logo__img');
let img = document.querySelector('#logo__img');

function changeLogo() {
  // if (document.body.innerWidth > 0) {
  if (window.innerWidth > 0) {
    img.attributes['xlink:href'].value = 'img/svg/index-sprite.svg#logo-mobile';
    logo.attributes.width.value = '86';
    logo.attributes.height.value = '35';
  }
  // if (document.body.innertWidth >= 768) {
  if (window.innerWidth >= 768) {
    img.attributes['xlink:href'].value = 'img/svg/index-sprite.svg#logo-tablet';
    logo.attributes.width.value = '112';
    logo.attributes.height.value = '46';
  }
  // if (document.body.innertWidth >= 1150) {
  if (window.innerWidth >= 1150) {
    img.attributes['xlink:href'].value = 'img/svg/index-sprite.svg#logo-desktop';
    logo.attributes.width.value = '149';
    logo.attributes.height.value = '72';
  }

  // console.log('clientWidth: ' + document.body.clientWidth);
  // console.log('innerWidth: ' + window.innerWidth);
}

window.addEventListener('resize', changeLogo);
window.addEventListener('load', changeLogo);
