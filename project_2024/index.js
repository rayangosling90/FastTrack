function scrollToClass(select_cat) {
    var element = document.querySelector('.' + select_cat);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}