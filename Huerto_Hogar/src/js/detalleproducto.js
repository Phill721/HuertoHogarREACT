function changeImage(img) {
    document.getElementById('main-image').src = img.src;
    document.querySelectorAll('.thumbnail-img').forEach(el => el.classList.remove('active'));
    img.classList.add('active');
}